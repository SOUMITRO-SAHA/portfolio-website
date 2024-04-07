import { cn } from "@/utils";

export const Title = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-lg font-semibold">{children}</div>;
};

export const Divider = () => {
  return <div className="my-6" />;
};

export const Section = ({ children }: { children: React.ReactNode }) => {
  return <section className="">{children}</section>;
};

export const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={cn("text-2xl font-semibold capitalize", className)}>
      {children}
    </h1>
  );
};

export const H2 = ({ children }: { children: React.ReactNode }) => {
  return <h2>{children}</h2>;
};

export const H3 = ({ children }: { children: React.ReactNode }) => {
  return <h3>{children}</h3>;
};

export const P = ({ children }: { children: React.ReactNode }) => {
  return <p className="leading-relaxed text-zinc-300">{children}</p>;
};
