"use client";

import { useState } from "react";
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

export default function PageContent() {
  const t = useTranslations("auth");
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("fillAllFields"));
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
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
              <h1 className="text-2xl font-bold text-gray-900">{t("welcomeBack")}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {t("signInToAccount")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("password")}</Label>
                  <button
                    type="button"
                    className="text-xs text-coral hover:text-coral-hover transition-colors"
                  >
                    {t("forgotPassword")}
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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
                {isSubmitting ? t("signingIn") : t("signIn")}
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

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              {t("noAccount")}{" "}
              <Link
                href="/signup"
                className="text-coral hover:text-coral-hover font-medium transition-colors"
              >
                {t("signUp")}
              </Link>
            </p>
          </div>
        </AnimateIn>
      </main>

      <BottomNav />
    </div>
  );
}
