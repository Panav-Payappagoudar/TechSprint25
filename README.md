# 🎓 FindHub - The Ultimate Campus Marketplace

<div align="center">

  ![FindHub Banner](https://via.placeholder.com/1200x400/6366f1/ffffff?text=FindHub+Campus+Marketplace)
  
  **Buy. Sell. Connect. The exclusive marketplace for your university campus.**

  [View Demo](#-demo) • [Features](#-key-features) • [Architecture](#-system-architecture) • [Getting Started](#-getting-started)

</div>

---

## 🚀 Overview

**FindHub** is a modern, mobile-first marketplace application designed specifically for university students. It solves the chaos of WhatsApp groups and fragmented selling channels by providing a centralized, verified platform for buying and selling campus essentials—from textbooks and electronics to dorm furniture.

Built for **TechSprint'25**, FindHub focuses on a premium user experience with glassmorphism aesthetics, smooth animations, and robust security.

## 📱 Demo

<div align="center">
  <!-- You can replace this src with your actual screen recording GIF -->
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzJjYzBiMzYyZDI5YjIzYzY4YjY5YjY4YjY5YjY4YjY5YjY4/xT9IgzoKnwFNmISR8I/giphy.gif" alt="App Demo" width="100%" style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" />
</div>

## ✨ Key Features

- **🔐 Verified Campus Auth**: Secure login via Google Authentication ensures trusted transactions within the campus community.
- **🎨 Premium UI/UX**: A stunning "Glassmorphism" design system with dark mode support, fluid micro-interactions, and responsive layouts.
- **📱 Mobile-First Design**: Optimized for on-the-go usage with a floating bottom navigation bar and touch-friendly interfaces.
- **🛒 Smart Cart**: Persistent shopping cart with real-time total calculation and easy management.
- **🔍 Intelligent Search**: Instant filtering by category, price, and condition to find exactly what you need.
- **📸 Seamless Selling**: Easy listing process with image previews, category selection, and automated form validation.

## 🏗 System Architecture

We utilize a modern serverless architecture to ensure scalability and ease of maintenance.

```mermaid
graph TD
    User[User Device]
    
    subgraph "Frontend (Vite + React)"
        UI[UI Components]
        Router[React Router]
        Context[Context API (Auth, Cart, Theme, Product)]
        UI --> Router
        Router --> Context
    end

    subgraph "Backend Services (Firebase)"
        Auth[Firebase Authentication]
        DB[(Firestore Database)]
        Storage[Firebase Storage]
    end

    User <-->|HTTPS| UI
    Context <-->|SDK| Auth
    Context <-->|SDK| DB
    Context <-->|SDK| Storage
```

## 🛠 Tech Stack

- **Frontend Core**: React 19, Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS3 (Custom Variables, Animations, Glassmorphism)
- **State Management**: React Context API
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Backend**: Firebase (Auth, Firestore)

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Panav-Payappagoudar/TechSprint25.git
   cd FindHub
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📸 Screenshots

| Landing Page | Home Feed | Dark Mode |
|:---:|:---:|:---:|
| ![Landing](https://placehold.co/300x600/6366f1/ffffff?text=Landing+Page) | ![Feed](https://placehold.co/300x600/8b5cf6/ffffff?text=Home+Feed) | ![Dark Mode](https://placehold.co/300x600/0f172a/ffffff?text=Dark+Mode) |

## 🤝 Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

---

<div align="center">
  Built with ❤️ for <b>TechSprint'25</b>
</div>