'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function About() {
  const router = useRouter();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Fade out the blue overlay that came from home page
    const overlayEl = overlayRef.current;

    gsap.fromTo(overlayEl,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
        onComplete: () => {
          gsap.set(overlayEl, { display: 'none' });
        }
      }
    );

    // Fade in content
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <>
      {/* This catches the blue overlay color when page loads */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#455CE9',
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      />

      <div
        ref={contentRef}
        style={{ padding: '120px 10%', opacity: 0 }}
      >
        <button
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: '1px solid #000',
            borderRadius: '999px',
            padding: '12px 28px',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ← Back
        </button>

        <h1 style={{ fontSize: '4vw', fontWeight: 500, marginBottom: '2rem' }}>
          About Me
        </h1>

        <p style={{ fontSize: '1.2rem', maxWidth: '600px', lineHeight: 1.8, color: '#555' }}>
          Your about me content here...
        </p>
      </div>
    </>
  )
}
