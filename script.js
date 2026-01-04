const video = document.getElementById("video");
const statusText = document.getElementById("status");

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" }
  });
  video.srcObject = stream;
}

async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri(
    "https://justadudewhohacks.github.io/face-api.js/models"
  );
}

async function detectFace() {
  const result = await faceapi.detectSingleFace(
    video,
    new faceapi.TinyFaceDetectorOptions()
  );

  if (result) {
    statusText.innerText = "✅ Human detected";
    statusText.style.color = "#22c55e";
  } else {
    statusText.innerText = "❌ No human face detected";
    statusText.style.color = "#ef4444";
  }
}

async function init() {
  try {
    statusText.innerText = "Loading face detection model...";
    await loadModels();

    statusText.innerText = "Starting camera...";
    await startCamera();

    video.addEventListener("play", () => {
      setInterval(detectFace, 1000);
    });
  } catch (err) {
    statusText.innerText = "⚠️ Camera or model loading failed";
    console.error(err);
  }
}

init();
