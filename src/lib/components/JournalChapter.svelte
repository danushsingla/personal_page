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
    padding: 0.75rem 0.35rem 1.2rem;
  }

  .chHead {
    display: grid;
    gap: 0.25rem;
    margin: 0.25rem 0 0.85rem;
    padding-left: 0.4rem;
  }

  .chHead h2 {
    margin: 0;
    font-size: 1.2rem;
    letter-spacing: -0.01em;
  }

  .chHead p {
    margin: 0;
    opacity: 0.78;
    max-width: 70ch;
  }

  .entries {
    display: grid;
    gap: 0.75rem;
  }
</style>
