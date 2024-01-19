"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="hero1-section w-full h-[655px] max-phone:h-[375px] text-white">
        <div className="text-center h-full flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-[84px] tracking-[-1.8px] max-phone:self-start max-phone:text-start max-phone:text-[26px] max-phone:font-light max-phone:leading-normal max-phone:mt-[4rem] max-phone:pl-3">
            고시원 블랙컨슈머 검색하기
          </h2>
          <p className="mt-[31px] max-phone:text-[#D0D0D0] max-phone:mt-[18px]  text-lg max-phone:self-start md:text-xl leading-[26px] tracking-[-0.6px] max-phone:text-[12px] max-phone:font-light max-phone:text-start  max-phone:pl-3">
            고시원 블랙컨슈머 피해로 걱정 많으셨죠? 이젠 사전에 예방하세요!
          </p>
          <div className="divide-x divide-white divide-dashed flex items-center max-phone:self-start mt-[51px] max-phone:mt-[25px] max-phone:pl-[10px]">
            <div className="text-center space-y-2 max-phone:space-y-0 px-[29px] py-[15px] max-phone:px-2 max-phone:mr-[1rem]">
              <p className="text-[15px] leading-[20px] tracking-[-0.45px] max-phone:text-[14px] max-phone:font-light max-phone:leading-normal">
                피해사례 등록 수
              </p>
              <h3 className="text-[30px] md:text-[50px] leading-[70px] font-bold gap-[10px] max-phone:text-[35px] max-phone:font-extralight max-phone:leading-normal">
                <span>14,194</span>
                <span className="max-phone:hidden tracking-[-0.6px] text-xl leading-[26px] pl-[10px]">
                  건
                </span>
              </h3>
            </div>
            <div className="text-center space-y-2 max-phone:space-y-0 px-[29px] py-[15px] max-phone:px-2  max-phone:pl-[1rem]">
              <p className="text-[15px] leading-[20px] tracking-[-0.45px]  max-phone:text-[14px] max-phone:font-light max-phone:leading-normal">
                피해사례 등록 수
              </p>
              <h3 className="text-[30px] max-phone:text-[35px] max-phone:font-extralight md:text-[50px] leading-[70px] max-phone:leading-normal font-bold gap-[10px]">
                <span>34,258</span>
                <span className="max-phone:hidden tracking-[-0.6px] text-xl leading-[26px] pl-[10px]">
                  건
                </span>
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section
        className={cn(
          "mt-[94px] w-full max-w-[665px] mx-auto",
          "flex flex-col items-center pb-[113px] max-phone:p-3 max-phone:mt-[40px]"
        )}
      >
        <h4 className="max-phone:hidden text-center max-w-[465px] text-dark max-sm2:text-xs">
          블랙컨슈머 이름, 휴대폰번호, 생년월일 중 2개를 입력해주세요 2개 이상
          일치하면 블랙컨슈머 이력을 검색할 수 있어요!
        </h4>
        <div className="w-full mt-[62px] max-phone:mt-[40px]">
          <div className="space-y-9">
            <div
              className={cn(
                "flex flex-col md:flex-row items-start md:items-center gap-[10px]"
              )}
            >
              <Label className="min-w-[120px] text-dark33 pl-5">이름</Label>
              <Input
                type="text"
                className="flex-1 max-phone:rounded-[10px]"
                placeholder="블랙컨슈머 이름을 입력해주세요"
              />
            </div>
            <div
              className={cn(
                "flex flex-col md:flex-row items-start md:items-center gap-[10px]"
              )}
            >
              <Label className="min-w-[120px] text-dark33 pl-5">
                휴대폰번호
              </Label>
              <Input
                type="text"
                className="flex-1 max-phone:rounded-[10px]"
                placeholder="- (하이픈) 제거 후 입력해주세요"
              />
            </div>
            <div
              className={cn(
                "flex flex-col md:flex-row items-start md:items-center gap-[10px]"
              )}
            >
              <Label className="min-w-[120px] text-dark33 pl-5">생년월일</Label>
              <Input
                type="text"
                className="flex-1 max-phone:rounded-[10px]"
                placeholder="생년월일 6자리를 입력해주세요 (예 : 841225)"
              />
            </div>
          </div>

          <Button
            size={"lg"}
            variant="accent"
            className="w-full mt-[61px] max-phone:bg-[#141414]"
            asChild
          >
            <Link href="/search/damage-cases">검색하기</Link>
          </Button>

          <p
            className={cn(
              "max-phone:hidden max-w-[504px] mx-auto mt-12 text-center",
              "text-sm leading-[22px] tracking-[-0.42px] text-c8gray"
            )}
          >
            (주)고수플러스는 범죄 피해방지를 위해 해당 서비스를 운영하고
            있습니다. 피해 사례 결과에 대해 고수플러스는 보증하지 않으며, 거래에
            대한 법적 책임은 당사자에게 있습니다.
          </p>
        </div>
      </section>
    </main>
  );
}
