import { db } from "@/server/db";
import { config } from "@/shared";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend the Session interface to include additional user properties
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      token: string;
      email: string;
    };
  }
}

// Define the NextAuth options
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      // If session and session.user exist, update user properties
      if (session && session.user) {
        session.user.id = String(token.uid);
        session.user.token = String(token.token);
        session.user.role = config.ADMIN_EMAIL.includes(
          String(session.user.email),
        )
          ? "ADMIN"
          : "VISITOR";
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      // If user exists, update token properties
      if (user) {
        token.uid = user.id;
        token.token = user && "token" in user ? String(user.token) : "";
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your super secure password",
        },
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      async authorize(credentials: { email: string; password: string }) {
        try {
          if (!credentials) {
            throw new Error("For some reason credentials are missing");
          }

          // Destructure email and password from credentials
          const { email, password } = credentials;

          // Check if email and password are provided
          if (!email || !password) {
            throw new Error("Email and password are required fields.");
          }

          // INFO: Custom Checking for Only Admin User, Feel Free to Modify This Code:
          if (email !== config.ADMIN_EMAIL) {
            throw new Error(
              "You are not allowed to log in to this website. This is only for admin users.",
            );
          }

          // Find user by email in the database
          const user = await db.user.findUnique({
            where: { email: email },
            select: {
              id: true,
              name: true,
              password: true,
              username: true,
              email: true,
            },
          });

          // If user exists and passwords match
          if (
            user &&
            user.password &&
            (await bcrypt.compare(password, user.password))
          ) {
            // Generate JWT token
            const token = jwt.sign(
              { id: user.id, email: user.email, username: user.username },
              config.NEXTAUTH_SECRET,
              { expiresIn: config.AUTH_EXPIRES },
            );

            // Update user's access token in the database
            await db.user.update({
              where: { id: user.id },
              data: { accessToken: token },
            });

            // Return user data and token
            return {
              id: user.id,
              name: user.name,
              email,
              token,
              success: true,
              message: "Successfully logged in!",
            };
          }

          throw new Error("Invalid email or password.");
        } catch (error) {
          console.error("Error during authentication:", error);
          if (error instanceof Error) throw new Error(error.message);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

// Function to get the server authentication session
export const getServerAuthSession = () => getServerSession(authOptions);
