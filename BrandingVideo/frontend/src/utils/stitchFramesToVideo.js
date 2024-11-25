import ffmpeg from 'fluent-ffmpeg';

export async function stitchFramesToVideo(
  framesFilepath,
  soundtrackFilePath,
  outputFilepath,
  duration,
  frameRate
) {
  return await new Promise((resolve, reject) => {
    ffmpeg()
      // Tell FFmpeg to stitch all images together in the provided directory
      .input(framesFilepath)
      .inputOptions([
        // Set input frame rate
        `-framerate ${frameRate}`,
      ])

      // Add the soundtrack
      .input(soundtrackFilePath[0])
      .inputOption('-stream_loop -1')
      .inputOption('-itsoffset 0') // Starts immediately
      .input(soundtrackFilePath[1])
      .inputOption('-itsoffset 0') // Starts immediately
      .input(soundtrackFilePath[2])
      .inputOption('-itsoffset 9') // Starts immediately
      .input(soundtrackFilePath[3])
      .inputOption('-itsoffset 18.5') // Starts immediately
      .input(soundtrackFilePath[4])
      .inputOption('-itsoffset 29') // Starts immediately
      .input(soundtrackFilePath[5])
      .inputOption('-itsoffset 40.5') // Starts immediately
      .input(soundtrackFilePath[6])
      .inputOption('-itsoffset 51') // Starts immediately
      .input(soundtrackFilePath[7])
      .inputOption('-itsoffset 60.5') // Starts immediately
      .input(soundtrackFilePath[8])
      .inputOption('-itsoffset 70') // Starts immediately

      // Configure filter complex to add delay to each audio and mix
      .complexFilter([
        '[0:v]format=yuv420p[v]',
        '[1:a]adelay=0|0[a1]', // Audio 1 starts at 0 seconds
        '[2:a]adelay=0|0[a2]', // Audio 2 starts at 0 seconds
        '[3:a]adelay=9000|9000[a3]', // Audio 3 starts at 4.5 seconds
        '[4:a]adelay=18500|18500[a4]', // Audio 4 starts at 11 seconds
        '[5:a]adelay=29000|29000[a5]', // Audio 5 starts at 17.5 seconds
        '[6:a]adelay=40500|40500[a6]', // Audio 6 starts at 24 seconds
        '[7:a]adelay=51000|51000[a7]', // Audio 7 starts at 32.5 seconds
        '[8:a]adelay=60500|60500[a8]', // Audio 8 starts at 37.5 seconds
        '[9:a]adelay=70000|70000[a9]', // Audio 9 starts at 43 seconds
        '[a1][a2][a3][a4][a5][a6][a7][a8][a9]amix=inputs=9,volume=10,afade=out:st=' + (duration - 2) + ':d=2[a]' // Mix all audio tracks into one, set volume, and add fade out
      ])

      // Map video and audio to output
      .map('[v]') // Maps the video from images
      .map('[a]') // Uses the mixed audio track
      .videoCodec('libx264')
      // Set the output duration. It is required because FFmpeg would otherwise
      // automatically set the duration to the longest input, and the soundtrack might
      // be longer than the desired video length
      .duration(duration)
      // Set output frame rate
      .fps(frameRate)

      // Set the output filepath
      .saveToFile(outputFilepath)

      // Resolve or reject (throw an error) the Promise once FFmpeg completes
      .on('end', () => resolve(outputFilepath))
      .on('error', (error) => reject(new Error(error)));
  });
}
