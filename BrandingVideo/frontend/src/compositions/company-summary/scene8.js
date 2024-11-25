import { loadImage } from 'canvas';
import { interpolateKeyframes } from '../../utils/interpolateKeyframes.js';
import { renderAnimatedTextDownToUp } from '../renderAnimatedTextDownToUp.js';

export async function scene8(context, width, height, time, duration, scene8Bg) {
  if (time < 0 || time > duration) return;

  const background = await loadImage(`assets/company-summary/${scene8Bg}`);
  context.drawImage(background, 0, 0, width, height);

  const t = interpolateKeyframes(
    [
      { time: 0, value: 0.7 },
      { time: 1, value: 0, easing: 'cubic-in-out' },
    ],
    time
  );

  context.fillStyle = `rgba(0, 0, 0, ${t})`;
  context.fillRect(0, 0, width, height);

  context.font = '28px Figtree400';
  renderAnimatedTextDownToUp(
    context,
    'The infomation is this video comes from user-generated',
    '#1E223C',
    (width -
      context.measureText(
        'The infomation is this video comes from user-generated'
      ).width) /
      2,
    1790,
    time
  );

  renderAnimatedTextDownToUp(
    context,
    'data last updated on 17th October',
    '#1E223C',
    (width - context.measureText('data last updated on 17th October').width) /
      2,
    1830,
    time - 0.15
  );
}
