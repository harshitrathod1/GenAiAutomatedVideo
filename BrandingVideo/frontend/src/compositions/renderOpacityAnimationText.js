// import { interpolateKeyframes } from '../utils/interpolateKeyframes.js';

// export function renderOpacityAnimationText(canvas,context, text, font, x, y, time) {


//   if (time < 0) {
//     return;
//   }

//   context.save();

//   context.font = font;
//   context.fillStyle = 'black';



//   // Measure how the dimensions of the text
//   const textMetrics = context.measureText(text);
//   const textWidth = textMetrics.width;

//   const fontHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
//   const startX = 0; // Start from off-screen on the left
// const endX = (canvas.width - textWidth) / 2; // End at center of canvas

// const xPosition = (canvas.width - textWidth) / 2; // Horizontally centered
// // Vertically centered




//   // Interpolate the y position of the text from 0 to the font size
//   // const xOffset = interpolateKeyframes([
//   //   { time: 0, value: startX },
//   //   { time: 1, value: endX, easing: 'expo-out' },
//   // ], time);

//   const opacity = interpolateKeyframes([
//     { time: 0, value: 0 },        // Start fully transparent
//     { time: 1, value: 1 },        // End fully opaque
//   ], time);

//   context.globalAlpha = opacity;


//   const yPosition = (canvas.height + fontHeight) / 2;

//   // Clip to the bounding box of the text
//   // context.beginPath();
//   // context.rect(x, y - textMetrics.actualBoundingBoxAscent, textMetrics.width, fontHeight);
//   // context.clip();

//   // Draw the text
//   //context.fillText(text, x, y + offset);
//   //context.fillText(text, xOffset, yPosition);

//   context.fillText(text, xPosition, yPosition);
//   context.restore();
// }

import { interpolateKeyframes } from '../utils/interpolateKeyframes.js';

export function renderOpacityAnimationText(canvas, context, text, font, x, y, time) {
  if (time < 0) {
    return;
  }

  context.save();

  context.font = font;
  context.fillStyle = 'black';

  // Measure the dimensions of the text
  const textMetrics = context.measureText(text);
  const textWidth = textMetrics.width;
  const fontHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

  // Interpolate opacity from 0 to 1
  const opacity = interpolateKeyframes([
    { time: 0, value: 0 },        // Start fully transparent
    { time: 1, value: 1 },        // End fully opaque
  ], time);

  // Set the opacity of the text
  context.globalAlpha = opacity;

  // Position the text at the specified (x, y) coordinates
  const yPosition = y + fontHeight / 2;

  // Draw the text at the given coordinates with the interpolated opacity
  context.fillText(text, x, yPosition);

  context.restore();
}