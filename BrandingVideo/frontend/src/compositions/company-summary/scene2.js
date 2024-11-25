import { renderAnimatedTextDownToUp } from '../renderAnimatedTextDownToUp.js';
import { loadImage } from 'canvas';
import { renderFourBlocksInCompanyAtAGlance } from './renderFourBlocksInCompanyAtAGlance.js';
import DataService from '../../services/data.js';

export async function scene2(
  companyId,
  context,
  width,
  height,
  time,
  duration,
  scene2Bg
) {
  if (time < 0 || time > duration) return;

  const data = DataService.getCompanyData(companyId);

  //extract data points from data service
  const moreInfo = data?.companyData?.overview?.sectionsList?.find(
    (section) => section.sectionType === 'moreInformation'
  );
  const companyName = data?.companyData?.basicDetails?.shortName;
  const factualData = {
    foundedYear: moreInfo?.sectionData?.foundedYear || '--',
    indianHqCity:
      moreInfo?.sectionData?.indiaHQ?.cityState
        ?.split(',')?.[0]
        ?.split('/')?.[0] || '--',
    indianEmployeeCountRange:
      moreInfo?.sectionData?.indianEmployeeCountRange || '--',
    primaryIndustry: moreInfo?.sectionData?.primaryIndustry?.[0]?.name || '--',
  };

  const background = await loadImage(`assets/company-summary/${scene2Bg}`);
  context.drawImage(background, 0, 0, width, height);

  context.font = '84px Figtree500';
  renderAnimatedTextDownToUp(
    context,
    companyName,
    '#1E223C',
    (width - context.measureText(companyName).width) / 2,
    140,
    time
  );

  context.font = '84px Figtree800';
  renderAnimatedTextDownToUp(
    context,
    'At a glance',
    '#5670FB',
    (width - context.measureText('At a glance').width) / 2,
    240,
    time - 0.5
  );

  await renderFourBlocksInCompanyAtAGlance(context, time, factualData);
}
