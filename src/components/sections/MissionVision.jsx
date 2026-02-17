import { motion } from "framer-motion";

export default function MissionVision() {
    return (
        <>
            {/* Structured Editorial Section */}
            <section className="py-32 px-6">
                <div className="mx-auto max-w-[1400px]">
                {/* Top Area */}
                <div className="mb-24">
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                    >
                    {/* Small uppercase label */}
                    <p className="text-sm tracking-[0.2em] uppercase text-gray-500 mb-8 font-medium">
                        Purpose & Direction
                    </p>

                    {/* Large refined heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-gray-900 mb-12 tracking-tight">
                        Our Mission and Vision
                    </h1>

                    {/* Thin horizontal divider */}
                    <div className="w-24 h-[2px] bg-[#06b6d4]/20 mx-auto"></div>
                    </motion.div>
                </div>

                {/* Horizontal Split Narrative Layout */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 relative">
                    {/* Subtle center divider */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

                    {/* Left Column — Mission */}
                    <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                    >
                    {/* Large decorative background typography */}
                    <div className="absolute -top-12 -right-15 select-none pointer-events-none overflow-hidden">
                        <span className="text-[120px] lg:text-[160px] font-bold text-gradi-500 leading-none block opacity-20">
                        MISSION
                        </span>
                    </div>

                    {/* Content */}
                    <div className="relative pt-24 lg:pt-32">
                        {/* Title with accent */}
                        <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-12 bg-[#22c55e]"></div>
                        <h2 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
                            Mission
                        </h2>
                        </div>

                        {/* Editorial paragraph */}
                        <div className="space-y-6 text-gray-700 leading-relaxed max-w-xl">
                        <p className="text-lg lg:text-xl">
                            To empower businesses worldwide with cutting-edge technology solutions that streamline operations, enhance productivity, and drive sustainable growth.
                        </p>
                        <p className="text-base lg:text-lg text-gray-600">
                            We deliver innovation that transforms challenges into opportunities, ensuring our clients stay ahead in an ever-evolving digital landscape.
                        </p>
                        </div>
                    </div>
                    </motion.div>

                    {/* Right Column — Vision */}
                    <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                    >
                    {/* Large decorative background typography - positioned differently */}
                    <div className="absolute -top-2 -right-4 select-none pointer-events-none overflow-hidden">
                        <span className="text-[120px] lg:text-[160px] font-bold text-gradi-500 leading-none block opacity-20">
                        VISION
                        </span>
                    </div>

                    {/* Content - slightly offset for visual rhythm */}
                    <div className="relative pt-32 lg:pt-40">
                        {/* Title with accent line */}
                        <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-12 bg-[#14b8a6]"></div>
                        <h2 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
                            Vision
                        </h2>
                        </div>

                        {/* Editorial paragraph */}
                        <div className="space-y-6 text-gray-700 leading-relaxed max-w-xl">
                        <p className="text-lg lg:text-xl">
                            To be the global leader in transformative technology, creating a future where every organization has access to enterprise-grade tools that unlock their full potential.
                        </p>
                        <p className="text-base lg:text-lg text-gray-600">
                            We envision a world where technology serves as the foundation for unprecedented innovation, efficiency, and human progress.
                        </p>
                        </div>
                    </div>
                    </motion.div>
                </div>

                {/* Supporting Micro-Values Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-32 pt-16 border-t border-gray-200"
                >
                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs tracking-[0.25em] uppercase text-gray-500 font-medium">
                    <span>Innovation</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
                    <span>Integrity</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
                    <span>Growth</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
                    <span>Excellence</span>
                    </div>
                </motion.div>
                </div>
            </section>
        </>
    );
}