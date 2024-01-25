import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import logoDark from "../../../public/logo-dark.svg";
import back from "../../../public/icons/back.svg";
import customFetch from "@/lib/customfetch";
import { toast } from "react-toastify";

type Props = {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  trigger?: ReactNode;
};

export default function FindCredsDialog({
  open = false,
  onOpenChange,
  trigger,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);



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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="dark-gray"
            className="w-full max-sm2:col-span-full max-phone:bg-[#fff] max-phone:text-[18px] max-phone:font-light max-phone:text-[#000] max-phone:border-[1px] max-phone:rounded-[10px] max-phone:border-[#4a4e57]"
          >
            아이디/비밀번호 찾기
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-white/90 px-[70px] pt-[53px] pb-[73px] max-w-[580px] text-dark33 max-phone:min-h-[100vh] max-phone:block max-phone:pl-[18px] max-phone:pr-[16px] max-phone:pt-[20px] max-phone:pb-[50px] max-phone:bg-white">
        <Image
          src={logoDark}
          alt="Site Logo"
          className="phone:hidden w-[31px] h-[21px] mx-auto"
        />

        <DialogTrigger asChild>
          <Image
            src={back}
            role="button"
            alt="Back Icon"
            className="phone:hidden w-[25px] h-[25px] max-phone:mb-[20px]"
          />
        </DialogTrigger>

        <Tabs defaultValue="find-id">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="find-id">아이디 찾기</TabsTrigger>
            <TabsTrigger value="find-password">비밀번호 찾기</TabsTrigger>
          </TabsList>
          <TabsContent value="find-id">
            <FindIdForm />
          </TabsContent>
          <TabsContent value="find-password">
            <FindPasswordForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function FindIdForm() {
  const form = useForm();
  const [credData, setCredData] = useState({
    email: "",
    name: ""
  })
  const [loginId, setLogin] = useState('login-id')





  // faysel1:
  // GET /api/v1/users/login-id
  // This API is used to find a user's ID.
  // When a user inputs their ID and email for a query, you need to insert the ID obtained from the data into the space at code line 160 where it says ID : example123.

  // For more details, please refer to the Swagger documentation."

  const handleOnchange = (event: any) => {
    const { name, value } = event.target;

    setCredData({ ...credData, [name]: value })

  }
  const handleFindId = () => {
    let data: any = JSON.stringify({
      email: credData.email
    })
    //console.log(credData)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Example usage:
;
    if (credData.name && credData.email && emailRegex.test(credData.email)) {
      const accessToken =typeof window !== 'undefined' && window.localStorage?
  // Use localStorage here
  localStorage.getItem('accessToken'):null
      let config = {
    
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'Content-type': 'application/json'
        },
       
      };

      customFetch.get(`api/v1/users/login-id?name=${encodeURIComponent(credData.name)}&email=${encodeURIComponent(credData.email)}`, config).then((res) => {
        console.log(res.data)
        setLogin(res.data.loginId)
      }).catch(
        (error: any) => {
          console.log(error.response.data.message)
          toast.error(error.response.data.message.isArray? error.response.data.message[0]:error.response.data.message)
        }
      )
    } else {
      toast.error("모든 필드를 채워주세요")
    }

  }

  return (
    <div className="mt-[49px] w-full">
      <h3 className="text-[35px] font-normal leading-[39px] tracking-[-1.05px] max-phone:text-[26px] max-phone:leading-normal">
        아이디 찾기
      </h3>
      <p className="mt-[15px] text-base font-medium leading-[18px] tracking-[-0.48px] text-dark3C">
        가입하실 때 입력한{" "}
        <span className="max-phone:text-[#28BEE1]"> 닉네임과 이메일주소를</span>{" "}
        입력해주세요
      </p>
      <div className="mt-[25px]">
        <Form {...form}>
          <div className="space-y-[14px] max-phone:space-y-[38px]">
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="space-y-[4px]">
                  <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[12px]">
                    닉네임
                  </FormLabel>
                  <FormControl>
                    <Input
                      name="name"
                      value={credData.name}
                      onChange={handleOnchange}
                      className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none  max-phone:bg-transparent 
                      max-phone:px-0 max-phone:placeholder:text-[#D9D9D9] max-phone:text-[16px] max-phone:font-extralight  "
                      placeholder="최소 두 글자 이상 입력"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-[4px]">
                  <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[12px]">
                    이메일 주소
                  </FormLabel>
                  <FormControl>
                    <Input
                      name="email"
                      value={credData.email}
                      onChange={handleOnchange}
                      className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none  max-phone:bg-transparent 
                      max-phone:px-0 max-phone:placeholder:text-[#D9D9D9] max-phone:text-[16px] max-phone:font-extralight max-phone:mb-[38px]"
                      placeholder="이메일 @ 도메인 입력"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center max-phone:hidden">
              <p className="text-red text-sm font-normal tracking-[-0.43px]">
                닉네임, 이메일주소와 일치하는 아이디입니다
              </p>
            </div>

            <div>
              <p className="phone:hidden text-[12px] ">아이디 찾기</p>

              <div className="w-full h-11 bg-d1gray text-dark33 text-sm tracking-[-0.42px] text-center flex items-center justify-center max-phone:bg-transparent max-phone:border-[1px] max-phone:border-[#d9d9d9] max-phone:border-solid max-phone:mt-[2px]">
                ID : {loginId}
              </div>

              <div className="phone:hidden flex items-center justify-center max-phone:mt-[13px]">
                <p className="text-[#28BEE1] text-sm tracking-[-0.43px]">
                  닉네임, 이메일주소와 일치하는 아이디입니다
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mt-11">
            <Button
                onClick={handleFindId}
              variant="dark-gray"
              className="w-full max-phone:bg-[#e1dede]"
            >
              확인
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

function FindPasswordForm() {
  const form = useForm();
  const [userFound, setUserFound] = useState(false)
  const [credData, setCredData] = useState({
    loginId: "",
    email: "",
    name: ""
  })
  const [changePass, setChangePass] = useState({
    password: "",
    confPassword: ""
  })
  const [userID, setUserId] = useState();







  const handleOnchange = (event: any) => {
    const { name, value } = event.target;

    setCredData({ ...credData, [name]: value })
    setChangePass({ ...changePass, [name]: value })
  }
  const handleFindId = async () => {

    //console.log(data)
    if (credData.name && credData.email && credData.loginId) {
      let data: any = {
        "loginId": credData.loginId,
        "name": credData.name,
        "email": credData.email
      }
      const accessToken =typeof window !== 'undefined' && window.localStorage?
  // Use localStorage here
  localStorage.getItem('accessToken'):null
     // console.log(data)
        ;

      await customFetch.get(`api/v1/users/id?name=${encodeURIComponent(credData.name)}&loginId=${encodeURIComponent(credData.loginId)}&email=${encodeURIComponent(credData.email)}`, {


      }).then((res) => {
        setUserFound(true);
        setUserId(res.data.userId)
       // console.log(res.data.userId)
      }).catch(
        (error: any) => {
         // console.log(error.response.data.message)
          toast.error(error.response.data.message.isArray ? error.response.data.message[0] : error.response.data.message)
        }
      )
    } else {
      toast.error("모든 필드를 채워주세요")
    }

  }


  const resetChangePassword = async () => {
if(changePass.confPassword != changePass.password){
  toast.error("Password MisMatch")
}else{
    customFetch.patch(`api/v1/users/password/${userID}`,{
      "password":changePass.password
    })
    toast.success("Password Updated")
  
  }
  }
  // faysel1:
  // GET /api/v1/users/id
  // This API is for finding a user's password.
  // When you input the user ID, nickname, and email address and call the API, it retrieves the userId as data.
  // If the userId is correctly retrieved, the part that is commented out below will be displayed on the screen.
  // Then, you need to enter a new password and call the PATCH /api/v1/users/password/{id} API
  // In "PATCH /api/v1/users/password/{id}", the value that should be inserted in the place of {id} is the userId value.

  // For more details, please refer to the Swagger documentation."

  return (
    <div className="mt-[34px] w-full pb-[23px]">
      <h3 className="text-[35px] font-normal leading-[39px] tracking-[-1.05px] max-phone:text-[26px] max-phone:leading-normal">
        비밀번호 찾기
      </h3>
      <p className="mt-[15px] text-base font-medium leading-[18px] tracking-[-0.48px] text-dark3C max-phone:leading-[22px]">
        가입하실 때 입력한{" "}
        <span className="max-phone:text-[#28BEE1]">
          {" "}
          아이디, 닉네임, 이메일
        </span>
        을
        <br className="phone:hidden" /> 입력해주세요
      </p>
      <div className="mt-[24px]">
        <Form {...form}>
          <div className="space-y-4 max-phone:space-y-[38px]">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="space-y-[4px]">
                  <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[12px]">
                    아이디
                  </FormLabel>
                  <FormControl>
                    <Input
                      name="loginId"
                      value={credData.loginId}
                      onChange={handleOnchange}
                      className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none  max-phone:bg-transparent 
                      max-phone:px-0 max-phone:placeholder:text-[#D9D9D9] max-phone:text-[16px] max-phone:font-extralight"
                      placeholder="6~12자 소문자/숫자 입력"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="space-y-[4px]">
                  <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[12px]">
                    닉네임
                  </FormLabel>
                  <FormControl>
                    <Input
                      name="name"
                      value={credData.name}
                      onChange={handleOnchange}
                      className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none  max-phone:bg-transparent 
                      max-phone:px-0 max-phone:placeholder:text-[#D9D9D9] max-phone:text-[16px] max-phone:font-extralight"
                      placeholder="최소 두 글자 이상 입력"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-[4px]">
                  <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[12px]">
                    이메일 주소
                  </FormLabel>
                  <FormControl>
                    <Input
                      name="email"
                      value={credData.email}
                      onChange={handleOnchange}
                      className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none  max-phone:bg-transparent 
                      max-phone:px-0 max-phone:placeholder:text-[#D9D9D9] max-phone:text-[16px] max-phone:font-extralight"
                      placeholder="이메일 @ 도메인 입력"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-[30px] w-full">
         
            <Button
              onClick={handleFindId}
              variant="dark-gray"
              className="w-full max-phone:bg-[#141414]"
            >
              확인
            </Button>
          </div>
          {/* This UI should only be displayed when the "GET /api/v1/users/id" API is called and a userId is issued. 
    
    
    You can set the appropriate conditions to ensure this. */}
          {
            userFound && (

              <div className="mt-[79px]">
                <h3 className="phone:hidden mb-[23px] text-[35px] max-phone:text-[26px] max-phone:leading-normal leading-[39px] tracking-[-1.05px]">
                  비밀번호 변경
                </h3>
                <p className="text-base font-medium leading-[18px] tracking-[-0.48px] text-dark33 max-phone:mb-[35px]">
                  새로운{" "}
                  <span className="max-phone:text-[#28BEE1]">비밀번호를</span>{" "}
                  입력해주세요
                </p>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-[4px]">
                        <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[12px]">
                          비밀번호
                        </FormLabel>
                        <FormControl>
                          <Input
                            name="password"
                            onChange={handleOnchange}
                            value={changePass.password}
                            className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none  max-phone:bg-transparent 
                  max-phone:px-0 max-phone:placeholder:text-[#D9D9D9] max-phone:text-[16px] max-phone:font-extralight"
                            placeholder="6자리 이상 영문/숫자 조합"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-[4px]">
                        <FormLabel className="text-base font-normal text-dark33 leading-[25px] max-phone:text-[12px]">
                          비밀번호 확인
                        </FormLabel>
                        <FormControl>
                          <Input
                            name="confPassword"
                            onChange={handleOnchange}
                            value={changePass.confPassword}
                            className="rounded-[5px] h-11 px-4 text-base leading-[25px] font-normal tracking-[-0.48px] placeholder:text-secondary border-fagray max-phone:border-b-1 max-phone:border-t-0 max-phone:border-r-0 max-phone:border-l-0 max-phone:border-solid max-phone:border-[#d9d9d9] max-phone:outline-none  max-phone:bg-transparent 
                  max-phone:px-0 max-phone:placeholder:text-[#D9D9D9] max-phone:text-[16px] max-phone:font-extralight"
                            placeholder="6자리 이상 영문/숫자 조합"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-[30px] w-full">
                  <p className="phone:hidden mb-[20px] text-[#f00] text-center text-[12px] font-light">
                    (비밀번호를 확인 해주세요)
                  </p>
                  <Button
                  onClick={resetChangePassword}
                    variant="dark-gray"
                    className="w-full max-phone:bg-[#141414]"
                  >
                    비밀번호 변경
                  </Button>
                </div>
              </div>
            )
          }

        </Form>
      </div>
    </div>
  );
}
