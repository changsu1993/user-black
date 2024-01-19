"use client";
import { useState, useEffect } from "react";

export default function useScrollY() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
  }, []);
  return scroll;
}
