import Image from "next/image";
import { Linkedin, Mail, Star, Github } from 'lucide-react';
import { useSettings } from "@/app/Context/SettingsContext";


export default function Teams({teams, data}) {
  const teamData = data?.teamsList;
  const {settings} = useSettings();

    return(
        <>
            <section id="teams" className="py-24 bg-background ">
                <div className="w-[75%] mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Our Team</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamData?.map((team, index) => (
                            <TeamMemberCard key={index}
                                name={team.name}
                                role={team.designation}
                                image={`${settings?.backend_api_url}/${team.image}`}
                                linkedin={team.social_link.linkedin}
                                github={team.social_link.github}
                                email={team.social_link.email}
                                isLeader={team.designation_flag}
                                description={team.description}
                                gradient=""
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

function TeamMemberCard({name, role, image, linkedin, github, email, isLeader, gradient, description }) {
    return (
    <div className="group relative h-full">
      {/* Glow effect on hover */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient || 'from-[#22c55e] to-[#06b6d4]'} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />
      
      <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
        {/* Top decorative element */}
        {/* <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient || 'from-[#22c55e] to-[#06b6d4]'}`} /> */}
        
        {/* Leader badge */}
        {isLeader && (
          <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#22c55e] to-[#14b8a6] text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-semibold">Leadership</span>
          </div>
        )}
        
        {/* Image container with gradient overlay */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={200}
            height={250}
            className="w-full h-full object-cover group-hover:scale-110 group-hover:blur-sm transition-all duration-700 ease-out"
          />
          <div style={{top:"50%", left:"50%", width:"80%", transform:"translate(-50%, -50%)"}} className="absolute rounded-2xl p-3 mb-4 opacity-0 group-hover:opacity-100 z-10 transition-all duration-700 ease-out">
            <p className="text-white font-bold text-md">{description}</p>
          </div>
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-black/40 to-transparent opacity-60 group-hover:opacity-80  group-hover:bg-gradient-to-t group-hover:from-black/40 group-hover:via-black/60 group-hover:to-transparent transition-opacity duration-300`} />
          
          {/* Animated gradient border on image */}
          {/* <div className={`absolute inset-0 bg-gradient-to-br ${gradient || 'from-[#22c55e]/20 to-[#06b6d4]/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} /> */}
        </div>
        
        {/* Content section */}
        <div className="relative p-6 -mt-20 z-10">
          {/* Name and role with glassmorphism background */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-gray-200 shadow-lg mb-4 group-hover:bg-white/95 group-hover:shadow-xl transition-all duration-300">
            <h3 className="text-gray-900 mb-2 font-bold text-2xl">{name}</h3>
            <div className="flex items-center gap-2">
              <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${gradient || 'from-[#22c55e] to-[#06b6d4]'}`} />
                <p className="text-gray-600 text-sm">{role}</p>
            </div>
          </div>
          
          {/* Social links with enhanced styling */}
          <div className="flex gap-3 justify-center">
            {linkedin && (
              <a
                href={linkedin}
                className="group/link relative w-11 h-11 rounded-xl bg-gray-50 border border-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-blue-500" />
              </a>
            //   <a
            //     href={linkedin}
            //     className="group/link relative w-11 h-11 rounded-xl bg-gray-50 hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-500 border border-gray-200 hover:border-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
            //     aria-label="LinkedIn"
            //   >
            //     <Linkedin className="w-5 h-5 text-gray-700 group-hover/link:text-white transition-colors" />
            //   </a>
            )}
            {github && (
              <a
                href={github}
                className="group/link relative w-11 h-11 rounded-xl bg-gray-50 border border-black flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-black/30"
                aria-label="Github"
              >
                <Github className="w-5 h-5 text-black" />
              </a>
            //   <a
            //     href={github}
            //     className="group/link relative w-11 h-11 rounded-xl bg-gray-50 hover:bg-gradient-to-br hover:from-[#06b6d4] hover:to-[#14b8a6] border border-gray-200 hover:border-[#06b6d4] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#06b6d4]/30"
            //     aria-label="Github"
            //   >
            //     <Github className="w-5 h-5 text-gray-700 group-hover/link:text-white transition-colors" />
            //   </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="group/link relative w-11 h-11 rounded-xl bg-gray-50 border border-red-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/30"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-red-500" />
              </a>
            //   <a
            //     href={`mailto:${email}`}
            //     className="group/link relative w-11 h-11 rounded-xl bg-gray-50 hover:bg-gradient-to-br hover:from-[#22c55e] hover:to-[#14b8a6] border border-gray-200 hover:border-[#22c55e] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#22c55e]/30"
            //     aria-label="Email"
            //   >
            //     <Mail className="w-5 h-5 text-gray-700 group-hover/link:text-white transition-colors" />
            //   </a>
            )}
          </div>
        </div>
        
        {/* Decorative corner elements */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradient || 'from-[#22c55e]/40 to-transparent'} rounded-bl-full`} />
        <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr ${gradient || 'from-[#06b6d4]/40 to-transparent'} rounded-tr-full`} />
      </div>
    </div>
  );
}