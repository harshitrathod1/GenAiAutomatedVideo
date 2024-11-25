import { loadImage } from 'canvas';
import { interpolateKeyframes } from '../../utils/interpolateKeyframes.js';

export async function renderAbeca(
  context,
  time,
  xCordinate,
  yCordinate,
) {
  if (time < 0) return;

  const opacity = interpolateKeyframes(
    [
      { time: 0, value: 0 }, // Start fully transparent
      { time: 1, value: 1 }, // End fully opaque
    ],
    time
  );

  context.save();

  context.globalAlpha = opacity;

  const trophy = await loadImage(`assets/company-summary/abeca-trophy-2024.png`);
  context.drawImage(trophy, xCordinate, yCordinate, 966, 493);

  context.restore();
}
