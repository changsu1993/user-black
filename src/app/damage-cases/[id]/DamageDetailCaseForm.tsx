"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form, FormCalendar, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectInput } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import DeleteCaseDialog from "./DeleteCaseDialog";
import customFetch from "@/lib/customfetch";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DamageDetailCaseForm() {
  const router = useRouter();
  const form = useForm();
  const [option, setOption]:any = useState([])


  // faysel1:
  // damage-cases / [id]

  // below code
  //   <Label className="w-full max-w-[120px] text-xl font-normal text-dark33 max-phone:text-[12px] max-sm2:pl-0">
  //   피해 유형
  // </Label>
  // <SelectInput
  //   className="pl-6 flex w-full text-xs text-d9gray font-normal rounded-none border-d9gray md:flex-1 md:text-[20px] max-sm2:h-[40px] max-sm2:text-[16px] max-phone:pl-2 max-phone:rounded-[5px] max-phone:border-[0.5px] max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:h-[38px] max-phone:w-[160px] max-phone:pr-[2px]"
  //   placeholder="피해 유형 선택"
  //   options={[
  //     {
  //       label: "A 유형",
  //       value: "type-a",
  //     },
  //     {
  //       label: "B 유형",
  //       value: "type-b",
  //     },
  //     {
  //       label: "C 유형",
  //       value: "type-c",
  //     },
  //   ]}
  // />
  // </div>
 
  // For the options in the selectInput tag, you need to call the GET /api/v1/blacks/damagetypes API and use the data fetched from it.

  // below code
  // <DeleteCaseDialog className="flex-1" />
  // When this tag is clicked, the corresponding post should be deleted.
  // DELETE /api/v1/mypage/blacks/{id}
  useEffect(()=>{
    getOptions()
    
      },[])
    const getOptions = ()=>{
      const accessToken =localStorage.getItem('accessToken')
      try {
        customFetch.get('/api/v1/blacks/damagetypes',{headers:{
          Authorization:`Bearer ${accessToken}`
        }}).then((res)=>{

      
        const options = res.data.map((item:any, ) => ({
          label: item.name,
          value: `type-${item.id}`,
        }));
        setOption(options)

        }

        ).catch((e)=>console.log(e.message))
      } catch (error:any) {
        toast.error(error.response.data.message)
      }

    }
  return (
    <Form {...form}>
      <div className="space-y-[34px] w-full">
        <div
          className={cn(
            "flex flex-col items-start gap-[20px] md:flex-row md:items-center max-phone:hidden max-phone:items-start"
          )}
        >
          <Label className="w-full max-w-[120px] text-xl font-normal text-dark33 max-phone:text-[12px]">
            필수 입력 정보
          </Label>
          <div className="flex-1 max-md:flex-col flex items-center gap-8">
            <p className="text-xl font-normal leading-[26px] text-dark tracking-[-0.6px]">
              2023 - 12 - 25 ㅣ 11:22
            </p>
            {/* status */}
            <p className="text-xl font-normal leading-[26px] text-dark tracking-[-0.6px]">
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

        {/* Element for small screen starts */}

        <div className="phone:hidden">
          <div className="flex gap-[80px] max-phone:gap-0 max-phone:justify-between">
            <div>
              <p className="text-[#333] text-[12px] tracking-[-0.36px] mb-[14px]">
                필수 입력 정보
              </p>
              <p className="text-[#d9d9d9] text-[12px] tracking-[-0.48px]">
                2023 - 12 - 25 ㅣ 11:22
              </p>
            </div>

            <div>
              <p className="text-[#333] text-[12px] tracking-[-0.36px] mb-[8px]">
                상태
              </p>
              <button
                className="w-[79px] h-[33px] rounded-[50px] bg-[#f35c5c]
              text-[#fff] tracking-[-0.42px] text-[12px]
              "
              >
                승인거절
              </button>
            </div>
          </div>
        </div>

        {/* Element for small screen ends */}

        <div
          className={cn(
            "flex flex-col items-start gap-[18px] md:flex-row md:items-center max-phone:gap-0"
          )}
        >
          {/* name */}
          <Label className="w-full max-w-[120px] text-xl font-normal text-dark33 max-phone:text-[12px] max-sm2:pl-0">
            이름
            <span className="text-red pl-2">*</span>
          </Label>
          <Input
            type="text"
            className="flex-1 bg-f1gray text-xl font-normal max-sm2:h-[40px] max-phone:text-[16px] max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none max-phone:bg-transparent max-phone:pl-1"
            placeholder="블랙컨슈머 이름을 입력해주세요"
          />
        </div>
        <div
          className={cn(
            "flex flex-col items-start gap-[18px] md:flex-row md:items-center max-phone:gap-0"
          )}
        >
          {/* phone */}
          <Label className="w-full max-w-[120px] text-xl font-normal text-dark33 max-phone:text-[12px] max-sm2:pl-0">
            휴대폰번호
            <span className="text-red pl-2">*</span>
          </Label>
          <Input
            type="text"
            className="flex-1 bg-f1gray text-xl font-normal max-sm2:h-[40px] max-phone:text-[16px] max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none max-phone:bg-transparent max-phone:pl-1"
            placeholder="- (하이픈) 제거 후 입력해주세요"
          />
        </div>
        <div
          className={cn(
            "flex flex-col items-start gap-[18px] md:flex-row md:items-center max-phone:gap-0"
          )}
        >
          {/* birth */}
          <Label className="w-full max-w-[120px] text-xl font-normal text-dark33 max-phone:text-[12px] max-sm2:pl-0">
            생년월일
            <span className="text-red pl-2">*</span>
          </Label>
          <Input
            type="text"
            className="flex-1 bg-f1gray text-xl font-normal max-sm2:h-[40px] max-phone:text-[16px] max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none max-phone:bg-transparent max-phone:pl-1"
            placeholder="생년월일 6자리를 입력해주세요 (예 : 841225)"
          />
        </div>
        <div
          className={cn(
            "flex flex-col items-start md:flex-row md:items-center gap-[18px]"
          )}
        >
          <Label className="mt-[50px] w-full max-w-[120px] text-xl font-normal text-dark33 max-phone:mt-0 max-phone:text-[12px] max-sm2:pl-0">
            피해 정보
          </Label>
        </div>
        <div className="max-sm2:flex max-sm2:flex-col grid grid-cols-2 gap-[34px] w-full">
          <div
            className={cn(
              "flex flex-col items-start md:flex-row md:items-center gap-[18px]"
            )}
          >
            {/* damageTypeName */}
            <Label className="w-full max-w-[120px] text-xl font-normal text-dark33 max-phone:text-[12px] max-sm2:pl-0">
              피해 유형
            </Label>
            <SelectInput
            options={[
              
             ...option]} 
              className="pl-6 flex w-full text-xs text-d9gray font-normal rounded-none border-d9gray md:flex-1 md:text-[20px] max-sm2:h-[40px] max-sm2:text-[16px] max-phone:pl-2 max-phone:rounded-[5px] max-phone:border-[0.5px] max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:h-[38px] max-phone:w-[160px] max-phone:pr-[2px]"
              placeholder="피해 유형 선택"
            
            />
          </div>
          {/* damageDate */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <div
                className={cn(
                  "flex flex-col items-start gap-[18px] md:flex-row md:items-center max-phone:gap-0"
                )}
              >
                <Label className="w-full max-w-[120px] text-xl font-normal text-dark33 max-phone:text-[12px] max-sm2:pl-0">
                  피해발생일
                </Label>
                <Input
                  type="text"
                  className="flex-1 text-xl font-normal max-sm2:h-[40px] max-phone:text-[18px] max-phone:pl-1 max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none"
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
                        "bg-abgray min-w-max max-phone:mt-1"
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
            "flex flex-col items-start gap-[18px] md:flex-row max-phone:gap-0"
          )}
        >
          {/* damageContent */}
          <Label className="w-full max-w-[120px] text-xl font-normal text-dark33 max-phone:text-[12px] max-sm2:pl-0">
            피해 내용
            <span className="text-red pl-2">*</span>
          </Label>
          <Textarea
            className="flex-1 min-h-[277px] text-xl font-normal resize-none rounded-none border-d9gray max-sm2:min-h-[120px] max-phone:rounded-[10px] max-phone:text-[16px]"
            placeholder="피해 사례를 입력해 주세요"
          />
        </div>
        {/* image */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <div className={cn("flex flex-col md:flex-row gap-[18px] w-full")}>
              <Label className="w-full max-w-[120px] mt-[21px] text-dark33 max-phone:text-[12px] max-sm2:pl-0">
                사진첨부
              </Label>
              <div className="flex-1 w-full">
                <div className="flex gap-[34px] max-phone:relative max-phone:flex-col phone:items-center">
                  <div className="flex flex-col items-start md:flex-row md:items-center gap-[18px] w-1/2 max-sm2:w-full">
                    <Input
                      disabled
                      type="text"
                      className=" bg-white disabled:bg-white placeholder:text-[#333333] max-phone:h-[40px] max-phone:text-[12px] max-phone:pl-0  max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none"
                      placeholder="4개의 사진이 선택되었습니다."
                      value={field.value}
                    />
                    <button
                      className={cn(
                        "text-[20px] font-normal text-white leading-[26px] tracking-[-0.6px] px-[38px] max-phone:px-[20px] max-phone:h-[60px] max-phone:rounded-sm max-phone:text-[17px]",
                        "flex items-center justify-center text-center py-2 h-[63px] max-phone:py-1 max-phone:px-[13px] max-phone:h-[30px]",
                        "bg-abgray min-w-max",
                        "max-phone:w-[89px] max-phone:h-[33px] max-phone:rounded-[50px] max-phone:border-[0.5px] max-phone:border-solid max-phone:border-[#333] max-phone:text-[#333] max-phone:bg-white",
                        "max-phone:absolute right-0"
                      )}
                    >
                      파일 선택
                    </button>
                  </div>
                  <div className="w-full max-w-[435px] flex items-center max-phone:hidden">
                    <p className="text-sm leading-[35px] tracking-[-0.6px] text-d9gray font-normal md:text-[20px] max-phone:text-[#2817e1] max-phone:tracking-[-0.33px] max-phone:font-light max-phone:leading-normal">
                      최대 10개까지 등록 가능합니다
                      <br />
                      jpg, jpeg, gif, png, bmp 형식의 이미지만 선택 가능합니다
                    </p>
                  </div>
                </div>
                <div className="mt-[22px] flex flex-col gap-[14px] md:flex-row md:items-center max-phone:grid max-phone:grid-cols-4 max-phone2:grid-cols-3 max-sm2:grid-cols-2">
                  {[
                    "블랙리스트.jpeg",
                    "블랙리스트.png",
                    "블랙리스트.jpg",
                    "블랙리스트.jpg",
                  ].map((filename, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 h-[34px] border border-d9gray max-phone:px-1"
                    >
                      <p className="text-sm leading-[18px] tracking-[-0.42px] text-d9gray">
                        {filename}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="phone:hidden w-full max-w-[435px] flex items-center mt-[18px]">
                  <p
                    className="text-sm md:text-[20px] leading-[35px] tracking-[-0.6px] text-d9gray font-normal
                    max-phone:text-[#2817e1] max-phone:tracking-[-0.33px] max-phone:font-light max-phone:leading-normal
                    "
                  >
                    최대 10개까지 등록 가능합니다
                    <br />
                    jpg, jpeg, gif, png, bmp 형식의 이미지만 선택 가능합니다
                  </p>
                </div>
              </div>
            </div>
          )}
        />
      </div>
      <div
        className={cn(
          "items-center justify-center mt-[93px] gap-4 flex max-md:flex-col max-sm2:mt-[50px] max-phone:hidden"
        )}
      >
        <Button
          onClick={() => router.push("/damage-cases")}
          type="button"
          variant="dark-gray"
          size="lg"
          className="max-sm2:w-3/2 max-sm2:text-xs p-1 col-span-2 max-sm2:w-full max-sm2:h-[60px] max-sm2:text-[1.5rem] flex-1"
        >
          목록으로
        </Button>

        <Button
          type="button"
          variant="accent"
          size="lg"
          className={cn("max-sm2:w-3/2 max-sm2:text-xs p-1", "col-span-4")}
          style={{ flex: 2 }}
        >
          수정내용 저장하여 재승인 요청하기
        </Button>

        {/* deletebutton */}
        <DeleteCaseDialog className="flex-1" />
      </div>

      <div className="phone:hidden flex flex-col justify-center  mt-[60px] ">
        <button
          className="w-[240px] h-[63px] rounded-[10px] bg-[#28a7e1] text-[#fff] text-[18px] tracking-[-0.54px] flex justify-center items-center self-center font-light max-phone:w-full"
          onClick={() => router.push("/damage-cases")}
        >
          등록 요청하기
        </button>
        <div className="flex mt-[14px] gap-[11px]">
          <button className="w-[40%] h-[60px] rounded-[10px] bg-[#4a4e57] flex justify-center items-center text-[#fff] text-[18px] font-light tracking-[-0.54px] ">
            목록으로
          </button>
          <DeleteCaseDialog className="flex-1 h-[60px] max-phone:bg-[#F35C5C] font-light max-sm2:text-[1.5rem]" />
        </div>

        <p className="text-[#f00] text-center text-[12px] tracking-[-0.36px] mt-[23px]">
          &#123;필수항목명&#125;을(를) 입력해주세요
        </p>
      </div>
    </Form>
  );
}
