const resultContainer = document.getElementById("resultContainer");
const errorDiv = document.getElementById("errorDiv");
const youtubeSongLink = document.getElementById("youtube_song_link");
const fetchBtn = document.getElementById("fetchBtn");
const translationDiv = document.getElementById("translationDiv");
const loadingState = document.getElementById("loadingState");
const trackCard = document.getElementById("trackCard");
const playBtn = document.getElementById("playBtn");
const likeBtn = document.getElementById("likeBtn");
const likeIcon = document.getElementById("likeIcon");
const likeText = document.getElementById("likeText");
const shareBtn = document.getElementById("shareBtn");
const playOverlay = document.getElementById("playOverlay");
const thumbnailContainer = document.getElementById("thumbnailContainer");

let currentVideoId = "";
let isLiked = false;

function extractVideoId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function playVideo() {
  if (currentVideoId) {
    window.open(`https://www.youtube.com/watch?v=${currentVideoId}`, "_blank");
  }
}

function toggleLike() {
  isLiked = !isLiked;
  if (isLiked) {
    likeIcon.classList.add("liked");
    likeIcon.setAttribute("fill", "currentColor");
    likeText.textContent = "Liked";
    // Here you could add code to save the liked state to localStorage
  } else {
    likeIcon.classList.remove("liked");
    likeIcon.removeAttribute("fill");
    likeText.textContent = "Like";
  }
}

function shareVideo() {
  if (currentVideoId) {
    const url = `https://www.youtube.com/watch?v=${currentVideoId}`;
    if (navigator.share) {
      navigator
        .share({
          title: document.getElementById("trackTitle").textContent,
          text: `Check out this song: ${
            document.getElementById("trackTitle").textContent
          }`,
          url: url,
        })
        .catch((err) => {
          console.log("Error sharing:", err);
          copyToClipboard(url);
        });
    } else {
      copyToClipboard(url);
    }
  }
}

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  // Show a temporary notification
  const notification = document.createElement("div");
  notification.textContent = "Link copied to clipboard!";
  notification.className =
    "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-cyan-600 text-gray-900 px-4 py-2 rounded-lg shadow-lg font-medium";
  document.body.appendChild(notification);
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 2000);
}

async function fetchTranslation(title) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_API_KEY_HERE", // Add your OpenRouter AI API key here
          "HTTP-Referer": "https://neon-tune.vercel.app",
          "X-Title": "Neon Tune",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "user",
              content: `Based on the song title "${title}", provide the full lyrics of the song (or a plausible version if exact lyrics are unavailable) and translate them into Burmese. Return only the translated lyrics in Burmese, without including the original lyrics or the title. Do not translate the title itself.`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return `Translation error: ${error.message}`;
  }
}

function showError(message) {
  errorDiv.innerHTML = `
          <div class="bg-pink-900/20 border border-pink-500/30 rounded-xl p-4 max-w-md mx-auto">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-pink-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-pink-300 font-medium">${message}</span>
            </div>
          </div>
        `;
}

async function fetchVideoInfo() {
  errorDiv.innerHTML = "";
  resultContainer.classList.add("hidden");
  loadingState.classList.remove("hidden");

  fetchBtn.disabled = true;
  fetchBtn.classList.add("pulse-loading");

  const link = youtubeSongLink.value.trim();
  currentVideoId = extractVideoId(link);
  const YOUTUBE_API_KEY = ""; // Add your api key

  if (!currentVideoId) {
    showError("Please enter a valid YouTube video URL.");
    loadingState.classList.add("hidden");
    fetchBtn.disabled = false;
    fetchBtn.classList.remove("pulse-loading");
    return;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${currentVideoId}&key=${YOUTUBE_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }
    const data = await response.json();

    if (!data.items.length) {
      showError("No video found with the provided ID.");
      loadingState.classList.add("hidden");
      fetchBtn.disabled = false;
      fetchBtn.classList.remove("pulse-loading");
      return;
    }

    const snippet = data.items[0].snippet;
    const title = snippet.title;
    const artist = snippet.channelTitle;
    const publishedDate = new Date(snippet.publishedAt).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    // Update track info
    document.getElementById("trackTitle").textContent = title;
    document.getElementById("trackArtist").textContent = artist;
    document.getElementById(
      "trackDate"
    ).textContent = `Published ${publishedDate}`;

    // Update thumbnail
    document.getElementById("thumbnailContainer").innerHTML = `
            <img
              src="${snippet.thumbnails.high.url}"
              alt="${title}"
              class="w-full h-full object-cover"
            />
            <div id="playOverlay" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <div class="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                <svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          `;

    // Re-attach event listener to the new play overlay
    document.getElementById("playOverlay").addEventListener("click", playVideo);

    // Fetch translation
    const translation = await fetchTranslation(title);
    translationDiv.innerHTML = `
            <div class="text-cyan-200 leading-relaxed whitespace-pre-line">${translation}</div>
          `;

    loadingState.classList.add("hidden");
    resultContainer.classList.remove("hidden");
  } catch (error) {
    showError(`Error: ${error.message}`);
    loadingState.classList.add("hidden");
  }

  fetchBtn.disabled = false;
  fetchBtn.classList.remove("pulse-loading");
}

// Event listeners
fetchBtn.addEventListener("click", fetchVideoInfo);
youtubeSongLink.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchVideoInfo();
  }
});
playBtn.addEventListener("click", playVideo);
thumbnailContainer.addEventListener("click", (e) => {
  if (e.target.closest("#playOverlay")) {
    playVideo();
  }
});
likeBtn.addEventListener("click", toggleLike);
shareBtn.addEventListener("click", shareVideo);
