"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { useRef, useEffect, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import Magnetic from "../../common/Magnetic";
import Link from "next/link";

export default function Index() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  // IMPORTANT:
  // Start with null so server and client render the same HTML.
  const [time, setTime] = useState(null);

  useEffect(() => {
    // Set the time only after the component mounts in the browser.
    const updateTime = () => {
      setTime(new Date());
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      <div className={styles.body}>
        {/* =========================
            TITLE
        ========================= */}

        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image fill alt="image" src="/images/profile.jpg" />
            </div>

            <h2>Let&#39;s work</h2>
          </span>

          <h2>together</h2>

          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Rounded backgroundColor="#334BD3" className={styles.button}>
              <p>Get in touch</p>
            </Rounded>
          </motion.div>

          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.646447L1.35355 0.646447L0.646447 0.646447Z"
              fill="white"
            />
          </motion.svg>
        </div>

        {/* =========================
            CONTACT DETAILS
        ========================= */}

        <div className={styles.nav}>
          <Rounded>
            <p>Sidharththakurmailbox@gmail.com</p>
          </Rounded>

          <Rounded>
            <p>+91-821-980-5546</p>
          </Rounded>
        </div>

        {/* =========================
            FOOTER INFO
        ========================= */}

        <div className={styles.info}>
          <div>
            <span>
              <h3>VERSION</h3>
              <p>2024 © Edition</p>
            </span>

            <span>
              <h3>LOCAL TIMES</h3>

              <p>
                {time
                  ? time.toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "--/--/----, --:-- --"}
              </p>
            </span>
          </div>

          {/* =========================
              SOCIALS
          ========================= */}

          <div>
            <span>
              <h3>SOCIALS</h3>

              <Link
                href="https://www.linkedin.com/in/sidharth-thakur-104a481b3/"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Magnetic>
                  <p>LinkedIn</p>
                </Magnetic>
              </Link>
            </span>

            <Link
              href="https://www.instagram.com/sidthakur.1/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Magnetic>
                <p>Instagram</p>
              </Magnetic>
            </Link>

            <Link
              href="https://twitter.com/Sidthakur_1"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Magnetic>
                <p>X</p>
              </Magnetic>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
