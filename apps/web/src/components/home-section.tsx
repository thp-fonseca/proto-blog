import SocialButton from "./social-button"
import { Separator } from "@workspace/ui/components/separator"
import { Button } from "@workspace/ui/components/button"
import { useTranslations } from "next-intl"
import TermsLinks from "./terms-links"
import Link from "next/link"

export default function HomeSection() {
  const t = useTranslations("HomePage")
  return (
    <div className="w-full max-w-md space-y-6 bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">{t("happeningNow")}</h1>
        <h2 className="text-2xl font-semibold text-gray-300">{t("joinToday")}</h2>
      </div>

      <div className="space-y-4">
        <SocialButton
          icon={
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
          }
          text={t("signUpWithGoogle")}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="bg-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 text-gray-400">{t("or")}</span>
          </div>
        </div>

        <Link href="/auth/sign-up">
          <Button variant="default" className="w-full text-gray-100 border-gray-600 text-black hover:bg-gray-300">
            {t("createAccount")}
          </Button>
        </Link>

        <p className="text-xs text-gray-400">
          <TermsLinks t={t} />
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-100">{t("alreadyHaveAccount")}</h3>
        <Link href="/auth/sign-in">
          <Button variant="default" className="w-full border-gray-600 text-black hover:bg-gray-300">
            {t("signIn")}
          </Button>
        </Link>
      </div>
    </div>
  )
}
