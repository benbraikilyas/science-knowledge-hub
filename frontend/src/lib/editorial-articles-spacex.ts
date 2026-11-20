import { getNewsArticleImage } from './news-article';

// SpaceX and rocket-physics explainers written for ScienceHub in November 2026.
// Facts come from the sources listed at the end of each article; back-of-envelope
// numbers are labelled as estimates and were checked by calculation before publishing.

interface SpaceXArticleInput {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: { id: string; name: string; slug: string; color: string; icon: string };
  tags: string[];
  readTime: number;
  publishedAt: string;
  isFeatured?: boolean;
}

const missions = { id: '13', name: 'Space Missions', slug: 'space-missions', color: '#22d3ee', icon: '🛸' };
const physics = { id: '3', name: 'Physics', slug: 'physics', color: '#3b82f6', icon: '⚛️' };

const makeArticle = (article: SpaceXArticleInput) => ({
  ...article,
  featuredImage: getNewsArticleImage(article.category.slug, undefined, article.id),
  thumbnail: getNewsArticleImage(article.category.slug, undefined, article.id),
  author: { id: 'sciencehub-editorial-team', displayName: 'ScienceHub Editorial Team' },
  isPublished: true,
  isFeatured: article.isFeatured ?? false,
  viewsCount: 0,
  likesCount: 0,
  metaTitle: article.title,
  metaDescription: article.excerpt,
  createdAt: article.publishedAt,
  updatedAt: article.publishedAt,
});

