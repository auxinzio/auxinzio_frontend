import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/app/Context/SettingsContext";

export default function ServiceSection({service}) {
  const {settings} = useSettings();
  const serviceData = service?.data?.serviceList || [];

    return(
        <>
        { service && serviceData.length > 0 && (
            <section id="services" className="py-24 bg-muted/30">
              <div className="container px-4 md:px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16 space-y-4"
                >
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
                  <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
                    Comprehensive digital solutions tailored to your unique business needs.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceData?.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col p-6 rounded-xl bg-background hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="mb-4 overflow-hidden">
                        <Image 
                              src={`${settings.backend_api_url}/${service.main_logo}`} 
                              alt={service.title} 
                              width={500}
                              height={500}
                              className="group-hover:scale-110 transition-all duration-300"
                          />
                      </div>
                      <h3 className="text-xl font-bold mb-2 transition-colors">{service.title}</h3>
                      {/* <p className="text-muted-foreground flex-grow">{service.description.short_description}</p> */}
                      <Link href={`/services/${service.slug}`}>
                      <div className="mt-4 pt-4 border-t border-border flex items-center text-gradi-500 font-medium text-sm group-hover:translate-x-1 transition-transform cursor-pointer">
                        Learn More <ArrowRight size={15} className="ms-2 mt-1 text-green-500"/>
                      </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
        ) }
        </>
    )
}
    