import { interpolateKeyframes } from '../../../utils/interpolateKeyframes.js';
import { renderCompetitorTile } from './renderCompetitorTile.js';
import { hightlightCurrentCompanyTile } from './hightlightCurrentCompanyTile.js';

export async function renderCompetitors(context, time, xCordinate, yCordinate) {
  if (time < 0) return;

  const opacity = interpolateKeyframes(
    [
      { time: 0, value: 0 }, // Start fully transparent
      { time: 1, value: 1 }, // End fully opaque
    ],
    time
  );

  context.save();

  context.globalAlpha = opacity;

  const data = [
    {
      companyName: 'Wipro',
      companyLogo: 'wipro-logo',
      rating: '3.7',
    },
    {
      companyName: 'TCS',
      companyLogo: 'tcs-logo',
      rating: '3.9',
    },
    {
      companyName: 'Infosys',
      companyLogo: 'infosys-logo',
      rating: '4.1',
    },
    {
      companyName: 'Accenture',
      companyLogo: 'accenture-logo',
      rating: '4.4',
    },
    {
      companyName: 'Cognizant',
      companyLogo: 'cognizant-logo',
      rating: '3.7',
    },
  ];

  for (let i = 0; i < data.length; i++) {
    if (data[i].companyName === 'TCS') {
      hightlightCurrentCompanyTile(
        context,
        time - 0.75,
        xCordinate,
        yCordinate + i * 240
      );
    }

    renderCompetitorTile(
      context,
      time,
      xCordinate,
      yCordinate + i * 240,
      data[i]
    );
  }

  context.restore();
}
