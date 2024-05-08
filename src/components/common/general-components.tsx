import type { MenuItem } from "@/assets";
import { cn } from "@/utils";

export const Title = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-lg font-semibold">{children}</div>;
};

export const Divider = () => {
  return <div className="my-6" />;
};

export const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <section className={cn("", className)}>{children}</section>;
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

export const H3 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn("text-base font-semibold capitalize", className)}>
      {children}
    </h3>
  );
};

export const P = ({ children }: { children: React.ReactNode }) => {
  return <p className="leading-relaxed text-zinc-300">{children}</p>;
};

export const PageTitle = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex items-center gap-2 text-base font-bold capitalize leading-relaxed">
      <div className="h-5 w-5">{icon}</div>
      <span>{title}</span>
    </div>
  );
};
