"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Image from "next/image";

const imagesArray = [
  "/images/damage-case-full.png",
  "/images/damage-case.png",
  "/images/damage-case-full.png",
];

export default function ImageViewDialog({
  onOpenChange,
}: {
  onOpenChange?: (value: boolean) => void;
}) {
  const [curImage, setCurImage] = useState<number>(0);
  const [open, setOpen] = useState(false);

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Image
          src={"/images/damage-case.png"}
          width={242}
          height={237}
          alt=""
          className="w-[242px] h-[237px] object-cover object-center rounded-[10px] overflow-hidden"
        />
      </DialogTrigger>
      <DialogContent className="bg-white/90 max-md:px-[20px] px-[97px] max-md:pt-[45px] pt-[105px] pb-[48px] max-w-[1156px] text-dark33">
        <DialogTrigger className="absolute top-[35px] right-[39px]">
          <Image
            src={"/icons/close.svg"}
            role="button"
            width={34}
            className="max-md:w-[20px] "
            height={34}
            alt="Close Icon"
          />
        </DialogTrigger>
        <div className="w-full flex max-md:flex-col items-center justify-center max-md:gap-[10px] gap-[108px]">
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
          <div className="flex-1 w-full">
            <Image
              src={imagesArray[curImage]}
              width={654}
              height={641}
              alt=""
              className="w-full h-auto aspect-square object-cover object-center"
            />
          </div>
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
      </DialogContent>
    </Dialog>
  );
}
