import { interpolateKeyframes } from '../../utils/interpolateKeyframes.js';
import { loadRemoteSvg, truncateString } from '../../utils/common.js';
import { renderRoundedBox } from '../renderRoundedBox.js';

export async function renderBenefit(
  context,
  time,
  xCordinate,
  yCordinate,
  benefitIcon,
  benefitName,
  totalResponses
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

  // Define category rating properties
  const boxWidth = 224; // Width of the box
  const boxHeight = 224; // Height of the box
  const borderRadius = 50; // Radius of the rounded corners
  const benefitIconSize = 150;

  renderRoundedBox(context, xCordinate, yCordinate, boxWidth, boxHeight, '#E7E7E7', borderRadius, 4, '#5670FB');

  const avatar = await loadRemoteSvg(
    `https://static.ambitionbox.com/static/benefits/${
      benefitIcon ? `${benefitIcon}.svg` : 'Default.svg'
    }`,
    benefitIconSize,
    benefitIconSize
  );
  context.drawImage(
    avatar,
    xCordinate + 36,
    yCordinate + 35,
    benefitIconSize,
    benefitIconSize
  );

  context.fillStyle = '#1E223C';
  context.font = '40px Figtree700';
  const truncatedBenefit = truncateString(benefitName, 22);
  context.fillText(
    truncatedBenefit,
    xCordinate + boxWidth / 2 - context.measureText(truncatedBenefit).width / 2,
    yCordinate + boxHeight + 40
  );

  context.font = '28px Figtree500';
  context.fillText(
    totalResponses,
    xCordinate + boxWidth / 2 - context.measureText(totalResponses).width / 2,
    yCordinate + boxHeight + 40 + 48 + 12
  );

  context.restore();
}
