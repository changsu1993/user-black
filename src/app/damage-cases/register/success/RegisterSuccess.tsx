"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function RegisterSuccess() {
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
    ? { width: 200, height: 200 }
    : { width: 467, height: 335 };

  return (
    <section className="mt-[135px] w-full max-w-[850px] mx-auto px-5 pb-[124px] max-phone:pb-[50px] max-phone:mt-[28px] max-phone:px-[25px]">
      <div className="flex flex-col items-center text-center">
        <Image
          src={"/images/case-register-succes.svg"}
          width={imageSize.width}
          height={imageSize.height}
          alt="Damage Case Register Success Image"
        />
        <h3 className="mt-[68px] text-[45px] font-normal text-dark33 sm:leading-[63px] tracking-[-1.35px] max-phone:mt-[18px] max-phone:text-[28px] max-phone:leading-[37px]">
          <strong className="phone:hidden">피해사례 등록 요청이</strong>
          <br className="phone:hidden" />
          완료되었습니다
        </h3>
        <p className="mt-[44px] max-w-[793px] text-[25px] font-normal text-d9gray sm:leading-[33px] tracking-[-0.75px] max-phone:mt-[20px] max-phone:text-[16px] max-phone:max-w-[330px]">
          등록하신 피해사례는 심사를 거쳐 등록이 완료됩니다.
          <br />
          <br />
          심사에는 <span className="max-phone:text-[#28a7e1]"> 최대 5일</span>이
          소요될 수 있으며{" "}
          <span className="max-phone:text-[#28a7e1]">
            심사 진행 현황은 <br className="phone:hidden" /> 마이페이지 {" > "}{" "}
            피해사례 등록현황 메뉴
          </span>
          에서 확인할 수 있습니다
        </p>
        <Button
          variant="accent"
          className="mt-[99px] justify-between w-full max-w-[676px] h-[80px] text-[25px] font-normal max-phone:h-[63px] max-phone:mt-[55px] max-phone:text-[18px] max-phone:tracking-[-0.54px] max-phone:bg-[#141414] max-phone:gap-[1rem] max-phone:pl-[11px]"
        >
          <span />
          <Link href="/damage-cases">
            <span>피해사례 등록현황으로 이동</span>
          </Link>
          <Image
            src={"/images/blueButtonIcon.png"}
            width={15}
            height={16}
            alt="right-icon"
          />
        </Button>
      </div>
    </section>
  );
}
