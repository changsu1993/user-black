"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import JoinMembershipDialog from "@/components/dialogs/JoinMembership";
import LoginDialog from "@/components/dialogs/Login";
import SignUpWithIdDialog from "@/components/dialogs/SignUpWithId";
import FindCredsDialog from "@/components/dialogs/FindCreds";

import closeLight from "../../public/icons/close-light.svg";
import menuLight from "../../public/icons/menu-light.svg";
import logoLight from "../../public/logo-light.svg";
import backLight from "../../public/icons/back-light.svg";

const navItems = [
  { href: "/", label: "검색" },
  // { href: "#", label: "소개" },
  { href: "/damage-cases/register", label: "피해등록" },
  {
    href: "/customer-center/announcements",
    label: "고객센터",
    subLinks: [
      { href: "/customer-center/announcements", label: "공지사항" },
      { href: "/customer-center/faqs", label: "FAQ" },
      { href: "/customer-center/inquiry", label: "1:1 문의" },
    ],
  },
  { href: "#", label: "로그인", dialog: "LoginDialog" },
  { href: "#", label: "회원가입", dialog: "JoinMembershipDialog" },

  {
    href: "/my-page/info",
    label: "마이페이지",
    subLinks: [
      { href: "/my-page/info", label: "내정보관리" },
      { href: "/damage-cases", label: "피해사례등록현황" },
    ],
  },
];

const myPageSubLinks = [
  { href: "/my-page/info", label: "내정보관리" },
  { href: "/damage-cases", label: "피해사례등록현황" },
];

