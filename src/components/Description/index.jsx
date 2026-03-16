'use client';
import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
import { useRouter } from 'next/navigation';

export default function Index() {
  const phrase = "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";
  const description = useRef(null);
  const isInView = useInView(description);
  const router = useRouter();

  const handleAboutClick = () => {
    // Save current scroll position before leaving
    sessionStorage.setItem('scrollPos', window.scrollY);
    router.push('/about');
  };

  useEffect(() => {
    // Restore scroll position when coming back
    const scrollPos = sessionStorage.getItem('scrollPos');
    if (scrollPos) {
      window.scrollTo(0, parseInt(scrollPos));
      sessionStorage.removeItem('scrollPos');
    }
  }, []);

  return (
    <div ref={description} className={styles.description}>
      <div className={styles.body}>
        <p>
          {
            phrase.split(" ").map((word, index) => {
              return (
                <span key={index} className={styles.mask}>
                  <motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>
                    {word}
                  </motion.span>
                </span>
              )
            })
          }
        </p>
        <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
          The combination of my passion for design, code & interaction positions me in a unique place in the web design world.
        </motion.p>
        <div data-scroll data-scroll-speed={0.1}>
          <Rounded className={styles.button} href="/about">
            <p>About me</p>
          </Rounded>
        </div>
      </div>
    </div>
  )
}