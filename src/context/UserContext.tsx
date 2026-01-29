"use client";

import { createClient } from "@/libs/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getSubscriptionStatusAction } from "@/libs/actions/user";
import Loading from "@/components/common/Loading";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  showMissingInfoModal: boolean;
  setShowMissingInfoModal: (show: boolean) => void;
  checkMissingInfo: () => Promise<void>;
  isPremium: boolean;
  refreshSubscription: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMissingInfoModal, setShowMissingInfoModal] = useState(false);
  const supabase = createClient();

  const refreshSubscription = async () => {
    try {
      const status = await getSubscriptionStatusAction();
      setIsPremium(status);
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      setIsPremium(false);
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
          setUser(session.user);
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
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        showMissingInfoModal,
        setShowMissingInfoModal,
        checkMissingInfo,
        isPremium,
        refreshSubscription,
        handleLogout,
      }}
    >
      {isLoading ? <Loading /> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
