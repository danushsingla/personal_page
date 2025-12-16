<script lang="ts">
  import { base } from "$app/paths";
  import { onMount, onDestroy } from "svelte";

  // Update this selector to match your actual compass element
  const COMPASS_SELECTOR = "#compass, .compass";

  let hintLeft = "90px";
  let hintTop = "170px";

  function positionHint() {
    const compassEl = document.querySelector(COMPASS_SELECTOR) as HTMLElement | null;
    if (!compassEl) return;

    const rect = compassEl.getBoundingClientRect();

    // center hint on compass
    hintLeft = `${rect.left + rect.width / 2}px`;

    // just under compass
    hintTop = `${rect.bottom + 8}px`;
  }

  let cleanup = () => {};

  // Organized skills groups based on your resume
  const skills = [
    {
      category: "Programming Languages",
      items: [
        { name: "Python", icon: "/icons/python.svg" },
        { name: "Java", icon: "/icons/java.svg" },
        { name: "Lua", icon: "/icons/lua.svg" },
        { name: "R", icon: "/icons/r.svg" },
        { name: "C++", icon: "/icons/cplusplus.svg" },
        { name: "JavaScript", icon: "/icons/javascript.svg" },
        { name: "TypeScript", icon: "/icons/typescript.svg" },
        { name: "SQL", icon: "/icons/mysql.svg" }
      ]
    },
    {
      category: "Developer Tools",
      items: [
        { name: "Git", icon: "/icons/git.svg" },
        { name: "Google Colab", icon: "/icons/googlecolab.svg" },
        { name: "Kaggle", icon: "/icons/kaggle.svg" },
        { name: "VS Code", icon: "/icons/vscode.svg" },
        { name: "PyCharm", icon: "/icons/pycharm.svg" },
        { name: "Eclipse", icon: "/icons/eclipseide.svg" },
        { name: "Linux", icon: "/icons/linux.svg" },
        { name: "Quartus/QuestaSim", icon: "/icons/quartus.svg" },
        { name: "HiPerGator (UF HPC)", icon: "/icons/hipergator.svg" }
      ]
    },
    {
      category: "Frameworks & Libraries",
      items: [
        { name: "React", icon: "/icons/react.svg" },
        { name: "Next.js", icon: "/icons/nextdotjs.svg" },
        { name: "Pandas", icon: "/icons/pandas.svg" },
        { name: "NumPy", icon: "/icons/numpy.svg" },
        { name: "Matplotlib", icon: "/icons/matplotlib.svg" },
        { name: "Scikit-learn", icon: "/icons/scikitlearn.svg" },
        { name: "Clerk", icon: "/icons/clerk.svg" },
        { name: "Stripe", icon: "/icons/stripe.svg" },
        { name: "IBM Watsonx", icon: "/icons/watsonx-ai.svg" },
        { name: "Jupyter Notebook", icon: "/icons/jupyter.svg" }
      ]
    },
    {
      category: "AI & Machine Learning",
      items: [
        { name: "PyTorch", icon: "/icons/pytorch.svg" },
        { name: "OpenCV", icon: "/icons/opencv.svg" },
        { name: "Yolo (Ultralytics)/Computer Vision", icon: "/icons/yolo.svg" },
        { name: "Transformers/LLMs", icon: "/icons/transformer.svg" },
        { name: "Reinforcement Learning", icon: "/icons/pong.svg" },
        { name: "LIDAR", icon: "/icons/mil.svg" },
        { name: "Amazon Personalize", icon: "/icons/amazon_personalize.svg" }
      ]
    },
    {
      category: "Cloud & Systems",
      items: [
        { name: "AWS", icon: "/icons/aws.svg" },
        { name: "Snowflake", icon: "/icons/snowflake.svg" },
        { name: "Bash", icon: "/icons/bash.svg" },
        { name: "Anaconda", icon: "/icons/anaconda.svg" }
      ]
    },
    {
      category: "Certifications",
      items: [
        { name: "SOLIDWORKS Associate", icon: "/icons/dassaultsystemes.svg" },
        { name: "NVIDIA Deep Learning", icon: "/icons/nvidia.svg" },
        { name: "NVIDIA Transformer NLP", icon: "/icons/nvidia.svg" }
      ]
    }
  ];

  onMount(() => {
    const onResize = () => positionHint();
    const onScroll = () => positionHint();

    // Initial + next frame (layout can shift)
    positionHint();
    requestAnimationFrame(positionHint);

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Track compass size/position changes too
    const compassEl = document.querySelector(COMPASS_SELECTOR) as HTMLElement | null;
    const ro = compassEl ? new ResizeObserver(() => positionHint()) : null;
    if (ro && compassEl) ro.observe(compassEl);

    cleanup = () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      ro?.disconnect();
    };
  });

  onDestroy(() => cleanup());
</script>

<div class="skills-wrapper">
  <h1 class="title">Skills &amp; Certifications</h1>

  {#each skills as group}
    <section class="skill-block">
      <h2>{group.category}</h2>

      <div class="grid">
        {#each group.items as item}
          <div class="item">
            <img src={`${base}${item.icon}`} alt={item.name} class="icon" />
            <span>{item.name}</span>
          </div>
        {/each}
      </div>
    </section>
  {/each}
</div>

<!-- Compass hint (auto-centers to the compass element) -->
<div class="compass-hint" style={`left:${hintLeft}; top:${hintTop};`}>
  Hover to navigate
</div>

<style>
  .skills-wrapper {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px 20px 160px;
  }

  .title {
    text-align: center;
    font-size: 3rem;
    font-family: "Cormorant Garamond", serif;
    color: #4a3923;
    margin-bottom: 2rem;
  }

  .skill-block {
    margin-bottom: 2.5rem;
  }

  h2 {
    font-size: 1.9rem;
    color: #5a4428;
    margin-bottom: 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.2rem;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.2rem;
    color: #3a2a18;
    font-family: "EB Garamond", serif;
  }

  .item .icon {
    width: 28px;
    height: 28px;
    filter: sepia(60%);
  }

  .compass-hint {
    position: fixed;
    transform: translateX(-50%);
    font-family: "Cormorant Garamond", serif;
    font-size: 1.15rem;
    color: #5b1d1d; /* dark red */
    opacity: 0.9;
    letter-spacing: 0.5px;
    pointer-events: none;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
  }
</style>
