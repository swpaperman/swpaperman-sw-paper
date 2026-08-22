/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";

const DEFAULT_ADMIN_PASSCODE = "swpaper7638**";
const ADMIN_AUTH_KEY = "suwon_admin_auth";
const ADMIN_PASSCODE_KEY = "suwon_admin_passcode";

interface AdminContextType {
  isAdmin: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  changeMasterPasscode: (newPass: string) => boolean;
  masterPasscode: string;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  notification: string | null;
  showAdminNotification: (msg: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  // Check localStorage first, fallback to sessionStorage
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(ADMIN_AUTH_KEY);
      if (stored === "true") return true;
      const session = sessionStorage.getItem(ADMIN_AUTH_KEY);
      return session === "true";
    } catch {
      return false;
    }
  });

  const [masterPasscode, setMasterPasscode] = useState<string>(() => {
    try {
      return localStorage.getItem(ADMIN_PASSCODE_KEY) || DEFAULT_ADMIN_PASSCODE;
    } catch {
      return DEFAULT_ADMIN_PASSCODE;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Synchronize state across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ADMIN_AUTH_KEY) {
        setIsAdmin(e.newValue === "true");
      } else if (e.key === ADMIN_PASSCODE_KEY && e.newValue) {
        setMasterPasscode(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const showAdminNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const loginAdmin = (enteredPass: string): boolean => {
    const currentPass = localStorage.getItem(ADMIN_PASSCODE_KEY) || DEFAULT_ADMIN_PASSCODE;
    if (enteredPass.trim() === currentPass.trim()) {
      setIsAdmin(true);
      try {
        localStorage.setItem(ADMIN_AUTH_KEY, "true");
        sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
      } catch (err) {
        console.warn("Storage error on login:", err);
      }
      setIsLoginModalOpen(false);
      showAdminNotification("사이트 관리자 모드가 활성화되었습니다. 모든 페이지에서 관리자 권한이 유지됩니다.");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch (err) {
      console.warn("Storage error on logout:", err);
    }
    showAdminNotification("관리자 모드에서 안전하게 로그아웃되었습니다.");
  };

  const changeMasterPasscode = (newPass: string): boolean => {
    if (!newPass || newPass.trim().length < 4) return false;
    try {
      const trimmed = newPass.trim();
      localStorage.setItem(ADMIN_PASSCODE_KEY, trimmed);
      setMasterPasscode(trimmed);
      showAdminNotification("관리자 마스터 비밀번호가 성공적으로 변경되었습니다.");
      return true;
    } catch (err) {
      console.error("Failed to update passcode:", err);
      return false;
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        loginAdmin,
        logoutAdmin,
        changeMasterPasscode,
        masterPasscode,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        notification,
        showAdminNotification
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
