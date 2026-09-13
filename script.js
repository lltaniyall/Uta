// YouTube IFrame Player API
// デモ用動画ID。公開時に好きなYouTube動画IDへ変更してください。
const VIDEO_ID = "Ztonlw8pIHg";

let player;
let tracks = [];

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: VIDEO_ID,
    playerVars: {
      rel: 0,
      modestbranding: 1
    },
    events: {
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady() {
  tracks = [...document.querySelectorAll(".track")];

  tracks.forEach(track => {
    track.addEventListener("click", () => {
      const seconds = Number(track.dataset.time);
      if (player && typeof player.seekTo === "function") {
        player.seekTo(seconds, true);
        player.playVideo();
      }
      tracks.forEach(t => t.classList.remove("active"));
      track.classList.add("active");
    });
  });

  setInterval(updateCurrentTime, 1000);
}

function updateCurrentTime() {
  if (!player || typeof player.getCurrentTime !== "function") return;

  const now = player.getCurrentTime();
  const m = Math.floor(now / 60);
  const s = Math.floor(now % 60);
  document.getElementById("currentTime").textContent =
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  let currentIndex = 0;
  tracks.forEach((track, index) => {
    if (now >= Number(track.dataset.time)) currentIndex = index;
  });

  tracks.forEach((track, index) => {
    track.classList.toggle("active", index === currentIndex);
  });
}

// APIを読み込む
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);
