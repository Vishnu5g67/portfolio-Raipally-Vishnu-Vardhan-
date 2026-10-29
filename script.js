/**
 * RAIPALLY VISHNU VARDHAN - PORTFOLIO INTERACTIVITY
 * High-performance, Accessible, Vanilla ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingAnimation();
  initScrollspy();
  initMobileMenu();
  initModals();
  initClipboard();
  initSkillsFilter();
  initSecurityDemo();
  initEmotionDemo();
  initCancerSvmDemo();
  initTerminal();
  initContactForm();
  updateFooterYear();
});

/* ====================================================
   1. THEME TOGGLE & PERSISTENCE
   ==================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      showToast(`Switched to ${targetTheme} mode`);
    });
  }

  // Listen for system theme changes if user has no stored preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  });
}

/* ====================================================
   2. TYPING ANIMATION IN HERO
   ==================================================== */
function initTypingAnimation() {
  const textElement = document.getElementById('typing-text');
  if (!textElement) return;

  const roles = [
    'AI & Machine Learning',
    'Python & Deep Learning',
    'Computer Vision & CNNs',
    'C# & Software Engineering',
    'IT & System Support Specialist',
    'Statistical Modeling & SVM'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      charIndex--;
      textElement.textContent = currentRole.substring(0, charIndex);
      typingSpeed = 45;
    } else {
      charIndex++;
      textElement.textContent = currentRole.substring(0, charIndex);
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause when complete
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ====================================================
   3. SCROLLSPY NAVIGATION
   ==================================================== */
function initScrollspy() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');
  const supportsScrollTargetGroup = CSS.supports && CSS.supports('scroll-target-group: auto');

  if (supportsScrollTargetGroup) {
    const syncAriaCurrent = () => {
      const currentLink = document.querySelector('.nav-link:target-current');
      navLinks.forEach(link => {
        link.setAttribute('aria-current', link === currentLink ? 'true' : 'false');
      });
    };
    syncAriaCurrent();
    document.addEventListener('scrollend', syncAriaCurrent);
  } else {
    // IntersectionObserver Fallback for modern standard compliance
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle(':target-current', isActive);
            link.setAttribute('aria-current', isActive ? 'true' : 'false');
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));
  }
}

/* ====================================================
   4. MOBILE MENU DRAWER
   ==================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileBtn || !navMenu) return;

  mobileBtn.addEventListener('click', () => {
    const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', !isExpanded);
    mobileBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileBtn.setAttribute('aria-expanded', 'false');
      mobileBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* ====================================================
   5. MODALS & POPUPS
   ==================================================== */
function initModals() {
  // Resume Modal triggers
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Interactive Project Demo triggers
  const demoButtons = document.querySelectorAll('.open-demo-btn');
  const closeDemoButtons = document.querySelectorAll('[data-close-demo]');

  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const demoId = btn.getAttribute('data-demo');
      const targetModal = document.getElementById(`${demoId}-modal`);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeDemoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modals on overlay backdrop click or Escape key
  const allModals = document.querySelectorAll('.modal-overlay');
  allModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach(modal => {
        if (modal.classList.contains('active')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  });
}

/* ====================================================
   6. CLIPBOARD HELPERS & TOASTS
   ==================================================== */
function initClipboard() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast('Failed to copy text', true);
        });
      }
    });
  });
}

function showToast(message, isError = false) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (isError) toast.style.borderColor = '#ef4444';

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${isError ? '#ef4444' : '#10b981'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      ${isError 
        ? '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>'
        : '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
      }
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3000);
}

/* ====================================================
   7. SKILLS CATEGORY FILTER
   ==================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ====================================================
   8. PROJECT 1 DEMO: PASSWORD & CRYPTOGRAPHY SIMULATOR
   ==================================================== */
