const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const path = require('path');

exports.videoCutter = async (req, res) => {
  try {
    const clips = [];

    let counter = -1;
    for (const movie of req.filteredCaptions) {
      if (counter >= 10) {
        break;
      }

      counter++;

      let prevobj = movie;
      if (
        req.videoMapper[movie.movieName][Math.max(movie.index - 2, 1)] !=
        undefined
      )
        prevobj =
          req.videoMapper[movie.movieName][Math.max(movie.index - 2, 1)];
      if (req.videoMapper[movie.movieName][movie.index - 1] != undefined)
        prevobj = req.videoMapper[movie.movieName][movie.index - 1];
      let nextobj = movie;
      if (req.videoMapper[movie.movieName][movie.index + 2] != undefined)
        nextobj = req.videoMapper[movie.movieName][movie.index + 2];
      if (req.videoMapper[movie.movieName][movie.index + 1] != undefined)
        nextobj = req.videoMapper[movie.movieName][movie.index + 1];

      const duration = (nextobj.end - prevobj.start) | movie.duration;
      let transcript = '';
      for (let i = prevobj.index; i <= nextobj.index; i++) {
        transcript += req.videoMapper[movie.movieName][i].text + ' ';
      }
      movie.movieName = movie.movieName.replace(/\.srt$/, '');
      const inputFilePath = path.join(
        __dirname,
        '../videos',
        movie.movieName + '.mkv'
      );

      const clipFilename = `clip_${Date.now()}.mp4`;
      const outputFilePath = path.join(__dirname, '../clips', clipFilename);

      await new Promise((resolve, reject) => {
        ffmpeg(inputFilePath)
          .setStartTime(prevobj.start / 1000)
          .setDuration(duration / 1000)
          .output(outputFilePath)

          .on('end', resolve)
          .on('error', reject)
          .run();
      });

      const thumbnailFilename = `thumbnail_${Date.now()}.jpg`;
      const thumbnailPath = path.join(
        __dirname,
        '../thumbnails',
        thumbnailFilename
      );
      await new Promise((resolve, reject) => {
        ffmpeg(outputFilePath)
          .screenshots({
            timestamps: ['50%'],
            filename: thumbnailFilename,
            folder: path.join(__dirname, '../thumbnails'),
          })
          .on('end', resolve)
          .on('error', reject);
      });

      clips.push({
        movieId: movie._id,
        movieName: movie.movieName,
        clipURL: `http://localhost:3000/clips/${clipFilename}`,
        transcript: transcript,
        thumbnailURL: `http://localhost:3000/thumbnails/${thumbnailFilename}`,
      });
    }

    res.json({ clips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
