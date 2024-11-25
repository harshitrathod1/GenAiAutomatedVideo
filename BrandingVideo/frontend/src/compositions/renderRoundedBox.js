export function renderRoundedBox(
  context,
  x,
  y,
  width,
  height,
  fillColor,
  borderRadius,
  borderLineWidth,
  borderColor
) {
  // Draw the rounded rectangle
  context.beginPath();
  context.moveTo(x + borderRadius, y); // Start at the top-left corner (after the curve)
  context.lineTo(x + width - borderRadius, y); // Top edge
  context.arcTo(x + width, y, x + width, y + borderRadius, borderRadius); // Top-right corner
  context.lineTo(x + width, y + height - borderRadius); // Right edge
  context.arcTo(
    x + width,
    y + height,
    x + width - borderRadius,
    y + height,
    borderRadius
  ); // Bottom-right corner
  context.lineTo(x + borderRadius, y + height); // Bottom edge
  context.arcTo(x, y + height, x, y + height - borderRadius, borderRadius); // Bottom-left corner
  context.lineTo(x, y + borderRadius); // Left edge
  context.arcTo(x, y, x + borderRadius, y, borderRadius); // Top-left corner
  context.closePath();

  // Fill the rectangle
  context.fillStyle = fillColor;
  context.fill();

  if (borderLineWidth && borderLineWidth > 0) {
    // Draw the border
    context.lineWidth = borderLineWidth;
    context.strokeStyle = borderColor;
    context.stroke();
  }
}
