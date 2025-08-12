import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  style?: React.CSSProperties;
  className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 100, style, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(prev => prev + text.charAt(currentIndex));
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, text, speed]);

  const formattedText = displayedText.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < displayedText.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <p className={`typing-effect ${className || ''}`} style={style}>
      {formattedText}
    </p>
  );
};

export default TypingEffect;