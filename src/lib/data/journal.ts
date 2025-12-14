export type JournalEntryData = {
  id: string;
  page: number;
  era: string;     // "Spring 2025"
  stamp: string;   // "Systems" | "Robotics" | "Embedded" | "Product"
  title: string;
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
};

export type JournalChapterData = {
  id: string;
  title: string;
  subtitle?: string;
  entries: JournalEntryData[];
};

export const chapters: JournalChapterData[] = [
  {
    id: "spring-2025",
    title: "Spring 2025 — The Systems Roads",
    subtitle: "Where abstractions meet steel.",
    entries: [
      {
        id: "memory-manager",
        page: 12,
        era: "Spring 2025",
        stamp: "Systems",
        title: "MemoryManager (C++)",
        subtitle: "A custom allocator with policies that made tradeoffs visible.",
        stack: ["C++", "mmap", "bitmaps", "testing"],
        tags: ["OS", "Memory", "C++"],
        story: {
          objective: "Build a memory allocator that I could reason about, tune, and test.",
          obstacles: "Edge cases (splits/coalescing) that looked correct until concurrency and fragmentation exposed them.",
          breakthrough: "Treating invariants like contracts and instrumenting the allocator to expose its own lies.",
          takeaway: "If you can’t measure fragmentation, you’re guessing—so you’ll ‘optimize’ in the dark."
        },
        links: [{ label: "Repo", href: "https://github.com/yourname/yourrepo" }]
      }
    ]
  },
  {
    id: "fall-2024",
    title: "Fall 2024 — The Embedded Trails",
    subtitle: "Timing, buses, and the honesty of hardware.",
    entries: [
      {
        id: "ebi-sram",
        page: 7,
        era: "Fall 2024",
        stamp: "Embedded",
        title: "XMEGA EBI + SRAM Mapping",
        subtitle: "Built an external bus interface with latches/buffers and deliberate decoding.",
        stack: ["C", "ATXMEGA128A1U", "EBI", "latches"],
        tags: ["Embedded", "Hardware", "Buses"],
        story: {
          objective: "Map SRAM and I/O cleanly and make the address/data dance predictable.",
          obstacles: "Partial decoding and timing assumptions that worked ‘most of the time’—until they didn’t.",
          breakthrough: "Choosing address regions intentionally and verifying with a test harness before trusting the bus.",
          takeaway: "Hardware doesn’t forgive ambiguity. If you’re sloppy, the bugs become physical."
        }
      }
    ]
  }
];
