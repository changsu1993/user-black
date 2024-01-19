"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import back from "../../../../../public/icons/back.svg";

export default function Page() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileSize = windowWidth !== undefined && windowWidth < 640;
  const imageSize = isMobileSize
    ? { width: 200, height: 144 }
    : { width: 467, height: 335 };

  const handleNoticeClick = () => {
    router.push("/customer-center/announcements");
  };

  const handleInquiry = () => {
    router.push("/customer-center/inquiry");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main>
      <section className="pt-[250px] w-full relative max-w-[676px] mx-auto px-5 pb-[138px] max-phone:pt-[102px] max-phone:pb-[50px] max-phone:px-[25px]">
        <button
          className="absolute z-[99999] left-[20px] top-[59px]"
          onClick={handleGoBack}
        >
          <Image
            src={back}
            role="button"
            alt="Back Icon"
            className="phone:hidden w-[25px] h-[25px]"
          />
        </button>

        {/* For small screen starts */}
        <div className="phone:hidden flex justify-center lg:hidden items-center gap-[13px] mb-10 max-phone:flex max-phone:mb-[58px] ">
          <Button
            onClick={handleNoticeClick}
            variant="outline"
            className="rounded-full w-[118px] h-[42px] text-base font-medium leading-[21px] border-[#ACACAC] text-[#ACACAC]"
          >
            공지사항
          </Button>
          <Button
            variant="accent"
            className="rounded-full w-[95px] h-[42px] text-base font-medium leading-[21px]"
          >
            FAQ
          </Button>
          <Button
            onClick={handleInquiry}
            variant="outline"
            className="rounded-full w-[108px] h-[42px] text-base font-medium leading-[21px] border-[#ACACAC] text-[#ACACAC]"
          >
            1:1 문의
          </Button>
        </div>

        <div className="flex flex-col items-center text-center">
          <Image
            src={"/images/case-register-succes.svg"}
            width={imageSize.width}
            height={imageSize.height}
            alt="Damage Case Register Success Image"
          />
          <h3 className="mt-[68px] text-[45px] font-normal text-dark33 leading-[63px] tracking-[-1.35px] max-phone:mt-[19px] max-phone:text-[28px]">
            문의 등록완료
          </h3>
          <p className="mt-[44px] text-[25px] font-normal text-d9gray leading-[33px] tracking-[-0.75px] max-phone:hidden max-phone:text-[16px]">
            문의사항이 정상적으로 등록되었습니다
          </p>

          {/* Element for small screen only starts*/}
          <p className="phone:hidden mt-[20px] text-[25px] max-phone:text-[16px] font-normal text-d9gray tracking-[-0.75px]">
            문의사항이 <span className="text-[#28A7E1]">정상적으로 등록</span>
            되었습니다
          </p>

          <Link
            className="mt-[68px] w-full max-w-[652px] max-phone:mt-[185px]"
            href="/"
          >
            <Button
              variant="accent"
              className="text-[25px] justify-between w-full max-w-[652px] min-w-[652px] max-phone:text-[18px] max-phone:font-light max-phone:justify-center max-phone:min-w-full max-phone:max-w-full max-phone:bg-[#0A0A0A]"
            >
              <span />
              <span>확인</span>
              <Image
                src={"/images/whiteRight.png"}
                width={20}
                height={10}
                alt="Right Icon"
                className="max-phone:hidden"
              />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
