import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6 })
    .from('.hero-title-line', { opacity: 0, y: 40, duration: 0.8 }, '-=0.3')
    .from('.hero-title-highlight', { opacity: 0, y: 40, duration: 0.8 }, '-=0.5')
    .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
    .from('.hero-cta-primary', { opacity: 0, y: 20, scale: 0.9, duration: 0.5 }, '-=0.3')
    .from('.hero-cta-secondary', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
    .from('.hero-visual', { opacity: 0, scale: 0.9, duration: 1 }, '-=0.8')
    .from('.hero-float-card', { opacity: 0, y: 20, stagger: 0.2, duration: 0.6 }, '-=0.5');

  // Floating animation for cards
  gsap.to('.hero-float-card', {
    y: -10,
    duration: 2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.5,
  });

  // CTA pulse glow
  gsap.to('.hero-cta-primary', {
    boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)',
    duration: 1.5,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
  });
}

export function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Feature cards reveal
  gsap.utils.toArray<HTMLElement>('.feature-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: i % 2 === 0 ? -60 : 60,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  // Stats counter
  gsap.utils.toArray<HTMLElement>('.stat-item').forEach((item) => {
    const valueEl = item.querySelector('.stat-value');
    const target = parseFloat(valueEl?.dataset.value || '0');
    const suffix = valueEl?.dataset.suffix || '';
    const isDecimal = target % 1 !== 0;

    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            if (valueEl) {
              const v = this.targets()[0].val;
              valueEl.textContent = isDecimal ? v.toFixed(1) + suffix : Math.floor(v) + suffix;
            }
          },
        });
      },
      once: true,
    });
  });

  // Testimonial cards
  gsap.from('.testimonial-card', {
    scrollTrigger: {
      trigger: '.testimonials-section',
      start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 0.6,
    ease: 'power3.out',
  });

  // FAQ items
  gsap.from('.faq-item', {
    scrollTrigger: {
      trigger: '.faq-section',
      start: 'top 80%',
    },
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.5,
    ease: 'power3.out',
  });

  // CTA section
  gsap.from('.cta-section-content', {
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
  });

  // Page hero sections (about, blog, ai)
  gsap.from('.page-hero-content > *', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.6,
    ease: 'power3.out',
  });
}

export function initFAQAccordion() {
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item?.querySelector('.faq-answer');
      const icon = btn.querySelector('.faq-icon');
      const isOpen = item?.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          const openAnswer = openItem.querySelector('.faq-answer') as HTMLElement;
          const openIcon = openItem.querySelector('.faq-icon');
          if (openAnswer) gsap.to(openAnswer, { height: 0, duration: 0.3 });
          openIcon?.classList.remove('rotate-90');
        }
      });

      if (!isOpen && answer) {
        item?.classList.add('open');
        gsap.to(answer, { height: 'auto', duration: 0.3, ease: 'power2.out' });
        icon?.classList.add('rotate-90');
      } else if (answer) {
        item?.classList.remove('open');
        gsap.to(answer, { height: 0, duration: 0.3 });
        icon?.classList.remove('rotate-90');
      }
    });
  });
}

export function initTestimonialCarousel() {
  const cards = document.querySelectorAll('.testimonial-card');
  if (cards.length <= 1) return;

  let current = 0;
  const showCard = (index: number) => {
    cards.forEach((card, i) => {
      gsap.to(card, {
        opacity: i === index ? 1 : 0,
        scale: i === index ? 1 : 0.95,
        duration: 0.5,
        ease: 'power2.out',
      });
      (card as HTMLElement).style.pointerEvents = i === index ? 'auto' : 'none';
      (card as HTMLElement).style.position = i === index ? 'relative' : 'absolute';
    });
  };

  showCard(0);
  setInterval(() => {
    current = (current + 1) % cards.length;
    showCard(current);
  }, 5000);

  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      showCard(current);
    });
  });
}

export function initAllAnimations() {
  initHeroAnimation();
  initScrollAnimations();
  initFAQAccordion();
  initTestimonialCarousel();
}
