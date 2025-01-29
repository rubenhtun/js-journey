const folderContainer = document.querySelector(".folder-container");

// Listen to create new folder
document.querySelector(".create-folder").addEventListener("click", () => {
  const folderId = Date.now();

  // Create newFolder element
  const newFolder = document.createElement("div");
  newFolder.className =
    "flex flex-col items-center p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer folder";
  newFolder.id = folderId;

  // Create the folder content
  newFolder.innerHTML = `
                <div class="text-blue-400 text-4xl mb-2">📁</div>
                <input
                    type="text"
                    class="folder-name bg-gray-700 text-white px-2 py-1 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-[90%]"
                    placeholder="Enter name"
                    maxlength="15"
                /> `;

  // Add to parent container
  folderContainer.appendChild(newFolder);

  // Focus the input field
  const input = newFolder.querySelector("input");
  // Make cursor center
  input.focus();

  // When user clicks away, disappear folder
  input.addEventListener("blur", () => {
    const value = input.value.trim(); // Input typing value
    if (value === "") {
      newFolder.remove(); // Remove folder if the name is empty
    } else {
      // Replace input with span containing the name
      const span = document.createElement("span");
      span.className =
        "folder-name text-white text-center w-full overflow-hidden text-ellipsis";
      span.textContent = value;
      input.replaceWith(span);
    }
  });

  // Keydown event for "Enter"
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      input.blur(); // Make input disappear
    }
  });
});

// Sorting folders by name
document.querySelector(".sort-by-name").addEventListener("click", () => {
  const getAllFolders = Array.from(document.querySelectorAll(".folder"));

  getAllFolders.sort((a, b) => {
    const first = a.querySelector(".folder-name").textContent.toLowerCase(); // Change lower case
    const second = b.querySelector(".folder-name").textContent.toLowerCase(); // Change lower case
    return first.localeCompare(second);
  });

  getAllFolders.forEach((folder) => folderContainer.appendChild(folder));
});

// Sorting folders by date
document.querySelector(".sort-by-date").addEventListener("click", () => {
  const getAllFolders = Array.from(document.querySelectorAll(".folder")); // Array of all folders

  getAllFolders.sort((a, b) => Number(a.id) - Number(b.id)); // Sorting them according to their date ids

  getAllFolders.forEach((folder) => folderContainer.appendChild(folder)); // Reappend again
});
