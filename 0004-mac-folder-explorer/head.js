// create folder structure through a nested array
const folderStructure = [
  {
    name: "Documents",
    subfolders: [
      {
        name: "Work",
      },
      {
        name: "Personal",
        subfolders: [
          {
            name: "Photos",
          },
        ],
      },
    ],
  },
  {
    name: "Downloads",
    subfolders: [
      {
        name: "Projects",
      },
    ],
  },
  {
    name: "Music",
    subfolders: [
      {
        name: "Dream Pop",
      },
      {
        name: "Jazz",
      },
      {
        name: "Hip Hop",
      },
    ],
  },
];

/*
const exploreFolder = (innerfolders) => {
  innerfolders.forEach((rootfolder) => {
    const rootLi = document.createElement("li");
    rootLi.innerHTML = rootfolder.name;
    rootLi.classList.add("folder");

    const folders = document.getElementById("folderStructure");
    folders.appendChild(rootLi);

    if (rootfolder.subfolders) {
      const subUl = document.createElement("ul");
      subUl.style.display = "none";
      rootLi.appendChild(subUl);

      const subfolderList = rootfolder.subfolders;

      subfolderList.forEach((parentFolder) => {
        const parentLi = document.createElement("li");
        parentLi.innerHTML = parentFolder.name;
        parentLi.classList.add("folder");
        subUl.appendChild(parentLi);

        if (parentFolder.subfolders) {
          const childUl = document.createElement("ul");
          childUl.style.display = "none";
          parentLi.appendChild(childUl);

          const childSubFolderList = parentFolder.subfolders;

          childSubFolderList.forEach((childFolder) => {
            const childLi = document.createElement("li");
            childLi.innerHTML = childFolder.name;
            childLi.classList.add("folder");
            childUl.appendChild(childLi);
          });

          parentLi.addEventListener("click", (e) => {
            e.stopPropagation();
            childUl.style.display =
              childUl.style.display === "none" ? "block" : "none";
          });
        }
      });

      rootLi.addEventListener("click", (e) => {
        e.stopPropagation();
        subUl.style.display = subUl.style.display === "none" ? "block" : "none";
      });
    }
  });
};

exploreFolder(folderStructure);
*/

const createFolderList = (folders) => {
  const ul = document.createElement("ul");
  folders.forEach((folder) => {
    const li = document.createElement("li");
    li.innerHTML = folder.name;
    li.classList.add("folder");

    ul.appendChild(li);

    // If the folder has subfolders, အပေါ်က createFolderList() ထပ်ဆင့်ခေါ်မည်။
    if (folder.subfolders) {
      // Based Condition အဆုံးသတ်သည့်တိုင်
      const subUl = createFolderList(folder.subfolders); // Recursive Function ကို ခေါ်မည်။
      subUl.style.display = "none";
      li.appendChild(subUl);

      li.addEventListener("click", (e) => {
        e.stopPropagation();
        subUl.style.display = subUl.style.display === "none" ? "block" : "none";
      });
    }
  });

  return ul;
};

const folderList = createFolderList(folderStructure);
document.getElementById("folderStructure").appendChild(folderList);
