/**
 * @typedef {'libraries' | 'campus' | 'parks' | 'landmarks' | 'museums' | 'eats'} Category
 * @typedef {{
 *   id: string,
 *   name: string,
 *   category: Category,
 *   coords: [number, number],
 *   address: string,
 *   image: string | null,
 *   description: string,
 *   url?: string
 * }} Poi
 */

export const CATEGORIES = [
  { id: 'libraries', label: 'Libraries' },
  { id: 'campus',    label: 'Campus' },
  { id: 'parks',     label: 'Parks' },
  { id: 'landmarks', label: 'Landmarks' },
  { id: 'museums',   label: 'Museums' },
  { id: 'eats',      label: 'Eats' },
]

const IMG = (id) =>
  `https://images.unsplash.com/photo-${id}?w=600&auto=format&fit=crop&q=70`

/** @type {Poi[]} */
const places = [
  // ---------- Libraries ----------
  {
    id: 'spl-central',
    name: 'Seattle Public Library — Central',
    category: 'libraries',
    coords: [47.6067, -122.3325],
    address: '1000 4th Ave, Seattle, WA 98104',
    image: IMG('1521587760476-6c12a4b040da'),
    description:
      'The iconic downtown library — Rem Koolhaas glass origami with cozy reading nooks inside.',
    url: 'https://www.spl.org/hours-and-locations/central-library',
  },
  {
    id: 'spl-university',
    name: 'SPL — University Branch',
    category: 'libraries',
    coords: [47.6647, -122.3132],
    address: '5009 Roosevelt Way NE, Seattle, WA 98105',
    image: IMG('1507842217343-583bb7270b66'),
    description:
      'Little Carnegie library up in the U-District, walkable from campus territory.',
    url: 'https://www.spl.org/hours-and-locations/university-branch',
  },
  {
    id: 'spl-capitol-hill',
    name: 'SPL — Capitol Hill Branch',
    category: 'libraries',
    coords: [47.6220, -122.3200],
    address: '425 Harvard Ave E, Seattle, WA 98102',
    image: IMG('1526243741027-444d633d7365'),
    description:
      'Cozy neighborhood branch tucked into Capitol Hill — good for a quiet afternoon.',
    url: 'https://www.spl.org/hours-and-locations/capitol-hill-branch',
  },

  // ---------- Campus ----------
  {
    id: 'northeastern-seattle',
    name: 'Northeastern University — Seattle',
    category: 'campus',
    coords: [47.6236, -122.3378],
    address: '401 Terry Ave N, Seattle, WA 98109',
    image: IMG('1562774053-701939374585'),
    description: "My new campus in South Lake Union — the reason I'm here.",
    url: 'https://seattle.northeastern.edu/',
  },

  // ---------- Parks ----------
  {
    id: 'kerry-park',
    name: 'Kerry Park',
    category: 'parks',
    coords: [47.6295, -122.3599],
    address: '211 W Highland Dr, Seattle, WA 98119',
    image: IMG('1533106418989-88406c7cc8ca'),
    description:
      'The classic skyline viewpoint on Queen Anne hill. Show up at sunset.',
  },
  {
    id: 'gas-works-park',
    name: 'Gas Works Park',
    category: 'parks',
    coords: [47.6456, -122.3344],
    address: '2101 N Northlake Way, Seattle, WA 98103',
    image: IMG('1719852116135-3021a068cc26'),
    description:
      'Grassy hill + rusted gasification towers + Lake Union views. Great for kites.',
  },
  {
    id: 'discovery-park',
    name: 'Discovery Park',
    category: 'parks',
    coords: [47.6607, -122.4235],
    address: '3801 Discovery Park Blvd, Seattle, WA 98199',
    image: IMG('1630381962702-4fbde321a0fb'),
    description:
      "Seattle's biggest park — 500 acres of forest, cliffs, and a lighthouse on the beach.",
  },
  {
    id: 'volunteer-park',
    name: 'Volunteer Park & Conservatory',
    category: 'parks',
    coords: [47.6303, -122.3153],
    address: '1247 15th Ave E, Seattle, WA 98112',
    image: IMG('1490750967868-88aa4486c946'),
    description:
      'Victorian glass conservatory, water tower with a view, and shady lawns on Capitol Hill.',
  },
  {
    id: 'green-lake-park',
    name: 'Green Lake Park',
    category: 'parks',
    coords: [47.6805, -122.3400],
    address: '7201 E Green Lake Dr N, Seattle, WA 98115',
    image: IMG('1575888021884-9914b0778911'),
    description:
      'The 2.8-mile loop around the lake — Seattle in its Sunday-jogger mode.',
  },
  {
    id: 'golden-gardens-park',
    name: 'Golden Gardens Park',
    category: 'parks',
    coords: [47.6929, -122.4030],
    address: '8498 Seaview Pl NW, Seattle, WA 98117',
    image: null,
    description:
      "Sandy Ballard beach with driftwood, fire pits, and Olympic Mountain sunsets.",
  },
  {
    id: 'cal-anderson-park',
    name: 'Cal Anderson Park',
    category: 'parks',
    coords: [47.6183, -122.3196],
    address: '1635 11th Ave, Seattle, WA 98122',
    image: null,
    description:
      'Capitol Hill lawn, weird water sculpture, always somebody with a picnic blanket.',
  },

  // ---------- Landmarks ----------
  {
    id: 'space-needle',
    name: 'Space Needle',
    category: 'landmarks',
    coords: [47.6205, -122.3493],
    address: '400 Broad St, Seattle, WA 98109',
    image: IMG('1542223616-9de9adb5e3e8'),
    description:
      "Seattle's postcard skyline moment — glass floor at the top if you're brave.",
    url: 'https://www.spaceneedle.com/',
  },
  {
    id: 'pike-place-market',
    name: 'Pike Place Market',
    category: 'landmarks',
    coords: [47.6097, -122.3422],
    address: '85 Pike St, Seattle, WA 98101',
    image: IMG('1550989460-0adf9ea622e2'),
    description:
      'Fish-throwing, flower stalls, and the original Starbucks. Loud, colorful, essential.',
    url: 'https://www.pikeplacemarket.org/',
  },
  {
    id: 'fremont-troll',
    name: 'Fremont Troll',
    category: 'landmarks',
    coords: [47.6510, -122.3473],
    address: 'N 36th St, Seattle, WA 98103',
    image: IMG('1519681393784-d120267933ba'),
    description:
      'An 18-foot concrete troll clutching a real VW Bug under the Aurora Bridge. Yes, really.',
  },
  {
    id: 'ballard-locks',
    name: 'Ballard Locks',
    category: 'landmarks',
    coords: [47.6656, -122.3971],
    address: '3015 NW 54th St, Seattle, WA 98107',
    image: IMG('1507525428034-b723cf961d3e'),
    description:
      'Watch boats ride between saltwater and freshwater, plus a fish ladder for salmon.',
  },
  {
    id: 'smith-tower',
    name: 'Smith Tower',
    category: 'landmarks',
    coords: [47.6019, -122.3312],
    address: '506 2nd Ave, Seattle, WA 98104',
    image: null,
    description:
      "Pioneer Square's 1914 art deco stack — take the elevator to the observatory speakeasy.",
    url: 'https://www.smithtower.com/',
  },

  // ---------- Museums ----------
  {
    id: 'chihuly-garden',
    name: 'Chihuly Garden and Glass',
    category: 'museums',
    coords: [47.6203, -122.3502],
    address: '305 Harrison St, Seattle, WA 98109',
    image: IMG('1677532167459-86cc98862abe'),
    description:
      'Dreamy glass sculpture garden right below the Space Needle. Feels like walking through candy.',
    url: 'https://www.chihulygardenandglass.com/',
  },
  {
    id: 'mopop',
    name: 'Museum of Pop Culture (MoPOP)',
    category: 'museums',
    coords: [47.6215, -122.3479],
    address: '325 5th Ave N, Seattle, WA 98109',
    image: IMG('1594313146532-47f990c143f3'),
    description:
      'Frank Gehry crumpled-metal building full of Nirvana, sci-fi props, and horror memorabilia.',
    url: 'https://www.mopop.org/',
  },
  {
    id: 'seattle-art-museum',
    name: 'Seattle Art Museum (SAM)',
    category: 'museums',
    coords: [47.6072, -122.3379],
    address: '1300 1st Ave, Seattle, WA 98101',
    image: IMG('1636556602097-2435ad5198ef'),
    description:
      "Downtown's flagship museum — Hammering Man out front, world-class collection inside.",
    url: 'https://www.seattleartmuseum.org/',
  },
  {
    id: 'seattle-aquarium',
    name: 'Seattle Aquarium',
    category: 'museums',
    coords: [47.6072, -122.3428],
    address: '1483 Alaskan Way, Seattle, WA 98101',
    image: IMG('1639023547114-2361bdeeab55'),
    description:
      "On the waterfront — sea otters, a giant Pacific octopus, and salmon runs.",
    url: 'https://www.seattleaquarium.org/',
  },

  // ---------- Eats ----------
  {
    id: 'portage-bay-cafe-slu',
    name: 'Portage Bay Cafe (SLU)',
    category: 'eats',
    coords: [47.6247, -122.3389],
    address: '391 Terry Ave N, Seattle, WA 98109',
    image: IMG('1414235077428-338989a2e8c0'),
    description:
      'Blueberry-pancake, brioche-french-toast brunch. Basically next door to campus.',
    url: 'https://www.portagebaycafe.com/',
  },
  {
    id: 'ba-bar-capitol-hill',
    name: 'Ba Bar — Capitol Hill',
    category: 'eats',
    coords: [47.6217, -122.3196],
    address: '550 12th Ave, Seattle, WA 98122',
    image: IMG('1482049016688-2d3e1b311543'),
    description:
      'Vietnamese comfort food — pho, banh mi, salt-and-pepper wings. Open late.',
    url: 'https://babarseattle.com/',
  },
  {
    id: 'molly-moons-wallingford',
    name: "Molly Moon's Ice Cream — Wallingford",
    category: 'eats',
    coords: [47.6614, -122.3348],
    address: '1622 N 45th St, Seattle, WA 98103',
    image: IMG('1484723091739-30a097e8f929'),
    description:
      "The original Molly Moon's — Scout Mint, Salted Caramel, and honey lavender.",
    url: 'https://www.mollymoon.com/',
  },
  {
    id: 'salt-and-straw-capitol-hill',
    name: 'Salt & Straw — Capitol Hill',
    category: 'eats',
    coords: [47.6220, -122.3208],
    address: '714 E Pike St, Seattle, WA 98122',
    image: IMG('1504674900247-0877df9cc836'),
    description:
      'Weird-good ice cream flavors from Portland — strawberry & cracked pepper, honey lavender.',
    url: 'https://saltandstraw.com/',
  },
  {
    id: 'beechers-cheese',
    name: "Beecher's Handmade Cheese",
    category: 'eats',
    coords: [47.6091, -122.3419],
    address: '1600 Pike Pl, Seattle, WA 98101',
    image: IMG('1466978913421-dad2ebd01d17'),
    description:
      'Watch cheese being curded in the window, then order the mac & cheese. At Pike Place.',
    url: 'https://beechershandmadecheese.com/',
  },
  {
    id: 'piroshky-piroshky',
    name: 'Piroshky Piroshky',
    category: 'eats',
    coords: [47.6094, -122.3416],
    address: '1908 Pike Pl, Seattle, WA 98101',
    image: IMG('1600891964599-f61ba0e24092'),
    description:
      'Russian hand-pies, sweet and savory. Smoked-salmon pâté is legendary. Cash-only line moves fast.',
    url: 'https://www.piroshkybakery.com/',
  },
  {
    id: 'storyville-coffee-pike-place',
    name: 'Storyville Coffee — Pike Place',
    category: 'eats',
    coords: [47.6088, -122.3417],
    address: '94 Pike St #34, Seattle, WA 98101',
    image: IMG('1509042239860-f550ce710b93'),
    description:
      "Upstairs above the market — big windows onto the water, warm cinnamon rolls.",
    url: 'https://storyville.com/',
  },
]

export default places
