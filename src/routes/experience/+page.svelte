<script lang="ts">
  import { onMount } from "svelte";

  type ThreadId = "Systems" | "Embedded" | "Robotics" | "Product" | "Writing";
  const threads: ThreadId[] = ["Systems", "Embedded", "Robotics", "Product", "Writing"];

  // ✅ Invisible month grid for positioning (resolution)
  type MonthKey = `${number}-${"01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10"|"11"|"12"}`;

  const startYear = 2021;
  const endYear = 2025;

  const months: MonthKey[] = [];
  for (let y = startYear; y <= endYear; y++) {
    for (let m = 1; m <= 12; m++) {
      months.push(`${y}-${String(m).padStart(2, "0")}` as MonthKey);
    }
  }

  // ✅ Visible ticks: clean year labels only (keeps UI readable)
  const yearTicks = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const year = startYear + i;
    return { year, at: `${year}-01` as MonthKey };
  });

  type Span = {
    id: string;
    jobName: string;
    from: MonthKey;   // ✅ month-accurate now
    to: MonthKey;     // ✅ month-accurate now
    on: ThreadId[];   // first element is the anchor lane
    dateText: string; // explicit human-readable range (no Spring/Fall ambiguity)
    text: string;
  };

  const spans: Span[] = [
    {
      id: "exp-ucf-research",
      jobName: "Undergraduate Research - Computer Vision",
      from: "2021-06",
      to: "2021-08",
      on: ["ucf-research-undergrad"],
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
    text: `I authored and published a research paper introducing a novel transformer-based U-NET architecture designed to improve the identification and management of prostate cancer using MRI imaging. The work focused on applying advanced computer vision techniques to medical diagnostics, with the goal of improving accuracy and interpretability in clinical settings.

    - Designed and implemented a transformer-enhanced U-NET model for prostate cancer detection using MRI scans
    - Built and trained the model using Python within a Linux-based research environment, managing experiments and data with Git
    - Published the research in the Molecular and Cellular Biochemistry Journal, demonstrating real-world applicability of the proposed architecture
    - Presented the work at multiple research competitions and symposia, including SSEF, UCF WEALTH Symposium, and Lockheed Martin
    - The paper has been cited by multiple subsequent publications and received significant readership within the AI-in-healthcare research community`
    },
    {
      id: "exp-threatlocker",
      jobName: "Cybersecurity Intern",
      from: "2023-06",
      to: "2023-08",
      on: ["threatlocker"],
      dateText: "Jun – Aug 2023",
      text: `During my internship at ThreatLocker, I worked within a Zero Trust security environment, gaining hands-on exposure to endpoint protection, intrusion detection, and adversarial threat modeling. The role emphasized understanding how real systems are attacked, and how software must be designed defensively to anticipate misuse rather than react to it.

- Developed threat-simulation scripts to evaluate and improve detection mechanisms within endpoint security software
- Conducted controlled attack testing, including USB-based infiltration scenarios, to assess system response and resilience
- Contributed to updates in internal software aimed at improving intrusion detection and prevention workflows
- Assisted team members in diagnosing security incidents, account issues, and other operational security concerns`
    },
    {
      id: "exp-ucf-ai-research",
      jobName: "AI Research — Recommendation Systems",
      from: "2023-06",
      to: "2023-09",
      on: ["ucf-recommendation"],
      dateText: "Jun – Sep 2023",
      text: `During this research experience at the University of Central Florida, I worked on Point of Interest (POI) recommendation systems, exploring how unsupervised learning could improve the adaptability and usefulness of recommendation-based algorithms. The work focused on understanding how users interact with complex systems and how models can infer meaningful structure without explicit labels.

- Improved a reinforcement learning–based recommendation model by integrating Point of Interest data with automated feature-generation models
- Generated new datasets for training and evaluation by leveraging the AI network itself, enabling iterative experimentation
- Used PyTorch to prototype, train, and evaluate models, refining system behavior through repeated trials
- Managed code and dataset versioning using GitHub to support reproducible training and experimentation`
    },
    {
    id: "exp-ucf-ai-manufacturing",
    jobName: "AI Research — Additive Manufacturing",
    from: "2024-07",
    to: "2024-08",
    on: ["Systems", "Product"],
    dateText: "Jul – Aug 2024",
    text: `I worked on applying AI to additive manufacturing (3D printing), with a focus on predicting micro-damage and weak points during the development phase. The idea was to surface risk early enough that corrective measures could be taken before defects compounded later in the manufacturing process.

    - Developed a specialized VPPM-based model for feature regression in additive manufacturing workflows
    - Tuned model hyperparameters to reduce overfitting and improve loss behavior across training runs
    - Engineered and selected features using correlation-matrix analysis to strengthen prediction quality`
    },
    {
    id: "exp-headstarter-fellow",
    jobName: "Software Engineer Fellow",
    from: "2024-07",
    to: "2024-09",
    on: ["Product", "Systems"],
    dateText: "Jul – Sep 2024",
    text: `I participated in a competitive software engineering fellowship focused on building the technical and entrepreneurial skills needed to create and operate technology startups. The program emphasized rapid iteration, real user feedback, and full-stack execution at production scale. This experience allowed me to work closely with founders and engineers from around the world, shipping real products to active users.

    - Built and shipped multiple full-stack applications in collaboration with founders and engineers from around the world
    - Reached over 100 active users across deployed products, using analytics and A/B testing to guide product and UX decisions
    - Worked across modern web and cloud stacks, integrating frontend, backend, authentication, data storage, and AI APIs into cohesive systems
    - Participated in weekly sessions and technical reviews with engineers and founders from organizations such as Google, Y Combinator, Amazon, Stanford, and venture-backed startups`
    },
    {
    id: "exp-space-systems-club",
    jobName: "Software Engineer — Space Systems",
    from: "2023-09",
    to: "2025-02",
    on: ["Robotics", "Systems"],
    dateText: "Sep 2023 – Feb 2025",
    text: `I worked as a software engineer on a student-led space systems project focused on designing and building a complete probe from the ground up for the CanSat Competition, sponsored by organizations including NASA and Lockheed Martin. The mission required the probe to survive launch, collect data in-flight, and safely return while protecting a fragile payload.

    - Developed core software responsible for collecting, transmitting, and displaying sensor data from the probe during flight
    - Implemented communication pathways between on-board sensors and the ground system, emphasizing reliability under constrained conditions
    - Contributed to the design and implementation of the probe’s user interface for real-time sensor visualization
    - Diagnosed and reduced communication and networking issues between the ground computer and the probe during atmospheric flight
    - Collaborated with a multidisciplinary team using GitHub for version control and task coordination, and supported other members in adopting effective software development workflows`
    },
    {
    id: "exp-ebg-ml-intern",
    jobName: "Data Science / Machine Learning Intern",
    from: "2024-12",
    to: "2025-08",
    on: ["Data Science"],
    dateText: "Dec 2024 – Aug 2025",
    text: `I worked as a Data Science and Machine Learning Intern at EBG, an e-commerce company focused on making entertainment, travel, and lifestyle benefits more accessible to working professionals through partnerships with organizations. My work centered on building scalable recommendation systems and improving the reliability and cost-efficiency of machine learning infrastructure.

    - Designed and deployed a machine learning recommendation pipeline using Amazon Personalize and Python, auto-training on over 15,000 daily purchase events to surface relevant products to users
    - Processed and prepared more than 50 GB of raw transactional data in Snowflake to support model training, evaluation, and experimentation
    - Implemented automation scripts in Bash to detect and shut down idle Amazon SageMaker notebook instances, reducing unnecessary cloud usage and saving approximately $1,000 in infrastructure costs
    - Worked closely with cloud-based ML tooling and data pipelines, emphasizing robustness, scalability, and cost-aware system design`
    },
    {
    id: "exp-mil-auv-research",
    jobName: "Undergraduate Machine Intelligence Researcher",
    from: "2023-08",
    to: "2025-12",
    on: ["MIL"],
    dateText: "Aug 2023 – Present",
    text: `I am an undergraduate researcher in the Machine Intelligence Lab (MIL), working on autonomous underwater vehicles (AUVs) and the challenges associated with operating robotic systems in real-world, high-uncertainty environments. My work spans machine learning, real-time perception, and communication systems, with a focus on enabling reliable autonomy in underwater conditions where sensing and connectivity are inherently constrained.

    - Optimized acoustic modem communication to improve reliability and data exchange between autonomous underwater vehicles
    - Developed and refined machine-learning–based object detection pipelines tailored for underwater environments, including color correction and visibility challenges
    - Improved autonomous object detection performance by tuning and adapting learning techniques to account for underwater noise, lighting distortion, and sensor limitations
    - Contributed to ongoing research in robotics autonomy, perception, and system integration for real-time underwater operation`
    },
  ];

  // One row per career: draw only on anchor thread (first element)
  const anchorThread = (s: Span) => s.on[0];
  const displayThreads: ThreadId[] = Array.from(new Set(spans.map(anchorThread)));

  // --- SVG layout ---
  const labelW = 280;
  const labelPad = labelW + 20;
  const leftPad = labelPad + 20;
  const rightPad = 70;

  const topPad = 96;
  const laneGap = 56;

  const monthGap = 32; // ✅ month resolution (tweak to taste)
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

  // ✅ keep your “auto scroll to active item” behavior (entry + timeline)
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

        <!-- ✅ Invisible month ticks (for subtle spacing, optional) -->
        {#each months as m}
          <line
            x1={xForMonth(m)}
            y1={tickTopY}
            x2={xForMonth(m)}
            y2={tickBottomY}
            class="tick month"
          />
        {/each}

        <!-- ✅ Visible year ticks + labels -->
        {#each yearTicks as t}
          <line
            x1={xForMonth(t.at)}
            y1={tickTopY}
            x2={xForMonth(t.at)}
            y2={tickBottomY}
            class="tick year"
          />
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
    <a
      href={s.link.url}
      target="_blank"
      rel="noopener noreferrer"
      class="pubLink"
    >
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

  /* ✅ month ticks exist but are basically invisible */
  .tick.month { stroke: rgba(90, 70, 35, 0.06); }

  /* ✅ year ticks are visible */
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
