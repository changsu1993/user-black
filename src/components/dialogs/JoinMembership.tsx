import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { RadioEl } from "../ui/radio-group";

import logoDark from "../../../public/logo-dark.svg";
import back from "../../../public/icons/back.svg";
import rightArrowCustom from "../../../public/icons/right-arrow-custom.svg";
import downArrowCustom from "../../../public/icons/down-arrow.svg";

type Props = {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  trigger?: ReactNode;
  openSignUpWithIdDialog?: () => void;
};

export default function JoinMembershipDialog({
  open = false,
  onOpenChange,
  trigger,
  openSignUpWithIdDialog,
}: Props) {
  const form = useForm();

  const [isMobile, setIsMobile] = useState(false);

  const [showInput1, setShowInput1] = useState(false);

  const handleClick1 = () => {
    setShowInput1(!showInput1);
  };

  const [showInput2, setShowInput2] = useState(false);

  const handleClick2 = () => {
    setShowInput2(!showInput2);
  };
  const [showInput3, setShowInput3] = useState(false);

  const handleClick3 = () => {
    setShowInput3(!showInput3);
  };
  const [showInput4, setShowInput4] = useState(false);

  const handleClick4 = () => {
    setShowInput4(!showInput4);
  };

  useEffect(() => {
    onOpenChange?.(open);
  }, [onOpenChange, open]);

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

  const handleSignUpWithIdClick = () => {
    openSignUpWithIdDialog?.(); // Header 컴포넌트의 함수 호출
  };

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
            회원가입
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-white/90 px-20 pt-[60px] pb-[65px] max-w-[580px] text-dark33 max-phone:min-h-[100vh] max-phone:px-[11px] max-phone:bg-white max-phone:z-[99999999] max-phone:block max-phone:pt-[20px]">
        <Image
          src={logoDark}
          alt="Site Logo"
          className="phone:hidden w-[31px] h-[21px] mx-auto"
        />

        <div>
          <DialogTrigger asChild>
            {isMobile ? (
              <Image
                src={back}
                role="button"
                alt="Back Icon"
                className="phone:hidden w-[24px] h-[21px]"
              />
            ) : (
              <Image
                src={"/icons/back.svg"}
                role="button"
                width={21}
                height={39}
                alt="Back Icon"
              />
            )}
          </DialogTrigger>
          <h3 className="mt-[23px] text-[35px] leading-[39px] tracking-[-1.05px] max-phone:mt-[2rem] max-phone:text-[28px]">
            회원가입
          </h3>

          <div className="mt-[47px] max-phone:mt-[22px]">
            <Form {...form}>
              {isMobile ? (
                <div className="space-y-[11px] py-[19px] bg-[#FAFAFA] px-3 border-[0.5px] border-x-0 border-solid border-[#e2e2e2]">
                  <div className="max-phone:relative">
                    <FormField
                      control={form.control}
                      name="under14"
                      render={({ field }) => (
                        <FormItem className="space-y-4 ">
                          <FormControl className="">
                            <div className="flex items-center justify-between ">
                              <RadioEl
                                checked={field.value}
                                onChange={field.onChange}
                                className=""
                                label={
                                  <span className="" onClick={handleClick1}>
                                    만 14세미만 회원입니다{" "}
                                    <span className="text-red">(필수)</span>
                                  </span>
                                }
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="absolute right-0 top-0">
                      {showInput1 ? (
                        <Image
                          src={rightArrowCustom}
                          alt="down side arrow"
                          className="w-[15px] h-[15px] z-50"
                          onClick={handleClick1}
                        />
                      ) : (
                        <Image
                          src={downArrowCustom}
                          alt="right side arrow"
                          className="w-[15px] h-[15px] "
                          onClick={handleClick1}
                        />
                      )}
                    </div>
                    {showInput1 && (
                      <textarea
                        className="h-[150px] w-[100%] px-2 py-2 bg-white rounded-[10px] border-[0.5px] border-solid border-[#fafafa] mt-[20px] outline-none resize-none"
                        placeholder="귀하의 의견..."
                      />
                    )}
                  </div>

                  <div className="max-phone:relative">
                    <FormField
                      control={form.control}
                      name="Policy"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormControl>
                            <div className="flex items-center justify-between">
                              <RadioEl
                                checked={field.value}
                                onChange={field.onChange}
                                label={
                                  <span onClick={handleClick2}>
                                    개인정보처리방침{" "}
                                    <span className="text-red">(필수)</span>
                                  </span>
                                }
                              />
                              <Link
                                href={"#"}
                                className="max-phone:hidden text-dark33 text-sm leading-[17px] tracking-[-0.42px] underline-offset-8 underline"
                              >
                                상세보기
                              </Link>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="absolute right-0 top-0">
                      {showInput2 ? (
                        <Image
                          src={rightArrowCustom}
                          alt="down side arrow"
                          className="w-[15px] h-[15px] z-50"
                          onClick={handleClick2}
                        />
                      ) : (
                        <Image
                          src={downArrowCustom}
                          alt="right side arrow"
                          className="w-[15px] h-[15px] "
                          onClick={handleClick2}
                        />
                      )}
                    </div>
                    {showInput2 && (
                      <textarea
                        className="h-[150px] w-[100%] px-2 py-2 bg-white rounded-[10px] border-[0.5px] border-solid border-[#fafafa] mt-[20px] outline-none resize-none"
                        placeholder="귀하의 의견..."
                      />
                    )}
                  </div>

                  <div className="max-phone:relative">
                    <FormField
                      control={form.control}
                      name="termsOfService"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormControl>
                            <div className="flex items-center justify-between">
                              <RadioEl
                                checked={field.value}
                                onChange={field.onChange}
                                label={
                                  <span onClick={handleClick3}>
                                    서비스 이용약관{" "}
                                    <span className="text-red">(필수)</span>
                                  </span>
                                }
                              />
                              <Link
                                href={"#"}
                                className="max-phone:hidden text-dark33 text-sm leading-[17px] tracking-[-0.42px] underline-offset-8 underline"
                              >
                                상세보기
                              </Link>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="absolute right-0 top-0">
                      {showInput3 ? (
                        <Image
                          src={rightArrowCustom}
                          alt="down side arrow"
                          className="w-[15px] h-[15px] z-50"
                          onClick={handleClick3}
                        />
                      ) : (
                        <Image
                          src={downArrowCustom}
                          alt="right side arrow"
                          className="w-[15px] h-[15px] "
                          onClick={handleClick3}
                        />
                      )}
                    </div>
                    {showInput3 && (
                      <textarea
                        className="h-[150px] w-[100%] px-2 py-2 bg-white rounded-[10px] border-[0.5px] border-solid border-[#fafafa] mt-[20px] outline-none resize-none"
                        placeholder="귀하의 의견..."
                      />
                    )}
                  </div>

                  <div className="max-phone:relative">
                    <FormField
                      control={form.control}
                      name="termsOfService2"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormControl>
                            <div className="flex items-center justify-between">
                              <RadioEl
                                checked={field.value}
                                onChange={field.onChange}
                                label={
                                  <span onClick={handleClick4}>
                                    서비스 이용약관{" "}
                                    <span className="text-dark33/30">
                                      (선택)
                                    </span>
                                  </span>
                                }
                              />
                              <Link
                                href={"#"}
                                className="max-phone:hidden text-dark33 text-sm leading-[17px] tracking-[-0.42px] underline-offset-8 underline"
                              >
                                상세보기
                              </Link>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="absolute right-0 top-0">
                      {showInput4 ? (
                        <Image
                          src={rightArrowCustom}
                          alt="down side arrow"
                          className="w-[15px] h-[15px] z-50"
                          onClick={handleClick4}
                        />
                      ) : (
                        <Image
                          src={downArrowCustom}
                          alt="right side arrow"
                          className="w-[15px] h-[15px] "
                          onClick={handleClick4}
                        />
                      )}
                    </div>
                    {showInput4 && (
                      <textarea
                        className="h-[150px] w-[100%] px-2 py-2 bg-white rounded-[10px] border-[0.5px] border-solid border-[#fafafa] mt-[20px] outline-none resize-none"
                        placeholder="귀하의 의견..."
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-[11px]">
                  <FormField
                    control={form.control}
                    name="under14"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormControl>
                          <div className="flex items-center justify-between">
                            <RadioEl
                              checked={field.value}
                              onChange={field.onChange}
                              label={
                                <span>
                                  만 14세미만 회원입니다{" "}
                                  <span className="text-red">(필수)</span>
                                </span>
                              }
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="privacyPolicy"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormControl>
                          <div className="flex items-center justify-between">
                            <RadioEl
                              checked={field.value}
                              onChange={field.onChange}
                              label={
                                <span>
                                  개인정보처리방침{" "}
                                  <span className="text-red">(필수)</span>
                                </span>
                              }
                            />
                            <Link
                              href={"#"}
                              className="text-dark33 text-sm leading-[17px] tracking-[-0.42px] underline-offset-8 underline"
                            >
                              상세보기
                            </Link>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="termsOfService"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormControl>
                          <div className="flex items-center justify-between">
                            <RadioEl
                              checked={field.value}
                              onChange={field.onChange}
                              label={
                                <span>
                                  서비스 이용약관{" "}
                                  <span className="text-red">(필수)</span>
                                </span>
                              }
                            />
                            <Link
                              href={"#"}
                              className="text-dark33 text-sm leading-[17px] tracking-[-0.42px] underline-offset-8 underline"
                            >
                              상세보기
                            </Link>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="termsOfService2"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormControl>
                          <div className="flex items-center justify-between">
                            <RadioEl
                              checked={field.value}
                              onChange={field.onChange}
                              label={
                                <span>
                                  서비스 이용약관{" "}
                                  <span className="text-dark33/30">(선택)</span>
                                </span>
                              }
                            />
                            <Link
                              href={"#"}
                              className="text-dark33 text-sm leading-[17px] tracking-[-0.42px] underline-offset-8 underline"
                            >
                              상세보기
                            </Link>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="mt-[72px] w-full">
                <Button
                  variant="dark-gray"
                  className="w-full max-phone:bg-[#141414] max-phone:text-[18px] max-phone:font-light"
                  onClick={handleSignUpWithIdClick}
                >
                  아이디로 회원가입
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
