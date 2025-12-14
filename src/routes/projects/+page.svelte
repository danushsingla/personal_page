<script lang="ts">
  import JournalChapter from "$lib/components/JournalChapter.svelte";
  import { chapters } from "$lib/data/journal";

  let query = "";
  let activeTag: string = "ALL";

  const norm = (s: string) => s.toLowerCase().trim();

  // Collect tags from data
  const allTags = Array.from(
    new Set(chapters.flatMap(c => c.entries.flatMap(e => e.tags)))
  ).sort();

  $: filteredChapters = chapters
    .map((c) => {
      const entries = c.entries.filter((e) => {
        const tagOk = activeTag === "ALL" ? true : e.tags.includes(activeTag);
        if (!tagOk) return false;

        const q = norm(query);
        if (!q) return true;

        const hay = norm(
          [
            e.title,
            e.subtitle,
            e.era,
            e.stamp,
            ...e.tags,
            ...e.stack,
            e.story.objective,
            e.story.obstacles,
            e.story.breakthrough,
            e.story.takeaway
          ].join(" ")
        );

        return hay.includes(q);
      });

      return { ...c, entries };
    })
    .filter((c) => c.entries.length > 0);
</script>

<svelte:head>
  <title>Experiences | Journal</title>
</svelte:head>

<section class="wrap">
  <header class="head">
    <div>
      <h1>Field Journal</h1>
      <p class="sub">
        Chapters from the road — projects and experiences recorded as objectives, obstacles, and lessons.
      </p>
    </div>

    <div class="controls">
      <label class="search">
        <span>Search</span>
        <input bind:value={query} placeholder="Try: DMA, ROS2, OS, PostgreSQL…" />
      </label>

      <div class="tags" role="tablist" aria-label="Tag filter">
        <button
          type="button"
          class:selected={activeTag === "ALL"}
          on:click={() => (activeTag = "ALL")}
          aria-selected={activeTag === "ALL"}
        >
          ALL
        </button>

        {#each allTags as t}
          <button
            type="button"
            class:selected={activeTag === t}
            on:click={() => (activeTag = t)}
            aria-selected={activeTag === t}
          >
            {t}
          </button>
        {/each}
      </div>
    </div>
  </header>

  <div class="paper">
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

<style>
  .wrap {
    max-width: 980px;
    margin: 0 auto;
    padding: 2.25rem 1.25rem 4rem;
  }

  .head {
    display: grid;
    gap: 1rem;
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
    max-width: 70ch;
    opacity: 0.86;
  }

  .controls {
    display: grid;
    gap: 0.75rem;
  }

  .search {
    display: grid;
    gap: 0.35rem;
    max-width: 520px;
  }

  .search span {
    font-size: 0.85rem;
    opacity: 0.8;
  }

  input {
    padding: 0.7rem 0.85rem;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.18);
    color: inherit;
    outline: none;
  }

  input:focus {
    border-color: rgba(255,255,255,0.28);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tags button {
    padding: 0.4rem 0.7rem;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.16);
    color: inherit;
    cursor: pointer;
    transition: transform 120ms ease, border-color 120ms ease, background 120ms ease;
    font-size: 0.92rem;
  }

  .tags button:hover {
    transform: translateY(-1px);
    border-color: rgba(255,255,255,0.22);
    background: rgba(0,0,0,0.22);
  }

  .tags button.selected {
    border-color: rgba(255,255,255,0.34);
    background: rgba(255,255,255,0.08);
  }

  .paper {
    position: relative;
    padding: 1.25rem 1rem;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.14);
  }

  .empty {
    padding: 1rem;
  }

  .empty h2 {
    margin: 0 0 0.4rem;
    font-size: 1.1rem;
  }

  .empty p {
    margin: 0;
    opacity: 0.85;
  }
</style>
