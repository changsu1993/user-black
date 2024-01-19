"use client";
import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import Spinner from "./spinner";
import { Separator } from "./separator";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-11 w-full items-center justify-between rounded-md border border-fagray bg-fagray px-3 py-2 text-sm shadow-sm ring-transparent placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-transparent disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-8 w-8 text-d9gray" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white text-dark33 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-slate-100", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export type SelectOption = {
  label: string;
  value: string;
};

type SelectElProps = {
  options?: Array<SelectOption>;
  loading?: boolean;
  value?: string;
  onChange?: (opt?: SelectOption | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const SelectEl = React.forwardRef<HTMLSelectElement, SelectElProps>(
  (
    { options, className, placeholder, disabled, loading, onChange, value },
    ref
  ) => {
    const [filteredOpts, setFilteredOpts] = React.useState(options);
    const handleChange = (value: string) => {
      const option = options?.find((opt) => opt.value === value);
      // if (!option || !onChange) return;
      onChange?.(option);
    };

    React.useEffect(() => {
      setFilteredOpts(options);
    }, [options]);

    const handleFilterChange = (val: string) => {
      setFilteredOpts(
        options?.filter((opt) =>
          opt.label.toLowerCase().includes(val.toLowerCase())
        )
      );
    };

    return (
      <Select onValueChange={handleChange} value={value}>
        <SelectTrigger
          className={cn(
            "w-full h-11 text-base leading-[25px] tracking-[-0.48px] placeholder:text-secondary border-fagray",
            className
          )}
          disabled={disabled}
        >
          <SelectValue placeholder={placeholder ?? "Select"} />
        </SelectTrigger>
        <SelectContent className="p-0">
          {options && !loading && (
            <>
              <input
                className="flex w-full rounded-md bg-transparent py-2 px-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Search..."
                onChange={(e) => handleFilterChange(e.target.value)}
              />
              <Separator />
            </>
          )}
          {loading ? (
            <div className="w-full py-10 flex items-center justify-center">
              <Spinner className="w-10 h-10 border-4" />
            </div>
          ) : !filteredOpts || filteredOpts?.length <= 0 ? (
            <div className="w-full py-10 flex items-center justify-center">
              <p>No data.</p>
            </div>
          ) : (
            <div className="mt-2 max-h-96 overflow-y-auto ">
              {filteredOpts?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </div>
          )}
        </SelectContent>
      </Select>
    );
  }
);
SelectEl.displayName = "SelectEl";

type SelectInputProps = {
  options?: Array<SelectOption>;
  loading?: boolean;
  value?: string;
  onChange?: (opt?: SelectOption | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  selectValueClassName?: string;
  styleType?: string;
};

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    {
      options,
      className,
      placeholder,
      disabled,
      loading,
      onChange,
      value,
      selectValueClassName,
      styleType,
    },
    ref
  ) => {
    const [filteredOpts, setFilteredOpts] = React.useState(options);
    const handleChange = (value: string) => {
      const option = options?.find((opt) => opt.value === value);
      // if (!option || !onChange) return;
      onChange?.(option);
    };

    React.useEffect(() => {
      setFilteredOpts(options);
    }, [options]);

    const handleFilterChange = (val: string) => {
      setFilteredOpts(
        options?.filter((opt) =>
          opt.label.toLowerCase().includes(val.toLowerCase())
        )
      );
    };

    return (
      <Select onValueChange={handleChange} value={value}>
        <SelectTrigger
          className={cn(
            "w-auto h-[63px] text-base leading-[25px] px-[30px] tracking-[-0.75px] text-dark33 font-medium",
            "placeholder:text-secondary bg-white border-secondary rounded-full gap-8",
            className
          )}
          disabled={disabled}
        >
          <SelectValue
            className={selectValueClassName}
            placeholder={placeholder ?? "Select"}
          />
        </SelectTrigger>
        <SelectContent className="p-0">
          <div className="mt-2 max-h-96 overflow-y-auto ">
            {filteredOpts?.map((option, index) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className={
                  styleType !== "objection"
                    ? "p-4 text-base"
                    : index === 2
                    ? "pt-[13px] pb-[7px] text-[14px] font-normal text-9egray"
                    : "pt-[13px] pb-[7px] text-[14px] font-normal text-9egray border-b-[1px]"
                }
              >
                {option.label}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    );
  }
);
SelectInput.displayName = "SelectInput";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectEl,
  SelectInput,
};
