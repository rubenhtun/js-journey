// Music List
const music = [
  {
    title: "Trendsetter",
    artist: "Mood Maze",
    src: "./music/trendsetter.mp3",
    cover: "./covers/Mood-Maze.jpg",
  },
  {
    title: "Night In Kyoto",
    artist: "Avbe",
    src: "./music/night-in-kyoto.mp3",
    cover: "./covers/Avbe.jpg",
  },
  {
    title: "Seize The Day",
    artist: "Andrew Rossi",
    src: "./music/seize-the-day.mp3",
    cover: "./covers/Andrey-Rossi.jpg",
  },
];

let currentMusic = 0;

// Access all DOM elements
const cover = document.getElementById("cover");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const audio = document.getElementById("audio");
const seekBar = document.getElementById("seek-bar");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const prevBtn = document.getElementById("prev");
const playPauseBtn = document.getElementById("play-pause");
const nextBtn = document.getElementById("next");

// Play/Pause Button Action
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.querySelector("i").classList.replace("fa-play", "fa-pause");
  } else {
    audio.pause();
    playPauseBtn.querySelector("i").classList.replace("fa-pause", "fa-play");
  }
});

// Next Button
nextBtn.addEventListener("click", () => {
  currentMusic = (currentMusic + 1) % music.length;
  loadMusic(currentMusic);
  audio.play(); // auto play next song
  playPauseBtn.querySelector("i").classList.replace("fa-play", "fa-pause"); // starting with pause sign
});

// Prev Button
prevBtn.addEventListener("click", () => {
  currentMusic = currentMusic === 0 ? music.length - 1 : currentMusic - 1;
  loadMusic(currentMusic);
  audio.play(); // auto play prev song
  playPauseBtn.querySelector("i").classList.replace("fa-play", "fa-pause"); // starting with pause sign
});

// Loading Music
const loadMusic = (i) => {
  cover.src = music[i].cover;
  songTitle.textContent = music[i].title;
  artist.textContent = music[i].artist;
  audio.src = music[i].src;
  seekBar.value = 0;
};

// Initial Load
loadMusic(currentMusic);

// Music Total Duration Using currentTime && Duration Properties
audio.addEventListener("loadedmetadata", () => {
  totalTime.textContent = time(audio.duration);
});

// Seek Bar & Current Time
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = time(audio.currentTime);
  }
});

// If User Dragged On Seek Bar As He Wants
seekBar.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  }
});

// Playing Time
const time = (seconds) => {
  // Divide seconds into minutes and seconds
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
};
