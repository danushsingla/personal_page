<script lang="ts">
  type ThreadId = "Systems" | "Embedded" | "Robotics" | "Product" | "Writing";
  const threads: ThreadId[] = ["Systems", "Embedded", "Robotics", "Product", "Writing"];

  const ticks = [
    { id: "2023F", label: "Fall 2023" },
    { id: "2024S", label: "Spring 2024" },
    { id: "2024F", label: "Fall 2024" },
    { id: "2025S", label: "Spring 2025" },
    { id: "2025F", label: "Fall 2025" }
  ] as const;

  type TickId = typeof ticks[number]["id"];

  type Span = {
    id: string;
    jobName: string;
    from: TickId;
    to: TickId;       // inclusive
    on: ThreadId[];   // overlap = multiple lanes
    text: string;     // keep your text unchanged
  };

  const spans: Span[] = [
    {
      id: "exp-1",
      jobName: "Systems Work",
      from: "2024F",
      to: "2025F",
      on: ["Systems", "Writing"],
      text: `PASTE YOUR EXISTING TEXT HERE`
    },
    {
      id: "exp-2",
      jobName: "Embedded Work",
      from: "2024S",
      to: "2025S",
      on: ["Embedded", "Systems"],
      text: `PASTE YOUR EXISTING TEXT HERE`
    },
    {
      id: "exp-3",
      jobName: "Robotics",
      from: "2025S",
      to: "2025F",
      on: ["Robotics", "Systems"],
      text: `PASTE YOUR EXISTING TEXT HERE`
    },
    {
      id: "exp-4",
      jobName: "Builder / Product",
      from: "2024F",
      to: "2025F",
      on: ["Product", "Writing"],
      text: `PASTE YOUR EXISTING TEXT HERE`
    }
  ];

  // --- Row strategy: EXACTLY one row per career entry ---
  // We anchor each career entry to a single thread row (the first item in `on`).
  const anchorThread = (s: Span) => s.on[0];

  // Only show lanes for anchor threads (unique) -> one row per career entry
  const displayThreads: ThreadId[] = Array.from(new Set(spans.map(anchorThread)));

  // --- SVG layout ---
  const labelPad = 150;        // left column for job names INSIDE the SVG
  const leftPad = labelPad + 20; // start of timeline area
  const rightPad = 70;

  const topPad = 96;           // pushed down in-SVG
  const laneGap = 56;
  const tickGap = 175;
  const sealR = 7;

  // Dates at the top
  const tickLabelY = topPad - 52;
  const tickTopY = topPad - 18;
  const tickBottomY = topPad + (displayThreads.length - 1) * laneGap + 26;

  const xForTick = (tid: TickId) => {
    const idx = ticks.findIndex(t => t.id === tid);
    return leftPad + idx * tickGap;
  };

  // IMPORTANT: y is now based on displayThreads, not the full threads list
  const yForThread = (th: ThreadId) => topPad + displayThreads.indexOf(th) * laneGap;

  const spanX1 = (s: Span) => xForTick(s.from);
  const spanX2 = (s: Span) => xForTick(s.to);

  // Label Y is the anchor lane Y -> always horizontally level with its thread row
  const yForSpanLabel = (s: Span) => yForThread(anchorThread(s));

  const viewW = leftPad + (ticks.length - 1) * tickGap + rightPad;
  const viewH = topPad + (displayThreads.length - 1) * laneGap + 100;

  let active: string | null = spans[0]?.id ?? null;

  function setActive(id: string) {
    active = id;
    document.getElementById(`entry-${id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  const isActive = (id: string) => active === id;
</script>

<svelte:head>
  <title>Experience</title>
</svelte:head>

<section class="wrap">
  <header class="head">
    <h1>Experience</h1>
    <p class="sub">Overlaps shown as threads.</p>
  </header>

  <div class="braidFrame">
    <div class="parchment" aria-hidden="true"></div>

    <svg
      class="braid"
      viewBox={`0 0 ${viewW} ${viewH}`}
      role="img"
      aria-label="Thread timeline showing overlaps"
      preserveAspectRatio="xMidYMin meet"
    >
      <defs>
        <!-- subtle glow for active bands -->
        <filter id="inkGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Left column divider (job-name column vs timeline) -->
      <line
        x1={labelPad}
        y1={tickTopY}
        x2={labelPad}
        y2={tickBottomY}
        class="divider"
      />

      <!-- Job names aligned with their (anchor) thread row -->
      {#each spans as s (s.id)}
        <g
          class={"jobLabel " + (isActive(s.id) ? "active" : "")}
          role="button"
          tabindex="0"
          on:click={() => setActive(s.id)}
          on:keydown={(e) => e.key === "Enter" && setActive(s.id)}
          aria-label={"Select " + s.jobName}
        >
          <text
            x={labelPad - 14}
            y={yForSpanLabel(s)}
            text-anchor="end"
            dominant-baseline="middle"
            class="jobText"
          >
            {s.jobName}
          </text>
        </g>
      {/each}

      <!-- Thread lanes: ONLY one lane per career entry (no extra unlabeled row) -->
      {#each displayThreads as th}
        <line
          x1={leftPad}
          y1={yForThread(th)}
          x2={viewW - rightPad}
          y2={yForThread(th)}
          class="baseline"
        />
      {/each}

      <!-- Ticks + date labels -->
      {#each ticks as t}
        <line
          x1={xForTick(t.id)}
          y1={tickTopY}
          x2={xForTick(t.id)}
          y2={tickBottomY}
          class="tick"
        />
        <text
          x={xForTick(t.id)}
          y={tickLabelY}
          text-anchor="middle"
          dominant-baseline="middle"
          class="tickLabel"
        >
          {t.label}
        </text>
      {/each}

      <!-- Spans (bands)
           Draw only on lanes that are actually displayed, so no “ghost” row appears.
      -->
      {#each spans as s (s.id)}
        {#each s.on.filter(th => displayThreads.includes(th)) as th (s.id + ":" + th)}
          {@const y = yForThread(th)}
          {@const x1 = spanX1(s)}
          {@const x2 = spanX2(s)}
          <g
            class="span active"
            role="button"
            tabindex="0"
            on:click={() => setActive(s.id)}
            on:keydown={(e) => e.key === "Enter" && setActive(s.id)}
            aria-label={"Open " + s.jobName}
          >
            <path
              d={`M ${x1} ${y}
                 C ${x1 + 26} ${y - 10}, ${x2 - 26} ${y - 10}, ${x2} ${y}
                 C ${x2 - 26} ${y + 10}, ${x1 + 26} ${y + 10}, ${x1} ${y}
                 Z`}
              class="band"
              filter="url(#inkGlow)"
            />
            <circle cx={x1} cy={y} r={sealR} class="seal" />
            <circle cx={x2} cy={y} r={sealR} class="seal" />
          </g>
        {/each}
      {/each}
    </svg>
  </div>

  <!-- Your exact text below -->
  <div class="chronicle">
    {#each spans as s (s.id)}
      <article
        id={"entry-" + s.id}
        class={"entry " + (isActive(s.id) ? "active" : "")}
        on:click={() => (active = s.id)}
      >
        <div class="entryHead">
          <span class="sigil" aria-hidden="true">⟠</span>
          <span class="entryTitle">{s.jobName}</span>
          <span class="sep">•</span>
          <span class="range">
            {ticks.find(t => t.id === s.from)?.label} → {ticks.find(t => t.id === s.to)?.label}
          </span>
        </div>

        <div class="entryText">{s.text}</div>
      </article>
    {/each}
  </div>
</section>

<style>
  /* Shift the whole page away from your compass */
  .wrap {
    max-width: 1100px;
    margin: 0 auto;
    padding: 6.25rem 1.25rem 4rem; /* down */
    padding-left: 7.5rem;         /* right */
  }

  h1 { margin: 0; font-size: clamp(2rem, 3vw, 2.8rem); letter-spacing: -0.02em; line-height: 1.05; }
  .sub { margin: 0.55rem 0 0; opacity: 0.88; max-width: 80ch; }

  .braidFrame {
  margin-top: 1.25rem;
  border-radius: 18px;
  border: 1px solid rgba(90, 70, 30, 0.35);
  background: rgb(245, 232, 190); /* parchment base */
  position: relative;
  overflow: hidden;
  padding: 0.95rem;
}

.parchment {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  mix-blend-mode: multiply;
  background:
    radial-gradient(circle at 18% 25%, rgba(255,255,255,0.45), rgba(0,0,0,0.0) 45%),
    radial-gradient(circle at 82% 70%, rgba(0,0,0,0.08), rgba(0,0,0,0.0) 50%),
    repeating-linear-gradient(
      90deg,
      rgba(120,90,40,0.04) 0px,
      rgba(120,90,40,0.04) 1px,
      rgba(0,0,0,0.0) 6px,
      rgba(0,0,0,0.0) 14px
    );
}


  /* job labels (left) */
  .jobText {
    fill: rgba(0,0,0,1);
    font-size: 12px;
    opacity: 0.82;
    cursor: pointer;
  }
  .jobLabel.active .jobText {
    opacity: 1;
    fill: rgba(0,0,0,1);
  }

.divider {
  stroke: rgba(80, 60, 30, 0.55);
  stroke-width: 1;
}

.tick {
  stroke: rgba(90, 70, 35, 0.45);
}

.baseline {
  stroke: rgba(95, 75, 40, 0.75);
  stroke-width: 2.6;
  stroke-linecap: round;
}


  .tickLabel {
    fill: rgba(0,0,0,0.88);
    font-size: 11px;
    font-variant: small-caps;
    letter-spacing: 0.10em;
  }

.band {
  opacity: 1;
  fill: rgba(210, 170, 70, 0.7);
  stroke: rgba(140, 110, 40, 1);
  stroke-width: 1.9;
  transition: opacity 160ms ease, fill 160ms ease, stroke 160ms ease;
}

.seal {
  opacity: 1;
  fill: rgba(255, 220, 130, 1);
  stroke: rgba(140, 110, 40, 1);
  stroke-width: 1.6;
  transition: opacity 160ms ease;
}

  /* Chronicle */
  .chronicle { margin-top: 1.25rem; display: grid; gap: 0.85rem; }

  .entry {
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(0,0,0,0.16);
    padding: 0.95rem 1rem 1rem;
    transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
  }
  .entry:hover { transform: translateY(-1px); border-color: rgba(255,255,255,0.22); }
  .entry.active { border-color: rgba(255,255,255,0.34); background: rgba(255,255,255,0.04); }

  .entryHead { display: flex; flex-wrap: wrap; gap: 0.55rem; align-items: center; opacity: 0.95; }
  .sigil { opacity: 0.7; }
  .entryTitle { font-size: 1.05rem; letter-spacing: -0.01em; }
  .sep { opacity: 0.6; }
  .range { opacity: 0.86; font-size: 0.92rem; }

  .entryText { margin-top: 0.75rem; white-space: pre-wrap; line-height: 1.65; opacity: 0.94; }

  /* If shifting causes issues on small screens, reduce it */
  @media (max-width: 900px) {
    .wrap { padding-left: 1.25rem; padding-top: 3.5rem; }
  }
</style>
