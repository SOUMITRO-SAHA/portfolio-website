import { db } from "@/server/db";
import { config } from "@/shared";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { CredentialsConfig } from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";

// Auth options for NextAuth
export const authProviders: CredentialsConfig[] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "" },
      password: { label: "Password", type: "password", placeholder: "" },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    authorize: async (credentials: { email: string; password: string }) => {
      try {
        // Destructure email and password from credentials
        const { email, password } = credentials;

        // Check if email and password are provided
        if (!email || !password) {
          return {
            success: false,
            message: "Email and password are required fields.",
          };
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
          };
        }

        return { success: false, message: "Invalid email or password." };
      } catch (error) {
        if (error instanceof Error)
          console.error("Error during authentication:", error);
        return {
          success: false,
          message: "An error occurred during authentication.",
        };
      }
    },
  }),
];