export const SPACEX_EDITORIAL_ARTICLES = [
  makeArticle({
    id: 'editorial-starship-catch',
    title: 'How SpaceX Caught Starship: The Physics of Flight 15’s Tower Catch',
    slug: 'how-spacex-caught-starship-flight-15-tower-catch',
    excerpt:
      'On November 14, 2026, SpaceX’s launch tower caught a Starship returning from orbit for the first time, while the booster was lost. Here is how the catch worked, with the orbital math behind it.',
    category: missions,
    tags: ['SpaceX', 'Starship', 'Starship Flight 15', 'Super Heavy', 'Tower Catch', 'Orbital Mechanics', 'Reusable Rockets'],
    readTime: 9,
    publishedAt: '2026-11-20T12:00:00Z',
    isFeatured: true,
    content: `## What happened on Starship Flight 15?

On November 14, 2026, SpaceX caught a returning Starship upper stage with the arms of its launch tower, the first time a Starship ship has been recovered this way after a flight to orbit. The vehicle, Ship 42, had spent about 22.5 hours in space before the catch.

Flight 15 lifted off from Starbase, SpaceX’s launch site in South Texas, at about 4:47 p.m. Central Time on November 13, from the site’s second orbital launch pad. It paired Super Heavy Booster 22 with Ship 42 and was the fourth flight of the larger Starship V3 design. About 26 minutes after liftoff the ship settled into a low orbit roughly 275 kilometers (170 miles) above Earth, and over the following hour it released 26 Starlink V3 internet satellites.

The booster had a harder day. Its return burn ended early, its flight computer called off the planned catch, and it was lost over the Gulf of Mexico about six and a half minutes after launch. SpaceX had hoped to catch both stages on a single flight for the first time.

| Item | Flight 14 | Flight 15 |
| --- | --- | --- |
| Launch date | September 28, 2026 | November 13, 2026 |
| Vehicles | Booster 21 and Ship 41 | Booster 22 and Ship 42 |
| Reached orbit | Yes, for the first time | Yes |
| Payload | 26 Starlink V3 satellites | 26 Starlink V3 satellites |
| Time in flight | 3 h 8 min (cut short) | About 22.5 h, about 14 orbits |
| Ship outcome | Splashdown in the North Pacific | Caught by the launch tower |
| Booster outcome | Soft splashdown in the Gulf | Catch aborted, booster lost |

## How did SpaceX catch Starship with the tower?

SpaceX caught Ship 42 by steering it back to the launch tower at Starbase and closing two giant mechanical arms, nicknamed the chopsticks, around it while its engines held it nearly still in the air.

The return began about 21 and a half hours after launch, when the ship fired one of its sea-level Raptor engines for roughly 10 seconds. That deorbit burn trimmed its speed just enough to drop its path into the upper atmosphere. The ship then fell belly first, protected by thousands of heat-resistant tiles and steered by four movable flaps, and crossed Mexico on its way back to the Texas coast.

Near the ground, the ship swung upright and relit its engines for the landing burn. According to NASASpaceflight’s timeline, that burn began about 22 hours and 32 minutes after liftoff, and the arms closed around the ship roughly 18 seconds later, in the middle of the afternoon on November 14.

![Three-panel sequence of a Super Heavy booster returning to the Starbase tower: final approach, landing burn beside the tower and catch in the tower arms](/images/articles/starship-booster-catch-sequence-flight-5.webp "SpaceX first used the tower-catch technique on a Super Heavy booster during Flight 5 in October 2024: approach, landing burn and catch.")

The arms do not squeeze the rocket like fingers around a bottle. They close beneath reinforced points on the vehicle and take its weight as the engines shut down, so the final support comes from the tower rather than from landing gear on the rocket.

## Why did the ship stay in orbit for 22.5 hours?

The ship had to wait for Earth’s rotation to bring Starbase back beneath a usable return path, and the long coast also gave engineers time to inspect it before committing to come home.

A spacecraft in a low circular orbit moves at a speed set only by its distance from Earth’s center:

$$ v = √(GM / r) $$

Here GM is Earth’s gravitational parameter, about 3.986 × 10¹⁴ m³/s², and r is Earth’s mean radius (6,371 km) plus the altitude. At 275 km, r is 6,646 km and v comes out at about 7,740 meters per second, roughly 27,900 km/h (17,300 mph). The time for one lap follows from the same numbers:

$$ T = 2π × √(r³ / GM) $$

That gives about 90 minutes per orbit. Meanwhile Earth turns about 15 degrees every hour, so each lap passes roughly 22.5 degrees of longitude farther west than the one before. A ship that must come home to one particular tower has to wait until a later lap lines its descent corridor up with the launch site. Between orbit insertion and the deorbit burn, Ship 42 spent about 21 hours in orbit, or roughly 14 laps, which matches the reported mission. This is a simplified picture; real planning also depends on the tilt of the orbit, the shape of the reentry corridor and the weather.

The wait was useful in other ways. SpaceX built three abort checkpoints into the mission, and three of the Starlink V3 satellites carried cameras that photographed the ship’s heat-shield tiles before controllers gave the go for return. Until Flight 14, Starship test flights had stopped just short of orbital speed, so that the ship would fall back on its own if an engine failed to relight. Flying a full orbit meant trusting the deorbit burn.

## How fast was Starship going, and why is reentry so hot?

At about 7.7 kilometers per second, every kilogram of the ship carried roughly 30 megajoules of kinetic energy, about seven times the chemical energy stored in a kilogram of TNT.

$$ E / m = ½ × v² $$

Plugging in 7,744 m/s gives about 3.0 × 10⁷ joules per kilogram. TNT releases about 4.2 million joules per kilogram, so orbital motion stores around seven times more energy, kilogram for kilogram. Nearly all of it has to be shed on the way down. Most of the heating does not come from friction against the air but from compressing it: the ship meets the thin upper atmosphere so fast that the air ahead of it cannot move aside and is squeezed into a layer of glowing hot gas. The tiles keep that heat away from the steel structure.

Getting out of orbit, by contrast, takes very little. The vis-viva equation links an object’s speed to its position on an orbit:

$$ v² = GM × (2/r − 1/a) $$

Here a is the average of the orbit’s highest and lowest distances from Earth’s center. Applying it to a 275 km circular orbit shows that slowing down by only about 67 m/s, less than 1 percent of orbital speed, lowers the far side of the orbit to 50 km, deep enough in the atmosphere for air drag to finish the job. That is why a burn of about 10 seconds on a single engine is enough to bring a ship home: the atmosphere does the rest of the braking for free.

## Why wasn’t the Super Heavy booster caught?

Booster 22 came back with less propellant than planned: its boostback burn ended early after a low-fuel-mass alarm, and its guidance system then aborted the tower catch and sent it offshore.

All 33 Raptor 3 engines ran from liftoff to stage separation, and 32 of them relit for the boostback burn that turns the booster back toward Texas, according to SpaceX’s webcast commentary as reported by NASASpaceflight. When that burn stopped early, the booster could no longer count on enough propellant for a safe landing, so it diverted over the Gulf of Mexico, where it was destroyed about six and a half minutes after liftoff. Elon Musk wrote that "slight underperformance of engines on this flight is the reason", and said the fixes are an upgraded engine version, Raptor 3.2, and ending the booster’s climb about one second earlier to leave more propellant for the return. SpaceX’s description of the abort changed during the day, and as of November 20, 2026 the root cause was still being investigated.

Why would one second matter? The mass of propellant an engine burns each second equals its thrust divided by its exhaust speed:

$$ ṁ = F / (Isp × g₀) $$

Thirty-three Raptor 3 engines rated at 250 tonnes-force each produce about 80.9 meganewtons. SpaceX has not published Raptor 3’s efficiency, known as specific impulse (Isp), but assuming a sea-level value of 330 to 350 seconds, the booster burns roughly 24 to 25 tonnes of propellant every second at full thrust. Shutting down one second sooner therefore leaves on the order of 24 tonnes more for the boostback and landing burns. This is an estimate: in real flights the engines throttle, and some propellant always remains unusable in the tanks.

Aborting was the safer choice. Musk has said that losing the tower or launch mount "would potentially cost us 2 to 3 months". So far, the only Super Heavy boosters caught by a tower were early V1 boosters on Flights 5, 7 and 8; none of the four V3 boosters flown in 2026 has been recovered.

## Why does SpaceX catch rockets instead of landing them on legs?

Catching moves the landing hardware from the rocket to the ground: legs and the structure needed to carry them would fly on every mission and cost payload, while a tower does the same job without leaving the pad.

The penalty is easiest to see on the upper stage. Everything the ship carries to orbit and back, landing gear included, counts as empty mass in the rocket equation, so extra hardware reduces payload almost kilogram for kilogram. For the booster the cost is smaller, because it turns back long before reaching orbital speed, but it is still real. Our guide to [why Starship must refuel in orbit](/articles/why-starship-must-refuel-in-orbit-rocket-equation) works through the rocket equation and shows why these margins are so tight.

![One of the large steel catch arms of the Starbase launch tower lying on the ground during construction, with people and a car nearby for scale](/images/articles/starbase-tower-catch-arm-construction.webp "One of the Starbase tower’s catch arms on the ground during construction in 2021, before it was lifted onto the tower.")

Size matters too. Super Heavy is about 72 meters (236 feet) tall and the ship about 52 meters (171 feet); stacked, they stand about 124 meters (407 feet) high. Falcon 9 takes the other approach: its first stage lands on four deployable legs, either back at the launch site or on a ship at sea, as explained in [how SpaceX lands Falcon 9 rockets](/articles/how-spacex-lands-falcon-9-rockets-landing-burn-physics). Catching a stage at its own launch site also means it does not need to be shipped back from a distant landing zone, which fits SpaceX’s long-stated goal of reflying both stages quickly.

After the catch, SpaceX’s Dan Huot said, "We caught a Starship, and now everything changes." NASA Administrator Jared Isaacman called the moment "almost magic".

## When is the next Starship launch?

The next mission, Flight 16 with Booster 23 and Ship 43, is planned as the first Starship launch from Launch Complex 39A at NASA’s Kennedy Space Center in Florida, no earlier than December 2026, with some observers expecting it to slip into early 2027.

Pad 39A is the pad that sent [Apollo 11](/articles/apollo-11-engineering-behind-first-moon-landing) toward the Moon in 1969. The Federal Aviation Administration’s record of decision of January 29, 2026 allows up to 44 Starship launches a year from it, but no launch license for Flight 16 had been announced as of November 18. Reports say SpaceX paused Falcon 9 launches from Florida for at least six weeks after October 20 while it prepared the pad.

Further ahead, SpaceX expects its first transfer of propellant between two ships in orbit early in 2027, a step every Moon landing depends on. NASA has turned Artemis III into a 2027 docking test in Earth orbit, with crewed landings now targeted for 2028. Recovering ships intact matters for that plan, because each Moon landing will need many tanker flights. For a sense of scale, see how [Starship compares with Saturn V](/articles/starship-vs-saturn-v-size-thrust-payload), the rocket that flew Apollo.

## References

- [NASASpaceflight: Starship Flight 15 makes SpaceX history](https://www.nasaspaceflight.com/2026/11/starship-flight-15-spacex-history/)
- [Aviation Week: Starship Flight 15 ends with first ship tower catch](https://aviationweek.com/space/operations-safety/starship-flight-15-ends-first-ship-tower-catch)
- [SpaceQ: Starship Flight 15 ship caught, booster lost](https://spaceq.ca/starship-flight-15-ship-catch-booster-lost/)
- [Associated Press via Phys.org: Starship soars into orbit](https://phys.org/news/2026-11-spacex-starship-soars-orbit-booster.html)
- [Space.com: Why the Flight 15 booster aborted its tower catch](https://www.space.com/space-exploration/launches-spacecraft/spacex-says-starship-flight-15-booster-aborted-chopsticks-landing-catch-after-launch-due-to-guidance-issue-video)
- [Aerospace America (AIAA): SpaceX achieves first Starship tower catch](https://aerospaceamerica.aiaa.org/spacex-achieves-first-starship-tower-catch/)
- [SpacePolicyOnline: Starship achieves orbit for the first time](https://spacepolicyonline.com/news/starship-achieves-orbit-for-the-first-time/)
- [NASASpaceflight: FAA advances approval of 44 Starship launches from 39A](https://www.nasaspaceflight.com/2026/01/faa-advances-approval-44-starship-launches-39a/)
- [NASA: Artemis III mission to test future Moon lander operations](https://www.nasa.gov/missions/artemis/nasas-artemis-iii-mission-to-test-future-moon-lander-operations/)`,
  }),

  makeArticle({
    id: 'editorial-starship-vs-saturn-v',
    title: 'Starship vs Saturn V: Size, Thrust, Payload and Reusability Compared',
    slug: 'starship-vs-saturn-v-size-thrust-payload',
    excerpt:
      'Starship V3 is about 13 meters taller than Saturn V, twice as heavy and 2.3 times as powerful at liftoff. A sourced side-by-side comparison of size, thrust, payload, engines and reuse.',
    category: missions,
    tags: ['Starship', 'Saturn V', 'SpaceX', 'Rocket Comparison', 'Thrust', 'Payload', 'Apollo Program'],
    readTime: 8,
    publishedAt: '2026-11-20T11:00:00Z',
    content: `## Is Starship bigger than Saturn V?

Yes. SpaceX’s Starship V3, stacked on its Super Heavy booster, stands about 124.4 meters (408 feet) tall, roughly 13 meters (44 feet) taller than NASA’s Saturn V Moon rocket at 111 meters (363 feet), and it weighs about twice as much at liftoff.

The table compares the current Starship design, as published by SpaceX in 2026, with NASA’s figures for Saturn V, the rocket that launched the Apollo Moon missions.

| Specification | Starship V3 with Super Heavy | Saturn V |
| --- | --- | --- |
| Height | 124.4 m (408 ft) | 111 m (363 ft) |
| Diameter | 9 m (29.5 ft) | 10.1 m (33 ft) |
| Mass at liftoff | About 5,533 t | About 2,800 t |
| Thrust at liftoff | About 80.8 MN (18.1 million lbf) | About 34.5 MN (7.6 million lbf) |
| First-stage engines | 33 Raptor 3 (methane and oxygen) | 5 F-1 (kerosene and oxygen) |
| Stages | 2 | 3 |
| Payload to low Earth orbit | 100+ t design target, fully reusable | About 118 t, fully expendable |
| Payload toward the Moon | None without refueling in orbit | About 43.5 t |
| First flight | April 20, 2023 | November 9, 1967 |
| Flights as of November 2026 | 15 | 13 (1967 to 1973) |

Two cautions apply. Starship’s 100-tonne payload is a design target that had not been demonstrated as of November 20, 2026. And NASA’s own pages quote Saturn V’s liftoff thrust at between 7.5 and 7.7 million pounds-force, so all of these figures are best read as rounded values.

![Apollo 17 Saturn V lifting off at night from Launch Complex 39A, lighting up the sky and the launch tower](/images/articles/saturn-v-apollo-17-night-launch.webp "Apollo 17’s Saturn V lifts off from Kennedy Space Center’s Pad 39A on December 7, 1972, the last crewed launch to the Moon.")

## Is Starship more powerful than Saturn V?

Yes, by a wide margin: Super Heavy’s 33 Raptor engines produce about 80.8 meganewtons of thrust at liftoff, roughly 2.3 times the 34.5 meganewtons of Saturn V’s five F-1 engines.

Raw thrust is only half the story. A rocket leaves the pad only if its thrust is greater than its weight, so engineers compare the thrust-to-weight ratio:

$$ T/W = F / (m × g₀) $$

Here F is thrust, m is the mass at liftoff and g₀ is standard gravity, 9.80665 m/s². For Starship V3, 80.8 MN divided by (5,533,000 kg × 9.80665 m/s²) gives about 1.49. For Saturn V, 34.5 MN divided by (2,800,000 kg × 9.80665 m/s²) gives about 1.26. SpaceX’s Falcon 9, with 7,605 kilonewtons of thrust and a liftoff mass of about 549 tonnes, comes out at about 1.41.

Any value above 1 means the rocket accelerates upward from the start, and the extra margin matters. Every second a rocket spends hovering low over the pad is propellant spent holding itself up against gravity instead of gaining speed. With a ratio of about 1.49, Starship pulls away from the tower faster than Saturn V did. These ratios mix figures from different SpaceX and NASA documents, so treat them as approximate.

## How much can each rocket carry?

Saturn V could put about 118 tonnes into low Earth orbit and send about 43.5 tonnes toward the Moon, while Starship V3 is designed to carry more than 100 tonnes to low Earth orbit with both of its stages recovered.

A useful way to compare rockets of different sizes is the payload fraction, the share of the liftoff mass that ends up as useful cargo:

$$ payload fraction = payload mass / liftoff mass $$

For Saturn V that is 118 ÷ 2,800 ≈ 4.2 percent. SpaceX’s Falcon 9, flown without recovering its booster, reaches about the same value: 22.8 ÷ 549 ≈ 4.2 percent. Starship’s target works out to 100 ÷ 5,533 ≈ 1.8 percent.

Starship’s fraction is lower because it carries the hardware needed to bring itself back: a heat shield on the ship, propellant held in reserve for landing burns, and fittings for the tower catch. In exchange, the whole vehicle can in principle fly again. SpaceX says future versions could carry 200 tonnes, potentially starting with Starship V4, and Elon Musk has said the earlier V2 design could carry about 35 tonnes. All of these are design figures, not demonstrated performance.

## Why can’t you compare their Moon payloads directly?

Because Saturn V sent Apollo to the Moon in a single launch by throwing away all three of its stages, while Starship’s ship is itself the second stage, reaches orbit with its tanks nearly empty, and must be refilled by tanker flights before it can head for the Moon.

On an Apollo mission, Saturn V’s first two stages burned out and fell away during the climb. The third stage reached Earth orbit, then reignited to push the Apollo spacecraft toward the Moon before being discarded as well. Only a small capsule came back to Earth. Starship works differently: the ship that reaches orbit is the same vehicle that would travel on, but it has used almost all of its propellant getting there. SpaceX lists the ship’s propellant capacity at about 1,600 tonnes.

For Moon landings, NASA’s Office of Inspector General described in March 2026 a plan in which a depot ship is launched first, followed by more than 10 tanker flights to fill it. Our explainer on [why Starship must refuel in orbit](/articles/why-starship-must-refuel-in-orbit-rocket-equation) works through the rocket equation behind that plan. The fair comparison is therefore between two strategies: Saturn V carried everything in one disposable launch, and Starship spreads the job across several reusable ones.

## How do the engines compare?

Saturn V’s F-1 engines burned kerosene with liquid oxygen in a gas-generator cycle, while Starship’s Raptor engines burn liquid methane with liquid oxygen in a full-flow staged-combustion cycle.

In a gas-generator engine, such as the F-1 or SpaceX’s Merlin, a small share of the propellant is burned simply to drive the pumps and is then dumped overboard. In a full-flow staged-combustion engine such as Raptor, all of the fuel and oxidizer pass through pre-burners that drive the pumps before reaching the main combustion chamber, so nothing is wasted. The design is harder to build but more efficient. Each F-1 produced roughly 6.8 meganewtons (about 1.5 million pounds-force), more than twice the thrust of a Raptor 3.

![The five large F-1 engine nozzles of a Saturn V first stage on display at Kennedy Space Center, with visitors walking underneath](/images/articles/saturn-v-f1-engines-kennedy-space-center.webp "The five F-1 engines of a Saturn V first stage on display at Kennedy Space Center. The visitors below show their scale.")

Starship takes the opposite approach: many smaller, efficient engines. A sea-level Raptor 3 is rated at 250 tonnes-force, about 2.45 meganewtons, and SpaceX has cut its mass to about 1,525 kg. That is about 2.9 times the 845-kilonewton thrust of a Falcon 9 Merlin engine, matching SpaceX’s description of nearly triple. Many engines also offer some tolerance to failure: Starship flights have continued after losing an engine.

![A SpaceX Merlin engine on the left beside a larger sea-level Raptor engine on the right](/images/articles/merlin-and-raptor-engines-side-by-side.webp "A Falcon 9 Merlin engine (left) next to a sea-level Raptor (right) at SpaceX headquarters in 2020.")

SpaceX chose methane partly because it leaves far less soot inside an engine than kerosene, which helps with reuse, and because it could in principle be made on Mars from carbon dioxide and water.

## Is Starship the biggest rocket ever built?

Yes. As of November 2026, Starship is the tallest, heaviest and most powerful rocket ever flown, and on its 15th flight it became the first rocket to have its upper stage caught by the launch tower after a trip to orbit.

Saturn V held the size records for decades. It flew 13 times between 1967 and 1973, the last time to launch the Skylab space station. The Soviet N1 produced more liftoff thrust than Saturn V but failed on all four of its launch attempts between 1969 and 1972. NASA’s Space Launch System, which carried four astronauts around the Moon on Artemis II in April 2026, also out-thrusts Saturn V at about 39 meganewtons (8.8 million pounds-force), but it is shorter than Starship and has less than half of Super Heavy’s thrust. You can read how the record catch worked in [how SpaceX caught Starship on Flight 15](/articles/how-spacex-caught-starship-flight-15-tower-catch).

## What does reusability change?

Reusability changes the economics more than the physics: every Saturn V was built new and used once, while Starship is designed so that both stages return and fly again.

The physics still charges a price, as the lower payload fraction shows, so the bet is that cheap, frequent flights matter more than squeezing the most cargo out of each one. SpaceX has already shown the idea at a smaller scale with Falcon 9, whose booster B1067 flew its 37th mission in August 2026; our guide to [how SpaceX lands Falcon 9 rockets](/articles/how-spacex-lands-falcon-9-rockets-landing-burn-physics) explains how. Whether Starship can repeat that record with a far larger vehicle, and with both stages, is the open question for the next few years.

## References

- [SpaceX: EU prospectus with Starship and Falcon specifications (June 2026, PDF)](https://content.spacex.com/cms-assets/FINAL_Documents%20and%20Updates/SpaceX%20-%20EU%20Prospectus%20(Approved%20by%20Bafin)%20-%20June%205,%202026.pdf)
- [SpaceX: Starship vehicle page](https://www.spacex.com/vehicles/starship)
- [NASA: What was the Saturn V?](https://www.nasa.gov/learning-resources/for-kids-and-students/what-was-the-saturn-v-grades-5-8/)
- [NASA History: 55 years ago, Apollo 4 and the first flight of the Saturn V](https://www.nasa.gov/history/55-years-ago-apollo-4-the-first-flight-of-the-saturn-v/)
- [Spaceflight Now: Starship V3 and Raptor 3 ratings (May 2026)](https://spaceflightnow.com/2026/05/12/spacex-targets-may-19-for-debut-of-starship-super-heavy-version-3-launch-pad-2/)
- [Space.com: Starship V3 payload compared with V2](https://www.space.com/space-exploration/launches-spacecraft/spacex-targeting-mid-march-for-1st-flight-of-bigger-more-powerful-starship-version-3-elon-musk-says)
- [SpaceX: Falcon user’s guide (2025, PDF)](https://www.spacex.com/assets/media/falcon-users-guide-2025-05-09.pdf)
- [NASA Office of Inspector General: Human Landing System report IG-26-004 (PDF)](https://oig.nasa.gov/wp-content/uploads/2026/03/final-report-ig-26-004-nasas-management-of-the-human-landing-system-contracts.pdf)`,
  }),

  makeArticle({
    id: 'editorial-starship-refueling',
    title: 'Why Starship Must Refuel in Orbit to Reach the Moon: The Rocket Equation Explained',
    slug: 'why-starship-must-refuel-in-orbit-rocket-equation',
    excerpt:
      'Starship reaches orbit with nearly empty tanks, and a Moon landing needs about 6 km/s more. The rocket equation, worked through with real numbers, shows why tankers must refill it first.',
    category: physics,
    tags: ['Rocket Equation', 'Starship', 'Orbital Refueling', 'Delta-v', 'Specific Impulse', 'Artemis', 'Konstantin Tsiolkovsky'],
    readTime: 10,
    publishedAt: '2026-11-20T10:00:00Z',
    content: `## Why does Starship need to refuel in orbit?

Starship needs to refuel in orbit because the ship is also the rocket’s second stage: it burns most of its propellant just reaching low Earth orbit, while landing on the Moon takes roughly 6 more kilometers per second of velocity change, which its tanks can only supply after tanker ships refill them.

NASA’s Office of Inspector General described the plan in a report published on March 10, 2026. SpaceX first launches a depot Starship into low Earth orbit, then more than 10 tanker Starships, aiming for one launch about every six days, to fill it. Propellant collection starts more than 200 days before the crew launches, and the fully fueled lander can wait up to 100 days in lunar orbit. In June 2026, SpaceX stated plainly that "in-orbit refueling is complex, and we have not yet demonstrated or attempted it." Its first transfer of propellant between two ships is now expected early in 2027.

To see why so many launches are needed, you need one equation that every rocket obeys.

## What is the rocket equation?

The rocket equation tells you how much a rocket can change its velocity from the propellant it carries, and it explains why rockets are mostly fuel.

$$ Δv = Isp × g₀ × ln(m₀ / m_f) $$

Each symbol has a plain meaning:

- Δv (delta-v) is the total change in velocity the rocket can produce. Think of it as a budget that every maneuver spends from.
- Isp is specific impulse, measured in seconds: a measure of how efficiently an engine uses propellant. Higher is better.
- g₀ is standard gravity, 9.80665 m/s². Multiplying Isp by g₀ gives the speed of the exhaust.
- m₀ is the rocket’s mass when full, and m_f is its mass after the propellant is gone.
- ln is the natural logarithm, which grows slowly as the mass ratio m₀ / m_f gets bigger.

That slow logarithm is the whole problem. Take an engine with a specific impulse of 311 seconds, a value commonly cited for a Falcon 9 Merlin engine in vacuum, and a stage that is 90 percent propellant, so the mass ratio is 10. The exhaust speed is 311 × 9.80665 ≈ 3,050 m/s, and Δv = 3,050 × ln(10) ≈ 7,020 m/s, or about 7.0 km/s. To double that to 14 km/s, the mass ratio would have to jump from 10 to 100, meaning 99 percent of the rocket would have to be propellant. You can try your own numbers with our [rocket equation calculator](/tools#rocket-equation).

![Konstantin Tsiolkovsky, an elderly man with a beard and glasses, seated outdoors holding a cane](/images/articles/konstantin-tsiolkovsky-portrait.webp "Konstantin Tsiolkovsky in Kaluga, around 1924. His 1903 work made the rocket equation famous.")

The equation carries the name of Konstantin Tsiolkovsky, the Russian teacher whom NASA calls the father of modern astronautics. In a work published in 1903 he showed how rocket speed depends on exhaust speed and proposed liquid propellants, including liquid hydrogen and liquid oxygen. Historians note that the British mathematician William Moore had derived the same relation about a century earlier, and that Robert Goddard and Hermann Oberth later reached it independently.

## How much delta-v does it take to reach orbit?

Reaching low Earth orbit takes about 9.3 to 10.5 km/s of delta-v, even though orbital speed itself is only about 7.8 km/s, because a rocket also loses speed fighting gravity and air on the way up.

A study by engineers at the German Aerospace Center (DLR) used 9.5 km/s for a 200-kilometer orbit, including 1.0 to 1.5 km/s of gravity losses and 0.1 to 0.15 km/s of drag losses. A Stanford University course budget for a 400-kilometer polar orbit comes to 10.44 km/s. Launching eastward helps: at Cape Canaveral, Earth’s rotation gives a rocket about 0.41 km/s for free.

| Mission step | Approximate delta-v | Notes |
| --- | --- | --- |
| Earth’s surface to low Earth orbit | 9.3 to 10.5 km/s | Includes gravity and drag losses; depends on orbit and launch site |
| Low Earth orbit toward the Moon (trans-lunar injection) | About 3.1 to 3.2 km/s | Leaves Earth orbit on a path to the Moon |
| Capture into low lunar orbit | About 0.8 to 0.9 km/s | Brakes into orbit around the Moon |
| Powered descent to the surface | About 1.8 to 2.0 km/s | Apollo-era planning used about 1.8 km/s |

That first line is why rockets use stages. Imagine a 500-tonne rocket carrying 10 tonnes of payload, with 440 tonnes of propellant and 50 tonnes of tanks and engines, and an engine Isp of 311 seconds. Built as a single stage, its mass ratio is 500 ÷ 60 ≈ 8.3, which gives about 6.5 km/s. Split the same propellant and hardware into two stages, with 80 percent in the first, and drop the first stage’s 40 tonnes of empty structure halfway up: the first stage gives about 3.7 km/s and the second about 5.1 km/s, for a total of about 8.9 km/s. That is 37 percent more velocity from exactly the same materials, simply by not carrying empty tanks to orbit. These are illustrative numbers, not a real rocket’s design.

## How much delta-v does a Moon landing need?

Getting from low Earth orbit down to the Moon’s surface takes roughly 6 km/s, the sum of the last three lines of the table, and the rocket equation turns that into a demanding mass ratio.

Rearranging the equation gives the mass ratio for any delta-v:

$$ m₀ / m_f = e^(Δv / (Isp × g₀)) $$

Methane engines like Raptor typically reach around 370 to 380 seconds in vacuum; we use those round values as assumptions, because SpaceX has not published official Raptor 3 figures. With 6 km/s and 370 seconds, the mass ratio is about 5.2, which means roughly 81 percent of the ship’s mass, as it leaves Earth orbit, must be propellant. A lander that also has to climb back to lunar orbit with its crew needs more: about 8 km/s in total raises the mass ratio to roughly 9, or about 89 percent propellant.

Starship arrives in orbit as an almost empty second stage, so it cannot meet those numbers on its own. SpaceX lists the ship’s propellant capacity at about 1,600 tonnes, and filling it again in orbit is what the tanker flights are for.

## How did Apollo reach the Moon with one launch?

Apollo reached the Moon with a single launch by keeping the spacecraft small and throwing nearly everything away: Saturn V discarded all three of its stages, and the lunar module left half of itself on the Moon.

Saturn V’s third stage reached Earth orbit and then reignited to send about 43.5 tonnes of Apollo spacecraft toward the Moon. The lunar module, roughly 15 tonnes fully fueled, used its descent stage as a launch platform and left it behind, and only a small capsule returned to Earth. Starship’s lander is a very different machine: about 52 meters (171 feet) tall and designed to carry far more crew and cargo. A bigger vehicle with reusable hardware cannot follow the throw-it-all-away recipe, so it collects its propellant in orbit instead. Read [Starship vs Saturn V](/articles/starship-vs-saturn-v-size-thrust-payload) for the full comparison, and our story of the [engineering behind Apollo 11](/articles/apollo-11-engineering-behind-first-moon-landing).

## Why does Starship burn methane instead of hydrogen?

Starship burns methane because it offers a practical middle ground: more efficient than kerosene, and much denser and easier to store than hydrogen, which matters for a ship that must hold propellant in orbit for weeks.

| Fuel (burned with liquid oxygen) | Typical vacuum Isp (approximate) | Boiling point of fuel at sea-level pressure | Example engines |
| --- | --- | --- | --- |
| Kerosene (RP-1) | About 300 to 350 s | Liquid at room temperature | F-1, Merlin |
| Liquid methane | About 350 to 380 s | About −162 °C | Raptor |
| Liquid hydrogen | About 420 to 465 s | About −253 °C | J-2, RL10 |

Hydrogen gives the highest specific impulse, but it is so light that it needs enormous tanks, and at −253 °C it is hard to keep from boiling away. Methane stores at a more manageable −162 °C, close to liquid oxygen’s −183 °C, so both tanks can be handled in similar ways.

![The first test firing of a SpaceX Raptor engine on a horizontal test stand, with a long bright flame at night](/images/articles/raptor-engine-first-test-fire-2016.webp "The first test firing of a Raptor methane engine, September 2016.")

## What makes refueling in space so hard?

Moving hundreds of tonnes of super-cold liquid between two ships in free fall has never been done at this scale, and three problems stand out: boil-off, weightlessness and docking.

- Boil-off: sunlight and heat from the spacecraft warm the tanks, and cryogenic propellant slowly turns to gas. Over a campaign that starts more than 200 days before the crew launch, losses must be kept small.
- Weightlessness: in orbit, liquids float and form blobs. A ship has to accelerate gently, a technique called ullage, so that propellant settles over the tank outlets before it can be pumped across.
- Docking: two ships, each about 50 meters long, must join, seal their connections, transfer propellant and separate safely, over and over.

SpaceX tested part of the process on its third flight in March 2024, when it moved liquid oxygen between tanks inside a single ship. A transfer between two ships is the next step, expected in early 2027.

## What does this mean for NASA’s Artemis program?

It means the Moon landing waits for refueling: on October 23, 2026, NASA redefined Artemis III as a roughly two-week mission in Earth orbit in 2027 and moved the first crewed landings to 2028.

On Artemis III, the Orion spacecraft is to dock with test versions of both landers: Blue Origin’s Blue Moon, which the crew will enter, and a SpaceX Starship V3 test article, which the crew will not enter. SpaceX expects an uncrewed lunar landing test in late 2027. Recovering Starships matters for this plan, because a refueling campaign with more than 10 tanker flights only makes sense if the tankers fly again. That is why the first tower catch of a ship, described in [how SpaceX caught Starship on Flight 15](/articles/how-spacex-caught-starship-flight-15-tower-catch), is more than a spectacle.

## References

- [NASA Glenn Research Center: The ideal rocket equation](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/ideal-rocket-equation/)
- [NASA Office of Inspector General: Human Landing System report IG-26-004 (PDF)](https://oig.nasa.gov/wp-content/uploads/2026/03/final-report-ig-26-004-nasas-management-of-the-human-landing-system-contracts.pdf)
- [NASA: Artemis III mission to test future Moon lander operations](https://www.nasa.gov/missions/artemis/nasas-artemis-iii-mission-to-test-future-moon-lander-operations/)
- [SpaceX: EU prospectus, including refueling status (June 2026, PDF)](https://content.spacex.com/cms-assets/FINAL_Documents%20and%20Updates/SpaceX%20-%20EU%20Prospectus%20(Approved%20by%20Bafin)%20-%20June%205,%202026.pdf)
- [DLR study: reverse engineering of Falcon 9 and delta-v to orbit (arXiv)](https://arxiv.org/pdf/2009.01664)
- [Stanford University AA284a: launch delta-v budget (PDF)](https://web.stanford.edu/~cantwell/AA284A_Course_Material/Karabeyoglu%20AA%20284A%20Lectures/AA284a_Lecture7.pdf)
- [MIT OpenCourseWare: Apollo lunar landing strategy (PDF)](https://ocw.mit.edu/courses/sts-471j-engineering-apollo-the-moon-project-as-a-complex-system-spring-2007/0028108a6ba8ed1910de0b0940194f7f_4_2_lunr_landing.pdf)
- [NASA: A brief history of rockets and Tsiolkovsky](https://www.grc.nasa.gov/www/k-12/TRC/Rockets/history_of_rockets.html)
- [SpacePolicyOnline: NASA full steam ahead on Artemis III, IV and V](https://spacepolicyonline.com/news/nasa-is-full-steam-ahead-on-artemis-iii-iv-and-v/)`,
  }),

  makeArticle({
    id: 'editorial-falcon-9-landing',
    title: 'How SpaceX Lands Falcon 9 Rockets: Boostback, Entry and Landing Burns Explained',
    slug: 'how-spacex-lands-falcon-9-rockets-landing-burn-physics',
    excerpt:
      'A Falcon 9 booster flips, fires its engines up to three times and touches down on four legs within about nine minutes of launch. The physics of each step, with the math of the hoverslam.',
    category: missions,
    tags: ['Falcon 9', 'SpaceX', 'Rocket Landing', 'Reusable Rockets', 'Hoverslam', 'Grid Fins', 'Booster Recovery'],
    readTime: 9,
    publishedAt: '2026-11-20T09:00:00Z',
    content: `## How does SpaceX land a Falcon 9 booster?

A Falcon 9 first stage lands by separating from the upper stage about two and a half minutes after liftoff, flipping around, firing its engines up to three more times to steer back and slow down, and touching down on four legs with a final single-engine burn, usually 7 to 9 minutes after launch.

The first stage is the tall lower part of the rocket, about 70 meters (230 feet) tall with its upper stage and fairing on top and 3.66 meters (12 feet) wide, with nine Merlin engines at its base. By the end of October 2026 SpaceX had landed Falcon boosters 675 times, according to Spaceflight Now, and a single booster had flown 37 missions. NASA’s published launch milestones list the order of events, which the table below follows.

| Step | Roughly when | What the booster does | Why |
| --- | --- | --- | --- |
| Engine cutoff and separation | About 2.5 minutes after liftoff | Shuts down its nine engines and separates from the upper stage | Saves propellant for the return trip |
| Flip | Seconds later | Turns around using small nitrogen gas thrusters | Points its engines in the direction of travel |
| Boostback burn | Return-to-launch-site flights | Restarts three engines to cancel its sideways speed | Arcs the booster back toward land |
| Entry burn | Falling back into thicker air | Fires engines into the oncoming supersonic air | Slows it down and limits heating and stress |
| Grid-fin glide | Lower atmosphere | Steers with four lattice fins | Guides it to the landing target |
| Landing burn | The final seconds | One engine slows it to zero as the legs touch | A soft touchdown |

The times are approximate and vary from mission to mission. On the Crew-12 launch in February 2026, for example, NASA’s timeline shows engine cutoff two minutes after liftoff and landing back at Cape Canaveral seven minutes after liftoff.

## What happens in the first two and a half minutes?

During the first two and a half minutes, all nine engines push the rocket to a speed of roughly 1.7 to 2.3 km/s and an altitude of 65 to 76 km, and then the flight computer shuts them down while enough propellant is left for the return.

Those figures come from SpaceX webcast data for four 2016 flights collected by the Planetary Society, so they are examples rather than fixed values. SpaceX’s user’s guide explains that the computer ends the first-stage burn either when the rocket reaches its target velocity or when the remaining propellant falls to a set level. Keeping propellant in reserve has a cost: SpaceX’s headline payload of 22,800 kg to low Earth orbit is for a rocket that does not recover its booster, and the company does not publish a figure for the reusable version.

How big is that reserve? A study by engineers at the German Aerospace Center (DLR), who reconstructed Falcon 9 from public data, estimated that the first stage needs about 3,500 m/s of delta-v for its climb and about 2,000 m/s more for the entry and landing burns on a landing at sea. In other words, a sizable share of the booster’s velocity budget is spent coming home. The [rocket equation explained in our Starship refueling guide](/articles/why-starship-must-refuel-in-orbit-rocket-equation) shows why every one of those meters per second has to be paid for in propellant.

## What are the boostback and entry burns?

The boostback burn reverses the booster’s sideways motion so it can fly back toward land, and the entry burn slows it down as it falls back into the thicker part of the atmosphere at supersonic speed.

After separating, the booster is still traveling away from the launch site at well over a kilometer per second. For a return to land, it restarts three of its nine engines in a boostback burn, as described in a 2016 Federal Aviation Administration review, and arcs back toward the coast. On missions that need more energy, the booster skips most of this and instead falls toward a drone ship waiting hundreds of kilometers downrange.

The entry burn is a technique called supersonic retropropulsion: firing rocket engines forward, into air rushing past faster than sound. SpaceX first tried it on September 29, 2013, with three engines. NASA later studied Falcon 9 entry-burn data because a crewed Mars lander would face similar conditions in the thin Martian air.

![Sunlit jellyfish-shaped rocket exhaust plumes spreading across a dawn sky after a Falcon 9 launch](/images/articles/falcon-9-entry-burn-jellyfish-plume-crs-35.webp "Exhaust plumes from NASA’s CRS-35 launch at dawn on October 13, 2026, seen from Cocoa Beach, Florida, including the first stage’s re-entry burn.")

## How do grid fins steer the booster?

Four grid fins near the top of the booster, lattice-shaped panels that tilt in the airflow, steer it during the fall, while small nitrogen gas thrusters control it in the near-vacuum above the atmosphere.

The steering has to be precise. SpaceX landing engineer Lars Blackmore wrote that the targets were to land within 10 meters on a drone ship and within 30 meters at Cape Canaveral. The ride is also harsh: he described a returning stage of about 35 tonnes peaking at 6 g of deceleration during reentry, six times the pull of gravity at Earth’s surface. The four landing legs stay folded against the booster until the last moments, then swing down for touchdown.

## Why can’t a Falcon 9 booster hover?

A nearly empty Falcon 9 booster cannot hover because even one Merlin engine at its lowest setting pushes harder than the booster weighs, so it must reach zero speed at exactly the moment it reaches the ground.

SpaceX’s user’s guide says a Merlin engine can throttle from 845 kN down to about 482 kN at sea level, around 57 percent. Taking the 35-tonne figure for a returning stage, the booster weighs 35,000 kg × 9.80665 m/s² ≈ 343 kN. At minimum throttle the thrust-to-weight ratio is therefore 482 ÷ 343 ≈ 1.40, greater than 1. If the engine kept firing after the booster stopped, it would start climbing again. Blackmore put it simply: the rocket "has to hit zero velocity at exactly zero altitude". Engineers call this a hoverslam, or more darkly a suicide burn.

How long does the stop take? The booster’s deceleration depends on how much its thrust exceeds its weight:

$$ a = (T/W − 1) × g₀ $$

With one engine at full thrust, T/W = 845 ÷ 343 ≈ 2.46, so a ≈ 1.46 × 9.81 ≈ 14.3 m/s². The distance needed to stop from a speed v follows from basic motion:

$$ d = v² / (2a) $$

If we assume the booster is falling at 250 m/s when the burn begins (a round number for illustration, not an official figure), it needs about 250² ÷ (2 × 14.3) ≈ 2,200 meters and about 17 seconds. Air drag and the falling mass of the booster as it burns propellant both shorten the real stop, and the flight computer adjusts the throttle continuously, but the estimate shows why the burn starts while the booster is still high up.

## Does Falcon 9 land on land or at sea?

Falcon 9 lands back near the launch site when the mission leaves enough propellant for the trip home, and on a drone ship far out at sea when the payload needs more of the rocket’s energy.

The Planetary Society’s 2016 snapshots show the difference. On the ORBCOMM-2 flight, which returned to land, the first stage shut down at about 1.66 km/s. On JCSAT-14, bound for a high geostationary transfer orbit, it shut down at about 2.31 km/s, too fast to turn around, so it landed at sea.

![A Falcon 9 first stage standing on Landing Zone 1 at sunset with two workers and a crane nearby](/images/articles/falcon-9-first-landing-lz-1-2015.webp "The first orbital-class booster ever landed, on Landing Zone 1 at Cape Canaveral in December 2015 after the ORBCOMM-2 launch.")

That December 2015 landing was the first time an orbital-class booster came back to Earth vertically. The first landing on a drone ship followed in April 2016, and the first reflight of a landed booster came in 2017.

![A Falcon 9 first stage standing on its four legs on the deck of a drone ship at sea](/images/articles/falcon-9-droneship-landing-jcsat-14.webp "A Falcon 9 booster on a drone ship after the JCSAT-14 launch in May 2016, one of the first sea landings from a high-energy mission.")

## How many times can a Falcon 9 booster fly?

SpaceX says its Falcon 9 boosters are qualified for up to 40 flights, and the record holder, booster B1067, flew its 37th mission on August 25, 2026.

That record flight carried 29 Starlink satellites, was the 100th Falcon 9 launch of 2026, and ended with a landing on the drone ship A Shortfall of Gravitas about eight and a half minutes after liftoff. On October 30, 2026, SpaceX flew its 700th Falcon 9 mission, and its booster, flying for the 18th time, made what Spaceflight Now counted as the 675th Falcon booster landing. SpaceX reports a mission success rate above 99 percent, and Falcon 9 flew 165 times in 2025, more than half of all orbital launches worldwide that year.

Starship takes a different path to the same goal. Instead of legs, its giant stages are caught by arms on the launch tower, as described in [how SpaceX caught Starship on Flight 15](/articles/how-spacex-caught-starship-flight-15-tower-catch), and the math behind that choice appears in [Starship vs Saturn V](/articles/starship-vs-saturn-v-size-thrust-payload). For more on the people behind trajectory calculations, see the profile of NASA mathematician [Katherine Johnson](/scientists/katherine-johnson).

## References

- [SpaceX: Falcon user’s guide (2025, PDF)](https://www.spacex.com/assets/media/falcon-users-guide-2025-05-09.pdf)
- [National Academies: Lars Blackmore, Autonomous Precision Landing of Space Rockets](https://www.nationalacademies.org/read/23659/chapter/10)
- [NASA: Launch milestones for Crew-13 (October 2026)](https://www.nasa.gov/blogs/commercialcrew/2026/10/01/a-look-at-todays-launch-milestones-3/)
- [FAA: Environmental assessment of Falcon 9 boostback and landing (2016, PDF)](https://www.faa.gov/sites/faa.gov/files/space/environmental/nepa_docs/ea_fonsi_f9_boostback_vafb.pdf)
- [NASA Technical Reports: Falcon 9 supersonic retropropulsion analysis (PDF)](https://ntrs.nasa.gov/api/citations/20170008535/downloads/20170008535.pdf)
- [The Planetary Society: Falcon 9 first stage speed and altitude at engine cutoff](https://www.planetary.org/space-images/falcon-9-first-stage)
- [DLR study: reverse engineering of Falcon 9 (arXiv)](https://arxiv.org/pdf/2009.01664)
- [Space.com: Falcon 9 booster flies a record 37th mission](https://www.space.com/space-exploration/launches-spacecraft/spacex-starship-record-37th-booster-flight-100-falcon-9-launches)
- [Spaceflight Now: SpaceX’s 700th Falcon 9 launch](https://spaceflightnow.com/2026/10/30/live-coverage-spacex-to-close-out-october-with-halloween-eve-falcon-9-launch/)`,
  }),
];
