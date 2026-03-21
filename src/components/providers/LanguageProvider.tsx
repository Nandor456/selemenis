"use client";
// components/providers/LanguageProvider.tsx
//
// Change from original: the initial locale is now resolved by priority:
//   1. `initialLocale` prop  (passed by the server layout/page from the cookie)
//   2. document.cookie       (client-side read, same value the server used)
//   3. localStorage          (legacy fallback)
//   4. DEFAULT_LOCALE
//
// This ensures the first render on the client matches what the server rendered,
// eliminating the hydration mismatch that caused the flicker / SSR loss.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  getTranslations,
  isLocale,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  locales: readonly Locale[];
  t: ReturnType<typeof getTranslations>;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
  /** Pass the server-resolved locale here from layout.tsx so the first render matches. */
  initialLocale?: Locale;
};

/** Read the locale cookie on the client (document.cookie). */
function readCookieLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
  const val = match?.[1];
  return val && isLocale(val) ? val : null;
}

export default function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: Props) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // During SSR this runs on the server — just use initialLocale.
    if (typeof window === "undefined") return initialLocale;

    // On the client, prefer cookie > localStorage > prop to stay consistent
    // with what the server rendered.
    return (
      readCookieLocale() ??
      ((): Locale => {
        const stored = window.localStorage.getItem("locale");
        return stored && isLocale(stored) ? stored : initialLocale;
      })()
    );
  });

  // Keep cookie, localStorage, and <html lang> in sync whenever locale changes.
  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("locale", locale);
    document.cookie = `locale=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      locales: SUPPORTED_LOCALES,
      t: getTranslations(locale),
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
