import { loadImage } from 'canvas';
import { interpolateKeyframes } from '../../utils/interpolateKeyframes.js';
import { ratingTag } from '../../utils/common.js';

export async function renderRatingCard(
  ratingValue,
  context,
  time,
  xCordinate,
  yCordinate
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

  const ratingCardSize = 200;
  const ratingCard = await loadImage(
    `assets/company-summary/${ratingTag(ratingValue)}.svg`
  );
  context.drawImage(
    ratingCard,
    xCordinate,
    yCordinate,
    ratingCardSize,
    ratingCardSize
  );

  context.font = '168px Figtree700';
  context.fillStyle = '#060606';
  context.fillText(ratingValue, xCordinate + ratingCardSize + 50, yCordinate + 5);

  const ratingWidth = context.measureText(ratingValue).width;
  context.font = '105px Figtree700';
  context.fillStyle = '#7C7C7C';
  context.fillText(
    '/5',
    xCordinate + ratingCardSize + 50 + ratingWidth - 5,
    yCordinate + 50
  );

  context.restore();
}
