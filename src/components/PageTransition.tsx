"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [show, setShow] = useState(true);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      setShow(false);
      const t = setTimeout(() => {
        setDisplayChildren(children);
        setShow(true);
        window.scrollTo(0, 0);
      }, 160);
      return () => clearTimeout(t);
    }
    setDisplayChildren(children);
  }, [pathname, children]);

  return <div className={`page-transition ${show ? "page-visible" : "page-hidden"}`}>{displayChildren}</div>;
};

export default PageTransition;
