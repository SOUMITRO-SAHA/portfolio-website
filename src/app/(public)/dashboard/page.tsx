import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return <PageWrapper>Dashboard</PageWrapper>;
}
