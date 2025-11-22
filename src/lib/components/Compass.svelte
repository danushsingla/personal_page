<script>
  import { base } from '$app/paths';
  import { onMount, onDestroy } from "svelte";
  import { goto } from "$app/navigation";

  let compassEl;
  let needleEl;

  function go(dir) {
    if (dir === "N") goto(`${base}/`);
    if (dir === "E") goto(`${base}/skills`);
    if (dir === "S") goto(`${base}/experience`);
    if (dir === "W") goto(`${base}/projects`);
  }

  function updateNeedle(e) {
    if (!compassEl || !needleEl) return;

    const rect = compassEl.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;

    const mx = e.clientX;
    const my = e.clientY;

    const angleRad = Math.atan2(my - cy, mx - cx);
    const angleDeg = angleRad * (180 / Math.PI) + 90;

    needleEl.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg)`;
  }

  onMount(() => {
    // SSR-safe: only runs in the browser
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", updateNeedle);
    }
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("mousemove", updateNeedle);
    }
  });
</script>


<style>
  .compass-container {
    position: fixed;
    top: 1.2rem;
    left: 1.2rem;
    width: 140px;
    height: 140px;
    cursor: pointer;
    transition: transform 1.4s ease;
  }

  .compass-container:hover {
    transform: rotate(360deg);
  }

  .compass {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid #795c34;
    background: radial-gradient(circle, #f8edd8, #e3d3b6);
    box-shadow: 0 0 8px rgba(0,0,0,0.3);
    position: relative;
    font-family: "EB Garamond", serif;
    color: #5a4428;
  }

  /* MAIN DIRECTIONS */
  .dir {
    position: absolute;
    font-size: 1.3rem;
    user-select: none;
    font-weight: 700;
  }

  .dir:hover {
  color: #c29a54;
  text-shadow: 0 0 6px rgba(0,0,0,0.4);
  cursor: pointer;
}


  .north { top: 5px; left: 50%; transform: translateX(-50%); }
  .east  { right: 6px; top: 50%; transform: translateY(-50%); }
  .south { bottom: 5px; left: 50%; transform: translateX(-50%); }
  .west  { left: 6px; top: 50%; transform: translateY(-50%); }

  /* FINE PRINT LABELS */
  .fine {
    position: absolute;
    font-size: 0.55rem;
    color: #7d6243;
    letter-spacing: 0.3px;
    opacity: 0.9;
    font-weight: 400;
    user-select: none;
  }

  .fine-n { top: 28px; left: 50%; transform: translateX(-50%); }
  .fine-e { right: 28px; top: 50%; transform: translateY(-50%); }
  .fine-s { bottom: 28px; left: 50%; transform: translateX(-50%); }
  .fine-w { left: 28px; top: 50%; transform: translateY(-50%); }

  /* Needle */
  .needle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 70px;
    transform-origin: center center;
    pointer-events: none;
    transition: transform 0.05s linear;
  }

  .needle::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 40px;
    background: #b7410e;
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  }

  .needle::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 28px;
    background: #2f2f2f;
    clip-path: polygon(50% 100%, 100% 0%, 0% 0%);
  }

  .pivot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    background: #795c34;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: inset 0 0 3px rgba(0,0,0,0.6);
  }
</style>

<div class="compass-container" bind:this={compassEl}>
  <div class="compass">

    <!-- Needle + Pivot -->
    <div class="needle" bind:this={needleEl}></div>
    <div class="pivot"></div>

    <!-- Direction Letters -->
    <div class="dir north" on:click={() => go("N")}>N</div>
    <div class="dir east"  on:click={() => go("E")}>E</div>
    <div class="dir south" on:click={() => go("S")}>S</div>
    <div class="dir west"  on:click={() => go("W")}>W</div>

    <!-- Fine Print Labels -->
    <div class="fine fine-n">About Me</div>
    <div class="fine fine-e">Skills</div>
    <div class="fine fine-s">Experience</div>
    <div class="fine fine-w">Projects</div>

  </div>
</div>
