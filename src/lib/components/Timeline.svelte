<script>
  import { slide } from 'svelte/transition';

  let events = [
    {
      year: "2020",
      desc: "Started my journey into robotics and engineering."
    },
    {
      year: "2022",
      desc: "Joined the Subjugator AUV team, diving deep into ROS2 and RL."
    },
    {
      year: "2023",
      desc: "Began exploring AI, HPC, GitHub analytics, and entrepreneurship."
    },
    {
      year: "2024",
      desc: "Growth in philosophy, Stoicism, and self-reflection."
    }
  ];
</script>

<style>
  .timeline {
    margin-top: 2rem;
    border-left: 3px solid #7a5f41;
    padding-left: 1rem;
  }

  .entry {
    margin-bottom: 1.8rem;
    padding-left: 0.4rem;
  }

  .year {
    font-weight: bold;
    font-size: 1.3rem;
    color: #5a4428;
    font-family: "EB Garamond", serif;
  }

  .desc {
    margin-top: 0.3rem;
    font-size: 1.1rem;
    color: #3a2a18;
    line-height: 1.45;
  }
</style>

<div class="timeline">
  {#each events as e (e.year)}
    <div class="entry" transition:slide={{ duration: 500 }}>
      <div class="year">{e.year}</div>
      <div class="desc">{e.desc}</div>
    </div>
  {/each}
</div>
