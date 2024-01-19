"use client";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import useAlertDialog from "../hooks/stores/alert-dialog";
import { cn } from "@/lib/utils";

export default function AlertDialog() {
  const { alertDialogOpen, alertData, setAlertDialogOpen } = useAlertDialog();
  return (
    <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="dark-gray" className="w-full col-span-full">
          확인
        </Button>
      </DialogTrigger> */}
      <DialogContent className="bg-white/90 p-[82px] max-w-[580px] text-dark33 max-phone:py-[40px] max-phone:px-[20px] max-sm2:px-0 max-phone:max-w-[350px] max-sm2:max-w-[260px]">
        <div className="text-center">
          {alertData.heading && (
            <h3 className="text-[35px] leading-[39px] tracking-[-1.05px] font-bold text-dark33 max-phone:text-[#333] max-phone:text-[28px] max-phone:tracking-[-0.84px]">
              {alertData.heading}
            </h3>
          )}
          {alertData.content && (
            <p
              className={cn(
                "text-base leading-[28px] tracking-[-0.6px] text-dark33 whitespace-pre-line max-sm2:text-[14px]",
                alertData.heading && "mt-[33px]"
              )}
            >
              {alertData.content}
            </p>
          )}
          <div className="mt-11 max-sm2:px-[20px]">
            <DialogTrigger asChild>
              <Button
                variant="dark-gray"
                className="w-full col-span-full max-phone:bg-[#0a0a0a]"
              >
                {alertData.buttonTxt ?? "확인"}
              </Button>
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
