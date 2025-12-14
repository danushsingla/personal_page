<script lang="ts">
  export let entry: {
    id: string;
    page: number;
    era: string;
    stamp: string;          // e.g. "Systems", "Robotics", "Embedded"
    title: string;
    subtitle: string;
    stack: string[];
    tags: string[];
    story: {
      objective: string;
      obstacles: string;
      breakthrough: string;
      takeaway: string;
    };
    links?: Array<{ label: string; href: string }>;
  };

  let open = false;
</script>

<article class="row">
  <aside class="margin" aria-hidden="true">
    <div class="pageNo">p. {entry.page}</div>
    <div class="stamp">{entry.stamp}</div>
    <div class="inkTrail"></div>
  </aside>

  <div class="card">
    <button class="top" type="button" on:click={() => (open = !open)} aria-expanded={open}>
      <div class="meta">
        <span class="era">{entry.era}</span>
        <span class="dot">•</span>
        <span class="tagsInline">{entry.tags.slice(0, 2).join(" · ")}</span>
      </div>

      <h3>{entry.title}</h3>
      <p class="sub">{entry.subtitle}</p>

      <div class="bottom">
        <div class="stack">
          {#each entry.stack as s (s)}
            <span class="chip">{s}</span>
          {/each}
        </div>
        <span class="toggle">{open ? "Close" : "Open"} →</span>
      </div>
    </button>

    <div class="body" class:open>
      <div class="grid">
        <section>
          <h4>Objective</h4>
          <p>{entry.story.objective}</p>
        </section>
        <section>
          <h4>Obstacles</h4>
          <p>{entry.story.obstacles}</p>
        </section>
        <section>
          <h4>Breakthrough</h4>
          <p>{entry.story.breakthrough}</p>
        </section>
        <section>
          <h4>Takeaway</h4>
          <p>{entry.story.takeaway}</p>
        </section>
      </div>

      {#if entry.links?.length}
        <div class="links">
          {#each entry.links as l (l.href)}
            <a href={l.href} target="_blank" rel="noreferrer">{l.label} →</a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</article>

<style>
  .row {
    display: grid;
    grid-template-columns: 92px 1fr;
    gap: 0.9rem;
    align-items: start;
  }

  .margin {
    position: relative;
    padding-top: 0.5rem;
    opacity: 0.9;
  }

  .pageNo {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.9rem;
    opacity: 0.85;
  }

  .stamp {
    margin-top: 0.45rem;
    display: inline-block;
    padding: 0.2rem 0.45rem;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.06);
    font-size: 0.85rem;
  }

  .inkTrail {
    margin-top: 0.65rem;
    width: 2px;
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(
      to bottom,
      rgba(255,255,255,0.0),
      rgba(255,255,255,0.22),
      rgba(255,255,255,0.0)
    );
  }

  .card {
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.16);
    overflow: hidden;
  }

  .top {
    width: 100%;
    text-align: left;
    padding: 0.95rem 1rem;
    background: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
  }

  .top:hover .toggle {
    opacity: 1;
  }

  .meta {
    font-size: 0.9rem;
    opacity: 0.82;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.35rem;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
    letter-spacing: -0.01em;
  }

  .sub {
    margin: 0.35rem 0 0;
    opacity: 0.84;
    max-width: 75ch;
  }

  .bottom {
    margin-top: 0.75rem;
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: space-between;
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .chip {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.85rem;
    padding: 0.15rem 0.4rem;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.05);
  }

  .toggle {
    font-size: 0.9rem;
    opacity: 0.75;
    transition: opacity 120ms ease;
    white-space: nowrap;
  }

  .body {
    max-height: 0px;
    opacity: 0;
    overflow: hidden;
    transition: max-height 240ms ease, opacity 200ms ease;
    border-top: 1px solid rgba(255,255,255,0.10);
  }

  .body.open {
    max-height: 900px;
    opacity: 1;
  }

  .grid {
    padding: 0.9rem 1rem 0.4rem;
    display: grid;
    gap: 0.75rem;
  }

  .grid h4 {
    margin: 0 0 0.25rem;
    font-size: 0.92rem;
    opacity: 0.9;
  }

  .grid p {
    margin: 0;
    opacity: 0.85;
    line-height: 1.45;
  }

  .links {
    padding: 0.25rem 1rem 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  a {
    opacity: 0.9;
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.18);
  }

  a:hover {
    border-bottom-color: rgba(255,255,255,0.42);
  }

  .dot {
    opacity: 0.6;
  }

  @media (max-width: 700px) {
    .row {
      grid-template-columns: 1fr;
    }
    .inkTrail {
      display: none;
    }
    .margin {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }
    .stamp {
      margin-top: 0;
    }
  }
</style>
