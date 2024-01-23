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
interface faqTypes{
  data:any
}
export default function FAQsDetailsDialog({data}:faqTypes) {
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
            FAQ
          </h3>
          <p
            className={cn(
              "mt-[33px] text-base font-normal leading-[28px] tracking-[-0.48px] text-dark33",
              "flex items-center gap-4"
            )}
          >
            <span>번호</span>
            <span className="text-abgray">01</span>
            <span>등록일시</span>
            <span className="text-abgray"> 2022 - 10 - 24 ㅣ 16:00:08</span>
          </p>
          <div className="mt-[30px]">
            <Form {...form}>
              <form className="space-y-8">
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
                          defaultValue={data.title}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
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
                          defaultValue={data.content}
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
