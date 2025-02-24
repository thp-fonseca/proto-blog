import HeroImage from "@/components/hero-image"
import AuthSection from "@/components/auth-section"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-zinc-900">
      <div className="w-full lg:w-1/2 h-screen">
        <HeroImage />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <AuthSection />
      </div>
    </div>
  )
}