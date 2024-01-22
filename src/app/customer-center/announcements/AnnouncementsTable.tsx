"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";
import AnnouncementDetailsDialog from "./AnnouncementDetailsDialog";

import rightArrowCustom from "../../../../public/icons/right-arrow-custom.svg";
import downArrowCustom from "../../../../public/icons/down-arrow.svg";

const tableRows = ["번호", "제목", "상세내용", "등록일시"];

// const tableData = [
//   {
//     name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
//     registrationDateTime: "2022-10-24 ㅣ 16:00:08",
//   },
//   {
//     name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
//     registrationDateTime: "2022-10-24 ㅣ 16:00:08",
//   },
//   {
//     name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
//     registrationDateTime: "2022-10-24 ㅣ 16:00:08",
//   },
//   {
//     name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
//     registrationDateTime: "2022-10-24 ㅣ 16:00:08",
//   },
//   {
//     name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
//     registrationDateTime: "2022-10-24 ㅣ 16:00:08",
//   },
//   {
//     name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
//     registrationDateTime: "2022-10-24 ㅣ 16:00:08",
//   },
//   {
//     name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
//     registrationDateTime: "2022-10-24 ㅣ 16:00:08",
//   },
//   {
//     name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
//     registrationDateTime: "2022-10-24 ㅣ 16:00:08",
//   },
//   {
//     name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
//     registrationDateTime: "2022-10-24 ㅣ 16:00:08",
//   },
// ];

const TableItem = ({ name }: { name: any }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const truncatedName = name.substring(0, 15);
  const displayedName = expanded ? name : truncatedName;

  const contentHeight = expanded ? "auto" : "48px";
  const contentPadding = expanded ? "15px 0 10px 18px" : "0 0 0 15px";

  // faysel1:
  // The dummy data mentioned above was used for aligning the UI.
  // The actual data format does not come in the same way as the dummy data.
  // I'm mentioning this to prevent any misunderstanding.

  // In the file app / customer-center / announcements / page.tsx , you should appropriately insert the data that you receive.

  // This is a responsive project.
  // If you check the mobile size UI, you may notice that the UI changes differently.
  // Please check both desktop and mobile sizes while working on the API.
  // For more details, please refer to the Swagger documentation."

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: contentHeight,
        transition: "height 0.3s",
      }}
      className={`bg-[#f3f4f6] ${
        expanded ? "rounded-[15px]" : "rounded-[60px] transition-all"
      }`}
      onClick={toggleExpand}
    >
      <div
        style={{ flex: 1, padding: contentPadding }}
        className={`${
          expanded ? "" : "text-[#acacac]"
        } text-[12px] transition-all duration-500`}
      >
        {/* title & content */}
        {displayedName}
        {!expanded && "..."}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          width: "48px",
          cursor: "pointer",
        }}
        className="self-baseline mt-4"
        onClick={toggleExpand}
      >
        {expanded ? (
          <Image
            src={downArrowCustom}
            alt="right side arrow"
            className="w-[15px] h-[15px] z-50 "
          />
        ) : (
          <Image
            src={rightArrowCustom}
            alt="right side arrow"
            className="w-[15px] h-[15px]"
          />
        )}
      </div>
    </div>
  );
};
interface PropType{
  data:any
}
export default function AnnouncementsTable(data:PropType) {
  const router = useRouter();
  const [datas, setData] = useState({ data: [] });
console.log("data is :",data["data"]);
  return (
    <>
      <Table className="max-phone:hidden">
        <TableHeader className="bg-f6gray whitespace-nowrap">
          <TableRow>
            {tableRows.map((row, index) => (
              <TableHead
                key={row}
                className={`relative text-sm text-[#4B505D] font-normal text-center whitespace-nowrap ${
                  index !== tableRows.length - 1 ? "custom-border" : ""
                }`}
              >
                {row}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data["data"]?.map((data:any, index:number) => (
            <TableRow className="text-abgray" key={index}>
              {/* id */}
              <TableCell className="border pl-[44px] pr-[41px] text-sm text-center whitespace-nowrap">
                {String(index + 1).padStart(2, "0")}
              </TableCell>
              {/* title */}
              <TableCell className="max-w-[700px] border pl-[37px] text-sm w-max truncate whitespace-nowrap">
                {data.title}
              </TableCell>
              {/* detail modal */}
              <TableCell className="border px-3 pl-[32px] pr-[33px] text-xs text-center whitespace-nowrap">
                <AnnouncementDetailsDialog data={data} />
              </TableCell>
              {/* createdAt */}
              <TableCell className="border px-3 pl-[51px] pr-[49px] text-sm text-center font-normal whitespace-nowrap">
                {data.createdAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* For small screens */}
      <section className="flex flex-col gap-[20px] transition-all duration-500 phone:hidden">
        {data && data["data"]?.map((item:any, index:any) => {
          return (
            <div key={index}>
              <div className="flex justify-between mb-[7px]">
                {/* id */}
                <p className="text-[#acacac] text-[12px] tracking-[-0.36px]">
                  {index + 1 > 9 ? index : `0${index + 1}`}
                </p>
                {/* createdAt */}
                <p className="text-[#acacac] text-[12px] tracking-[-0.36px]">
                  등록일 : {item.createdAt}
                </p>
              </div>

              <div>
                <TableItem name={item.authorName} />
              </div>
            </div>
          );
        })}
      </section>

      <div className="  flex justify-center">
        <Pagination />
      </div>
    </>
  );
}
