"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import useAlertDialog from "@/components/hooks/stores/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import back from "../../../public/icons/back.svg";

export default function Page() {
  const router = useRouter();
  const { showAlertDialog } = useAlertDialog();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen">
      <section
        className={cn(
          "w-full text-dark33 max-w-[700px] mx-auto min-h-screen",
          "flex flex-col items-center justify-center text-center relative",
          "pt-[238px] pb-[258px] max-phone:pb-[50px] max-phone:pt-[145px] max-phone:px-[25px] max-phone:justify-start"
        )}
      >
        <button
          className="absolute left-[20px] top-[4rem] z-[9999999999999999]"
          onClick={handleGoBack}
        >
          <Image
            src={back}
            role="button"
            // width={19}
            // height={12}
            alt="Back Icon"
            className="phone:hidden w-[25px] h-[25px]"
          />
        </button>

        <h2 className="text-[45px] text-dark33 font-normal leading-[63px] tracking-[-1.35px] max-phone:text-[28px]">
          휴면 계정 안내
        </h2>
        <p className="mt-[18px] text-[20px] font-normal text-dark leading-[33px] tracking-[-0.6px] max-phone:text-[16px] max-phone:leading-normal">
          안녕하세요!
          <br />
          회원님은 1년 이상 로그인하지않아 <br className="phone:hidden" /> 관련
          법령에 따라 <br className="phone:hidden" /> 휴면 상태로 전환되었습니다
        </p>
        <div
          className={cn(
            "mt-[61px] w-full border border-d9gray py-[33px] max-w-[652px] min-h-[133px] max-h-[133px] max-phone:mt-[37px] max-phone:max-w-full max-phone:min-h-[114px] max-phone:max-h-[114px] max-phone:rounded-[10px]",
            "flex flex-col items-center justify-center gap-[14px] max-phone:gap-[5px]"
          )}
        >
          <p className="text-[20px] font-normal text-dark33 leading-[29px] tracking-[-0.6px]">
            마지막 접속일 : 2020 - 12 - 08
          </p>
          <p className="text-[20px] font-normal text-dark33 leading-[29px] tracking-[-0.6px]">
            휴면 전환일 : 2021 - 02 - 20
          </p>
        </div>

        <p className="mt-[55px] font-normal text-[20px] text-dark leading-[29px] tracking-[-0.6px] max-phone:mt-[41px] max-phone:text-[16px] max-phone:leading-[24px]">
          서비스를 계속 이용하시려면 <br className="phone:hidden" /> 휴면
          해제하기 버튼을 클릭해주세요
        </p>

        <div className="mt-[89px] w-full max-w-[652px] flex items-center gap-5 max-phone:mt-[108px] max-phone:max-w-full max-phone:flex-col-reverse">
          <Button
            type="button"
            variant="dark-gray"
            className="w-full min-h-[80px] max-h-[80px] text-[25px] font-normal max-phone:max-h-[65px] max-phone:min-h-[65px] max-phone:bg-white max-phone:border-[1px] max-phone:border-solid max-phone:border-[#4a4e57] max-phone:text-[#000] max-phone:text-[18px] max-phone:tracking-[-0.54px]"
            onClick={handleGoBack}
          >
            취소
          </Button>
          <Button
            variant="accent"
            className="w-full min-h-[80px] max-h-[80px] text-[25px] font-normal max-phone:max-h-[65px]  max-phone:min-h-[65px] max-phone:bg-[#141414] max-phone:text-[18px]"
            onClick={() =>
              showAlertDialog({
                heading: "휴면 계정 해제 완료",
                content: `회원님의 계정이 휴면 해제되었습니다.\n  모든 서비스를 정상적으로 이용할 수 있습니다.`,
                buttonTxt: "확인",
              })
            }
          >
            휴면해제하기
          </Button>
        </div>
      </section>
    </main>
  );
}
