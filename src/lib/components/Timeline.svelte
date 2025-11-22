<script>
  import { slide } from 'svelte/transition';

  let events = [
    {
      year: "2014",
      desc: "Picked up an HTML book from my local library, diving me into the world of technology."
    },
    {
      year: "2017",
      desc: "Participated in my first programming competition in Java, sparking my interest for algorithms and problem-solving."
    },
    {
      year: "2019",
      desc: "Learned Python, built my first web scraper and bots to automate tasks."
    },
    {
      year: "2020",
      desc: "Built my first game using Lua on Roblox, achieving a small player count."
    },
    {
      year: "2021",
      desc: "Attended my first undergraduate research experience, learning ML Computer Vision for the first time."
    },
    {
      year: "2022",
      desc: "Published my first research paper in ML on Transformer Vision models, one of the first of its kind, as a highschooler. Presented at multiple conferences, including one sponsored by Lockheed Martin."
    },
    {
      year: "2023",
      desc: "Attended my first internship at ThreatLocker, a cyberseurity firm, learned about cybersecurity and built a USB rubber ducky for penetration testing."
    },
    {
      year: "2024",
      desc: "Won my first hackathon, UF AI Days, by building an AI-powered disaster-relief tool to help first responders."
    },
    {
      year: "2025",
      desc: "Won my second hackathon, SwampHacks, by building a neural network visualizer."
    },
  ];
</script>

<style>
  .timeline {
    margin: 3rem auto;
    position: relative;
    width: 100%;
    max-width: 700px;
  }

  /* Vertical spine */
  .timeline::before {
    content: "";
    position: absolute;
    left: 25px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #7a5f41;
    opacity: 0.8;
  }

    .entry {
    position: relative;

    /* Dynamic spacing: newer years = more margin */
    margin-top: calc((var(--year-offset) - 2014) * 0.25rem + 1.8rem);
    padding-left: 70px;
    }


  /* Dot marker */
  .dot {
    position: absolute;
    left: 19px;
    top: 0.25rem;
    width: 12px;
    height: 12px;
    background: #7a5f41;
    border-radius: 50%;
    box-shadow: 0 0 4px rgba(0,0,0,0.3);
  }

  /* Horizontal branch */
  .branch {
    position: absolute;
    left: 31px;
    top: 0.55rem;
    height: 2px;
    width: 40px;
    background: #7a5f41;
    opacity: 0.7;
  }

  /* Year now sits at the RIGHT END of the branch */
  .year {
    position: absolute;
    left: 75px;         /* 31 + branch(40) = 71 → small spacing */
    top: -0.15rem;      /* vertically aligned with branch */
    font-family: "EB Garamond", serif;
    font-weight: bold;
    font-size: 1.25rem;
    color: #4e3a22;
    white-space: nowrap;
  }

  /* Description now begins immediately to the right of year */
  .desc {
    margin-left: 120px; /* adjust spacing from year */
    font-family: "EB Garamond", serif;
    font-size: 1.05rem;
    color: #3a2a18;
    line-height: 1.45;
    margin-top: 0.3rem;
  }
</style>

<div class="timeline">
  {#each events as e (e.year)}
    <div 
    class="entry" 
    transition:slide={{ duration: 450 }}
    style="--year-offset: {e.year};"
    >

      <div class="dot"></div>
      <div class="branch"></div>

      <!-- Year right after the end of the branch -->
      <div class="year">{e.year}</div>

      <!-- Description to the right of the year -->
      <div class="desc">{e.desc}</div>
    </div>
  {/each}
</div>
