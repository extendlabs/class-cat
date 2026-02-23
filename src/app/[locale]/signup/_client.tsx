"use client";

import { useReducer } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { GoogleLogo, AppleLogo } from "@phosphor-icons/react";
import { Navbar } from "@/components/layout/navbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { AnimateIn } from "@/components/ui/animate-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

type SignupState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
  isSubmitting: boolean;
};

type SignupAction =
  | { type: "SET_FIELD"; field: "name" | "email" | "password" | "confirmPassword"; value: string }
  | { type: "SET_ERROR"; error: string }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean };

const initialSignupState: SignupState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: "",
  isSubmitting: false,
};

function signupReducer(state: SignupState, action: SignupAction): SignupState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.isSubmitting };
  }
}

export default function PageContent() {
  const t = useTranslations("auth");
  const router = useRouter();
  const { signup } = useAuth();
  const [state, dispatch] = useReducer(signupReducer, initialSignupState);
  const { name, email, password, confirmPassword, error, isSubmitting } = state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_ERROR", error: "" });

    if (!name || !email || !password || !confirmPassword) {
      dispatch({ type: "SET_ERROR", error: t("fillAllFields") });
      return;
    }

    if (password.length < 8) {
      dispatch({ type: "SET_ERROR", error: t("passwordTooShort") });
      return;
    }

    if (password !== confirmPassword) {
      dispatch({ type: "SET_ERROR", error: t("passwordsMismatch") });
      return;
    }

    dispatch({ type: "SET_SUBMITTING", isSubmitting: true });
    try {
      await signup(name, email, password);
      router.push("/profile");
    } catch (err) {
      dispatch({ type: "SET_ERROR", error: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12 pb-24 md:pb-12">
        <AnimateIn className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-[var(--shadow-soft)] p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <Image
                src="/logo-cat.png"
                alt="ClassCat"
                width={64}
                height={64}
                className="mb-3"
              />
              <h1 className="text-2xl font-bold text-gray-900">
                {t("createAccount")}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {t("joinClassCat")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("fullName")}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t("namePlaceholder")}
                  value={name}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("passwordMinLength")}
                  value={password}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })}
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder={t("confirmPasswordPlaceholder")}
                  value={confirmPassword}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "confirmPassword", value: e.target.value })}
                  autoComplete="new-password"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-coral hover:bg-coral-hover text-white rounded-xl font-medium"
              >
                {isSubmitting ? t("creatingAccount") : t("createAccountBtn")}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-400">
                  {t("orContinueWith")}
                </span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl font-medium"
              >
                <GoogleLogo size={18} weight="bold" />
                {t("google")}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl font-medium"
              >
                <AppleLogo size={18} weight="fill" />
                {t("apple")}
              </Button>
            </div>

            {/* Sign in link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              {t("alreadyHaveAccount")}{" "}
              <Link
                href="/login"
                className="text-coral hover:text-coral-hover font-medium transition-colors"
              >
                {t("signInLink")}
              </Link>
            </p>
          </div>
        </AnimateIn>
      </main>

      <BottomNav />
    </div>
  );
}
