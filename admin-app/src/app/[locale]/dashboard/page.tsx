"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManagementPage(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    router.push("/quanly");
  }, []);

  return <></>;
}
