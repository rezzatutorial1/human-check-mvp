const video = document.getElementById("video");
const statusText = document.getElementById("status");

// روشن کردن دوربین
async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

// لود مدل تشخیص صورت
async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri(
    "https://justadudewhohacks.github.io/face-api.js/models"
  );
}

// تشخیص صورت
async function detectFace() {
  const detection = await faceapi.detectSingleFace(
    video,
    new faceapi.TinyFaceDetectorOptions()
  );

  if (detection) {
    statusText.innerText = "✅ انسان تشخیص داده شد";
    statusText.style.color = "lime";
  } else {
    statusText.innerText = "❌ صورتی شناسایی نشد";
    statusText.style.color = "red";
  }
}

// شروع برنامه
async function init() {
  statusText.innerText = "⏳ در حال بارگذاری مدل...";
  await loadModels();

  statusText.innerText = "📷 روشن کردن دوربین...";
  await startCamera();

  video.addEventListener("play", () => {
    setInterval(detectFace, 1000);
  });
}

init();
