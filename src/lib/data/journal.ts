// src/lib/data/journal.ts

export type JournalEntryData = {
  id: string;
  page: number;
  era: string; // e.g. "Fall 2023"
  dates: string; // e.g. "Nov 2023 — Dec 2023"
  stamp: string; // "Systems" | "Robotics" | "Embedded" | "Product"
  title: string; // canonical fallback
  role?: string;
  subtitle: string;
  stack: string[];
  tags: string[];
  story: {
    objective: string;
    obstacles: string;
    breakthrough: string;
    takeaway: string;
  };
  links?: Array<{ label: string; href: string }>;
  fun?: {
    displayTitle?: string; // poetic / journal name
    realTitle?: string; // actual project name
    oneLiner?: string;
    vibe?: string;
  };
};

export type JournalChapterData = {
  id: string;
  title: string;
  subtitle?: string;
  entries: JournalEntryData[];
};

/**
 * Page numbers:
 * - Assigned in chronological order by project START date (earliest start = lowest page).
 * - Ties within the same month are ordered by how “foundational” they feel (platforms first, then derivatives).
 */
export const chapters: JournalChapterData[] = [
  {
    id: "fall-2023",
    title: "Fall 2023 — The First Orbits",
    subtitle: "Learning how systems move when set free.",
    entries: [
      {
        id: "cansat-ui",
        page: 1,
        era: "Fall 2023",
        dates: "Sep 2023 — Feb 2025",
        stamp: "Robotics",
        title: "CanSat Rocket User Interface",
        role: "UI / Systems Developer",
        subtitle:
          "A user interface built for a rocket probe in the CanSat competition. The probe and its supporting system were built from scratch by a student-led team, and the UI focused on reliable monitoring of rocket + atmospheric conditions through serial data streams.",
        stack: ["Python", "Serial I/O", "GUI", "Robotics", "Software Infrastructure"],
        tags: ["CanSat", "Telemetry", "Serial", "GUI"],
        story: {
          objective:
            "Build a dependable, readable UI that turns raw telemetry into real-time insight during test and flight.",
          obstacles:
            "Serial links are brutally honest: noisy data, dropped frames, and timing mismatches show up exactly when you can’t afford them.",
          breakthrough:
            "Treating telemetry as a pipeline (parse → validate → buffer → display) so the UI stays stable even when the stream isn’t.",
          takeaway:
            "A great interface isn’t just pretty—it’s calm under pressure when the hardware gets chaotic."
        },
        fun: {
          displayTitle: "The Telemetry Scribe",
          realTitle: "CanSat Rocket User Interface",
          oneLiner: "A cockpit for numbers falling from the sky.",
          vibe: "Needles steady, logs faithful, and signals made legible."
        },
        links: [
          { label: "GitHub Repository", href: "https://github.com/MaxEpstein/23-24_Cansat" }
        ]
      },
      {
        id: "planettoids",
        page: 2,
        era: "Fall 2023",
        dates: "Nov 2023 — Dec 2023",
        stamp: "Product",
        title: "Planettoids",
        role: "UI Designer",
        subtitle:
          "A video game inspired by the classic Asteroids, built entirely from scratch as part of a University of Florida course project. I was responsible for designing the user interface, including menu systems, level progression, and game termination logic.",
        stack: ["Python", "User Interface Design", "Game Development", "State Machines", "GitHub"],
        tags: ["GameDev", "UI", "Python", "University of Florida"],
        story: {
          objective:
            "Design a cohesive menu and progression system that made the game intuitive from launch to game over.",
          obstacles:
            "Balancing clarity and speed while integrating with a team-built physics and graphics engine under tight academic timelines.",
          breakthrough:
            "Modeling the UI as an explicit state machine, making transitions like start, pause, win, and loss deterministic and testable.",
          takeaway:
            "A game feels polished not when it dazzles, but when the interface never asks the player to hesitate."
        },
        fun: {
          displayTitle: "The Star Cartographer",
          realTitle: "Planettoids",
          oneLiner: "Menus and momentum for a drifting pilot.",
          vibe: "Navigation charts etched for a lone ship among hostile stones."
        },
        links: [
          { label: "GitHub Repository", href: "https://github.com/danushsingla/Planettoids" }
        ]
      },
      {
        id: "pongrl",
        page: 3,
        era: "Winter 2023",
        dates: "Dec 2023 — Jan 2024",
        stamp: "Robotics",
        title: "PongRL",
        role: "Reinforcement Learning Engineer",
        subtitle:
          "A recreation of Pong built from scratch, trained using PPO (Proximal Policy Optimization) to play against a human with a more natural, human-like style.",
        stack: ["Python", "Reinforcement Learning", "PPO", "Gym Environment", "Stable-Baselines3"],
        tags: ["RL", "PPO", "GameDev", "AI"],
        story: {
          objective:
            "Build the game and the learning environment end-to-end so the agent could learn through play, not magic.",
          obstacles:
            "Tiny reward or physics tweaks completely changed behavior—either perfect play or useless chaos.",
          breakthrough:
            "Iterating on reward shaping and environment constraints until learning stabilized and the agent’s play felt believable.",
          takeaway:
            "In RL, the environment is the product—if it’s wrong, the policy learns the wrong world."
        },
        fun: {
          displayTitle: "The Paddle Duelist",
          realTitle: "PongRL",
          oneLiner: "A sparring partner trained on patience and angles.",
          vibe: "Back-and-forth like heartbeat—until the model finds rhythm."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/PongRL" }]
      }
    ]
  },

  {
    id: "summer-2024",
    title: "Summer 2024 — The Builder’s Season",
    subtitle: "Prototypes, pressure, and ideas that refused to stay small.",
    entries: [
      {
        id: "spai-ucb",
        page: 4,
        era: "Summer 2024",
        dates: "Jun 2024 — Jun 2024",
        stamp: "Product",
        title: "SPAI (UC Berkeley Hackathon)",
        role: "Full-Stack Developer",
        subtitle:
          "An AI-integrated application designed for continuous assistance by retrieving data from an expanding information database—aimed at rescue operations and other scenarios where fast, accurate communication matters.",
        stack: ["React", "Supabase", "Whisper API", "JavaScript", "Vercel", "Expo Go"],
        tags: ["Hackathon", "RAG", "Mobile", "Cloud"],
        story: {
          objective:
            "Ship a working end-to-end assistant: capture input → store context → retrieve the right info → respond fast.",
          obstacles:
            "Hackathon time limits forced ruthless prioritization—features had to earn their existence quickly.",
          breakthrough:
            "Designing around a clean data layer in Supabase so retrieval stayed simple and the UI stayed responsive.",
          takeaway:
            "Speed comes from clarity: one reliable path beats five half-built features every time."
        },
        fun: {
          displayTitle: "The Field Oracle",
          realTitle: "SPAI (UC Berkeley Hackathon)",
          oneLiner: "A pocket guide that answers with context, not guesswork.",
          vibe: "Signals in, certainty out—built for urgent minutes."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/uchacks" }]
      },
      {
        id: "big-money-titan",
        page: 5,
        era: "Summer 2024",
        dates: "Jun 2024 — Apr 2025",
        stamp: "Systems",
        title: "BigMoneyTitan",
        role: "LLM Engineer",
        subtitle:
          "A personal Large Language Model built from scratch using the transformer architecture and a custom tokenizer, trained on Tolkien-world texts to continue stories in a Tolkien-like voice. Later iterations incorporated ideas inspired by the Titans research direction to improve memory/context behavior.",
        stack: ["Python", "PyTorch", "NumPy", "Transformers", "Tokenizers", "Training Pipelines"],
        tags: ["LLM", "NLP", "Transformers", "Research"],
        story: {
          objective:
            "Build a transformer + tokenizer from first principles and train it end-to-end on a curated literary dataset.",
          obstacles:
            "Training stability, dataset quality, and long-context behavior all fight you at once—especially on limited compute.",
          breakthrough:
            "Treating data + tokenizer design as first-class components and iterating until the model’s outputs felt consistent.",
          takeaway:
            "Model quality isn’t only architecture—your data and tokenization are part of the model."
        },
        fun: {
          displayTitle: "The Lore-Scribe Engine",
          realTitle: "BigMoneyTitan",
          oneLiner: "A storyteller taught to speak in ancient cadence.",
          vibe: "Pages of Middle-earth, re-lit by attention and memory."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/BigMoneyTitan" }]
      },
      {
        id: "fantasy-olympics",
        page: 6,
        era: "Summer 2024",
        dates: "Jul 2024 — Jul 2024",
        stamp: "Product",
        title: "Fantasy Olympics",
        role: "Full-Stack Developer",
        subtitle:
          "A site to keep users informed about the 2024 Olympics while letting them make predictions on future events, track scores, and follow performance over time.",
        stack: ["Supabase", "JavaScript", "API Routes", "UI Design", "Backend", "Frontend"],
        tags: ["Hackathon", "Web", "Supabase"],
        story: {
          objective:
            "Create a smooth prediction flow: pick events → submit → score → show standings in a way people actually enjoy.",
          obstacles:
            "Live-ish sports contexts change fast, and unclear UI instantly kills engagement.",
          breakthrough:
            "Focusing the product around a simple prediction loop and clean navigation so users could move quickly.",
          takeaway:
            "Prediction apps live or die by friction—make the core action effortless."
        },
        fun: {
          displayTitle: "The Scorekeeper’s Lantern",
          realTitle: "Fantasy Olympics",
          oneLiner: "Predictions carved into a summer scoreboard.",
          vibe: "Crowds roar; numbers settle; the table remembers."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/hackathon1" }]
      },
      {
        id: "personal-landing-page",
        page: 7,
        era: "Summer 2024",
        dates: "Jul 2024 — Jul 2024",
        stamp: "Product",
        title: "Personal Landing Page",
        role: "Frontend Developer",
        subtitle:
          "A landing page showcasing prior projects as a personal introduction—built with a clean visual theme and optimized with A/B testing and analytics to improve clarity and UX.",
        stack: ["HTML", "CSS", "Google Analytics", "A/B Testing", "Branding"],
        tags: ["Frontend", "Branding", "Analytics"],
        story: {
          objective:
            "Create a clean, fast page that tells a story: who I am, what I build, and why it matters—without noise.",
          obstacles:
            "Personal pages can get cluttered fast; the hardest part is choosing what not to show.",
          breakthrough:
            "Using analytics + iteration to remove friction and keep the design sharp and readable.",
          takeaway:
            "A portfolio is a product—measure it, refine it, and make it easy to understand."
        },
        fun: {
          displayTitle: "The Calling Card",
          realTitle: "Personal Landing Page",
          oneLiner: "A quiet page that speaks clearly.",
          vibe: "Ink, spacing, and a story told without shouting."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/landing-page" }]
      },
      {
        id: "additive-vppm",
        page: 8,
        era: "Summer 2024",
        dates: "Jul 2024 — Aug 2024",
        stamp: "Systems",
        title: "Additive Manufacturing VPPM Model",
        role: "ML Researcher",
        subtitle:
          "Implemented an AI approach based on VPPM (Voxel Perceptron Model) ideas to identify weak points and potential failure areas in manufactured items, aiming to catch issues early and improve reliability.",
        stack: ["Python", "Machine Learning", "VPPM", "Super Voxels", "Performance Tuning", "Data Processing"],
        tags: ["Manufacturing", "Computer Vision", "ML"],
        story: {
          objective:
            "Train models that can spot structural weaknesses from real manufacturing data and guide improvements.",
          obstacles:
            "Balancing feature choices and hyperparameters without overfitting—especially when data isn’t perfectly uniform.",
          breakthrough:
            "Running structured experiments across architectures and tuning for generalization instead of chasing loss alone.",
          takeaway:
            "In applied ML, discipline beats cleverness: evaluate honestly, or the model will lie politely."
        },
        fun: {
          displayTitle: "The Fault-Finder",
          realTitle: "Additive Manufacturing VPPM Model",
          oneLiner: "Learning where materials will fail before they do.",
          vibe: "A lattice examined by eyes made of voxels."
        },
        links: [
          {
            label: "GitHub Repository",
            href: "https://github.com/danushsingla/Additive-Manufacturing-AI"
          }
        ]
      }
    ]
  },

  {
    id: "late-summer-2024",
    title: "Late Summer 2024 — The Hacksmith Weeks",
    subtitle: "Systems shipped fast, lessons learned faster.",
    entries: [
      {
        id: "devconnect",
        page: 9,
        era: "Late Summer 2024",
        dates: "Aug 2024 — Sep 2024",
        stamp: "Product",
        title: "DevConnect",
        role: "Full-Stack Developer",
        subtitle:
          "A platform for developers to share web projects for traction, feedback, and collaboration—also enabling builders to find teammates and contributors.",
        stack: ["Next.js", "AWS EC2", "AWS DynamoDB", "Clerk", "MUI"],
        tags: ["Web", "Community", "Full-Stack"],
        story: {
          objective:
            "Build a community platform where posting and feedback feels immediate, social, and motivating.",
          obstacles:
            "Growth without chaos: onboarding, auth, and data modeling all needed to stay simple under rapid iteration.",
          breakthrough:
            "Designing the product around real-time feedback loops so creators got value instantly after posting.",
          takeaway:
            "Communities grow when the reward is fast—make the first win happen early."
        },
        fun: {
          displayTitle: "The Builders’ Bazaar",
          realTitle: "DevConnect",
          oneLiner: "A marketplace of prototypes and collaborators.",
          vibe: "Projects laid out like wares; feedback traded like coin."
        },
        links: [
          { label: "GitHub Repository", href: "https://github.com/danushsingla/capstone_headstarter" }
        ]
      },
      {
        id: "customer-support-ai",
        page: 10,
        era: "Late Summer 2024",
        dates: "Aug 2024 — Aug 2024",
        stamp: "Product",
        title: "Customer Support AI",
        role: "Cloud / AI Developer",
        subtitle:
          "A RAG-based chatbot that answered questions about the (then ongoing) 2024 Olympics. Built and deployed on AWS using EC2, AWS Bedrock (Claude Instant), and an AWS Knowledge Base for retrieval.",
        stack: ["AWS", "EC2", "AWS Bedrock", "Claude Instant", "RAG", "MUI"],
        tags: ["RAG", "AWS", "Chatbot"],
        story: {
          objective:
            "Deploy a chatbot that stays accurate by grounding answers in retrieved sources instead of improvising.",
          obstacles:
            "RAG quality depends on retrieval + prompt discipline; weak grounding quickly becomes confident nonsense.",
          breakthrough:
            "Tightening the retrieval flow and keeping responses tied to knowledge base content for consistency.",
          takeaway:
            "If you want reliability, make the model cite the world—not its imagination."
        },
        fun: {
          displayTitle: "The Stadium Librarian",
          realTitle: "Customer Support AI",
          oneLiner: "Answers pulled from archives, not air.",
          vibe: "A quiet attendant guiding questions through the roar."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/CustomerSupportAI" }]
      },
      {
        id: "flashcards-ai",
        page: 11,
        era: "Late Summer 2024",
        dates: "Aug 2024 — Aug 2024",
        stamp: "Product",
        title: "Flashcards AI",
        role: "Full-Stack Developer",
        subtitle:
          "A flashcard web app that generates cards from uploaded PDFs and stores decks per user for later access. Included authentication and premium access features.",
        stack: ["AWS Bedrock", "LLaMA", "Firebase", "Cloud Firestore", "Clerk", "Stripe", "MUI"],
        tags: ["EdTech", "AI", "Full-Stack"],
        story: {
          objective:
            "Turn PDFs into usable study decks quickly—and make decks easy to revisit and manage.",
          obstacles:
            "File-to-flashcards quality is hard: extraction noise can ruin cards unless you clean and structure carefully.",
          breakthrough:
            "Building a clear pipeline (extract → chunk → generate → store) so results were consistent per user.",
          takeaway:
            "AI study tools win when they’re dependable—students don’t have time to babysit outputs."
        },
        fun: {
          displayTitle: "The Memory Forge",
          realTitle: "Flashcards AI",
          oneLiner: "Turning pages into recall in a few clicks.",
          vibe: "Notes hammered into cards—ready for repetition."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/flashcard" }]
      },
      {
        id: "pantry-tracker",
        page: 12,
        era: "Late Summer 2024",
        dates: "Jul 2024 — Aug 2024",
        stamp: "Product",
        title: "Pantry Tracker",
        role: "Full-Stack / CV Developer",
        subtitle:
          "A pantry tracker that maintains a per-user grocery inventory. Items can be added manually or via a camera feature using a YOLOv8 model to detect objects and auto-add them.",
        stack: ["Python", "Flask", "Firebase", "YOLOv8", "Computer Vision", "API Integration"],
        tags: ["Computer Vision", "Full-Stack", "Firebase"],
        story: {
          objective:
            "Make pantry inventory effortless—scan items or type them, and keep everything synced to the user’s account.",
          obstacles:
            "Vision models are only useful if the UI flow is smooth; otherwise scanning becomes a gimmick.",
          breakthrough:
            "Designing the camera flow to feel quick and integrating backend writes so detected items appeared immediately.",
          takeaway:
            "A CV feature isn’t ‘AI magic’—it’s just another input method. Make it faster than typing."
        },
        fun: {
          displayTitle: "The Larder Sentinel",
          realTitle: "Pantry Tracker",
          oneLiner: "A watchman counting what’s left behind the door.",
          vibe: "Shelves remembered; lists renewed; waste reduced."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/PantryTracker" }]
      },
      {
        id: "pet-social",
        page: 13,
        era: "Late Summer 2024",
        dates: "Aug 2024 — Aug 2024",
        stamp: "Product",
        title: "Pet Social",
        role: "Backend / ML Developer",
        subtitle:
          "A social media site for posting pet pictures and setting up local hangouts. Time constraints limited features, but it became a strong crash course in building fast and learning from constraints.",
        stack: ["Python", "Flask", "TensorFlow", "MySQL", "Clerk", "Recommendation Systems"],
        tags: ["Social", "Recommendations", "Hackathon"],
        story: {
          objective:
            "Prototype a social feed with personalization—posts, feedback (likes/dislikes), and recommendations.",
          obstacles:
            "Hackathon reality: you can’t build everything, and recommendations are only useful once the core loop works.",
          breakthrough:
            "Prioritizing a reliable backend data model + feedback signals so the recommender had something meaningful to learn from.",
          takeaway:
            "Constraints are a feature: they force you to build the spine of the product first."
        },
        fun: {
          displayTitle: "The Friendly Menagerie",
          realTitle: "Pet Social",
          oneLiner: "A little town square for paws encouraging paws.",
          vibe: "Photos like flags—gatherings like campfires."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/petsocial" }]
      },
      {
        id: "rilla-hackathon",
        page: 14,
        era: "Late Summer 2024",
        dates: "Aug 2024 — Aug 2024",
        stamp: "Product",
        title: "Rilla Hackathon",
        role: "Full-Stack Developer",
        subtitle:
          "A tool for small businesses to train sales reps: record conversations, upload audio or text, and attach comments to specific moments—then use AI to summarize those comments. Data stored in DynamoDB.",
        stack: ["AWS DynamoDB", "AWS", "OpenAI API", "EC2", "Clerk", "MUI"],
        tags: ["Sales Enablement", "AI", "Cloud"],
        story: {
          objective:
            "Make coaching actionable: link feedback to exact parts of a conversation and summarize it cleanly.",
          obstacles:
            "Time-aligned annotations are tricky—without structure, comments become a messy note dump.",
          breakthrough:
            "Treating transcripts like documents with anchors so comments stayed attached to precise segments.",
          takeaway:
            "AI summaries matter most when the underlying organization is solid."
        },
        fun: {
          displayTitle: "The Conversation Annotator",
          realTitle: "Rilla Hackathon",
          oneLiner: "Turning talk into training with a scalpel, not a net.",
          vibe: "Margins filled with meaning—coaching made searchable."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/rilla_hackathon" }]
      },
      {
        id: "scholar-score",
        page: 15,
        era: "Late Summer 2024",
        dates: "Aug 2024 — Aug 2024",
        stamp: "Product",
        title: "Scholar Score",
        role: "AI / Data Developer",
        subtitle:
          "An app that ingests a RateMyProfessor link, scrapes reviews, and answers questions grounded in that content. Also included sentiment analysis to produce numerical ratings and visual summaries.",
        stack: ["Web Scraping", "OpenAI API", "Pinecone", "Sentiment Analysis", "RAG", "Python"],
        tags: ["RAG", "NLP", "Scraping"],
        story: {
          objective:
            "Make professor review data queryable: scrape → index → answer questions + generate ratings.",
          obstacles:
            "Scraped text is messy and repetitive; without cleanup and structure, answers degrade fast.",
          breakthrough:
            "Indexing cleaned chunks in Pinecone and coupling responses to retrieved content for consistency.",
          takeaway:
            "When the input is noisy, structure is the difference between insight and mush."
        },
        fun: {
          displayTitle: "The Lecture Almanac",
          realTitle: "Scholar Score",
          oneLiner: "Reviews distilled into signals you can actually use.",
          vibe: "A lantern held up to the classroom’s rumor mill."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/scholarscore" }]
      }
    ]
  },

  {
    id: "fall-2024",
    title: "Fall 2024 — The Human Problems",
    subtitle: "When empathy meets engineering.",
    entries: [
      {
        id: "beheal",
        page: 16,
        era: "Fall 2024",
        dates: "Oct 2024 — Oct 2024",
        stamp: "Product",
        title: "BeHeal",
        role: "AI Developer",
        subtitle:
          "A 2nd-place hackathon project from UF AI Days (sponsored by IBM): an AI-powered tool to help first responders support the mental well-being of natural disaster survivors, grounded in psychology-focused guidance.",
        stack: ["IBM WatsonX", "RAG", "AI", "Research", "Product Design"],
        tags: ["Hackathon", "Healthcare", "RAG"],
        story: {
          objective:
            "Build an assistant that supports responders with empathy-first guidance backed by credible sources.",
          obstacles:
            "High-stakes domain: vague advice is harmful. The system needed grounding and careful framing.",
          breakthrough:
            "Focusing on cited, source-backed responses so the tool stayed responsible instead of speculative.",
          takeaway:
            "In sensitive domains, accuracy and tone are features—not polish."
        },
        fun: {
          displayTitle: "The Gentle First Responder",
          realTitle: "BeHeal",
          oneLiner: "A tool that speaks softly—because people are hurting.",
          vibe: "Practical care, sourced wisdom, and steadier words in storms."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/AI-Hackathon" }]
      }
    ]
  },

  {
    id: "winter-2025",
    title: "Winter 2025 — Strange New Lenses",
    subtitle: "Seeing models differently changes what you can fix.",
    entries: [
      {
        id: "difflogicvisualizer",
        page: 17,
        era: "Winter 2025",
        dates: "Jan 2025 — Jan 2025",
        stamp: "Systems",
        title: "DiffLogicVisualizer",
        role: "Research Engineer",
        subtitle:
          "A visualization concept for neural networks that reframes model weights as logic gates, highlighting which gates contribute to a given prediction—aimed at debugging, interpretability, and understanding failure modes like hallucinations.",
        stack: ["Python", "Next.js", "Machine Learning", "Research", "Web Development"],
        tags: ["Interpretability", "ML", "Research"],
        story: {
          objective:
            "Create a tool that makes model reasoning more inspectable by mapping influence paths into a logic-like view.",
          obstacles:
            "Interpretability tools fail if the visualization is clever but not actionable—signal must be unmistakable.",
          breakthrough:
            "Designing the output around ‘what caused this prediction’ so the visualization naturally points to culprits.",
          takeaway:
            "Debugging improves when explanation is concrete—show the path, not just a number."
        },
        fun: {
          displayTitle: "The Circuit Whisperer",
          realTitle: "DiffLogicVisualizer",
          oneLiner: "Turning opaque weights into visible decisions.",
          vibe: "A lantern held up to the hidden gates behind an answer."
        },
        links: [{ label: "GitHub Repository", href: "https://github.com/danushsingla/DiffLogicVisualizer" }]
      }
    ]
  }
];
