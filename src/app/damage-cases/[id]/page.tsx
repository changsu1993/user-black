"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import DamageDetailCaseForm from "./DamageDetailCaseForm";

import back from "../../../../public/icons/back.svg";

export default function Page() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // faysel1:
  // damage-cases / [id]

  return (
    <main className="min-h-screen">
      <section
        className={cn(
          "w-full text-dark33 max-w-[1300px] mx-auto min-h-screen",
          "pt-[238px] pb-[158px] max-sm2:pt-[100px] max-phone:pt-[60px] max-phone:pb-[40px] pl-6 pr-6  max-sm2:pl-0 max-sm2:pr-0"
        )}
      >
        <button
          className="absolute z-[99999999] left-3 top-[58px]"
          onClick={handleGoBack}
        >
          <Image
            src={back}
            role="button"
            // width={19}
            // height={12}
            alt="Back Icon"
            className="phone:hidden w-[20px] h-[20px]"
          />
        </button>

        <h3 className="mt-[35px] text-[35px] font-normal text-dark33 leading-[49px] tracking-[-1.05px] max-md:text-center max-md:text-3xl max-sm2:mt-0 max-phone:mt-[38px] max-phone:text-left max-phone:text-[#333] max-phone:text-[26px] max-phone:tracking-[-0.84px] max-phone:pl-2">
          피해사례 등록 상세 및 수정
        </h3>
        <div className="w-full mt-[45px] max-sm2:mt-[-8px] max-sm2:p-[1rem]">
          <DamageDetailCaseForm />
        </div>
      </section>
    </main>
  );
}
