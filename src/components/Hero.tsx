import { Carousel } from "./Carousel";

const IMAGENS = [
  "/editorial/inicio-1.jpg",
  "/editorial/inicio-2.jpg",
  "/editorial/inicio-3.jpg",
];

export function Hero() {
  return <Carousel imagens={IMAGENS} />;
}
