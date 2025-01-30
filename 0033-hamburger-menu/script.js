let open = false; // Default by close
document.getElementById("hamburger").addEventListener("click", () => {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden"); // Like an alternative on/off switch
  menu.classList.add("transition", "ease-in-out", "duration-300");

  // Conditional check on every single click
  if (!menu.classList.contains("hidden")) {
    open = true;
  } else {
    open = false;
  }

  // Open
  if (open) {
    document
      .querySelector(".top")
      .classList.add(
        "rotate-45",
        "translate-y-1",
        "transition",
        "duration-300"
      );
    document.querySelector(".middle").classList.remove("block");
    document
      .querySelector(".bottom")
      .classList.add(
        "-rotate-45",
        "-translate-y-1",
        "transition",
        "duration-300"
      );
  } else {
    // Close
    document
      .querySelector(".top")
      .classList.remove(
        "rotate-45",
        "translate-y-1",
        "transition",
        "duration-500"
      );
    document.querySelector(".middle").classList.add("block");
    document
      .querySelector(".bottom")
      .classList.remove(
        "-rotate-45",
        "-translate-y-1",
        "transition",
        "duration-500"
      );
  }
});
