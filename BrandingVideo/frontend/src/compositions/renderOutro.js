
import { renderHorizontalAnimation } from './renderHorizontalAnimationText.js';
import { renderOpacityAnimationText } from './renderOpacityAnimationText.js';

import { renderTypewriterAnimationText } from './renderTypewritterAnimationText.js';
import { renderRotatedBoxAnimation } from './renderRotatedBoxAnimation.js';
import { renderAnimatedText } from './renderAnimatedText.js';
export function renderOutro( canvas,context, logo, width, height, time) {

  if (time < 0) {
    return;
  }

  context.drawImage(logo, 0.1789 * width, 0.3311 * height, 0.19 * width, 0.3378 * height);

  context.font = `${0.1455 * height}px Chivo`;
  context.fillStyle = 'black';
  context.fillText('Logoipsum', 0.3972 * width, 0.5355 * height);

  renderAnimatedText(
    context,
    'www.mywebsite.com',
    `${0.0762 * height}px Chivo`,
    0.3972 * width,
    0.6258 * height,
    time - 1.0,
  );

  renderHorizontalAnimation(
    canvas,
    context,
    'www.mywebsite.com',
    `${0.0762 * height}px Chivo`,
    0.3972 * width,
    0.6258 * height,
    time - 1.0,
  );

  renderOpacityAnimationText(
    canvas,
    context,
    'www.mywebsite.com',
    `${0.0762 * height}px Chivo`,
    0.3972 * width,
    0.6258 * height,
    time - 1.0,
  );

  renderOpacityAnimationText(
    canvas,
    context,
    'www.mywebsite.com',
    `${0.0762 * height}px Chivo`,
    0.3972 * width,
    0.6258 * height,
    time - 1.0,
  );



  renderTypewriterAnimationText(
    canvas,
    context,
    'www.mywebsite.com',
    `${0.0762 * height}px Chivo`,
    0.3972 * width,
    0.6258 * height,
    time - 1.0,
  );
  


  renderRotatedBoxAnimation(
    canvas,
    context,
    'www.mywebsite.com',
    `${0.0762 * height}px Chivo`,
    0.3972 * width,
    0.6258 * height,
    time - 1.0,
  );
  

  

}
