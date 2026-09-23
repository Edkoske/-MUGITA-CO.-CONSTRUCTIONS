const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const menuToggle = $('.menu-toggle');
const navMenu = $('.nav-menu');
menuToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
$$('.nav-link, .nav-menu .button').forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open menu');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
$$('.reveal').forEach(item => revealObserver.observe(item));

const stats = $('#stats');
let countersStarted = false;
const countObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting || countersStarted) return;
  countersStarted = true;
  $$('[data-count]', stats).forEach(counter => {
    const target = Number(counter.dataset.count);
    const duration = 1300;
    const start = performance.now();
    const update = now => {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = Math.floor((1 - Math.pow(1 - progress, 3)) * target);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}, { threshold: .5 });
if (stats) countObserver.observe(stats);

const sections = $$('main section[id]');
const navLinks = $$('.nav-link');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));

const header = $('.site-header');
const backTop = $('.back-top');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
  backTop.classList.toggle('is-visible', window.scrollY > 600);
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

$$('.filter').forEach(filter => filter.addEventListener('click', () => {
  $$('.filter').forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
  const value = filter.dataset.filter;
  $$('.project-card').forEach(card => {
    const visible = value === 'all' || card.dataset.category === value;
    card.classList.toggle('is-hidden', !visible);
    if (visible) {
      card.classList.remove('is-visible');
      requestAnimationFrame(() => card.classList.add('is-visible'));
    }
  });
}));

const projectData = [
  { title: 'Jade House', location: 'Lekki, Lagos / Residential', image: 'images/1790170188746.jpg', description: 'A warm, contemporary family home designed around light, privacy, and the rituals of everyday life. We delivered the full build from foundation to finish.' },
  { title: 'Axis House', location: 'Victoria Island, Lagos / Commercial', image: 'images/1790170248520.jpg', description: 'A confident commercial address with efficient floorplates, considered common areas, and a facade designed to age gracefully.' },
  { title: 'Parkside Apartments', location: 'Lekki, Lagos / Residential', image: 'images/1790170190862.jpg', description: 'A compact apartment development that balances generous shared spaces with calm, well-proportioned private interiors.' },
  { title: 'New Dawn School', location: 'Abuja, FCT / Institutional', image: 'images/1790170232629.jpg', description: 'A bright, durable learning environment shaped around movement, supervision, and the energy of young minds.' },
  { title: 'Common Ground', location: 'Victoria Island, Lagos / Commercial', image: 'images/1790170192848.jpg', description: 'A flexible retail and business centre built to support independent brands, everyday convenience, and community.' },
  { title: 'Northline Works', location: 'Enugu, Enugu / Industrial', image: 'images/1790170175177.jpg', description: 'A high-performance industrial building with careful attention to circulation, loading, storage, and future expansion.' }
];

const projectModal = $('#project-modal');
const openProject = index => {
  const project = projectData[index];
  $('.modal__image img', projectModal).src = project.image;
  $('.modal__image img', projectModal).alt = project.title;
  $('#modal-title', projectModal).textContent = project.title;
  $('.modal__meta', projectModal).textContent = project.location;
  $('.modal__description', projectModal).textContent = project.description;
  projectModal.classList.add('is-open');
  projectModal.setAttribute('aria-hidden', 'false');
  $('.modal__close', projectModal).focus();
};
$$('.project-open').forEach(button => button.addEventListener('click', event => openProject(event.currentTarget.closest('.project-card').dataset.project)));
const closeProject = () => { projectModal.classList.remove('is-open'); projectModal.setAttribute('aria-hidden', 'true'); };
$('.modal__close', projectModal).addEventListener('click', closeProject);
$('.modal__backdrop', projectModal).addEventListener('click', closeProject);

const galleryImages = $$('.gallery-item img').map(image => ({ src: image.src, alt: image.alt }));
const lightbox = $('#lightbox');
let galleryIndex = 0;
const showGalleryImage = index => {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  const image = galleryImages[galleryIndex];
  $('img', lightbox).src = image.src;
  $('img', lightbox).alt = image.alt;
};
$$('.gallery-item').forEach(item => item.addEventListener('click', () => {
  showGalleryImage(Number(item.dataset.index));
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
}));
const closeLightbox = () => { lightbox.classList.remove('is-open'); lightbox.setAttribute('aria-hidden', 'true'); };
$('.lightbox__close').addEventListener('click', closeLightbox);
$('.lightbox__backdrop').addEventListener('click', closeLightbox);
$('.lightbox__prev').addEventListener('click', () => showGalleryImage(galleryIndex - 1));
$('.lightbox__next').addEventListener('click', () => showGalleryImage(galleryIndex + 1));

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (projectModal.classList.contains('is-open')) closeProject();
  if (lightbox.classList.contains('is-open')) closeLightbox();
  if (navMenu.classList.contains('is-open')) menuToggle.click();
});

const slides = $$('.testimonial-slide');
let slideIndex = 0;
const setSlide = index => {
  slideIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, itemIndex) => slide.classList.toggle('active', itemIndex === slideIndex));
  $('.carousel-progress b').textContent = String(slideIndex + 1).padStart(2, '0');
};
$('.testimonial-prev').addEventListener('click', () => setSlide(slideIndex - 1));
$('.testimonial-next').addEventListener('click', () => setSlide(slideIndex + 1));
setInterval(() => setSlide(slideIndex + 1), 6500);

const form = $('#contact-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const message = $('.form-message');
  const data = new FormData(form);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get('email'));
  const phoneValid = data.get('phone').replace(/\D/g, '').length >= 8;
  const messageValid = data.get('message').trim().length >= 20;
  const requiredValid = ['name', 'email', 'phone', 'type', 'budget', 'message'].every(field => String(data.get(field)).trim());
  if (!requiredValid || !emailValid || !phoneValid || !messageValid) {
    message.textContent = 'Please complete the required fields with a valid email, phone number, and a message of at least 20 characters.';
    message.className = 'form-message error';
    return;
  }
  message.textContent = 'Thank you. Your enquiry is ready for our team and we will be in touch shortly.';
  message.className = 'form-message success';
  form.reset();
});
