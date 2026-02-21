import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => (
  <div className={cn("mx-auto w-full max-w-[1200px] px-6 sm:px-10", className)}>{children}</div>
);

export default Container;