function initSecurityDemo() {
  const pwdInput = document.getElementById('demo-pwd-input');
  const generateBtn = document.getElementById('btn-generate-pwd');
  const strengthLabel = document.getElementById('pwd-strength-label');
  const strengthFill = document.getElementById('pwd-strength-fill');
  const noteInput = document.getElementById('demo-note-input');
  const aesBox = document.getElementById('aes-cipher-box');
  const shaBox = document.getElementById('sha-hash-box');

  const auditLen = document.getElementById('audit-len');
  const auditUpper = document.getElementById('audit-upper');
  const auditNum = document.getElementById('audit-num');
  const auditSym = document.getElementById('audit-sym');

  function calculateStrength(pwd) {
    let score = 0;
    const hasLen = pwd.length >= 12;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNum = /[0-9]/.test(pwd);
    const hasSym = /[^A-Za-z0-9]/.test(pwd);

    if (auditLen) auditLen.classList.toggle('valid', hasLen);
    if (auditUpper) auditUpper.classList.toggle('valid', hasUpper);
    if (auditNum) auditNum.classList.toggle('valid', hasNum);
    if (auditSym) auditSym.classList.toggle('valid', hasSym);

    if (pwd.length >= 8) score += 20;
    if (hasLen) score += 20;
    if (hasUpper && hasLower) score += 20;
    if (hasNum) score += 20;
    if (hasSym) score += 20;

    let label = 'Weak';
    let color = '#ef4444';

    if (score >= 85) {
      label = 'Very Strong (Entropy: ~98 bits)';
      color = '#10b981';
    } else if (score >= 60) {
      label = 'Strong';
      color = '#06b6d4';
    } else if (score >= 40) {
      label = 'Moderate';
      color = '#f59e0b';
    }

    if (strengthLabel) {
      strengthLabel.textContent = label;
      strengthLabel.style.color = color;
    }
    if (strengthFill) {
      strengthFill.style.width = `${score}%`;
      strengthFill.style.backgroundColor = color;
    }
  }

  // Real Web Crypto API SHA-256 calculation
  async function updateHashes() {
    const text = (noteInput ? noteInput.value : '') || 'Secret';
    try {
      const msgUint8 = new TextEncoder().encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      if (shaBox) shaBox.textContent = hashHex;

      // Simulated AES-256 base64 cipher
      const pseudoCipher = 'U2FsdGVkX19' + btoa(text).slice(0, 24) + '...' + hashHex.slice(0, 16);
      if (aesBox) aesBox.textContent = pseudoCipher;
    } catch (e) {
      if (shaBox) shaBox.textContent = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    }
  }

  function generateRandomPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (pwdInput) {
      pwdInput.value = result;
      calculateStrength(result);
    }
  }

  if (pwdInput) {
    pwdInput.addEventListener('input', (e) => calculateStrength(e.target.value));
    calculateStrength(pwdInput.value);
  }

  if (generateBtn) {
    generateBtn.addEventListener('click', generateRandomPassword);
  }

  if (noteInput) {
    noteInput.addEventListener('input', updateHashes);
    updateHashes();
  }
}

/* ====================================================
   9. PROJECT 2 DEMO: CNN EMOTION DETECTION SIMULATOR
   ==================================================== */
function initEmotionDemo() {
  const presetButtons = document.querySelectorAll('.preset-btn');
  const inputPreview = document.getElementById('cnn-input-preview');
  const predictedEmotion = document.getElementById('cnn-predicted-emotion');
  const confidencePct = document.getElementById('cnn-confidence-pct');

  const probBars = {
    Happy: { bar: document.getElementById('prob-happy'), val: document.getElementById('val-happy') },
    Neutral: { bar: document.getElementById('prob-neutral'), val: document.getElementById('val-neutral') },
    Surprise: { bar: document.getElementById('prob-surprise'), val: document.getElementById('val-surprise') },
    Sad: { bar: document.getElementById('prob-sad'), val: document.getElementById('val-sad') }
  };

  const emotionPresets = {
    Happy: { emoji: '😊', probs: { Happy: 94, Neutral: 3, Surprise: 2, Sad: 1 }, conf: '94.2%' },
    Focused: { emoji: '🧐', probs: { Happy: 4, Neutral: 88, Surprise: 3, Sad: 5 }, conf: '88.5%' },
    Surprised: { emoji: '😲', probs: { Happy: 5, Neutral: 2, Surprise: 91, Sad: 2 }, conf: '91.0%' },
    Thoughtful: { emoji: '🤔', probs: { Happy: 6, Neutral: 42, Surprise: 7, Sad: 45 }, conf: '85.3%' }
  };

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const emotionKey = btn.getAttribute('data-emotion');
      const data = emotionPresets[emotionKey];
      if (!data) return;

      if (inputPreview) {
        inputPreview.querySelector('.preview-emoji').textContent = data.emoji;
      }
      if (predictedEmotion) predictedEmotion.textContent = emotionKey;
      if (confidencePct) confidencePct.textContent = data.conf;

      // Update probability distributions
      Object.keys(probBars).forEach(cls => {
        const item = probBars[cls];
        const pct = data.probs[cls] || 1;
        if (item.bar) item.bar.style.width = `${pct}%`;
        if (item.val) item.val.textContent = `${pct}%`;
      });
    });
  });
}

