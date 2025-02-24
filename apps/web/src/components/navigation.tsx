import { useTranslations } from "next-intl"
import LocaleSwitcher from "./locale-switcher"
import NavigationLink from "./navigation-link"

export default function Navigation() {
  const t = useTranslations("Navigation")

  return (
    <div className="bg-primary/70 shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="flex space-x-4">
          <NavigationLink href="/">{t("home")}</NavigationLink>
          {/* Add more navigation links here if needed */}
        </div>
        <LocaleSwitcher />
      </nav>
    </div>
  )
}
