"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Image from "next/image";

const imagesArray = [
  "/images/damage-case-full.png",
  "/images/damage-case.png",
  "/images/damage-case-full.png",
];

export default function ImageViewDialogSmall({
  onOpenChange,
  passedImage,
  active,
}: {
  onOpenChange?: (value: boolean) => void;
  passedImage: string;
  active: boolean;
}) {
  const [curImage, setCurImage] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: any) => {
    setCurImage(index);
  };

  useEffect(() => {
    onOpenChange?.(open);
    setCurImage(0);
  }, [onOpenChange, open]);

  const prevImage = () => {
    if (curImage >= 0) {
      setCurImage(curImage - 1);
    }
  };
  const nextImage = () => {
    if (curImage < imagesArray.length - 1) {
      setCurImage(curImage + 1);
    }
  };
const url = ' http://3.35.139.125:3000';
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Image
          src={`${url}${passedImage}`}
          width={242}
          height={237}
          alt=""
          className="w-[240px] h-[237px] max-phone:w-[100vw] max-phone:h-[133px] object-cover object-center rounded-[10px] overflow-hidden"
        />
      </DialogTrigger>
      <DialogContent className="z-[99999] bg-white/90 max-md:px-[20px] px-[97px] max-phone:px-[17px] max-md:pt-[45px] pt-[105px] max-phone:pt-[26px] pb-[48px] max-phone:pb-[20px] max-w-[1156px] max-phone:max-w-[334px] text-dark33">
        <DialogTrigger className="absolute top-[35px] right-[39px]">
          <Image
            src={"/icons/close.svg"}
            role="button"
            width={34}
            className="max-md:w-[20px] max-phone:hidden "
            height={34}
            alt="Close Icon"
          />
        </DialogTrigger>

        <div className="w-full  flex max-md:flex-col items-center justify-center max-md:gap-[10px] gap-[108px] relative">
          <div className="flex-1 w-full">
            <Image
              src={imagesArray[curImage]}
              width={654}
              height={641}
              alt=""
              className="object-cover object-center w-full h-auto aspect-square"
            />
          </div>

          <div className="flex gap-2 mt-0 absolute bottom-[90px] left-1/2 transform -translate-x-1/2 z-99999">
            {imagesArray.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === curImage ? "bg-[#fff]" : "bg-gray-300"
                }`}
                onClick={() => handleDotClick(index)}
              ></button>
            ))}
          </div>

          <div className="max-phone:hidden flex w-[240px] justify-between mb-[20px]">
            <button
              type="button"
              className="outline-none disabled:cursor-default disabled:opacity-60"
              disabled={curImage <= 0}
              onClick={prevImage}
            >
              <Image
                src={"/images/left.png"}
                width={50}
                height={46}
                alt="Left Icon"
                className="max-md:w-[20px] "
              />
            </button>
            <button
              type="button"
              className="outline-none disabled:cursor-default disabled:opacity-60"
              onClick={nextImage}
              disabled={curImage >= imagesArray.length - 1}
            >
              <Image
                src={"/images/right.png"}
                width={50}
                height={46}
                className="max-md:w-[20px] "
                alt="Left Icon"
              />
            </button>
          </div>
          <DialogTrigger>
            <button className="phone:hidden max-phone:mt-[15px] w-[240px] h-[54px] mx-auto bg-[#0a0a0a] rounded-[10px] text-[#fff] text-[18px] font-light">
              뒤로가기
            </button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
