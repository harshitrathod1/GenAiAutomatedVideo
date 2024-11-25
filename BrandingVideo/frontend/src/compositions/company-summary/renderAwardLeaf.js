import { loadImage } from 'canvas';
import { interpolateKeyframes } from '../../utils/interpolateKeyframes.js';

export async function renderAwardLeaf(
  context,
  time,
  xCordinate,
  yCordinate,
  image
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

  const leaf = await loadImage(`assets/company-summary/${image}`);
  context.drawImage(leaf, xCordinate, yCordinate, 628, 222);

  context.restore();
}
