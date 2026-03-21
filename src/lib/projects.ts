// lib/projects.ts
// Single source of truth for all project data.
// Import from here in both /projects/page.tsx and /projects/[id]/page.tsx

export type ProjectType =
  | "Residential"
  | "Commercial"
  | "Renovation"
  | "Infrastructure";

export type Project = {
  id: number;
  name: string;
  location: string;
  type: ProjectType;
  year: number;
  sqft: string;
  duration: string;
  description: string;
  tags: string[];
  featured?: boolean;
  /**
   * List of image paths relative to /public.
   * images[0] → used as the card / hero background everywhere.
   * images[1…] → shown in the detail-page carousel.
   * e.g. ["/projects/greenfield/hero.jpg", "/projects/greenfield/interior.jpg"]
   */
  images: string[];
  // Detail-page fields (optional, shown only on /projects/[id])
  client?: string;
  challenge?: string;
  solution?: string;
  highlights?: string[];
};

export const FILTERS = [
  "All",
  "Residential",
  "Commercial",
  "Renovation",
  "Infrastructure",
] as const;
export type Filter = (typeof FILTERS)[number];

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Greenfield Tower",
    location: "Downtown Metro",
    type: "Commercial",
    year: 2024,
    sqft: "42,000 sqft",
    duration: "18 months",
    description:
      "A landmark 14-story commercial tower in the heart of the city. Designed for mixed office and retail use, Greenfield Tower features floor-to-ceiling glazing, a rooftop terrace, and LEED Gold certification. Delivered on time and under budget.",
    tags: ["LEED Gold", "Mixed-Use", "14 Floors"],
    featured: true,
    images: [
      "/projects/greenfieldtower/OIP-255489127.jpg",
      "/projects/greenfieldtower/OIP-915353024.jpg",
      "/projects/greenfieldtower/OIP-1402024472.jpg",
      "/projects/greenfieldtower/OIP-1994424744.jpg",
    ],
    client: "Greenfield Properties Ltd.",
    challenge:
      "Constructing a 14-story tower in a dense urban core while maintaining active street-level retail and minimizing disruption to neighboring buildings presented significant logistical and structural challenges.",
    solution:
      "We employed a top-down construction methodology, pouring the core and upper floors while simultaneously excavating the basement levels. A custom noise-dampening hoarding system kept street-level retail operational throughout.",
    highlights: [
      "LEED Gold certified — 32% below baseline energy use",
      "Zero lost-time incidents across 180,000 labour hours",
      "Rooftop terrace with 360° city views",
      "Delivered 3 weeks ahead of contracted schedule",
      "Floor-to-ceiling triple-glazed curtain wall façade",
    ],
  },
  {
    id: 2,
    name: "Harborview Residences",
    location: "Eastside District",
    type: "Residential",
    year: 2023,
    sqft: "18,500 sqft",
    duration: "12 months",
    description:
      "A boutique residential complex of 24 luxury units overlooking the harbor. Each unit features custom millwork, heated floors, and private balconies. The project required intricate waterfront foundation work.",
    tags: ["Luxury", "24 Units", "Waterfront"],
    images: [
      "/projects/harborview/hero.jpg",
      "/projects/harborview/balcony.jpg",
      "/projects/harborview/interior.jpg",
      "/projects/harborview/foundation.jpg",
    ],
    client: "Harborview Developments Inc.",
    challenge:
      "Building on a waterfront site with fluctuating tidal conditions required deep piling work and watertight basement construction below the water table.",
    solution:
      "We used driven steel H-piles and a sheet-pile cofferdam to isolate the foundation zone, allowing safe below-grade construction while managing tidal variation.",
    highlights: [
      "24 luxury units, each with private harbor-facing balcony",
      "Hydronic in-floor heating throughout",
      "Custom millwork packages designed in-house",
      "Deep pile foundation engineered for tidal conditions",
      "Completed without a single weather delay",
    ],
  },
  {
    id: 3,
    name: "Central Bridge Restoration",
    location: "City Center",
    type: "Infrastructure",
    year: 2023,
    sqft: "8,200 sqft",
    duration: "8 months",
    description:
      "Full structural restoration of the 1940s Central Bridge, including new concrete decking, updated railing systems, and waterproofing. A technically complex heritage project completed with zero traffic disruption.",
    tags: ["Heritage", "Structural", "Civil"],
    images: [
      "/projects/central-bridge/hero.jpg",
      "/projects/central-bridge/deck.jpg",
      "/projects/central-bridge/railing.jpg",
    ],
    client: "City Infrastructure Authority",
    challenge:
      "The 1940s bridge required full structural remediation while remaining open to traffic — a constraint that demanded precision staging and round-the-clock coordination with city transport authorities.",
    solution:
      "We developed a three-stage lane-closure schedule, working one third of the deck at a time, allowing two lanes of traffic to remain open at all times. Night shifts handled the noisiest concrete breaking work.",
    highlights: [
      "Heritage designation maintained throughout",
      "Zero traffic closures — phased works only",
      "Full concrete deck replacement and waterproofing",
      "New stainless-steel heritage-style railings",
      "100-year design life achieved",
    ],
  },
  {
    id: 4,
    name: "Oakwood Shopping Mall",
    location: "Northgate",
    type: "Commercial",
    year: 2022,
    sqft: "95,000 sqft",
    duration: "24 months",
    description:
      "A 95,000 sqft retail destination anchoring the Northgate development. Features an open-air atrium, food hall, and 60+ retail units. Designed for high foot traffic with sustainable energy systems throughout.",
    tags: ["Retail", "Atrium", "60+ Units"],
    images: [
      "/projects/oakwood/hero.jpg",
      "/projects/oakwood/atrium.jpg",
      "/projects/oakwood/food-hall.jpg",
      "/projects/oakwood/exterior.jpg",
    ],
    client: "Northgate Group",
    challenge:
      "Delivering 95,000 sqft of retail with 60+ individual tenancy fit-outs, each with unique requirements, while hitting a hard grand-opening date set by anchor tenant contracts.",
    solution:
      "A dedicated tenant-coordination team was embedded within the site for the final 6 months, running fit-out works as a separate workstream from base-build completion, enabling parallel delivery.",
    highlights: [
      "60+ retail units across two levels",
      "Signature open-air central atrium",
      "Full food hall with 12 kitchen tenancies",
      "Solar PV array covering 40% of energy demand",
      "Grand opening on schedule — day one fully tenanted",
    ],
  },
  {
    id: 5,
    name: "The Maple Renovation",
    location: "Westwood",
    type: "Renovation",
    year: 2024,
    sqft: "3,400 sqft",
    duration: "4 months",
    description:
      "Complete gut renovation of a 1970s family home — new open-plan kitchen, two additional bathrooms, full rewire, and structural wall removal. Transformed into a modern family home while preserving original hardwood floors.",
    tags: ["Residential", "Full Gut", "Modern"],
    images: [
      "/projects/maple/hero.jpg",
      "/projects/maple/kitchen.jpg",
      "/projects/maple/bathroom.jpg",
      "/projects/maple/floors.jpg",
    ],
    client: "Private Homeowner",
    challenge:
      "A 1970s home with non-compliant original wiring, load-bearing walls in the wrong places, and original hardwood floors the client was determined to preserve presented a complex puzzle.",
    solution:
      "We used temporary shoring to allow safe removal of load-bearing walls, installed a new steel beam to carry the upper-floor load, and used orbital sanding and refinishing to bring the original floors back to life.",
    highlights: [
      "Original hardwood floors fully restored",
      "Load-bearing walls removed with steel beam solution",
      "Two new bathrooms added within existing footprint",
      "Full rewire to current code with smart home pre-wire",
      "Open-plan kitchen with island and scullery",
    ],
  },
  {
    id: 6,
    name: "Riverside Office Park",
    location: "South End",
    type: "Commercial",
    year: 2022,
    sqft: "31,000 sqft",
    duration: "14 months",
    description:
      "Three interconnected low-rise office buildings set along the riverside, with shared amenities, underground parking, and extensive landscaping. A campus-style development built for a leading tech employer.",
    tags: ["Campus", "3 Buildings", "Landscaped"],
    images: [
      "/projects/riverside/hero.jpg",
      "/projects/riverside/bridge.jpg",
      "/projects/riverside/parkade.jpg",
      "/projects/riverside/landscaping.jpg",
    ],
    client: "TechCore Developments",
    challenge:
      "Coordinating three concurrent building structures while managing shared underground parking and a complex interconnecting bridge link required careful sequencing to avoid structural conflicts.",
    solution:
      "We developed an integrated BIM model across all three structures, using clash detection to resolve conflicts before breaking ground. The underground parkade was completed first as the shared foundation for all three buildings above.",
    highlights: [
      "Three buildings completed simultaneously",
      "Shared 180-space underground parkade",
      "Pedestrian bridge links all three structures",
      "2.2 acres of native-plant landscaping",
      "On-site café, gym, and end-of-trip facilities",
    ],
  },
  {
    id: 7,
    name: "Sunridge Villas",
    location: "Hillcrest",
    type: "Residential",
    year: 2021,
    sqft: "22,000 sqft",
    duration: "16 months",
    description:
      "Eight custom villa homes on a hillside site with panoramic views. Each villa was individually designed with private pools, wine cellars, and smart home integration. Complex site logistics managed without delay.",
    tags: ["Custom", "8 Villas", "Smart Home"],
    images: [
      "/projects/sunridge/hero.jpg",
      "/projects/sunridge/pool.jpg",
      "/projects/sunridge/interior.jpg",
      "/projects/sunridge/view.jpg",
    ],
    client: "Sunridge Estate Holdings",
    challenge:
      "A steep hillside site with variable rock ledges required individual cut-and-fill solutions for each of the eight villa pads, while single-lane access constrained material deliveries.",
    solution:
      "Each villa received a bespoke engineered foundation to match its specific sub-grade conditions. A just-in-time materials scheduling system managed site access, ensuring zero conflicts across 16 months of concurrent villa construction.",
    highlights: [
      "8 individually designed villas",
      "Each villa with private pool and wine cellar",
      "Crestron smart home integration throughout",
      "Bespoke rock-anchor foundations per villa",
      "Panoramic ridge-line views preserved for every home",
    ],
  },
  {
    id: 8,
    name: "Metro Rail Station",
    location: "Transit Hub",
    type: "Infrastructure",
    year: 2023,
    sqft: "14,000 sqft",
    duration: "20 months",
    description:
      "Design-build of a new metro rail station serving 40,000 daily commuters. Includes underground concourses, platform shelters, accessibility ramps, and integrated retail kiosks. A flagship public infrastructure project.",
    tags: ["Public", "Transit", "40K Daily"],
    images: [
      "/projects/metro-rail/hero.jpg",
      "/projects/metro-rail/platform.jpg",
      "/projects/metro-rail/concourse.jpg",
      "/projects/metro-rail/kiosks.jpg",
    ],
    client: "Metro Transit Authority",
    challenge:
      "Building a new underground station while keeping the existing surface rail line operational required working in 4-hour overnight maintenance windows and precise coordination with the transit authority.",
    solution:
      "All below-grade works were sequenced into 4-hour nightly possession windows. A prefabrication strategy was used extensively — platform canopy modules, concourse ceiling panels, and retail kiosks were pre-built off-site and craned into position.",
    highlights: [
      "40,000 daily commuter capacity",
      "Full universal accessibility compliance",
      "8 integrated retail kiosks",
      "Award: Infrastructure Project of the Year 2023",
      "Built across 480 nightly possession windows",
    ],
  },
];

export function getProjectById(id: number): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
