const video = document.getElementById("video");
const statusText = document.getElementById("status");

const faceDetection = new FaceDetection.FaceDetection({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
});

faceDetection.setOptions({
  model: "short",
  minDetectionConfidence: 0.6,
});

faceDetection.onResults((results) => {
  if (results.detections && results.detections.length > 0) {
    statusText.innerText = "✅ Human detected";
    statusText.style.color = "#22c55e";
  } else {
    statusText.innerText = "❌ No human face detected";
    statusText.style.color = "#ef4444";
  }
});

async function start() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });
    video.srcObject = stream;

    const camera = new Camera(video, {
      onFrame: async () => {
        await faceDetection.send({ image: video });
      },
      width: 320,
      height: 240,
    });

    statusText.innerText = "Camera started";
    await camera.start();
  } catch (e) {
    statusText.innerText = "❌ Camera access failed";
    console.error(e);
  }
}

start();
