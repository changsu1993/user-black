import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export default function AnnouncementDetailsDialog() {
  const form = useForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-abgray px-[15px] pt-2 pb-1 text-xs text-center text-white font-normal">
          자세히 보기
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white/90 px-20 py-[51px] max-w-[580px] max-h-[840px] h-[840px] text-dark33">
        <div>
          <DialogTrigger asChild>
            <Image
              src={"/icons/back.svg"}
              role="button"
              width={21}
              height={39}
              alt="Back Icon"
            />
          </DialogTrigger>
          <h3 className="mt-[24px] text-[35px] font-normal leading-[39px] tracking-[-1.05px]">
            공지사항
          </h3>
          <p
            className={cn(
              "mt-[33px] text-base font-normal leading-[28px] tracking-[-0.48px] text-dark33",
              "flex items-center gap-4"
            )}
          >
            {/* id */}
            <span>번호</span>
            <span className="text-abgray">01</span>
            {/* createdAt */}
            <span>등록일시</span>
            <span className="text-abgray"> 2022 - 10 - 24 ㅣ 16:00:08</span>
          </p>
          <div className="mt-[30px]">
            <Form {...form}>
              <form className="space-y-8">
                {/* title */}
                <FormField
                  disabled
                  control={form.control}
                  name="id-form"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-normal text-dark33">
                        제목
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          className="resize-none max-h-[68px] pr-[18px] pl-[11px] text-[15px] font-normal"
                          defaultValue="공지사항 공지사항 과정에서 벌어진 2, 3차 가해 양상을 기록하고 분석함으로써 일차적으로 피해자들이 겪고 있는 심리적 트라우마에 대한 이해"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* content */}
                <FormField
                  disabled
                  control={form.control}
                  name="id-form"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-normal text-dark33">
                        내용
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          className="resize-none min-h-[364px] max-h-[364px] pr-[18px] pl-[11px] text-[15px] font-normal"
                          defaultValue="공지사항 공지사항 과정에서 벌어진 2, 3차 가해 양상을 기록하고 분석함으로써 일차적으로 피해자들이 겪고 있는 심리적 트라우마에 대한 이해
                          국회의 정기회는 법률이 정하는 바에 의하여 매년 1회 집회되며, 국회의 임시회는 대통령 또는 국회재적의원 4분의 1 이상의 요구에
                          모든 국민은 법률이 정하는 바에 의하여 공무담임권을 가진다. 대통령이 임시회의 집회를 요구할 때에는 기간과 집회요구의 이유를 ... "
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
