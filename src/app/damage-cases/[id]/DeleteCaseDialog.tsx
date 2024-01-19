"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Textarea } from "../../../components/ui/textarea";

type DeleteCaseDialogProps = {
  className?: string; // className prop에 대한 타입 정의
  mobile?: boolean;
};

export default function DeleteCaseDialog({
  className,
  mobile,
}: DeleteCaseDialogProps) {
  const form = useForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          size="lg"
          className={`${className} w-3/2 p-1 col-span-2 max-w-[676px] md:w-full max-phone:w-full max-phone:h-[60px] max-phone:text-[18px]`}
        >
          {mobile ? "삭제" : "삭제하기"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white/90 px-20 py-[51px] max-w-[580px] h-[619px] max-h-[619px] text-dark33 max-phone:py-0  max-phone:pb-[30px] max-phone:pt-[60px] max-phone:px-[29px] max-phone:max-w-[334px] max-phone:h-[466px]">
        <div>
          <h3 className="mt-[24px] text-[35px] font-normal leading-[45px] tracking-[-1.05px] max-phone:text-[25px] max-phone:text-center max-phone:mt-0 max-phone:leading-[35px]">
            해당 피해 사례를 <br className="phone:hidden" /> 삭제
            <br className="max-phone:hidden" />
            하시겠습니까?
          </h3>
          <div className="mt-[40px] max-phone:mt-[17px]">
            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="id-form"
                  render={({ field }) => (
                    <FormItem className="space-y-[10px] max-phone:space-y-0">
                      <FormLabel className="text-base font-normal text-dark33 max-phone:hidden">
                        삭제 사유를 입력해주세요
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          className="text-sm font-normal resize-none min-h-[123px] max-h-[123px] max-phone:rounded-[10px]"
                          placeholder="삭제 사유를 입력해주세요"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <div className="mt-[77px] w-full flex items-center gap-[13px] max-phone:mt-[23px] max-phone:flex-col">
              <Button
                variant="dark-gray"
                className="w-full text-lg font-normal max-phone:bg-[#0a0a0a]"
              >
                확인
              </Button>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full text-lg font-normal max-phone:bg-[#F35C5C]"
                >
                  취소
                </Button>
              </DialogTrigger>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
