<script>
  import { base } from '$app/paths';
  import Timeline from '$lib/components/Timeline.svelte';
  import { onMount, onDestroy } from 'svelte';

  // Change this if your compass has a different id/class.
  // Examples: "#compass", ".compass", ".nav-compass"
  const COMPASS_SELECTOR = '#compass, .compass';

  let hintLeft = '90px';
  let hintTop = '170px';

  function positionHint() {
    const compassEl = document.querySelector(COMPASS_SELECTOR);
    if (!compassEl) return;

    const rect = compassEl.getBoundingClientRect();

    // Center horizontally with compass
    hintLeft = `${rect.left + rect.width / 2}px`;

    // Place just under compass (small gap)
    hintTop = `${rect.bottom + 8}px`;
  }

  let cleanup = () => {};

  onMount(() => {
    const onResize = () => positionHint();
    const onScroll = () => positionHint();

    // Initial + next frame (in case layout shifts after mount)
    positionHint();
    requestAnimationFrame(positionHint);

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    cleanup = () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  });

  onDestroy(() => cleanup());
</script>

<div class="page-wrapper">
  <div class="content">
    <h1 class="name">Danush Singla</h1>

    <img src="{base}/headshot.png" alt="Danush Singla" class="profile-pic" />

    <h2 class="subtitle">About Me</h2>

    <p>
      My journey in programming began at the age of 9, sparked by a basic HTML
      tutorial book from my local library. Since then, I have explored nearly
      every corner of technology, from tinkering with Arduino to conducting
      advanced machine learning research, and even creating a USB "rubber ducky"
      for cybersecurity. I was in AI before it was cool, having published my
      first research paper while still in highschool and presenting them at
      conferences around Florida. Driven by a strong entrepreneurial spirit, I
      am now focused on applying innovative machine learning techniques to the
      software development space. I am interested in roles that push the
      boundaries of AI, seeking opportunities to apply it wherever possible in
      the future.
    </p>

    <Timeline />
  </div>
</div>

<!-- Compass hint (auto-centers to the compass element) -->
<div
  class="compass-hint"
  style="left: {hintLeft}; top: {hintTop};"
>
  Hover to navigate
</div>

<style>
  .page-wrapper {
    display: flex;
    justify-content: center;
    padding-left: 180px;
    padding-top: 40px;
    width: 100%;
    box-sizing: border-box;
  }

  .content {
    max-width: 700px;
    width: 100%;
    text-align: center;
    font-family: "EB Garamond", serif;
  }

  .profile-pic {
    width: 180px;
    height: auto;
    border-radius: 8px;
    margin: 10px 0 20px 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
  }

  .name {
    font-family: "Cormorant Garamond", serif;
    font-size: 3.2rem;
    font-weight: 700;
    color: #4a3923;
    margin-bottom: 0.3rem;
    letter-spacing: 1px;
  }

  .subtitle {
    font-size: 1.8rem;
    color: #6e5838;
    margin-bottom: 1.5rem;
    letter-spacing: 0.5px;
  }

  .compass-hint {
    position: fixed;
    transform: translateX(-50%);
    font-family: "Cormorant Garamond", serif;
    font-size: 1.15rem;
    color: #5b1d1d;          /* dark red */
    opacity: 0.9;
    letter-spacing: 0.5px;
    pointer-events: none;
    text-shadow: 0 1px 0 rgba(0,0,0,0.08);
  }

  @media (max-width: 700px) {
    .page-wrapper {
      padding-left: 0;
    }

    .name {
      font-size: 2.4rem;
    }

    .compass-hint {
      display: none;
    }
  }
</style>
