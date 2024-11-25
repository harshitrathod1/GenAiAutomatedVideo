import { loadImage } from 'canvas';
import { interpolateKeyframes } from '../../utils/interpolateKeyframes.js';
import { splitStringByLength } from '../../utils/common.js';

export async function renderAnimatedBlockLeftToRight(
  context,
  width,
  time,
  companyName,
  companyLogoUrl
) {
  //blue box width, height
  const parentBoxWidth = 904;
  const parentBoxHeight = 372;

  const translateX = (width - parentBoxWidth) / 2;

  // Calculate the progress of the animation from 0 to 1
  const boxX = interpolateKeyframes(
    [
      // At time 0, we want x to be 100
      { time: 0, value: -parentBoxWidth - 76 },
      // At time 1.5, we want x to be 550 (using Cubic easing)
      { time: 0.75, value: translateX, easing: 'cubic-in-out' },
    ],
    time
  );

  const boxY = 446;

  // white logo container
  const logoContainerWidth = 244,
    logoContainerHeight = 244,
    paddingAroundLogo = 16;

  const paddingTb = 48,
    paddingLr = 48; // Padding around the box
  const gap = 28; // Space between image and text

  // Parent container box
  const logoPlaceholder = await loadImage(
    `assets/company-summary/logo-placeholder.png`
  );
  const logoStar = await loadImage(`assets/company-summary/logo-star.png`);
  context.drawImage(
    logoPlaceholder,
    boxX,
    boxY,
    parentBoxWidth,
    parentBoxHeight
  );
  context.drawImage(logoStar, boxX + 858, 374, 122, 122);

  const companyLogo = await loadImage(companyLogoUrl);

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
    boxX + paddingLr + paddingAroundLogo + offsetX,
    boxY + paddingTb + paddingAroundLogo + offsetY,
    drawWidth,
    drawHeight
  );

  //Positioning company name
  const companyNameArr = splitStringByLength(companyName, 12);

  const stylingMap = {
    1: {
      margin: 138,
      fontSize: 68,
    },
    2: {
      margin: 110,
      fontSize: 68,
    },
    3: {
      margin: 65,
      fontSize: 68,
    },
    4: {
      margin: 32,
      fontSize: 60,
    },
  };

  context.font = `${
    stylingMap?.[companyNameArr.length]?.fontSize || 64
  }px Figtree700`;
  context.fillStyle = '#FFFFFF';

  companyNameArr.forEach((word, index) => {
    const textX =
      boxX + paddingLr + logoContainerWidth + 2 * paddingAroundLogo + gap; // Position text after the image
    const textY =
      boxY + (stylingMap?.[companyNameArr.length]?.margin || 0) + index * 80; // Center text vertically with the image

    context.fillText(word, textX, textY);
  });
}
