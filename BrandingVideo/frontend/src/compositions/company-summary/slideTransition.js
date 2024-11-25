import { loadImage } from 'canvas';
import { interpolateKeyframes } from '../../utils/interpolateKeyframes.js';

export async function slideTransition(
  context,
  width,
  height,
  time,
  duration,
  scene2Bg,
  addBlackLayer = false
) {
  if (time < 0 || time > duration) return;

  if (time > 0.25) {
    // Clear the canvas with a white background color. This is required as we are reusing the canvas with every frame
    // context.fillStyle = '#ffffff';
    // context.fillRect(0, 0, width, height);
    const background = await loadImage(`assets/company-summary/${scene2Bg}`);
    context.drawImage(background, 0, 0, width, height);
  }

  if (addBlackLayer) {
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, width, height);
  }

  context.fillStyle = '#5670FB';

  const t = interpolateKeyframes(
    [
      { time: 0, value: 0 },
      { time: 0.25, value: width, easing: 'cubic-in-out' },
      { time: 0.5, value: 0 },
    ],
    time
  );

  context.fillRect(time < 0.25 ? 0 : width - t, 0, t, height);
}
