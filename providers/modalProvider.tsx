"use client"
import React, { ReactNode, useEffect, useState } from "react";

const CliComp = ({ children }: { children: ReactNode}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

  }, []);

  return isMounted ? <>{children}</> : null;
};

export default CliComp;
