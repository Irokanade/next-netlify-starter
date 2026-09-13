/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   category: string,          // must match a category id in data/categories.js
 *   coords: [number, number],
 *   address: string,
 *   image: string | null,
 *   description: string,
 *   url?: string
 * }} Poi
 */

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

  {
    id: 'suzzallo-library',
    name: 'Suzzallo & Allen Libraries',
    category: 'libraries',
    coords: [47.6560, -122.3080],
    address: '4000 15th Ave NE, Seattle, WA 98195',
    image: null,
    description:
      'UW’s cathedral of a reading room — vaulted Gothic ceilings and stained glass. The Hogwarts comparison writes itself.',
    url: 'https://www.lib.washington.edu/suzzallo',
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

  {
    id: 'uw-seattle',
    name: 'University of Washington',
    category: 'campus',
    coords: [47.6553, -122.3035],
    address: '1410 NE Campus Pkwy, Seattle, WA 98195',
    image: null,
    description:
      'The big one across the bridge — Gothic quads, cherry trees, and a campus worth a whole afternoon.',
    url: 'https://www.washington.edu/visit/',
  },
  {
    id: 'uw-red-square',
    name: 'Red Square (UW)',
    category: 'campus',
    coords: [47.6557, -122.3090],
    address: 'Red Square, University of Washington, Seattle, WA 98195',
    image: null,
    description:
      'Brick-paved heart of campus, flanked by Suzzallo. Windy, wide open, always something going on.',
    url: 'https://www.washington.edu/maps/#!/red%20square',
  },
  {
    id: 'uw-quad',
    name: 'The Quad (UW)',
    category: 'campus',
    coords: [47.6570, -122.3077],
    address: 'Liberal Arts Quadrangle, Seattle, WA 98195',
    image: null,
    description:
      'Thirty Yoshino cherry trees that go off all at once in late March. Peak bloom lasts about ten days.',
    url: 'https://www.washington.edu/cherryblossom/',
  },
  {
    id: 'drumheller-fountain',
    name: 'Drumheller Fountain',
    category: 'campus',
    coords: [47.6532, -122.3076],
    address: 'Drumheller Fountain, Seattle, WA 98195',
    image: null,
    description:
      'Frosh Pond at the base of Rainier Vista — on a clear day the mountain lines up perfectly behind it.',
    url: 'https://www.washington.edu/maps/#!/drumheller',
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

  {
    id: 'waterfront-park',
    name: 'Waterfront Park & Pier 58',
    category: 'parks',
    coords: [47.6065, -122.3419],
    address: '1401 Alaskan Way, Seattle, WA 98101',
    image: null,
    description:
      'Rebuilt pier deck with fountains and play space, looking straight out at Elliott Bay and the ferries.',
    url: 'https://waterfrontparkseattle.org/',
  },
  {
    id: 'woodland-park-zoo',
    name: 'Woodland Park Zoo',
    category: 'parks',
    coords: [47.6685, -122.3515],
    address: '5500 Phinney Ave N, Seattle, WA 98103',
    image: null,
    description:
      '900-odd animals across African savanna, tropical rainforest, and Northwest habitats. Easy half-day.',
    url: 'https://www.zoo.org/',
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

  {
    id: 'seattle-great-wheel',
    name: 'The Seattle Great Wheel',
    category: 'landmarks',
    coords: [47.6061, -122.3425],
    address: '1301 Alaskan Way, Seattle, WA 98101',
    image: null,
    description:
      '175-foot Ferris wheel hanging off the end of Pier 57. Three slow rotations, best at sunset.',
    url: 'https://seattlegreatwheel.com/',
  },
  {
    id: 'overlook-walk',
    name: 'Overlook Walk',
    category: 'landmarks',
    coords: [47.6093, -122.3435],
    address: 'Overlook Walk, Alaskan Way, Seattle, WA 98101',
    image: null,
    description:
      'Elevated walkway stitching Pike Place down to the waterfront — no more hill, and the bay views are free.',
    url: 'https://waterfrontseattle.org/waterfront-projects/overlook-walk',
  },
  {
    id: 'amazon-spheres',
    name: 'Amazon Spheres',
    category: 'landmarks',
    coords: [47.6155, -122.3393],
    address: '2111 7th Ave, Seattle, WA 98121',
    image: null,
    description:
      'Three glass domes packed with 40,000 cloud-forest plants. Public entry is limited — the Understory exhibit is the way in.',
    url: 'https://www.seattlespheres.com/',
  },
  {
    id: 'gum-wall',
    name: 'The Gum Wall',
    category: 'landmarks',
    coords: [47.6086, -122.3411],
    address: '1428 Post Alley, Seattle, WA 98101',
    image: null,
    description:
      'A brick alley under Pike Place layered in decades of chewed gum. Gross, iconic, weirdly photogenic.',
    url: 'https://pikeplacemarket.org/',
  },
  {
    id: 't-mobile-park',
    name: 'T-Mobile Park',
    category: 'landmarks',
    coords: [47.5914, -122.3325],
    address: '1250 1st Ave S, Seattle, WA 98134',
    image: null,
    description:
      'Mariners home field with a roof that covers but never seals. Ballpark tours run on non-game days.',
    url: 'https://www.mlb.com/mariners/ballpark',
  },
  {
    id: 'argosy-cruises',
    name: 'Argosy Cruises — Pier 55',
    category: 'landmarks',
    coords: [47.6055, -122.3410],
    address: '1101 Alaskan Way Pier 55, Seattle, WA 98101',
    image: null,
    description:
      'Harbor tours and the Locks Cruise, which runs you up through Ballard Locks into the freshwater side.',
    url: 'https://www.argosycruises.com/',
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

  {
    id: 'museum-of-flight',
    name: 'The Museum of Flight',
    category: 'museums',
    coords: [47.5188, -122.2968],
    address: '9404 E Marginal Way S, Seattle, WA 98108',
    image: null,
    description:
      'Enormous aviation collection at Boeing Field — a Concorde, the old Air Force One, and an SR-71 out front.',
    url: 'https://www.museumofflight.org/',
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
  {
    id: 'pike-place-chowder',
    name: 'Pike Place Chowder',
    category: 'eats',
    coords: [47.6093, -122.3413],
    address: '1530 Post Alley, Seattle, WA 98101',
    image: null,
    description:
      'The chowder everyone queues for. Get the sampler if you can’t choose — the smoked salmon one is the sleeper.',
    url: 'https://www.pikeplacechowder.com/',
  },
  {
    id: 'the-pink-door',
    name: 'The Pink Door',
    category: 'eats',
    coords: [47.6103, -122.3424],
    address: '1919 Post Alley, Seattle, WA 98101',
    image: null,
    description:
      'Unmarked pink door into an Italian dining room with trapeze acts over the tables. Book well ahead.',
    url: 'https://thepinkdoor.net/',
  },
  {
    id: 'the-athenian',
    name: 'The Athenian Seafood Restaurant',
    category: 'eats',
    coords: [47.6091, -122.3410],
    address: '1517 Pike Pl, Seattle, WA 98101',
    image: null,
    description:
      'Market institution since 1909, and the booth where Tom Hanks sat in Sleepless in Seattle.',
    url: 'https://athenianseattle.com/',
  },
  {
    id: 'the-crab-pot',
    name: 'The Crab Pot',
    category: 'eats',
    coords: [47.6058, -122.3423],
    address: '1301 Alaskan Way Pier 57, Seattle, WA 98101',
    image: null,
    description:
      'Seafeast dumped straight onto butcher paper. Bib on, mallet out, no cutlery involved.',
    url: 'https://www.thecrabpotseattle.com/',
  },
  {
    id: 'the-loupe-lounge',
    name: 'The Loupe Lounge',
    category: 'eats',
    coords: [47.6207, -122.3490],
    address: '400 Broad St, Seattle, WA 98109',
    image: null,
    description:
      'Rotating glass floor inside the Space Needle — cocktails while the city turns underneath your feet.',
    url: 'https://www.spaceneedle.com/loupe-lounge',
  },

  // ---------- Coffee ----------
  {
    id: 'starbucks-original',
    name: 'Original Starbucks',
    category: 'coffee',
    coords: [47.6098, -122.3404],
    address: '1912 Pike Pl, Seattle, WA 98101',
    image: null,
    description:
      'The 1971 storefront with the old brown siren logo. The line is long and the coffee is normal Starbucks.',
    url: 'https://www.starbucks.com/store-locator/store/10600/',
  },
  {
    id: 'espresso-vivace',
    name: 'Espresso Vivace',
    category: 'coffee',
    coords: [47.6240, -122.3211],
    address: '532 Broadway E, Seattle, WA 98102',
    image: null,
    description:
      'David Schomer’s shop — more or less where American latte art started. Order the Caffe Nico.',
    url: 'https://espressovivace.com/',
  },
  {
    id: 'seattle-coffee-works',
    name: 'Seattle Coffee Works',
    category: 'coffee',
    coords: [47.6089, -122.3396],
    address: '107 Pike St, Seattle, WA 98101',
    image: null,
    description:
      'Slow-bar tasting room a block off the market. They’ll walk you through a side-by-side if you ask.',
    url: 'https://seattlecoffeeworks.com/',
  },
  {
    id: 'ghost-alley-espresso',
    name: 'Ghost Alley Espresso',
    category: 'coffee',
    coords: [47.6088, -122.3413],
    address: '1499 Post Alley, Seattle, WA 98101',
    image: null,
    description:
      'Tiny haunted-themed window right by the Gum Wall. Good espresso, excellent people-watching.',
    url: 'https://www.ghostalleyespresso.com/',
  },

  // ---------- Shopping ----------
  {
    id: 'university-village',
    name: 'University Village',
    category: 'shopping',
    coords: [47.6629, -122.2991],
    address: '2623 NE University Village St, Seattle, WA 98105',
    image: null,
    description:
      'Open-air mall next to UW — landscaped walkways, a good bookstore, and plenty of places to eat.',
    url: 'https://uvillage.com/',
  },

  // ========== UW TGSA 迎新手冊 (2026 orientation handbook) ==========
  // Entries marked 'approx' below list only a neighbourhood in the handbook.

  // ---------- Groceries ----------
  {
    id: 'uwajimaya-id',
    name: 'Uwajimaya 宇和島屋',
    category: 'groceries',
    coords: [47.5971, -122.3271],
    address: '600 5th Ave S, Seattle, WA 98104',
    image: null,
    description:
      'Japanese/Chinese/Taiwanese everything — produce, fish counter, kitchenware. Husky card gets 10% off after 6pm Friday. Bookstore and food court attached.',
    url: 'https://www.uwajimaya.com/',
  },
  {
    id: 'h-mart-u-district',
    name: 'H Mart — U District',
    category: 'groceries',
    coords: [47.6585, -122.3128],
    address: '4227 University Wy NE, Seattle, WA 98105',
    image: null,
    description:
      'Small Korean market right on the Ave. Meat quality is noticeably better than the chain supermarkets.',
    url: 'https://www.hmart.com/',
  },
  // approx — handbook lists only 'Bellevue'; coords are best-effort
  {
    id: 'tt-supermarket-bellevue',
    name: 'T&T Supermarket 大統華',
    category: 'groceries',
    coords: [47.5793, -122.1540],
    address: 'Bellevue, WA',
    image: null,
    description:
      'Canadian Asian chain that landed stateside in 2024 — bright, clean, stocks Taiwanese brands and even Taiwanese rice balls. App delivery if you have no car.',
    url: 'https://www.tntsupermarket.com/',
  },
  {
    id: 'trader-joes-u-district',
    name: "Trader Joe's — U District",
    category: 'groceries',
    coords: [47.6614, -122.3175],
    address: '4555 Roosevelt Way NE, Seattle, WA 98105',
    image: null,
    description:
      'Roosevelt at 45th. Store-brand everything and the prices to match — a student staple.',
    url: 'https://www.traderjoes.com/',
  },
  {
    id: 'qfc-u-village',
    name: 'QFC — University Village',
    category: 'groceries',
    coords: [47.6613, -122.2985],
    address: '2746 NE 45th St, Seattle, WA 98105',
    image: null,
    description:
      'Closest full supermarket to campus, east side. Huge selection; grab the free QFC card for the member prices.',
    url: 'https://www.qfc.com/',
  },
  {
    id: 'safeway-u-district',
    name: 'Safeway — U District',
    category: 'groceries',
    coords: [47.6640, -122.3137],
    address: '4732 Brooklyn Ave NE, Seattle, WA 98105',
    image: null,
    description:
      'Groceries and daily necessities in walking distance. The free Safeway card is worth it for the member pricing.',
    url: 'https://www.safeway.com/',
  },
  {
    id: 'whole-foods-roosevelt',
    name: 'Whole Foods Market — Roosevelt',
    category: 'groceries',
    coords: [47.6755, -122.3175],
    address: '1026 NE 64th St, Seattle, WA 98115',
    image: null,
    description:
      'All-organic, pricier, and a bus or Link ride out to Roosevelt station.',
    url: 'https://www.wholefoodsmarket.com/',
  },
  {
    id: 'costco-aurora-village',
    name: 'Costco — Aurora Village',
    category: 'groceries',
    coords: [47.7768, -122.3430],
    address: '1175 N 205th St, Shoreline, WA 98133',
    image: null,
    description:
      'Nearest Costco to UW. Cheapest meat anywhere if you split bulk packs and freeze them. Taiwanese imports show up sometimes.',
    url: 'https://www.costco.com/',
  },
  {
    id: 'costco-seattle-downtown',
    name: 'Costco — Seattle Downtown',
    category: 'groceries',
    coords: [47.5625, -122.3295],
    address: '4401 4th Ave S, Seattle, WA 98134',
    image: null,
    description:
      'The SoDo warehouse. Gas here is cheap — ask staff to run a foreign membership card.',
    url: 'https://www.costco.com/',
  },
  {
    id: 'ranch-99-edmonds',
    name: 'Ranch 99 北大華 — Edmonds',
    category: 'groceries',
    coords: [47.7905, -122.3335],
    address: '22511 Highway 99, Edmonds, WA 98026',
    image: null,
    description:
      'Chinese groceries with far more Asian vegetables than QFC or Safeway, and cheaper than Uwajimaya. 85°C bakery next door.',
    url: 'https://www.99ranch.com/',
  },
  {
    id: 'ranch-99-kent',
    name: 'Ranch 99 南大華 — Kent',
    category: 'groceries',
    coords: [47.4380, -122.2560],
    address: '18230 E Valley Hwy, Kent, WA 98032',
    image: null,
    description:
      'The south-end Ranch 99. Same deal as Edmonds — worth the drive if you are stocking up.',
    url: 'https://www.99ranch.com/',
  },
  {
    id: 'asian-food-center-shoreline',
    name: 'Asian Food Center 百佳 — Shoreline',
    category: 'groceries',
    coords: [47.7250, -122.3450],
    address: '13200 Aurora Ave N, Seattle, WA 98133',
    image: null,
    description:
      'Cleaner and brighter than Ranch 99, with more Taiwanese brands. Taiwanese bakery Kiki sits out front.',
    url: 'https://www.asianfoodcenter.com/',
  },
  {
    id: 'asian-food-center-bellevue',
    name: 'Asian Food Center 百佳 — Bellevue',
    category: 'groceries',
    coords: [47.6290, -122.1440],
    address: '14509 NE 20th St, Bellevue, WA 98007',
    image: null,
    description:
      'Eastside branch — same Taiwanese-leaning selection.',
    url: 'https://www.asianfoodcenter.com/',
  },
  {
    id: 'tofu-101',
    name: 'Tofu 101 豆漿店',
    category: 'groceries',
    coords: [47.5780, -122.1700],
    address: '12816 Factoria Blvd SE #G, Bellevue, WA 98006',
    image: null,
    description:
      'Tiny shop in Factoria Mall. Real Taiwanese soy milk Wednesday and Saturday mornings only, plus 紫米飯糰, 燒餅油條 and 油飯. Frozen dumplings the rest of the week.',
    url: 'https://www.tofu101.com/',
  },

  // ---------- Farmers Markets ----------
  {
    id: 'ballard-farmers-market',
    name: 'Ballard Farmers Market',
    category: 'market',
    coords: [47.6680, -122.3840],
    address: '5345 Ballard Ave NW, Seattle, WA 98107',
    image: null,
    description:
      'Sundays year-round along Ballard Ave. Local produce, seafood, mushrooms, flowers — a bit pricier than the supermarket, better quality.',
    url: 'https://www.sfmamarkets.com/visit-ballard-farmers-market',
  },
  {
    id: 'u-district-farmers-market',
    name: 'U-District Farmers Market',
    category: 'market',
    coords: [47.6620, -122.3130],
    address: 'University Way NE & NE 50th St, Seattle, WA 98105',
    image: null,
    description:
      'Saturdays on the Ave — the closest market to campus, and the easiest one to fold into a weekend walk.',
    url: 'https://www.sfmamarkets.com/visit-university-district-farmers-market',
  },
  {
    id: 'fremont-sunday-market',
    name: 'Fremont Sunday Street Market',
    category: 'market',
    coords: [47.6510, -122.3500],
    address: '3401 Evanston Ave N, Seattle, WA 98103',
    image: null,
    description:
      'Part farmers market, part flea market — antiques and street food alongside the produce.',
    url: 'https://www.fremontmarket.com/',
  },

  // ---------- Boba & Tea ----------
  // approx — handbook lists only 'University District'; coords are best-effort
  {
    id: 'dont-yell-at-me',
    name: '不要對我尖叫 Don’t Yell At Me',
    category: 'drinks',
    coords: [47.6570, -122.3130],
    address: 'University Way NE, Seattle, WA 98105',
    image: null,
    description:
      'Taiwanese chain on the Ave, and the cheapest boba in the handbook’s list.',
    url: 'https://www.instagram.com/dontyellatme_seattle/',
  },
  // approx — handbook lists only 'University District'; coords are best-effort
  {
    id: 'tp-tea-u-district',
    name: '茶湯會 TP Tea',
    category: 'drinks',
    coords: [47.6565, -122.3128],
    address: 'University Way NE, Seattle, WA 98105',
    image: null,
    description:
      'TP Tea on the Ave — the Chun Shui Tang offshoot, so the brown-sugar and milk-foam teas are the move.',
    url: 'https://tptea.us/',
  },
  {
    id: 'happy-lemon-u-village',
    name: 'Happy Lemon — University Village',
    category: 'drinks',
    coords: [47.6630, -122.2985],
    address: '2675 NE University Village St, Seattle, WA 98105',
    image: null,
    description:
      'Salted-cheese-top teas. Also has a Bellevue Square branch.',
    url: 'https://www.happylemonusa.com/',
  },
  // approx — handbook lists only 'University District'; coords are best-effort
  {
    id: 'yifang-u-district',
    name: '一芳水果茶 Yifang',
    category: 'drinks',
    coords: [47.6605, -122.3132],
    address: 'University Way NE, Seattle, WA 98105',
    image: null,
    description:
      'Taiwanese fruit tea done properly — the sugar-cane lemon and pineapple ones especially.',
    url: 'https://www.yifangtea.com/',
  },

  // ---------- Sports & Rec ----------
  {
    id: 'uw-ima',
    name: 'UW IMA',
    category: 'sports',
    coords: [47.6535, -122.3010],
    address: '3924 Montlake Blvd NE, Seattle, WA 98195',
    image: null,
    description:
      'Free with your student card: gym, pool, courts, climbing wall, tennis, golf range. A $66 Rec Class Pass adds yoga, cycling, bouldering and personal training.',
    url: 'https://www.washington.edu/ima/',
  },
  {
    id: 'uw-waterfront-activities-center',
    name: 'UW Waterfront Activities Center',
    category: 'sports',
    coords: [47.6495, -122.3020],
    address: '3710 Montlake Blvd NE, Seattle, WA 98195',
    image: null,
    description:
      'Canoe and rowboat rentals in summer — paddle straight out into the Arboretum and Lake Washington.',
    url: 'https://www.washington.edu/ima/waterfront/boat-rentals/',
  },

  // ---------- Shopping (handbook) ----------
  {
    id: 'rei-seattle-flagship',
    name: 'REI Seattle Flagship',
    category: 'shopping',
    coords: [47.6210, -122.3320],
    address: '222 Yale Ave N, Seattle, WA 98109',
    image: null,
    description:
      'The biggest outdoor-gear selection in town, newest styles, fewest discounts. You can rent gear here instead of buying.',
    url: 'https://www.rei.com/stores/seattle',
  },
  {
    id: 'ikea-renton',
    name: 'IKEA — Renton/Southcenter',
    category: 'shopping',
    coords: [47.4630, -122.2280],
    address: '601 SW 41st St, Renton, WA 98057',
    image: null,
    description:
      'Cheap flat-pack furniture south of the city. The handbook’s advice: split a van rental with friends and do it all in one trip.',
    url: 'https://www.ikea.com/us/en/stores/renton/',
  },
  {
    id: 'westfield-southcenter',
    name: 'Westfield Southcenter',
    category: 'shopping',
    coords: [47.4595, -122.2580],
    address: '2800 Southcenter Mall, Tukwila, WA 98188',
    image: null,
    description:
      'The big south-end mall, right by IKEA — worth pairing the two into one trip.',
    url: 'https://www.westfield.com/united-states/southcenter',
  },
  {
    id: 'nordstrom-rack-northgate',
    name: 'Nordstrom Rack — Northgate',
    category: 'shopping',
    coords: [47.7075, -122.3255],
    address: '401 NE Northgate Way, Seattle, WA 98125',
    image: null,
    description:
      'Off-season and odd-size Nordstrom stock at a steep discount — the handbook’s pick for winter coats.',
    url: 'https://www.nordstromrack.com/',
  },
  {
    id: 'target-u-district',
    name: 'Target — U District',
    category: 'shopping',
    coords: [47.6617, -122.3130],
    address: '4535 University Way NE, Seattle, WA 98105',
    image: null,
    description:
      'Household basics within walking distance. The Northgate store is much larger if you need more.',
    url: 'https://www.target.com/',
  },
  {
    id: 'crate-and-barrel-u-village',
    name: 'Crate & Barrel — U Village',
    category: 'shopping',
    coords: [47.6633, -122.2980],
    address: '2680 NE University Village St, Seattle, WA 98105',
    image: null,
    description:
      'Good furniture at a real price. CB2 is the cheaper, more modern sister label.',
    url: 'https://www.crateandbarrel.com/',
  },
  {
    id: 'pottery-barn-u-village',
    name: 'Pottery Barn — U Village',
    category: 'shopping',
    coords: [47.6628, -122.2988],
    address: '2624 NE University Village St, Seattle, WA 98105',
    image: null,
    description:
      'Well-made, traditional, expensive. West Elm downtown is the modern-styled sister store.',
    url: 'https://www.potterybarn.com/',
  },

  // ---------- Eats (handbook) ----------
  {
    id: 'ellenos-yogurt-pike-place',
    name: 'Ellenos Real Greek Yogurt',
    category: 'eats',
    coords: [47.6090, -122.3408],
    address: '1500 Pike Pl, Seattle, WA 98101',
    image: null,
    description:
      'Market yogurt bar — thick, tart, and the passionfruit one is the one people come back for.',
    url: 'https://ellenos.com/',
  },
  // approx — handbook lists only 'International District'; coords are best-effort
  {
    id: 'happy-lamb-hot-pot-id',
    name: '快樂小羊 Happy Lamb Hot Pot',
    category: 'eats',
    coords: [47.5985, -122.3230],
    address: 'International District, Seattle, WA 98104',
    image: null,
    description:
      'Mongolian-style hot pot — the lamb and the milky broth are the draw. Handbook’s top hot-pot pick.',
    url: 'https://www.happylambhotpot.com/',
  },
  // approx — handbook lists only 'International District'; coords are best-effort
  {
    id: 'boiling-point-id',
    name: '沸點 Boiling Point',
    category: 'eats',
    coords: [47.5978, -122.3245],
    address: 'International District, Seattle, WA 98104',
    image: null,
    description:
      'Individual hot pots, Taiwanese-style. Also has a Bellevue branch.',
    url: 'https://bpgroupusa.com/',
  },
  // approx — handbook lists only 'University District'; coords are best-effort
  {
    id: 'yang-guo-fu-u-district',
    name: '楊國福麻辣燙 Yang Guo Fu',
    category: 'eats',
    coords: [47.6590, -122.3130],
    address: 'University Way NE, Seattle, WA 98105',
    image: null,
    description:
      'Pick-your-own-ingredients málàtàng, priced by weight. Fast, cheap, warming.',
    url: 'https://www.yangguofu.com/',
  },
  {
    id: 'capitol-cider',
    name: 'Capitol Cider',
    category: 'eats',
    coords: [47.6138, -122.3210],
    address: '818 E Pike St, Seattle, WA 98122',
    image: null,
    description:
      'Long cider list and an entirely gluten-free kitchen. Live music downstairs.',
    url: 'https://capitolcider.com/',
  },
  {
    id: 'tamari-bar',
    name: 'Tamari Bar',
    category: 'eats',
    coords: [47.6175, -122.3170],
    address: '1830 12th Ave, Seattle, WA 98122',
    image: null,
    description:
      'Capitol Hill izakaya — small plates, late hours, good sake list.',
    url: 'https://www.tamaribar.com/',
  },
  // approx — handbook lists only 'Fremont'; coords are best-effort
  {
    id: 'hannyatou',
    name: 'Hannyatou',
    category: 'eats',
    coords: [47.6505, -122.3495],
    address: 'Fremont, Seattle, WA 98103',
    image: null,
    description:
      'Sake-focused Fremont bar with an unusually deep by-the-glass pour list.',
    url: 'https://www.hannyatou.com/',
  },
  {
    id: 'portage-bay-cafe-roosevelt',
    name: 'Portage Bay Cafe — Roosevelt',
    category: 'eats',
    coords: [47.6580, -122.3175],
    address: '4130 Roosevelt Way NE, Seattle, WA 98105',
    image: null,
    description:
      'The U-District branch of the brunch institution. Pay extra for the toppings bar — that is the whole point.',
    url: 'https://www.portagebaycafe.com/',
  },
  {
    id: 'oddfellows-cafe',
    name: 'Oddfellows Cafe + Bar',
    category: 'eats',
    coords: [47.6145, -122.3195],
    address: '1525 10th Ave, Seattle, WA 98122',
    image: null,
    description:
      'High-ceilinged Capitol Hill room. Handbook says get the Benedict.',
    url: 'https://oddfellowscafe.com/',
  },
  {
    id: 'toulouse-petit',
    name: 'Toulouse Petit Kitchen & Lounge',
    category: 'eats',
    coords: [47.6240, -122.3565],
    address: '601 Queen Anne Ave N, Seattle, WA 98109',
    image: null,
    description:
      'New Orleans brunch in Uptown — beignets, biscuits, and a very long happy hour.',
    url: 'https://www.toulousepetit.com/',
  },
  {
    id: 'lola-seattle',
    name: 'Lola',
    category: 'eats',
    coords: [47.6130, -122.3410],
    address: '2000 4th Ave, Seattle, WA 98121',
    image: null,
    description:
      'Tom Douglas’s Greek breakfast downtown — get the doughnuts with vanilla mascarpone.',
    url: 'https://www.lolaseattle.com/',
  },
  // approx — handbook lists only 'Belltown'; coords are best-effort
  {
    id: 'la-parisienne-belltown',
    name: 'La Parisienne',
    category: 'eats',
    coords: [47.6145, -122.3455],
    address: 'Belltown, Seattle, WA 98121',
    image: null,
    description:
      'French patisserie — meringues, croissants, canelés.',
    url: 'https://www.laparisienneseattle.com/',
  },
  // approx — handbook lists only 'Seattle Downtown'; coords are best-effort
  {
    id: 'cafe-hagen-downtown',
    name: 'Cafe Hagen',
    category: 'eats',
    coords: [47.6085, -122.3380],
    address: 'Seattle Downtown, WA 98101',
    image: null,
    description:
      'Scandinavian cafe — cardamom buns and a very calm room to sit in.',
    url: 'https://www.cafehagen.com/',
  },
  // approx — handbook lists only 'Capitol Hill'; coords are best-effort
  {
    id: 'cinnaholic-capitol-hill',
    name: 'Cinnaholic',
    category: 'eats',
    coords: [47.6160, -122.3190],
    address: 'Capitol Hill, Seattle, WA 98122',
    image: null,
    description:
      'Build-your-own cinnamon rolls, all vegan, frosting picked off a list.',
    url: 'https://cinnaholic.com/',
  },
  // approx — handbook lists only 'Bellevue'; coords are best-effort
  {
    id: 'cafe-aloe-bellevue',
    name: 'Cafe Aloe',
    category: 'eats',
    coords: [47.6150, -122.2015],
    address: 'Bellevue, WA 98004',
    image: null,
    description:
      'Bellevue dessert cafe — the 小豬包 piggy buns are the thing to order.',
    url: 'https://www.instagram.com/cafealoe/',
  },
  // approx — handbook lists only 'Capitol Hill'; coords are best-effort
  {
    id: 'rondo-japanese-kitchen',
    name: '龍堂 Rondo Japanese Kitchen',
    category: 'eats',
    coords: [47.6150, -122.3175],
    address: 'Capitol Hill, Seattle, WA 98122',
    image: null,
    description:
      'Capitol Hill izakaya-style kitchen, known for tonkatsu.',
    url: 'https://www.rondoseattle.com/',
  },
  // approx — handbook lists only 'Capitol Hill'; coords are best-effort
  {
    id: 'danbo-ramen-capitol-hill',
    name: '暖暮拉麵 Danbo Ramen',
    category: 'eats',
    coords: [47.6145, -122.3205],
    address: 'Capitol Hill, Seattle, WA 98122',
    image: null,
    description:
      'Hakata tonkotsu from the Fukuoka chain — thin noodles, order the firmness you want.',
    url: 'https://www.danboramen.com/',
  },
  // approx — handbook lists only 'Seattle Downtown'; coords are best-effort
  {
    id: 'nanas-green-tea-downtown',
    name: 'Nana’s Green Tea',
    category: 'eats',
    coords: [47.6110, -122.3360],
    address: 'Seattle Downtown, WA 98101',
    image: null,
    description:
      'Japanese matcha cafe. Handbook’s order: the matcha mochi parfait.',
    url: 'https://nanasgreenteausa.com/',
  },
  {
    id: 'kamonegi',
    name: 'Kamonegi',
    category: 'eats',
    coords: [47.6520, -122.3420],
    address: '1054 N 39th St, Seattle, WA 98103',
    image: null,
    description:
      'Handmade soba in Fremont — the duck-and-scallion 蔥鴨蕎麥麵 is the signature.',
    url: 'https://www.kamonegiseattle.com/',
  },
  {
    id: 'sushi-kashiba',
    name: 'Sushi Kashiba',
    category: 'eats',
    coords: [47.6095, -122.3420],
    address: '86 Pine St #1, Seattle, WA 98101',
    image: null,
    description:
      'Shiro Kashiba’s room by the market — a direct disciple of Jiro. Sit at the counter for omakase.',
    url: 'https://sushikashiba.com/',
  },
  // approx — handbook lists only 'Bellevue'; coords are best-effort
  {
    id: 'looking-for-chai-bellevue',
    name: 'Looking for Chai',
    category: 'eats',
    coords: [47.6140, -122.2000],
    address: 'Bellevue, WA 98004',
    image: null,
    description:
      'Taiwanese cafe in Bellevue.',
    url: 'https://www.instagram.com/lookingforchai/',
  },
  // approx — handbook lists only 'Seattle (UW Ave)'; coords are best-effort
  {
    id: 'capsule-cafe-u-district',
    name: 'Capsule Cafe',
    category: 'eats',
    coords: [47.6575, -122.3130],
    address: 'University Way NE, Seattle, WA 98105',
    image: null,
    description:
      '滷肉飯, 雞排, 鹽酥雞 and 滷味 on the Ave — spend enough and you get a gachapon capsule.',
    url: 'https://www.instagram.com/capsulecafeseattle/',
  },
  // approx — handbook lists only 'Bellevue Marketplace'; coords are best-effort
  {
    id: 'monga-cafe-bellevue',
    name: '艋舺 Monga Cafe',
    category: 'eats',
    coords: [47.6165, -122.1985],
    address: 'Bellevue Marketplace, Bellevue, WA 98007',
    image: null,
    description:
      'Taiwanese comfort food in Bellevue — the 滷肉飯 is what the handbook singles out.',
    url: 'https://www.mongacafe.com/',
  },
  // approx — handbook lists only 'Bellevue'; coords are best-effort
  {
    id: 'hardwork-cafe-bellevue',
    name: '路邊小棧 HardWork Café',
    category: 'eats',
    coords: [47.6135, -122.1975],
    address: 'Bellevue, WA 98007',
    image: null,
    description:
      'Taiwanese street-food menu — málàtàng and 銀絲卷.',
    url: 'https://www.instagram.com/hardworkcafe/',
  },
  // approx — handbook lists only 'Fremont'; coords are best-effort
  {
    id: '19-gold-fremont',
    name: '十九金 19 Gold',
    category: 'eats',
    coords: [47.6515, -122.3505],
    address: 'Fremont, Seattle, WA 98103',
    image: null,
    description:
      'Taiwanese spot in Fremont.',
    url: 'https://www.instagram.com/19goldseattle/',
  },
  {
    id: 'din-tai-fung-u-village',
    name: '鼎泰豐 Din Tai Fung — U Village',
    category: 'eats',
    coords: [47.6635, -122.2975],
    address: '2621 NE 46th St, Seattle, WA 98105',
    image: null,
    description:
      'Xiaolongbao done to the usual standard, ten minutes from campus. Also in Bellevue. Expect a wait.',
    url: 'https://www.dintaifungusa.com/',
  },
  // approx — handbook lists only 'University District'; coords are best-effort
  {
    id: 'kong-tofu-house',
    name: 'Kong Tofu & BBQ',
    category: 'eats',
    coords: [47.6588, -122.3130],
    address: 'University Way NE, Seattle, WA 98105',
    image: null,
    description:
      'Soondubu on the Ave — bubbling tofu stew, cheap and filling in the rain.',
    url: 'https://www.kongtofuseattle.com/',
  },
  // approx — handbook lists only 'Uptown'; coords are best-effort
  {
    id: 'paju-uptown',
    name: 'Paju',
    category: 'eats',
    coords: [47.6245, -122.3560],
    address: 'Uptown, Seattle, WA 98109',
    image: null,
    description:
      'Modern Korean in Uptown. Handbook calls out the squid-ink fried rice and the octopus.',
    url: 'https://www.pajuseattle.com/',
  },
  {
    id: 'jade-garden-id',
    name: '翠苑 Jade Garden',
    category: 'eats',
    coords: [47.5975, -122.3235],
    address: '424 7th Ave S, Seattle, WA 98104',
    image: null,
    description:
      'Cart dim sum in the ID — one of The New York Times’s 25 best restaurants in Seattle.',
    url: 'https://www.jadegardenseattle.com/',
  },
  // approx — handbook lists only 'International District'; coords are best-effort
  {
    id: 'hong-kong-bistro-id',
    name: '美味來 Hong Kong Bistro',
    category: 'eats',
    coords: [47.5982, -122.3238],
    address: 'International District, Seattle, WA 98104',
    image: null,
    description:
      'HK cafe food — the 菠蘿油 pineapple bun with butter is the handbook’s pick.',
    url: 'https://www.hongkongbistroseattle.com/',
  },
  {
    id: 'arayas-place',
    name: 'Araya’s Place',
    category: 'eats',
    coords: [47.6680, -122.3130],
    address: '5240 University Way NE, Seattle, WA 98105',
    image: null,
    description:
      'All-vegan Thai on the north end of the Ave — long-running U-District favourite.',
    url: 'https://arayasplace.com/',
  },
  // approx — handbook lists only 'University District'; coords are best-effort
  {
    id: 'ate-o-clock',
    name: 'Ate O’Clock',
    category: 'eats',
    coords: [47.6605, -122.3130],
    address: 'University District, Seattle, WA 98105',
    image: null,
    description:
      'Cheap Thai on the Ave, portions sized for students.',
    url: 'https://www.ateoclockseattle.com/',
  },
  // approx — handbook lists only 'University District'; coords are best-effort
  {
    id: 'thai-tom',
    name: 'Thai Tom',
    category: 'eats',
    coords: [47.6617, -122.3128],
    address: '4543 University Way NE, Seattle, WA 98105',
    image: null,
    description:
      'Tiny counter, open wok, real heat. Cash-friendly and permanently packed.',
    url: 'https://www.thaitomseattle.com/',
  },
  {
    id: 'serious-pie-downtown',
    name: 'Serious Pie',
    category: 'eats',
    coords: [47.6135, -122.3420],
    address: '2001 4th Ave, Seattle, WA 98121',
    image: null,
    description:
      'Blistered, chewy-crust pizza from Tom Douglas. Listed in the handbook as ‘Serious Pizza’.',
    url: 'https://www.seriouspieseattle.com/',
  },
  {
    id: 'delfinos-chicago-pizza',
    name: 'Delfino’s Chicago Pizza',
    category: 'eats',
    coords: [47.6630, -122.2982],
    address: '2631 NE University Village St, Seattle, WA 98105',
    image: null,
    description:
      'Deep-dish at U Village. Order well ahead — it takes 45 minutes to bake.',
    url: 'https://www.delfinospizza.com/',
  },
]

export default places
