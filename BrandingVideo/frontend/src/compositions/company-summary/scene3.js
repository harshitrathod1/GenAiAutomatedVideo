import { loadImage } from 'canvas';
import { renderAnimatedTextDownToUp } from '../renderAnimatedTextDownToUp.js';
import { renderRatingCard } from './renderRatingCard.js';
import { renderCategoryRating } from './renderCategoryRating.js';
import { renderTypewriterAnimationText } from '../renderTypewritterAnimationText.js';
import DataService from '../../services/data.js';
import {
  convertToK,
  RatingLabelMap,
  roundoffRating,
} from '../../utils/common.js';

export async function scene3(
  companyId,
  context,
  width,
  height,
  time,
  duration,
  scene3Bg
) {
  if (time < 0 || time > duration) return;

  const data = DataService.getCompanyData(companyId);

  //extract data points from data service
  const rating = roundoffRating(data?.companyData?.basicDetails?.rating, 1);
  const reviewCount = convertToK(data?.ratingsData?.totalCount || 0);
  const categoryWiseRatingsArray = Object.entries(
    data?.ratingsData?.ratings || {}
  );
  categoryWiseRatingsArray.sort((a, b) => b[1] - a[1]);
  const topRatedCategory =
      RatingLabelMap[categoryWiseRatingsArray?.[0]?.[0]] || '--',
    criticallyRatedCategory =
      RatingLabelMap[
        categoryWiseRatingsArray?.[categoryWiseRatingsArray.length - 1]?.[0]
      ] || '--';

  const background = await loadImage(`assets/company-summary/${scene3Bg}`);
  context.drawImage(background, 0, 0, width, height);

  context.font = '84px Figtree800';
  renderAnimatedTextDownToUp(
    context,
    'How did employees',
    '#5670FB',
    (width - context.measureText('How did employees').width) / 2,
    140,
    time
  );
  renderAnimatedTextDownToUp(
    context,
    'rate the company?',
    '#5670FB',
    (width - context.measureText('rate the company?').width) / 2,
    240,
    time - 0.15
  );

  await renderRatingCard(rating, context, time - 1, 213, 514);

  context.font = '44px Figtree500';
  const basedOnreviewCount = `Based on ${reviewCount} employee reviews`;
  renderTypewriterAnimationText(
    null,
    context,
    basedOnreviewCount,
    '44px Figtree400',
    (width - context.measureText(basedOnreviewCount).width) / 2,
    774,
    time - 2
  );

  await renderCategoryRating(
    topRatedCategory,
    'top-category-rating.png',
    'Top rating for',
    context,
    time - 3,
    110,
    948
  );

  await renderCategoryRating(
    criticallyRatedCategory,
    'critical-category-rating.png',
    'Critically rating for',
    context,
    time - 3,
    110,
    1294
  );
}
