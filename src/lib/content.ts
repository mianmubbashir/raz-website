/**
 * Swap image URLs / WhatsApp number here when real assets arrive.
 * All marketing copy and locations live in this file.
 */

export const site = {
  name: "Raz Stitching",
  tagline: "Special shalwar kameez. Cut to you.",
  support:
    "Karachi's house for special shalwar kameez — with kurta pajama, jubba, design suits, and formal wear finished to your measure.",
  /** WhatsApp — digits only, country code included */
  whatsapp: "923002316609",
  /** Primary mobile / WhatsApp display */
  phoneDisplay: "0300 2316609",
  /** Official landline + mobile lines */
  phones: [
    {
      label: "Landline",
      display: "021 35896659",
      tel: "02135896609",
    },
    {
      label: "Landline",
      display: "021 35388541",
      tel: "02135388541",
    },
    {
      label: "Mobile / WhatsApp",
      display: "0300 2316609",
      tel: "03002316609",
    },
  ],
  hours: "Mon – Sat · 11:00 AM – 9:00 PM",
  /** Customer-facing shop */
  shopName: "Golden Tower",
  shopAddress: "Golden Tower, Karachi, Pakistan",
  /** Factory — stitching & finishing (shown in footer) */
  factoryName: "Raz Stitching Factory",
  factoryAddress:
    "B-330 Sec 31A, Mehran Town Makhdoom Bilawal Chs (Mbchs) Sector 31 A Korangi Industrial Area, Karachi, 74900, Pakistan",
  /** @deprecated use shopAddress / factoryAddress */
  address:
    "B-330 Sec 31A, Mehran Town Makhdoom Bilawal Chs (Mbchs) Sector 31 A Korangi Industrial Area, Karachi, 74900, Pakistan",
  owner: {
    name: "Ali Raza",
    role: "CEO & Founder",
  },
  /** Update with your real profile URLs */
  social: {
    instagram: "https://instagram.com/razstitching",
    facebook: "https://facebook.com/razstitching",
    youtube: "https://youtube.com/@razstitching",
    linkedin: "https://linkedin.com/company/razstitching",
  },
} as const;

