"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {toast} from 'react-toastify';
const axios = require('axios');
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import JoinMembershipDialog from "./JoinMembership";
import back from "../../../public/icons/back.svg";
import customFetch from "@/lib/customfetch";

type Props = {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  trigger?: ReactNode;
  joinMembershipTrigger?: () => void;
  openFindCredsDialog?: () => void;
};

export default function LoginDialog({
  open = false,
  onOpenChange,
  trigger,
  joinMembershipTrigger,
  openFindCredsDialog,
}: Props) {
  const router = useRouter();
  const form = useForm();
    const [loginData, setLoginData]=useState({
      loginId:"",
      password:""
      

    })
    const handleChange = (event: any) => {
      const { name, value } = event.target
      console.log(name);
      setLoginData({...loginData, [name]: value})
     }
  useEffect(() => {
    onOpenChange?.(open);
    return () => {
      if (!open) {
        setLoginData({
        
          loginId: "",
          password: "",
         
        });
      }
    };
  }, [onOpenChange, open]);

  const handleJoinClick = () => {
    onOpenChange?.(false); // 로그인 모달을 닫는다
    joinMembershipTrigger?.(); // 회원가입 모달을 연다
  };

  const handleFindCredsClick = () => {
    openFindCredsDialog?.(); // Header 컴포넌트의 함수 호출
  };

  const handleGoBack = () => {
    router.back();
  };
  const handleLogin = async (values: any) => {

    const { loginId, password } = loginData;
    const credentials = `${loginId}:${password}`;
    console.log(credentials);
    const encodedCredentials = btoa(credentials);
     console.log(encodedCredentials);

    try {
      const response = await customFetch.post(
        "/api/v1/auth/users/login",
        {},
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
          },
        }
      );

      if (response.data) {
       localStorage.setItem("accessToken", response.data.accessToken);
        toast.success("Login Success", {
          autoClose: 3000,
        });
        onOpenChange?.(false);
        setLoginData({loginId:"", password:""})
      }

    
    } catch (error: any) {
      console.log(error);

      toast.error(error.response.data.message, {
        autoClose: 3000,
      });
    }
  };
  

//   const handleLogin= async ()=>{
// const response = await customFetch.post('/api/v1/auth/users/login', {
  
// })
 
  // faysel1:
  // POST /api/v1/auth/users/login
  // This API is a login API.                  

  // This is a responsive project.
  // If you check the mobile size UI, you may notice that the UI changes differently.
  // Please check both desktop and mobile sizes while working on the API.
  // For more details, please refer to the Swagger documentation.

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <button
            type="button"
            className="text-xl leading-[26px] tracking-[-0.6px] font-medium transition-all underline-offset-4 hover:underline"
          >
            로그인
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-white/90 px-20 pt-[60px] pb-[110px] max-w-[580px] text-dark33 max-phone:min-h-[100vh] max-phone:px-[25px] max-phone:bg-white max-phone:z-[99999999]">
        <div>
          <Image
            src={"/logo-dark.svg"}
            width={79}
            height={54}
            alt="Site Logo"
            className="max-phone:hidden"
          />
          <h3 className="mt-8 text-[35px] leading-[39px] tracking-[-1.05px] max-phone:hidden">
            로그인
          </h3>
          <p className="mt-4 text-xl leading-[18px] tracking-[-0.6px] text-dark3C max-phone:hidden">
            <span className="text-accent">아이디</span>와{" "}
            <span className="text-accent">비밀번호</span>를 입력해 주세요
          </p>

          {/* For small screen */}
          <DialogTrigger asChild>
            <Image
              src={back}
              role="button"
              alt="Back Icon"
              className="phone:hidden w-[25px] h-[25px]"
            />
          </DialogTrigger>
          <h3
            className="phone:hidden mt-8 text-[35px] leading-[39px] font-normal tracking-[-1.05px]
          max-phone:text-[#333] max-phone:text-[28px]
          "
          >
            로그인
          </h3>
          <p
            className="phone:hidden mt-4 max-phone:mt-[23px] text-xl leading-[18px] tracking-[-0.6px] text-dark3C
          max-phone:text-[16px] max-phone:tracking-[-0.48px] mb-[45px]
          "
          >
            <span className="text-accent">아이디</span>와{" "}
            <span className="text-accent">비밀번호</span>를 입력해 주세요
          </p>
          <Image
            src={"/logo-dark.svg"}
            width={79}
            height={54}
            alt="Site Logo"
            className="phone:hidden mx-auto "
          />

          {/*  */}

          <div className="mt-9">
            <Form {...form}>
              <div className="space-y-[26px] max-phone:space-y-[16px]">
                {/* loginId */}
                <FormField
                  control={form.control}
                  name="id"
                  render={({}) => (
                    <FormItem className="space-y-4 max-phone:space-y-[13px]">
                      <FormLabel className="text-dark33 max-phone:text-[15px]">
                        아이디
                      </FormLabel>
                      <FormControl>
                        <Input
                        name="loginId"
                        onChange={handleChange}
                        value={loginData.loginId}
                          type="text"
                          className="placeholder:text-dark33 border-dark33/20 rounded-[10px] h-[70px] bg-white/10 max-phone:placeholder:text-[#d9d9d9] max-phone:h-[63px] max-phone:p-0 max-phone:pl-[18px] max-phone:text-[16px]"
                          placeholder="아이디를 입력해 주세요"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({}) => (
                    <FormItem className="space-y-4 max-phone:space-y-[13px]">
                      <FormLabel className="text-dark33 max-phone:text-[15px]">
                        비밀번호
                      </FormLabel>
                      <FormControl>
                        <Input
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                          type="text"
                          className="placeholder:text-dark33 border-dark33/20 rounded-[10px] h-[70px] bg-white/10 max-phone:placeholder:text-[#d9d9d9] max-phone:h-[63px] max-phone:p-0 max-phone:pl-[18px] max-phone:text-[16px]"
                          placeholder="비밀번호는 11자리 이상의 영문, 숫자 혼합 입니다"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-[55px] w-full grid gap-2 max-phone:gap-[15px]">
                <Button
                onClick={handleLogin}
                  variant="dark-gray"
                  className="w-full col-span-full max-phone:bg-[#141414] max-phone:text-[18px] max-phone:font-light"
                >
                  확인
                </Button>
                {/* <FormAlertDialog /> */}
                <div className="flex gap-[13px]">
                  <JoinMembershipDialog
                    // onOpenChange={(value) => {
                    //   if (value === true) setOpen(false);
                    // }}
                    trigger={
                      <Button
                        variant="dark-gray"
                        className="w-full max-phone:bg-[#141414] max-phone:text-[18px] max-phone:font-light"
                        onClick={handleJoinClick}
                      >
                        회원가입
                      </Button>
                    }
                  />
                  <Button
                    variant="dark-gray"
                    className="w-full max-phone:bg-[#fff] max-phone:text-[18px] max-phone:font-light max-phone:text-[#000] max-phone:border-[1px] max-phone:rounded-[10px]  max-phone:border-[#4a4e57]"
                    onClick={handleFindCredsClick}
                  >
                    아이디/비밀번호 찾기
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )};
