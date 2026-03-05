"use client";

import { createClient } from "@/libs/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import { getSubscriptionDetailsAction } from "@/libs/actions/user";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  showMissingInfoModal: boolean;
  setShowMissingInfoModal: (show: boolean) => void;
  checkMissingInfo: () => Promise<void>;
  isPremium: boolean;
  premiumEndDate: Date | null;
  refreshSubscription: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [premiumEndDate, setPremiumEndDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMissingInfoModal, setShowMissingInfoModal] = useState(false);
  const supabaseRef = useRef(createClient());
  const supabase = supabaseRef.current;

  const refreshSubscription = async () => {
    try {
      const details = await getSubscriptionDetailsAction();
      setIsPremium(details.isPremium);
      setPremiumEndDate(details.endDate);
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      setIsPremium(false);
      setPremiumEndDate(null);
    }
  };

  const checkMissingInfo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      const { kidName, age, sex } = user.user_metadata || {};
      if (!kidName || !age || !sex) {
        setShowMissingInfoModal(true);
      } else {
        setShowMissingInfoModal(false);
      }
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      try {
        await checkMissingInfo();
      } catch (error) {
        console.error("Error checking user info:", error);
      } finally {
        setIsLoading(false);
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser((prev) => {
            if (
              prev?.id === session.user.id &&
              JSON.stringify(prev?.user_metadata) === JSON.stringify(session.user.user_metadata)
            ) {
              return prev;
            }
            return session.user;
          });
          // Check metadata on login
          const { kidName, age, sex } = session.user.user_metadata || {};
          if (!kidName || !age || !sex) {
            setShowMissingInfoModal(true);
          } else {
            setShowMissingInfoModal(false);
          }
          // Fetch fresh premium status on login
          refreshSubscription();
        } else {
          setUser(null);
          setShowMissingInfoModal(false);
        }
        setIsLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    initializeUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsPremium(false);
    setPremiumEndDate(null);
  };

  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      showMissingInfoModal,
      setShowMissingInfoModal,
      checkMissingInfo,
      isPremium,
      premiumEndDate,
      refreshSubscription,
      handleLogout,
    }),
    [user, isLoading, showMissingInfoModal, isPremium, premiumEndDate],
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
