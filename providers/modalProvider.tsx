"use client"
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const ModalProvider = ({ children }: { children: ReactNode}) => {
  const [isMounted, setIsMounted] = useState(false);
const router = useRouter()
  useEffect(() => {
    setIsMounted(true);

  }, []);

  return isMounted ? <>{children}</> : null;
};

export default ModalProvider;
