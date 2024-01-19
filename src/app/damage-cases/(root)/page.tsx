"use client";

import Image from "next/image";
import React from "react";
import DamegeCasesTable from "./DamegeCasesTable";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import back from "../../../../public/icons/back.svg";

const DamegeCases = () => {
  const router = useRouter();

  const handleInfo = () => {
    router.push("/my-page/info");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main>
      <section
        className={cn(
          "w-full text-dark33 max-w-[1300px] mx-auto min-h-screen",
          "flex flex-col items-center justify-center",
          "pt-[238px] pb-[83px] max-phone:pt-[93px] max-phone:relative"
        )}
      >
        <button
          className="absolute z-[9999999] left-3 top-[50px]"
          onClick={handleGoBack}
        >
          <Image
            src={back}
            role="button"
            alt="Back Icon"
            className="phone:hidden w-[20px] h-[20px]"
          />
        </button>

        <div className="flex lg:hidden items-center gap-[13px] mb-7 max-phone:hidden">
          <Button
            onClick={handleInfo}
            variant="outline"
            className="rounded-full h-[42px] text-base font-medium leading-[21px]  border-black text-black"
          >
            내정보 관리
          </Button>
          <Button
            variant="accent"
            className="rounded-full h-[42px] text-base font-medium leading-[21px]"
          >
            피해사례 등록현황
          </Button>
        </div>

        <div className="w-full">
          <div className="flex flex-col items-start gap-[22px] p-2 md:flex-row md:items-center max-sm:items-center max-phone:flex-row-reverse max-phone:items-center max-phone:justify-end max-phone:gap-[8px]">
            <div>
              <Image
                src={"/icons/user-not.svg"}
                alt="user-icon"
                width={93}
                height={88}
                className="max-phone:w-[30px] max-phone:h-[28px]"
              />
            </div>
            <div>
              <h3 className="text-[45px] max-md:text-xl max-sm:text-center text-dark33 leading-[63px] font-semibold tracking-[-1.35px] max-phone:pl-[19px] max-phone:text-[28px]">
                피해사례 등록현황
              </h3>
              <p className="mt-[18px] max-sm:text-sm max-sm:text-center text-dark text-xl leading-[26px] tracking-[-0.6px] max-sm2:text-[1rem] max-phone:hidden">
                피해사례 등록 상세내용 확인 및 승인 여부를 확인하실 수 있습니다
              </p>
            </div>
          </div>
          <p className="phone:hidden mt-[18px] text-left text-dark  leading-[26px] pl-3 tracking-[-0.6px] text-[16px] font-light max-phone:pl-[27px] max-phone:text-[16px]">
            피해사례 등록 상세내용 확인 및 승인 여부를
            <br />
            확인하실 수 있습니다
          </p>
          {/* Table section */}
          <div className="mt-[54px]">
            <DamegeCasesTable />
          </div>
        </div>
      </section>
    </main>
  );
};

export default DamegeCases;
