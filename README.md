# SPOT FIT GYM

The elite training facility designed for results, not resolutions. Located in K Dommasandra, Bengaluru. 

This repository contains the source code for the official SPOT FIT GYM website, built with modern web technologies, smooth scrolling, and interactive 3D elements for an uncompromising performance.

## 🚀 Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Language:** TypeScript
- **Styling:** Vanilla CSS & CSS Modules (Custom Design System)
- **Animations:** GSAP & ScrollTrigger
- **Scroll Handling:** Lenis (Smooth Scrolling)
- **3D Graphics:** React Three Fiber & Drei

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js (version 20+) installed.

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development Server
Run the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build
Create an optimized production build:
```bash
npm run build
```
To test the production build locally:
```bash
npm run preview
```

## 🎨 Architecture & Design

This project avoids large component frameworks (like Tailwind or Bootstrap) in favor of a bespoke, scalable **CSS Modules** architecture, ensuring zero style collisions and minimal payload sizes. 

All animations are heavily optimized using GSAP's ScrollTrigger, and 3D elements are lazily loaded to prioritize the initial page render.

## 📄 License
© 2026 SPOT FIT GYM. All rights reserved.
