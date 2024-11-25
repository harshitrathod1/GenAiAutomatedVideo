import sharp from 'sharp';
import { loadImage } from 'canvas';

export const splitStringByLength = (input, maxLength) => {
  const words = input.split(' ');
  const result = [];
  let currentLine = '';

  words.forEach((word) => {
    // Check if adding the next word exceeds the max length
    if ((currentLine + word).length <= maxLength) {
      currentLine += (currentLine ? ' ' : '') + word; // Add space if line isn't empty
    } else {
      result.push(currentLine); // Push the current line and reset
      currentLine = word;
    }
  });

  if (currentLine) {
    result.push(currentLine); // Add any remaining text
  }

  return result;
};

const appendZerosInDecimalNumber = (roundOffvalue, digits) => {
  const inputAsString = roundOffvalue.toString();
  if (inputAsString.includes('.')) {
    const parts = inputAsString.split('.');
    const wholePart = parts[0];
    const fractionalPart = parts[1];
    // Pad the fractional part with zeros if necessary
    if (fractionalPart.length === digits) {
      return `${roundOffvalue}`;
    } else {
      return (
        wholePart +
        '.' +
        fractionalPart +
        new Array(digits - fractionalPart.length).fill(0).join('')
      );
    }
  } else {
    return roundOffvalue + '.' + new Array(digits).fill(0).join('');
  }
};

/**
 * Please use this function to roundoff rating anywhere on the website.
 * It is strict, not to use any other function due to inconsistency issues.
 *
 * @param rating
 * @param digits
 * @returns
 */

export const roundoffRating = (rating, digits = 0) => {
  if (
    rating === undefined ||
    rating === null ||
    isNaN(Number(rating)) ||
    rating === 0
  )
    return '0.' + new Array(digits).fill(0).join('');

  rating = Number(rating);

  switch (digits) {
    case 0: {
      return Math.round(rating).toString();
    }
    case 1: {
      const roundOffvalue = Math.round(rating * 10) / 10;
      return appendZerosInDecimalNumber(roundOffvalue, digits);
    }
    case 2: {
      const roundOffvalue = Math.round(rating * 100) / 100;
      return appendZerosInDecimalNumber(roundOffvalue, digits);
    }
    case 3: {
      const roundOffvalue = Math.round(rating * 1000) / 1000;
      return appendZerosInDecimalNumber(roundOffvalue, digits);
    }
    default:
      return `${rating}`;
  }
};

export const RatingLabelMap = {
  skillDevelopmentRating: 'Skill Development',
  workLifeRating: 'Work-Life Balance',
  compensationBenefitsRating: 'Salary & Benefits',
  jobSecurityRating: 'Job Security',
  companyCultureRating: 'Company Culture',
  careerGrowthRating: 'Promotions / Appraisal',
  workSatisfactionRating: 'Work Satisfaction',
  overallCompanyRating: 'Overall',
};

export const ratingTag = (rating) => {
  const n = Number(rating);
  let cls = 'rating-0';
  if (!isNaN(n)) {
    if (n > 4.5) cls = 'rating-5';
    else if (n >= 3.5) cls = 'rating-4';
    else if (n >= 3) cls = 'rating-3';
    else if (n >= 2) cls = 'rating-2';
    else cls = 'rating-1';
  }
  return cls;
};

export const trunDecimal = (num, digits) => {
  num = Number(num);
  return parseFloat(num.toFixed(digits).replace(/\.0$/, ''));
};

export const convertToK = (count) => {
  if (count >= 10000000) {
    return trunDecimal(count / 10000000, 1) + 'Cr';
  } else if (count >= 100000) {
    return trunDecimal(count / 100000, 1) + 'L';
  } else if (count >= 1000) {
    return trunDecimal(count / 1000, 1) + 'k';
  } else return count;
};

export const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...';
  }
  return str;
};

export const loadRemoteSvg = async (url, width, height) => {
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(
      `Failed to fetch SVG: ${url}, getting this error ${res.statusText}`
    );
  const svg = await res.text(); // Get SVG as text
  const svgImage = await sharp(Buffer.from(svg)) // Convert SVG to a raster image using sharp
    .resize(width, height)
    .toBuffer();

  return await loadImage(svgImage);
};
