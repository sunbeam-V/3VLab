'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LOGO_IMAGES } from './logo-assets';

// ----- Конфигурация элементов (без изменений) -----
const elements = [
  { id: 'img1', x: 94, y: 69, delay: 0.1, from: 'left', magnet: { x: -4, y: -8 } },
  { id: 'img3', x: 219, y: 197, delay: 0.25, from: 'right', magnet: { x: -13, y: -14 } },
  { id: 'img2', x: 65, y: 181, delay: 0.4, from: 'bottom', magnet: { x: 0, y: -14 } },
  { id: 'img4', x: 21, y: 179, delay: 0.55, from: 'left', magnet: { x: 10, y: -10 } },
  { id: 'img6', x: 44, y: 63, delay: 0.7, from: 'left', magnet: { x: 6, y: -4 } },
  { id: 'img5', x: 125, y: 25, delay: 0.85, from: 'top', magnet: { x: 0, y: 8 } },
];

const getDirection = (from: string) => {
  switch (from) {
    case 'left': return { x: -80, y: 0 };
    case 'right': return { x: 80, y: 0 };
    case 'top': return { x: 0, y: -80 };
    case 'bottom': return { x: 0, y: 80 };
    default: return { x: 0, y: 0 };
  }
};

const letters = '3VLab'.split('');
const V_INDEX = 1;

// ----- Варианты для появления элементов логотипа -----
const itemVariants = {
  hidden: (el: { from: string }) => ({
    opacity: 0,
    x: getDirection(el.from).x,
    y: getDirection(el.from).y,
    rotate: el.from === 'left' ? -10 : el.from === 'right' ? 10 : 0,
    filter: 'brightness(0.3)',
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    filter: 'brightness(1)',
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 15,
    },
  },
};

// ----- Анимация магнита -----
const magnetAnimation = {
  initial: { scale: 1, x: 0, y: 0 },
  magnet: (magnet: { x: number; y: number }) => ({
    scale: [1, 1, 0.92, 1.04, 1],
    x: [0, 0, magnet.x, 0, 0],
    y: [0, 0, magnet.y, 0, 0],
    transition: {
      duration: 1.0,
      ease: 'easeInOut' as const,
      times: [0, 0.2, 0.4, 0.6, 1],
    },
  }),
};

export default function Logo() {
  const controls = useAnimation();
  const [isVBig, setIsVBig] = useState(false);

  // Запускаем магнит при загрузке
  useEffect(() => {
    controls.start('magnet');
  }, [controls]);

  // ----- Периодическое увеличение буквы V -----
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const scheduleVEnlarge = () => {
      // Случайная задержка перед следующим увеличением (2–5 сек)
      const delay = 2000 + Math.random() * 3000;
      timeoutId = setTimeout(() => {
        // Включаем увеличение
        setIsVBig(true);

        // Через 0.6 сек возвращаем в нормальное состояние
        setTimeout(() => {
          setIsVBig(false);
          // Планируем следующее увеличение
          scheduleVEnlarge();
        }, 600);
      }, delay);
    };

    // Первое увеличение через 1.5 секунды после появления текста
    const initialTimeout = setTimeout(() => {
      scheduleVEnlarge();
    }, 1500);

    return () => {
      clearTimeout(initialTimeout);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleHoverStart = () => {
    controls.start('magnet');
  };

  return (
    <motion.div
      className="relative flex items-center justify-between gap-2"
      whileTap={{ scale: 0.95 }}
      style={{ textDecoration: 'none' }}
      onHoverStart={handleHoverStart}
    >
      {/* Ореол (без изменений) */}
      <motion.div
        className="absolute -inset-6 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
          filter: 'blur(24px)',
          opacity: 0.2,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
        whileHover={{
          rotate: 360,
          scale: 1.3,
          opacity: 0.5,
          transition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Основной SVG (без изменений) */}
      <motion.svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 270 257"
        width="45"
        height="45"
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <defs>
          <image width="131" height="129" id="img1" href={LOGO_IMAGES.img1} />
          <image width="137" height="49" id="img2" href={LOGO_IMAGES.img2} />
          <image width="32" height="31" id="img3" href={LOGO_IMAGES.img3} />
          <image width="32" height="32" id="img4" href={LOGO_IMAGES.img4} />
          <image width="33" height="34" id="img5" href={LOGO_IMAGES.img5} />
          <image width="95" height="111" id="img6" href={LOGO_IMAGES.img6} />
        </defs>

        <motion.g
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {elements.map((el) => (
            <motion.g key={el.id} custom={el} variants={itemVariants}>
              <motion.g
                custom={el.magnet}
                variants={magnetAnimation}
                initial="initial"
                animate={controls}
              >
                <use href={`#${el.id}`} x={el.x} y={el.y} />
              </motion.g>
            </motion.g>
          ))}
        </motion.g>
      </motion.svg>

      {/* 
        Текст с градиентом.
        Появляется с задержкой (эффект печати).
        Буква V периодически увеличивается в размере (scale: 1.15) на 0.6 сек.
      */}
      <span
        className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] bg-clip-text text-transparent"
        style={{ textDecoration: 'none' }}
      >
        {letters.map((char, i) => {
          const isV = i === V_INDEX;
          return (
            <motion.span
              key={i}
              style={{ display: 'inline-block', textDecoration: 'none' }}
              initial={{ opacity: 0, y: 10, rotateX: 30 }}
              animate={
                isV && isVBig
                  ? {
                    scale: 1.15,
                    // Легкое смещение вверх для эффекта "всплытия"
                    y: -2,
                    rotateX: 0,
                    opacity: 1,
                  }
                  : {
                    scale: 1,
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                  }
              }
              transition={
                isV && isVBig
                  ? {
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                  }
                  : {
                    delay: 0.9 + i * 0.08,
                    duration: 0.3,
                    type: 'spring',
                    stiffness: 150,
                  }
              }
            >
              {char}
            </motion.span>
          );
        })}
      </span>
    </motion.div>
  );
}