import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-light)] px-3 py-2 text-sm text-[var(--text-normal)] ring-offset-[var(--bg-mid)] placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
