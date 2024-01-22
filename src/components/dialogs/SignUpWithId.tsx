import Link from "next/link";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { toast } from 'react-toastify';
const axios = require('axios');
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SelectEl } from "../ui/select";
import logoDark from "../../../public/logo-dark.svg";
import back from "../../../public/icons/back.svg";
import customFetch from "@/lib/customfetch";



type Props = {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  trigger?: ReactNode;
};

export default function SignUpWithIdDialog({
  open = false,
  onOpenChange,
  trigger,
}: Props) {
  const form = useForm();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    loginId: "",
    password: "",
    confPassword: "",
    phone: "",
    gosiwonname: "",
    gosiwonAddress: ""

  })

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisible = () => setPasswordVisible(!passwordVisible);

  const [secondPasswordVisible, setSecondPasswordVisible] = useState(false);
  const toggleSecondPasswordVisible = () =>
    setSecondPasswordVisible(!secondPasswordVisible);

  const [isMobile, setIsMobile] = useState(false);


  const handleChange = (event: any) => {
    const { name, value } = event.target

    setUserData({ ...userData, [name]: value })
  }


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 540);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    onOpenChange?.(open);

    // Cleanup function to reset userData when the dialog is closed
    return () => {
      if (!open) {
        setUserData({
          name: "",
          email: "",
          loginId: "",
          password: "",
          confPassword: "",
          phone: "",
          gosiwonname: "",
          gosiwonAddress: "",
        });
      }
    };
  }, [onOpenChange, open]);

  const handleRegister = async () => {
    try {





      if (userData.password != userData.confPassword) {
        toast.error("Password Mismatch", {
          autoClose: 3000,
        });

      }
      if (userData.loginId &&
        userData.password &&
        userData.name &&
        userData.email &&

        userData.gosiwonname &&
        userData.gosiwonAddress) {
        let data = JSON.stringify({
          "loginId": userData.loginId,
          "password": userData.password,
          "name": userData.name,
          "email": userData.email,
          "phone": userData.email,
          "gosiwonName": userData.gosiwonname,
          "gosiwonAddress": userData.gosiwonAddress
        });



        customFetch.post('api/v1/auth/users/register', data)
          .then((response: any) => {

            console.log(JSON.stringify(response.data));
            toast.success('Registered SuccessFully ', {
              autoClose: 3000,
            });
            onOpenChange?.(false);
            console.log(data)
          })
          .catch((error: any) => {
            console.log(error.response.data.message);
            toast.error(error.response.data.message[0], {
              autoClose: 3000,
            });

          });
      } else {
        toast.error("모든 필드를 작성하십시오")
      }

    } catch (e: any) {
      console.log(e.response.data.message)
    }
  }


  // faysel1:
  // POST /api/v1/auth/users/register
  // This is a sign-up API.

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
            className="text-xl leading-[26px] focus-visible:outline-none tracking-[-0.6px] font-medium transition-all underline-offset-4 hover:underline"
          >
            Sign Up
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-white/90 px-[71px] pt-[46px] pb-[60px] max-w-[580px] text-dark33 max-phone:max-h-[100vh] max-phone:px-2 max-phone:pt-[20px] max-phone:bg-white">
        <Image
          src={logoDark}
          alt="Site Logo"
          className="phone:hidden w-[31px] h-[21px] mx-auto"
        />

        <DialogTrigger asChild>
          {isMobile ? (
            <Image
              src={back}
              role="button"
              alt="Back Icon"
              className="phone:hidden w-[25px] h-[25px]"
            />
          ) : (
            <Image
              src={"/icons/back.svg"}
              role="button"
              width={21}
              height={39}
              alt="Back Icon"
              className="max-phone:hidden"
            />
          )}
        </DialogTrigger>

        <div className="max-phone:pl-[18px] max-phone:pr-[16px]">
          <h3 className="mt-[23px] text-[35px] font-normal leading-[39px] tracking-[-1.05px] max-phone:text-[#333] max-phone:text-[28px]">
            아이디로 회원가입
          </h3>

          <p
            className="phone:hidden mt-4 max-phone:mt-[23px] text-xl leading-[18px] tracking-[-0.6px] text-dark3C
          max-phone:text-[16px] max-phone:tracking-[-0.48px] mb-[45px]
          "
          >
            <span className="text-accent">아이디</span>와{" "}
            <span className="text-accent">비밀번호</span>를 입력해 주세요
          </p>

          <div className="mt-[27px]">

            <Form {...form}>
              <div className="space-y-[15px]">
                {/* loginId */}
                <FormField
                  control={form.control}

                  name="id"
                  render={({ field }) => (
                    <FormItem className="space-y-[4px]">
                      <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[13px]">
                        아이디
                      </FormLabel>
                      <FormControl >
                        <Input
                          onChange={handleChange}
                          value={userData.loginId}
                          name="loginId"

                          className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none max-phone:bg-transparent max-phone:placeholder:text-d9gray max-phone:px-0 max-phone:text-[16px]"
                          placeholder="사용하실 아이디를 입력해 주세요"
                          trailing="중복확인"
                          trailingStyle="text-sm font-normal max-phone:bg-white max-phone:!text-[#333] max-phone:!border-[#333] max-phone:!border-solid max-phone:!border-[1px] max-phone:!rounded-[50px] max-phone:pt-[7px] max-phone:pr-[16px] max-phone:pb-[8px] max-phone:pl-[15px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="relative">
                  {/* password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-[4px]">
                        <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[13px]">
                          비밀번호
                        </FormLabel>
                        <FormControl>
                          <Input
                            name="password"
                            onChange={handleChange}
                            value={userData.password}
                            className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none max-phone:bg-transparent max-phone:placeholder:text-d9gray max-phone:px-0"
                            placeholder="8자리 영문, 숫자, 특수문자 조합으로 입력해주세요"
                            trailingStyle="text-sm font-normal"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <span
                    onClick={togglePasswordVisible}
                    className="absolute right-1 bottom-2 transform translate-y-[-50%]"
                  >
                    {passwordVisible ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>

                <div className="relative">
                  <FormField
                    control={form.control}
                    name="confPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-[4px]">
                        <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[13px]">
                          비밀번호 확인
                        </FormLabel>
                        <FormControl>
                          <Input
                            name="confPassword"
                            onChange={handleChange}
                            value={userData.confPassword}
                            className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none max-phone:bg-transparent max-phone:placeholder:text-d9gray max-phone:px-0"
                            placeholder="비밀번호를 한번 더 입력해주세요"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <span
                    onClick={toggleSecondPasswordVisible}
                    className="absolute right-1 bottom-2 transform translate-y-[-50%]"
                  >
                    {secondPasswordVisible ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>

                {/* name */}
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem className="space-y-[4px]">
                      <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[13px]">
                        닉네임
                      </FormLabel>
                      <FormControl>
                        <Input
                          name="name"
                          onChange={handleChange}
                          value={userData.name}
                          className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none max-phone:bg-transparent max-phone:placeholder:text-d9gray max-phone:px-0"
                          placeholder="닉네임을 입력해 주세요 (최소 두 글자 이상 입력)"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-[4px]">
                      <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[13px]">
                        이메일
                      </FormLabel>
                      <FormControl>
                        <Input
                          name="email"
                          onChange={handleChange}
                          value={userData.email}
                          className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none max-phone:bg-transparent max-phone:placeholder:text-d9gray max-phone:px-0"
                          placeholder="소식 받으실 이메일을 입력해주세요"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* gosiwonName */}
                <FormField
                  control={form.control}
                  name="gosiwon.name"
                  render={({ field }) => (
                    <FormItem className="space-y-[4px]">
                      <FormLabel className="phone:hidden font-normal text-dark33 leading-[25px] max-phone:text-[13px]">
                        고시원 이름
                      </FormLabel>
                      <FormControl>
                        <Input
                          name="gosiwonname"
                          onChange={handleChange}
                          value={userData.gosiwonname}
                          className="phone:hidden rounded-[5px] h-11 px-4 leading-[25px] font-normal tracking-[-0.48px] max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none max-phone:bg-transparent max-phone:px-0"
                          placeholder="고시원 이름을 입력해주세요"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* gosiwonAddress */}
                <FormField
                  control={form.control}
                  name="gosiwon.address"
                  render={({ field }) => (
                    <FormItem className="space-y-[4px]">
                      <FormLabel className="phone:hidden font-normal text-dark33 leading-[25px] max-phone:text-[13px]">
                        고시원 주소
                      </FormLabel>
                      <FormControl>
                        <Input
                          name="gosiwonAddress"
                          onChange={handleChange}
                          value={userData.gosiwonAddress}
                          className="phone:hidden rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none max-phone:bg-transparent max-phone:px-0"
                          placeholder="고시원 주소를 입력해주세요"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-[4px]">
                      <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[13px]">
                        휴대폰번호
                      </FormLabel>
                      <FormControl>
                        <div className="w-full grid grid-cols-12 gap-[6px]">
                          <SelectEl
                            placeholder="통신사"
                            className="col-span-3 max-phone:p-0 max-phone:pl-[2px] max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none max-phone:bg-transparent max-phone:text-[16px]"
                            options={[
                              {
                                label: "Opt 1",
                                value: "opt-1",
                              },
                              {
                                label: "Opt 2",
                                value: "opt-2",
                              },
                            ]}
                          />
                          <div className="col-span-9">
                            <Input
                              name="phone"
                              onChange={handleChange}
                              value={userData.phone}
                              className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none max-phone:bg-transparent max-phone:placeholder:text-d9gray max-phone:px-0"
                              placeholder="휴대폰번호를 입력해주세요"
                              trailing={"전송"}
                              trailingStyle="text-sm font-normal max-phone:bg-white max-phone:!text-[#333] max-phone:!border-[#333] max-phone:!border-solid max-phone:!border-[1px] max-phone:!rounded-[50px] max-phone:pt-[7px] max-phone:pr-[22px] max-phone:pb-[8px] max-phone:pl-[21px]"
                            />
                          </div>
                          <div className="col-span-full">
                            <Input
                              name="phone"
                              onChange={handleChange}
                              value={userData.phone}
                              className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none max-phone:bg-transparent max-phone:placeholder:text-d9gray max-phone:px-0"
                              placeholder="인증번호를 입력해주세요"
                              trailing="인증하기"
                              trailingStyle="text-sm font-normal max-phone:bg-white max-phone:!text-[#333] max-phone:!border-[#333] max-phone:!border-solid max-phone:!border-[1px] max-phone:!rounded-[50px] max-phone:pt-[7px] max-phone:pr-[16px] max-phone:pb-[8px] max-phone:pl-[15px]"
                            />
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4 pt-2 max-phone:hidden">
                  {/* gosiwonName */}
                  <FormField
                    control={form.control}
                    name="gosiwonname"
                    render={({ field }) => (
                      <FormItem className="space-y-[4px]">
                        <FormLabel className="text-base font-normal text-dark33 leading-[25px]">
                          고시원 이름
                        </FormLabel>
                        <FormControl>
                          <Input
                            name="gosiwonname"
                            onChange={handleChange}
                            value={userData.gosiwonname}
                            className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray"
                            placeholder="고시원 이름을 입력해주세요"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {/* gosiwonAddress */}
                  <FormField
                    control={form.control}
                    name="gosiwonAddress"
                    render={({ field }) => (
                      <FormItem className="space-y-[4px]">
                        <FormLabel className="text-base font-normal text-dark33 leading-[25px]">
                          고시원 주소
                        </FormLabel>
                        <FormControl>
                          <Input
                            name="gosiwonAddress"
                            onChange={handleChange}
                            value={userData.gosiwonAddress}
                            className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray"
                            placeholder="고시원 주소를 입력해주세요"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="max-phone:hidden mt-[65px] flex items-center gap-[18px] w-full">
                <Button variant="light" className="w-full">
                  취소
                </Button>
                <Button onClick={handleRegister} variant="dark-gray" className="w-full">
                  가입 승인
                </Button>
              </div>

              {/* Buttons for small screen */}
              <div className="phone:hidden mt-[60px] flex flex-col gap-[14px]">
                <Button
                  variant="dark-gray"
                  className="w-full max-sm2:col-span-full max-phone:bg-[#141414] max-phone:text-[18px] max-phone:font-light"
                >
                  가입승인
                </Button>

                <Button
                  variant="dark-gray"
                  className="w-full max-sm2:col-span-full max-phone:bg-transparent max-phone:text-[18px] max-phone:font-light
                    border-[0.5px] border-solid border-[#333] text-[#000]
                    "
                >
                  취소
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
