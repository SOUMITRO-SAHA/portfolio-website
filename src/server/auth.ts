import { db } from "@/server/db";
import { config } from "@/shared";
import { authProviders } from "@/utils/auth-providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

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
  providers: [...authProviders],
  pages: {
    signIn: "/auth/login",
  },
};

// Function to get the server authentication session
export const getServerAuthSession = () => getServerSession(authOptions);
