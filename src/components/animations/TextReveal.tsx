"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";

const containerVariants = (staggerDelay: number, initialDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 15,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: CSSProperties;
  staggerDelay?: number;
  delay?: number;
}

export default function TextReveal({
  text,
  as: Tag = "p",
  className,
  style,
  staggerDelay = 0.04,
  delay = 0,
}: TextRevealProps) {
  const MotionTag = motion.create(Tag);
  const words = text.split(" ");

  return (
    <MotionTag
      variants={containerVariants(staggerDelay, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
      style={style}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}
