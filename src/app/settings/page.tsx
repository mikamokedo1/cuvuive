import { SettingsView } from "@/features/settings/SettingsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cài đặt | Cú Thông Minh",
  description: "Cài đặt thông tin tài khoản cho bé",
};

export default function SettingsPage() {
  return <SettingsView />;
}
