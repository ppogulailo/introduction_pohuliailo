import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const Tag = ({ label, active, onClick }: TagProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200",
      active ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      !onClick && "cursor-default"
    )}
  >
    {label}
  </button>
);

export default Tag;
