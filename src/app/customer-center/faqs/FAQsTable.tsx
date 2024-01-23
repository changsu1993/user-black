"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";
import FAQsDetailsDialog from "./FAQsDetailsDialog";

import rightArrowCustom from "../../../../public/icons/right-arrow-custom.svg";
import downArrowCustom from "../../../../public/icons/down-arrow.svg";

const tableRows = ["번호", "구분", "제목", "상세내용"];

const tableData = [
  {
    name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
    category: "구분 01",
  },
  {
    name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
    category: "구분 01",
  },
  {
    name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
    category: "구분 01",
  },
  {
    name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
    category: "구분 01",
  },
  {
    name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
    category: "구분 01",
  },
  {
    name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
    category: "구분 01",
  },
  {
    name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
    category: "구분 01",
  },
  {
    name: "[고시원 블랙리스트] 블랙리스트 사태의 가장 대표적인 사례라 할 수 있는 ‘팝업씨어터 사건’의 전말과 그 후속조치 이행하여",
    category: "구분 01",
  },
];

const TableItem = ({ name }: { name: any }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // const truncatedName = name.substring(0, 15);
  // const displayedName = expanded ? name : truncatedName;

  const contentHeight = expanded ? "auto" : "48px";
  const contentPadding = expanded ? "15px 0 10px 18px" : "0 0 0 15px";

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
        {"name"}
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

export default function AnnouncementsTable({ data }: { data: any[] }) {
  const router = useRouter();

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
          {data && data.map((data:any, index:any) => (
            <TableRow className="text-abgray" key={index}>
              <TableCell className="text-sm border pl-[44px] pr-[40px] text-center whitespace-nowrap">
                {String(index + 1).padStart(2, "0")}
              </TableCell>
              <TableCell className="text-sm border pl-[36px] pr-[33px] text-center whitespace-nowrap">
                {data.content}
              </TableCell>
              <TableCell className="text-sm border pl-[41px] w-max truncate max-w-[829px] whitespace-nowrap">
                {data.title}
              </TableCell>
              <TableCell className="text-xs border pl-[32px] pr-[31px] text-center whitespace-nowrap">
                <FAQsDetailsDialog data={data} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* For small screens */}
      <section className="flex flex-col gap-[20px] transition-all duration-500 phone:hidden">
        {data &&  data.map((item:any, index:any) => {
          return (
            <div key={index}>
              <div className="flex justify-between mb-[7px]">
                <div className="flex gap-[8px]">
                  <p className="text-[#acacac] text-[12px] tracking-[-0.36px]">
                    {index + 1 > 9 ? index : `0${index + 1}`}
                  </p>
                  <p className="w-[46px] h-[16px] rounded-[40px] bg-[#acacac] text-[8px] text-[#fff] tracking-[-0.24px] flex items-center justify-center font-light">
                    {item.category}
                  </p>
                </div>
              </div>

              <div>
                <TableItem name={item.name} />
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
