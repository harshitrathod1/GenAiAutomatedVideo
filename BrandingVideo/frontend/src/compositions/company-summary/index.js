import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import { Canvas, registerFont } from 'canvas';
import fs from 'fs';
import { stitchFramesToVideo } from '../../utils/stitchFramesToVideo.js';
import { renderMainComposition } from './renderMainComposition.js';

// Tell fluent-ffmpeg where it can find FFmpeg
ffmpeg.setFfmpegPath(ffmpegStatic);

export const createCompanySummaryVideo = async (companyId, frameRate = 24) => {
  // Clean up the temporary directories first
  for (const path of [
    `out/company-summary/${companyId}`,
    `tmp/output/company-summary/${companyId}`,
  ]) {
    if (fs.existsSync(path)) {
      await fs.promises.rm(path, { recursive: true });
    }
    await fs.promises.mkdir(path, { recursive: true });
  }

  // Canvas dimensions
  const width = 1080;
  const height = 1920;

  // The video length and frame rate, as well as the number of frames required
  // to create the video
  const duration = 73.5;
  const frameCount = Math.floor(duration * frameRate);

  const canvas = new Canvas(width, height);
  const context = canvas.getContext('2d');
  context.textBaseline = 'top';

  // Load fonts so we can use them for drawing
  registerFont('assets/fonts/Figtree-Regular.ttf', { family: 'Figtree400' });
  registerFont('assets/fonts/Figtree-Medium.ttf', { family: 'Figtree500' });
  registerFont('assets/fonts/Figtree-SemiBold.ttf', { family: 'Figtree600' });
  registerFont('assets/fonts/Figtree-Bold.ttf', { family: 'Figtree700' });
  registerFont('assets/fonts/Figtree-ExtraBold.ttf', { family: 'Figtree800' });

  // Render each frame
  for (let i = 0; i < frameCount; i++) {
    const time = i / frameRate;

    console.log(
      `Rendering frame ${i} at ${Math.round(time * 10) / 10} seconds...`
    );

    await renderMainComposition(companyId, context, width, height, time);

    // Store the image in the directory where it can be found by FFmpeg
    const output = canvas.toBuffer('image/png');
    const paddedNumber = String(i).padStart(4, '0');
    await fs.promises.writeFile(
      `tmp/output/company-summary/${companyId}/frame-${paddedNumber}.png`,
      output
    );
  }

  // Stitch all frames together with FFmpeg
  const outputFilePath = await stitchFramesToVideo(
    `tmp/output/company-summary/${companyId}/frame-%04d.png`,
    [
      'assets/company-summary/audio/music.mp3',
      'assets/company-summary/audio/part_1.mp3',
      'assets/company-summary/audio/part_2.mp3',
      'assets/company-summary/audio/part_3.mp3',
      'assets/company-summary/audio/part_4.mp3',
      'assets/company-summary/audio/part_5.mp3',
      'assets/company-summary/audio/part_6.mp3',
      'assets/company-summary/audio/part_7.mp3',
      'assets/company-summary/audio/part_8.mp3',
    ],
    `out/company-summary/${companyId}/video.mp4`,
    duration,
    frameRate
  );

  return outputFilePath;
};
