interface Config {
  ADMIN_EMAIL: string;
  NEXTAUTH_SECRET: string;
  AUTH_EXPIRES: string;
}

export const config: Config = {
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? "",
  AUTH_EXPIRES: process.env.AUTH_EXPIRES ?? "7d",
};
