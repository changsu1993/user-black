"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAlertDialog from "@/components/hooks/stores/alert-dialog";

import back from "../../../../public/icons/back.svg";
import customFetch from "@/lib/customfetch";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const { showAlertDialog } = useAlertDialog();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [secondPasswordVisible, setSecondPasswordVisible] = useState(false);

  const togglePasswordVisible = () => setPasswordVisible(!passwordVisible);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    loginId: "",
    password: "",
    confPassword: "",

 

  })
  const handleChange = (event: any) => {
    const { name, value } = event.target

    setUserData({ ...userData, [name]: value })
  }
  const toggleSecondPasswordVisible = () =>
    setSecondPasswordVisible(!secondPasswordVisible);

  const handleDamageClick = () => {
    router.push("/damage-cases");
  };

  const handleGoBack = () => {
    router.back();
  };
  useEffect(()=>{
    getMypage()
  },[])

  // faysel1:
  // GET /api/v1/admins/post/notices
  // This API is used to retrieve your personal information.
  const accessToken =localStorage.getItem('accessToken')
  const getMypage = async ()=>{
     customFetch.get('api/v1/mypage/info',{
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
     }).then((res)=>setUserData({...userData, loginId:res.data.loginId}) ).catch((e)=>toast.error(e.message))
  }
  
  // PATCH /api/v1/mypage/info
  // This API is for modifying your personal information.


 
  // This is a responsive project.
  // If you check the mobile size UI, you may notice that the UI changes differently.
  // Please check both desktop and mobile sizes while working on the API.
  // For more details, please refer to the Swagger documentation.
  const updateMypage = async ()=>{
    if(userData.confPassword != userData.password){
      showAlertDialog({
        buttonTxt: "확인",
        content:"Password MisMatch" ,
      })
    }
    const accessToken =localStorage.getItem('accessToken');
    const data = JSON.stringify({
      password:userData.password, name:userData.name, email:userData.email,
    });
try {
  const response = await customFetch.patch('api/v1/mypage/info',data,{
    headers:{
      'Authorization': `Bearer ${accessToken}`, 
    }
    
  });
  showAlertDialog({
    buttonTxt: "확인",
    content:"Data Updated" ,
  })

} catch (error:any) {
  console.log(error.response.data.message)
 
              showAlertDialog({
                buttonTxt: "확인",
                content:error.response.data.message[0] ,
              })
}
   
  
  }
  return (
    <main className="min-h-screen px-[1rem]">
      <section
        className={cn(
          "w-full text-dark33 max-w-[652px] mx-auto min-h-screen",
          "flex flex-col items-center text-center",
          "pt-[238px] pb-[225px] max-phone:pb-[50px] max-phone:pt-[92px] max-phone:relative max-phone:items-start"
        )}
      >
        <button
          className="absolute left-[-5px] top-[3rem] z-[9999999]"
          onClick={handleGoBack}
        >
          <Image
            src={back}
            role="button"
            alt="Back Icon"
            className="phone:hidden w-[25px] h-[25px]"
          />
        </button>
        <div className="max-phone:hidden flex lg:hidden items-center gap-[13px] mb-7">
          <Button
            variant="accent"
            className="rounded-full h-[42px] text-base font-medium leading-[21px]"
          >
            내정보 관리
          </Button>
          <Button
            onClick={handleDamageClick}
            variant="outline"
            className="rounded-full h-[42px] text-base font-medium leading-[21px] border-black text-black"
          >
            피해사례 등록현황
          </Button>
        </div>
        <div className="flex flex-col gap-3 text-center">
          <h1 className="sm:text-[35px] md:text-[45px] font-normal tracking-[-1.35px] sm:leading-[63px] max-phone:text-[28px] max-phone:text-start max-phone:leading-normal">
            내정보 관리
          </h1>
          <h3 className="text-lg md:text-[20px] font-normal text-dark tracking-[-0.6px] leading-[26px] max-phone:text-[1rem] max-phone:font-light max-phone:text-start">
            <span className="max-phone:text-[#28BEE1]">
              {" "}
              아이디, 비밀번호, 닉네임,{" "}
            </span>
            이메일 주소 등을
            <br className="phone:hidden" /> 수정 할 수 있습니다
          </h3>
        </div>
        <div className="w-full mt-[73px] max-phone:mt-[43px]">
          <div className="space-y-9">
            <div
              className={cn(
                "flex flex-col items-start m-2 md:flex-row md:items-center gap-[10px] max-phone:gap-0"
              )}
            >
              <Label className="min-w-[140px] font-normal text-[20px] text-start text-dark33 max-phone:text-[12px] max-phone:pl-0">
                아이디
              </Label>
              {/* loginId */}
              <Input
              name="loginId"
               value={userData.loginId}
              onChange={handleChange}
                type="text"
                className="flex-1 font-normal text-[20px] bg-f1gray cursor-pointer max-phone:h-[40px] max-phone:text-[16px] max-phone:pl-0 max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none max-phone:bg-transparent"
           
                onClick={() => router.push("/dormant-account")}
              />
            </div>

            <div>
              <div
                className={cn(
                  "flex flex-col items-start m-2 md:flex-row md:items-center gap-[10px] max-phone:relative max-phone:gap-0"
                )}
              >
                {/* password */}
                <Label className="min-w-[140px] font-normal text-[20px] text-start text-dark33 max-phone:text-[12px] max-phone:pl-0">
                  비밀번호
                </Label>
                <Input
                 name="password"
                 value={userData.password}
                 onChange={handleChange}
                  type={passwordVisible ? "text" : "password"}
                  className="flex-1 font-normal text-[20px] max-phone:h-[40px] max-phone:text-[16px] max-phone:pl-0
                  max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none max-phone:bg-transparent"
                  placeholder="6자리 이상 영문/숫자 조합"
                />

                <span
                  onClick={togglePasswordVisible}
                  className="absolute right-1 top-[44px] transform translate-y-[-50%] phone:hidden"
                >
                  {passwordVisible ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
            </div>

            <div>
              <div
                className={cn(
                  "flex flex-col items-start m-2 md:flex-row md:items-center gap-[10px] max-phone:relative max-phone:gap-0"
                )}
              >
                <Label className="min-w-[140px] font-normal text-[20px] text-start text-dark33 max-phone:text-[12px] max-phone:pl-0">
                  비밀번호 확인
                </Label>
                <Input
                 name="confPassword"
                 value={userData.confPassword}
                 onChange={handleChange}
                  type={secondPasswordVisible ? "text" : "password"}
                  className="flex-1 font-normal text-[20px] max-phone:h-[40px] max-phone:text-[16px] max-phone:pl-0 max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none max-phone:bg-transparent"
                  placeholder="6자리 이상 영문/숫자 조합"
                />
                <span
                  onClick={toggleSecondPasswordVisible}
                  className="absolute right-1 top-[44px] transform translate-y-[-50%] phone:hidden"
                >
                  {secondPasswordVisible ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
            </div>

            <div>
              <div
                className={cn(
                  "flex flex-col items-start m-2 md:flex-row md:items-center gap-[10px] max-phone:gap-0 max-phone:relative"
                )}
              >
                {/* name */}
                <Label className="min-w-[140px] font-normal text-[20px] text-start text-dark33 max-phone:text-[12px] max-phone:pl-0">
                  닉네임
                </Label>
                <Input
                name="name"
           
                value={userData.name}
                onChange={handleChange}
                  type="text"
                  className="flex-1 font-normal text-[20px] max-phone:h-[40px] max-phone:text-[16px] max-phone:pl-0 
                  max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none max-phone:bg-transparent"
                  placeholder="사랑"
                />
                <button
                  className="absolute right-1 bottom-[-5px] transform translate-y-[-50%] w-[79px] h-[33px] border-[1px] border-solid border-[#333] rounded-[50px] flex items-center justify-center
                    text-[14px] text-[#333] font-light phone:hidden"
                >
                  중복확인
                </button>
              </div>
            </div>

            <div
              className={cn(
                "flex flex-col items-start m-2 md:flex-row md:items-center gap-[10px] max-phone:gap-0"
              )}
            >
              {/* email */}
              <Label className="min-w-[140px] font-normal text-[20px] text-start text-dark33 max-phone:text-[12px] max-phone:pl-0">
                이메일 주소
              </Label>
              <Input
               name="email"
               value={userData.email}
               onChange={handleChange}
                type="text"
                className="flex-1 font-normal text-[20px] max-phone:h-[40px] max-phone:text-[16px] max-phone:pl-0 
                max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] outline-none max-phone:bg-transparent"
                placeholder="cc22@naver.com"
              />
            </div>
          </div>

          <Button
            size={"lg"}
            onClick={updateMypage
            }
            type="button"
            variant="accent"
            className="w-full mt-[86px] font-normal text-[25px] max-phone:h-[63px] max-phone:text-[18px] max-phone:mt-[50px] max-phone:bg-[#141414]"
          >
            수정하기
          </Button>

          <Button
            size={"lg"}
            onClick={handleGoBack}
            type="button"
            variant="accent"
            className="phone:hidden w-full mt-[14px] font-normal text-[25px] max-phone:h-[63px] max-phone:text-[18px] max-phone:mt-[14px] max-phone:bg-transparent
            border-[0.5px] border-solid border-[#333] rounded-[10px] text-black
            "
          >
            취소
          </Button>
        </div>
      </section>
    </main>
  );
}
