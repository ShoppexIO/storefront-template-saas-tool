/**
 * Storefront content configuration.
 *
 * This is the second CUSTOMIZE surface (after theme.config.ts). Edit this
 * file to change products, plans, status reports, reviews, and other
 * content without touching component code.
 *
 * For LLM agents: see CLAUDE.md → "Customizing the catalog" for recipes.
 *
 * Note on data shape:
 *   - In demo mode (NEXT_PUBLIC_SHOPPEX_USE_SAMPLE_DATA=true), this file is
 *     the source of truth.
 *   - In live mode, products and reviews come from Shoppex via @shoppexio/
 *     storefront. Status, plans, and jobs are always config-driven (Shoppex
 *     does not host these surfaces).
 */

export type StatusBadge = "Undetected" | "Detected" | "Up to Date" | "Updating";

export type StatusReport = {
  productSlug: string;
  detectionStatus: "undetected" | "detected";
  detectionLabel: string;
  versionStatus: "up-to-date" | "updating";
  detail: string;
};

export type SubscriptionPlan = {
  /** Stable plan id used by the modal selector. Keep readable, e.g. "30d". */
  id: string;
  label: string;
  durationDays: number;
  price: number;
  popular?: boolean;
  /**
   * Live mode — Shoppex product id this plan resolves to. Used by the
   * checkout SDK to create an invoice. In demo mode this is ignored.
   */
  productId?: string;
  /**
   * Live mode — Shoppex variant id, if the product has variants. Use
   * "default" or omit for a single-variant product.
   */
  variantId?: string;
};

export type ToolFeature = {
  /** Lucide-style icon key. See `requirement-icon.tsx` for available glyphs. */
  icon: "crosshair" | "zap" | "shield" | "target" | "timer" | "eye" | "settings" | "user" | "lock";
  title: string;
  /** Sub-feature count rendered as a small badge on the right of the row. */
  count: number;
  /** Optional one-line description shown below the title. */
  description?: string;
};

export type ToolProduct = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  /** YouTube video ID for the showcase player on the detail page. Optional. */
  videoId?: string | null;
  /** Cover image. Pulled from /public if relative. */
  coverImage?: string | null;
  /** System requirements rendered in a 2x2 grid on the detail page. */
  requirements: { icon: "cpu" | "os" | "platform" | "shield" | "drive"; label: string }[];
  /** Plans to render in the 3-card selector. Recommend 3 plans. */
  plans: SubscriptionPlan[];
  /** "What you get" feature list rendered on the detail page. Optional. */
  features?: ToolFeature[];
  /** Product-specific FAQ rendered at the bottom of the detail page. Optional. */
  faq?: FaqItem[];
};

