"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { SelectInput } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import AnnouncementsTable from "./AnnouncementsTable";

import back from "../../../../public/icons/small-back.svg";
import smallSearch from "../../../../public/icons/small-search-icon.svg";
import separator from "../../../../public/icons/separator.svg";
import customFetch from "@/lib/customfetch";
import { error } from "console";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function Page() {

 interface TableDataTypes {
  authorName: string;
  id: number;
  title: string;
  content: string;
  status: string; // Assuming "STATUS" is a typo and you meant "status"
  startDateTime: string;
  endDateTime: string;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
}

  const router = useRouter();
  const [tableData, setTableData] = useState<TableDataTypes[]>([]);
  const [sorted, setSorted] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchClick = () => {

    router.push("/customer-center/faqs"); 

  };

  const handleInquiry = () => {
    router.push("/customer-center/inquiry");
  };

  const handleGoBack = () => {
    router.back();
  };
  const handleSearch = (searchText: string) => {
    console.log('Search Text:', searchText);
  const filteredObjects =   tableData.filter(post => {
      if (searchText === "") {
        //if query is empty
        return post;
      } else if (post.title.toLowerCase().includes(searchText.toLowerCase())) {
        //returns filtered array
        return post;
      }
    });

  setTableData(filteredObjects)
  };
  

  const sortByLatest = () => {
    const sortedData = tableData.slice().sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
  
      if (titleA < titleB) {
        return 1; // If titleA is alphabetically smaller, move it down in the array
      } else if (titleA > titleB) {
        return -1; // If titleA is alphabetically larger, move it up in the array
      }
  
      return 0; // If titles are equal, maintain the order
    });
  
    setTableData(sortedData);
  };
  
  // faysel1:
  // GET /api/v1/post/notices
  // This API is used for retrieving a list of announcements.
  // The data needs to be filtered by criteria such as latest order, number order, etc.
  // In the code where <AnnouncementsTable /> is used, since the data is organized in a table format, it seems logical that the data should be passed to <AnnouncementsTable />

  // This is a responsive project.
  // If you check the mobile size UI, you may notice that the UI changes differently.
  // Please check both desktop and mobile sizes while working on the API.
  // For more details, please refer to the Swagger documentation."
  //const [] = uses
  const getNotices = async () => {
    const accessToken = localStorage.getItem('accessToken');
    customFetch.get('api/v1/post/notices', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) =>{ 
      
      
      setTableData(res.data.data)
    console.log(res.data.data)
    
    }).catch((error: any) => {
      toast.error(error.response.data.message.isArray ? error.response.data.message[0] : error.response.data.message)
    })
  }

  useEffect(() => {
    getNotices()
   sortByLatest()
  }, [])
  return (
    <main>
      <section
        className={cn(
          "w-full text-dark33 max-w-[1300px] mx-auto min-h-screen",
          "flex flex-col items-center",
          "pt-[238px] pb-[83px] px-[1rem] max-phone:pt-[100px] max-phone:pb-[20px] max-phone:px-[25px]"
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
            variant="accent"
            className="rounded-full w-[118px] h-[42px] text-base font-medium leading-[21px] max-phone:font-normal"
          >
            공지사항
          </Button>
          <Button
            onClick={handleSearchClick}
            variant="outline"
            className="rounded-full w-[95px] h-[42px] text-base font-medium leading-[21px] border-black text-black max-phone:text-[#ACACAC] max-phone:border-[#ACACAC] max-phone:font-normal"
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
        <h3 className="text-[45px] text-dark33 leading-[63px] font-semibold tracking-[-1.35px] max-phone:text-[28px] max-phone:self-start max-phone:leading-[39px]">
          공지사항
        </h3>
        <h4 className="mt-[18px] text-xl font-normal max-phone:self-start max-phone:text-[16px] max-phone:text-[#3a3a3c]">
          BLACK LIST 공지사항 입니다
        </h4>
        {/* Search Header Start */}
        <div className="flex md:flex-row items-center flex-col md:items-start gap-[34px] mt-[61px] w-full max-phone:mt-[37px]">
          <div className="flex-1 w-full">
            <div
              className={cn(
                "relative flex items-center h-[63px] justify-between pl-[37px] py-3 max-phone:h-[58px] max-phone:pt-[22px] max-phone:pb-[22px] max-phone:pl-[29px]",
                "rounded-[60px] border border-secondary max-phone:bg-[#000]"
              )}
            >
              <input
                type="text"
                onChange={(e)=>handleSearch(e.target.value)}
                className={cn(
                  "flex-1 bg-transparent focus-visible:outline-none text-dark33 placeholder:text-d9gray max-phone:text-white max-phone:placeholder:text-[#acacac] max-phone:placeholder:font-light",
                  "text-[25px] font-normal leading-[33px] tracking-[-0.75px] max-phone:w-[16rem] max-phone:text-[16px]"
                )}
                placeholder="제목 & 키워드를 검색해 주세요"
              />

              <Image
                width={50}
                height={50}
                className="absolute top-3.5 right-5 w-[30px] h-[30px] text-dark33 max-phone:top-1 max-phone:hidden"
                src="/images/magnifyingGlass.png"
                alt="search Icon"
              />

              <Image
                width={50}
                height={50}
                className="phone:hidden absolute right-4 w-[23px] h-[25px] top-[50%] transform translate-y-[-50%]"
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
          <div className="max-w-[163px] max-phone:hidden">
            {/* Latest Order, Number Order Filter */}

            <SelectInput
              onChange={(e: any) => {
               
              }}
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

        <Image
          src={separator}
          alt="separator"
          className="phone:hidden mt-[30px]"
        />

        {/* Search Header End */}
        <div className="mt-[53px] w-full max-phone:mt-[30px]">
          <AnnouncementsTable data={tableData} />
        </div>
      </section>
    </main>
  );
}
