const express = require("express");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 10000;

app.use("/hls", express.static(path.join(__dirname, "public/hls")));

app.get("/", (req, res) => {
  res.send("FFmpeg HLS Restreamer is running!");
});

// Start FFmpeg when server starts
const inputUrl = "http://ee0c5e74.akadatel.com/iptv/QRDWGTBMDHSDGK/19146/index.m3u8";
const outputDir = "public/hls";

const ffmpegCmd = `ffmpeg -i "${inputUrl}" -c copy -f hls -hls_time 6 -hls_list_size 6 -hls_flags delete_segments ${outputDir}/stream.m3u8`;

exec(ffmpegCmd, (err, stdout, stderr) => {
  if (err) {
    console.error("FFmpeg error:", err);
    return;
  }
  console.log("FFmpeg output:", stdout);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
