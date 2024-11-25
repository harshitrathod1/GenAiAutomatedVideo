import { loadImage } from 'canvas';
import { renderAnimatedTextDownToUp } from '../renderAnimatedTextDownToUp.js';
import { renderBenefit } from './renderBenefit.js';
import { renderTypewriterAnimationText } from '../renderTypewritterAnimationText.js';
import DataService from '../../services/data.js';
import { convertToK } from '../../utils/common.js';

export async function scene5(
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
  const benefitsList = data?.benefitsData?.benefits || [];

  const background = await loadImage(`assets/company-summary/${scene3Bg}`);
  context.drawImage(background, 0, 0, width, height);

  context.font = '84px Figtree800';
  renderAnimatedTextDownToUp(
    context,
    'What benefits do',
    '#5670FB',
    (width - context.measureText('What benefits do').width) / 2,
    140,
    time
  );
  renderAnimatedTextDownToUp(
    context,
    'employees enjoy',
    '#5670FB',
    (width - context.measureText('employees enjoy').width) / 2,
    230,
    time - 0.15
  );
  renderAnimatedTextDownToUp(
    context,
    'here?',
    '#5670FB',
    (width - context.measureText('here?').width) / 2,
    320,
    time - 0.25
  );

  for (let index = 0; index < benefitsList?.slice(0, 4).length; index++) {
    await renderBenefit(
      context,
      time - (index + 1),
      index % 2 === 0 ? 183 : 673,
      index < 2 ? 572 : 1011,
      benefitsList[index]?.icon,
      benefitsList[index]?.name,
      `${convertToK(benefitsList[index]?.count)} total responses`
    );
  }

  if (benefitsList.length > 4) {
    context.font = '60px Figtree400';
    const text = `+${benefitsList.length - 4} more`;
    renderTypewriterAnimationText(
      null,
      context,
      text,
      '60px Figtree700',
      (width - context.measureText(text).width) / 2,
      1471,
      time - 5.5
    );
  }
}
