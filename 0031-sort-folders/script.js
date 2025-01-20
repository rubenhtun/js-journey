// Folder list elements
const folderList = document.getElementById("folderList");
const folders = Array.from(folderList.getElementsByTagName("li"));

// Sort A to Z function
function sortAZ() {
  const sortedFolders = folders.sort((a, b) =>
    a.textContent.localeCompare(b.textContent)
  );
  renderList(sortedFolders);
}

// Sort Z to A function
function sortZA() {
  const sortedFolders = folders.sort((a, b) =>
    b.textContent.localeCompare(a.textContent)
  );
  renderList(sortedFolders);
}

// Re-render the folder list
function renderList(sortedFolders) {
  folderList.innerHTML = "";
  sortedFolders.forEach((folder) => {
    folderList.appendChild(folder);
  });
}

// Add event listeners for buttons
document.getElementById("sortAZ").addEventListener("click", sortAZ);
document.getElementById("sortZA").addEventListener("click", sortZA);
