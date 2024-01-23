import { useState } from "react";

import FileObjectionDialog from "@/components/dialogs/FileObjection";
import ImageViewDialog from "@/components/dialogs/ImageView";
import ImageViewDialogSmall from "@/components/dialogs/ImageViewSmallScreen";
interface PropType{
  data:any
}
export default function DamageCaseItem({data}:PropType) {
  const images = [
    "/images/damage-case-full.png",
    "/images/damage-case.png",
    "/images/damage-case-full.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: any) => {
    setActiveIndex(index);
  };

  return (
    <div className="pt-[39px] pl-[47px] pr-[72px] pb-[70px] rounded-[30px] bg-f6gray relative group max-phone:pl-[19px] max-phone:pr-[21px] max-phone:pt-[15px] max-phone:pb-[20px] max-phone:rounded-[15px]">
      <div className="absolute right-[39px] mb-5 max-phone:hidden">
        <p className="md:text-[16px] text-b7gray text-base leading-[21px] tracking-[-0.48px] max-sm2:text-xs max-sm:pl-2">
          잘못된 피해 사례가 등록되었어요!
          <FileObjectionDialog />
        </p>
      </div>
      <div className="space-y-[25px] max-phone:space-y-[12px]">
        <div className="flex flex-col items-baseline md:flex-row max-phone:flex-row max-phone:items-center gap-[7px] max-phone:gap-[12px]">
          <p className="w-[82px] md:text-[16px] max-phone:text-[12px] font-normal truncate text-dark33 text-base leading-[21px] tracking-[-0.48px] mt-10 max-phone:mt-0 max-phone:w-[56px]">
            등록일
          </p>
          <div className="bg-white px-5 max-phone:px-[10px] py-1 max-phone:py-[2px] max-phone:rounded-[5px] h-[42px] max-phone:h-[28px] flex items-center gap-[18px] max-phone:gap-[12px] ">
            <p className="text-dark33 text-base max-phone:text-[12px] leading-[21px] tracking-[-0.48px]">
            {data.createdAt} (화)
            </p>
            <span className="w-4 h-4 border rounded-full border-accent group-even:bg-accent" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row max-phone:flex-row max-phone:items-center items-baseline gap-[7px] max-phone:gap-[12px]">
          <p className="w-[82px] md:text-[16px] max-phone:text-[12px] font-normal truncate text-dark33 text-base leading-[21px] tracking-[-0.48px] max-phone:mt-0 max-phone:w-[56px]">
            피해 발생일
          </p>
          <div className="bg-white px-5 max-phone:px-[10px] py-1 max-phone:py-[2px] max-phone:rounded-[5px] h-[42px] max-phone:h-[28px]  flex items-center gap-[18px] max-phone:gap-[12px] ">
            <p className="text-dark33 text-base max-phone:text-[12px] leading-[21px] tracking-[-0.48px]">
              {data.damageDate} (화)
            </p>
            <span className="w-4 h-4 border border-transparent rounded-full" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-[13px]">
          <p className="w-[82px] md:text-[16px] max-phone:text-[12px] font-normal truncate text-dark33 text-base leading-[21px] tracking-[-0.48px] mt-[11px]">
            피해 내용
          </p>
          <div className="w-full bg-white px-5 py-[10px] max-phone:rounded-[5px]">
            <p className="text-dark33 text-sm max-phone:text-[12px] leading-[21px] tracking-[-0.48px]">
            
            {data.damageContent}
            
              {/* 에어비앤비 숙소를 엉망으로 만든다, 계좌이체해주겠다고 하고
              잠적한다 등의 악성 게스트
              <br />
              <br />
              다른 입주자와 싸우고 공용공간을 엉망으로 만들어 다 퇴실하게 만들고
              혼자 편히 살고 있는 쉐어하우스의 입주자
              <br />
              <br />
              한 분야에서 전문적인 경험과 지식을 보유한 전문가를 초청하여
              <br />
              사회 이슈에 대한 감정 및 지식을 함양하기위해 명사초청특강을
              준비하였습니다.
              <br />
              많은 관심과 참여 부탁드립니다. */}
            </p>
          </div>
        </div>
        <div className=" flex flex-col md:flex-row items-center md:items-start  gap-[13px]">
          <p className="max-phone:hidden w-[82px] md:text-[16px] font-normal truncate text-dark33 text-base leading-[21px] tracking-[-0.48px] mt-[11px]">
            피해 사진
          </p>

          {/* For large screen */}
          <div className="flex flex-col flex-wrap items-center w-full gap-5 max-phone:hidden md:flex-row md:gap-7">
           {data.imagePaths.map((path:any,index:any) => <ImageViewDialog key={index} paths={path}/> ) }
           
           
          </div>

          {/* For small screen */}

          <div className="relative flex flex-col flex-wrap items-center w-full gap-5 phone:hidden md:flex-row md:gap-7">
            <ImageViewDialogSmall
              passedImage={images[activeIndex]}
              active={true}
            />
            <div className=" flex gap-2 mt-0 absolute bottom-[7px] left-[50%] transform translate-x-[-50%] z-[999]">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === activeIndex ? "bg-[#fff]" : "bg-gray-300"
                  }`}
                  onClick={() => handleDotClick(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
