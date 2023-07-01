const fs = require('fs');
const subsrt = require('subsrt');
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

exports.srtReader = (req, res, next) => {
  const transcriptFolder = 'transcript';
  const transcripts = [];
  const map = {};

  fs.readdirSync(transcriptFolder).forEach((file) => {
    const filePath = `${transcriptFolder}/${file}`;
    const srtContent = fs.readFileSync(filePath, 'utf-8');
    var options = { verbose: true };
    const srtObject = subsrt.parse(srtContent);
    srtObject.forEach((block) => {
      block['movieName'] = file;
      transcripts.push(block);

      // Update the map object
      if (!map[file]) {
        map[file] = {};
      }
      map[file][block.index] = block;
    });
  });

  const isWholeWordMatch = (text, keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    return regex.test(text);
  };

  const keyword = req.params.keyword;
  const filteredCaptions = transcripts.filter((caption) =>
    isWholeWordMatch(caption.text.toLowerCase(), keyword.toLowerCase())
  );

  shuffleArray(filteredCaptions);
  req.filteredCaptions = filteredCaptions;
  req.videoMapper = map;
  //   console.log(map);
  next();
};
