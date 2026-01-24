"use client";

import { useUser } from "@/context/UserContext";
import { MissingInfoModal } from "./MissingInfoModal";

export function MissingInfoListener() {
  const { showMissingInfoModal, setShowMissingInfoModal, checkMissingInfo } = useUser();

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
