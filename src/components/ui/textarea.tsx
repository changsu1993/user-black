import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-[5px] border border-fagray bg-white px-[18px]",
          "text-dark33 py-[10px] text-sm font-normal tracking-[-0.42px] placeholder:text-d9gray",
          "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-accent",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
