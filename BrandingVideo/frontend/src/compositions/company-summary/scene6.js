import { loadImage } from 'canvas';
import { renderAnimatedTextDownToUp } from '../renderAnimatedTextDownToUp.js';
import { renderAbeca } from './renderAbeca.js';
import { renderAwardLeaf } from './renderAwardLeaf.js';

export async function scene6(
  companyId,
  context,
  width,
  height,
  time,
  duration,
  scene3Bg
) {
  if (time < 0 || time > duration) return;

  const background = await loadImage(`assets/company-summary/${scene3Bg}`);
  context.drawImage(background, 0, 0, width, height);

  context.font = '80px Figtree700';
  renderAnimatedTextDownToUp(
    context,
    'What makes this',
    '#5670FB',
    (width - context.measureText('What makes this').width) / 2,
    140,
    time
  );

  renderAnimatedTextDownToUp(
    context,
    'company stand out?',
    '#5670FB',
    (width - context.measureText('company stand out?').width) / 2,
    240,
    time - 0.15
  );

  await renderAbeca(context, time - 1, 57, 449);

  const awardLeaf1 = 'mega-company-2024.png';
  await renderAwardLeaf(context, time - 2, 224, 1042, awardLeaf1);

  const awardLeaf2 = 'financial-services-2024.png';
  await renderAwardLeaf(context, time - 3, 224, 1324, awardLeaf2);
}
