"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => {
      mod.setWasmUrl("/dotlottie-player.wasm");
      return mod.DotLottieReact;
    }),
  { ssr: false }
);

type DotLottieProps = ComponentProps<typeof DotLottieReact>;

interface LottieAnimationProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function LottieAnimation({
  src,
  loop = true,
  autoplay = true,
  speed = 1,
  className,
  style,
}: LottieAnimationProps) {
  return (
    <DotLottieReact
      src={src}
      loop={loop}
      autoplay={autoplay}
      speed={speed}
      className={className}
      style={style}
    />
  );
}
