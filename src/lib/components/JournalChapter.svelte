<script lang="ts">
  import JournalEntry from "$lib/components/JournalEntry.svelte";

  export let chapter: {
    id: string;
    title: string;
    subtitle?: string;
    entries: any[];
  };
</script>

<section class="chapter">
  <header class="chHead">
    <h2>{chapter.title}</h2>
    {#if chapter.subtitle}
      <p>{chapter.subtitle}</p>
    {/if}
  </header>

  <div class="entries">
    {#each chapter.entries as entry (entry.id)}
      <JournalEntry {entry} />
    {/each}
  </div>
</section>

<style>
  .chapter {
    padding: 0.9rem 0.85rem;
    border-radius: var(--radius);
    border: 1px solid var(--line);
    background: var(--card);
  }

  .chHead {
    display: grid;
    gap: 0.25rem;
    margin-bottom: 0.75rem;
  }

  h2 {
    margin: 0;
    font-size: 1.25rem;
    letter-spacing: -0.01em;
  }

  .chHead p {
    margin: 0;
    color: var(--muted);
    max-width: 75ch;
  }

  .entries {
    display: grid;
    gap: 0.75rem;
  }
</style>
