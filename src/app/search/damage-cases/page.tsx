"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { SelectInput } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import DamageCaseItem from "./DamageCaseItem";
import { Pagination } from "flowbite-react";

import separator from "../../../../public/icons/separator.svg";
import downArrowWhite from "../../../../public/icons/down-arrow-white.svg";
import downArrowCustom from "../../../../public/icons/down-arrow.svg";
import smallSearch from "../../../../public/icons/small-search-icon.svg";
import Link from "next/link";
import useStore from '../../../lib/damageCaseStore';
import customFetch from "@/lib/customfetch";
import { toast } from "react-toastify";
import { log } from "console";
export default function Page() {
  const router = useRouter();
  const [buttonClicked, setButtonClicked] = useState(false);
const {damages,addDamage, query} = useStore()
  const handleButtonClick = () => {
    setButtonClicked(!buttonClicked);
  };
const [currentPage, setCurrentPage] = useState(1)
const [FilteredData, setFilteredData] = useState([])
const [searchQuery, setSearchQuery] = useState("");
const [totalPages, setTotalPages] = useState(1);
const [searchResults, setSearchResults] = useState([]);
const onPageChange = (value:number)=>{
setCurrentPage(value)
}
  const handleReport = () => {
    router.push("/file-objection");
  };


  const fetchDmages = async()=>{
    if(query != null || query != undefined){
    
      try {
        const response =  await customFetch.get(`api/v1/blacks/search?${query}&page=${currentPage}`)
        if(response){
     setFilteredData(response.data)
        //  addDamage(response.data)
         
         // router.replace("");
      }
      }catch (error:any) {
       // console.log(error.response.data.message);
        
       // toast.error(error.response.data.message.isArray?error.response.data.message[0]:error.response.data.message)
      }
    }

  }
//console.log("damages",damages);
useEffect(() => {

  fetchDmages()
setTotalPages(damages[0]?.meta.last_page)
  
  
  
},[currentPage])








  //   console.log('Search Text:', searchText);

const filteredObjects =   damages[0]?.data.filter((post:any) => {
    return !searchQuery || post.damageContent.toLowerCase().includes(searchQuery.toLowerCase())
  });


console.log("data was ",damages );

useEffect(()=>{

},[searchQuery])
  return (
    <main className="min-h-screen">
      <section className="hero2-section w-full max-phone:h-[375px] h-[655px] text-white">
        <div className="text-center h-full flex flex-col items-center max-phone:items-start max-phone:pl-[23px] max-phone:pr-[13px] justify-center">
          <h2 className="text-[45px] md:text-[60px] font-normal sm:leading-[84px] tracking-[-1.8px] max-phone:tracking-[-0.84px] max-phone:text-[1.5rem] max-phone:mt-[3rem]">
            피해사례 검색 결과
          </h2>
          <p className="mt-[31px] max-phone:mt-[18px] text-xl md:text-[20px] font-normal leading-[26px] tracking-[-0.6px] max-phone:text-[1rem] max-phone:text-[#d0d0d0] max-phone:font-light">
            고시원 피해사례를 검색해 보세요
          </p>
        </div>
      </section>

      <div className="phone:hidden ml-[23px] flex gap-[15px] mt-[43px]">
        <div>
          <SelectInput
            className=" px-1 pl-2 gap-0 text-[16px] w-[98px] h-[40px] border-[#333] rounded-[60px] border-[1px] border-solid max-phone:pl-[24px]"
            value="서울"
            options={[
              {
                label: "서울",
                value: "서울",
              },
              {
                label: "경기",
                value: "경기",
              },
            ]}
          />
          <span className="text-[#d9d9d9] text-[16px] font-extralight inline-block mt-[5px] ml-[15px] max-phone:ml-[24px]">
            경기
          </span>
        </div>

        <div>
          <SelectInput
            className=" px-1 pl-3 gap-0 text-[16px]  w-[98px] h-[40px] border-[#333] rounded-[60px] border-[1px] border-solid max-phone:pl-[17px]"
            value="고시원"
            options={[
              {
                label: "고시원",
                value: "고시원",
              },
              {
                label: "룸쉐어",
                value: "룸쉐어",
              },
            ]}
          />
          <span className="text-[#d9d9d9] text-[16px] font-extralight inline-block mt-[5px] ml-[15px] max-phone:ml-[17px]">
            룸쉐어
          </span>
        </div>
      </div>

      <section
        className={cn(
          "mt-[130px] w-full max-w-[1300px] mx-auto px-5 pb-[100px] max-phone:mt-[28px]"
        )}
      >
        {/* Search Header Start */}
        <div className="flex flex-col gap-5  md2:flex-row items-center md2:items-start md2:gap-[34px]">
          <div className="flex-1 max-phone:w-full">
            <div
              className={cn(
                "relative w-[706px] flex items-center h-[63px] justify-between px-6 max-md:w-full md:w-full max-phone:p-0 md:px-3 py-3 max-phone:h-[58px]",
                "rounded-[60px] border border-secondary max-phone:bg-[#141414]"
              )}
            >
              <input
              onChange={(e)=>setSearchQuery(e.target.value)}
                type="text"
                style={{border:'0px !important' ,boxShadow:'none' ,  outline:'none !important'}}
                className={cn(
                  "border-0 flex-1 bg-transparent focus-visible:outline-none text-dark33 placeholder:text-d9gray",
                  "text-[25px] p-5 font-normal leading-[33px] tracking-[-0.75px] max-phone:text-sm max-phone:font-extralight max-phone:tracking-[-0.48px]"
                )}
                placeholder="제목 & 키워드를 검색해 주세요"
              />
              <button type="button" className="max-phone:hidden">
                <MagnifyingGlassIcon className="absolute top-3.5 right-4 w-[30px] h-[30px] text-dark33 max-phone:top-1 max-phone:text-white " />
              </button>
              <button type="button" className="phone:hidden">
                <Image
                  src={smallSearch}
                  alt="search icon"
                  className="absolute top-[50%] transform translate-y-[-50%] right-4 w-[23px] h-[25px]"
                />
              </button>
            </div>

            <div className="flex items-center gap-[10px] mt-[17px]">
              {["#부천", "#블랙리스트", " #소독 예정"].map((tag, index) => (
                <button
                  key={index}
                  type="button"
                  className={cn(
                    "rounded-full h-[26px] px-3 flex items-center justify-center",
                    "text-sm font-normal text-secondary leading-[18px] tracking-[-0.42px] md:text-[14px]",
                    "border border-d9gray"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <SelectInput
            className="max-phone:hidden pl-[35px] gap-4 pr-[1px] w-[163px] h-[63px] text-[25px] max-phone:text-[17px] max-sm2:pl-[10px] max-sm2:pr-[10px] max-sm2:gap-1 max-sm2:h-[40px] max-sm2:w-[110px] "
            value="서울"
            options={[
              {
                label: "서울",
                value: "서울",
              },
              {
                label: "경기",
                value: "경기",
              },
            ]}
          />

          <SelectInput
            className="max-phone:hidden pl-[35px] gap-4 pr-[1px] w-[163px] h-[63px] text-[25px] max-phone:text-[17px] max-sm2:pl-[10px] max-sm2:pr-[10px] max-sm2:gap-1 max-sm2:h-[40px] max-sm2:w-[110px]"
            value="고시원"
            options={[
              {
                label: "고시원",
                value: "고시원",
              },
              {
                label: "룸쉐어",
                value: "룸쉐어",
              },
            ]}
          />
          <SelectInput
            className="max-phone:hidden pl-[35px] gap-4 pr-[1px] w-[163px] h-[63px] text-[25px] max-phone:text-[17px] max-sm2:pl-[10px] max-sm2:pr-[10px] max-sm2:gap-1 max-sm2:h-[40px] max-sm2:w-[110px]"
            value="인기순"
            options={[
              {
                label: "인기순",
                value: "인기순",
              },
              {
                label: "추천순",
                value: "추천순",
              },
            ]}
          />
          {/* <p className="mt-[15px] text-[25px] leading-[33px] font-medium tracking-[-0.75px] text-d9gray pl-9">
              경기
            </p> */}
        </div>
        {/* Search Header End */}
        {/* No Data View  */}
        {/* <div className="mt-[68px] flex flex-col items-center text-center">
          <h3 className="text-[35px] leading-[46px] tracking-[-1.05] font-medium text-accent text-center">
            NNN 제목 & 키워드의 사례가 검색되었습니다
          </h3>
          <p className="mt-[31px] text-[15px] leading-[20px] tracking-[-0.45px] text-d9gray">
            피해를 입으셨다면 피해사례를 등록해주세요.
          </p>
          <Button
            variant="accent"
            size="lg"
            className="mt-[33px] rounded-full leading-[33px] pl-[37px] pr-[34px] font-medium items-center"
          >
            <span>피해사례 등록</span>
            <ChevronRightIcon className="w-8 h-8 ml-2" />
          </Button>
        </div> */}
        <Image
          src={separator}
          alt="separator"
          className="phone:hidden mt-[35px] w-full mx-auto"
        />

        <div className="phone:hidden mt-[30px] flex flex-col gap-[13px] relative">
          {buttonClicked ? (
            <div
              className="flex items-center justify-between w-full h-[48px] rounded-[60px] bg-[#F35C5C] pr-[10px]"
              onClick={handleButtonClick}
            >
              <div className="h-[49px] w-full rounded-[60px] bg-[#f3f4f6] flex  items-center justify-between pr-2 pl-3">
                <p className="text-[12px] text-[#acacac] font-light tracking-[-0.36px] flex justify-center items-center ">
                  제3회 소비자정책심의위원회 심의결과(서면심의)
                </p>
                <Image
                  src={downArrowCustom}
                  alt="right arrow"
                  className="w-[15px] h-[15px] text-white stroke-white  fill-white"
                />
              </div>
              <p
                className="text-[#fff] text-[12px] font-light whitespace-nowrap ml-2 cursor-pointer"
                onClick={() => handleReport()}
              >
                신고
              </p>
            </div>
          ) : (
            <div
              className="flex items-center justify-between w-full h-[48px] rounded-[60px] bg-[#28a7e1] px-[18px] "
              onClick={handleButtonClick}
            >
              <p className="text-[12px] text-white font-light tracking-[-0.36px] flex justify-center items-center">
                [고시원 블랙리스트] 블랙리스트 사태의 가장 대표적...
              </p>
              <Image
                src={downArrowWhite}
                alt="right arrow"
                className="w-[15px] h-[15px] text-white stroke-white  fill-white"
              />
            </div>
          )}
        </div>

        <div className="mt-[36px]">
          <h3 className="max-phone:hidden md:text-[30px] leading-[39px] tracking-[-0.9] font-normal max-phone:text-xs text-accent">
          {damages[0]?.meta.total} 개의 사례가 검색되었습니다.
          </h3>
          <div className="mt-[45px] space-y-[53px]">
            {   filteredObjects?.map((data:any, index:any)=> ( <DamageCaseItem key={index} data={data} />)) }
          
            {/* <DamageCaseItem /> */}
          </div>
      {  damages.length >0 &&    <Pagination className="text-center" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
  }
        </div>
      { damages.length == 0 && <div className="mt-[73px] flex flex-col items-center justify-center max-phone:mt-[28px]">
          <h2 className="font-normal text-[45px] text-accent max-phone:text-[28px] max-phone:text-dark">
            등록된 피해사례가 없습니다.
          </h2>
          <p className="mt-[30px] mb-[33px] font-normal text-[15px] text-d9gray max-phone:mt-[18px] max-phone:mb-[39px] max-phone:text-[16px]">
            피해를 입으셨다면 피해사례를 등록해주세요.
          </p>
          <Link href="/damage-cases/register">
            <button className="pl-[37px] pr-[60px] h-[63px] relative flex justify-center items-center bg-accent rounded-[60px] text-[25px] font-normal text-white max-phone:pl-0 max-phone:pr-0 max-phone:w-[340px] max-phone:h-[65px] max-phone:bg-dark max-phone:text-[18px] max-phone:rounded-[10px]">
              피해사례 등록
              <Image
                src={"/images/blueButtonIcon.png"}
                width={15}
                height={16}
                alt="right-icon"
                className="absolute right-[30px] bottom-[22px]"
              />
            </button>
          </Link>
        </div>}
      </section>
    </main>
  );
}
