import React, { useEffect } from 'react';

// Fixed background glow that sits under content. The glow is small and moves
// instantly with the cursor (no delay/lerp), making the cursor area brighter.
export const BackgroundGlow: React.FC = () => {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const root = document.documentElement;
      root.style.setProperty('--glow-x', `${e.clientX}px`);
      root.style.setProperty('--glow-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* small, immediate glow exactly at the cursor position */}
      <div
        className="h-full w-full"
        style={{
          background:
            'radial-gradient(204px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,255,255,0.12), transparent 65%)',
        }}
      />
    </div>
  );
};

export default BackgroundGlow;
