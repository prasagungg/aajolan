# AAJOLAN

> **"Hindari Kaktus, Tundukkan Omongan Pedas."** > _(Avoid the Cactus, Duck the Spicy Gossip.)_

**AAJOLAN** is a satirical endless runner game built with **Svelte 5 (Runes)** and **Tailwind CSS**.

In this game, the player doesn't just run for survival, they run to escape the harsh reality of adulthood in Indonesia.
You must dodge physical obstacles (Cacti) and intrusive questions from nosy neighbors (like _"When are you getting married?"_).

---

## Key Features

- **Powered by Svelte 5:** Utilizes the new Runes system (`$state`, `$derived`, `$props`) for high-performance reactivity.
- **Modern Arcade UI:** Styled with Tailwind CSS, featuring glassmorphism scoreboards, dynamic backgrounds, and animated clouds.
- **Dual Mechanics:**
  - **Jump:** To avoid ground obstacles.
  - **Duck:** To avoid flying chat bubbles (head-height obstacles).
  - **Fast Fall:** Press down in mid-air to land quickly.
- **Progressive Difficulty:** The game speed increases as your score gets higher.
- **Relatable Content:** Features a dataset of over 50 culturally relevant "annoying questions."

---

## 🎮 How to Play

The goal is simple: **Don't get hit.**

| Obstacle Type    | Visual         | Location              | Action Required       |
| :--------------- | :------------- | :-------------------- | :-------------------- |
| **The Cactus**   | 🌵 Image       | Ground                | **JUMP** (Space / Up) |
| **The Neighbor** | 💬 Chat Bubble | Floating (Head Level) | **DUCK** (Down)       |

### Controls

| Key                | Action        | Context                                                        |
| :----------------- | :------------ | :------------------------------------------------------------- |
| **SPACE** or **↑** | **Jump**      | Basic jump to clear cacti.                                     |
| **↓ (Arrow Down)** | **Duck**      | Makes character shorter to slide under text bubbles.           |
| **↓ (Arrow Down)** | **Fast Fall** | If pressed while in the air, you drop to the ground instantly. |

---

## 🛠️ Tech Stack

- **Framework:** [Svelte 5](https://svelte.dev/) (Release Candidate/Beta)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)

---

## 🚀 Installation & Setup

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/your-username/lari-dari-tetangga.git](https://github.com/your-username/lari-dari-tetangga.git)
    cd lari-dari-tetangga
    ```

2.  **Install dependencies**

    ```bash
    pnpm install
    ```

3.  **Run the development server**

    ```bash
    pnpm run dev
    ```

4.  **Play!**
    Open your browser and navigate to `http://localhost:5173`.
