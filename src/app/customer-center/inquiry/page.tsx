"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAlertDialog from "@/components/hooks/stores/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

import back from "../../../../public/icons/small-back.svg";
import customFetch from "@/lib/customfetch";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const { showAlertDialog } = useAlertDialog();
  const handleNoticeClick = () => {
    router.push("/customer-center/announcements");
  };

  const handleFaqs = () => {
    router.push("/customer-center/faqs");
  };

  const handleGoBack = () => {
    router.back();
  };
const [InquiryData, setInquiryData]= useState({
  title:'',
  content:'',
  email:'',
  phone:'',

})
const handleChange = (event:any)=>{
const {name, value}=event.target;
setInquiryData({...InquiryData, [name]:value})
}



  // faysel1:
  // POST /api/v1/post/inquiries
  // This API is for registering 1:1 inquiries.
  // You need to provide the title, inquiry details, email, and mobile phone number to register the data.

  // This is a responsive project.
  // If you check the mobile size UI, you may notice that the UI changes differently.
  // Please check both desktop and mobile sizes while working on the API.
  // For more details, please refer to the Swagger documentation."
  const sendInquiry = async()=>{
    const accessToken =typeof window !== 'undefined' && window.localStorage?
  // Use localStorage here
  localStorage.getItem('accessToken'):null
    
    let data = JSON.stringify({
  title:InquiryData.title,
  content:InquiryData.content,
  email:InquiryData.email,
  phone:InquiryData.phone
    })
    if(
     InquiryData.title&&
    InquiryData.content&&
     InquiryData.email&&
      InquiryData.phone
    ){
      try {
        const response = await customFetch.post('api/v1/post/inquiries', data,{
          headers:{
            Authorization:`Bearer ${accessToken}`
          }
        })
        if(response.data){
          toast.success('Inquiry Added')
          setTimeout(() => {
            router.push("/customer-center/inquiry/success")
          }, 1000);
        }
        console.log(response)
        
      } catch (error:any) {
        toast.error(error.response.data.message)
      }
    }else{
      toast.error("모든 필드를 채워주세요")
    }
    
  
  }
  return (
    <main className="min-h-screen">
      <section
        className={cn(
          "w-full text-dark33 max-w-[652px] mx-auto min-h-screen",
          "flex flex-col items-center text-center",
          "pt-[238px] pb-[197px] max-phone:pt-[100px] max-phone:pb-[20px] px-[25px]"
        )}
      >
        <button
          className="absolute z-[9999999] left-3 top-[4rem]"
          onClick={handleGoBack}
        >
          <Image
            src={back}
            // role="button"
            // width={19}
            // height={12}
            alt="Back Icon"
            className="phone:hidden "
          />
        </button>

        <div className="flex max-phone:flex lg:hidden items-center gap-[13px] mb-10">
          <Button
            onClick={handleNoticeClick}
            variant="outline"
            className="rounded-full w-[118px] h-[42px] text-base font-medium leading-[21px] border-black text-black max-phone:text-[#ACACAC] max-phone:border-[#ACACAC] max-phone:font-normal"
          >
            공지사항
          </Button>
          <Button
            onClick={handleFaqs}
            variant="outline"
            className="rounded-full w-[95px] h-[42px] text-base font-medium leading-[21px]  border-black text-black max-phone:text-[#ACACAC] max-phone:border-[#ACACAC] max-phone:font-normal"
          >
            FAQ
          </Button>
          <Button
            variant="accent"
            className="rounded-full w-[108px] h-[42px] text-base font-medium leading-[21px] max-phone:font-normal"
          >
            1:1 문의
          </Button>
        </div>
        <div className=" md:text-center flex flex-col gap-2 max-phone:self-start">
          <h1 className="text-[30px] md:text-[45px] font-normal tracking-[-1.35px] leading-[63px] max-phone:self-start max-phone:text-[28px] max-phone:leading-[39px]">
            1:1 문의
          </h1>
          <p className="mt-[18px] text-[20px] font-normal text-start text-dark tracking-[-0.6px] md:text-center leading-[32px] max-phone:text-[16px] max-phone:leading-normal max-phone:text-left">
            서비스 이용 관련해서 궁금한 점 있으신가요?
            <br />
            문의사항을 남겨 주시면 <br /> 이메일 주소로 답변을 보내드립니다.
          </p>
        </div>
        <div className="w-full mt-[68px] max-phone:mt-[50px]">
          <div className="space-y-9 max-phone:space-y-[26px]">
            <div
              className={cn(
                "flex flex-col md:flex-row items-start m-2 md:items-center gap-[10px] max-phone:m-0"
              )}
            >
              {/* title */}
              <Label className="min-w-[140px] text-xl font-normal text-start text-dark33 max-phone:text-[15px]">
                제목
              </Label>
              <Input
              name="title"
              value={InquiryData.title}
              onChange={handleChange}
                type="text"
                className="flex-1 max-phone:h-[63px] text-xl font-normal max-phone:pl-[18px] max-phone:text-[16px] max-phone:rounded-[10px] border-[#D9D9D9]"
                placeholder="제목을 작성해 주세요"
              />
            </div>

            <div
              className={cn(
                "flex flex-col md:flex-row mt-5 m-2 gap-[10px] max-phone:m-0"
              )}
            >
              {/* content */}
              <Label className="min-w-[140px] text-xl font-normal text-start text-dark33 max-phone:text-[15px]">
                문의 내용
              </Label>
              <Textarea
                name="content"
                value={InquiryData.content}
                onChange={handleChange}
                rows={5}
                className="flex-1 min-h-[162px] text-xl font-normal bg-transparent border border-d9gray rounded-none resize-none max-phone:pl-[18px] max-phone:min-h-[80px] max-phone:max-h-[80px] max-phone:text-[16px] max-phone:rounded-[10px]"
                placeholder="문의 내용을 작성해 주세요"
              />
            </div>

            <div
              className={cn(
                "phone:hidden flex flex-col md:flex-row items-start m-2 md:items-center gap-[10px] max-phone:m-0"
              )}
            >
              {/* email */}
              <Label className="min-w-[140px] text-xl font-normal text-start text-dark33 max-phone:text-[15px]">
                이메일 주소
              </Label>
              <Input
                name="email"
                value={InquiryData.email}
                onChange={handleChange}
                type="text"
                className="flex-1 max-phone:h-[63px] text-xl font-normal max-phone:pl-[18px] max-phone:text-[16px] max-phone:rounded-[10px] border-[#D9D9D9]"
             
              />
            </div>

            <div
              className={cn(
                "phone:hidden flex flex-col md:flex-row items-start m-2 md:items-center gap-[10px] max-phone:m-0"
              )}
            >
              {/* phone */}
              <Label className="min-w-[140px] text-xl font-normal text-start text-dark33 max-phone:text-[15px]">
                휴대폰번호
              </Label>
              <Input
                name="phone"
                value={InquiryData.phone}
                onChange={handleChange}
                type="text"
                className="flex-1 max-phone:h-[63px] text-xl font-normal max-phone:pl-[18px] max-phone:text-[16px] max-phone:rounded-[10px] border-[#D9D9D9]"
  
              />
            </div>

            <div
              className={cn(
                "max-phone:hidden flex flex-col md:flex-row items-start m-2 md:items-center gap-[10px]"
              )}
            >
              {/* email */}
              <Label className="min-w-[140px] text-xl font-normal text-start text-dark33 max-sm2:text-[1rem] border-[#D9D9D9">
                이메일 주소
              </Label>
              <Input
                  name="email"
                  value={InquiryData.email}
                  onChange={handleChange}
                type="text"
                className="flex-1 max-sm2:h-[40px] text-xl font-normal max-sm2:text-[0.7rem]"
          
              />
            </div>
            <div
              className={cn(
                "max-phone:hidden flex flex-col md:flex-row items-start m-2 md:items-center gap-[10px]"
              )}
            >
              {/* phone */}
              <Label className="min-w-[140px] text-xl font-normal text-start text-dark33 max-sm2:text-[1rem] border-[#D9D9D9]">
                휴대폰번호eChnag
              </Label>
              <Input
                name="phone"
                value={InquiryData.phone}
                onChange={handleChange}
                type="text"
                className="flex-1 text-xl font-normal max-sm2:text-[0.7rem] max-phone:h-[30px]"
          
              />
            </div>
          </div>

          <Button
            size={"lg"}
            onClick={() =>sendInquiry()}
            type="button"
            variant="accent"
            className="w-full mt-[86px] text-xl font-normal max-phone:h-[63px] max-phone:text-[18px] max-phone:mt-[56px] max-phone:bg-[#141414]"
          >
            문의하기
          </Button>

          <Button
            size={"lg"}
            onClick={handleGoBack}
            type="button"
            variant="accent"
            className="phone:hidden text-[#000] bg-white w-full mt-[14px] text-xl font-normal max-phone:h-[63px] max-phone:text-[18px]  
            border-[0.5px] border-solid border-[#333] rounded-[10px]
            "
          >
            취소
          </Button>
        </div>
      </section>
    </main>
  );
}
