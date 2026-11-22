"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type Photo = { src: string; alt: string };

/**
 * Galeria controlada por quem está vendo: nada troca sozinho (autoplay
 * atrapalha leitura e leitor de tela). Todas as fotos ficam no HTML; só a
 * atual é exibida.
 */
export function MeetupGallery({ photos, label }: { photos: Photo[]; label: string }) {
  const [index, setIndex] = useState(0);
  const total = photos.length;
  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <div role="group" aria-roledescription="galeria" aria-label={label} className="relative border-b border-line bg-panel">
      <div className="relative aspect-[3/2] overflow-hidden">
        {photos.map((photo, i) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={960}
            height={640}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            hidden={i !== index}
            className="h-full w-full object-cover"
          />
        ))}
      </div>

      {total > 1 ? (
        <div className="flex items-center justify-between gap-3 border-t border-line px-3 py-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className="inline-flex size-10 cursor-pointer items-center justify-center text-muted transition-colors hover:text-white"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <p className="font-mono text-meta text-muted" aria-live="polite">
            {index + 1} de {total}
          </p>
          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex size-10 cursor-pointer items-center justify-center text-muted transition-colors hover:text-white"
            aria-label="Próxima foto"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
