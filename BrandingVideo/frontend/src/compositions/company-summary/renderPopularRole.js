import { loadImage } from 'canvas';
import { interpolateKeyframes } from '../../utils/interpolateKeyframes.js';

export async function renderPopularRole(context, time, xCordinate, yCordinate, image, compensation, role, exp) {
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

  // Define category rating properties
  const boxWidth = 142; // Width of the box
  const boxHeight = 142; // Height of the box in which we want to center text

  const avatar = await loadImage(`assets/company-summary/${image}`);
  context.drawImage(
    avatar,
    xCordinate,
    yCordinate + 15,
    boxWidth,
    boxHeight
  );

  context.fillStyle = '#495AC8'
  context.font = '60px Figtree800';
  context.fillText(
    compensation,
    xCordinate + 195,
    yCordinate,
  );

  context.fillStyle = '#1E223C';
  context.font = '48px Figtree800';
  context.fillText(
    role,
    xCordinate + 195,
    yCordinate + 80
  );

  context.fillStyle = '#1E223C';
  context.font = '36px Figtree500';
  context.fillText(
    exp,
    xCordinate + 195,
    yCordinate + 150
  );

  context.restore();
}
