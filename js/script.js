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
  { title: 'Jade House', location: 'Karen, Nairobi / Residential', image: 'images/1790170188746.jpg', description: 'A warm, contemporary family home designed around light, privacy, and the rituals of everyday life. We delivered the full build from foundation to finish.' },
  { title: 'Axis House', location: 'Westlands, Nairobi / Commercial', image: 'images/1790170248520.jpg', description: 'A confident commercial address with efficient floorplates, considered common areas, and a facade designed to age gracefully.' },
  { title: 'Parkside Apartments', location: 'Kilimani, Nairobi / Residential', image: 'images/1790170190862.jpg', description: 'A compact apartment development that balances generous shared spaces with calm, well-proportioned private interiors.' },
  { title: 'New Dawn School', location: 'Runda, Nairobi / Institutional', image: 'images/1790170232629.jpg', description: 'A bright, durable learning environment shaped around movement, supervision, and the energy of young minds.' },
  { title: 'Common Ground', location: 'Westlands, Nairobi / Commercial', image: 'images/1790170192848.jpg', description: 'A flexible retail and business centre built to support independent brands, everyday convenience, and community.' },
  { title: 'Northline Works', location: 'Industrial Area, Nairobi / Industrial', image: 'images/1790170175177.jpg', description: 'A high-performance industrial building with careful attention to circulation, loading, storage, and future expansion.' }
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

