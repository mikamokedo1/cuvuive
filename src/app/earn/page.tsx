"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { ActionButton } from "@/components/common/ActionButton";
import {
  getOrCreateReferralCode,
  getReferralStats,
  getReferralHistory,
  requestWithdrawal,
  getWithdrawalHistory,
} from "@/libs/actions/referral";
import {
  Copy,
  Check,
  Users,
  Crown,
  Wallet,
  ArrowRight,
  Banknote,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Share2,
  Gift,
} from "lucide-react";
import { toast } from "react-hot-toast";

const owlHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";
const WITHDRAWAL_MIN = 100_000;

function formatVND(amount: number): string {
  return amount.toLocaleString("vi-VN") + " ₫";
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    pending: { label: "Chờ mua", color: "bg-amber-100 text-amber-700", icon: <Clock className="w-3 h-3" /> },
    confirmed: {
      label: "Đã xác nhận",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    processing: {
      label: "Đang xử lý",
      color: "bg-blue-100 text-blue-700",
      icon: <Loader2 className="w-3 h-3 animate-spin" />,
    },
    completed: {
      label: "Hoàn thành",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    rejected: { label: "Từ chối", color: "bg-red-100 text-red-700", icon: <XCircle className="w-3 h-3" /> },
  };

  const c = config[status] || config.pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${c.color}`}>
      {c.icon}
      {c.label}
    </span>
  );
}

// Withdrawal Modal
function WithdrawalModal({
  isOpen,
  onClose,
  maxAmount,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  maxAmount: number;
  onSubmit: (data: { amount: number; bankName: string; bankAccount: string; bankAccountName: string }) => void;
}) {
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ amount: maxAmount, bankName, bankAccount, bankAccountName });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Banknote className="w-6 h-6 text-emerald-500" />
          Yêu cầu rút tiền
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Số tiền rút: <span className="font-bold text-emerald-600">{formatVND(maxAmount)}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Tên ngân hàng</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="VD: Vietcombank, MB Bank..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all font-medium"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Số tài khoản</label>
            <input
              type="text"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              placeholder="Nhập số tài khoản"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all font-medium"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Tên chủ tài khoản</label>
            <input
              type="text"
              value={bankAccountName}
              onChange={(e) => setBankAccountName(e.target.value)}
              placeholder="VD: NGUYEN VAN A"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all font-medium uppercase"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <ActionButton
              type="submit"
              variant="glossy"
              color="green"
              className="flex-1 py-3 text-base"
              disabled={loading || !bankName || !bankAccount || !bankAccountName}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Xác nhận"}
            </ActionButton>
          </div>
        </form>
      </div>
    </div>
  );
}

// Premium CTA for non-premium users
function PremiumGate() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-3xl shadow-xl p-10 border-4 border-white/50">
        <Image
          src={owlHi}
          alt="Owl Mascot"
          width={160}
          height={160}
          className="mx-auto mb-6 drop-shadow-lg animate-bounce-subtle"
        />

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 font-[family-name:var(--font-baloo-2)]">
          Kiếm tiền cùng{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
            Cú Thông Minh
          </span>
        </h1>

        <p className="text-gray-500 font-medium text-lg mb-4 max-w-md mx-auto">
          Giới thiệu bạn bè và nhận <span className="text-emerald-600 font-bold">hoa hồng 10%</span> trên đơn hàng đầu
          tiên!
        </p>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
          <div className="bg-emerald-50 rounded-2xl p-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
              <Share2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="font-bold text-sm text-gray-700">1. Chia sẻ link</p>
            <p className="text-xs text-gray-500">Gửi link giới thiệu cho bạn bè</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="font-bold text-sm text-gray-700">2. Bạn bè đăng ký</p>
            <p className="text-xs text-gray-500">Họ tạo tài khoản và nâng cấp</p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-2">
              <Gift className="w-5 h-5 text-amber-600" />
            </div>
            <p className="font-bold text-sm text-gray-700">3. Nhận hoa hồng</p>
            <p className="text-xs text-gray-500">Bạn nhận 10% đơn hàng đầu tiên</p>
          </div>
        </div>

        <Link href="/upgrade">
          <ActionButton variant="glossy" color="orange" className="px-10 py-4 text-lg">
            <Gift className="w-5 h-5 mr-2" />
            Nâng cấp để tham gia
            <ArrowRight className="w-5 h-5 ml-2" />
          </ActionButton>
        </Link>

        <p className="text-xs text-gray-400 mt-3 font-medium">Yêu cầu tài khoản Premium để tạo link giới thiệu</p>
      </div>
    </div>
  );
}

// Main Dashboard for premium users
function EarnDashboard() {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    totalReferred: 0,
    totalConverted: 0,
    totalCommission: 0,
    availableBalance: 0,
    totalWithdrawn: 0,
    pendingWithdrawal: 0,
    commissionPercent: 10,
  });
  const [history, setHistory] = useState<
    Array<{
      id: string;
      referredEmail: string;
      status: string;
      commissionRate: number | null;
      commissionAmount: number | null;
      createdAt: Date | null;
    }>
  >([]);
  const [withdrawalHistory, setWithdrawalHistory] = useState<
    Array<{
      id: string;
      amount: number;
      status: string;
      bankName: string;
      createdAt: Date | null;
      note: string | null;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [codeResult, statsResult, historyResult, withdrawalsResult] = await Promise.all([
        getOrCreateReferralCode(),
        getReferralStats(),
        getReferralHistory(),
        getWithdrawalHistory(),
      ]);

      if (codeResult.code) setReferralCode(codeResult.code);
      setStats(statsResult);
      setHistory(historyResult);
      setWithdrawalHistory(withdrawalsResult);
    } catch (error) {
      console.error("Error loading referral data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const referralLink = referralCode ? `https://cuthongminh.com?ref=${referralCode}` : "";

  const handleCopy = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Đã copy link giới thiệu!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Không thể copy, vui lòng copy thủ công");
    }
  };

  const handleWithdrawal = async (data: {
    amount: number;
    bankName: string;
    bankAccount: string;
    bankAccountName: string;
  }) => {
    const result = await requestWithdrawal(data.amount, data.bankName, data.bankAccount, data.bankAccountName);
    if (result.success) {
      toast.success("Yêu cầu rút tiền đã được gửi!");
      setShowWithdrawalModal(false);
      await loadData(); // Refresh data
    } else {
      const errorMessages: Record<string, string> = {
        insufficient_balance: "Số dư không đủ để rút",
        amount_exceeds_balance: "Số tiền rút vượt số dư",
        below_minimum: "Chưa đạt mức tối thiểu 100,000 ₫",
        missing_bank_info: "Vui lòng điền đầy đủ thông tin ngân hàng",
        pending_withdrawal_exists: "Bạn đã có yêu cầu rút tiền đang chờ xử lý",
      };
      toast.error(errorMessages[result.error || ""] || "Đã xảy ra lỗi, thử lại sau");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  const commissionRate = stats.commissionPercent;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 font-[family-name:var(--font-baloo-2)]">
          💰 Kiếm tiền
        </h1>
        <p className="text-gray-500 font-medium">
          Hoa hồng <span className="text-emerald-600 font-bold">{commissionRate}%</span> đơn hàng đầu tiên
        </p>
      </div>

      {/* Referral Link */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-emerald-100">
        <h2 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-emerald-500" />
          Link giới thiệu của bạn
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 text-gray-700 font-mono text-sm font-medium truncate"
          />
          <button
            onClick={handleCopy}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              copied ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Đã copy" : "Copy"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-md p-5 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-800">{stats.totalReferred}</p>
          <p className="text-xs font-bold text-gray-400">Đã giới thiệu</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
              <Crown className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-800">{stats.totalConverted}</p>
          <p className="text-xs font-bold text-gray-400">Đã mua Premium</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border border-emerald-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <Banknote className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-800">{formatVND(stats.totalCommission)}</p>
          <p className="text-xs font-bold text-gray-400">Tổng hoa hồng</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border border-amber-100 relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <Wallet className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-800">{formatVND(stats.availableBalance)}</p>
          <p className="text-xs font-bold text-gray-400">Số dư khả dụng</p>
        </div>

        {stats.pendingWithdrawal > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-5 border border-orange-100 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-orange-600">{formatVND(stats.pendingWithdrawal)}</p>
            <p className="text-xs font-bold text-gray-400">Chờ thanh toán</p>
          </div>
        )}
      </div>

      {/* Withdraw Button */}
      {stats.availableBalance >= WITHDRAWAL_MIN && (
        <div className="flex justify-center">
          <ActionButton
            variant="glossy"
            color="green"
            className="px-8 py-4 text-lg"
            onClick={() => setShowWithdrawalModal(true)}
          >
            <Banknote className="w-5 h-5 mr-2" />
            Rút tiền ({formatVND(stats.availableBalance)})
          </ActionButton>
        </div>
      )}

      {stats.availableBalance > 0 && stats.availableBalance < WITHDRAWAL_MIN && (
        <p className="text-center text-sm text-gray-400 font-medium">
          Tích lũy đủ <span className="font-bold text-emerald-600">{formatVND(WITHDRAWAL_MIN)}</span> để rút tiền (còn
          thiếu {formatVND(WITHDRAWAL_MIN - stats.availableBalance)})
        </p>
      )}

      {/* Referral History */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          Lịch sử giới thiệu
        </h2>

        {history.length === 0 ? (
          <p className="text-center text-gray-400 font-medium py-8">
            Chưa có ai đăng ký qua link của bạn. Hãy chia sẻ link ngay!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 font-bold border-b border-gray-100">
                  <th className="py-2 px-2">Email</th>
                  <th className="py-2 px-2">Trạng thái</th>
                  <th className="py-2 px-2">Hoa hồng</th>
                  <th className="py-2 px-2 hidden sm:table-cell">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium text-gray-700">{item.referredEmail}</td>
                    <td className="py-3 px-2">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3 px-2 font-bold text-emerald-600">
                      {item.commissionAmount ? formatVND(item.commissionAmount) : "-"}
                    </td>
                    <td className="py-3 px-2 text-gray-400 hidden sm:table-cell">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString("vi-VN") : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Withdrawal History */}
      {withdrawalHistory.length > 0 && (
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-amber-500" />
            Lịch sử rút tiền
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 font-bold border-b border-gray-100">
                  <th className="py-2 px-2">Số tiền</th>
                  <th className="py-2 px-2">Ngân hàng</th>
                  <th className="py-2 px-2">Trạng thái</th>
                  <th className="py-2 px-2 hidden sm:table-cell">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalHistory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-2 font-bold text-gray-700">{formatVND(item.amount)}</td>
                    <td className="py-3 px-2 text-gray-600 font-medium">{item.bankName}</td>
                    <td className="py-3 px-2">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3 px-2 text-gray-400 hidden sm:table-cell">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString("vi-VN") : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
        maxAmount={stats.availableBalance}
        onSubmit={handleWithdrawal}
      />
    </div>
  );
}

// Main Page
export default function EarnPage() {
  const { user, isLoading, isPremium } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!user || !isPremium) {
    return <PremiumGate />;
  }

  return <EarnDashboard />;
}
