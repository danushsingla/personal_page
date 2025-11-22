<script>
    import { base } from '$app/paths';
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
        { name: "QuestaSim", icon: "/icons/questa.svg" },
        { name: "HiPerGator (UF HPC)", icon: "/icons/hpg.svg" }
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
        { name: "Yolo (Ultralytics)", icon: "/icons/yolo.svg" },
        { name: "Transformers", icon: "/icons/transformers.svg" },
        { name: "Reinforcement Learning", icon: "/icons/rl.svg" },
        { name: "Computer Vision", icon: "/icons/cv.svg" },
        { name: "LIDAR", icon: "/icons/lidar.svg" },
        { name: "Amazon Personalize", icon: "/icons/amazonpersonalize.svg" }
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
</script>

<div class="skills-wrapper">
  <h1 class="title">Skills & Certifications</h1>

  {#each skills as group}
    <section class="skill-block">
      <h2>{group.category}</h2>

      <div class="grid">
        {#each group.items as item}
          <div class="item">
            <img src={base}{item.icon} alt={item.name} class="icon"/>
            <span>{item.name}</span>
          </div>
        {/each}
      </div>
    </section>
  {/each}
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
</style>
