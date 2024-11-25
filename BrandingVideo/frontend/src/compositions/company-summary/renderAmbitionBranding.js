import { loadImage } from 'canvas';
import { interpolateKeyframes } from '../../utils/interpolateKeyframes.js';

export async function renderAmbitionBranding(
  context,
  width,
  time,
  isFadeInEffect = false
) {
  const ambitionboxLogo = await loadImage(
    'assets/company-summary/ambitionbox-logo.png'
  );

  const opacity = interpolateKeyframes(
    [
      { time: 0, value: 0 }, // Start fully transparent
      { time: 1.5, value: 1 }, // End fully opaque
    ],
    time
  );

  if (isFadeInEffect) {
    context.save();
    context.globalAlpha = opacity;
  }

  const logoWidth = 454;
  const logoHeight = 126;

  context.drawImage(
    ambitionboxLogo,
    (width - logoWidth) / 2,
    1694,
    logoWidth,
    logoHeight
  );

  if (isFadeInEffect) {
    context.restore();
  }
}
