"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { tableData, thRows } from "./contants";
import TBRSituation from "./TBRSituation";
import Pagination from "@/components/Pagination";
import ImageViewDialogSmall from "@/components/dialogs/ImageViewSmallScreen";
import DeleteCaseDialog from "../[id]/DeleteCaseDialog";

import rightArrowCustom from "../../../../public/icons/right-arrow-custom.svg";
import downArrowCustom from "../../../../public/icons/down-arrow.svg";
import back from "../../../../public/icons/back.svg";

const TableItem = ({ data }: { data: any }) => {
  const form = useForm();
  const images = [
    "/images/damage-case-full.png",
    "/images/damage-case.png",
    "/images/damage-case-full.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: any) => {
    setActiveIndex(index);
  };

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [isMobile, setIsMobile] = useState(false);
  const contentHeight = expanded ? "553px" : "22px";
  const contentPadding = expanded ? "12px" : "0 0 0 15px";

  let bgColorClass = "bg-[#28A7E1]";

  if (data.situation === "승인완료") {
    bgColorClass = "bg-[#28A7E1]";
  } else if (data.situation === "승인대기") {
    bgColorClass = "bg-[#ACACAC]";
  } else if (data.situation === "승인거절") {
    bgColorClass = "bg-[#F35C5C]";
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

  return (
    <div
      style={{
        display: "block",
        height: contentHeight,
        transition: "height 0.3s",
      }}
      className={`mb-[4rem]  ${
        expanded ? "" : "rounded-[60px] transition-all"
      }`}
    >
      <section
        className={`phone:hidden relative flex  px-3 mx-auto ${
          expanded
            ? "bg-[#f3f4f6] rounded-[15px] pt-[15px] pr-[21px] pb-[24px] pl-[19px] mt-[7px] justify-center w-[340px]"
            : "bg-[#f3f4f6] rounded-[60px] h-[45px] w-[340px]"
        }`}
      >
        <div className="absolute right-[1rem]">
          {expanded && (
            <Image
              src={downArrowCustom}
              alt="down side arrow"
              className="w-[15px] h-[15px] z-50"
              onClick={toggleExpand}
            />
          )}
        </div>
        <div className="absolute right-[1rem] top-[50%] transform translate-y-[-50%]">
          {!expanded && (
            <Image
              src={rightArrowCustom}
              alt="right side arrow"
              className="w-[15px] h-[15px] "
              onClick={toggleExpand}
            />
          )}
        </div>
        {expanded ? (
          <div className="relative">
            <div className="absolute left-[-30px] top-[-47px] mb-[9px] bg-[#fff] flex gap-2 items-center ml-3">
              <p
                className={`flex rounded-[40px] justify-center items-center font-extralight w-[50px] h-[22px]  ${bgColorClass} text-[#fff] text-[8px]`}
              >
                {data.situation}
              </p>
              {expanded && data.situation === "승인거절" && (
                <Dialog>
                  <DialogTrigger>
                    <p className="text-[#28a7e1] text-[12px] underline">
                      거절 사유 보기
                    </p>
                  </DialogTrigger>
                  <DialogContent className="z-[99999999999] bg-white/90 px-20 py-[51px] max-w-[580px] h-[619px] max-h-[619px] text-dark33 max-phone:pt-[59px] max-phone:px-[25px] max-phone:pb-[73px] max-phone:min-h-[100vh] max-phone:bg-white/100">
                    <div>
                      <DialogTrigger asChild>
                        {isMobile ? (
                          <Image
                            src={back}
                            alt="back button"
                            className="phone:hidden w-[20px] h-[20px]"
                          />
                        ) : (
                          <Image
                            src={"/icons/back.svg"}
                            role="button"
                            width={21}
                            height={39}
                            alt="Back Icon"
                            className=""
                          />
                        )}
                      </DialogTrigger>
                      <h3 className="mt-[24px] text-[35px] font-normal leading-[39px] tracking-[-1.05px] max-phone:mt-[14px] max-phone:text-[28px]">
                        승인거절 사유
                      </h3>
                      <p className="mt-[23px] text-base font-normal leading-[28px] tracking-[-0.48px] text-dark33 max-phone:text-[16px]">
                        단순한 내용이거나 신고된 게시글 또한
                        <br className="phone:hidden" />
                        거절 사유가 될 수 있습니다
                      </p>
                      <div className="mt-[40px]">
                        <Form {...form}>
                          <form className="space-y-8">
                            <FormField
                              disabled
                              control={form.control}
                              name="reasonForRejection"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[16px] font-normal text-dark33">
                                    승인 거절 자세한 사유
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      disabled
                                      rows={4}
                                      className="min-h-[123px] font-normal text-[14px] text-9egray resize-none max-phone:border-1 max-phone:border-solid max-phone:border-[#d9d9d9]"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </form>
                        </Form>
                        <div className="mt-[77px] w-full">
                          <Button
                            variant="dark-gray"
                            className="w-full text-[18px] font-normal"
                          >
                            게시글 수정하기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="flex items-center gap-[12px]">
              <p className="text-[#333] text-[12px] w-[56px]">등록일시</p>
              <p className="flex justify-center items-center text-[#333] text-[12px] bg-[#fff] rounded-[5px] h-[28px] px-3">
                {data.registrationDateTime}
              </p>
            </div>

            <div className="flex items-center mt-[12px] gap-[12px]">
              <p className="text-[#333] text-[12px] w-[56px]">피해 발생일</p>
              <p className="flex justify-center items-center text-[#333] text-[12px] bg-[#fff] rounded-[5px] h-[28px] px-3">
                {data.DateOfDamage}
              </p>
            </div>

            <div className="flex justify-between mt-[12px]">
              <div className="flex items-center gap-[12px]">
                <p className="text-[#333] text-[12px] w-[56px]">이름</p>
                <p className="flex justify-center items-center text-[#333] text-[12px] bg-[#fff] rounded-[5px] h-[28px] px-3">
                  {data.name}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-[#333] text-[12px] w-[56px]">생년월일</p>
                <p className="flex justify-center items-center text-[#333] text-[12px] bg-[#fff] rounded-[5px] h-[28px] px-3">
                  {data.birthDate}
                </p>
              </div>
            </div>

            <div className="flex items-center mt-[12px] gap-[12px]">
              <p className="text-[#333] text-[12px] w-[56px]">휴대폰번호</p>
              <p className="flex justify-center items-center text-[#333] text-[12px] bg-[#fff] rounded-[5px] h-[28px] px-3">
                {data.phoneNumber}
              </p>
            </div>

            <div className="flex flex-col items-start gap-[10px] mt-[12px]">
              <p className="text-[#333] text-[12px]">피해 내용</p>
              <p className="px-2 py-2 pb-7 text-[#333] text-[12px] bg-[#fff] rounded-[5px]  w-[100%]">
                에어비앤비 숙소를 엉망으로 만든다, 계좌이체해주겠다고 하고
                잠적한다 등의 악성 게스트 다른 입주자와 싸우고 공용공간을
                엉망으로 만들어 다 퇴실하게 만들고 혼자 편히 살고 있는
                쉐어하우스의 입주자
              </p>
            </div>

            <div className="phone:hidden mt-[15px] relative w-full flex flex-col flex-wrap md:flex-row items-center gap-5 md:gap-7">
              <ImageViewDialogSmall
                passedImage={images[activeIndex]}
                active={true}
              />
              <div className=" flex gap-2 mt-0 absolute bottom-[7px] left-[50%] transform translate-x-[-50%] z-[999]">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === activeIndex ? "bg-[#fff]" : "bg-gray-300"
                    }`}
                    onClick={() => handleDotClick(index)}
                  ></button>
                ))}
              </div>
            </div>
            <div className="flex gap-[6px] mt-[21px]">
              <button className="flex justify-center items-center rounded-[10px] bg-[#28a7e1] w-[92px] h-[36px] text-[#fff] text-[16px]">
                수정
              </button>
              <DeleteCaseDialog
                mobile
                className="!min-w-[92px] !max-w-[92px] !min-h-[36px] !max-h-[36px] !text-[16px]"
              />
            </div>
          </div>
        ) : (
          <section
            onClick={toggleExpand}
            className="flex relative items-center justify-start text-[12px]  bg-[#f3f4f6] text-[#acacac] rounded-[60px]  pl-3 max-sm2:pl-0"
          >
            <div className="absolute left-[-17px] top-[-26px] mb-[9px] bg-[#fff] flex gap-2 items-center ml-3">
              <p
                className={`flex rounded-[40px] justify-center items-center font-extralight w-[50px] h-[22px]  ${bgColorClass} text-[#fff] text-[8px]`}
              >
                {data.situation}
              </p>
            </div>
            <p className="text-[12px]">제3회 소비자정책심의위원회 심의결과</p>
          </section>
        )}
      </section>
    </div>
  );
};

const DamegeCasesTable = () => {
  const router = useRouter();

  const images = [
    "/images/damage-demo.png",
    "/images/damage-case.png",
    "/images/damage-case-full.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: any) => {
    setActiveIndex(index);
  };

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // faysel1:
  // GET /api/v1/mypage/blacks
  // This API displays a list of black consumers that you have registered.
  // The implementation should also include pagination.

  // below code,
  //   <TableCell className="px-3 text-xs text-center border whitespace-nowrap">
  //   <button className="h-[25px] bg-abgray px-[15px] pt-1.5 pb-1 text-xs text-center text-white font-normal">
  //     <Link href="damage-cases/2">자세히 보기</Link>
  //   </button>
  //   </TableCell>
  // When clicked, it should navigate to the data page corresponding to this list, and the data values must be populated correctly.
  // Here, the data page is configured under damage-cases / [id].

  // This is a responsive project.
  // If you check the mobile size UI, you may notice that the UI changes differently.
  // Please check both desktop and mobile sizes while working on the API.
  // For more details, please refer to the Swagger documentation.

  return (
    <>
      <Table className="max-phone:hidden">
        <TableHeader className="bg-f6gray whitespace-nowrap">
          <TableRow className="whitespace-nowrap">
            {thRows.map((row, index) => (
              <TableHead
                key={row.title}
                className={`relative text-sm text-[#4B505D] font-normal text-center whitespace-nowrap ${
                  index !== thRows.length - 1 ? "custom-border" : ""
                }`}
              >
                {row.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="whitespace-nowrap">
          {tableData.map((data, index) => (
            <TableRow className="text-sm text-abgray" key={index}>
              <TableCell className="px-3 text-center border whitespace-nowrap">
                {String(index + 1).padStart(2, "0")}
              </TableCell>
              {/* createdAt */}
              <TableCell className="px-3 text-center border whitespace-nowrap">
                {data.registrationDateTime}
              </TableCell>
              {/* name */}
              <TableCell className="px-3 text-center border whitespace-nowrap">
                <Link href={`/damage-cases/${index + 1}`}>{data.name}</Link>
              </TableCell>
              {/* phone */}
              <TableCell className="px-3 text-center border whitespace-nowrap">
                {data.phoneNumber}
              </TableCell>
              {/* birth */}
              <TableCell className="px-3 text-center border whitespace-nowrap">
                {data.birthDate}
              </TableCell>
              {/* damageDate */}
              <TableCell className="px-3 text-center border whitespace-nowrap">
                {data.DateOfDamage}
              </TableCell>
              <TableCell className="px-3 text-xs text-center border whitespace-nowrap">
                <button className="h-[25px] bg-abgray px-[15px] pt-1.5 pb-1 text-xs text-center text-white font-normal">
                  <Link href="damage-cases/2">자세히 보기</Link>
                </button>
              </TableCell>
              {/* status */}
              <TableCell className="px-3 text-center border whitespace-nowrap">
                <TBRSituation
                  className="pt-1 text-xs whitespace-nowrap"
                  situation={data.situation}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* For small screen */}

      <main className="phone:hidden">
        {tableData.map((data, index) => {
          return (
            <div key={index} className="flex flex-col">
              <TableItem data={data} />
            </div>
          );
        })}
      </main>

      <div className="flex justify-center max-phone:hidden">
        <Pagination />
      </div>
    </>
  );
};

export default DamegeCasesTable;
