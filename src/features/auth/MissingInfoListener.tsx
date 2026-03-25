"use client";

import { Suspense, lazy } from "react";
import { useUser } from "@/context/UserContext";

const MissingInfoModal = lazy(() =>
  import("./MissingInfoModal").then((m) => ({ default: m.MissingInfoModal })),
);

export function MissingInfoListener() {
  const { showMissingInfoModal, setShowMissingInfoModal, checkMissingInfo } = useUser();

  if (!showMissingInfoModal) return null;

  return (
    <Suspense fallback={null}>
      <MissingInfoModal
        isOpen={showMissingInfoModal}
        onSuccess={async () => {
          setShowMissingInfoModal(false);
          await checkMissingInfo();
        }}
      />
    </Suspense>
  );
}
