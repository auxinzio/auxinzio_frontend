export default function StatsSection({ stats }) {
    return(
        <>
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
                {/* Floating geometric shapes in background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 right-20 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#06b6d4]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    
                    {/* Geometric decorations */}
                    <div className="absolute top-1/4 left-1/4 w-20 h-20 border-4 border-[#14b88f]/20 rounded-2xl rotate-45" />
                    <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-[#22c55e]/10 rounded-full" />
                    <div className="absolute top-1/2 right-1/4 w-24 h-24 border-4 border-[#06b6d4]/20 rotate-12" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Creative Title with decorative elements */}
                    <div className="text-center mb-20 relative">
                    {/* Large background text */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <span className="text-[150px] font-bold text-gray-900">STATS</span>
                    </div>
                    
                    <div className="relative">
                        <div className="inline-flex items-center gap-3 mb-4">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#22c55e]" />
                        <span className="text-sm font-semibold text-[#14b88f] tracking-widest uppercase">Our Journey</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#06b6d4]" />
                        </div>
                        {/* <h2 className="text-6xl font-bold bg-gradient-to-r from-[#22c55e] via-[#14b88f] to-[#06b6d4] bg-clip-text text-transparent mb-4">
                        Numbers That Matter
                        </h2> */}
                        <h2 className="text-6xl font-bold mb-4">
                        Numbers That Matter
                        </h2>
                    </div>
                    </div>

                    {/* Asymmetric Bento Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 auto-rows-[240px]">
                    {stats.map((stat, index) => (
                        <div
                        key={index}
                        className={`group ${stat.position} relative`}
                        style={{ animationDelay: `${index * 150}ms` }}
                        >
                        {/* Floating effect shadow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500 transform group-hover:scale-110`} />
                        
                        {/* Main Card */}
                        <div className={`relative h-full bg-gradient-to-br backdrop-blur-[4px] ${stat.gradient} rounded-[2rem] p-8 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 shadow-2xl`}>
                            {/* Animated background pattern */}
                            <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex flex-col justify-between">
                            <div className="flex items-start justify-between">
                                {/* Icon with animated ring */}
                                <div className="relative">
                                <div className="absolute inset-0 bg-white/30 rounded-2xl blur-md animate-pulse" />
                                <div className="relative w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                                </div>
                                </div>

                                {/* Decorative dots */}
                                <div className="flex gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                                </div>
                            </div>

                            <div>
                                {/* Value with dramatic styling */}
                                <div className="mb-3 relative">
                                <span className="text-7xl font-black text-white drop-shadow-2xl block leading-none">
                                    {stat.value}
                                </span>
                                <div className="absolute -bottom-1 left-0 h-1 w-20 bg-white/50 rounded-full" />
                                </div>

                                {/* Label */}
                                <p className="text-white/95 font-medium text-base leading-snug">
                                {stat.label}
                                </p>
                            </div>
                            </div>

                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>

                    {/* Bottom decorative element */}
                    <div className="flex justify-center items-center gap-6 mt-16">
                    <div className="flex gap-2">
                        {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-[#22c55e] to-[#06b6d4]"
                            style={{
                            animation: 'pulse 2s infinite',
                            animationDelay: `${i * 0.2}s`
                            }}
                        />
                        ))}
                    </div>
                    </div>
                </div>
                </section>
        </>
    )
}