/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Lock, ShieldCheck, X, KeyRound, AlertCircle } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { useLanguage } from "../context/LanguageContext";

export default function AdminLoginModal() {
  const { isLoginModalOpen, closeLoginModal, loginAdmin, isAdmin, logoutAdmin } = useAdmin();
  const { language } = useLanguage();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError(language === "ko" ? "비밀번호를 입력해주세요." : "Please enter the passcode.");
      return;
    }

    const success = loginAdmin(password);
    if (success) {
      setPassword("");
      setError("");
    } else {
      setError(language === "ko" ? "마스터 비밀번호가 올바르지 않습니다." : "Invalid master passcode.");
    }
  };

  return (
    <div
      id="admin-login-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-sm animate-fadeIn"
      onClick={closeLoginModal}
    >
      <div
        id="admin-login-modal-card"
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-military-600/30 border border-military-500/40 flex items-center justify-center text-military-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">
                {language === "ko" ? "수원지관산업 관리자 인증" : "Suwon Paper Cone Admin Auth"}
              </h3>
              <p className="text-xs text-slate-400 font-light">
                {language === "ko" ? "기사 등록·제품 재고·발주 통합 관제" : "Article & Stock Master Management Console"}
              </p>
            </div>
          </div>
          <button
            id="admin-login-close-btn"
            onClick={closeLoginModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {isAdmin ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">
                  {language === "ko" ? "현재 관리자 모드로 로그인되어 있습니다." : "Currently logged in as Administrator."}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {language === "ko"
                    ? "페이지를 이동하거나 새로고침해도 관리자 상태가 계속 유지됩니다."
                    : "Admin privileges are maintained across all tabs and page reloads."}
                </p>
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  id="admin-logout-action-btn"
                  onClick={() => {
                    logoutAdmin();
                    closeLoginModal();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs transition border border-red-200"
                >
                  {language === "ko" ? "관리자 로그아웃" : "Logout Admin"}
                </button>
                <button
                  id="admin-close-modal-btn"
                  onClick={closeLoginModal}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gray-900 text-white hover:bg-gray-800 font-bold text-xs transition"
                >
                  {language === "ko" ? "콘솔 닫기" : "Close"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-2">
                <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  {language === "ko"
                    ? "관리자 인증 후에는 기사 작성/수정, 제품 재고 등록/수정, 상담 발주 처리 등이 전 페이지에서 즉시 활성화됩니다."
                    : "Once authenticated, editing news articles, stock products, and order inquiries will be unlocked site-wide."}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-gray-500" />
                  {language === "ko" ? "마스터 비밀번호" : "Master Passcode"}
                </label>
                <input
                  id="admin-login-passcode-input"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder={language === "ko" ? "관리자 비밀번호를 입력하세요" : "Enter passcode"}
                  autoFocus
                  className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-military-500 focus:border-transparent transition"
                />
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  id="admin-login-cancel-btn"
                  type="button"
                  onClick={closeLoginModal}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-xs transition"
                >
                  {language === "ko" ? "취소" : "Cancel"}
                </button>
                <button
                  id="admin-login-submit-btn"
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-military-600 hover:bg-military-700 text-white font-bold text-xs shadow-md shadow-military-600/20 transition flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {language === "ko" ? "관리자 로그인" : "Authorize"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