/* ====================================================
   10. PROJECT 3 DEMO: LUNG CANCER SVM PREDICTOR
   ==================================================== */
function initCancerSvmDemo() {
  const sliderAge = document.getElementById('slider-age');
  const sliderSmoking = document.getElementById('slider-smoking');
  const sliderPollution = document.getElementById('slider-pollution');
  const sliderSymptoms = document.getElementById('slider-symptoms');

  const valAge = document.getElementById('val-age');
  const valSmoking = document.getElementById('val-smoking');
  const valPollution = document.getElementById('val-pollution');
  const valSymptoms = document.getElementById('val-symptoms');

  const verdictEl = document.getElementById('svm-verdict');
  const marginEl = document.getElementById('svm-margin');
  const confEl = document.getElementById('svm-confidence');
  const actionEl = document.getElementById('svm-action');

  const smokingLabels = ['None (0)', 'Light (1-5 cigs)', 'Moderate (10-15)', 'Heavy (20+)', 'Severe (30+)'];

  function recalculate() {
    const age = parseInt(sliderAge.value, 10);
    const smoking = parseInt(sliderSmoking.value, 10);
    const pollution = parseInt(sliderPollution.value, 10);
    const symptoms = parseInt(sliderSymptoms.value, 10);

    if (valAge) valAge.textContent = `${age} years`;
    if (valSmoking) valSmoking.textContent = smokingLabels[smoking] || `Level ${smoking}`;
    if (valPollution) valPollution.textContent = `${pollution}/10 Index`;
    if (valSymptoms) valSymptoms.textContent = `${symptoms}/10 Severity`;

    // Simulated SVM Linear Decision Plane Equation:
    // w * x + b
    const rawScore = ((age - 45) * 0.04) + (smoking * 1.1) + (pollution * 0.35) + (symptoms * 0.7) - 6.2;
    const margin = rawScore.toFixed(2);

    let verdict = 'Low Risk / Early Detection';
    let color = '#10b981';
    let conf = 90 - Math.min(Math.abs(rawScore) * 3, 20);
    let action = 'Routine annual checkup recommended';

    if (rawScore > 1.8) {
      verdict = 'High Risk / Immediate Screening Advised';
      color = '#ef4444';
      conf = Math.min(94, 80 + rawScore * 3);
      action = 'Urgent low-dose CT chest scan & oncologist consult';
    } else if (rawScore > -0.8) {
      verdict = 'Moderate Risk / Preventive Monitoring';
      color = '#f59e0b';
      conf = Math.min(88, 75 + Math.abs(rawScore) * 4);
      action = 'Pulmonary function test & smoking cessation plan';
    } else {
      conf = Math.min(96, 85 + Math.abs(rawScore) * 2.5);
    }

    if (verdictEl) {
      verdictEl.textContent = verdict;
      verdictEl.style.color = color;
    }
    if (marginEl) {
      marginEl.textContent = `${rawScore > 0 ? '+' : ''}${margin} (Hyperplane Margin)`;
    }
    if (confEl) {
      confEl.textContent = `${conf.toFixed(1)}%`;
    }
    if (actionEl) {
      actionEl.textContent = action;
    }
  }

  [sliderAge, sliderSmoking, sliderPollution, sliderSymptoms].forEach(slider => {
    if (slider) slider.addEventListener('input', recalculate);
  });
}

