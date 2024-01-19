"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectInput } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

export default function FileObjection() {
  const router = useRouter();
  const form = useForm();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 540) {
        router.push("/");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="">
      <section className="hero2-section w-full max-phone:h-[285px] text-white">
        <div className="text-center h-full flex flex-col items-start pl-[23px] pr-[25px] justify-center">
          <h2 className="font-normal tracking-[-0.84px] max-phone:text-[28px] mt-[4rem]">
            이의제기 신청
          </h2>
          <p className="mt-[31px] max-phone:mt-[18px] max-phone:text-start max-phone:self-start text-xl md:text-[20px] font-normal leading-[26px] tracking-[-0.6px] max-phone:text-[16px] max-phone:text-[#d0d0d0] max-phone:font-light">
            이의제기한 피해 내용이 N건 선택되었습니다
            <br />
            <span className="inline-block mt-[6px] text-[16px]">
              검색 시 입력된 이름, 생년월일, 휴대폰번호로 이의 신청이 접수됩니다
            </span>
          </p>
        </div>

        <div className="mt-[37px] px-[25px] pb-[2rem]">
          <Form {...form}>
            <div className="space-y-[22px]">
              <FormField
                control={form.control}
                name="appealType"
                render={({ field }) => (
                  <FormItem className="space-y-[10px]">
                    <FormLabel className="text-dark33 text-[15px]">
                      이의 제기 유형
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-between placeholder:text-[#D9D9D9] text-[#d9d9d9]">
                        <SelectInput
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
                          className="w-full h-[63px] text-[16px] border-[#d9d9d9] border-[0.5px] border-solid rounded-[10px] pl-[18px] pr-[15px] max-phone:placeholder:text-[#D9D9D9] text-[#d9d9d9]"
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
                    <FormLabel className="text-dark33 text-[15px]">
                      이의 신청 내용
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-between">
                        <Textarea
                          placeholder="이의 신청 사유를 적어주세요"
                          className="leading-normal pl-[18px] h-[63px] text-[16px] w-full border-[0.5px] border-solid rounded-[10px] border-[#d9d9d9] placeholder:text-[#D9D9D9] resize-none"
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
                    <FormLabel className="text-dark33 text-[15px]">
                      이의 신청 결과 받기(이메일 주소)
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-between">
                        <Input
                          placeholder="이의신청 결과를 받을 이메일 주소를 입력해주세요"
                          className="pl-[18px] pr-0 h-[63px] text-[16px] leading-[27px] w-full border-[0.5px] border-solid rounded-[10px] border-[#d9d9d9] placeholder:text-[#D9D9D9]"
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
                className="w-full h-[65px] max-phone:bg-[#141414] max-phone:font-light"
              >
                이의 제기 등록
              </Button>
              <p className="mt-[13px] text-[12px] font-medium leading-[25px] tracking-[-0.48px] text-red text-center">
                (이의 신청 내용을 입력해주세요)
              </p>
            </div>
          </Form>
        </div>
      </section>
    </main>
  );
}
