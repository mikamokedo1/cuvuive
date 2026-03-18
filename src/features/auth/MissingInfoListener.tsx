"use client";

import dynamic from "next/dynamic";
import { useUser } from "@/context/UserContext";

const MissingInfoModal = dynamic(
  () => import("./MissingInfoModal").then((m) => m.MissingInfoModal),
  { ssr: false },
);

export function MissingInfoListener() {
  const { showMissingInfoModal, setShowMissingInfoModal, checkMissingInfo } = useUser();

  if (!showMissingInfoModal) return null;

  return (
    <MissingInfoModal
      isOpen={showMissingInfoModal}
      onSuccess={async () => {
        setShowMissingInfoModal(false);
        await checkMissingInfo();
      }}
    />
  );
}
