import { AdminPageWrapper } from "@/components/PageWrapper";

const AdminPage = () => {
  return (
    <AdminPageWrapper>
      <main className="flex h-full w-full items-center justify-center">
        <div className="rounded-md bg-background p-12 text-2xl font-semibold text-primary shadow-xl">
          Welcome the the Admin Panel
        </div>
      </main>
    </AdminPageWrapper>
  );
};

export default AdminPage;
