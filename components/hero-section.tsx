export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="text-white max-w-2xl">
            <h1 className="text-6xl font-bold mb-4 text-balance">SOFTWARE</h1>
            <h2 className="text-6xl font-bold mb-6 text-balance">ENGINEERING</h2>
            <p className="text-xl text-white/90 mb-8 text-pretty">สาขาวิศวกรรมซอฟต์แวร์</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-orange-600">
              <svg className="w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="30" cy="30" r="15" />
                <circle cx="70" cy="30" r="10" />
                <circle cx="50" cy="70" r="12" />
                <path d="M30 30 L70 30 L50 70 Z" fillOpacity="0.3" />
              </svg>
            </div>
            <div className="text-red-600">
              <svg className="w-40 h-40" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="20" />
                <circle cx="25" cy="25" r="8" />
                <circle cx="75" cy="25" r="8" />
                <circle cx="25" cy="75" r="8" />
                <circle cx="75" cy="75" r="8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
