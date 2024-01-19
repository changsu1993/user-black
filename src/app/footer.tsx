import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer
      className={cn(
        "bg-f6gray px-[90px] min-h-[211px] py-[68px]",
        "hidden lg:flex items-start justify-between gap-10"
      )}
    >
      {/* <div>
        <p className="text-[15px] leading-[20px] tracking-[-0.45px] text-secondary">
          <span>고객센터</span>
          <span className="block mt-2">
            1588 - 1588 (유료) 평일 10시 ~ 18시
          </span>
        </p>
      </div>
      <div className="flex flex-col items-center gap-[35px]">
        <div className="flex items-center gap-8">
          <p className="text-[15px] leading-[20px] tracking-[-0.45px] text-secondary">
            상호명 : 김상호
          </p>
          <span className="w-px h-4 bg-secondary" />
          <p className="text-[15px] leading-[20px] tracking-[-0.45px] text-secondary">
            대표 : 김상호
          </p>
          <span className="w-px h-4 bg-secondary" />
          <p className="text-[15px] leading-[20px] tracking-[-0.45px] text-secondary">
            주소 : 서울특별시 선흥로 16-4
          </p>
          <span className="w-px h-4 bg-secondary" />
          <p className="text-[15px] leading-[20px] tracking-[-0.45px] text-secondary">
            사업자 등록 번호 : 21645164485
          </p>
        </div>
        <div className="flex items-center gap-5">
          <p className="text-[15px] leading-[20px] tracking-[-0.45px] text-secondary">
            개인정보처리방침
          </p>
          <span className="w-px h-4 bg-secondary" />
          <p className="text-[15px] leading-[20px] tracking-[-0.45px] text-secondary">
            서비스 이용약관
          </p>
        </div>
      </div>
      <div>
        <p className="text-[15px] leading-[20px] tracking-[-0.45px] text-secondary">
          영문회사명 Inc All rights reserved
        </p>
      </div> */}
    </footer>
  );
}
