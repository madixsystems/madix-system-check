// Paste your free Formspree endpoint between the quotation marks.
// Example: const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
// The same endpoint receives playbook requests, waitlist interest, and reviews.
const FORM_ENDPOINT = "";

const leadForm = document.querySelector("#lead-form");
const leadSuccess = document.querySelector("#success");
const leadNote = document.querySelector("#form-note");
const reviewForm = document.querySelector("#review-form");
const reviewSuccess = document.querySelector("#review-success");
const reviewNote = document.querySelector("#review-note");
const planField = document.querySelector("#plan-field");
const planLabel = document.querySelector("#plan-label");

document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    planField.value = plan;
    planLabel.textContent = plan;
    document.querySelector("#playbook").scrollIntoView({ behavior: "smooth" });
  });
});

async function submitForm({ form, success, note }) {
  if (!FORM_ENDPOINT) {
    note.textContent = "This form is designed and ready, but the inbox is not connected yet. Add your Formspree endpoint in script.js.";
    note.classList.add("error");
    return;
  }

  const button = form.querySelector("button[type='submit']");
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = "Sending…";
  note.textContent = "";
  note.classList.remove("error");

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Submission failed");
    form.hidden = true;
    success.hidden = false;
  } catch {
    note.textContent = "We could not send this form. Please check your connection and try again.";
    note.classList.add("error");
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm({ form: leadForm, success: leadSuccess, note: leadNote });
});

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm({ form: reviewForm, success: reviewSuccess, note: reviewNote });
});

const copyReviewLink = document.querySelector("#copy-review-link");
const copyStatus = document.querySelector("#copy-status");

copyReviewLink.addEventListener("click", async () => {
  const reviewUrl = `${window.location.origin}${window.location.pathname}#leave-review`;
  try {
    await navigator.clipboard.writeText(reviewUrl);
    copyStatus.textContent = "Review link copied. You can send it to a former client.";
  } catch {
    copyStatus.textContent = `Copy this link: ${reviewUrl}`;
  }
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    const icon = item.querySelector("summary span");
    icon.textContent = item.open ? "−" : "+";
  });
});

// Premium pointer light and three-dimensional card response.
document.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
});

const tiltTargets = document.querySelectorAll(
  ".tool-tile, .result-grid article, .three article, .solution-grid article, .plan, .chapter-grid article, .principle-card, .float-panel"
);

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  tiltTargets.forEach((card) => {
    card.classList.add("tilt-card");
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateY = ((x / bounds.width) - 0.5) * 7;
      const rotateX = ((y / bounds.height) - 0.5) * -7;
      card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
      card.style.setProperty("--card-x", `${(x / bounds.width) * 100}%`);
      card.style.setProperty("--card-y", `${(y / bounds.height) * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

// Gentle entrance motion, disabled automatically for reduced-motion visitors.
const revealTargets = document.querySelectorAll(
  ".heading-row, .result-grid, .three, .steps, .tool-cloud, .company-credentials, .chapter-grid, .plan-grid, .review-wall, .faq-list"
);
revealTargets.forEach((element) => element.classList.add("reveal"));

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

// Approved testimonials are loaded from testimonials.js and animate into this stage.
const testimonialStage = document.querySelector("#testimonial-stage");
const testimonials = Array.isArray(window.MADIX_TESTIMONIALS) ? window.MADIX_TESTIMONIALS : [];
let testimonialIndex = 0;
let testimonialTimer;

function safeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderTestimonial() {
  if (!testimonials.length) {
    testimonialStage.innerHTML = `
      <article class="testimonial-empty">
        <span>“</span>
        <h3>Verified client stories will appear here.</h3>
        <p>When you add an approved review to <code>testimonials.js</code>, it appears here automatically with a premium pop-in animation.</p>
        <small>NO STOCK TESTIMONIALS · NO MADE-UP RESULTS</small>
      </article>`;
    return;
  }

  const review = testimonials[testimonialIndex];
  const rating = Math.max(1, Math.min(5, Number(review.rating) || 5));
  testimonialStage.innerHTML = `
    <article class="testimonial-card">
      <span>“</span>
      <div class="testimonial-stars" aria-label="${rating} out of 5 stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
      <blockquote class="testimonial-quote">${safeText(review.quote)}</blockquote>
      ${review.result ? `<p class="testimonial-result">VERIFIED OUTCOME · ${safeText(review.result)}</p>` : ""}
      <div class="testimonial-person"><b>${safeText(review.name)}</b><small>${safeText(review.role)}${review.company ? ` · ${safeText(review.company)}` : ""}</small></div>
      ${testimonials.length > 1 ? `<div class="testimonial-controls"><button type="button" data-review-direction="previous" aria-label="Previous review">←</button><button type="button" data-review-direction="next" aria-label="Next review">→</button></div>` : ""}
    </article>`;

  testimonialStage.querySelectorAll("[data-review-direction]").forEach((button) => {
    button.addEventListener("click", () => {
      testimonialIndex = button.dataset.reviewDirection === "next"
        ? (testimonialIndex + 1) % testimonials.length
        : (testimonialIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonial();
      restartTestimonialTimer();
    });
  });
}

function restartTestimonialTimer() {
  window.clearInterval(testimonialTimer);
  if (testimonials.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  testimonialTimer = window.setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
  }, 7000);
}

renderTestimonial();
restartTestimonialTimer();

// User-initiated film playback with its ambient soundtrack and optional browser narration.
const storyFilm = document.querySelector("#madix-film");
const playStory = document.querySelector("#play-story");
const filmNote = document.querySelector("#film-note");
const storyNarration = "Before Madix, I worked hard inside scattered processes: calls, follow-ups, files, client questions, and tools that did not always speak to each other. I learned that more effort is not the answer when the system is unclear. The beauty of a good system is that it protects the client experience. Every lead knows what happens next. Every team member sees ownership. Every CEO sees the truth. Madix Systems turns messy operations into clear, measurable follow-through. Start with one workflow. Build one honest result. Then scale what works.";

function chooseNarrationVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  return voices.find((voice) => /Samantha|Zira|Ava|Aria|Jenny|female/i.test(voice.name))
    || voices.find((voice) => /^en/i.test(voice.lang))
    || voices[0];
}

playStory.addEventListener("click", async () => {
  storyFilm.currentTime = 0;
  storyFilm.muted = false;
  storyFilm.volume = 0.72;
  try {
    await storyFilm.play();
  } catch {
    filmNote.textContent = "Press the play control inside the video to begin.";
    return;
  }

  if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
    window.speechSynthesis.cancel();
    const narration = new SpeechSynthesisUtterance(storyNarration);
    narration.voice = chooseNarrationVoice();
    narration.lang = "en-US";
    narration.rate = 1.02;
    narration.pitch = 1.02;
    narration.volume = 0.92;
    window.speechSynthesis.speak(narration);
    filmNote.textContent = "Playing the Madix film with soundtrack and narration.";
  } else {
    filmNote.textContent = "Playing the Madix film with its original ambient soundtrack.";
  }
});

storyFilm.addEventListener("ended", () => {
  window.speechSynthesis?.cancel?.();
  filmNote.textContent = "Film complete. Start with one workflow and build what works.";
});

storyFilm.addEventListener("pause", () => {
  if (!storyFilm.ended) window.speechSynthesis?.cancel?.();
});
