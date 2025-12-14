<script lang="ts">
  import { onMount } from "svelte";

  type ThreadId = "Systems" | "Embedded" | "Robotics" | "Product" | "Writing";
  const threads: ThreadId[] = ["Systems", "Embedded", "Robotics", "Product", "Writing"];

  // ✅ Month grid for positioning (resolution)
  type MonthKey =
    `${number}-${"01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10"|"11"|"12"}`;

  const startYear = 2021;
  const endYear = 2025;

  const months: MonthKey[] = [];
  for (let y = startYear; y <= endYear; y++) {
    for (let m = 1; m <= 12; m++) {
      months.push(`${y}-${String(m).padStart(2, "0")}` as MonthKey);
    }
  }

  // ✅ Visible year ticks only
  const yearTicks = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const year = startYear + i;
    return { year, at: `${year}-01` as MonthKey };
  });

  type Link = { label: string; url: string };

  type Span = {
    id: string;
    jobName: string;
    from: MonthKey;
    to: MonthKey;
    on: ThreadId[];     // first element is the anchor lane
    dateText: string;   // explicit (no Spring/Fall ambiguity)
    text: string;
    link?: Link;
  };

  // ✅ Your entries (unchanged except for typing / date format)
  const spans: Span[] = [
    {
      id: "exp-ucf-research",
      jobName: "Undergraduate Research - Computer Vision",
      from: "2021-06",
      to: "2021-08",
      on: ["ucf-computer-vision"],
      dateText: "Jun – Aug 2021",
      text: `While in high school, I participated in an undergraduate research experience at the University of Central Florida, working on computer vision problems involving both images and video. The work paralleled ongoing undergraduate research, giving me early exposure to convolutional neural networks and applied machine learning in a research setting.

- Analyzed human and animal video clips to support the development of future Computer Vision models
- Built action-recognition models using PyTorch to predict human behavior from short video sequences
- Worked in a Linux-based research environment, iterating on data preprocessing and model training workflows`
    },
    {
      id: "exp-prostate-cancer-paper",
      jobName: "Research Publication — AI in Medical Imaging",
      from: "2021-08",
      to: "2022-09",
      on: ["paper"],
      dateText: "Aug 2021 – Sep 2022",
      link: {
        label: "View Publication",
        url: "https://pubmed.ncbi.nlm.nih.gov/36350463/"
      },
      text: `I authored and published a research paper introducing a novel transformer-based U-NET architecture designed to improve the identification and management of prostate cancer using MRI imaging.

- Designed and implemented a transformer-enhanced U-NET model for prostate cancer detection using MRI scans
- Built and trained the model using Python within a Linux-based research environment, managing experiments and data with Git
- Published the research in the Molecular and Cellular Biochemistry Journal
- Presented the work at multiple research competitions and symposia (SSEF, UCF WEALTH Symposium)
- The paper received significant readership and subsequent citations in AI-in-healthcare research`
    },
    {
      id: "exp-threatlocker",
      jobName: "Cybersecurity Intern",
      from: "2023-06",
      to: "2023-08",
      on: ["threatlocker"],
      dateText: "Jun – Aug 2023",
      text: `During my internship at ThreatLocker, I worked within a Zero Trust security environment, gaining hands-on exposure to endpoint protection, intrusion detection, and adversarial threat modeling.

- Developed threat-simulation scripts to evaluate and improve detection mechanisms
- Conducted controlled attack testing, including USB-based infiltration scenarios
- Contributed to internal software updates aimed at improving intrusion detection and prevention workflows
- Assisted team members in diagnosing security incidents and operational security issues`
    },
    {
      id: "exp-ucf-ai-research",
      jobName: "AI Research — Recommendation Systems",
      from: "2023-06",
      to: "2023-09",
      on: ["recommendation"],
      dateText: "Jun – Sep 2023",
      text: `During this research experience at the University of Central Florida, I worked on Point of Interest (POI) recommendation systems, exploring how unsupervised learning could improve the adaptability of recommendation-based algorithms.

- Improved a reinforcement learning–based recommendation model by integrating POI data with feature-generation models
- Generated new datasets for training and evaluation by leveraging the AI network itself
- Used PyTorch to prototype, train, and evaluate models through repeated trials
- Managed code and dataset versioning using GitHub for reproducible experimentation`
    },
    {
      id: "exp-ucf-ai-manufacturing",
      jobName: "AI Research — Additive Manufacturing",
      from: "2024-07",
      to: "2024-08",
      on: ["manufacturing"],
      dateText: "Jul – Aug 2024",
      text: `I worked on applying AI to additive manufacturing (3D printing), with a focus on predicting micro-damage and weak points during the development phase.

- Developed a specialized VPPM-based model for feature regression in additive manufacturing workflows
- Tuned hyperparameters to reduce overfitting and improve loss behavior across training runs
- Engineered and selected features using correlation-matrix analysis to strengthen prediction quality`
    },
    {
      id: "exp-headstarter-fellow",
      jobName: "Software Engineer Fellow",
      from: "2024-07",
      to: "2024-09",
      on: ["headstarter"],
      dateText: "Jul – Sep 2024",
      text: `I participated in a competitive software engineering fellowship focused on building the technical and entrepreneurial skills needed to create and operate technology startups.

- Built and shipped multiple full-stack applications with founders and engineers across the world
- Reached 100+ users across deployed products, using analytics and A/B testing to guide UX decisions
- Integrated frontend, backend, auth, storage, and AI APIs into cohesive systems
- Participated in weekly sessions with engineers and founders from Google, Y Combinator, Amazon, Stanford, and venture-backed startups`
    },
    {
      id: "exp-space-systems-club",
      jobName: "Software Engineer — Space Systems",
      from: "2023-09",
      to: "2025-02",
      on: ["space"],
      dateText: "Sep 2023 – Feb 2025",
      text: `I worked as a software engineer on a student-led space systems project for the CanSat Competition, sponsored by organizations including NASA and Lockheed Martin.

- Developed core software responsible for collecting, transmitting, and displaying sensor data during flight
- Implemented communication pathways between on-board sensors and the ground system, emphasizing reliability
- Contributed to the probe’s UI for real-time sensor visualization
- Diagnosed and reduced communication/networking issues between ground and probe during atmospheric flight
- Collaborated with a multidisciplinary team using GitHub for version control and task coordination`
    },
    {
      id: "exp-ebg-ml-intern",
      jobName: "Data Science / Machine Learning Intern",
      from: "2024-12",
      to: "2025-08",
      on: ["mil"],
      dateText: "Dec 2024 – Aug 2025",
      text: `I worked as a Data Science and Machine Learning Intern at EBG, focusing on scalable recommendation systems and cost-efficient ML infrastructure.

- Built a recommendation pipeline using Amazon Personalize + Python, auto-training on 15,000+ daily purchase events
- Processed 50+ GB of transactional data in Snowflake for model training and evaluation
- Implemented Bash automation to shut down idle SageMaker notebooks, saving about $1,000 in cloud costs`
    },
    {
      id: "exp-mil-auv-research",
      jobName: "Undergraduate Machine Intelligence Researcher",
      from: "2023-08",
      to: "2025-12",
      on: ["Robotics", "Systems"],
      dateText: "Aug 2023 – Present",
      text: `I am an undergraduate researcher in the Machine Intelligence Lab (MIL), working on autonomous underwater vehicles (AUVs) and reliable autonomy in constrained underwater environments.

- Optimized acoustic modem communication to improve reliability and data exchange between AUVs
- Developed and refined ML-based object detection pipelines tailored for underwater environments (including color correction)
- Improved autonomous detection performance by adapting learning techniques to underwater noise and sensor limitations
- Contributed to ongoing research in robotics autonomy, perception, and real-time system integration`
    }
  ];

  // One row per career: draw only on anchor lane (first element)
  const anchorThread = (s: Span) => s.on[0];
  const displayThreads: ThreadId[] = Array.from(new Set(spans.map(anchorThread)));

  // --- Context bands (no cards) ---
  type ContextBand = {
    id: string;
    label: string;
    from: MonthKey;
    to: MonthKey;
    note?: string;
    continuesLeft?: boolean;
    continuesRight?: boolean; // ✅ arrow head if continues past axis
  };

  const axisEnd: MonthKey = `${endYear}-12` as MonthKey;

  const contextBands: ContextBand[] = [
    {
      id: "ctx-highschool",
      label: "High School (started 2017)",
      from: "2021-01",
      to: "2023-05",
      note: "Aug 2017 – May 2023",
      continuesLeft: true
    },
    {
      id: "ctx-uf",
      label: "University of Florida (Undergraduate)",
      from: "2023-08",
      to: axisEnd, // keep axis capped at Dec 2025
      note: "Aug 2023 → Expected May 2027",
      continuesRight: true
    }
  ];

  // --- SVG layout ---
  const labelW = 320;          // widened so job names don’t clip
  const labelPad = labelW + 20;
  const leftPad = labelPad + 20;
  const rightPad = 70;

  const topPad = 96;
  const laneGap = 56;

  const monthGap = 32;         // month resolution
  const sealR = 7;

  const tickLabelY = topPad - 52;
  const tickTopY = topPad - 18;
  const tickBottomY = topPad + (displayThreads.length - 1) * laneGap + 26;

  const xForMonth = (m: MonthKey) => {
    const idx = months.indexOf(m);
    return leftPad + idx * monthGap;
  };

  const yForThread = (th: ThreadId) => topPad + displayThreads.indexOf(th) * laneGap;

  const spanX1 = (s: Span) => xForMonth(s.from);
  const spanX2 = (s: Span) => xForMonth(s.to);

  const yForSpanLabel = (s: Span) => yForThread(anchorThread(s));

  const viewW = leftPad + (months.length - 1) * monthGap + rightPad;
  const viewH = topPad + (displayThreads.length - 1) * laneGap + 100;

  let active: string | null = spans[0]?.id ?? null;

  // bind scroll container so we can programmatically scroll it
  let braidScrollEl: HTMLDivElement | null = null;

  function scrollTimelineToSpan(id: string) {
    if (!braidScrollEl) return;
    const s = spans.find(x => x.id === id);
    if (!s) return;

    const x1 = spanX1(s);
    const x2 = spanX2(s);
    const target = (x1 + x2) / 2;

    braidScrollEl.scrollTo({
      left: Math.max(0, target - braidScrollEl.clientWidth / 2),
      behavior: "smooth"
    });
  }

  function setActive(id: string, opts?: { scrollEntry?: boolean; scrollTimeline?: boolean }) {
    active = id;

    const scrollEntry = opts?.scrollEntry ?? true;
    const scrollTimeline = opts?.scrollTimeline ?? true;

    if (scrollEntry) {
      document.getElementById(`entry-${id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    if (scrollTimeline) {
      scrollTimelineToSpan(id);
    }
  }

  const isActive = (id: string) => active === id;

  onMount(() => {
    if (active) setActive(active, { scrollEntry: false, scrollTimeline: true });
  });
</script>

<svelte:head>
  <title>Experience</title>
</svelte:head>

<section class="wrap">
  <header class="head">
    <h1>Experience</h1>
  </header>

  <div class="braidFrame">
    <div class="parchment" aria-hidden="true"></div>

    <!-- Scroll container -->
    <div
      class="braidScroll"
      bind:this={braidScrollEl}
      role="region"
      aria-label="Scrollable timeline"
    >
      <svg
        class="braid"
        viewBox={`0 0 ${viewW} ${viewH}`}
        style={`width:${viewW}px; height:auto;`}
        role="img"
        aria-label="Thread timeline showing overlaps"
        preserveAspectRatio="xMinYMin meet"
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

        <!-- ✅ Context bands (stacked above the axis) -->
        {#each contextBands as b, i (b.id)}
          {@const x1 = xForMonth(b.from)}
          {@const x2 = xForMonth(b.to)}
          {@const left = Math.min(x1, x2)}
          {@const right = Math.max(x1, x2)}
          {@const h = 14}
          {@const r = 7}
          {@const arrowW = 12}
          {@const arrowPad = 6}
          {@const y = tickLabelY - 22}

          <g class="contextGroup" aria-hidden="true">
            <rect x={left} y={y} width={right - left} height={h} rx={r} class="contextBand" />

            <!-- LEFT continuation arrow -->
            {#if b.continuesLeft}
            <path
                class="contextArrow"
                d={`M ${left + arrowPad} ${y + 2}
                L ${left + arrowPad - arrowW} ${y + h / 2}
                L ${left + arrowPad} ${y + h - 2}
                Z`}
            />
            {/if}

            {#if b.continuesRight}
              <path
                class="contextArrow"
                d={`M ${right - arrowPad} ${y + 2}
                   L ${right - arrowPad + arrowW} ${y + h / 2}
                   L ${right - arrowPad} ${y + h - 2}
                   Z`}
              />
            {/if}

            <text x={left + 10} y={y + h / 2} dominant-baseline="middle" class="contextText">
              {b.label}{b.note ? ` — ${b.note}` : ""}
            </text>
          </g>
        {/each}

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
              x={labelPad - labelW}
              y={y - 16}
              width={labelW - 10}
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
          <line
            x1={leftPad}
            y1={yForThread(th)}
            x2={viewW - rightPad}
            y2={yForThread(th)}
            class="baseline"
          />
        {/each}

        <!-- Month ticks (very subtle) -->
        {#each months as m}
          <line x1={xForMonth(m)} y1={tickTopY} x2={xForMonth(m)} y2={tickBottomY} class="tick month" />
        {/each}

        <!-- Year ticks + labels -->
        {#each yearTicks as t}
          <line x1={xForMonth(t.at)} y1={tickTopY} x2={xForMonth(t.at)} y2={tickBottomY} class="tick year" />
          <text
            x={xForMonth(t.at)}
            y={tickLabelY}
            text-anchor="middle"
            dominant-baseline="middle"
            class="tickLabel"
          >
            {t.year}
          </text>
        {/each}

        <!-- Bands -->
        {#each spans as s (s.id)}
          {@const y = yForThread(anchorThread(s))}
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
            <title>{s.jobName} — {s.dateText}</title>

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
          <span class="range">{s.dateText}</span>

          {#if s.link}
            <span class="sep">•</span>
            <a href={s.link.url} target="_blank" rel="noopener noreferrer" class="pubLink">
              {s.link.label} ↗
            </a>
          {/if}
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

  .braidScroll {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.35rem;
    max-width: 100%;
  }
  .braid { display: block; }

  .divider { stroke: rgba(80, 60, 30, 0.55); stroke-width: 1; }

  /* Context bands */
  .contextBand {
    fill: rgba(120, 90, 35, 0.10);
    stroke: rgba(120, 90, 35, 0.22);
    stroke-width: 1;
  }
  .contextArrow { fill: rgba(120, 90, 35, 0.22); }
  .contextText {
    fill: rgba(0,0,0,0.72);
    font-size: 11px;
    letter-spacing: 0.02em;
  }

  /* ticks */
  .tick.month { stroke: rgba(90, 70, 35, 0.06); }
  .tick.year { stroke: rgba(80, 60, 30, 0.50); }

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

  /* Bands */
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

  .span.inactive .band { opacity: 0.14; }
  .span.inactive .seal { opacity: 0.16; }

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
    background: rgba(255, 246, 220, 0.78);
    border: 1px solid rgba(120, 90, 35, 0.22);
    transition: border-color 160ms ease, background 160ms ease, transform 160ms ease, box-shadow 160ms ease;
  }

  .entry.inactive {
    background: rgba(255, 251, 236, 0.70);
    border-color: rgba(120, 90, 35, 0.18);
  }

  .entry:hover {
    transform: translateY(-1px);
    border-color: rgba(120, 90, 35, 0.32);
    box-shadow: 0 10px 22px rgba(0,0,0,0.10);
  }

  .entry.active {
    background: rgba(255, 236, 170, 0.92);
    border-color: rgba(140, 110, 40, 0.55);
    box-shadow:
      0 10px 26px rgba(0,0,0,0.12),
      inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  }

  .entry.active .entryTitle { font-weight: 700; }
  .entry.active .entryText { opacity: 0.98; }

  .entryHead {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    align-items: center;
    opacity: 0.95;
    user-select: none;
  }
  .sigil { opacity: 0.7; }
  .entryTitle { font-size: 1.05rem; letter-spacing: -0.01em; }
  .sep { opacity: 0.6; }
  .range { opacity: 0.86; font-size: 0.92rem; }
  .entryText { margin-top: 0.75rem; white-space: pre-wrap; line-height: 1.65; opacity: 0.94; cursor: text; }

  .pubLink {
    color: rgba(110, 78, 20, 1);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .pubLink:hover { opacity: 0.85; }

  @media (max-width: 900px) {
    .wrap { padding-left: 1.25rem; padding-top: 3.5rem; }
  }
</style>
