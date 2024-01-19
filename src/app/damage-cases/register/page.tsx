import { cn } from "@/lib/utils";
import DamageCaseForm from "../DamageCaseForm";

export default function Page() {
  return (
    <section
      className={cn(
        "mt-[106px] w-full max-w-[1300px] mx-auto px-5 pb-[146px] max-phone:px-[25px] max-phone:pb-[46px] max-phone:mt-[40px]"
      )}
    >
      <h3 className="text-[30px] max-md:text-start md:text-[35px] font-normal text-dark33 leading-[49px] tracking-[-1.05px] max-phone:text-[28px] max-phone:tracking-[-0.84px]">
        피해사례 등록
      </h3>
      <p className="mt-[20px] text-[20px] font-normal leading-[26px] tracking-[-0.6px] text-d9gray max-phone:text-[16px] max-phone:font-light">
        블랙컨슈머로 인한 막대한 피해를 막기 위해
        <br className="phone:hidden" />
        피해사례를 등록해주세요!
      </p>
      <h3 className="mt-[35px] max-md:text-start text-[20px] md:text-[35px] font-normal text-dark33 leading-[49px] tracking-[-1.05px] max-phone:mt-[42px] max-phone:text-[28px] max-phone:tracking-[-0.84px]">
        블랙컨슈머 필수 입력 정보
      </h3>
      <p className="mt-[20px] text-[20px] font-normal leading-[26px] tracking-[-0.6px] text-d9gray max-phone:text-[16px] max-phone:font-light">
        블랙컨슈머 이름, 휴대폰번호, 생년월일 중 2개 이상의
        <br className="phone:hidden" />
        정보를 입력해주세요.
      </p>
      <div className="mt-[86px] max-phone:mt-[42px]">
        <DamageCaseForm viewMode={false} />
      </div>
    </section>
  );
}
