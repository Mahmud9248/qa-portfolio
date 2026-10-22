import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_CINEMATIC, motionTokens } from '../../lib/motion';
import { cx } from '../../lib/cx';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
  once?: boolean;
}

export function Reveal({ children, className, delay = 0, distance = 26, amount = 0.2, once = true }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: motionTokens.duration.slow, delay, ease: EASE_CINEMATIC }}
    >
      {children}
    </motion.div>
  );
}

interface LineRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}

export function LineReveal({ children, className, delay = 0, amount = 0.25 }: LineRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={cx('line-reveal', className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cx('line-reveal', className)}
      initial={{ clipPath: 'inset(0 0 105% 0)', y: 20 }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: motionTokens.duration.slow, delay, ease: EASE_CINEMATIC }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerGroup({ children, className, stagger = 0.08, delay = 0 }: StaggerGroupProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
}

export function StaggerItem({ children, className, y = 24 }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: motionTokens.duration.slow, ease: EASE_CINEMATIC },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
