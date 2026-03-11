import { Zap, Shield, TrendingUp, Users } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Rapid Innovation',
    description: 'Deploy solutions faster with streamlined workflows and modern architecture.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance standards built into every layer.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Growth',
    description: 'Infrastructure that grows with your business needs seamlessly.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Tools designed for modern teams to work together efficiently.',
  },
];

export default function StatsOrganic2() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Left Side - Hero Typography Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-medium text-gray-900 mb-6 leading-tight">
              Building the Future of Enterprise Technology
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-base lg:text-lg" style={{ lineHeight: '1.7' }}>
                We deliver cutting-edge technology solutions that transform how businesses operate, scale, and compete in the digital economy. Our platform combines innovation with reliability to create lasting value for enterprises worldwide.
              </p>
              <p className="text-base lg:text-lg" style={{ lineHeight: '1.7' }}>
                With a focus on security, performance, and user experience, we empower organizations to achieve their most ambitious goals while maintaining the flexibility to adapt to tomorrows challenges.
              </p>
            </div>
          </div>

          {/* Center - Geometric Illustration */}
          <div className="lg:col-span-3 hidden lg:flex items-center justify-center relative">
            <svg
              className="w-full h-full max-w-[280px]"
              viewBox="0 0 280 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="280" height="400" fill="url(#grid)" />

              {/* Geometric shapes */}
              <circle cx="140" cy="120" r="60" stroke="#22c55e" strokeWidth="1.5" fill="none" opacity="0.4" />
              <circle cx="140" cy="120" r="40" stroke="#06b6d4" strokeWidth="1.5" fill="none" opacity="0.3" />

              <rect x="100" y="200" width="80" height="80" stroke="#14b88f" strokeWidth="1.5" fill="none" opacity="0.4" />
              <line x1="70" y1="320" x2="210" y2="320" stroke="#22c55e" strokeWidth="1.5" opacity="0.3" />

              <polygon points="140,300 120,340 160,340" stroke="#06b6d4" strokeWidth="1.5" fill="none" opacity="0.4" />

              {/* Connecting lines */}
              <line x1="140" y1="180" x2="140" y2="200" stroke="#14b88f" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
              <line x1="140" y1="280" x2="140" y2="300" stroke="#22c55e" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Right Side - Content */}
          <div className="lg:col-span-4 bg-[#f5f7f9] p-10 lg:p-12 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-gray-500 mb-8 uppercase">
              About the Company
            </p>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] text-gray-900 mb-6">
              Technology<br />
              That<br />
              <span className="bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Empowers</span><br />
              Growth
            </h1>
            <div className="w-24 h-[2px] bg-[#14b88f]" />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-200 mb-16" />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex gap-4 lg:gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-sm border border-gray-200 flex items-center justify-center group-hover:border-[#14b88f] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#14b88f]" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
