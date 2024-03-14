const image = document.getElementById("cover");
const musicName = document.getElementById("music-name");
const musicArtist = document.getElementById("music-artist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const playerProgress = document.getElementById("player-progress");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");
const backGround = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "./31077.mp3",
    displayName: "3107-7",
    cover: "./bg1.jpg",
    artist: "W/N",
  },

  {
    path: "./id2022.mp3",
    displayName: "id2022",
    cover: "./bg2.jpg",
    artist: "W/N",
  },

  {
    path: "./ghequa.mp3",
    displayName: "Ghé Qua",
    cover: "./bg4.jpg",
    artist: "Dick x PC x Tofu",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (!isPlaying) {
    playMusic();
  } else {
    pauseMusic();
  }
}

function playMusic() {
  isPlaying = true;
  // Change play button icon
  playBtn.classList.replace("fa-play", "fa-pause");
  // Set button hover title
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  // Change pause button icon
  playBtn.classList.replace("fa-pause", "fa-play");
  // Set button hover title
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  musicName.textContent = song.displayName;
  musicArtist.textContent = song.artist;
  image.src = song.cover;
  backGround.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth; // lấy chiều rộng của phần tử
  const clickX = e.offsetX; // lấy giá trị hoành độ x
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => {
  changeMusic(-1);
});
nextBtn.addEventListener("click", () => {
  changeMusic(1);
});
music.addEventListener("ended", () => {
  changeMusic(1);
});
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);
loadMusic(songs[musicIndex]);
