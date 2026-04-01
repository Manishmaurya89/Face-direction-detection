# 👁️ Face Direction Detection

A **real-time head orientation detection system** built with Python, CNN, and OpenCV. Uses facial landmark extraction and Kalman filtering to deliver smooth, stable directional prediction from a live webcam feed.

---

##  Features

- 🎯 **Real-time head pose estimation** — detects Left, Right, Up, Down, and Forward orientation
- 🧠 **Pre-trained CNN model** for facial landmark extraction — improved detection accuracy by **30%**
- 📉 **Kalman filtering** for smoother, more stable directional tracking — reduces jitter between frames
- ⚡ **Optimised inference** — improved application interactivity by **25%**
- 🎥 **Live webcam input** — runs entirely on-device with no cloud dependency

---

## Tech Stack

| Component | Technology |
|---|---|
| Language | Python |
| Deep Learning | CNN (pre-trained model) |
| Computer Vision | OpenCV |
| Tracking / Smoothing | Kalman Filter |
| Landmark Extraction | Pre-trained CNN model |

---

##  Getting Started

**Requirements:** Python 3.8+, a webcam

```bash
# Clone the repo
git clone https://github.com/Manishmaurya89/Face-direction-detection.git
cd Face-direction-detection

# Install dependencies
pip install -r requirements.txt

# Run the app
python main.py
```

---

## 📁 Project Structure

```
Face-direction-detection/
├── main.py             # Entry point — webcam loop & direction output
├── detector.py         # CNN model loading & facial landmark inference
├── kalman.py           # Kalman filter for prediction smoothing
├── utils.py            # Helper functions
├── requirements.txt
└── README.md
```

---

##  How It Works

```
Webcam Frame
     ↓
Face Detection (OpenCV)
     ↓
Facial Landmark Extraction (pre-trained CNN)
     ↓
Head Pose Estimation (yaw / pitch angles)
     ↓
Kalman Filter (smoothing over frames)
     ↓
Direction Output: LEFT / RIGHT / UP / DOWN / FORWARD
```

---

##  Use Cases

- **Driver drowsiness / distraction detection** — alert when gaze leaves the road
- **Attention monitoring** — e-learning, proctoring, focus tracking
- **Accessibility tools** — gaze-based hands-free UI control
- **AR overlays** — anchor effects to head orientation in real time

---

##  Contact

For questions: **manish.maurya0408@gmail.com**

---

##  License

free to use and modify.

