<script lang="ts">
  import JournalChapter from "$lib/components/JournalChapter.svelte";
  import { chapters } from "$lib/data/journal";
    import { onMount, onDestroy } from "svelte";


  // Change this if your compass has a different id/class.
  // Examples: "#compass", ".compass", ".nav-compass"
  const COMPASS_SELECTOR = '#compass, .compass';

  let hintLeft = '90px';
  let hintTop = '170px';

  function positionHint() {
  const compassEl = document.querySelector(COMPASS_SELECTOR) as HTMLElement | null;
  if (!compassEl) return;

  const rect = compassEl.getBoundingClientRect();

  // center hint on compass
  hintLeft = `${rect.left + rect.width / 2}px`;

  // just under compass
  hintTop = `${rect.bottom + 8}px`;
}

let cleanup = () => {};

onMount(() => {
  const onResize = () => positionHint();
  const onScroll = () => positionHint();

  positionHint();
  requestAnimationFrame(positionHint);

  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  cleanup = () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", onScroll);
  };
});

onDestroy(() => cleanup());


  let query = "";
  let activeTag: string = "ALL";

  const norm = (s: string) => (s ?? "").toLowerCase().trim();

  // Collect tags from data
  const allTags = Array.from(
    new Set(
      chapters.flatMap((c: any) => (c.entries ?? []).flatMap((e: any) => e.tags ?? []))
    )
  ).sort((a, b) => a.localeCompare(b));

  const matchesQuery = (entry: any, q: string) => {
    if (!q) return true;

    // Add whatever fields you want searchable here:
    const hay = [
      entry.title,
      entry.subtitle,
      entry.era,
      entry.stamp,
      ...(entry.tags ?? []),
      ...(entry.stack ?? []),
      entry.story?.objective,
      entry.story?.obstacles,
      entry.story?.breakthrough,
      entry.story?.takeaway
    ]
      .filter(Boolean)
      .map((x) => String(x).toLowerCase())
      .join(" | ");

    return hay.includes(q);
  };

  $: q = norm(query);

  $: filteredChapters = chapters
    .map((c: any) => {
      const entries = (c.entries ?? []).filter((e: any) => {
        const tagOk = activeTag === "ALL" ? true : (e.tags ?? []).includes(activeTag);
        const qOk = matchesQuery(e, q);
        return tagOk && qOk;
      });
      return { ...c, entries };
    })
    .filter((c: any) => (c.entries ?? []).length > 0);
</script>

<svelte:head>
  <title>Projects | Field Journal</title>
</svelte:head>

<section class="wrap journalTheme">
  <header class="head">
    <div class="titleBlock">
      <h1>Projects</h1>
    </div>

    <div class="controls">
      <label class="search">
        <input bind:value={query} placeholder="Try: DMA, ROS2, OS, PostgreSQL…" />
      </label>

      <div class="tags" role="tablist" aria-label="Tag filter">
        <button
          class="tag"
          class:active={activeTag === "ALL"}
          on:click={() => (activeTag = "ALL")}
          type="button"
          role="tab"
          aria-selected={activeTag === "ALL"}
        >
          All
        </button>

        {#each allTags as t (t)}
          <button
            class="tag"
            class:active={activeTag === t}
            on:click={() => (activeTag = t)}
            type="button"
            role="tab"
            aria-selected={activeTag === t}
          >
            {t}
          </button>
        {/each}
      </div>
    </div>
  </header>

  <div class="body">
    {#if filteredChapters.length === 0}
      <div class="empty">
        <h2>No matching entries</h2>
        <p>Try removing a tag or searching a broader term.</p>
      </div>
    {:else}
      {#each filteredChapters as chapter (chapter.id)}
        <JournalChapter {chapter} />
      {/each}
    {/if}
  </div>
</section>

<!-- Compass hint (auto-centers to the compass element) -->
<div
  class="compass-hint"
  style="left: {hintLeft}; top: {hintTop};"
>
  Hover to navigate
</div>

<style>
  /* ===== Parchment Theme Scope ===== */
  .journalTheme {
    --paper: #f6eed0;
    --paper-deep: #ead9a6;
    --ink: #1e1a12;
    --muted: rgba(30, 26, 18, 0.74);
    --line: rgba(30, 26, 18, 0.18);
    --line-strong: rgba(30, 26, 18, 0.28);

    --gold: #b8891d;
    --gold-soft: #d9b24c;

    --card: rgba(246, 238, 208, 0.78);
    --card-2: rgba(234, 217, 166, 0.55);

    --shadow: 0 16px 46px rgba(10, 8, 5, 0.18);
    --radius: 16px;

    color: var(--ink);
    font-family: ui-serif, "Iowan Old Style", "Palatino Linotype", Palatino, Garamond, Georgia, serif;

    background:
      radial-gradient(1200px 800px at 20% 10%, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0) 55%),
      radial-gradient(900px 700px at 80% 25%, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0) 60%),
      linear-gradient(180deg, var(--paper), var(--paper-deep));

    border: 1px solid var(--line);
    border-radius: calc(var(--radius) + 6px);
    box-shadow: var(--shadow);
  }

  .wrap {
    max-width: 980px;
    margin: 0 auto;
    padding: 2.25rem 1.25rem 4rem;
  }

  .head {
    display: grid;
    gap: 1.1rem;
    margin-bottom: 1.25rem;
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 3vw, 2.8rem);
    letter-spacing: -0.02em;
    line-height: 1.05;
  }

  .sub {
    margin: 0.5rem 0 0;
    max-width: 72ch;
    color: var(--muted);
  }

  .controls {
    display: grid;
    gap: 0.9rem;
  }

.search input {
  width: 100%;
  box-sizing: border-box; /* ✅ add this */
  padding: 0.75rem 0.85rem;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.35);
  color: var(--ink);
  outline: none;
  font-family: inherit;
}


  .label {
    font-size: 0.9rem;
    color: var(--muted);
  }

  .search input {
    width: 100%;
    padding: 0.75rem 0.85rem;
    border-radius: 12px;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.35);
    color: var(--ink);
    outline: none;
    font-family: inherit;
  }

  .search input:focus {
    border-color: rgba(184, 137, 29, 0.55);
    box-shadow: 0 0 0 3px rgba(184, 137, 29, 0.18);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    cursor: pointer;
    padding: 0.45rem 0.7rem;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.25);
    color: var(--ink);
    font-family: inherit;
    font-size: 0.92rem;
    transition: transform 120ms ease, border-color 120ms ease, background 120ms ease;
  }

  .tag:hover {
    transform: translateY(-1px);
    border-color: rgba(184, 137, 29, 0.55);
    background: rgba(255, 255, 255, 0.35);
  }

  .tag.active {
    border-color: rgba(184, 137, 29, 0.8);
    background: rgba(217, 178, 76, 0.25);
  }

  .body {
    display: grid;
    gap: 1rem;
  }

  .empty {
    padding: 1rem;
    border: 1px dashed var(--line-strong);
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.25);
  }

  .empty h2 {
    margin: 0 0 0.4rem;
    font-size: 1.1rem;
  }

  .empty p {
    margin: 0;
    color: var(--muted);
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
</style>
