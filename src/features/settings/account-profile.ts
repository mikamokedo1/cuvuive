"use client";

import { createClient } from "@/libs/supabase/client";
import type { User } from "@supabase/supabase-js";
import { boolean, number, object, string } from "yup";

export interface AccountProfileFormValues {
  kidName: string;
  parentPhone: string;
  age: number;
  sex: string;
  playTimerMinutes?: number;
  weeklyReport?: boolean;
}

export const accountProfileSchema = object({
  kidName: string().required("Vui lòng nhập tên bé"),
  parentPhone: string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  age: number().required("Vui lòng chọn tuổi"),
  sex: string().required("Vui lòng chọn giới tính"),
  playTimerMinutes: number().min(0).notRequired(),
  weeklyReport: boolean().notRequired(),
});

export function getAccountProfileInitialValues(
  user: User | null,
  options?: { includePlayTimerMinutes?: boolean },
): AccountProfileFormValues {
  const includePlayTimerMinutes = options?.includePlayTimerMinutes ?? false;

  return {
    kidName: (user?.user_metadata?.kidName as string | undefined) ?? "",
    parentPhone: (user?.user_metadata?.parentPhone as string | undefined) ?? "",
    age: Number(user?.user_metadata?.age ?? 3),
    sex: (user?.user_metadata?.sex as string | undefined) ?? "male",
    ...(includePlayTimerMinutes
      ? { playTimerMinutes: Number(user?.user_metadata?.playTimerMinutes ?? 15) }
      : {}),
    weeklyReport: (user?.user_metadata?.weeklyReport as boolean | undefined) ?? true,
  };
}

export async function updateAccountProfile(
  values: AccountProfileFormValues,
  options?: { includePlayTimerMinutes?: boolean },
) {
  const supabase = createClient();
  const includePlayTimerMinutes = options?.includePlayTimerMinutes ?? false;

  // Also update the weeklyReportEnabled flag in the users DB table
  if (values.weeklyReport !== undefined) {
    fetch("/api/user/weekly-report", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: values.weeklyReport }),
    }).catch(console.error);
  }

  return supabase.auth.updateUser({
    data: {
      kidName: values.kidName,
      parentPhone: values.parentPhone,
      age: Number(values.age),
      sex: values.sex,
      ...(includePlayTimerMinutes && values.playTimerMinutes !== undefined
        ? { playTimerMinutes: Number(values.playTimerMinutes) }
        : {}),
      weeklyReport: values.weeklyReport ?? true,
    },
  });
}

export async function deleteCurrentAccount() {
  const supabase = createClient();
  const response = await fetch("/api/user/delete", {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete account");
  }

  await supabase.auth.signOut();
}
