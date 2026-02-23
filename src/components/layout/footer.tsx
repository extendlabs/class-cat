import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  FacebookLogo,
  InstagramLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("relative overflow-hidden mt-20 pt-16 pb-8 bg-secondary", className)}>
      {/* Decorative blurred shapes */}
      <div className="absolute -top-20 right-1/4 w-80 h-80 bg-coral/[0.05] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/6 w-64 h-64 bg-coral/[0.04] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link
              href="/"
              className="flex items-center gap-1.5 mb-6 group cursor-pointer"
            >
              <span className="text-2xl text-coral" style={{ fontFamily: 'var(--font-logo)' }}>
                ClassCat
              </span>
              <Image
                src="/logo-cat.png"
                alt="ClassCat logo"
                width={58}
                height={58}
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Wspieramy lokalne społeczności poprzez naukę i wspólne doświadczenia.
              Znajdź swoją nową pasję już dziś.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                rel="nofollow"
                aria-label="Facebook"
                className="w-9 h-9 bg-white/70 border border-coral/[0.08] rounded-full flex items-center justify-center text-gray-400 hover:bg-coral hover:text-white hover:border-coral transition-all duration-200"
              >
                <FacebookLogo size={18} />
              </a>
              <a
                href="#"
                rel="nofollow"
                aria-label="Instagram"
                className="w-9 h-9 bg-white/70 border border-coral/[0.08] rounded-full flex items-center justify-center text-gray-400 hover:bg-coral hover:text-white hover:border-coral transition-all duration-200"
              >
                <InstagramLogo size={18} />
              </a>
              <a
                href="#"
                rel="nofollow"
                aria-label="Email"
                className="w-9 h-9 bg-white/70 border border-coral/[0.08] rounded-full flex items-center justify-center text-gray-400 hover:bg-coral hover:text-white hover:border-coral transition-all duration-200"
              >
                <EnvelopeSimple size={18} />
              </a>
            </div>
          </div>

          {/* Odkrywaj */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Odkrywaj</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/bezpieczenstwo" className="hover:text-coral transition-colors">
                  Zaufanie i bezpieczeństwo
                </Link>
              </li>
              <li>
                <Link href="/karty-podarunkowe" className="hover:text-coral transition-colors">
                  Karty podarunkowe
                </Link>
              </li>
              <li>
                <Link href="/polecane" className="hover:text-coral transition-colors">
                  Polecane przez ClassCat
                </Link>
              </li>
              <li>
                <Link href="/aplikacja" className="hover:text-coral transition-colors">
                  Aplikacja mobilna
                </Link>
              </li>
            </ul>
          </div>

          {/* Dla prowadzących */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Dla prowadzących</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/dla-biznesu" className="hover:text-coral transition-colors">
                  Prowadź zajęcia
                </Link>
              </li>
              <li>
                <Link href="/zasoby" className="hover:text-coral transition-colors">
                  Zasoby dla prowadzących
                </Link>
              </li>
              <li>
                <Link href="/spolecznosc" className="hover:text-coral transition-colors">
                  Forum społeczności
                </Link>
              </li>
              <li>
                <Link href="/ubezpieczenie" className="hover:text-coral transition-colors">
                  Ubezpieczenie
                </Link>
              </li>
            </ul>
          </div>

          {/* Pomoc */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Pomoc</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/pomoc" className="hover:text-coral transition-colors">
                  Centrum pomocy
                </Link>
              </li>
              <li>
                <Link href="/anulowanie" className="hover:text-coral transition-colors">
                  Opcje anulowania
                </Link>
              </li>
              <li>
                <Link href="/bezpieczenstwo-informacje" className="hover:text-coral transition-colors">
                  Informacje o bezpieczeństwie
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-coral transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-coral/[0.08] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            &copy; 2026 ClassCat. Wszelkie prawa zastrzeżone.
          </div>
          <div className="flex gap-6 text-sm text-gray-500 font-medium">
            <Link href="/polityka-prywatnosci" className="hover:text-gray-900 transition-colors">
              Prywatność
            </Link>
            <Link href="/regulamin" className="hover:text-gray-900 transition-colors">
              Regulamin
            </Link>
            <Link href="/sitemap.xml" className="hover:text-gray-900 transition-colors">
              Mapa strony
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
