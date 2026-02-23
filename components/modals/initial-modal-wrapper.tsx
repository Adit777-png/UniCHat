"use client";

import { useEffect, useState } from "react";
import { InitialModal } from "@/components/modals/initial-modal";

export const InitialModalWrapper = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <InitialModal />;
};