const Header = ({ variant = "dark", user }: { user?: any; variant?: any }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customerCenterOpen, setCustomerCenterOpen] = useState(false);
  const [myPageOpen, setMyPageOpen] = useState(false);
  const [myPageHover, setMyPageHover] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isSignUpWithIdDialogOpen, setIsSignUpWithIdDialogOpen] =
    useState(false);
  const [isFindCredsDialogOpen, setIsFindCredsDialogOpen] = useState(false);
  const isRootPath = pathname === "/";

  const handleGoBack = () => {
    router.back();
  };

  const handleLoginModalChange = (isOpen: boolean) => {
    setIsLoginModalOpen(isOpen);
    if (isOpen) setIsJoinModalOpen(false);
  };

  const handleJoinModalChange = (isOpen: boolean) => {
    setIsJoinModalOpen(isOpen);
    if (isOpen) setIsLoginModalOpen(false);
  };

  const openSignUpWithIdDialog = () => {
    setIsSignUpWithIdDialogOpen(true);
    setIsJoinModalOpen(false); // JoinMembershipDialog 닫기
  };

  const openFindCredsDialog = () => {
    setIsFindCredsDialogOpen(true);
    setIsLoginModalOpen(false); // LoginDialog 닫기
  };

  // 로그인 모달 트리거
  const loginTrigger = (
    <button
      onClick={() => handleLoginModalChange(true)}
      className="text-xl leading-[26px] tracking-[-0.6px] font-medium transition-all underline-offset-4 hover:underline"
    >
      로그인
    </button>
  );

  // 회원가입 모달 트리거
  const joinTrigger = (
    <button
      onClick={() => handleJoinModalChange(true)}
      className="text-xl leading-[26px] tracking-[-0.6px] font-medium transition-all underline-offset-4 hover:underline"
    >
      회원가입
    </button>
  );

  const isSpecialPath =
    [
      "/my-page/info",
      "/damage-cases",
      "/dormant-account",
      "/customer-center/announcements",
      "/customer-center/faqs",
      "/customer-center/inquiry",
      "/customer-center/inquiry/success",
    ].includes(pathname) ||
    (pathname.startsWith("/damage-cases/") &&
      !pathname.includes("/damage-cases/register") &&
      /\/damage-cases\/\d+/.test(pathname));

  const textColor = isSpecialPath ? "text-black" : "text-white";
  const logoColor = isSpecialPath ? "dark" : "light";
  const underlineColor = isSpecialPath ? "border-black" : "border-white";
  const hoverColor = isSpecialPath
    ? "text-black/50 hover:text-black"
    : "text-white/50 hover:text-white";

  const textStyle = "text-xl leading-[26px] tracking-[-0.6px] font-medium";

  useEffect(() => {
    // Handle resize to check if the window is at a mobile size
    const handleResize = () => {
      const mobileSize = window.innerWidth < 892;
      setIsMobile(mobileSize);
      // Ensure navbar is not open when resizing above mobile size
      if (!mobileSize && navbarOpen) {
        setNavbarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [navbarOpen]);

  useEffect(() => {
    if (navbarOpen && isMobile) {
      // 네비게이션 메뉴가 열렸을 때 body 스크롤을 비활성화
      document.body.style.overflow = "hidden";
    } else {
      // 네비게이션 메뉴가 닫혔을 때 body 스크롤을 다시 활성화
      document.body.style.overflow = "";
    }

    // 컴포넌트가 언마운트될 때 스크롤을 활성화하여 어떤 상황에서도 스크롤이 가능하도록 복원
    return () => {
      document.body.style.overflow = "";
    };
  }, [navbarOpen, isMobile]);

  const handleSubMenuClick = (menu: string) => {
    if (menu === "고객센터") {
      setCustomerCenterOpen(!customerCenterOpen);
    } else if (menu === "마이페이지") {
      setMyPageOpen(!myPageOpen);
    }
  };

  const closeNavbar = () => {
    if (isMobile) {
      setNavbarOpen(false);
      setCustomerCenterOpen(false);
      setMyPageOpen(false);
    }
  };

  return (
    <header
      className={`flex justify-between items-center pt-12 max-phone:pt-4 ${
        isMobile ? "px-10" : "pl-[88px] pr-[94px]"
      } absolute top-0 left-0 right-0 bg-transparent ${textColor}`}
    >
      <Link href="/" className="flex-1 max-phone:flex max-phone:justify-center">
        <Image
          src={`/logo-${logoColor}.svg`}
          width={isMobile ? 40 : 49.5} // 모바일에서 로고 크기 조절
          height={isMobile ? 27 : 34}
          alt="Site Logo"
          className="cursor-pointer"
        />
      </Link>

      <div
        className={`fixed inset-0 z-50 flex flex-col items-center phone:justify-center bg-black bg-opacity-[0.95] max-phone:pt-[226px] ${
          navbarOpen && isMobile ? "animate-slideIn" : "animate-slideOut"
        } transition-opacity duration-300 ease-in-out ${
          navbarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`md:hidden z-[60] ${
            navbarOpen
              ? "fixed left-[50%] top-[2rem] transform translate-x-[-50%] text-white "
              : "hidden"
          }`}
        >
          <Image src={logoLight} alt="logo white" />
        </div>
        {navbarOpen && (
          <button
            className={`z-50 max-phone:absolute max-phone:top-[2.5rem] max-phone:right-[1rem] ${
              navbarOpen ? "absolute left-8 top-[2.5rem] text-white " : ""
            }`}
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <Image src={closeLight} alt="close button" className="" />
          </button>
        )}
        <ul className="text-white text-xl">
          {navItems.map((item, index) => {
            // 로그인 상태에 따라 메뉴 아이템 렌더링 여부 결정
            if (
              (user && item.label === "로그인") ||
              (user && item.label === "회원가입") ||
              (!user && item.label === "마이페이지")
            ) {
              return null; // 로그인 상태일 때 로그인/회원가입 숨기기, 로그인 안됐을 때 마이페이지 숨기기
            }

            return (
              <React.Fragment key={index}>
                {item.subLinks ? (
                  <>
                    <li
                      className={`p-4 mb-0 mt-4 max-md:text-[#acacac] max-md:font-light`}
                      onClick={() => handleSubMenuClick(item.label)}
                    >
                      <button className="text-xl leading-[26px] tracking-[-0.6px] font-medium max-phone:text-[30px]">
                        {item.label}
                      </button>
                    </li>
                    <li
                      className={`transition-all ease-in-out duration-500 overflow-hidden max-md:text-[#acacac] max-md:font-light ${
                        (item.label === "고객센터" && customerCenterOpen) ||
                        (item.label === "마이페이지" && myPageOpen)
                          ? "max-h-96"
                          : "max-h-0"
                      }`}
                    >
                      <ul className="pl-6 space-y-3">
                        {item.subLinks.map((subItem, subIndex) => (
                          <li
                            key={subIndex}
                            onClick={closeNavbar}
                            className="max-md:text-[#acacac] max-md:font-light"
                          >
                            <Link href={subItem.href} passHref>
                              <span className="block hover:bg-gray-700 whitespace-nowrap text-sm leading-5 font-normal text-gray-400 hover:text-gray-300 cursor-pointer max-phone:text-[20px]">
                                - {subItem.label}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </>
                ) : (
                  <li
                    className="p-4 mt-4 max-md:text-[#acacac] max-md:font-light max-phone:flex max-phone:justify-center"
                    onClick={closeNavbar}
                  >
                    {item.dialog ? (
                      item.label === "로그인" ? (
                        <>
                          <div className="max-phone:hidden">
                            <LoginDialog
                              open={isLoginModalOpen}
                              onOpenChange={handleLoginModalChange}
                              trigger={loginTrigger}
                              joinMembershipTrigger={() => {
                                setIsLoginModalOpen(false); // 로그인 모달 닫기
                                setIsJoinModalOpen(true); // 회원가입 모달 열기
                              }}
                            />
                          </div>
                          <button
                            onClick={() => {
                              handleLoginModalChange(true);
                            }}
                            className="phone:hidden text-[30px] leading-[26px] tracking-[-0.6px] font-medium transition-all underline-offset-4 hover:underline"
                          >
                            로그인
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleJoinModalChange(true)}
                            className="max-phone:hidden text-xl leading-[26px] tracking-[-0.6px] font-medium"
                          >
                            회원가입
                          </button>
                          <button
                            onClick={() => handleJoinModalChange(true)}
                            className="phone:hidden text-[30px] leading-[26px] tracking-[-0.6px] font-medium transition-all underline-offset-4 hover:underline"
                          >
                            회원가입
                          </button>
                        </>
                      )
                    ) : (
                      <Link href={item.href} passHref>
                        <span className="text-xl leading-[26px] tracking-[-0.6px] font-medium cursor-pointer max-phone:text-[30px]">
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </div>

      <nav className={`${!isMobile ? "block" : "hidden"} md:block`}>
        <ul className="flex flex-col md:flex-row md:items-center">
          {navItems.map((item, index) => {
            // 데스크톱에서는 '로그인', '회원가입', '마이페이지' 아이템을 렌더링하지 않음x
            if (
              !isMobile &&
              ["로그인", "회원가입", "마이페이지"].includes(item.label)
            ) {
              return null;
            }

            return (
              <li
                key={index}
                className={`md:mr-10 relative group ${textStyle}`}
              >
                <Link href={item.href}>
                  <span
                    onClick={() => setNavbarOpen(false)}
                    className={`block py-2 md:py-0 md:inline cursor-pointer hover:border-b-2 ${underlineColor}`}
                    onMouseEnter={() => item.subLinks && setDropdownOpen(true)}
                  >
                    {item.label}
                  </span>
                </Link>
                {item.subLinks && (
                  <ul
                    className={`absolute hidden group-hover:block bg-transparent min-w-full ${
                      dropdownOpen ? "block" : "hidden"
                    }`}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {item.subLinks.map((subItem, subIndex) => (
                      <Link href={subItem.href} key={subIndex}>
                        <span
                          className={`block py-2 text-center cursor-pointer whitespace-nowrap ${textStyle} ${hoverColor}`}
                        >
                          {subItem.label}
                        </span>
                      </Link>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <div
        className={`${textStyle} hidden md:flex items-center justify-end flex-1`}
      >
        {!user ? (
          // 로그인하지 않은 상태
          <>
            <Link href="#" className={`cursor-pointer`}>
              <LoginDialog
                open={isLoginModalOpen}
                onOpenChange={handleLoginModalChange}
                trigger={loginTrigger}
                openFindCredsDialog={openFindCredsDialog}
                joinMembershipTrigger={() => {
                  setIsLoginModalOpen(false); // 로그인 모달 닫기
                  setIsJoinModalOpen(true); // 회원가입 모달 열기
                }}
              />
            </Link>
            <Link className={`ml-10 mr-10 cursor-pointer`} href="#">
              <JoinMembershipDialog
                open={isJoinModalOpen}
                onOpenChange={handleJoinModalChange}
                openSignUpWithIdDialog={openSignUpWithIdDialog}
                trigger={joinTrigger}
              />
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setMyPageHover(true)}
              onMouseLeave={() => setMyPageHover(false)}
            >
              <Link
                className={`cursor-pointer hover:border-b-2 ${underlineColor}`}
                href="/my-page/info"
              >
                마이페이지
              </Link>
              {myPageHover && (
                <ul className="absolute bg-transparent min-w-max">
                  {myPageSubLinks.map((subLink, index) => (
                    <li key={index} className="py-2">
                      <Link
                        className={`block whitespace-nowrap ${hoverColor}`}
                        href={subLink.href}
                      >
                        {subLink.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          // 로그인한 상태
          <>
            <span>{0} 회원님</span>
            <div
              className="relative ml-5"
              onMouseEnter={() => setMyPageHover(true)}
              onMouseLeave={() => setMyPageHover(false)}
            >
              <Link
                className={`cursor-pointer hover:border-b-2 ${underlineColor}`}
                href="/my-page/info"
              >
                마이페이지
              </Link>
              {myPageHover && (
                <div className="absolute bg-transparent min-w-max">
                  {myPageSubLinks.map((subLink, index) => (
                    <Link
                      className={`block py-2 ${hoverColor}`}
                      href={subLink.href}
                      key={index}
                    >
                      {subLink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <button
        className={`md:hidden z-50 max-phone:hidden max-phone:fixed max-phone:top-[3.5rem] max-phone:right-[1rem] ${
          navbarOpen ? "fixed right-10 text-white" : ""
        }`}
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        {/* {navbarOpen ? (
          <AiOutlineClose className="text-4xl" />
        ) : (
          <AiOutlineMenu className="text-4xl" />
        )} */}
        {!navbarOpen && (
          <Image src={menuLight} alt="close button" className="" />
        )}
      </button>

      {/* For small screen starts*/}
      <button
        className={`md:hidden phone:hidden  z-50 max-phone:absolute max-phone:top-[3.5rem] max-phone:right-[1rem] ${
          navbarOpen ? "absolute left-8 top-[2.5rem] text-white " : ""
        }`}
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        {!navbarOpen && (
          <Image src={menuLight} alt="close button" className="" />
        )}
        {/* {navbarOpen ? (
          <Image src={closeLight} alt="close button" className="" />
        ) : (
          <Image src={menuLight} alt="close button" className="" />
        )} */}
      </button>

      {!isRootPath && (
        <button
          className={`${
            navbarOpen
              ? "hidden"
              : "phone:hidden z-50 max-phone:absolute max-phone:top-[3.5rem] max-phone:left-[1rem] "
          }`}
          onClick={handleGoBack}
        >
          <Image src={backLight} alt="back botton" className="" />
        </button>
      )}

      {/* For small screen ends */}

      <SignUpWithIdDialog
        trigger
        open={isSignUpWithIdDialogOpen}
        onOpenChange={setIsSignUpWithIdDialogOpen}
      />

      <FindCredsDialog
        trigger
        open={isFindCredsDialogOpen}
        onOpenChange={setIsFindCredsDialogOpen}
      />
    </header>
  );
};

export default Header;
