import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import back from "../../../../public/icons/back.svg";

type PropsType = {
  situation: "승인완료" | "승인대기" | "승인거절" | string;
  className?: string;
};

const TBRSituation: React.FC<PropsType> = ({
  situation,
  className = "p-4 pt-2 pb-1",
}) => {
  const form = useForm();
  const [isMobile, setIsMobile] = useState(false);

  const renderButton = (text: string, additionalClasses: string) => (
    <button className={`${className} ${additionalClasses} text-center`}>
      {text}
    </button>
  );
  // const [reasonForRejection, setReasonForRejection] = React.useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 540);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    form.setValue(
      "reasonForRejection",
      "기입한 내용중에 사건 발생 일시와 내용이 사실과 무근하여 승인이 거절 되었습니다"
    );
  }, [form]);

  // faysel1:
  // GET /api/v1/mypage/blacks
  // In this API, the data received represents the status of the corresponding post. As noted below, there are three status values.
  {
    /* WAITING = 'WAITING',
      APPROVED = 'APPROVED',
      REJECTED = 'REJECTED', */
  }

  // If the status value is REJECTED, you need to display the rejectedReason from the data.

  switch (situation) {
    case "승인완료":
      return renderButton(
        situation,
        "w-[66px] h-[25px] font-normal text-[12px] bg-abgray text-white"
      );
    case "승인대기":
      return renderButton(
        situation,
        "w-[66px] h-[25px] font-normal text-[12px] text-abgray border border-abgray"
      );
    case "승인거절":
      return (
        <Dialog>
          <DialogTrigger asChild>
            {renderButton(
              situation,
              "w-[66px] h-[25px] font-normal text-[12px] text-white bg-red"
            )}
          </DialogTrigger>
          <DialogContent className="z-[99999999999] bg-white/90 px-20 py-[51px] max-w-[580px] h-[619px] max-h-[619px] text-dark33 max-phone:pt-[59px] max-phone:px-[25px] max-phone:pb-[73px] max-phone:min-h-[100vh] max-phone:bg-white/100">
            <div>
              <DialogTrigger asChild>
                {isMobile ? (
                  <Image
                    src={back}
                    alt="back button"
                    className="phone:hidden w-[20px] h-[20px]"
                  />
                ) : (
                  <Image
                    src={"/icons/back.svg"}
                    role="button"
                    width={21}
                    height={39}
                    alt="Back Icon"
                    className=""
                  />
                )}
              </DialogTrigger>
              <h3 className="mt-[24px] text-[35px] font-normal leading-[39px] tracking-[-1.05px] max-phone:mt-[14px] max-phone:text-[28px]">
                승인거절 사유
              </h3>
              <p className="mt-[23px] text-base font-normal leading-[28px] tracking-[-0.48px] text-dark33 max-phone:text-[16px]">
                단순한 내용이거나 신고된 게시글 또한
                <br className="phone:hidden" />
                거절 사유가 될 수 있습니다
              </p>
              <div className="mt-[40px]">
                <Form {...form}>
                  <form className="space-y-8">
                    {/* rejectedReason */}
                    <FormField
                      disabled
                      control={form.control}
                      name="reasonForRejection"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px] font-normal text-dark33">
                            승인 거절 자세한 사유
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              disabled
                              rows={4}
                              className="min-h-[123px] font-normal text-[14px] text-9egray resize-none max-phone:border-1 max-phone:border-solid max-phone:border-[#d9d9d9]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
                <div className="mt-[77px] w-full">
                  <Button
                    variant="dark-gray"
                    className="w-full text-[18px] font-normal"
                  >
                    게시글 수정하기
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    default:
      return renderButton(situation, "text-abgray border border-abgray");
  }
};

// TBRSituation.defaultProps = {
//   className: "pt-2 pb-1 p-4",
// };

export default TBRSituation;
