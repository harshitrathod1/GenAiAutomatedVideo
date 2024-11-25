import { interpolateKeyframes } from '../utils/interpolateKeyframes.js';

export function renderTypewriterAnimationText(canvas, context, text, font, x, y, time) {
  if (time < 0) {
    return;
  }

  context.save();

  context.font = font;
  context.fillStyle = '#1E223C';

  // Measure the text dimensions
  const textMetrics = context.measureText(text);
  const fontHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

  // Calculate progress for revealing text
  const revealProgress = interpolateKeyframes([
    { time: 0, value: 1 },
    { time: 1, value: 0 },
  ], time);

  // Calculate the number of characters to reveal based on time
  const totalCharacters = text.length;
  const charactersToReveal = Math.floor(totalCharacters * (1 - revealProgress));

  // Render each character with progressively increasing opacity
  for (let i = 0; i < charactersToReveal; i++) {
    const char = text[i];

    // Calculate character position relative to the starting (x, y) position
    const charX = x + context.measureText(text.substring(0, i)).width;
    const charOpacity = Math.min(1, 1 - revealProgress * (i / totalCharacters + 0.1));

    context.globalAlpha = charOpacity;
    context.fillText(char, charX, y + fontHeight / 2);
  }

  context.restore();
}
