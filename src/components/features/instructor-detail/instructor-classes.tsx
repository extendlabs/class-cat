import { Badge } from "@/components/ui/badge";
import { Star, Clock, CaretRight } from "@phosphor-icons/react";
import { AnimateIn } from "@/components/ui/animate-in";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Activity } from "@/types/activity";

export function InstructorClasses({ classes }: { classes: Activity[] }) {
  return (
    <AnimateIn delay={300} className="mt-16">
      <div>
        <span className="uppercase tracking-widest text-coral font-bold text-xs mb-2 block">
          Teaching
        </span>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
          Active Classes
        </h3>
        <div className="space-y-4">
          {classes.map((cls) => (
            <Link
              key={cls.id}
              href={`/activity/${cls.id}`}
              className="group bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:border-coral/20 transition-all"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                <Image
                  src={cls.image}
                  alt={cls.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="128px"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge
                    variant="secondary"
                    className="bg-coral/10 text-coral border-coral/20 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                  >
                    {cls.price === "$$$" ? "Advanced" : cls.price === "$$" ? "Intermediate" : "Beginner"}
                  </Badge>
                  {cls.timeSlots?.[0] && (
                    <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                      <Clock size={10} />
                      {cls.timeSlots[0]}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-coral transition-colors">
                  {cls.title}
                </h4>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={14} weight="fill" className="text-coral" />
                    <span className="text-xs font-bold text-gray-900">
                      {cls.rating}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      ({cls.reviewCount})
                    </span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    ${cls.priceAmount}
                    <span className="text-[10px] text-gray-400 font-normal">
                      {" "}/ class
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex items-center">
                <CaretRight size={18} className="text-gray-300 group-hover:text-coral transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