/* ====================================================
   11. DEVELOPER TERMINAL INTERFACE
   ==================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  const clearBtn = document.getElementById('term-clear-btn');
  const chips = document.querySelectorAll('.term-chip');

  if (!terminalInput || !terminalBody) return;

  const commands = {
    help: `Available Commands:
  • <span class="term-highlight">about</span>        - Summary of background and specialization
  • <span class="term-highlight">skills</span>       - List technical proficiencies & developer tools
  • <span class="term-highlight">projects</span>     - Overview of key engineering projects
  • <span class="term-highlight">education</span>    - Academic record & college details
  • <span class="term-highlight">certs</span>        - Professional certifications
  • <span class="term-highlight">contact</span>      - Email, phone, location & profiles
  • <span class="term-highlight">sudo hire</span>    - Issue offer / hire Vishnu Vardhan
  • <span class="term-highlight">clear</span>        - Clear terminal history`,

    about: `<span class="term-cyan">Raipally Vishnu Vardhan</span> - B.Tech in CSE (AI & ML)
Specialized in Artificial Intelligence, Neural Networks, Python development, and IT systems troubleshooting.
Skilled in resolving OS, networking, server problems, and engineering production software.`,

    skills: `<span class="term-green">Languages:</span> Python, C#, JavaScript (ES6+)
<span class="term-green">AI & ML:</span> TensorFlow, CNN, OpenCV, Scikit-learn, SVM, Preprocessing
<span class="term-green">Web & DB:</span> HTML5, CSS3, Responsive UI, MySQL, Cryptography
<span class="term-green">IT Support:</span> OS Troubleshooting, Networking, Server Updates, Hardware Diagnosis
<span class="term-green">Dev Tools:</span> Git, GitHub, VS Code`,

    projects: `<span class="term-amber">[1] Password Manager & Secure Notes:</span> Python, Cryptography, HTML, CSS, JS
    Encrypted storage, AES/SHA hashing, zero-knowledge privacy architecture.
<span class="term-amber">[2] Facial Emotion Detection using CNN:</span> Python, TensorFlow, OpenCV
    Convolutional Neural Network classifying emotions in real time.
    <span class="term-green">Live App:</span> <a href="https://facial-emotion-detection-ai-a84f.onrender.com" target="_blank" class="term-highlight">facial-emotion-detection-ai-a84f.onrender.com</a>
<span class="term-amber">[3] Lung Cancer Prediction System using SVM:</span> Python, Scikit-learn
    Clinical stage decision support with Support Vector Machines.`,

    education: `<span class="term-white">B.Tech CSE (AI & ML)</span> - Malla Reddy College of Eng. & Tech (2022–2026): <span class="term-green">78%</span>
<span class="term-white">Intermediate (MPC)</span> - Sri Gayatri Junior College (2020–2022): <span class="term-green">76.5%</span>
<span class="term-white">SSC High School</span> - Sri Sai Krishna High School (2019–2020): <span class="term-amber">98% Distinction</span>`,

    certs: `• <span class="term-highlight">Introduction to Artificial Intelligence</span>
• <span class="term-highlight">Generative AI for Beginners</span>`,

    contact: `Phone:    <span class="term-white">+91 8919655394</span>
Email:    <span class="term-cyan">vishnuraipallyvishnu@gmail.com</span>
Location: <span class="term-dim">Hyderabad & Sangareddy, Telangana, India</span>
LinkedIn: <a href="https://linkedin.com" target="_blank" class="term-highlight">linkedin.com</a>
GitHub:   <a href="https://github.com" target="_blank" class="term-highlight">github.com</a>`,

    'sudo hire': `<span class="term-green">ACCESS GRANTED!</span>
[✔] Matching candidate skill matrix...
[✔] AI/ML Competencies verified (TensorFlow, CNN, SVM, Python).
[✔] Problem-solving & IT troubleshooting verified.
🎉 <span class="term-cyan">Candidate Raipally Vishnu Vardhan is ready to join your team! Please send contract to: vishnuraipallyvishnu@gmail.com</span>`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Echo command line
    const userLine = document.createElement('div');
    userLine.className = 'term-line';
    userLine.innerHTML = `<span class="term-prompt">vishnu@portfolio:~$</span> <span class="term-white">${escapeHtml(cmd)}</span>`;
    terminalBody.appendChild(userLine);

    // Response line
    const respLine = document.createElement('div');
    respLine.className = 'term-line output-line';

    if (cmd === 'clear') {
      terminalBody.innerHTML = '';
      return;
    } else if (commands[cmd]) {
      respLine.innerHTML = commands[cmd];
    } else {
      respLine.innerHTML = `<span class="term-dim">Command not recognized: '${escapeHtml(cmd)}'. Type </span><span class="term-highlight">'help'</span><span class="term-dim"> for a list of available commands.</span>`;
    }

    terminalBody.appendChild(respLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      terminalBody.innerHTML = '';
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });
}

/* ====================================================
   12. CONTACT FORM SIMULATION
   ==================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (submitBtn) {
      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
        form.reset();
        showToast('Thank you! Your message has been sent successfully.');
      }, 1200);
    }
  });
}

/* ====================================================
   13. FOOTER CURRENT YEAR
   ==================================================== */
function updateFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
