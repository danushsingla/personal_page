<!-- src/lib/components/JournalEntry.svelte -->
<script lang="ts">
  export let entry: {
    id: string;
    page?: number;
    era?: string;
    dates?: string;
    stamp?: string;
    title: string;
    role?: string;
    subtitle?: string;
    stack?: string[];
    tags?: string[];
    story?: {
      objective?: string;
      obstacles?: string;
      breakthrough?: string;
      takeaway?: string;
    };
    links?: Array<{ label: string; href: string }>;
    fun?: {
      displayTitle?: string;
      realTitle?: string;
      oneLiner?: string;
      vibe?: string;
    };
  };

  let open = false;

  const safe = (v: any, fallback = "—") => (v && String(v).trim().length ? v : fallback);

  $: githubLink = entry.links?.find((l) => (l.label ?? "").toLowerCase().includes("git"));

  // Choose what we want to be the "real" visible project name
  $: realProjectTitle = entry.fun?.realTitle ?? entry.title;
</script>

<article class="entry" class:open>
  <div class="topRow">
    <button class="top" type="button" on:click={() => (open = !open)} aria-expanded={open}>
      <div class="left">
        <div class="metaTop">
          {#if entry.page !== undefined}
            <span class="pageNo">Pg. {entry.page}</span>
            <span class="dot">•</span>
          {/if}

          {#if entry.stamp}
            <span class="stamp">{entry.stamp}</span>
          {/if}
        </div>

        <div class="meta">
          <span class="era">{safe(entry.era)}</span>

          {#if entry.dates}
            <span class="dot">•</span>
            <span class="dates">{entry.dates}</span>
          {/if}

          {#if (entry.tags ?? []).length > 0}
            <span class="dot">•</span>
            <span class="tagsInline">{(entry.tags ?? []).slice(0, 3).join(" · ")}</span>
          {/if}
        </div>

        <!-- ✅ Make the REAL project name the hero -->
        <h3 class="projectTitle">{realProjectTitle}</h3>

        <!-- ✅ Fun title becomes a subtle “epithet” (won’t confuse anyone) -->
        {#if entry.fun?.displayTitle}
          <div class="funLine">
            {#if entry.role}
              {entry.role} <span class="dot">•</span>
            {/if}
            “{entry.fun.displayTitle}”
          </div>
        {/if}


        {#if entry.fun?.oneLiner}
          <div class="funOne">{entry.fun.oneLiner}</div>
        {/if}

        {#if entry.subtitle}
          <p class="sub">{entry.subtitle}</p>
        {/if}

        <div class="bottom">
          <div class="stack">
            {#each (entry.stack ?? []) as s (s)}
              <span class="chip">{s}</span>
            {/each}
          </div>

          <span class="toggle">{open ? "Close" : "More Info"} →</span>
        </div>

        {#if entry.fun?.vibe}
          <div class="vibe">{entry.fun.vibe}</div>
        {/if}
      </div>
    </button>

    {#if githubLink}
      <a
        class="github"
        href={githubLink.href}
        target="_blank"
        rel="noopener noreferrer"
        title="View on GitHub"
        on:click|stopPropagation
      >
        GitHub ↗
      </a>
    {/if}
  </div>

  <div class="body" class:open>
    <div class="grid">
      <section>
        <h4>Objective</h4>
        <p>{safe(entry.story?.objective)}</p>
      </section>

      <section>
        <h4>Obstacles</h4>
        <p>{safe(entry.story?.obstacles)}</p>
      </section>

      <section>
        <h4>Breakthrough</h4>
        <p>{safe(entry.story?.breakthrough)}</p>
      </section>

      <section>
        <h4>Takeaway</h4>
        <p>{safe(entry.story?.takeaway)}</p>
      </section>
    </div>
  </div>
</article>

<style>
  .entry {
    border-radius: var(--radius);
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.24);
    overflow: hidden;
    transition: transform 120ms ease, border-color 120ms ease, background 120ms ease;
  }

  .entry:hover {
    transform: translateY(-1px);
    border-color: rgba(184, 137, 29, 0.45);
    background: rgba(255, 255, 255, 0.28);
  }

  .topRow {
    position: relative;
  }

  .top {
    width: 100%;
    display: block;
    text-align: left;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-family: inherit;
  }

  .github {
    position: absolute;
    top: 0.65rem;
    right: 0.85rem;
    font-size: 0.9rem;
    font-family: inherit;
    color: rgba(184, 137, 29, 0.95);
    text-decoration: none;
    border-bottom: 1px dotted rgba(184, 137, 29, 0.55);
  }

  .github:hover {
    border-bottom-color: rgba(184, 137, 29, 0.95);
  }

  .left {
    padding: 0.95rem 0.95rem 0.85rem;
    display: grid;
    gap: 0.45rem;
  }

  .metaTop {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    flex-wrap: wrap;
    padding-right: 5.5rem;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    flex-wrap: wrap;
    color: var(--muted);
    font-size: 0.95rem;
    padding-right: 5.5rem;
  }

  .dates {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
      monospace;
    font-size: 0.9rem;
    opacity: 0.9;
  }

  .dot {
    opacity: 0.6;
  }

  .pageNo {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
      monospace;
    font-size: 0.9rem;
    color: var(--muted);
  }

  .stamp {
    display: inline-block;
    padding: 0.18rem 0.5rem;
    border-radius: 999px;
    border: 1px solid rgba(184, 137, 29, 0.45);
    background: rgba(217, 178, 76, 0.22);
    font-size: 0.9rem;
  }

  /* ✅ HERO = actual project name */
  .projectTitle {
    margin: 0.1rem 0 0;
    font-size: 1.35rem;
    letter-spacing: -0.01em;
    line-height: 1.12;
    padding-right: 5.5rem;
  }

  /* ✅ Fun title now clearly secondary */
  .funLine {
    color: rgba(30, 26, 18, 0.72);
    font-style: italic;
    font-size: 0.98rem;
    padding-right: 5.5rem;
  }

  .funOne {
    font-size: 0.98rem;
    color: rgba(30, 26, 18, 0.85);
    padding-right: 5.5rem;
  }

  .sub {
    margin: 0;
    color: var(--muted);
    max-width: 80ch;
  }

  .bottom {
    margin-top: 0.25rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .chip {
    display: inline-block;
    padding: 0.22rem 0.5rem;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.22);
    font-size: 0.9rem;
    color: rgba(30, 26, 18, 0.85);
  }

  .toggle {
    font-size: 0.95rem;
    color: rgba(184, 137, 29, 0.95);
    white-space: nowrap;
  }

  .vibe {
    margin-top: 0.25rem;
    color: rgba(30, 26, 18, 0.65);
    font-style: italic;
    max-width: 85ch;
  }

  .body {
    border-top: 1px solid var(--line);
    max-height: 0;
    overflow: hidden;
    transition: max-height 220ms ease;
  }

  .body.open {
    max-height: 1400px;
  }

  .grid {
    padding: 0.85rem 0.95rem 1rem;
    display: grid;
    gap: 0.85rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 780px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }

  h4 {
    margin: 0 0 0.35rem;
    font-size: 1rem;
    letter-spacing: -0.01em;
  }

  .grid p {
    margin: 0;
    color: rgba(30, 26, 18, 0.82);
    line-height: 1.5;
  }
</style>
