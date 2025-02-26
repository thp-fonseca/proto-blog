"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useFormState } from "@/hooks/use-form-state";
import { signInWithEmailAndPassword } from "./actions";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const t = useTranslations("AuthForm");

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      router.push("/feed");
    }
  );

  return (
    <div className="flex items-center justify-center p-4 lg:p-8">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {t("signInTitle")}
          </CardTitle>
          <CardDescription>{t("signInDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {success === false && message && (
              <Alert variant="destructive">
                <AlertTriangle className="size-4" />
                <AlertTitle>{t("signInFailed")}</AlertTitle>
                <AlertDescription>
                  <p>{message}</p>
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">{t("emailLabel")}</Label>
              <Input
                id="email"
                placeholder={t("emailPlaceholder")}
                type="email"
                name="username"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required
              />
              {errors?.email && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.email[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("passwordLabel")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-1/4 transform -translate-y-1/2 px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? t("hidePassword") : t("showPassword")}
                  </span>
                </Button>
                {errors?.password && (
                  <p className="text-xs font-medium text-red-500 dark:text-red-400">
                    {errors.password[0]}
                  </p>
                )}
                <div className="mt-2">
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-medium text-foreground hover:underline"
                  >
                    {t("forgotPassword")}
                  </Link>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full text-gray-100 bg-gray-900 hover:bg-gray-700"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                t("signInButton")
              )}
            </Button>
            <Button className="w-full" variant="link" asChild>
              <Link href="/auth/sign-up">{t("createAccount")}</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
