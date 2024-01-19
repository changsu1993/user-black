import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

export default function Pagination() {
  return (
    <div className="mt-[139px] max-phone:mt-[60px] flex items-center justify-center gap-3">
      <button
        className={cn(
          "w-[22px] h-[22px] flex items-center justify-center rounded-full",
          "text-a1gray text-xs leading-[11px]"
        )}
      >
        <DoubleArrowLeftIcon className="w-4 h-4" />
      </button>
      <button
        className={cn(
          "w-[22px] h-[22px] flex items-center justify-center rounded-full",
          "text-a1gray text-xs leading-[11px]"
        )}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
      <button
        className={cn(
          "w-[22px] h-[22px] flex items-center justify-center rounded-full",
          "text-white text-xs bg-abgray leading-[11px]"
        )}
      >
        1
      </button>
      <button
        className={cn(
          "w-[22px] h-[22px] flex items-center justify-center rounded-full",
          "text-5dgray text-xs bg-f6gray leading-[11px]"
        )}
      >
        2
      </button>
      <button
        className={cn(
          "w-[22px] h-[22px] flex items-center justify-center rounded-full",
          "text-5dgray text-xs bg-f6gray leading-[11px]"
        )}
      >
        3
      </button>
      <button
        className={cn(
          "w-[22px] h-[22px] flex items-center justify-center rounded-full",
          "text-a1gray text-xs leading-[11px]"
        )}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>
      <button
        className={cn(
          "w-[22px] h-[22px] flex items-center justify-center rounded-full",
          "text-a1gray text-xs leading-[11px]"
        )}
      >
        <DoubleArrowRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
