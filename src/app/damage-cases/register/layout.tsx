import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <main className="min-h-screen">
      <section className="hero3-section w-full h-[655px] text-white px-[1rem] max-phone:h-[306px] max-sm2:pt-[25px]">
        <div className="flex flex-col items-center justify-center h-full text-center max-phone:text-start max-phone:items-start">
          <h2 className="mt-[77px] text-4xl md:text-[60px] font-normal sm:leading-[84px] tracking-[-1.8px] max-phone:hidden">
            고시원 블랙컨슈머 피해사례등록
          </h2>
          <h2 className="phone:hidden self-start mt-[77px] text-left max-phone:mt-[55px] max-sm2:mt-[33px] text-4xl max-phone:text-[28px] max-phone:tracking-[-0.84px] md:text-[60px] font-normal sm:leading-[84px] tracking-[-1.8px] max-sm2:text-[1.5rem]">
            고시원 블랙컨슈머 <br /> 피해사례등록
          </h2>
          <p className="mt-[31px] text-lg font-normal tracking-[-0.6px] md:text-[20px] sm:leading-[26px] max-sm2:text-[1rem] max-phone:mt-[15px] max-phone:text-[16px] max-phone:text-[#d0d0d0] max-phone:font-light">
            블랙컨슈머 피해 사례를 등록하여 <br className="phone:hidden" />
            사람들에게 공유해주세요
          </p>
        </div>
      </section>
      {/* <RegisterSuccess /> */}
      {children}
    </main>
  );
}