export type CustomerReview = {
  username: string;
  productLabel: string;
  body: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export type FeatureHighlight = {
  icon: "shield" | "rocket" | "infinite" | "settings" | "zap" | "refresh";
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PaymentMethod = {
  id: "visa" | "mastercard" | "bitcoin" | "litecoin" | "ethereum" | "paypal";
  label: string;
};

export type ToolStep = {
  number: number;
  title: string;
  description: string;
  icon: "download" | "spark" | "play";
};

export type JobOpening = {
  slug: string;
  category: string;
  title: string;
  description: string;
  applyUrl: string;
  coverImage?: string | null;
};

// CUSTOMIZE: Catalog -------------------------------------------------------
// Each entry becomes a card on the home grid + /products grid + /products/[slug]
// detail page. The first three plans are rendered as a 3-card vertical selector.
//
// Demo uses generic genre-based names (no real-game trademarks) so this template
// is safe to fork. Replace with your own product names + cover images in /public.
export const tools: ToolProduct[] = [
  {
    slug: "survival-pro",
    title: "Survival Pro",
    shortDescription: "Dominate open-world PvP and wipe rival bases.",
    longDescription:
      "Survival Pro is built for open-world survival servers. Predictive aimbot, full creature and player ESP, vehicle ESP, and a silent-aim mode tuned for raids.",
    category: "Survival",
    videoId: null,
    coverImage: "/covers/survival-pro.jpg",
    requirements: [
      { icon: "cpu", label: "Intel/AMD" },
      { icon: "os", label: "Windows 10/11" },
      { icon: "platform", label: "Steam/Epic" },
      { icon: "shield", label: "Anti-cheat Aware" },
    ],
    // Live mode wires this tool to the phantom-demo "Arc Raiders Ultimate" product.
    plans: [
      {
        id: "1d",
        label: "1 Day",
        durationDays: 1,
        price: 8.99,
        productId: "019d64d4-6db4-7c29-8048-7ef75ae02420",
        variantId: "019d64d4-6dd9-7c6d-be87-43778018c394",
      },
      {
        id: "7d",
        label: "7 Days",
        durationDays: 7,
        price: 22.99,
        productId: "019d64d4-6db4-7c29-8048-7ef75ae02420",
        variantId: "019d64d4-6dd9-7c6d-be87-4378bb2b7c98",
      },
      {
        id: "30d",
        label: "30 Days",
        durationDays: 30,
        price: 44.99,
        popular: true,
        productId: "019d64d4-6db4-7c29-8048-7ef75ae02420",
        variantId: "019d64d4-6dd9-7c6d-be87-43797c9c56d9",
      },
    ],
    features: [
      {
        icon: "crosshair",
        title: "Predictive Aimbot",
        count: 12,
        description: "Lead, smoothing, FOV scaling, bone selection, target priority.",
      },
      {
        icon: "eye",
        title: "Creature & Player ESP",
        count: 8,
        description: "Box, skeleton, distance, health, name, vehicle, threat radius.",
      },
      {
        icon: "target",
        title: "Silent Aim",
        count: 4,
        description: "Untraceable hits tuned for raid scenarios.",
      },
      {
        icon: "zap",
        title: "Performance",
        count: 5,
        description: "Stream-proof rendering, FPS-aware throttling.",
      },
      {
        icon: "settings",
        title: "Per-server Profiles",
        count: 3,
        description: "Save loadouts per server and switch on the fly.",
      },
    ],
    faq: [
      {
        question: "Will my account get banned?",
        answer:
          "We patch within hours of any anti-cheat update. Detection events are extremely rare, but if your account is banned within 7 days of purchase due to a confirmed detection on our end, you receive a free key on the next clean build.",
      },
      {
        question: "Does it work on official servers?",
        answer:
          "Yes. We test on the largest community and official servers. Some private servers run additional anti-cheat layers — check the Discord for the live compatibility list.",
      },
      {
        question: "How do I get updates after a game patch?",
        answer:
          "Updates are pushed automatically via the loader. You'll see a notification in the loader UI and a ping in our Discord status channel.",
      },
    ],
  },
  {
    slug: "roleplay-suite",
    title: "Roleplay Suite",
    shortDescription: "The most advanced trolling, PvP, and modding toolkit.",
    longDescription:
      "Roleplay Suite ships with player and vehicle ESP, no-clip, money drops, and a curated set of trolling utilities. Updated within 24h after every game patch.",
    category: "Roleplay",
    videoId: null,
    coverImage: "/covers/roleplay-suite.jpg",
    requirements: [
      { icon: "cpu", label: "Intel/AMD" },
      { icon: "os", label: "Windows 10/11" },
      { icon: "platform", label: "Custom Client" },
      { icon: "shield", label: "Anti-cheat Aware" },
    ],
    // Live mode wires this tool to the phantom-demo "FiveM Mod Menu" product.
    plans: [
      {
        id: "7d",
        label: "1 Week",
        durationDays: 7,
        price: 6.99,
        productId: "019d64d4-6fd8-7565-bd3b-b287ac10ae8d",
        variantId: "019d64d4-7006-7dc7-8d6b-4d0eb2b5719a",
      },
      {
        id: "30d",
        label: "1 Month",
        durationDays: 30,
        price: 14.99,
        popular: true,
        productId: "019d64d4-6fd8-7565-bd3b-b287ac10ae8d",
        variantId: "019d64d4-7006-7dc7-8d6b-4d0fd9517494",
      },
      {
        id: "lifetime",
        label: "Lifetime",
        durationDays: 36500,
        price: 39.99,
        productId: "019d64d4-6fd8-7565-bd3b-b287ac10ae8d",
        variantId: "019d64d4-7006-7dc7-8d6b-4d107c06a660",
      },
    ],
    features: [
      {
        icon: "eye",
        title: "Player & Vehicle ESP",
        count: 9,
        description: "Names, distance, weapons, vehicle owner, lock state.",
      },
      {
        icon: "zap",
        title: "No-clip & Teleport",
        count: 4,
        description: "Smooth no-clip, saved teleport positions, rubber-band defeat.",
      },
      {
        icon: "settings",
        title: "Trolling Utilities",
        count: 11,
        description: "Money drops, vehicle spawns, ragdoll triggers, voice mods.",
      },
      {
        icon: "shield",
        title: "Anti-cheat Aware",
        count: 3,
        description: "EAC bypass module, signature rotation, kernel-safe loader.",
      },
      {
        icon: "user",
        title: "Per-server Compatibility",
        count: 6,
        description: "Pre-tuned profiles for the most popular RP servers.",
      },
    ],
    faq: [
      {
        question: "Does it work on every RP server?",
        answer:
          "It works on most public RP servers. Private invite-only servers with custom anti-cheat may require manual tuning — check the Discord for the live compatibility table.",
      },
      {
        question: "Can I get banned by report?",
        answer:
          "Most bans on RP servers come from reports, not detection. Use the trolling features sparingly and keep your gameplay believable. Our visuals (ESP) are stream-proof.",
      },
      {
        question: "Does it support custom resources?",
        answer:
          "Yes. The loader detects loaded resources at runtime, so custom maps and scripts on the server do not break ESP or aim assistance.",
      },
    ],
  },
  {
    slug: "tactical-edge",
    title: "Tactical Edge",
    shortDescription: "Crush enemy teams and own the battlefield.",
    longDescription:
      "Tactical-shooter feature set: smooth aimbot, full ESP, vehicle indicators, and a bullet-drop calculator. Tuned to look natural on stream.",
    category: "Tactical",
    videoId: null,
    coverImage: "/covers/tactical-edge.jpg",
    requirements: [
      { icon: "cpu", label: "Intel/AMD" },
      { icon: "os", label: "Windows 10/11" },
      { icon: "platform", label: "Steam" },
      { icon: "shield", label: "Anti-cheat Aware" },
    ],
    // Live mode wires this tool to the phantom-demo "EFT Premium" product.
    plans: [
      {
        id: "1d",
        label: "1 Day",
        durationDays: 1,
        price: 15.99,
        productId: "019d64d4-7057-77b4-8d8a-5f37ca73022b",
        variantId: "019d64d4-7083-7133-a5b5-7a9b7459c757",
      },
      {
        id: "7d",
        label: "1 Week",
        durationDays: 7,
        price: 34.99,
        popular: true,
        productId: "019d64d4-7057-77b4-8d8a-5f37ca73022b",
        variantId: "019d64d4-7083-7133-a5b5-7a9cafc210eb",
      },
    ],
    features: [
      {
        icon: "crosshair",
        title: "Smooth Aimbot",
        count: 10,
        description: "Per-weapon presets, smoothing curves, FOV scaling, prediction.",
      },
      {
        icon: "eye",
        title: "Full ESP",
        count: 7,
        description: "Players, vehicles, projectiles, deployables, threat heatmap.",
      },
      {
        icon: "target",
        title: "Bullet-drop Calculator",
        count: 1,
        description: "Live ballistic computer for long-range engagements.",
      },
      {
        icon: "settings",
        title: "Stream-proof Render",
        count: 3,
        description: "Shadow play, OBS, and Discord screen-share invisible.",
      },
      {
        icon: "shield",
        title: "Anti-cheat Aware",
        count: 4,
        description: "EAC compatibility, signature scrambler, hidden modules.",
      },
    ],
    faq: [
      {
        question: "Will it look obvious on stream?",
        answer:
          "No. The render layer is masked from OBS, Shadow Play, and Discord screen share. The aimbot smoothing curves are tuned to look natural even at 240 Hz.",
      },
      {
        question: "Do I need a second PC?",
        answer:
          "Not for stream-proof rendering — that works on a single PC. Some users still prefer a second-PC setup for streaming, which we fully support but do not require.",
      },
      {
        question: "Are the bullet-drop tables tuned per weapon?",
        answer:
          "Yes. Every supported weapon has a per-zoom calibration table that we update with each game patch.",
      },
    ],
  },
  {
    slug: "precision-core",
    title: "Precision Core",
    shortDescription: "The smoothest kernel-safe experience on the market.",
    longDescription:
      "Custom kernel-level loader with hardware-spoofing built in. Triggerbot, per-agent ESP toggles, recoil control, and stream-proof rendering.",
    category: "Competitive FPS",
    videoId: null,
    coverImage: "/covers/precision-core.jpg",
    requirements: [
      { icon: "cpu", label: "Intel/AMD" },
      { icon: "os", label: "Windows 10/11" },
      { icon: "platform", label: "Custom Client" },
      { icon: "shield", label: "Kernel Safe" },
    ],
    // Live mode wires this tool to the phantom-demo "R6 Siege Elite" product.
    plans: [
      {
        id: "1d",
        label: "1 Day",
        durationDays: 1,
        price: 11.99,
        productId: "019d64d4-6ea7-79b9-b1dd-59a36e97ce45",
        variantId: "019d64d4-6f11-79b6-85cc-e27404e7e09f",
      },
      {
        id: "7d",
        label: "1 Week",
        durationDays: 7,
        price: 27.99,
        popular: true,
        productId: "019d64d4-6ea7-79b9-b1dd-59a36e97ce45",
        variantId: "019d64d4-6f11-79b6-85cc-e275c32d0df4",
      },
    ],
    features: [
      {
        icon: "crosshair",
        title: "Aimbot",
        count: 10,
        description: "Per-agent presets, prediction, target priority, hitbox selection.",
      },
      {
        icon: "target",
        title: "Triggerbot",
        count: 5,
        description: "Configurable hitbox, delay range, agent allow-list.",
      },
      {
        icon: "settings",
        title: "Recoil Control",
        count: 4,
        description: "Per-weapon spray patterns auto-tuned every patch.",
      },
      {
        icon: "lock",
        title: "Agent InstaLocker",
        count: 2,
        description: "Pick or ban your preferred agent before lobby starts.",
      },
      {
        icon: "timer",
        title: "Spike Timer",
        count: 1,
        description: "Live countdown showing if you can defuse the spike or not.",
      },
    ],
    faq: [
      {
        question: "Do I need to change anything in the BIOS?",
        answer:
          "Yes. Kernel-mode anti-cheats require TPM 2.0, Secure Boot, and Virtualization to be enabled. Most modern motherboards have these on by default — if not, the loader walks you through it.",
      },
      {
        question: "Does the product work with any mouse?",
        answer:
          "Yes. There is no driver-level dependency. The aimbot integrates with raw input and works with every mouse and DPI setting.",
      },
      {
        question: "Will I get banned mid-match?",
        answer:
          "Detection events are extremely rare on our build. If a detection happens, the loader auto-disables the relevant module and pings Discord — your account stays safe.",
      },
      {
        question: "Can I switch agents during a match?",
        answer:
          "Yes. Each agent has its own preset that loads automatically when you change agents. No reload required.",
      },
    ],
  },
];

// CUSTOMIZE: Status reports ------------------------------------------------
// One entry per tool, in the same order you want them listed on /status.
export const statusReports: StatusReport[] = [
  {
    productSlug: "survival-pro",
    detectionStatus: "undetected",
    detectionLabel: "Never detected",
    versionStatus: "up-to-date",
    detail: "Operational since launch.",
  },
  {
    productSlug: "roleplay-suite",
    detectionStatus: "undetected",
    detectionLabel: "Last detected 5 months ago",
    versionStatus: "up-to-date",
    detail: "Patched within 12h of every game update.",
  },
  {
    productSlug: "tactical-edge",
    detectionStatus: "undetected",
    detectionLabel: "Never detected",
    versionStatus: "up-to-date",
    detail: "Operational since launch.",
  },
  {
    productSlug: "precision-core",
    detectionStatus: "undetected",
    detectionLabel: "Never detected",
    versionStatus: "up-to-date",
    detail: "Kernel-safe loader audited weekly.",
  },
];

export const serverStatus = {
  label: "Operational",
  responseMs: 246,
  uptimeBars: 16,
};

// CUSTOMIZE: Why-choose-us features ----------------------------------------
export const features: FeatureHighlight[] = [
  {
    icon: "shield",
    title: "Quality and Security",
    description:
      "Expect nothing less than the best quality and safety. Once injected, you'll instantly feel the difference.",
  },
  {
    icon: "rocket",
    title: "Easy to Use",
    description:
      "Our tools are designed for instant setup and intuitive control. You'll be in-game and ahead in seconds.",
  },
  {
    icon: "infinite",
    title: "24/7 Support",
    description:
      "Questions or need a hand? Our dedicated 24/7 live chat support is ready to assist, ensuring help when you need it.",
  },
  {
    icon: "settings",
    title: "Highly customizable",
    description:
      "Nearly every module and feature is deeply customizable. Fine-tune everything to play your way.",
  },
  {
    icon: "refresh",
    title: "Constant updates",
    description:
      "We work daily on updates for our tools. This continuous effort ensures we remain undetected and up-to-date.",
  },
  {
    icon: "zap",
    title: "Performance enhancing",
    description:
      "Our tools are meticulously optimized to deliver peak performance without sacrificing your frame rate.",
  },
];

// CUSTOMIZE: FAQ ------------------------------------------------------------
export const faq: FaqItem[] = [
  {
    question: "What Windows version is supported?",
    answer:
      "We officially support Windows 10 (1909+) and Windows 11. Windows 7 and 8.1 are end-of-life and no longer supported.",
  },
  {
    question: "Is there any hardware limitation?",
    answer:
      "Any modern Intel or AMD CPU paired with at least 8 GB of RAM works. We do not support laptops with hybrid GPU setups in some cases — check the product page for details.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Refunds are issued within 24 hours of purchase if the tool fails to launch on a supported system. Once the license is activated and used, we cannot offer refunds — see our Refunds policy for the full terms.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "Live chat on Discord 24/7. Average first-response time is under 5 minutes. Critical detection events are handled within the hour.",
  },
];

// CUSTOMIZE: Payment methods ------------------------------------------------
export const paymentMethods: PaymentMethod[] = [
  { id: "visa", label: "Visa" },
  { id: "mastercard", label: "Mastercard" },
  { id: "bitcoin", label: "Bitcoin" },
  { id: "litecoin", label: "Litecoin" },
];

// CUSTOMIZE: Customer reviews ---------------------------------------------
export const reviews: CustomerReview[] = [
  {
    username: "UndoingCoffe",
    productLabel: "Tactical Edge",
    body: "Just works. Been using it for ages, never got banned. Features are insane.",
    rating: 5,
  },
  {
    username: "Xtrem3",
    productLabel: "Roleplay Suite",
    body: "Super easy to customize, fast updates, no downtime after game patches.",
    rating: 5,
  },
  {
    username: "Fivesharp",
    productLabel: "Precision Core",
    body: "Been using this for months. Never got banned. Fast patches after updates.",
    rating: 5,
  },
  {
    username: "Chaves",
    productLabel: "Survival Pro",
    body: "Always updating the tool. Super easy to inject, makes raiding smooth.",
    rating: 5,
  },
  {
    username: "Nico",
    productLabel: "Roleplay Suite",
    body: "Finally a roleplay tool that actually works and doesn't get detected.",
    rating: 5,
  },
  {
    username: "Tekaso",
    productLabel: "Precision Core",
    body: "Tweaked everything exactly how I like it. Quick reply at 3 AM, support hooked me up.",
    rating: 5,
  },
];

// CUSTOMIZE: Tool / spoofer page ------------------------------------------
export const toolPage = {
  enabled: true,
  title: "Free HWID Spoofer",
  subtitle:
    "Got banned? Our spoofer changes your hardware ID so you can play again. 100% free, easy to use, works in seconds.",
  ctaLabel: "Download our client and spoof",
  // CUSTOMIZE: where the download CTA points to — typically the dashboard or a direct download URL.
  ctaHref: "/dashboard",
  warning: {
    title: "Unsupported games",
    body: "Kernel-level anti-cheats are not supported by the spoofer.",
  },
  steps: [
    {
      number: 1,
      title: "Download",
      description: "Open our loader from the Dashboard.",
      icon: "download" as const,
    },
    {
      number: 2,
      title: "Spoof",
      description: "Click \"Spoof\" and your HWID is changed.",
      icon: "spark" as const,
    },
    {
      number: 3,
      title: "Play",
      description: "Launch your game — you're unbanned.",
      icon: "play" as const,
    },
  ],
};

// CUSTOMIZE: Job openings -------------------------------------------------
export const jobs: JobOpening[] = [
  {
    slug: "creator",
    category: "Content",
    title: "Creator",
    description:
      "We're seeking individuals to join the team as Creators. Make content for our platform and earn a generous profit share.",
    applyUrl: "https://discord.gg/example",
    coverImage: null,
  },
  {
    slug: "developer",
    category: "Engineering",
    title: "Reverse Engineer",
    description:
      "Help us patch tools faster than anyone else. Familiarity with kernel-level loaders required.",
    applyUrl: "https://discord.gg/example",
    coverImage: null,
  },
];

// Helpers -----------------------------------------------------------------
export function getTool(slug: string): ToolProduct | null {
  return tools.find((tool) => tool.slug === slug) ?? null;
}

export function getStatusFor(productSlug: string): StatusReport | null {
  return statusReports.find((report) => report.productSlug === productSlug) ?? null;
}
