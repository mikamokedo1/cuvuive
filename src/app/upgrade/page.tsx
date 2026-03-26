import Image from "next/image";
import { getPlans } from "@/libs/actions/plans";
import Header from "@/components/layout/Header";
import { UpgradeActionButton } from "./_components/UpgradeActionButton";

const owlHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";
const SeedImg = "https://assets.cuthongminh.com/assets/upgrade/seed.webp";
const BuffImg = "https://assets.cuthongminh.com/assets/upgrade/buff.webp";
const LeafImg = "https://assets.cuthongminh.com/assets/upgrade/leaf.webp";

export const metadata = {
  title: "Nâng Cấp Tài Khoản | Cú Thông Minh",
  description: "Chọn gói phù hợp để học hành chăm chỉ nhé!",
};

// Define a type for the Plan structure from DB
interface Plan {
  id: string;
  name: string;
  code: string;
  price: number;
  durationMonths: number;
  description: string | null;
}

// Helper to calculate discount
function calculateDiscount(basePrice: number, currentPrice: number, months: number): number | null {
  if (months <= 1) return null;
  const monthlyPrice = currentPrice / months;
  const discount = Math.round(((basePrice - monthlyPrice) / basePrice) * 100);
  return discount > 0 ? discount : null;
}

export default async function UpgradePage() {
  let plans: Plan[] = [];
  try {
    plans = await getPlans();
  } catch (error) {
    console.error("Failed to fetch plans:", error);
  }

  // Find base price (price of 1 month plan) for discount calculation
  const basePlan = plans.find((p) => p.durationMonths === 1);
  const baseMonthlyPrice = basePlan ? basePlan.price : 0;

  return (
    <div className="min-h-screen bg-sky-100 relative overflow-hidden font-nunito flex flex-col py-6 px-4">
      {/* Background Clouds/Decoration */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-10 left-10 w-32 h-20 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-20 right-20 w-48 h-24 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-60 h-32 bg-white rounded-full blur-2xl"></div>
      </div>

      <Header />

      <div className="relative z-10 container mx-auto px-4 pb-12 flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 text-center mt-12">
          <div className="relative mb-4">
            <Image
              src={owlHi}
              alt="Owl Mascot"
              width={120}
              height={120}
              className="drop-shadow-lg animate-bounce-custom"
            />
            {/* Adding a CSS graduation cap for fun if possible, or just keeping the owl */}
            <div className="absolute -top-6 left-8 text-4xl">🎓</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#8B4513] drop-shadow-sm mb-2">Nâng Cấp Tài Khoản</h1>
          <p className="text-slate-600 font-medium text-lg max-w-lg">Chọn gói phù hợp để học hành chăm chỉ nhé!</p>
        </div>

        {/* Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {plans.map((pkg) => {
            // Map code to visual assets
            let icon = SeedImg;
            let color = "green";

            if (pkg.code === "bud") {
              icon = BuffImg;
              color = "blue";
            } else if (pkg.code === "leaf") {
              icon = LeafImg;
              color = "yellow";
            }

            const discount = calculateDiscount(baseMonthlyPrice, pkg.price, pkg.durationMonths);

            // Define styles based on color theme
            const colorStylesMap: Record<
              string,
              {
                bg: string;
                border: string;
                title: string;
                btn: "green" | "blue" | "orange";
                glow: string;
                darkBorder: string;
              }
            > = {
              green: {
                bg: "bg-gradient-to-b from-[#E8F5E9] to-[#C8E6C9]",
                border: "border-[#4CAF50]",
                title: "text-[#2E7D32]",
                btn: "green",
                glow: "shadow-[0_0_30px_rgba(76,175,80,0.3)]",
                darkBorder: "border-[#388E3C]",
              },
              blue: {
                bg: "bg-gradient-to-b from-[#E3F2FD] to-[#BBDEFB]",
                border: "border-[#2196F3]",
                title: "text-[#1565C0]",
                btn: "blue",
                glow: "shadow-[0_0_30px_rgba(33,150,243,0.3)]",
                darkBorder: "border-[#1976D2]",
              },
              yellow: {
                bg: "bg-gradient-to-b from-[#FFFDE7] to-[#FFF9C4]",
                border: "border-[#FFC107]",
                title: "text-[#F57F17]",
                btn: "orange",
                glow: "shadow-[0_0_30px_rgba(255,193,7,0.3)]",
                darkBorder: "border-[#FFA000]",
              },
            };
            const colorStyles = colorStylesMap[color] || colorStylesMap.green;

            return (
              <div
                key={pkg.id}
                className={`
                  relative flex flex-col items-center p-6 rounded-[32px] border-4 
                  ${colorStyles.bg} ${colorStyles.border} 
                  hover:-translate-y-2 transition-transform duration-300
                  shadow-xl ${colorStyles.glow}
                `}
              >
                {color === "yellow" && (
                  <>
                    <div className="absolute top-4 right-4 text-yellow-400 text-xl animate-pulse">✨</div>
                    <div className="absolute top-10 left-4 text-yellow-400 text-lg animate-pulse delay-75">✨</div>
                  </>
                )}

                {discount && (
                  <div className="absolute -top-4 -right-2 bg-red-500 text-white font-black px-3 py-1 rounded-full shadow-md z-10 transform rotate-6 border-2 border-white animate-bounce-subtle">
                    -{discount}%
                  </div>
                )}

                {/* Title */}
                <h3 className={`text-3xl font-extrabold mb-2 ${colorStyles.title}`}>{pkg.name}</h3>

                {/* Description */}
                {pkg.description && (
                  <p className="text-center text-gray-600 font-semibold text-sm mb-4 px-2 min-h-[40px]">
                    {pkg.description}
                  </p>
                )}

                <div className="w-32 h-32 mb-6 flex items-center justify-center drop-shadow-md">
                  <Image src={icon} alt={pkg.name} width={128} height={128} />
                </div>

                {/* Pricing Info */}
                <div className="w-full bg-white/60 rounded-xl p-3 mb-4 text-center backdrop-blur-sm">
                  <span className="text-gray-500 font-bold block text-sm mb-1">
                    {pkg.durationMonths === 12 ? "1 năm" : `${pkg.durationMonths} tháng`}
                  </span>
                  <div className="flex items-center justify-center gap-1">
                    <span className={`text-2xl font-black ${colorStyles.title.replace("text-", "text-opacity-80 ")}`}>
                      {(pkg.price / 1000).toLocaleString("vi-VN")}
                    </span>
                    <span className="text-gray-600 font-bold text-sm">nghìn VND</span>
                  </div>
                </div>

                {/* Action Button */}
                <UpgradeActionButton 
                  planCode={pkg.code} 
                  priceFormatted={pkg.price.toLocaleString("vi-VN")}
                  colorDef={colorStyles.btn}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
