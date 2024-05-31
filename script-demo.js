// script.js
const inputs = document.getElementById("inputs");
const message = document.getElementById("message");
const hintContainer = document.getElementById("hint");
const nameInput = document.getElementById("nameInput");
let attempts = 0;  // Track the number of attempts

inputs.addEventListener("input", function (e) {
  const target = e.target;
  const val = target.value;

  if (isNaN(val)) {
    target.value = "";
    return;
  }

  if (val !== "") {
    const next = target.nextElementSibling;
    if (next) {
      next.focus();
    }
  }
});

inputs.addEventListener("keyup", function (e) {
  const target = e.target;
  const key = e.key.toLowerCase();

  if (key === "backspace" || key === "delete") {
    target.value = "";
    const prev = target.previousElementSibling;
    if (prev) {
      prev.focus();
    }
    return;
  }
});

document.getElementById("redirectButton").addEventListener("click", redirectToVideo);

// Clear message and hint when user starts entering OTP again
inputs.addEventListener("focus", function() {
  message.textContent = "";
  hintContainer.textContent = "";
  hintContainer.style.display = "none";
});

// Clear inputs when "Clear" button is clicked
document.getElementById("clearButton").addEventListener("click", function() {
  Array.from(document.querySelectorAll('.input')).forEach(input => input.value = "");
  // Focus on the first input again
  document.querySelector('.input:first-child').focus();
  // Clear message and hint
  message.textContent = "";
  hintContainer.textContent = "";
  hintContainer.style.display = "none";
  // Reset attempts
  attempts = 0;
});

// Submit OTP when Enter key is pressed
inputs.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    redirectToVideo();
  }
});

function redirectToVideo() {
  const otp = Array.from(document.querySelectorAll('.input')).map(input => input.value).join('');
  
  // Map OTPs to video URLs
  const videoUrls = {
    "200422": { name: "kedar", url: "/pages/kedar_video.html" },
    "250522": { name: "sampada", url: "/pages/sam_video.html" },
    "190923": { name: "athira", url: "/pages/athira_video.html" },
    "190722": { name: "jaykumar", url: "/pages/jay_video.html" },
    "130722": { name: "srividhya", url: "/pages/sri_video.html" },
    "290424": { name: "amey", url: "/pages/amey_video.html" }
    // Add more OTPs and their corresponding video URLs as needed
  };

  if (otp in videoUrls) {
    const user = videoUrls[otp];
    if (user.name === nameInput.value.toLowerCase()) {
      // Redirect to the corresponding video URL upon successful verification
      window.location.href = user.url;
    } else {
      // Incorrect name for the OTP
      message.textContent = "Incorrect name for the OTP. Please try again.";
      attempts++;
      checkAttempts(nameInput.value);
    }
  } else {
    // Incorrect OTP, reset inputs
    Array.from(document.querySelectorAll('.input')).forEach(input => input.value = "");
    // Focus on the first input again
    document.querySelector('.input:first-child').focus();
    // Display incorrect message
    message.textContent = "Incorrect OTP. Please try again.";
    attempts++;
    // Check attempts and display hint if needed
    checkAttempts(nameInput.value);
  }
}

function checkAttempts(name) {
  if (attempts >= 3) {
    displayHint(name);
    attempts = 0;  // Reset attempts after showing hint
  }
}

function displayHint(name) {
  const hints = {
    "kedar": "✨❤",
    "sampada": "Happy days",
    "athira": "Happiness 💗",
    "jaykumar": "The Box📦",
    "srividhya": "times like these. <3 ",
    "amey": " Freestylin/Feelstylin 🥷"
    // Add more hints for other users
  };

  const hint = hints[name.toLowerCase()] || "I don't think you have the access to this!!! Check your name";
  hintContainer.textContent = "Hint: " + hint;
  hintContainer.style.display = "block";
}
