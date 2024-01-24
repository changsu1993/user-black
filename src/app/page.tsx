"use client";

import LoginDialog from "@/components/dialogs/Login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import customFetch from "@/lib/customfetch";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter }  from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import useStore from '../lib/damageCaseStore';
export default function Home() {
   const router = useRouter();
 const {addDamage } = useStore()

  const [searchData, setSearchData] = useState({
     name:"",
     phone:"",
     birth:""
  })

  const handleSearchClick = async () => {
    if(searchData.name && searchData.phone && searchData.birth){


      const encodedFormData = Object.fromEntries(
        Object.entries(searchData).map(([key, value]) => [key, encodeURIComponent(value)])
      );

    const queryParams = new URLSearchParams(encodedFormData);


try {
  const response =  await customFetch.get(`api/v1/blacks/search?${queryParams.toString()}`)
  if(response){
    addDamage(response.data)
    toast.success("찾은 결과")
    console.log(response.data);
    
   router.push(
    '/search/damage-cases',
    )
   // router.replace("");
}else 

 
;
}catch (error:any) {
  console.log(error.response.data.message);
  
  toast.error(error.response.data.message.isArray?error.response.data.message[0]:error.response.data.message)
}
 }
  
else{
      toast.error("please fill all the fields")
    }
  
 
  };

  // faysel1:
  // GET /api/v1/blacks/create-search-count
  // This API retrieves data on the number of damage case registrations and the number of searches for damage cases.
  // Sure, refer to the comments createBlackCount and searchBlackCount for information and guidance related to these functionalities.

const createSearchCount = async ()=>{
const response = await customFetch.get('api/v1/create-search-count',)
}

const handleChange = (event: any) => {
  const { name, value } = event.target

  setSearchData({ ...searchData, [name]: value })
}

  // GET /api/v1/blacks/search
  // This API is used for searching a black consumer's name, mobile phone number, and date of birth.
  // After searching, it redirects to a search results page, where the results of the search should be displayed.

  // For more details, please refer to the Swagger documentation."

  const blackSearch = async ()=>{
    const response = await customFetch.get('api/v1/create-search-count',)
  }


  return (
    <main className="min-h-screen">
      <section className="hero1-section w-full max-phone:h-[375px] h-[655px] text-white ">
        <div className="text-center h-full flex flex-col items-center justify-center">
          <h2 className="mt-[172px] text-4xl md:text-[60px] font-normal md:leading-[84px] tracking-[-1.8px] max-sm2:text-[1.5rem] max-phone:self-start max-phone:text-start max-phone:text-[28px] max-phone:font-semibold max-phone:leading-normal max-phone:mt-[4rem] max-phone:pl-[23px]">
            고시원 블랙컨슈머 검색하기
          </h2>
          <p className="mt-[31px] font-normal text-lg md:text-[20px] leading-[26px] tracking-[-0.6px] max-phone:text-[#D0D0D0] max-phone:mt-[18px] max-phone:self-start max-phone:text-[1rem] max-phone:font-light max-phone:text-start max-phone:pl-[23px]">
            고시원 블랙컨슈머 피해로 걱정 많으셨죠?{" "}
            <br className="phone:hidden" /> 이젠 사전에 예방하세요!
          </p>
          <div className=" flex items-center mt-[51px] ml-5 max-phone:self-start max-phone:mt-[22px] max-phone:pl-[23px] max-phone:ml-0">
            <div className="text-center space-y-2 px-[29px] pt-[10px] pb-[5px] max-phone:space-y-0 max-phone:px-0 max-phone:mr-[1rem] max-phone:pt-0">
              <p className="text-[15px] font-normal text-center leading-[20px] tracking-[-0.45px] max-phone:text-[16px] max-phone:font-light max-phone:leading-normal">
                피해사례 등록 수
              </p>
              <h3 className="text-[30px] md:text-[50px] font-normal gap-[10px] max-phone:text-[35px] max-phone:font-extralight max-phone:leading-normal max-phone:pt-[5px]">
                {/* createBlackCount */}
                <span>14,194</span>
                <span className="tracking-[-0.6px] md:text-[20px] font-normal text-xl pl-[10px] max-phone:hidden">
                  건
                </span>
              </h3>
            </div>
            <div className="h-[69px] mb-[15px] border border-dashed" />
            <div className="text-center space-y-2 px-[29px] pt-[10px] pb-[5px] max-phone:space-y-0 max-phone:px-0 max-phone:pl-[1rem] max-phone:pt-0">
              <p className="text-[15px] font-normal text-center leading-[20px] tracking-[-0.45px] max-phone:text-[16px] max-phone:font-light max-phone:leading-normal">
                피해사례 검색 수
              </p>
              <h3 className="text-[30px] md:text-[50px] font-normal gap-[10px] max-phone:text-[35px] max-phone:font-extralight max-phone:leading-normal max-phone:pt-[5px]">
                {/* searchBlackCount */}
                <span>34,258</span>
                <span className="tracking-[-0.6px] md:text-[20px] font-normal text-xl pl-[10px] max-phone:hidden">
                  건
                </span>
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section
        className={cn(
          "mt-[94px] w-full max-w-[676px] mx-auto",
          "flex flex-col items-center pb-[113px] max-phone:p-3 max-phone:mt-[40px]"
        )}
      >
        <h4 className="text-center md:text-[20px] text-dark max-sm2:text-xs px-[1rem] max-phone:hidden">
          블랙컨슈머 이름, 휴대폰번호, 생년월일 중 2개를 입력해주세요 <br /> 2개
          이상 일치하면 블랙컨슈머 이력을 검색할 수 있어요!
        </h4>
        <div className="w-full mt-[62px] px-[1rem] max-phone:mt-[40px]">
          <div className="space-y-9">
            <div
              className={cn(
                "flex flex-col md:flex-row items-start md:items-center gap-[10px]"
              )}
            >
              {/* name */}
              <Label className="min-w-[140px] md:text-[20px] text-dark33 pl-5 max-phone:text-[15px] max-phone:pl-0">
                이름
              </Label>
              <Input
              name="name"
              value={searchData.name}
              onChange={handleChange}
                type="text"
                className="flex-1 md:text-[20px] max-phone:rounded-[10px] max-phone:text-[16px]"
                placeholder="블랙컨슈머 이름을 입력해주세요"
              />
            </div>
            <div
              className={cn(
                "flex flex-col md:flex-row items-start md:items-center gap-[10px] max-phone:!mt-[16px]"
              )}
            >
              {/* phone */}
              <Label className="min-w-[140px] text-dark33 pl-5 max-phone:text-[15px] max-phone:pl-0">
                휴대폰번호
              </Label>
              <Input
              name="phone"
              value={searchData.phone}
              onChange={handleChange}
                type="text"
                className="flex-1 md:text-[20px] max-phone:rounded-[10px] max-phone:text-[16px]"
                placeholder="- (하이픈) 제거 후 입력해주세요"
              />
            </div>
            <div
              className={cn(
                "flex flex-col md:flex-row items-start md:items-center gap-[10px] max-phone:!mt-[16px]"
              )}
            >
              {/* birth */}
              <Label className="min-w-[140px] text-dark33 pl-5 max-phone:text-[15px] max-phone:pl-0">
                생년월일
              </Label>
              <Input
                name="birth"
                value={searchData.birth}
                onChange={handleChange}
                type="text"
                className="flex-1 md:text-[20px] max-phone:rounded-[10px] max-phone:text-[16px]"
                placeholder="생년월일 6자리를 입력해주세요 (예 : 841225)"
              />
            </div>
          </div>

          <Button
            size={"lg"}
            variant="accent"
            className="w-full mt-[61px] max-phone:bg-[#141414] max-phone:h-[65px]"
            asChild
          >
          <Button onClick={handleSearchClick} className="max-phone:text-[18px]">
              검색하기
           </Button>
          </Button>

          <p
            className={cn(
              "mx-auto mt-12 text-center max-phone:hidden",
              "md:text-[14px] text-sm leading-[30px] tracking-[-0.42px] text-c8gray"
            )}
          >
            (주)고수플러스는 범죄 피해방지를 위해 해당 서비스를 운영하고
            있습니다. 피해 사례 결과에 대해
            <br />
            고수플러스는 보증하지 않으며, 거래에 대한 법적 책임은 당사자에게
            있습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
