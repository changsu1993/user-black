"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Cross1Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Form, FormCalendar, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectInput } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function DamageCaseForm({
  viewMode = false,
}: {
  viewMode?: boolean;
}) {
  const router = useRouter();
  const form = useForm();

  // faysel1:
  // POST /api/v1/blacks
  // This API is used to register a black consumer.
  // You can register up to a maximum of 10 image files.

  // GET /api/v1/blacks/damagetypes
  // This API is for the options of the damageType.
  // You should insert them into the options within the selectInput tag.

  // This is a responsive project.
  // If you check the mobile size UI, you may notice that the UI changes differently.
  // Please check both desktop and mobile sizes while working on the API.

  // For more details, please refer to the Swagger documentation."

  return (
    <Form {...form}>
      <div className="space-y-[34px] w-full">
        {viewMode && (
          <div
            className={cn(
              "flex flex-col max-md:items-center items-start md:flex-row md:items-center gap-[18px]"
            )}
          >
            <Label className="w-full max-w-[120px] text-dark33">
              필수 입력 정보
            </Label>
            <div className="flex items-center flex-1 gap-8 max-md:flex-col">
              <p className="text-xl leading-[26px] text-dark tracking-[-0.6px]">
                2023 - 12 - 25 ㅣ 11:22
              </p>
              <p className="text-xl leading-[26px] text-dark tracking-[-0.6px]">
                상태
              </p>
              <div className="flex items-center gap-2">
                <button
                  className={cn(
                    "flex items-center px-3 h-[25px] border border-abgray",
                    "text-xs leading-[25px] tracking-[-0.36px] text-abgray"
                  )}
                >
                  승인대기
                </button>
                <button
                  className={cn(
                    "flex items-center px-3 h-[25px] bg-abgray",
                    "text-xs leading-[25px] tracking-[-0.36px] text-white"
                  )}
                >
                  승인완료
                </button>
                <button
                  className={cn(
                    "flex items-center px-3 h-[25px] bg-red",
                    "text-xs leading-[25px] tracking-[-0.36px] text-white"
                  )}
                >
                  승인완료
                </button>
              </div>
            </div>
          </div>
        )}
        <div
          className={cn(
            "flex flex-col items-start md:flex-row md:items-center gap-[18px] p-2 max-phone:gap-0 max-phone:p-0"
          )}
        >
          {/* name */}
          <Label className="w-full max-w-[120px] text-[20px] font-normal text-dark33 max-phone:text-[12px] max-phone:relative">
            이름
            <span className="pl-2 text-red max-phone:p-1 max-phone:absolute max-phone:bottom-0">
              *
            </span>
          </Label>
          <Input
            type="text"
            className="flex-1 text-[20px] font-normal placeholder:text-d9gray max-phone:p-0 max-phone:h-[40px] max-phone:text-[16px] max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none"
            placeholder="블랙컨슈머 이름을 입력해주세요"
          />
        </div>
        <div
          className={cn(
            "flex flex-col items-start md:flex-row md:items-center p-2 gap-[18px] max-phone:gap-0 max-phone:p-0"
          )}
        >
          {/* name */}
          <Label className="w-full max-w-[120px] text-dark33 text-[20px] font-normal placeholder:text-d9gray max-phone:text-[12px] max-phone:relative">
            휴대폰번호
            <span className="pl-2 text-red max-phone:p-1 max-phone:absolute max-phone:bottom-0">
              *
            </span>
          </Label>
          <Input
            type="text"
            className="flex-1 text-[20px] font-normal placeholder:text-d9gray max-phone:pl-0 max-phone:h-[40px] max-phone:text-[16px] max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none"
            placeholder="- (하이픈) 제거 후 입력해주세요"
          />
        </div>
        <div
          className={cn(
            "flex flex-col items-start md:flex-row p-2 md:items-center gap-[18px] max-phone:gap-0 max-phone:p-0"
          )}
        >
          {/* birth */}
          <Label className="w-full max-w-[120px] text-dark33 text-[20px] font-normal max-phone:text-[12px] max-phone:relative">
            생년월일
            <span className="pl-2 text-red max-phone:p-1 max-phone:absolute max-phone:bottom-0">
              *
            </span>
          </Label>
          <Input
            type="text"
            className="flex-1 text-[20px] font-normal placeholder:text-d9gray max-phone:pl-0 max-phone:h-[40px] max-phone:text-[16px]  max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none"
            placeholder="생년월일 6자리를 입력해주세요 (예 : 841225)"
          />
        </div>

        <div
          className={cn(
            "flex flex-col items-start md:flex-row p-2 md:items-center gap-[18px] max-phone:gap-0 max-phone:p-0"
          )}
        >
          <Label className="w-full max-w-[120px] text-dark33 text-[20px] font-normal max-phone:text-[12px] max-phone:relative">
            피해정보
          </Label>
        </div>

        <div className="grid grid-cols-2 gap-[34px] w-full max-phone:flex max-phone:flex-row max-phone:gap-[24px] max-phone:!mt-[31px]">
          <div
            className={cn(
              "flex flex-col items-start p-2 md:flex-row md:items-center gap-[18px] max-phone:gap-0 max-phone:p-0"
            )}
          >
            {/* damageTypeId */}
            <Label className="w-full max-w-[120px] text-dark33 text-[20px] font-normal max-phone:mb-[17px] max-phone:max-w-[44px] max-phone:text-[12px]">
              피해 유형
            </Label>
            <SelectInput
              className="pl-6 flex md:flex-1 w-full text-xs md:text-[20px] font-normal rounded-none border-d9gray max-sm2:h-[40px] max-phone:!text-[16px]  text-d9gray max-phone:rounded-[50px] max-phone:border-[0.5px] max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:h-[38px] max-phone:w-[160px] max-phone:pr-[2px] max-phone:gap-0 max-phone:text-center"
              placeholder="피해 유형 선택"
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
            />
          </div>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <div
                className={cn(
                  "flex p-2 flex-col items-start md:flex-row md:items-center gap-[18px] max-phone:p-0 max-phone:gap-0 max-phone:mt-[3px]"
                )}
              >
                {/* damageDate */}
                <Label className="w-full max-w-[120px] text-dark33 max-phone:mb-[17px] max-phone:max-w-[54px] max-phone:text-[12px] max-phone:pl-0">
                  피해발생일
                </Label>
                <Input
                  type="text"
                  className="flex-1 placeholder:text-d9gray text-[20px] font-normal max-phone:h-[40px] max-phone:text-[16px] max-phone:pl-0 max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none"
                  placeholder="20◉◉-◉◉-◉◉"
                  value={field.value}
                />
                <FormCalendar
                  value={field.value}
                  onChange={(value) => {
                    if (value) {
                      field.onChange(format(value, "yyyy-M-dd"));
                    } else {
                      field.onChange(value);
                    }
                  }}
                  trigger={() => (
                    <button
                      className={cn(
                        "text-[20px] font-normal text-white leading-[26px] tracking-[-0.6px] px-[38px] max-phone:text-[17px] max-phone:px-[20px] max-phone:h-[60px] max-phone:rounded-sm",
                        "flex items-center justify-center text-center py-2 h-[63px] max-phone:py-1 max-phone:h-full",
                        "bg-abgray min-w-max max-phone:hidden"
                      )}
                    >
                      날짜 선택
                    </button>
                  )}
                />
              </div>
            )}
          />
        </div>

        <div
          className={cn(
            "flex p-2 flex-col md:flex-row items-start gap-[18px] max-phone:p-0 w-full"
          )}
        >
          {/* damageContent */}
          <Label className="w-full max-w-[120px] text-dark33 max-phone:text-[12px] max-phone:relative mt-1">
            피해 내용
            <span className="pl-2 text-red max-phone:p-1 max-phone:absolute max-phone:bottom-0">
              *
            </span>
          </Label>
          <Textarea
            className="flex-1 min-h-[277px] resize-none rounded-none border-d9gray max-phone:min-h-[167px] placeholder:text-d9gray text-[20px] font-normal max-phone:text-[16px] max-phone:pl-2 max-phone:rounded-[10px]"
            placeholder="피해 사례를 입력해 주세요"
          />
        </div>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <div
              className={cn(
                "flex p-2 flex-col md:flex-row gap-[18px] w-full max-phone:gap-2"
              )}
            >
              {/* files */}
              <Label className="w-full max-w-[120px] text-dark33 max-phone:text-[12px] max-phone:pl-0 mt-[21px]">
                사진첨부
              </Label>
              <div className="flex-1 w-full">
                <div className="flex items-center gap-[34px] w-full max-phone:items-start max-sm2:flex-col">
                  <div className="flex flex-col items-start gap-[18px] flex-1 md:flex-row md:items-center max-phone:relative max-phone:w-full">
                    <Input
                      type="text"
                      className="flex-1 placeholder:text-d9gray text-[20px] font-normal max-phone:h-[40px] max-phone:text-[16px] max-phone:pl-0 max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none self-start"
                      placeholder="N개의 사진이 선택되었습니다."
                      value={field.value}
                    />
                    <button
                      className={cn(
                        "text-[20px] font-normal text-white leading-[26px] tracking-[-0.6px] px-[38px] ",
                        "flex items-center justify-center text-center py-2 h-[63px]",
                        "bg-abgray min-w-max",
                        "max-phone:absolute max-phone:right-1 max-phone:text-[14px] max-phone:px-0 max-phone:rounded-sm max-phone:py-0",
                        "max-phone:w-[89px] max-phone:h-[33px] max-phone:rounded-[50px] max-phone:border-[0.5px] max-phone:border-solid max-phone:border-[#333] max-phone:text-[#333] max-phone:bg-white"
                      )}
                    >
                      파일 선택
                    </button>
                  </div>
                  <div className="w-full max-w-[435px] flex items-center max-phone:hidden">
                    <p className="text-sm md:text-[20px] leading-[35px] tracking-[-0.6px] text-d9gray font-normal max-phone:text-[#2817e1] max-phone:tracking-[-0.33px] max-phone:font-light max-phone:leading-normal">
                      최대 10개까지 등록 가능합니다
                      <br />
                      jpg, jpeg, gif, png, bmp 형식의 이미지만 선택 가능합니다
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mt-[22px] flex flex-col gap-[14px] md:flex-row md:items-center max-phone:grid max-phone:grid-cols-4 max-sm2:grid-cols-2">
                    {[
                      "블랙리스트.jpeg",
                      "블랙리스트.png",
                      "블랙리스트.jpg",
                      "블랙리스트.jpg",
                    ].map((filename, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2 px-3 py-1 h-[34px] border border-d9gray max-phone:w-[78px] max-phone:h-[20px] max-phone:gap-0 max-phone:px-[7px] max-phone:pl-[6px] max-phone:pr-[3px]"
                      >
                        <p className="text-[14px] font-normal leading-[18px] tracking-[-0.42px] text-d9gray max-phone:text-[8px] truncate">
                          {filename}
                        </p>
                        {!viewMode && (
                          <button className="text-white  w-[19px] h-[19px] bg-d9gray rounded-full p-1 max-phone:w-[14px] max-phone:h-[14px]">
                            <Cross1Icon className="w-full h-full" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="phone:hidden w-full max-w-[435px] mt-[18px] flex items-center">
                    <p
                      className="text-sm leading-[35px] tracking-[-0.6px] text-d9gray font-normal
                      max-phone:text-[11px] max-phone:text-accent max-phone:tracking-[-0.33px] max-phone:font-light max-phone:leading-normal
                    "
                    >
                      최대 10개까지 등록 가능합니다
                      <br />
                      jpg, jpeg, gif, png, bmp 형식의 이미지만 선택 가능합니다
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
      <div
        className={cn(
          "items-center justify-center mt-[93px] gap-4 flex max-md:flex-col max-sm2:mt-[50px] max-phone:mt-[63px]"
        )}
      >
        {viewMode && (
          <Button
            onClick={() => router.push("/damage-cases")}
            type="button"
            variant="dark-gray"
            size="lg"
            className="w-3/2 p-1 col-span-2 max-w-[676px] md:w-full max-sm2:w-3/2 max-sm2:text-xs"
          >
            목록으로
          </Button>
        )}
        <Button
          type="button"
          variant="accent"
          size="lg"
          className={cn(
            "w-full p-1 max-phone:h-[63px] max-phone:bg-black max-phone:text-[18px]",
            viewMode && "col-span-4"
          )}
        >
          <Link href="/damage-cases/register/success">등록 요청하기</Link>
        </Button>

        {/* Element for small screen */}
        <Button
          type="button"
          variant="accent"
          size="lg"
          className={cn(
            "phone:hidden w-full p-1 text-[18px] mt-[0px] bg-white text-black border-[0.5px] border-solid border-[#333] max-phone:h-[63px]",
            viewMode && "col-span-4"
          )}
        >
          <Link href="/damage-cases/register/success">취소</Link>
        </Button>

        <p className="phone:hidden text-[#f00] text-center text-[12px] tracking-[-0.36px]">
          &#123;필수항목명&#125;을(를) 입력해주세요
        </p>
      </div>
    </Form>
  );
}