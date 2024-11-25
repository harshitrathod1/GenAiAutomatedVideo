import { loadImage } from 'canvas';
import { interpolateKeyframes } from '../../../utils/interpolateKeyframes.js';
import { drawRoundedRect } from '../../../utils/drawRoundedRect.js';

export async function renderCompetitorTile(context, time, xCordinate, yCordinate, data) {
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

  context.fillStyle = '#FFFFFF';

  const overallContainerPadding = 20;
  const logoContainerWidth = 148,
    logoContainerHeight = 128,
    logoContainerRadius = 20,
    paddingAroundLogo = 16; // Padding around the box

  drawRoundedRect(
    context,
    xCordinate + overallContainerPadding,
    yCordinate + overallContainerPadding,
    2 * paddingAroundLogo + logoContainerWidth,
    2 * paddingAroundLogo + logoContainerHeight,
    logoContainerRadius
  );

  const companyLogo = await loadImage(`assets/company-summary/${data.companyLogo}.png`);

  /**  Position image in center of the box */
  // Calculate aspect ratios
  const imgAspectRatio = companyLogo.width / companyLogo.height;
  const boxAspectRatio = logoContainerWidth / logoContainerHeight;

  // Determine dimensions to fit the image within the box (contain)
  let drawWidth, drawHeight;
  if (imgAspectRatio > boxAspectRatio) {
    // Image is wider than the box, fit width and adjust height
    drawWidth = logoContainerWidth;
    drawHeight = logoContainerHeight / imgAspectRatio;
  } else {
    // Image is taller than or equal in aspect ratio to the box, fit height and adjust width
    drawHeight = logoContainerHeight;
    drawWidth = logoContainerWidth * imgAspectRatio;
  }

  // Calculate the position to center the image in the box
  const offsetX = (logoContainerWidth - drawWidth) / 2;
  const offsetY = (logoContainerHeight - drawHeight) / 2;

  // Draw the image to fit within the box with centering
  context.drawImage(
    companyLogo,
    xCordinate + overallContainerPadding + paddingAroundLogo + offsetX,
    yCordinate + overallContainerPadding + paddingAroundLogo + offsetY,
    drawWidth,
    drawHeight
  );

  context.font = '54px Figtree700';
  context.fillStyle = '#1E223C';
  context.fillText(
    data.companyName,
    xCordinate +
      overallContainerPadding +
      2 * paddingAroundLogo +
      logoContainerWidth +
      48,
    yCordinate + 45
  );

  const ratingStar = await loadImage('assets/company-summary/rating-5.svg');

  context.drawImage(
    ratingStar,
    xCordinate +
      overallContainerPadding +
      2 * paddingAroundLogo +
      logoContainerWidth +
      54,
    yCordinate + 45 + 78,
    40,
    40
  );

  context.font = '40px Figtree700';
  context.fillStyle = '#060606';
  context.fillText(
    data.rating,
    xCordinate +
      overallContainerPadding +
      2 * paddingAroundLogo +
      logoContainerWidth +
      54 +
      40 +
      10,
    yCordinate + 45 + 78
  );

  const ratingWidth = context.measureText(data.rating).width;
  context.font = '28px Figtree700';
  context.fillStyle = '#7C7C7C';
  context.fillText(
    '/5',
    xCordinate +
      overallContainerPadding +
      2 * paddingAroundLogo +
      logoContainerWidth +
      54 +
      40 +
      10 +
      ratingWidth,
    yCordinate + 45 + 78 + 10
  );

  context.restore();
}
