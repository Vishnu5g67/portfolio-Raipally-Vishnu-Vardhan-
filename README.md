# Raipally Vishnu Vardhan - Personal Portfolio

A modern, high-performance, responsive portfolio website engineered for **Raipally Vishnu Vardhan**, showcasing expertise in Artificial Intelligence & Machine Learning, Software Development (Python, C#, JavaScript), and IT Infrastructure Support.

## 🌟 Key Features

- **Dynamic Hero Section**: Real-time role typewriter animation, instant contact copying pills, social profile badges, and quick resume access.
- **Interactive Project Simulators**:
  - **Password Manager & Secure Notes**: Live password entropy analyzer, requirement audits, and Web Crypto API SHA-256 hash calculator.
  - **CNN Facial Emotion Classifier**: Computer vision pipeline visualization (Input Image -> Conv2D Feature Map -> Softmax Output) with dynamic probability distribution bars.
  - **SVM Lung Cancer Risk Predictor**: Interactive clinical slider interface that calculates real-time hyperplane margin distance, classification stage, and recommended actions.
- **Developer Terminal (`vishnu@portfolio:~$`)**: Interactive retro-modern CLI supporting commands like `help`, `about`, `skills`, `projects`, `education`, `certs`, `contact`, and `sudo hire`.
- **Academic Timeline**: Detailed presentation of B.Tech at Malla Reddy College of Engineering & Technology (78%), Intermediate (76.5%), and SSC (98% Distinction).
- **Core Competencies & Skills Matrix**: Filterable interactive cards covering Programming, AI & ML, Web & DB, and IT/System Support.
- **Theme Switcher**: Dark & Light mode toggle with automatic system preference detection and localStorage persistence.
- **Printable Resume Modal**: Built-in modal layout matching the original resume structure with 1-click **Print / Save as PDF** functionality.
- **Zero Heavy Dependencies**: Pure semantic HTML5, modern CSS3 (custom properties, glassmorphism, flex/grid), and vanilla ES6+ JavaScript.

---

## 📂 Project Structure

```
vishnu-vardhan-portfolio/
│
├── index.html       # Semantic HTML5 markup, accessible ARIA attributes, modals
├── styles.css       # Responsive styling, glassmorphism, custom properties, print CSS
├── script.js        # Interactivity, theme toggle, project simulators, CLI terminal
└── README.md        # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or serve it locally using Python or Node.js:

### Option 1: Python HTTP Server (Recommended)
```bash
# In the project directory:
python -m http.server 3000
```
Then open your browser at: `http://localhost:3000`

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

---

## 🌐 Free 1-Click Deployment

### 1. GitHub Pages
1. Push this directory to a GitHub repository (e.g. `vishnu-portfolio`).
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### 2. Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Follow the CLI prompt to deploy instantly.

### 3. Netlify Drop
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `vishnu-vardhan-portfolio` folder into the browser window.
3. Your site will be online in 5 seconds with a free SSL certificate.

---

## 🛠️ Personalization & Customization

- **Profile Links**: Update the LinkedIn and GitHub URLs in `index.html` inside `<div class="profile-links">` and `<div class="social-pills">`.
- **Contact Details**: If your phone number or email change, update them in `index.html` and `script.js`.
