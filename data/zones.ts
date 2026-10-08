/** The journey: every route is a place on one forest trail. The 3D world flies
    the camera between these zones, the menu lists them, and the zone banner
    announces them on arrival. Order matters — it is the order along the trail. */
export type Zone = {
  id: "trailhead" | "grove" | "hollow" | "beacon";
  /** Route prefix this zone owns. "/" only matches exactly. */
  path: string;
  /** Menu label — what the page is. */
  label: string;
  /** Place name — where the page is. */
  place: string;
  chapter: string;
  /** Keyboard shortcut shown in the menu. */
  hotkey: string;
  blurb: string;
};

export const zones: Zone[] = [
  {
    id: "trailhead",
    path: "/",
    label: "Home",
    place: "The Trailhead",
    chapter: "I",
    hotkey: "1",
    blurb: "Where every journey starts",
  },
  {
    id: "grove",
    path: "/profile",
    label: "Lore",
    place: "The Elder Grove",
    chapter: "II",
    hotkey: "2",
    blurb: "Story, path & achievements",
  },
  {
    id: "hollow",
    path: "/projects",
    label: "Quests",
    place: "The Crystal Hollow",
    chapter: "III",
    hotkey: "3",
    blurb: "Every project I've shipped",
  },
  {
    id: "beacon",
    path: "/contact",
    label: "Signal",
    place: "Beacon Hill",
    chapter: "IV",
    hotkey: "4",
    blurb: "Light the beacon, say hello",
  },
];

export const zoneIndexFor = (pathname: string): number => {
  const i = zones.findIndex((z) =>
    z.path === "/" ? pathname === "/" : pathname.startsWith(z.path),
  );
  return i === -1 ? 0 : i;
};

export const RESUME_URL =
  "https://drive.google.com/file/d/1eZUsSET8zvuxdD0g8htX1td60L3bXPXC/view?usp=drive_link";
