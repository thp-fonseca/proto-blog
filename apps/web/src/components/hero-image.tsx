import Image from "next/image"

export default function HeroImage() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 z-10" />
      <Image
        src="/assets/logos/vulture-logo.svg"
        alt="Vulture Logo"
        fill
        className="object-contain p-12 transition-transform duration-300 hover:scale-105"
        priority
      />
    </div>
  )
}

