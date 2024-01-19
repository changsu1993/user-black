import loadLocalFont from "next/font/local";

// const appleSDGothic = {
//   sb00: loadLocalFont({
//     src: "../../public/fonts/AppleSDGothicNeo/SB00.ttf",
//     preload: true,
//     variable: "--font-sb00",
//   }),
//   b00: loadLocalFont({
//     src: "../../public/fonts/AppleSDGothicNeo/B00.ttf",
//     preload: true,
//     variable: "--font-b00",
//   }),
//   r00: loadLocalFont({
//     src: "../../public/fonts/AppleSDGothicNeo/R00.ttf",
//     preload: true,
//     variable: "--font-r00",
//   }),
//   m00: loadLocalFont({
//     src: "../../public/fonts/AppleSDGothicNeo/M00.ttf",
//     preload: true,
//     variable: "--font-m00",
//   }),
// };

const appleSDGothic = loadLocalFont({
  src: [
    {
      path: "../../public/fonts/apple-gothic-neo/100.woff2",
      weight: "100",
    },
    {
      path: "../../public/fonts/apple-gothic-neo/200.woff2",
      weight: "200",
    },
    {
      path: "../../public/fonts/apple-gothic-neo/300.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/apple-gothic-neo/400.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/apple-gothic-neo/500.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/apple-gothic-neo/600.woff2",
      weight: "600",
    },
    {
      path: "../../public/fonts/apple-gothic-neo/700.woff2",
      weight: "700",
    },
  ],
  preload: true,
});

const fonts = {
  appleSDGothic,
};

export default fonts;