const archiveFiles = `1790170170061.jpg 1790170175177.jpg 1790170188746.jpg 1790170190862.jpg 1790170192848.jpg 1790170194606.jpg 1790170197423.jpg 1790170204842.jpg 1790170214365.jpg 1790170226318.jpg 1790170232629.jpg 1790170240234.jpg 1790170248520.jpg 1790170258125.jpg 1790170263110.jpg IMG-20260923-WA0019.jpg IMG-20260923-WA0021.jpg IMG-20260923-WA0022.jpg IMG-20260923-WA0023.jpg IMG-20260923-WA0024.jpg IMG-20260923-WA0025.jpg IMG-20260923-WA0026.jpg IMG-20260923-WA0027.jpg IMG-20260923-WA0028.jpg IMG-20260923-WA0029.jpg IMG-20260923-WA0030.jpg IMG-20260923-WA0031.jpg IMG-20260923-WA0032.jpg IMG-20260923-WA0033.jpg IMG-20260923-WA0034.jpg IMG-20260923-WA0035.jpg IMG-20260923-WA0036.jpg IMG-20260923-WA0037.jpg IMG-20260923-WA0038.jpg IMG-20260923-WA0039.jpg IMG-20260923-WA0040.jpg IMG-20260923-WA0041.jpg IMG-20260923-WA0042.jpg IMG-20260923-WA0043.jpg IMG-20260923-WA0044.jpg IMG-20260923-WA0045.jpg IMG-20260923-WA0046.jpg IMG-20260923-WA0047.jpg IMG-20260923-WA0048.jpg IMG-20260923-WA0049.jpg IMG-20260923-WA0051.jpg IMG-20260923-WA0052.jpg IMG-20260923-WA0053.jpg IMG-20260923-WA0054.jpg IMG-20260923-WA0055.jpg IMG-20260923-WA0056.jpg IMG-20260923-WA0057.jpg IMG-20260923-WA0058.jpg IMG-20260923-WA0059.jpg IMG-20260923-WA0060.jpg IMG-20260923-WA0061.jpg IMG-20260923-WA0062.jpg IMG-20260923-WA0063.jpg IMG-20260923-WA0064.jpg IMG-20260923-WA0065.jpg IMG-20260923-WA0066.jpg IMG-20260923-WA0067.jpg IMG-20260923-WA0068.jpg IMG-20260923-WA0069.jpg IMG-20260923-WA0070.jpg IMG-20260923-WA0071.jpg IMG-20260923-WA0072.jpg IMG-20260923-WA0074.jpg IMG-20260923-WA0075.jpg IMG-20260923-WA0076.jpg IMG-20260923-WA0077.jpg IMG-20260923-WA0078.jpg IMG-20260923-WA0079.jpg IMG-20260923-WA0080.jpg IMG-20260923-WA0081.jpg IMG-20260923-WA0082.jpg IMG-20260923-WA0083.jpg IMG-20260923-WA0084.jpg IMG-20260923-WA0085.jpg IMG-20260923-WA0086.jpg IMG-20260923-WA0087.jpg IMG-20260923-WA0089.jpg IMG-20260923-WA0090.jpg IMG-20260923-WA0091.jpg IMG-20260923-WA0092.jpg IMG-20260923-WA0093.jpg IMG-20260923-WA0094.jpg IMG-20260923-WA0095.jpg IMG-20260923-WA0096.jpg IMG-20260923-WA0097.jpg IMG-20260923-WA0098.jpg IMG-20260923-WA0099.jpg IMG-20260923-WA0100.jpg IMG-20260923-WA0101.jpg IMG-20260923-WA0102.jpg IMG-20260923-WA0103.jpg IMG-20260923-WA0104.jpg IMG-20260923-WA0105.jpg IMG-20260923-WA0107.jpg IMG-20260923-WA0108.jpg IMG-20260923-WA0109.jpg IMG-20260923-WA0110.jpg IMG-20260923-WA0111.jpg IMG-20260923-WA0112.jpg IMG-20260923-WA0113.jpg IMG-20260923-WA0114.jpg IMG-20260923-WA0115.jpg IMG-20260923-WA0116.jpg IMG-20260923-WA0117.jpg IMG-20260923-WA0118.jpg IMG-20260923-WA0119.jpg IMG-20260923-WA0120.jpg`.split(' ');
const archive = $('#project-archive');
const archiveSets = {
  plans: new Set(['1790170226318.jpg', '1790170240234.jpg', 'IMG-20260923-WA0026.jpg', 'IMG-20260923-WA0119.jpg', 'IMG-20260923-WA0120.jpg']),
  interiors: new Set(['IMG-20260923-WA0019.jpg', 'IMG-20260923-WA0021.jpg', 'IMG-20260923-WA0022.jpg', 'IMG-20260923-WA0023.jpg', 'IMG-20260923-WA0027.jpg', 'IMG-20260923-WA0028.jpg', 'IMG-20260923-WA0029.jpg', 'IMG-20260923-WA0039.jpg', 'IMG-20260923-WA0043.jpg', 'IMG-20260923-WA0053.jpg', 'IMG-20260923-WA0060.jpg', 'IMG-20260923-WA0077.jpg', 'IMG-20260923-WA0079.jpg', 'IMG-20260923-WA0082.jpg', 'IMG-20260923-WA0092.jpg', 'IMG-20260923-WA0093.jpg', 'IMG-20260923-WA0096.jpg', 'IMG-20260923-WA0101.jpg', 'IMG-20260923-WA0107.jpg', 'IMG-20260923-WA0115.jpg', 'IMG-20260923-WA0116.jpg', 'IMG-20260923-WA0117.jpg', 'IMG-20260923-WA0118.jpg']),
  construction: new Set(['1790170175177.jpg', '1790170204842.jpg', '1790170214365.jpg', '1790170232629.jpg', '1790170248520.jpg', '1790170258125.jpg', '1790170263110.jpg', 'IMG-20260923-WA0030.jpg', 'IMG-20260923-WA0031.jpg', 'IMG-20260923-WA0032.jpg', 'IMG-20260923-WA0035.jpg', 'IMG-20260923-WA0036.jpg', 'IMG-20260923-WA0037.jpg', 'IMG-20260923-WA0038.jpg', 'IMG-20260923-WA0046.jpg', 'IMG-20260923-WA0054.jpg', 'IMG-20260923-WA0058.jpg', 'IMG-20260923-WA0062.jpg', 'IMG-20260923-WA0065.jpg', 'IMG-20260923-WA0068.jpg', 'IMG-20260923-WA0069.jpg', 'IMG-20260923-WA0074.jpg', 'IMG-20260923-WA0081.jpg', 'IMG-20260923-WA0083.jpg', 'IMG-20260923-WA0094.jpg', 'IMG-20260923-WA0097.jpg', 'IMG-20260923-WA0098.jpg', 'IMG-20260923-WA0102.jpg', 'IMG-20260923-WA0108.jpg', 'IMG-20260923-WA0109.jpg', 'IMG-20260923-WA0111.jpg', 'IMG-20260923-WA0113.jpg'])
};
const archiveLabels = { architecture: 'Architecture / Design', construction: 'Construction / Progress', interiors: 'Interiors / Fit-out', plans: 'Plans / Communication' };
const getArchiveCategory = file => Object.entries(archiveSets).find(([, files]) => files.has(file))?.[0] || 'architecture';
archiveFiles.forEach((file, index) => {
  const item = document.createElement('button');
  item.className = 'archive-item reveal';
  item.dataset.index = String(4 + index);
  item.dataset.category = getArchiveCategory(file);
  item.setAttribute('aria-label', `Open project archive image ${index + 1}`);
  const label = archiveLabels[item.dataset.category];
  item.innerHTML = `<img loading="lazy" src="images/${file}" alt="Conerstone ${label.toLowerCase()} image ${index + 1}"><span>${label}</span>`;
  archive.appendChild(item);
  revealObserver.observe(item);
});

$$('.archive-filter').forEach(filter => filter.addEventListener('click', () => {
  $$('.archive-filter').forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
  const category = filter.dataset.archiveFilter;
  $$('.archive-item').forEach(item => item.classList.toggle('is-hidden', category !== 'all' && item.dataset.category !== category));
}));

const galleryImages = $$('.gallery-item img, .archive-item img').map(image => ({ src: image.src, alt: image.alt }));
const lightbox = $('#lightbox');
let galleryIndex = 0;
const showGalleryImage = index => {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  const image = galleryImages[galleryIndex];
  $('img', lightbox).src = image.src;
  $('img', lightbox).alt = image.alt;
};
$$('.gallery-item, .archive-item').forEach(item => item.addEventListener('click', () => {
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
