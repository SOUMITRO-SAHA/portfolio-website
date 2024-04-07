import * as React from "react";

export const AppHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mb-4 flex items-center justify-between">
      {children}
    </section>
  );
};
