import { GameLayout } from "@/components/layout/GameLayout";

export const CheckingPermission = ({ path }: { path: string }) => {
  return (
    <GameLayout title="" backTo={path} showBackButton={true}>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-orange-600 font-bold">Đang kiểm tra quyền truy cập...</p>
      </div>
    </GameLayout>
  );
};
