import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  trailing?: string | React.ReactNode;
  trailingStyle?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, trailing, trailingStyle, containerClassName, type, ...props },
    ref
  ) => {
    return (
      <div className={cn("w-full relative", containerClassName)}>
        <input
          type={type}
          className={cn(
            "flex h-[63px] w-full border border-d9gray text-dark33 bg-white px-6 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-d9gray focus-visible:outline-none focus-visible:border-accent disabled:cursor-not-allowed disabled:border-d9gray disabled:bg-f1gray",
            className
          )}
          ref={ref}
          {...props}
        />
        {trailing && (
          <span className="absolute top-1/2 -translate-y-1/2 right-[7px]">
            {typeof trailing === "string" ? (
              <button
                type="button"
                className={`w-auto h-[32px] rounded-[5px] bg-9egray text-white px-2 py-1 text-sm tracking-[-0.42px] ${trailingStyle}`}
              >
                {trailing}
              </button>
            ) : (
              trailing
            )}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
