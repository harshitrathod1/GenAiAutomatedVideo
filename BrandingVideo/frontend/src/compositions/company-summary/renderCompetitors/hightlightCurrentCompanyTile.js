import { interpolateKeyframes } from '../../../utils/interpolateKeyframes.js';
import { drawRoundedRect } from '../../../utils/drawRoundedRect.js';

export async function hightlightCurrentCompanyTile(context, time, xCordinate, yCordinate) {
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

  context.shadowColor = 'rgba(0, 0, 0, 0.4)';
  context.shadowBlur = 32;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 4;

  drawRoundedRect(
    context,
    xCordinate,
    yCordinate,
    840,
    200,
    20
  );

  context.restore();
}