export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Assalamualaikum — I would like to inquire about stitching at Raz Stitching.",
)}`;

export type NavLink = {
  label: string;
  href: string;
};

export type NavDropdown = {
  label: string;
  children: readonly NavLink[];
};

export type NavItem = NavLink | NavDropdown;

export function isNavDropdown(item: NavItem): item is NavDropdown {
  return "children" in item;
}

export const mainNav: readonly NavItem[] = [
  { href: "/", label: "Home" },
  {
    label: "Contact",
    children: [
      { href: "/contact", label: "Contact us" },
      { href: "/about", label: "About us" },
      { href: "/team", label: "Our team" },
    ],
  },
  {
    label: "Tools",
    children: [
      { href: "/track-suit", label: "Track your suit" },
      { href: "/size-calculator", label: "Size calculator" },
      { href: "/booking-closing", label: "Booking closing" },
      { href: "/terms", label: "Terms and Conditions" },
    ],
  },
] as const;

export const footerExploreLinks = mainNav.flatMap((item) =>
  isNavDropdown(item) ? [...item.children] : [item],
);

export const footerInformation = [
  { href: "/about", label: "About Us" },
  { href: "/team", label: "Our Team" },
  { href: "/contact", label: "Contact Us" },
  { href: "/#shop", label: "Our Shop" },
  { href: "/terms", label: "Terms & Conditions" },
] as const;

export const footerTools = [
  { href: "/track-suit", label: "Track Your Suit" },
  { href: "/size-calculator", label: "Size Calculator" },
  { href: "/booking-closing", label: "Booking Closing" },
  { href: whatsappHref, label: "WhatsApp Booking" },
] as const;

export const footerSocial = [
  { href: site.social.instagram, label: "Instagram profile" },
  { href: site.social.facebook, label: "Facebook Page" },
  { href: site.social.youtube, label: "YouTube" },
  { href: site.social.linkedin, label: "LinkedIn" },
] as const;

export const stats = [
  { id: "customers", value: 65590, label: "Customers" },
  { id: "suits", value: 950000, label: "Suits Stitched" },
  { id: "deliveries", value: 8490, label: "Home Deliveries" },
  { id: "years", value: 24, label: "Years Old" },
] as const;

export const aboutUs = {
  intro:
    "For over two decades, Raz Stitching has been Karachi's specialist for special shalwar kameez and formal menswear — measured at our Golden Tower shop, stitched at our Korangi factory, and led by CEO Ali Raza.",
  story: [
    "Raz began as a single atelier with one promise: every customer walks out in a suit that sits clean on the shoulder, breaks right at the cuff, and holds its line after repeated wear.",
    "Today, under CEO Ali Raza, you book at our Golden Tower shop and every order is finished at one central factory in Korangi — where 15+ master tailors, 100+ karigars, and an in-house pressing team hold the same house standard.",
    "You book and measure at Golden Tower. The cloth travels to our factory, returns pressed and finished, and is ready for fitting or pickup at the shop.",
  ],
  values: [
    {
      title: "Cut to you",
      body: "Every garment starts with measurements taken on your body — not picked from a standard size chart.",
    },
    {
      title: "Cloth respected",
      body: "Grain, drape, and shrinkage are considered before the first cut. Your fabric is handled as carefully as the finish.",
    },
    {
      title: "One factory standard",
      body: "Every order is cut, stitched, and pressed at our Korangi factory — so the fit is consistent from booking to pickup.",
    },
    {
      title: "Occasion-ready",
      body: "From everyday kameez to ceremonial sherwanis, we build garments that match the moment and the man wearing them.",
    },
  ],
  milestones: [
    {
      year: "2002",
      title: "The first bench",
      body: "Raz Stitching opens with a focus on special shalwar kameez — refined collars, clean falls, and honest fittings.",
    },
    {
      year: "2010",
      title: "Golden Tower shop",
      body: "Our customer-facing shop at Golden Tower becomes the place to book, measure, and collect — with factory stitching in Korangi.",
    },
    {
      year: "Today",
      title: "950,000+ suits",
      body: "Thousands of families trust Raz for Eid, weddings, and everyday wear — with design suits, ghum silai, and formal coats in the same house.",
    },
  ],
} as const;

/** Mannequin outfit set — original green + AI color/style variants on same form */
const suits = {
  green: "/images/IMG_1.jpg",
  cream: "/images/suits/suit-shalwar-cream.jpg",
  navy: "/images/suits/suit-shalwar-navy.jpg",
  maroon: "/images/suits/suit-shalwar-maroon.jpg",
  sky: "/images/suits/suit-shalwar-sky.jpg",
  pantcoat: "/images/suits/suit-pantcoat.jpg",
  design: "/images/suits/suit-design.jpg",
  designKameez: "/images/suits/suit-design-user.jpg",
  formalShirt: "/images/suits/suit-formal-shirt.jpg",
  ghumSilai: "/images/suits/suit-ghum-user.jpg",
  sherwani: "/images/suits/suit-sherwani.jpg",
  waistcoat: "/images/suits/suit-waistcoat.jpg",
  jubba: "/images/suits/suit-jubba.jpg",
} as const;

const gallery = {
  greenKurta: suits.green,
  patternedCoat: "/images/IMG_2.jpg",
  creamKurta: "/images/IMG_3.jpg",
  brandSign: "/images/IMG_2662.jpg",
  atelierWide: "/images/IMG_2698.jpg",
  storeFront: "/images/IMG_2699.jpg",
  clipSign: "/images/clip-2663.mp4",
  clipCream: "/images/clip-2713.mp4",
  clipWhite: "/images/clip-2714.mp4",
  clipSignStill: "/images/clip-2663.jpg",
  clipCreamStill: "/images/clip-2713.jpg",
  clipWhiteStill: "/images/clip-2714.jpg",
} as const;

export const services = [
  {
    name: "Special Shalwar Kameez",
    description: "Our signature craft — refined cuts for everyday and festive wear.",
    image: suits.cream,
  },
  {
    name: "Design Suit",
    description: "Custom design suiting built around your style, fabric, and occasion.",
    image: suits.designKameez,
  },
  {
    name: "Pant Coat",
    description: "Structured formal suiting with clean lines and lasting shape.",
    image: suits.pantcoat,
  },
  {
    name: "Pant Shirt",
    description: "Sharp shirt-and-trouser pairing for office, events, and daily wear.",
    image: suits.formalShirt,
  },
  {
    name: "Jubba / Thobe",
    description: "Clean, flowing silhouettes with careful length and sleeve balance.",
    image: suits.jubba,
  },
  {
    name: "Ghum Silai Suit",
    description: "Traditional ghum stitching — durable finish with a refined fall.",
    image: suits.ghumSilai,
  },
  {
    name: "Sherwani",
    description: "Ceremonial silhouettes finished for weddings and grand occasions.",
    image: suits.sherwani,
  },
  {
    name: "Waistcoat",
    description: "Layered formality that sits clean over kurta or shirt.",
    image: suits.waistcoat,
  },
  {
    name: "Kurta",
    description: "From classic to contemporary — balanced proportion and ease.",
    image: suits.green,
  },
  {
    name: "Kurta Pajama",
    description: "Matched sets tailored for comfort with a sharp, unbroken line.",
    image: suits.maroon,
  },
] as const;

export const craftSteps = [
  {
    step: "01",
    title: "Measure",
    body: "Every garment begins on the body — precise points, not guesswork.",
  },
  {
    step: "02",
    title: "Cut",
    body: "Cloth laid true, grain respected, pattern marked for your frame.",
  },
  {
    step: "03",
    title: "Stitch",
    body: "Steady hands, clean seams, and finishes that hold their line.",
  },
  {
    step: "04",
    title: "Fit",
    body: "Final adjustments until the silhouette sits exactly as intended.",
  },
] as const;

/** Customer shop — Golden Tower only */
export const shop = {
  name: "Golden Tower",
  address: "Golden Tower, Karachi, Pakistan",
  hours: "MON – SAT: 11:00AM – 9:00PM",
} as const;

/** Single-shop list for UI that iterates locations */
export const locations = [shop] as const;

export const ourTeam = {
  intro:
    "Book at our Golden Tower shop — your suit is stitched at the Raz factory in Korangi by masters, karigars, and pressmen under the direction of CEO Ali Raza.",
  factory: {
    name: "Raz Stitching Factory",
    address:
      "B-330 Sec 31A, Mehran Town Makhdoom Bilawal Chs (Mbchs) Sector 31 A Korangi Industrial Area, Karachi, 74900, Pakistan",
    summary:
      "All shop orders are cut, stitched, pressed, and finished here before they return to Golden Tower for trial or pickup.",
  },
  leadership: [
    {
      name: "Ali Raza",
      role: "CEO & Founder",
      bio: "Leads Raz Stitching and its Korangi factory — setting quality standards for every order, from daily shalwar kameez to wedding sherwanis.",
    },
  ],
  departments: [
    {
      title: "Master tailors",
      body: "Senior bench tailors who finish collars, cuffs, falls, and complex design work at the factory.",
      count: "15+",
    },
    {
      title: "Karigars",
      body: "Skilled stitchers across cutting, assembly, and finishing lines — the backbone of factory output.",
      count: "100+",
    },
    {
      title: "Press men",
      body: "In-house pressing team — every garment steamed, creased, and packed before it leaves the factory floor.",
      count: "8+",
    },
    {
      title: "Supervisors",
      body: "Floor supervisors who track orders from shop intake to final press and dispatch back to Golden Tower.",
      count: "3+",
    },
  ],
  shopTeam: {
    branch: "Golden Tower",
    lead: "Shop counter team",
    focus:
      "Measurements, bookings, trials, and pickup — your order is sent to the Korangi factory and returns here when ready.",
  },
  culture: [
    "One shop, one factory — one standard for cutting, stitching, and finishing.",
    "CEO Ali Raza oversees factory quality and shop operations under one roof.",
    "Design suits and sherwanis handled by senior masters on the factory bench.",
    "In-house pressing before dispatch — no garment leaves without a final press check.",
    "Shop and factory share one order system — track your suit online anytime.",
  ],
} as const;

export type BookingClosingStatus = "open" | "closing_soon" | "closed";

export const bookingClosing = {
  season: "Eid-ul-Fitr 2027",
  /** Target handover before this date */
  eventDate: "2027-03-20",
  status: "open" satisfies BookingClosingStatus,
  statusNote:
    "Bookings are open at our Golden Tower shop. Design suits and sherwanis fill quickly — reserve your slot early.",
  lastUpdated: "2026-11-10",
  garmentDeadlines: [
    {
      garment: "Normal shalwar kameez / suit",
      lastBooking: "2027-02-07",
      deliveryBy: "2027-03-18",
      leadTime: "12–15 days",
    },
    {
      garment: "Special shalwar kameez",
      lastBooking: "2027-02-07",
      deliveryBy: "2027-03-17",
      leadTime: "15–18 days",
    },
    {
      garment: "Design suit",
      lastBooking: "2027-02-07",
      deliveryBy: "2027-03-15",
      leadTime: "18–22 days",
    },
    {
      garment: "Ghum silai suit",
      lastBooking: "2027-02-07",
      deliveryBy: "2027-03-16",
      leadTime: "16–20 days",
    },
    {
      garment: "Sherwani / prince coat",
      lastBooking: "2027-02-07",
      deliveryBy: "2027-03-12",
      leadTime: "22–28 days",
    },
    {
      garment: "Pant coat / formal shirt",
      lastBooking: "2027-02-07",
      deliveryBy: "2027-03-17",
      leadTime: "14–16 days",
    },
    {
      garment: "Kurta pajama / jubba",
      lastBooking: "2027-02-07",
      deliveryBy: "2027-03-19",
      leadTime: "10–12 days",
    },
  ],
  shopClosing: {
    shop: "Golden Tower",
    lastBooking: "2027-02-07",
    note: "Same garment deadlines apply — visit Golden Tower before the closing date with your fabric.",
  },
  notes: [
    "Fabric must be submitted at booking. Orders without cloth are not confirmed.",
    "Rush or same-week delivery may not be accepted during peak festive season.",
    "Trial fittings are scheduled in order of booking — earlier bookings get priority slots.",
    "Advance payment is required to lock your delivery date before booking closes.",
    "For wedding parties or bulk orders, contact Golden Tower directly on WhatsApp.",
  ],
} as const;

export const termsAndConditions = {
  lastUpdated: "2026-07-21",
  effectiveDate: "2026-07-21",
  intro:
    "These terms govern every order placed at Raz Stitching — our Golden Tower shop and Korangi factory. By booking, submitting fabric, or making payment, you agree to the conditions below.",
  sections: [
    {
      id: "bookings",
      title: "Bookings & orders",
      points: [
        "An order is confirmed only after fabric is received, measurements are taken, and the agreed advance payment is collected.",
        "Verbal estimates and WhatsApp messages are indicative until a formal receipt is issued at the shop.",
        "Orders are processed in the sequence they are confirmed. Peak-season rush requests may be declined.",
        "You must collect your receipt and note your order ID — it is required for tracking and pickup.",
      ],
    },
    {
      id: "measurements",
      title: "Measurements & fittings",
      points: [
        "Measurements are taken at the time of booking. Significant body changes after booking may require a new fitting and extra charges.",
        "Trial fittings must be attended on the scheduled date. Delays in trial approval may push your delivery date.",
        "If you approve a trial or final garment at pickup, the fit is considered accepted unless a defect is reported immediately.",
        "Raz Stitching is not responsible for fit issues arising from incorrect information provided by the customer.",
      ],
    },
    {
      id: "fabric",
      title: "Fabric & materials",
      points: [
        "Customers may supply their own fabric or purchase cloth through the shop where available.",
        "Fabric must be checked in at booking. We are not liable for pre-existing flaws, shrinkage, or colour bleeding in customer-supplied cloth.",
        "Extra fabric should be provided as advised by the shop. Shortage of cloth may delay completion or change the design.",
        "Trims, buttons, and accessories supplied by the customer must be handed over at booking. Missing items may incur additional cost or delay.",
      ],
    },
    {
      id: "pricing",
      title: "Pricing & payment",
      points: [
        "Stitching charges depend on garment type, design complexity, and finishing requested.",
        "A non-refundable advance is required to confirm your order and reserve a delivery slot.",
        "The balance must be cleared before the garment is released for pickup or delivery.",
        "Quoted prices apply to the order as confirmed. Design changes after cutting may increase the final bill.",
      ],
    },
    {
      id: "delivery",
      title: "Delivery & pickup",
      points: [
        "Estimated delivery dates are targets, not guarantees. Festive seasons, fabric issues, or fitting delays may extend timelines.",
        "Garments not collected within 30 days of readiness may attract storage charges and may be disposed of after 90 days with no refund.",
        "Home delivery, where offered, is arranged separately. Risk passes to the customer once the garment leaves the shop.",
        "Check your order at pickup. Claims for missing items or visible damage must be raised before leaving the shop.",
      ],
    },
    {
      id: "alterations",
      title: "Alterations, remakes & returns",
      points: [
        "Minor post-delivery alterations may be offered within 7 days if the issue is due to our workmanship.",
        "Remakes due to customer-supplied design changes, fabric problems, or missed fittings are chargeable.",
        "Stitched garments are custom-made and not eligible for refund once cutting has begun.",
        "Embroidery, special finishes, and design suits cannot be exchanged or returned.",
      ],
    },
    {
      id: "cancellations",
      title: "Cancellations",
      points: [
        "Orders may be cancelled before cutting begins. The advance may be partially retained to cover measurement and admin costs.",
        "Once fabric is cut, the order cannot be cancelled and no refund will be issued.",
        "If Raz Stitching cancels an order due to operational reasons, a full refund of amounts paid for undelivered work will be offered.",
      ],
    },
    {
      id: "customer-duties",
      title: "Your responsibilities",
      points: [
        "Provide accurate contact details and respond to fitting or approval requests promptly.",
        "Inspect fabric and design instructions at booking. Approved designs are stitched as confirmed.",
        "Collect orders on time and bring your receipt or order ID for pickup.",
        "Treat staff with respect. Raz Stitching reserves the right to refuse service in cases of abuse or fraud.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      points: [
        "Our liability is limited to the stitching charges paid for the affected garment.",
        "We are not liable for indirect losses, event cancellation, or inconvenience caused by delivery delays beyond our control.",
        "We take reasonable care of fabric in our possession but do not insure customer cloth unless agreed in writing.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy & communications",
      points: [
        "We collect your name, phone number, and order details to process and deliver your garment.",
        "Order status may be shared via WhatsApp, SMS, or phone using the number provided at booking.",
        "We do not sell customer data. Information is used only for stitching operations and service updates.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      points: [
        "Raz Stitching may update these terms from time to time. The latest version will always be published on this page.",
        "Continued use of our services after an update constitutes acceptance of the revised terms.",
        "For questions about these terms, contact our Golden Tower shop or message us on WhatsApp.",
      ],
    },
  ],
} as const;

export const sizeCalculatorGarments = [
  {
    id: "shalwar_kameez",
    label: "Shalwar kameez / suit",
    description: "Standard kameez and shalwar proportions for everyday and festive wear.",
    fields: [
      {
        id: "chest",
        label: "Chest",
        required: true,
        hint: "Around the fullest part of the chest, tape flat — in inches.",
      },
      {
        id: "waist",
        label: "Waist",
        required: false,
        hint: "Natural waistline, comfortably snug.",
      },
      {
        id: "height",
        label: "Height",
        required: false,
        hint: "Total height in inches (e.g. 68 for 5'8\"). Adjusts length estimate.",
      },
    ],
    sizes: [
      {
        label: "XS",
        chest: [32, 34],
        waist: [28, 30],
        shoulder: 16,
        sleeve: 23,
        topLength: 38,
        bottomLength: 38,
        collar: 14,
      },
      {
        label: "S",
        chest: [34, 36],
        waist: [30, 32],
        shoulder: 16.5,
        sleeve: 24,
        topLength: 40,
        bottomLength: 39,
        collar: 14.5,
      },
      {
        label: "M",
        chest: [36, 38],
        waist: [32, 34],
        shoulder: 17.5,
        sleeve: 25,
        topLength: 42,
        bottomLength: 40,
        collar: 15,
      },
      {
        label: "L",
        chest: [38, 40],
        waist: [34, 36],
        shoulder: 18.5,
        sleeve: 25.5,
        topLength: 43,
        bottomLength: 40,
        collar: 15.5,
      },
      {
        label: "XL",
        chest: [40, 42],
        waist: [36, 38],
        shoulder: 19.5,
        sleeve: 26,
        topLength: 44,
        bottomLength: 41,
        collar: 16,
      },
      {
        label: "XXL",
        chest: [42, 44],
        waist: [38, 40],
        shoulder: 20.5,
        sleeve: 26.5,
        topLength: 45,
        bottomLength: 41,
        collar: 16.5,
      },
      {
        label: "3XL",
        chest: [44, 46],
        waist: [40, 42],
        shoulder: 21.5,
        sleeve: 27,
        topLength: 46,
        bottomLength: 42,
        collar: 17,
      },
    ],
    outputLabels: {
      shoulder: "Shoulder",
      sleeve: "Sleeve",
      topLength: "Kameez length",
      bottomLength: "Shalwar length",
      collar: "Collar",
    },
  },
  {
    id: "kurta_pajama",
    label: "Kurta pajama",
    description: "Kurta length with straight pajama — slightly shorter hem than shalwar kameez.",
    fields: [
      {
        id: "chest",
        label: "Chest",
        required: true,
        hint: "Around the fullest part of the chest — in inches.",
      },
      {
        id: "waist",
        label: "Waist",
        required: false,
        hint: "Natural waistline.",
      },
      {
        id: "height",
        label: "Height",
        required: false,
        hint: "Total height in inches.",
      },
    ],
    sizes: [
      {
        label: "S",
        chest: [34, 36],
        waist: [30, 32],
        shoulder: 16.5,
        sleeve: 24,
        topLength: 39,
        bottomLength: 38,
        collar: 14.5,
      },
      {
        label: "M",
        chest: [36, 38],
        waist: [32, 34],
        shoulder: 17.5,
        sleeve: 25,
        topLength: 41,
        bottomLength: 39,
        collar: 15,
      },
      {
        label: "L",
        chest: [38, 40],
        waist: [34, 36],
        shoulder: 18.5,
        sleeve: 25.5,
        topLength: 42,
        bottomLength: 40,
        collar: 15.5,
      },
      {
        label: "XL",
        chest: [40, 42],
        waist: [36, 38],
        shoulder: 19.5,
        sleeve: 26,
        topLength: 43,
        bottomLength: 40,
        collar: 16,
      },
      {
        label: "XXL",
        chest: [42, 44],
        waist: [38, 40],
        shoulder: 20.5,
        sleeve: 26.5,
        topLength: 44,
        bottomLength: 41,
        collar: 16.5,
      },
    ],
    outputLabels: {
      shoulder: "Shoulder",
      sleeve: "Sleeve",
      topLength: "Kurta length",
      bottomLength: "Pajama length",
      collar: "Collar",
    },
  },
  {
    id: "pant_coat",
    label: "Pant coat",
    description: "Formal coat and trouser — structured shoulder and standard sleeve pitch.",
    fields: [
      {
        id: "chest",
        label: "Chest",
        required: true,
        hint: "Over a dress shirt, tape flat — in inches.",
      },
      {
        id: "waist",
        label: "Waist",
        required: false,
        hint: "Coat waist or trouser waist, as preferred.",
      },
      {
        id: "height",
        label: "Height",
        required: false,
        hint: "Total height in inches.",
      },
    ],
    sizes: [
      {
        label: "S",
        chest: [34, 36],
        waist: [30, 32],
        shoulder: 17,
        sleeve: 24.5,
        topLength: 30,
        bottomLength: 40,
        collar: 15,
      },
      {
        label: "M",
        chest: [36, 38],
        waist: [32, 34],
        shoulder: 18,
        sleeve: 25,
        topLength: 30.5,
        bottomLength: 41,
        collar: 15.5,
      },
      {
        label: "L",
        chest: [38, 40],
        waist: [34, 36],
        shoulder: 19,
        sleeve: 25.5,
        topLength: 31,
        bottomLength: 41,
        collar: 16,
      },
      {
        label: "XL",
        chest: [40, 42],
        waist: [36, 38],
        shoulder: 20,
        sleeve: 26,
        topLength: 31.5,
        bottomLength: 42,
        collar: 16.5,
      },
      {
        label: "XXL",
        chest: [42, 44],
        waist: [38, 40],
        shoulder: 21,
        sleeve: 26.5,
        topLength: 32,
        bottomLength: 42,
        collar: 17,
      },
    ],
    outputLabels: {
      shoulder: "Shoulder",
      sleeve: "Sleeve",
      topLength: "Coat length",
      bottomLength: "Trouser length",
      collar: "Collar",
    },
  },
  {
    id: "jubba",
    label: "Jubba / thobe",
    description: "Flowing length with relaxed chest ease — hem typically mid-calf to ankle.",
    fields: [
      {
        id: "chest",
        label: "Chest",
        required: true,
        hint: "With comfortable ease — in inches.",
      },
      {
        id: "height",
        label: "Height",
        required: false,
        hint: "Total height in inches — strongly affects jubba length.",
      },
    ],
    sizes: [
      {
        label: "S",
        chest: [34, 36],
        waist: [30, 32],
        shoulder: 17,
        sleeve: 24,
        topLength: 52,
        bottomLength: 0,
        collar: 15,
      },
      {
        label: "M",
        chest: [36, 38],
        waist: [32, 34],
        shoulder: 18,
        sleeve: 25,
        topLength: 54,
        bottomLength: 0,
        collar: 15.5,
      },
      {
        label: "L",
        chest: [38, 40],
        waist: [34, 36],
        shoulder: 19,
        sleeve: 25.5,
        topLength: 55,
        bottomLength: 0,
        collar: 16,
      },
      {
        label: "XL",
        chest: [40, 42],
        waist: [36, 38],
        shoulder: 20,
        sleeve: 26,
        topLength: 56,
        bottomLength: 0,
        collar: 16.5,
      },
    ],
    outputLabels: {
      shoulder: "Shoulder",
      sleeve: "Sleeve",
      topLength: "Jubba length",
      collar: "Collar",
    },
  },
  {
    id: "sherwani",
    label: "Sherwani",
    description: "Ceremonial fit — closer through the chest with longer hem and structured collar.",
    fields: [
      {
        id: "chest",
        label: "Chest",
        required: true,
        hint: "Over a kurta or shirt — in inches.",
      },
      {
        id: "waist",
        label: "Waist",
        required: false,
        hint: "Natural waist for tapered silhouette.",
      },
      {
        id: "height",
        label: "Height",
        required: false,
        hint: "Total height in inches.",
      },
    ],
    sizes: [
      {
        label: "S",
        chest: [34, 36],
        waist: [30, 32],
        shoulder: 17,
        sleeve: 24.5,
        topLength: 44,
        bottomLength: 0,
        collar: 15,
      },
      {
        label: "M",
        chest: [36, 38],
        waist: [32, 34],
        shoulder: 18,
        sleeve: 25,
        topLength: 45,
        bottomLength: 0,
        collar: 15.5,
      },
      {
        label: "L",
        chest: [38, 40],
        waist: [34, 36],
        shoulder: 19,
        sleeve: 25.5,
        topLength: 46,
        bottomLength: 0,
        collar: 16,
      },
      {
        label: "XL",
        chest: [40, 42],
        waist: [36, 38],
        shoulder: 20,
        sleeve: 26,
        topLength: 47,
        bottomLength: 0,
        collar: 16.5,
      },
      {
        label: "XXL",
        chest: [42, 44],
        waist: [38, 40],
        shoulder: 21,
        sleeve: 26.5,
        topLength: 48,
        bottomLength: 0,
        collar: 17,
      },
    ],
    outputLabels: {
      shoulder: "Shoulder",
      sleeve: "Sleeve",
      topLength: "Sherwani length",
      collar: "Collar",
    },
  },
] as const;

export const sizeCalculatorTips = [
  "Measure over the undergarments you normally wear to the tailor.",
  "Stand straight, breathe normally, and keep the tape snug — not tight.",
  "This calculator gives a starting estimate. Final measurements are always taken at the shop.",
  "For design suits and wedding orders, book a fitting even if you know your size.",
] as const;

/** Lookbook — same mannequin, every stitch style */
export const lookbook = [
  {
    src: suits.green,
    alt: "Special shalwar kameez on the Raz mannequin",
    tag: "Normal",
    title: "Shalwar kameez",
    type: "image" as const,
  },
  {
    src: suits.cream,
    alt: "Special suit on the Raz mannequin",
    tag: "Special",
    title: "Special suit",
    type: "image" as const,
  },
  {
    src: suits.designKameez,
    alt: "Design suit with embroidery on the kameez",
    tag: "Design",
    title: "Design suit",
    type: "image" as const,
  },
  {
    src: suits.ghumSilai,
    alt: "Ghum silai suit with clean internal stitching",
    tag: "Ghum",
    title: "Ghum silai suit",
    type: "image" as const,
  },
  {
    src: suits.design,
    alt: "Embroidered prince coat on the Raz mannequin",
    tag: "Prince",
    title: "Prince coat",
    type: "image" as const,
  },
  {
    src: suits.pantcoat,
    alt: "Charcoal pant coat on the Raz mannequin",
    tag: "Coat",
    title: "Pant coat",
    type: "image" as const,
  },
  {
    src: suits.formalShirt,
    alt: "Formal white shirt on the Raz mannequin",
    tag: "Shirt",
    title: "Formal shirt",
    type: "image" as const,
  },
  {
    src: suits.sherwani,
    alt: "Embroidered cream sherwani on the Raz mannequin",
    tag: "Wedding",
    title: "Sherwani",
    type: "image" as const,
  },
  {
    src: suits.waistcoat,
    alt: "Black waistcoat over white kurta on the Raz mannequin",
    tag: "Layer",
    title: "Waistcoat",
    type: "image" as const,
  },
  {
    src: suits.jubba,
    alt: "White jubba on the Raz mannequin",
    tag: "Jubba",
    title: "Jubba / Thobe",
    type: "image" as const,
  },
  {
    src: gallery.clipWhite,
    poster: gallery.clipWhiteStill,
    alt: "White kurta showcase film from the atelier",
    tag: "Film",
    title: "Atelier film",
    type: "video" as const,
  },
] as const;

export const images = {
  hero: {
    src: "/images/signature-hero.jpg",
    alt: "Raz brand sign inside the showroom with mannequin",
  },
  partner: {
    src: suits.green,
    alt: "Forest green kurta finished at Raz Stitching",
  },
  craft: {
    src: gallery.atelierWide,
    alt: "Raz Stitching atelier interior with formal displays",
  },
  texture: {
    src: suits.cream,
    alt: "Cream shalwar kameez with refined collar stitching",
  },
  atelier: {
    src: gallery.brandSign,
    alt: "Raz brand sign inside the showroom",
  },
  pageHero: {
    src: "/images/hero-tools-bg.png",
    alt: "Tailoring tools — needle, thread, scissors, and measuring tape",
  },
} as const;
