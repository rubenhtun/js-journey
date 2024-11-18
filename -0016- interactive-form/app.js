const form = document.getElementById("interactiveForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value;

  const nameErr = document.getElementById("nameError");
  const emailErr = document.getElementById("emailError");

  let isValid = true;

  if (!name) {
    nameErr.classList.remove("hidden");
    isValid = false;
  } else {
    nameErr.classList.add("hidden");
  }

  if (!email) {
    emailErr.classList.remove("hidden");
    isValid = false;
  } else {
    emailErr.classList.add("hidden");
  }

  if (!role) {
    alert("Please select a role!");
    isValid = false;
  }

  if (isValid) {
    alert(
      `Form submitted successfully!\nName: ${name}\nEmail: ${email}\nRole: ${role}`
    );

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("role").value = "";
  }
});
