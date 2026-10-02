let revealObserver: IntersectionObserver | null = null;

/**
 * Handles individual reveal animations:
 * .reveal-left
 * .reveal-right
 * .reveal-up
 * .fade-in
 */
function setupIndividualReveals() {
  // Clean up the previous observer when navigating between Astro pages.
  revealObserver?.disconnect();

  const animatedElements = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-up, .reveal-fade",
  );

  if (!animatedElements.length) return;

  // Reset elements so they can animate again when returning to the page.
  animatedElements.forEach((element) => {
    element.classList.remove("in-view");
  });

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("in-view");

        // Stop watching after the animation has triggered.
        revealObserver?.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
    },
  );

  animatedElements.forEach((element) => {
    revealObserver?.observe(element);
  });
}

/**
 * Handles groups that should reveal one item at a time.
 *
 * .reveal-stagger
 *   ├── .reveal-stagger-item
 *   ├── .reveal-stagger-item
 *   └── .reveal-stagger-item
 */
function setupStaggerReveals() {
  const staggerGroups = document.querySelectorAll(".reveal-stagger");

  staggerGroups.forEach((group) => {
    const items = group.querySelectorAll(".reveal-stagger-item");

    if (!items.length) return;

    // Reset items when returning to the page.
    items.forEach((item) => {
      item.classList.remove("in-view");
    });

    const staggerObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        items.forEach((item, index) => {
          const element = item as HTMLElement;

          element.style.transitionDelay = `${index * 150}ms`;
          element.classList.add("in-view");
        });

        // This group only needs to animate once per page visit.
        staggerObserver.disconnect();
      },
      {
        threshold: 0.25,
      },
    );

    staggerObserver.observe(group);
  });
}

/**
 * Initializes all site-wide reveal animations.
 */
export function setupRevealObserver() {
  setupIndividualReveals();
  setupStaggerReveals();
}
