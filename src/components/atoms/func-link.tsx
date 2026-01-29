import Link from "next/link";
import { cn } from "@/lib/utils";

interface FuncLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
export function FuncLink({ href, children, className }: FuncLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-stone-400 font-medium hover:text-stone-200 transition-colors duration-300",
        className,
      )}
    >
      <span className="text-indigo-500">Me</span>.{children}
      ()
    </Link>
  );
}
