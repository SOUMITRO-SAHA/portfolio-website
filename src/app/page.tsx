import { PageWrapper } from "@/components/PageWrapper";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return <PageWrapper>Dashboard</PageWrapper>;
}
