"use client"

import { cn } from "@workspace/ui/lib/utils"
import { useSelectedLayoutSegment } from "next/navigation"
import type { ComponentProps } from "react"
import { Link } from "@/i18n/routing"

export default function NavigationLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/"
  const isActive = pathname === href

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-block px-3 py-2 transition-colors rounded-md font-medium",
        isActive
          ? "bg-primary/30 text-primary-foreground"
          : "text-gray-200 hover:bg-primary/10 hover:text-primary-foreground",
      )}
      href={href}
      {...rest}
    />
  )
}
