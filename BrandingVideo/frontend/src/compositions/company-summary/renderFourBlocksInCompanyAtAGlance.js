import { loadImage } from 'canvas';
import { interpolateKeyframes } from '../../utils/interpolateKeyframes.js';
import { splitStringByLength } from '../../utils/common.js';

export async function renderFourBlocksInCompanyAtAGlance(
  context,
  time,
  dataPoints
) {

  const {
    foundedYear,
    indianHqCity,
    indianEmployeeCountRange,
    primaryIndustry,
  } = dataPoints;

  if (time - 1 > 0) {
    const opacity = interpolateKeyframes(
      [
        { time: 0, value: 0 }, // Start fully transparent
        { time: 1, value: 1 }, // End fully opaque
      ],
      time - 1
    );

    context.save();

    context.globalAlpha = opacity;

    // const angle = -(Math.PI / 180) * 3; // Rotate 10 degrees (in radians)
    // context.rotate(angle); // Rotate by the specified angle

    const foundInBg = await loadImage('assets/company-summary/founded-in.png');
    context.drawImage(foundInBg, 72, 500, 350, 250);

    context.fillStyle = '#FFFFFF';
    context.font = '40px Figtree500';
    context.fillText(
      'Founded in',
      72 + (341 - context.measureText('Founded in').width) / 2 - 20,
      590
    );

    context.font = '60px Figtree700';
    context.fillText(
      foundedYear,
      72 + (341 - context.measureText(foundedYear).width) / 2 - 20,
      635
    );

    context.restore();
  }

  if (time - 2 > 0) {
    const opacity = interpolateKeyframes(
      [
        { time: 0, value: 0 }, // Start fully transparent
        { time: 1, value: 1 }, // End fully opaque
      ],
      time - 2
    );

    context.save();

    context.globalAlpha = opacity;

    const headquarterBg = await loadImage(
      'assets/company-summary/headquarter.png'
    );
    context.drawImage(headquarterBg, 370, 692, 564, 344);

    context.fillStyle = '#FFFFFF';
    context.font = '40px Figtree500';
    context.fillText(
      'Headquarters',
      370 + (543 - context.measureText('Headquarters').width) / 2,
      815
    );

    context.font = '60px Figtree700';
    context.fillText(
      indianHqCity,
      370 + (543 - context.measureText(indianHqCity).width) / 2,
      860
    );

    context.restore();
  }

  if (time - 3 > 0) {
    const opacity = interpolateKeyframes(
      [
        { time: 0, value: 0 }, // Start fully transparent
        { time: 1, value: 1 }, // End fully opaque
      ],
      time - 3
    );

    context.save();

    context.globalAlpha = opacity;

    // const angle = -(Math.PI / 180) * 3; // Rotate 10 degrees (in radians)
    // context.rotate(angle); // Rotate by the specified angle

    const employeesBg = await loadImage('assets/company-summary/employees.png');
    context.drawImage(employeesBg, 102, 878, 386, 323);

    context.fillStyle = '#FFFFFF';
    context.font = '40px Figtree500';
    context.fillText(
      'Employee Count',
      102 + (386 - context.measureText('Employee Count').width) / 2,
      1029
    );

    context.font = '60px Figtree700';
    context.fillText(
      indianEmployeeCountRange,
      102 + (386 - context.measureText(indianEmployeeCountRange).width) / 2,
      1074
    );

    context.restore();
  }

  if (time - 4 > 0) {
    const opacity = interpolateKeyframes(
      [
        { time: 0, value: 0 }, // Start fully transparent
        { time: 1, value: 1 }, // End fully opaque
      ],
      time - 4
    );

    context.save();

    context.globalAlpha = opacity;

    const keyFocusBg = await loadImage('assets/company-summary/key-focus.png');
    context.drawImage(keyFocusBg, 405, 1148, 605, 344);

    //Positioning keyFocusArea
    const keyFocusAreaValue = primaryIndustry;
    // const keyFocusAreaValue = 'Internet';
    // const keyFocusAreaValue = 'IT Services & Consulting';
    // const keyFocusAreaValue = 'Education & Training';
    // const keyFocusAreaValue = 'Engineering & Construction';
    // const keyFocusAreaValue = 'Architecture & Interior Design';
    // const keyFocusAreaValue = 'Consumer Electronics & Appliances';
    // const keyFocusAreaValue = 'Facility Management Services';
    // const keyFocusAreaValue =
    //   'Investment Banking / Venture Capital / Private Equity';

    let keyFocusAreaArr = [];

    if (keyFocusAreaValue.length <= 35) {
      keyFocusAreaArr = splitStringByLength(keyFocusAreaValue, 12);
    } else {
      keyFocusAreaArr = splitStringByLength(keyFocusAreaValue, 16);
    }

    const stylingMap = {
      1: {
        margin: 110,
      },
      2: {
        margin: 72,
      },
      3: {
        margin: 42,
      },
      4: {
        margin: 20,
      },
    };

    context.fillStyle = '#FFFFFF';

    context.font = '40px Figtree500';
    const textX = 416 + (573 - context.measureText('Key Focus in').width) / 2;
    const textY = 1165 + stylingMap?.[keyFocusAreaArr.length]?.margin;
    context.fillText('Key Focus in', textX, textY);

    keyFocusAreaArr.forEach((word, index) => {
      context.font =
        keyFocusAreaArr.length < 4 ? '60px Figtree700' : '52px Figtree700';
      const textX = 416 + (573 - context.measureText(word).width) / 2;
      const textY =
        1165 + stylingMap?.[keyFocusAreaArr.length]?.margin + (50 + index * 60);

      context.fillText(word, textX, textY);
    });

    context.restore();
  }
}
