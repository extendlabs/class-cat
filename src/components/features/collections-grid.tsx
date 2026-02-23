"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Baby,
  Backpack,
  Users,
  Briefcase,
  ShieldCheck,
  GraduationCap,
  ChatCircleText,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

interface CollectionCard {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  classCount: number;
  icon: Icon;
  accent: string;
}

const collections: CollectionCard[] = [
  {
    title: "Kids",
    subtitle: "Ages 3\u201310",
    description: "Playful learning experiences that spark curiosity and creativity.",
    classCount: 124,
    icon: Baby,
    accent: "from-amber-400 to-orange-400",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDVLt_uh2VcKJ8dF5pT18GVwNuYx0WzynBhUQKUDKdJghuiEds4kcBekazB945Q5yxPhqMP_23Ssc1nDH026clTGMrYx1RAbxxIy2Z277LgJdIZGHKXMibsilAT4gMefX8zN321qX8DWBV32la6KDm7iizwBNEFuXiIkc8BCgDaKjwgXU5vFQK-osyt7jucFvTmg4JRauLmjVg08iqp79Q3q_9TTfysOMDxvntNlpwYqA76ExFO4pRIF1zBbpaGbHr4iwj-qLAm28kH",
  },
  {
    title: "Youth",
    subtitle: "Ages 11\u201317",
    description: "Build independence and discover new passions through hands-on classes.",
    classCount: 98,
    icon: Backpack,
    accent: "from-coral to-coral-hover",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIs3--FhNP-np2Mn2wiayZ87ctqrTTo_Hm8VX_PST0Albw4jdBFfhWVvjDE_RDNBadVm0vc4Kt6ps_e9gvsqz28sq8f9gBWN1wBjZVUAeoQosKpATmnRMJtSWjEtYpp6vhZJPcje1uwOX306Wx3GZkMjixoRd6TpWhF6klD3-lWd0qu7SdwOgiBOPRRMY2GwNFKgbQPE4qS_CEl7fT7m8TzS0RS55upUczPmBWCYOTtewgY6u4lSmlqE5uVCbxm4JZQYZt3AAFSmyD",
  },
  {
    title: "Families",
    subtitle: "All Ages",
    description: "Create lasting memories with activities the whole family enjoys.",
    classCount: 76,
    icon: Users,
    accent: "from-teal-400 to-emerald-400",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtpg4bmnzXbxm5HLEtGV2VP8NPdG33pgs5EaVxXCrhNRz8faVuWR66-klwan5Z8kD395GXXvRRuU2O3Nn74esQjOr9OEDofKdQW9QOZN7r2R7gSD6DmZ4EDCJK5O-APLieBhuD50sOj17Rlh0iPIeYbmcl1z7PuBrMmBgEDftQz2Jtr_Nj-7zj608ZLba5PbKnxB4AcZqZlzVSZ0jhOClyUy1tTu1mYjqA3n2ifI6VkEnkuXe80mRVzN_LfHiw4-1pEWec3S3JdZI_",
  },
  {
    title: "Adults",
    subtitle: "18+",
    description:
      "Master a new skill, advance your career, or rediscover an old passion with expert-led courses.",
    classCount: 215,
    icon: Briefcase,
    accent: "from-violet-400 to-indigo-400",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8CKbRjPR2edcwnQeqyYLcKNLg9QKI7TST6mV-MabhrEtdwg-2iUoE2_P2ou2BlYQsXN3yC1wN2UAkZiTB892AAmLY48KMhS8eGyNz_sEAaK6a_XO9tKdPsx1nkxvWtpE1ho2ujYyMFXV5Ts0kXrf_o_ff-xW4vW5XQTiGfjwcMeNJKfm0kR4bFbU771X5dykq6DGb0F7V4YFrd8KoLWiGlGwrqhMOwZBFM8YLg5wGju2E-VGPW_X604DGh2h-A25yCJfDC7ygt6BN",
  },
];

function CollectionCardItem({ col, className }: { col: CollectionCard; className?: string }) {
  const Icon = col.icon;
  return (
    <Link
      href="/?tab=all"
      className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 flex flex-col ${className ?? ""}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">

        <Image
          alt={col.title}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          src={col.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Icon badge */}
        <div className={`absolute top-4 left-4 w-9 h-9 rounded-xl bg-gradient-to-br ${col.accent} flex items-center justify-center text-white shadow-sm`}>
          <Icon size={18} weight="fill" />
        </div>
        {/* Class count */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          {col.classCount} classes
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-baseline gap-2 mb-1.5">
          <h3 className="font-bold text-gray-900 text-lg tracking-tight group-hover:text-coral transition-colors">
            {col.title}
          </h3>
          <span className="text-xs font-medium text-gray-400">{col.subtitle}</span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">
          {col.description}
        </p>
        <div className="mt-4 flex items-center text-coral font-semibold text-sm">
          Browse activities
          <ArrowRight
            size={14}
            className="ml-1.5 group-hover:translate-x-1 transition-transform duration-200"
          />
        </div>
      </div>
    </Link>
  );
}

export function CollectionsGrid() {
  return (
    <section>
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <span className="uppercase tracking-widest text-coral font-bold text-xs mb-2 block">
          Curated Collections
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight text-wrap-balance">
          Find your perfect fit
        </h2>
        <p className="text-gray-500 mt-3">
          Tailored learning experiences for every age and stage of life.
        </p>
      </div>

      {/* Bento grid — 2 cols top, featured bottom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {collections.map((col) => (
          <CollectionCardItem key={col.title} col={col} />
        ))}
      </div>

      {/* Trust Bar */}
      <div className="mt-14 pt-10 border-t border-gray-200/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TrustItem
            icon={ShieldCheck}
            title="Secure Booking"
            description="Guaranteed safe payment & data protection."
          />
          <TrustItem
            icon={GraduationCap}
            title="Verified Instructors"
            description="Every teacher is vetted for quality & safety."
          />
          <TrustItem
            icon={ChatCircleText}
            title="Real Reviews"
            description="Trusted feedback from our community."
          />
        </div>
      </div>
    </section>
  );
}

function TrustItem({ icon: Icon, title, description }: { icon: Icon; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-coral/8 rounded-xl flex items-center justify-center text-coral flex-shrink-0">
        <Icon size={20} weight="duotone" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
        <p className="text-gray-500 text-sm mt-0.5">{description}</p>
      </div>
    </div>
  );
}
