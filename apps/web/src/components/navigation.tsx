import { useTranslations } from "next-intl"
import LocaleSwitcher from "./locale-switcher"
import NavigationLink from "./navigation-link"
import { isAuthenticated } from "@/auth/auth"

export default async function Navigation() {
  const t = useTranslations("Navigation")
  const isAuth = await isAuthenticated()
  const href = isAuth ? "/feed": "/"
  return (
    <div className="bg-primary/70 shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="flex space-x-4">
          <NavigationLink href={href}>{t("home")}</NavigationLink>
          {/* Add more navigation links here if needed */}
        </div>
        <LocaleSwitcher />
      </nav>
    </div>
  )
}
