interface Config {
  ADMIN_EMAIL: string;
  NEXTAUTH_SECRET: string;
  AUTH_EXPIRES: string;
  REDIRECT_URL: string;
  NEXT_PUBLIC_HASHNODE_ENDPOINT: string;
}

export const config: Config = {
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? "",
  AUTH_EXPIRES: process.env.AUTH_EXPIRES ?? "7d",
  REDIRECT_URL: process.env.REDIRECT_URL ?? "",
  NEXT_PUBLIC_HASHNODE_ENDPOINT:
    process.env.NEXT_PUBLIC_HASHNODE_ENDPOINT ?? "",
};
