import { scene1 } from './scene1.js';
import { scene2 } from './scene2.js';
import { scene3 } from './scene3.js';
import { scene4 } from './scene4.js';
import { scene5 } from './scene5.js';
import { scene6 } from './scene6.js';
import { scene7 } from './scene7.js';
import { scene8 } from './scene8.js';
import { slideTransition } from './slideTransition.js';

export async function renderMainComposition(companyId, context, width, height, time) {

  const scene1Bg = 'background1.png';
  await scene1(companyId, context, width, height, time, 7, scene1Bg); // starts at 0, duration 7s

  const scene2Bg = 'background2.png';
  slideTransition(context, width, height, time - 7, 0.5, scene2Bg); // duration  0.5s
  await scene2(companyId, context, width, height, time - 7.5, 10.5, scene2Bg);// starts at 7.5s, duration 10.5s

  const scene3Bg = 'background3.png';
  slideTransition(context, width, height, time - 18, 0.5, scene3Bg); // duration  0.5s
  await scene3(companyId, context, width, height, time - 18.5, 10, scene3Bg); // starts at 18.5s, duration 10s

  const scene4Bg = 'background4.png';
  slideTransition(context, width, height, time - 28.5, 0.5, scene4Bg); // duration  0.5s
  await scene4(companyId, context, width, height, time - 29, 11, scene4Bg); // starts at 29s, duration 11s

  const scene5Bg = 'background5.png';
  slideTransition(context, width, height, time - 40, 0.5, scene5Bg); // duration  0.5s
  await scene5(companyId, context, width, height, time - 40.5, 10,  scene5Bg); // starts at 40.5s, duration 10s

  const scene6Bg = 'background6.png';
  slideTransition(context, width, height, time - 50.5, 0.5, scene6Bg); // duration  0.5s
  await scene6(companyId, context, width, height, time - 51, 9, scene6Bg); // starts at 51s, duration 9s

  const scene7Bg = 'background7.png';
  slideTransition(context, width, height, time - 60, 0.5, scene7Bg); // duration  0.5s
  await scene7(companyId, context, width, height, time - 60.5, 9, scene7Bg); // starts at 60.5s, duration 9s

  const scene8Bg = 'background8.png';
  slideTransition(context, width, height, time - 69.5, 0.5, scene8Bg, true); // duration  0.5s
  await scene8(context, width, height, time - 70, 4, scene8Bg); // starts at 70s, duration 4s
}
