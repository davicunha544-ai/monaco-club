import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Fundos escuros
        ink: "#0A0A0A", // preto
        midnight: "#0E1116", // azul-quase-preto (hero / header / footer)
        // Off-white "papel" e bordas suaves
        bone: "#F5F3EF",
        mist: "#E7E4DD",
        // Único acento da marca: vermelho profundo (usado com parcimônia)
        bordo: {
          DEFAULT: "#7A1320",
          deep: "#5E0E18",
        },
      },
      fontFamily: {
        // Títulos: serifa elegante e fluida
        display: ["var(--font-display)", "Raleway", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.2em",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
