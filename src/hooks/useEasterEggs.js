import { useEffect, useCallback, useRef } from 'react';

/**
 * Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
 * Triggers Matrix mode for 5 seconds.
 */
const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

export default function useEasterEggs() {
  const inputBuf = useRef([]);
  const _matrixTimer = useRef(null);

  /* ---- Konami Code ---- */
  const handleKey = useCallback((e) => {
    // Only track when not typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    inputBuf.current.push(e.code);
    if (inputBuf.current.length > KONAMI.length) {
      inputBuf.current.shift();
    }

    if (
      inputBuf.current.length === KONAMI.length &&
      inputBuf.current.every((k, i) => k === KONAMI[i])
    ) {
      inputBuf.current = [];
      triggerMatrixMode();
    }
  }, []);

  function triggerMatrixMode() {
    if (_matrixTimer.current) {
      clearTimeout(_matrixTimer.current);
      document.body.classList.remove('matrix-mode');
    }
    document.body.classList.add('matrix-mode');
    _matrixTimer.current = setTimeout(() => {
      document.body.classList.remove('matrix-mode');
      _matrixTimer.current = null;
    }, 5000);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      if (_matrixTimer.current) clearTimeout(_matrixTimer.current);
    };
  }, [handleKey]);

  return { triggerMatrixMode };
}
