"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionButton } from "@/components/common/ActionButton";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface UpgradeActionButtonProps {
  planCode: string;
  priceFormatted: string;
  colorDef: "green" | "blue" | "orange";
}

export function UpgradeActionButton({ planCode, priceFormatted, colorDef }: UpgradeActionButtonProps) {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpgrade = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để nâng cấp tính năng nhé!");
      router.push("/auth/login?next=/upgrade");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planCode }),
      });

      const data = await response.json();

      // Redirect to the checkout page with the newly created order ID
      router.push(`/upgrade/checkout?orderId=${data.order.id}`);
    } catch (error: any) {
      toast.error(error.message || "Đã xảy ra lỗi, vui lòng thử lại sau.");
      console.error("Order creation error:", error);
      setIsLoading(false); // only set to false if error, since if success it redirects
      router.push("/auth/login?next=/upgrade");
    }
  };

  return (
    <ActionButton
      onClick={handleUpgrade}
      variant="glossy"
      color={colorDef}
      className="w-full py-3 text-lg font-extrabold shadow-lg"
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : `${priceFormatted} VND`}
    </ActionButton>
  );
}
