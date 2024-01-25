"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { SelectInput } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import AnnouncementsTable from "./FAQsTable";

import back from "../../../../public/icons/small-back.svg";
import smallSearch from "../../../../public/icons/small-search-icon.svg";
import separator from "../../../../public/icons/separator.svg";
import customFetch from "@/lib/customfetch";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pagination } from "flowbite-react";
import { constants } from "fs";

export default function Page() {
  const router = useRouter();
  const [faqData, setFaqData]= useState<any>([])
  const [filteredData, setFilteredData] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
 

  const onPageChange = (page:number)=>setCurrentPage(page) 
  const handleNoticeClick = () => {
    router.push("/customer-center/announcements");
  };

  const handleInquiry = () => {
    router.push("/customer-center/inquiry");
  };

  const handleGoBack = () => {
    router.back();
  };
  const handleSearch = (searchText: string) => {
  

  const filteredObjects =   filteredData.filter((post:any) => {
      return !searchText || post.title.toLowerCase().includes(searchText.toLowerCase())
    });


  setFilteredData(filteredObjects)
  setFilteredData(searchText ? filteredObjects : faqData);
  };
///  GET api/v1/post/faqs   
const accessToken =typeof window !== 'undefined' && window.localStorage?
  // Use localStorage here
  localStorage.getItem('accessToken'):null
const getNotices = async () => {
  const accessToken =typeof window !== 'undefined' && window.localStorage?
  // Use localStorage here
  localStorage.getItem('accessToken'):null;
  customFetch.get('api/v1/post/faqs?page=1&title=faq', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then((res) =>{ 
    
    
     setFaqData(res.data.data)
     setFilteredData(res.data.data)
  //console.log(res.data.data)
  
  }).catch((error: any) => {
    toast.error(error.response?.data.message.isArray ? error.response?.data.message[0] : error.response?.data.message)
  })
}

useEffect(() => {
  getNotices()
// sortByLatest()
}, [])

  return (
    <main>
      <section
        className={cn(
          "w-full text-dark33 max-w-[1300px] mx-auto min-h-screen",
          "flex flex-col items-center",
          "pt-[238px] px-[1rem] pb-[83px] max-phone:px-[25px] max-phone:pt-[100px] max-phone:pb-[20px]"
        )}
      >
        <button
          className="absolute z-[999999999999] left-3 top-[4rem]"
          onClick={handleGoBack}
        >
          <Image
            src={back}
            role="button"
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
            variant="accent"
            className="rounded-full w-[95px] h-[42px] text-base font-medium leading-[21px] max-phone:font-normal"
          >
            FAQ
          </Button>
          <Button
            onClick={handleInquiry}
            variant="outline"
            className="rounded-full w-[108px] h-[42px] text-base font-medium leading-[21px] border-black text-black max-phone:text-[#ACACAC] max-phone:border-[#ACACAC] max-phone:font-normal"
          >
            1:1 문의
          </Button>
        </div>
        <h3 className="text-[45px] text-dark33 font-semibold tracking-[-1.35px] max-phone:text-[28px] max-phone:leading-[39px] max-sm2:text-[1.5rem] max-phone:self-start">
          FAQ
        </h3>
        <h4 className="mt-[18px] text-xl font-normal max-phone:self-start max-phone:text-[16px] max-phone:text-[#3a3a3c]">
          FAQ 리스트 입니다
        </h4>

        <section className="phone:hidden flex gap-[18px] mt-[36px] self-start">
          <div>
            <SelectInput
              className="w-[114px] h-[40px] rounded-[60px] border-[#333] border-solid border-[1px] text-[16px] font-normal p-0 pl-[24px] pr-[10px] gap-0 justify-between"
              placeholder="전체"
              options={[
                {
                  label: "전체",
                  value: "전체",
                },
                {
                  label: "구분",
                  value: "구분",
                },
              ]}
            />
            <span className="text-[#d9d9d9] text-[16px] pl-[24px] mt-2 inline-block">
              구분
            </span>
          </div>

          <div>
            <SelectInput
              className="w-[114px] h-[40px] rounded-[60px] border-[#333] border-solid border-[1px] text-[16px] font-normal p-0 pl-[24px] pr-[10px] gap-0 justify-between"
              placeholder="최신순"
              options={[
                {
                  label: "최신순",
                  value: "최신순",
                },
                {
                  label: "번호순",
                  value: "번호순",
                },
              ]}
            />

            <span className="text-[#d9d9d9] text-[16px] pl-[24px] mt-2 inline-block">
              번호순
            </span>
          </div>
        </section>

        {/* Search Header Start */}
        <div className="flex flex-col items-center gap-[34px] mt-[61px] w-full md:flex-row md:items-start max-phone:mt-[28px]">
          <div className="flex-1 w-full">
            <div
              className={cn(
                "relative  flex  items-center h-[63px] justify-between pl-[37px] py-3  max-phone:h-[58px] max-phone:pt-[22px] max-phone:pb-[22px] max-phone:pl-[29px]",
                "rounded-[60px] border border-secondary max-phone:bg-[#000]"
              )}
            >
              <input
onChange={(e)=>handleSearch(e.target.value)}
                type="text"
           
                style={{border:'0px !important' ,boxShadow:'none' ,  outline:'none !important'}}
           
                className={cn(
                  "border-0 flex-1 bg-transparent focus-visible:outline-none text-dark33 placeholder:text-d9gray max-phone:text-white max-phone:placeholder:text-[#acacac] max-phone:placeholder:font-light",
                  "text-[25px] font-normal leading-[33px] tracking-[-0.75px] max-sm:text-xl max-sm:w-72 max-phone:w-[16rem] max-phone:text-[16px]"
                )}
                placeholder="제목 & 키워드를 검색해 주세요"
              />

              <Image
                width={50}
                height={50}
                className="absolute top-3.5 right-5 w-[30px] h-[30px] text-dark33 max-sm2:top-1 max-phone:hidden"
                src="/images/magnifyingGlass.png"
                alt="search Icon"
              />

              <Image
                width={50}
                height={50}
                className="phone:hidden absolute  right-4 w-[23px] h-[25px]  top-[50%] transform translate-y-[-50%]"
                src={smallSearch}
                alt="search Icon"
              />
            </div>

            <div className="flex items-center gap-[10px] mt-[16px]">
              {["#부천", "#블랙리스트", " #소독 예정"].map((tag, index) => (
                <button
                  key={index}
                  type="button"
                  className={cn(
                    "rounded-full h-[26px] py-3 px-2 flex items-center justify-center",
                    "text-sm text-secondary leading-[18px] tracking-[-0.42px] ",
                    "border border-d9gray"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex max-sm2:flex-col gap-5 max-phone:hidden">
            <SelectInput
              className="pl-5 pr-3 text-[25px] font-normal max-sm2:pl-[10px] max-sm2:pr-[10px] max-sm2:gap-1 max-sm2:h-[40px]"
              placeholder="전체"
              options={[
                {
                  label: "전체",
                  value: "전체",
                },
                {
                  label: "구분",
                  value: "구분",
                },
              ]}
            />

            <SelectInput
              className="pl-5 pr-3 text-[25px] font-normal max-sm2:pl-[10px] max-sm2:pr-[10px] max-sm2:gap-1 max-sm2:h-[40px]"
              placeholder="최신순"
              options={[
                {
                  label: "최신순",
                  value: "최신순",
                },
                {
                  label: "번호순",
                  value: "번호순",
                },
              ]}
            />
          </div>
        </div>
        {/* Search Header End */}

        <Image
          src={separator}
          alt="separator"
          className="phone:hidden mt-[30px]"
        />

        <div className="mt-[53px] w-full max-phone:mt-[30px]">
          <AnnouncementsTable data={filteredData} /> 

    {  totalPages > 1 &&    <Pagination className="text-center mt-2" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
     
               }   </div>
      </section>
    </main>
  );
}
