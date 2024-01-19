"use client";

import * as React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";
import { Label } from "./label";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-slate-200 text-slate-900 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

type RadioGroupElProps = {
  name: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: any) => void;
  className?: string;
};

const RadioGroupEl = ({
  options,
  className,
  onChange,
  name,
  value,
}: RadioGroupElProps) => {
  return (
    <div className="space-y-2">
      {options.map((option) => {
        const optionId = name + "-" + option.value;
        return (
          <div
            key={option.value}
            role="button"
            onClick={() => onChange?.(option.value)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <span
              className={cn(
                "w-4 h-4 aspect-square rounded-full border border-black",
                "flex items-center justify-center"
              )}
            >
              {value === option.value && (
                <CheckIcon className="w-full h-full" />
              )}
            </span>
            <Label
              className="text-sm font-normal cursor-pointer"
              htmlFor={optionId}
            >
              {option.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
};

RadioGroupEl.displayName = "RadioGroupEl";
type RadioElProps = {
  label: string | React.ReactNode;
  checked?: boolean;
  onChange?: (value: any) => void;
  className?: string;
};

const RadioEl = ({
  label,
  className,
  onChange,
  checked = false,
}: RadioElProps) => {
  return (
    <div
      role="button"
      onClick={() => onChange?.(!checked)}
      className="flex items-center gap-[7px] cursor-pointer"
    >
      <span
        className={cn(
          "w-[21px] h-[21px] aspect-square rounded-full border border-dark33",
          "flex items-center justify-center p-[2px]",
          checked ? "bg-dark33 text-white" : "bg-transparent text-dark33"
        )}
      >
        <CheckIcon className="w-full h-full" />
      </span>
      <Label className="cursor-pointer text-base font-medium tracking-[-0.48px] leading-[25px]">
        {label}
      </Label>
    </div>
  );
};

RadioEl.displayName = "RadioEl";

export { RadioGroup, RadioGroupItem, RadioGroupEl, RadioEl };
