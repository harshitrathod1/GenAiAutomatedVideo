import { renderAnimatedBlockLeftToRight } from './renderAnimatedBlockLeftToRight.js';
import { renderAnimatedTextDownToUp } from '../renderAnimatedTextDownToUp.js';
import { renderAmbitionBranding } from './renderAmbitionBranding.js';
import { interpolateKeyframes } from '../../utils/interpolateKeyframes.js';
import { loadImage } from 'canvas';
import { renderTypewriterAnimationText } from '../renderTypewritterAnimationText.js';
import DataService from '../../services/data.js';

export async function scene1(
  companyId,
  context,
  width,
  height,
  time,
  duration,
  scene1Bg
) {
  if (time < 0 || time > duration) return;

  const data = DataService.getCompanyData(companyId);

  //extract data points from data service
  const companyName = data?.companyData?.basicDetails?.shortName,
    companyLogoUrl = data?.companyData?.basicDetails?.companyLogoUrl
      ? `https://static.ambitionbox.com/alpha/company/photos/logos/${data?.companyData?.basicDetails?.companyLogoUrl}.jpg`
      : `https://static.ambitionbox.com/static/icons/company-placeholder.svg`;

  const background = await loadImage(`assets/company-summary/${scene1Bg}`);
  context.drawImage(background, 0, 0, width, height);

  //adding background overlay
  const bgOverlay = await loadImage(
    `assets/company-summary/background1-overlay.png`
  );
  const opacity = interpolateKeyframes(
    [
      { time: 0, value: 0 }, // Start fully transparent
      { time: 2, value: 1 }, // End fully opaque
    ],
    time
  );
  context.save();
  context.globalAlpha = opacity;
  context.drawImage(bgOverlay, 0, 696, width, 1224);
  context.restore();

  await renderAmbitionBranding(context, width, time, true);

  await renderAnimatedBlockLeftToRight(
    context,
    width,
    time,
    companyName,
    companyLogoUrl
  );

  context.font = '88px Figtree800';
  renderAnimatedTextDownToUp(
    context,
    'IS THIS THE RIGHT',
    '#5670FB',
    (width - context.measureText('IS THIS THE RIGHT').width) / 2,
    998,
    time
  );

  context.font = '120px Figtree800';
  renderAnimatedTextDownToUp(
    context,
    'FIT FOR YOU?',
    '#5670FB',
    (width - context.measureText('FIT FOR YOU?').width) / 2,
    1100,
    time
  );

  context.font = '48px Figtree500';
  const text = "Here's everything you need to know!";
  renderTypewriterAnimationText(
    null,
    context,
    text,
    '48px Figtree500',
    (width - context.measureText(text).width) / 2,
    1228,
    time - 1
  );

  // trying character blur effect

  // context.font = "40px Arial";
  // context.fillStyle = '#000000';
  // const text = "Here's everything you need to know";
  // const textMetrics = context.measureText(text);
  // const fontWidth = textMetrics.width;
  // const fontHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
  // context.fillText(text, (width - fontWidth) / 2, 750);
  // context.fillStyle = "#000000";

  // const t = interpolateKeyframes(
  //   [
  //     { time: 1.5, value: 0 },
  //     // At time 3, we want x to be 200 (using Cubic easing)
  //     { time: 2.5, value: fontWidth, easing: "cubic-in-out" },
  //   ],
  //   time
  // );

  // context.fillRect((width - fontWidth) / 2, 750 - textMetrics.actualBoundingBoxAscent, t, fontHeight);
}
