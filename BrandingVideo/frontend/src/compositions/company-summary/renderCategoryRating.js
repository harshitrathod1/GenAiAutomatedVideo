import { loadImage } from 'canvas';
import { interpolateKeyframes } from '../../utils/interpolateKeyframes.js';
import { splitStringByLength } from '../../utils/common.js';

export async function renderCategoryRating(
  ratingCategory,
  image,
  heading,
  context,
  time,
  xCordinate,
  yCordinate
) {
  if (time < 0) return;

  const opacity = interpolateKeyframes(
    [
      { time: 0, value: 0 }, // Start fully transparent
      { time: 2, value: 1 }, // End fully opaque
    ],
    time
  );

  context.save();

  context.globalAlpha = opacity;

  // Define category rating properties
  const boxWidth = 888; // Width of the box
  const boxHeight = 325; // Height of the box in which we want to center text

  const categoryBg = await loadImage(`assets/company-summary/${image}`);
  context.drawImage(categoryBg, xCordinate, yCordinate, boxWidth, boxHeight);

  let ratingCategoryArr = splitStringByLength(ratingCategory, 12);

  const stylingMap = {
    1: {
      margin: 87,
    },
    2: {
      margin: 52,
    },
  };

  context.fillStyle = '#1E223C';
  context.font = '40px Figtree500';
  const textY = yCordinate + stylingMap?.[ratingCategoryArr.length]?.margin;
  context.fillText(heading, xCordinate + 310, textY);

  ratingCategoryArr.forEach((word, index) => {
    context.font = '54px Figtree700';
    const textY =
      yCordinate +
      stylingMap?.[ratingCategoryArr.length]?.margin +
      (67 + index * 60);

    context.fillText(word, xCordinate + 310, textY);
  });

  context.restore();
}
