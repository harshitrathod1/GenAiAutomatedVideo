import { loadImage } from 'canvas';
import { renderAnimatedTextDownToUp } from '../renderAnimatedTextDownToUp.js';
import { renderPopularRole } from './renderPopularRole.js';
import DataService from '../../services/data.js';

export async function scene4(
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
  const popularRolesList = data?.popularProfilesData?.slice(0, 3);
  const background = await loadImage(`assets/company-summary/${scene3Bg}`);
  context.drawImage(background, 0, 0, width, height);

  context.font = '84px Figtree800';
  renderAnimatedTextDownToUp(
    context,
    'How much does',
    '#5670FB',
    (width - context.measureText('How much does').width) / 2,
    140,
    time
  );
  renderAnimatedTextDownToUp(
    context,
    'company pay for',
    '#5670FB',
    (width - context.measureText('company pay for').width) / 2,
    240,
    time - 0.15
  );
  renderAnimatedTextDownToUp(
    context,
    'popular roles?',
    '#5670FB',
    (width - context.measureText('popular roles?').width) / 2,
    340,
    time - 0.25
  );

  for (let index = 0; index < popularRolesList.length; index++) {
    await renderPopularRole(
      context,
      time - (index + 1),
      90,
      630 + index * 330,
      `avatar${index + 1}.png`,
      `₹${popularRolesList[index]?.minCtc} - ${popularRolesList[index]?.maxCtc} Lakh/yr`,
      popularRolesList[index]?.name || '',
      `${popularRolesList[index]?.minExp}-${popularRolesList[index]?.maxExp} years of exp`
    );
  }
}
