const videoLinkInput = document.getElementById("videoLinkInput");
const addVideoButton = document.getElementById("addVideoButton");

videoLinkInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    copyVideoLink();
    videoDisplay();
  }
});

addVideoButton.addEventListener("click", () => {
  copyVideoLink();
  videoDisplay();
});

const extractVideoID = (urlLink) => {
  const regex = // regular expression // video id ထုတ်ယူခြင်း
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = urlLink.match(regex);
  console.log(match[1]); // youtube video id ကို ရယူနိုင်ရန် match[1] ကို အသုံးပြုရပါသည်။
  return match ? match[1] : null;
};

let videoIdList = [];

const copyVideoLink = () => {
  const copyLink = videoLinkInput.value.trim();
  const videoID = extractVideoID(copyLink);
  if (videoID) {
    const embedLink = `https://www.youtube.com/embed/${videoID}`;
    videoIdList.push(embedLink);
    videoLinkInput.value = ""; // Clear the input field after adding
  } else {
    alert("Please enter a valid YouTube URL.");
  }
};

const videoDisplay = () => {
  const videoGrid = document.getElementById("videoGrid");
  videoGrid.innerHTML = ""; // Clear previous video elements every single rendering

  videoIdList.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.className = "bg-gray-800 rounded-lg overflow-hidden";
    videoCard.innerHTML = `
      <iframe
        src="${video}"
        class="w-full h-48 rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div class="p-4">
        <h3 class="font-bold text-gray-200">Video Title</h3>
        <p class="text-sm text-gray-400">YouTube Video</p>
      </div>
    `;

    videoGrid.appendChild(videoCard);
  });
};

const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });
} else {
  console.error("Sidebar or sidebarToggle element not found.");
}
