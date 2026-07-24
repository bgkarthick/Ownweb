const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();


const resumeModal = document.getElementById("resume-modal");
const openResumeButtons = document.querySelectorAll("[data-open-resume-modal]");
const closeResumeButtons = document.querySelectorAll("[data-close-resume-modal]");

function openResumeModal() {
  if (!resumeModal) return;
  resumeModal.classList.add("is-open");
  resumeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const firstInput = resumeModal.querySelector('input[name="Name"]');
  window.setTimeout(() => firstInput?.focus(), 50);
}

function closeResumeModal() {
  if (!resumeModal) return;
  resumeModal.classList.remove("is-open");
  resumeModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

openResumeButtons.forEach(button => button.addEventListener("click", openResumeModal));
closeResumeButtons.forEach(button => button.addEventListener("click", closeResumeModal));

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && resumeModal?.classList.contains("is-open")) {
    closeResumeModal();
  }
});

const params = new URLSearchParams(window.location.search);
if (params.get("resume-request") === "sent") {
  window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
  alert("Thank you. Your resume request has been submitted.");
}
