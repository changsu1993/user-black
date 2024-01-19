"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { SelectInput } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export default function FileObjectionDialog({
  onOpenChange,
}: {
  onOpenChange?: (value: boolean) => void;
}) {
  const form = useForm();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 540;
      setIsMobile(newIsMobile);

      // 모바일 크기로 변경되었을 때 다이얼로그 닫기
      if (newIsMobile && open) {
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  useEffect(() => {
    onOpenChange?.(open);
  }, [onOpenChange, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-accent underline-offset-4 underline pl-[10px] md:text-[16px] max-sm2:text-right">
          이의제기 신청
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white/90 px-20 py-[51px] max-w-[580px] text-dark33 max-phone:px-2">
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
            이의제기 신청
          </h3>
          <p className="mt-[24px] text-[16px] font-normal leading-[28px] tracking-[-0.48px] text-dark33">
            이의제기한 피해 내용이 N 건 선택되었습니다
            <br />
            검색 시 입력된 이름, 생년월일, 휴대폰번호로 이의 신청이 접수됩니다
          </p>
          <div className="mt-[37px]">
            <Form {...form}>
              <div className="space-y-[22px]">
                <FormField
                  control={form.control}
                  name="appealType"
                  render={({ field }) => (
                    <FormItem className="space-y-[10px]">
                      <FormLabel className="text-dark33 text-[16px] font-normal">
                        이의 제기 유형
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-between">
                          <SelectInput
                            styleType="objection"
                            options={[
                              {
                                label: "A 유형",
                                value: "type-a",
                              },
                              {
                                label: "B 유형",
                                value: "type-b",
                              },
                              {
                                label: "C 유형",
                                value: "type-c",
                              },
                            ]}
                            placeholder="이의제기 유형 선택"
                            className="w-full h-[44px] rounded-[5px] border-fagray pl-[18px] pr-[15px] text-[14px] text-9egray font-normal"
                            selectValueClassName="text-[14px] text-9egray font-normal"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="objectionContent"
                  render={({ field }) => (
                    <FormItem className="space-y-[10px]">
                      <FormLabel className="text-dark33 text-[16px] font-normal">
                        이의 신청 내용
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-between">
                          <Textarea
                            placeholder="이의 신청 사유를 적어주세요"
                            className="pl-[18px] leading-[27px] h-[123px] w-full text-[14px] font-normal placeholder:text-9egray resize-none"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="objectionContent"
                  render={({ field }) => (
                    <FormItem className="space-y-[10px]">
                      <FormLabel className="text-dark33 text-[16px] font-normal">
                        이의 신청 결과 받기(이메일 주소)
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-between">
                          <Input
                            placeholder="이의신청 결과를 받을 이메일 주소를 입력해 주세요"
                            className="pl-[18px] w-full h-11 text-[14px] font-normal leading-[27px] placeholder:text-9egray"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-[32px] w-full">
                <Button
                  variant="dark-gray"
                  className="w-full text-[18px] font-normal"
                >
                  이의 제기 등록
                </Button>
                <p className="mt-[15px] text-[16px] font-normal leading-[25px] tracking-[-0.48px] text-red text-center">
                  (이의 신청 내용을 입력해주세요)
                </p>
              </div>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
