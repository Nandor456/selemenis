"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

function ImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <section>
      <p
        className="md:text-[60px] text-[20px] uppercase tracking-[5px] mt-5 mb-5 font-bold"
        style={{ color: "#08818d" }}
      >
        {t.carousel.title}
      </p>

      {/* Main slide */}
      <div
        className="relative w-full overflow-hidden bg-black"
        style={{ height: "720px" }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={`${name} - ${t.carousel.imageAlt} ${i + 1}`}
              fill
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label={t.carousel.prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-[#08818d] text-white p-2 transition-colors"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label={t.carousel.next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-[#08818d] text-white p-2 transition-colors"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-4 bg-black/60 text-white text-[10px] uppercase tracking-[3px] px-2.5 py-1 font-bold">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-px mt-px bg-[#ddd8d0]">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setCurrent(i)}
              className="relative flex-1 overflow-hidden transition-opacity"
              style={{ height: "72px", opacity: i === current ? 1 : 0.5 }}
              aria-label={`${t.carousel.goToImage} ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${name} ${t.carousel.thumbnailAlt} ${i + 1}`}
                fill
                quality={75}
                sizes="(max-width: 640px) 25vw, 15vw"
                className="object-cover"
              />
              {i === current && (
                <div className="absolute inset-0 ring-2 ring-inset ring-[#08818d]" />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default ImageCarousel;
