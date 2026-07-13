"use client";

import { useEffect, useState } from "react";

// Muda a versão pra forçar a animação a reaparecer numa nova sessão.
const KEY = "monaco-intro-v1";

/**
 * Véu de abertura: a logo (assinatura à mão) surge da esquerda pra direita,
 * como tinta sendo escrita, com uma ponta de caneta acompanhando. Depois
 * o véu esmaece e revela o site. Roda uma vez por sessão do navegador.
 */
export function IntroSignature() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      // sessionStorage indisponível — mostra mesmo assim.
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShow(true);

    const tLeave = window.setTimeout(() => setLeaving(true), reduce ? 250 : 3800);
    const tEnd = window.setTimeout(() => setShow(false), reduce ? 700 : 4700);
    return () => {
      window.clearTimeout(tLeave);
      window.clearTimeout(tEnd);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`intro${leaving ? " intro--leaving" : ""}`} aria-hidden="true">
      <div className="intro__wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-monaco-white.png" alt="" className="intro__logo" />
        <span className="intro__nib" />
      </div>

      <style jsx>{`
        .intro {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: grid;
          place-items: center;
          background: #0e1116;
          opacity: 1;
          visibility: visible;
          transition: opacity 0.85s ease, visibility 0.85s ease;
        }
        .intro--leaving {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        .intro__wrap {
          position: relative;
          width: min(74vw, 340px);
          aspect-ratio: 3 / 1;
          clip-path: inset(0 100% 0 0);
          animation: intro-write 3.2s cubic-bezier(0.62, 0.04, 0.3, 1) 0.35s forwards;
        }
        .intro__logo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .intro__nib {
          position: absolute;
          top: 14%;
          bottom: 14%;
          left: 0;
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(245, 243, 239, 0.9),
            transparent
          );
          opacity: 0;
          filter: blur(0.4px);
          animation: intro-nib 3.2s cubic-bezier(0.62, 0.04, 0.3, 1) 0.35s forwards;
        }
        @keyframes intro-write {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0 0 0);
          }
        }
        @keyframes intro-nib {
          0% {
            left: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .intro__wrap {
            animation: none;
            clip-path: none;
          }
          .intro__nib {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
