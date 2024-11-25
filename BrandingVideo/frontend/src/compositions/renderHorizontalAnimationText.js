import { interpolateKeyframes } from '../utils/interpolateKeyframes.js';

export function renderHorizontalAnimation(canvas,context, text, font, x, y, time) {


  if (time < 0) {
    return;
  }

  context.save();

  context.font = font;
  context.fillStyle = 'black';



  // Measure how the dimensions of the text
  const textMetrics = context.measureText(text);
  const textWidth = textMetrics.width;

  const fontHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

  // Calculate the starting and ending x positions based on the given x coordinate
  const startX = x - textWidth; // Start from off-screen to the left of the given x coordinate
  const endX = x; // End at the given x coordinate


//to enable at center of canvas
// const startX = 0; // Start from off-screen on the left
// const endX = (canvas.width - textWidth) / 2; // End at center of canvas

// Interpolate the x position of the text from startX to endX
const xOffset = interpolateKeyframes([
    { time: 0, value: startX },
    { time: 1, value: endX, easing: 'expo-out' },
  ], time);

  // Use the provided y coordinate for the y position, aligning vertically with font height
  const yPosition = y + fontHeight / 2;

 

  // Draw the text at the interpolated x position and the given y position
  context.fillText(text, xOffset, yPosition);


  context.restore();
}