import React from 'react'
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import Magnetic from '../Magnetic';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Index({ children, backgroundColor = "#455CE9", onClick, href, ...attributes }) {

  const circle = useRef(null);
  let timeline = useRef(null);
  let timeoutId = null;

  const [isExpanding, setIsExpanding] = useState(false);
  const [btnRect, setBtnRect] = useState(null);
  const router = useRouter();

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true })
      .to(circle.current, { top: "-25%", width: "150%", duration: 0.5, ease: "sine.out" }, "enter")
      .to(circle.current, { top: "-150%", width: "125%", duration: 0.5 }, "exit")
  }, [])

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId)
    timeline.current.tweenFromTo('enter', 'exit');
  }

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current.play();
    }, 300)
  }

  const handleClick = (e) => {
    // Only expand animate if href is provided
    if (href) {
      const rect = e.currentTarget.getBoundingClientRect();
      setBtnRect(rect);
      setIsExpanding(true);
      return;
    }
    // Otherwise just call normal onClick
    if (onClick) onClick(e);
  }

  const maxDim = typeof window !== 'undefined'
    ? Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 2
    : 3000;

  const btnSize = btnRect ? btnRect.width : 150;
  const targetScale = maxDim * 2 / btnSize;

  return (
    <>
      {isExpanding && btnRect && (
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: targetScale }}
          transition={{ duration: 1.3, ease: [0.76, 0.66, 0.24, 1] }}
          onAnimationComplete={() => router.push(href)}
          style={{
            position: 'fixed',
            borderRadius: '50%',
            backgroundColor,
            pointerEvents: 'none',
            zIndex: 9999,
            width: btnSize,
            height: btnSize,
            top: btnRect.top + btnRect.height / 2 - btnSize / 2,
            left: btnRect.left + btnRect.width / 2 - btnSize / 2,
            transformOrigin: 'center center',
          }}
        />
      )}

      <Magnetic>
        <div
          className={styles.roundedButton}
          style={{ overflow: "hidden" }}
          onMouseEnter={manageMouseEnter}
          onMouseLeave={manageMouseLeave}
          onClick={handleClick}
          {...attributes}
        >
          {children}
          <div ref={circle} style={{ backgroundColor }} className={styles.circle} />
        </div>
      </Magnetic>
    </>
  )
}