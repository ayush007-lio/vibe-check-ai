# 🎭 VibeCheck AI (Emotion Mirror)

> **A real-time "Magic Mirror" that detects your emotions and adapts the UI to match your vibe.**

![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Face-API](https://img.shields.io/badge/Face--API.js-Privacy_First-green?style=for-the-badge)

## 🌟 About The Project

**VibeCheck AI** is an interactive web experiment that bridges the gap between human emotion and digital interfaces. Using computer vision entirely in the browser, it analyzes facial expressions via webcam and dynamically transforms the website's theme, colors, and animations to reflect how you feel.

If you smile, the screen glows **Gold** 🎉. If you frown, it turns a comforting **Blue** 💙.

### ✨ Key Features

* **🧠 Real-Time Emotion Detection:** Detects 7 distinct emotions: *Happy, Sad, Angry, Fear, Disgust, Surprise, and Neutral.*
* **🎨 Dynamic UI/UX:** The entire interface (backgrounds, gradients, floating emojis, text) changes instantly based on the detected mood.
* **📸 Mood Snapshot:** Capture a photo of your current "vibe" with the stats overlay to share with friends.
* **🔒 Privacy First:** No video data is sent to any server. All AI processing happens locally in your browser using `face-api.js`.
* **🕷️ Debug Mode:** Visualize the 68-point facial landmark mesh used by the AI to understand your expressions.

---

## 🚀 Demo

**[🔴 Live Demo Link Here]** *(Replace this with your Vercel/Netlify link after deploying!)*

![Screenshot of App](public/screenshot.png)
*(Note: Add a screenshot of your app to the public folder and name it screenshot.png)*

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite
* **Styling:** Tailwind CSS, Lucide Icons
* **AI/ML:** `face-api.js` (TensorFlow.js wrapper)
* **Animation:** CSS Transitions & Keyframes

---

## ⚡ Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/ayush007-lio/vibe-check-ai.git](https://github.com/ayush007-lio/vibe-check-ai.git)
    cd vibe-check-ai
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open your browser**
    Navigate to `http://localhost:8080` (or the port shown in your terminal).

---

## 🧩 How It Works

1.  **Model Loading:** On startup, the app fetches pre-trained AI models (`ssdMobilenetv1` and `faceExpressionNet`) from the CDN.
2.  **Video Stream:** It requests access to the user's webcam via the HTML5 Media API.
3.  **Inference Loop:** The app analyzes the video feed every ~100ms to detect faces and classify expressions with a confidence score (e.g., 98% Happy).
4.  **State Management:** React state updates the "Dominant Emotion," which triggers CSS classes to repaint the UI theme.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ by <b>Ayush S</b>
</p>
