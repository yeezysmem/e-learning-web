<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="./public/ai.svg" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">SkillUp</h3>

  <p align="center">
    Modern Online Educational Platform with AI Mentorship & RAG
    <br />
</div>

---

<!-- ABOUT THE PROJECT -->
## About The Project

SkillUp is an advanced online education platform focused on programming and software engineering courses. The platform features structured learning paths, interactive coding tasks, and a built-in code workspace powered by Monaco Editor. 

What sets SkillUp apart is its integrated AI Mentor system backed by RAG (Retrieval-Augmented Generation). The AI analyzes student code solutions in real-time, cross-references task criteria and context, and provides automated, context-aware grading, hints, and detailed explanations.

<img src="./public/github-bg.png" alt="SkillUp Dashboard" width="auto" height="auto">

### Built With

This project leverages a modern web and AI tech stack:

* Next.js
* React
* Tailwind CSS
* Python (AI / RAG Backend)
* Docker
* MySQL / PostgreSQL

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- RAG & AI SYSTEM -->
## AI Mentor & RAG Architecture

SkillUp incorporates an intelligent assistant designed to help students bridge the gap between theory and practical coding:
* RAG Integration: Uses context-retrieval mechanisms to supply the AI model with precise task descriptions, criteria, and solution guidelines.
* Automated Evaluation: Students can write code directly in the browser, run it via secure compilation containers, and submit it for instant AI assessment.
* Gradual Feedback: The AI mentor streams detailed code reviews, debugging hints, and constructive feedback directly into the student workspace.

---

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
* Node.js (v18+ recommended)
* npm / yarn / pnpm
* Python 3.9+ (for the AI/RAG backend services)
* Docker & Docker Compose (optional, for running containerized database or compiler components)
* Database instance (MySQL or PostgreSQL)

### Installation & Setup

1. Clone the repository:
   git clone https://github.com/yourusername/skillup.git
   cd skillup

2. Install Frontend dependencies:
   npm install

3. Configure Environment Variables:
   Create a .env file in the root directory:
   DATABASE_URL="mysql://user:password@localhost:3306/skillup"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_API_URL="http://127.0.0.1:8000"

4. Initialize Database Schema:
   npx prisma db push

5. Run the Development Server:
   npm run dev

Open http://localhost:3000 with your browser to see the result.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- ROADMAP -->
## Roadmap

- [x] Course & Chapter Management (Teacher Dashboard)
- [x] Multi-format Chapters (Lectures, Exams, Challenges)
- [x] Monaco Editor Integration for Coding Tasks
- [x] AI Mentor & RAG-powered Feedback System
- [ ] Student Progress Analytics & Leaderboards
- [ ] Automated Code Execution Sandboxes

<p align="right">(<a href="#readme-top">back to top</a>)</p>
