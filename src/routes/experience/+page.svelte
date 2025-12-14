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
    on: ThreadId[];   // overlap metadata only now (we draw on anchor)
    text: string;
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

  // One row per career: draw only on anchor thread (first element)
  const anchorThread = (s: Span) => s.on[0];
  const displayThreads: ThreadId[] = Array.from(new Set(spans.map(anchorThread)));

  // --- SVG layout ---
  const labelPad = 150;
  const leftPad = labelPad + 20;
  const rightPad = 70;

  const topPad = 96;
  const laneGap = 56;
  const tickGap = 175;
  const sealR = 7;

  const tickLabelY = topPad - 52;
  const tickTopY = topPad - 18;
  const tickBottomY = topPad + (displayThreads.length - 1) * laneGap + 26;

  const xForTick = (tid: TickId) => {
    const idx = ticks.findIndex(t => t.id === tid);
    return leftPad + idx * tickGap;
  };

  const yForThread = (th: ThreadId) => topPad + displayThreads.indexOf(th) * laneGap;

  const spanX1 = (s: Span) => xForTick(s.from);
  const spanX2 = (s: Span) => xForTick(s.to);

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
        <filter id="inkGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <line x1={labelPad} y1={tickTopY} x2={labelPad} y2={tickBottomY} class="divider" />

      <!-- Job labels with halo -->
      {#each spans as s (s.id)}
        {@const y = yForSpanLabel(s)}
        <g
            class="jobLabel"
            class:active={active === s.id}
          role="button"
          tabindex="0"
          on:click={() => setActive(s.id)}
          on:keydown={(e) => e.key === "Enter" && setActive(s.id)}
          aria-label={"Select " + s.jobName}
        >
          <rect
            x={labelPad - 150}
            y={y - 16}
            width={140}
            height={32}
            rx={16}
  class="jobHalo"
  class:on={active === s.id}
          />

          <text
            x={labelPad - 14}
            y={y}
            text-anchor="end"
            dominant-baseline="middle"
            class="jobText"
          >
            {s.jobName}
          </text>
        </g>
      {/each}

      <!-- Lanes -->
      {#each displayThreads as th}
        <line x1={leftPad} y1={yForThread(th)} x2={viewW - rightPad} y2={yForThread(th)} class="baseline" />
      {/each}

      <!-- Ticks -->
      {#each ticks as t}
        <line x1={xForTick(t.id)} y1={tickTopY} x2={xForTick(t.id)} y2={tickBottomY} class="tick" />
        <text x={xForTick(t.id)} y={tickLabelY} text-anchor="middle" dominant-baseline="middle" class="tickLabel">
          {t.label}
        </text>
      {/each}

      <!-- Bands: EXACTLY one per career (anchor thread only) -->
      {#each spans as s (s.id)}
        {@const th = anchorThread(s)}
        {@const y = yForThread(th)}
        {@const x1 = spanX1(s)}
        {@const x2 = spanX2(s)}
        <g
        class="span"
        class:active={active === s.id}
        class:inactive={active !== s.id}
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
            filter={isActive(s.id) ? "url(#inkGlow)" : undefined}
          />
          <circle cx={x1} cy={y} r={sealR} class="seal" />
          <circle cx={x2} cy={y} r={sealR} class="seal" />
        </g>
      {/each}
    </svg>
  </div>

<!-- Chronicle -->
<div class="chronicle">
  {#each spans as s (s.id)}
    <article
      id={"entry-" + s.id}
      class="entry"
      class:active={active === s.id}
      class:inactive={active !== s.id}
      on:click={() => setActive(s.id)}
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
  .wrap {
    max-width: 1100px;
    margin: 0 auto;
    padding: 6.25rem 1.25rem 4rem;
    padding-left: 7.5rem;
  }

  h1 { margin: 0; font-size: clamp(2rem, 3vw, 2.8rem); letter-spacing: -0.02em; line-height: 1.05; }
  .sub { margin: 0.55rem 0 0; opacity: 0.88; max-width: 80ch; }

  .braidFrame {
    margin-top: 1.25rem;
    border-radius: 18px;
    border: 1px solid rgba(90, 70, 30, 0.35);
    background: rgb(245, 232, 190);
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

  .divider { stroke: rgba(80, 60, 30, 0.55); stroke-width: 1; }
  .tick { stroke: rgba(90, 70, 35, 0.45); }
  .baseline { stroke: rgba(95, 75, 40, 0.75); stroke-width: 2.6; stroke-linecap: round; }

  .tickLabel {
    fill: rgba(0,0,0,0.88);
    font-size: 11px;
    font-variant: small-caps;
    letter-spacing: 0.10em;
  }

  /* Job labels */
  .jobLabel { cursor: pointer; }
  .jobText { fill: rgba(0,0,0,1); font-size: 12px; opacity: 0.82; }
  .jobLabel.active .jobText { opacity: 1; font-size: 13px; font-weight: 650; }

  .jobHalo {
    fill: rgba(255, 220, 130, 0.0);
    stroke: rgba(140, 110, 40, 0.0);
    stroke-width: 1.4;
    opacity: 0;
    transition: opacity 140ms ease, fill 140ms ease, stroke 140ms ease;
  }
  .jobLabel:hover .jobHalo {
    opacity: 0.55;
    fill: rgba(255, 220, 130, 0.55);
    stroke: rgba(140, 110, 40, 0.85);
  }
  .jobHalo.on {
    opacity: 0.95;
    fill: rgba(255, 220, 130, 0.88);
    stroke: rgba(140, 110, 40, 1);
  }

  /* Base band look */
  .band {
    fill: rgba(210, 170, 70, 0.65);
    stroke: rgba(140, 110, 40, 0.95);
    stroke-width: 1.9;
    transition: opacity 160ms ease, fill 160ms ease, stroke 160ms ease;
  }
  .seal {
    fill: rgba(255, 220, 130, 1);
    stroke: rgba(140, 110, 40, 1);
    stroke-width: 1.6;
    transition: opacity 160ms ease, fill 160ms ease, stroke 160ms ease;
  }

  /* INACTIVE should clearly disappear */
  .span.inactive .band { opacity: 0.14; }
  .span.inactive .seal { opacity: 0.16; }

  /* ACTIVE should clearly “light up” */
  .span.active .band {
    opacity: 1;
    fill: rgba(240, 205, 110, 0.95);
    stroke: rgba(110, 78, 20, 1);
    stroke-width: 2.45;
  }
  .span.active .seal {
    opacity: 1;
    fill: rgba(255, 236, 180, 1);
    stroke: rgba(110, 78, 20, 1);
    stroke-width: 1.9;
  }

  /* Hover highlight ONLY for inactive (so it doesn't override active) */
  .span.inactive:hover .band {
    opacity: 0.65;
    fill: rgba(230, 190, 90, 0.85);
    stroke: rgba(120, 90, 30, 1);
  }
  .span.inactive:hover .seal { opacity: 0.85; }


    /* Chronicle */
    .chronicle { margin-top: 1.25rem; display: grid; gap: 0.85rem; }

    .entry {
    border-radius: 16px;
    padding: 0.95rem 1rem 1rem;
    cursor: pointer;

    /* default = “light parchment” (inactive) */
    background: rgba(255, 246, 220, 0.78);
    border: 1px solid rgba(120, 90, 35, 0.22);

    transition: border-color 160ms ease, background 160ms ease, transform 160ms ease, box-shadow 160ms ease;
    }

    .entry.inactive {
    /* slightly paler so active stands out */
    background: rgba(255, 251, 236, 0.70);
    border-color: rgba(120, 90, 35, 0.18);
    }

    .entry:hover {
    transform: translateY(-1px);
    border-color: rgba(120, 90, 35, 0.32);
    box-shadow: 0 10px 22px rgba(0,0,0,0.10);
    }

    .entry.active {
    /* “lit up” light yellow highlight */
    background: rgba(255, 236, 170, 0.92);
    border-color: rgba(140, 110, 40, 0.55);
    box-shadow:
        0 10px 26px rgba(0,0,0,0.12),
        inset 0 0 0 1px rgba(255, 255, 255, 0.35);
    }

    /* Optional: make active text feel a touch richer */
    .entry.active .entryTitle { font-weight: 700; }
    .entry.active .entryText { opacity: 0.98; }


  .entryHead { display: flex; flex-wrap: wrap; gap: 0.55rem; align-items: center; opacity: 0.95; user-select: none; }
  .sigil { opacity: 0.7; }
  .entryTitle { font-size: 1.05rem; letter-spacing: -0.01em; }
  .sep { opacity: 0.6; }
  .range { opacity: 0.86; font-size: 0.92rem; }
  .entryText { margin-top: 0.75rem; white-space: pre-wrap; line-height: 1.65; opacity: 0.94; cursor: text; }

  @media (max-width: 900px) {
    .wrap { padding-left: 1.25rem; padding-top: 3.5rem; }
  }
</style>
