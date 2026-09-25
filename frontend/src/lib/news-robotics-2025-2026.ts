import { makeNewsArticle, NEWS_CATEGORIES } from './news-article';

export const ROBOTICS_NEWS_ARTICLES = [
  makeNewsArticle({
    id: 'robotics-news-gemini-robotics-2025',
    title: 'Gemini Robotics Links Language, Vision and Robot Actions',
    slug: 'gemini-robotics-language-vision-actions-2025',
    excerpt:
      'Google DeepMind introduced a vision-language-action model for dexterous manipulation and a companion embodied-reasoning model, while keeping access limited to selected testers.',
    category: NEWS_CATEGORIES.robotics,
    tags: ['Gemini Robotics', 'Vision-Language-Action', 'Embodied AI', 'Robot Learning', 'Manipulation', 'AI Safety'],
    readTime: 7,
    publishedAt: '2025-03-12T09:00:00Z',
    sourceUrls: [
      'https://deepmind.google/blog/gemini-robotics-brings-ai-into-the-physical-world/',
      'https://arxiv.org/abs/2503.20020',
    ],
    content: `## From multimodal understanding to motor commands

Google DeepMind introduced Gemini Robotics and Gemini Robotics-ER on March 12, 2025. The distinction between the two matters. Gemini Robotics is a vision-language-action model: it receives images and language instructions and produces actions that can directly control a robot. Gemini Robotics-ER focuses on embodied reasoning, including spatial perception, grasp prediction, trajectory prediction and planning, and can be connected to a developer's existing low-level controller.

The work tries to bridge a persistent divide in robotics. Large multimodal models can recognize objects and discuss a scene, while conventional robot controllers can execute precise motions in a narrow setting. A useful generalist robot needs both abilities in a closed loop: interpret an instruction, relate it to the physical scene, act, observe what changed and correct the next action.

## What the demonstrations showed

DeepMind reported three target properties: generality, interactivity and dexterity. Its demonstrations included folding origami, packing food in a resealable bag and responding when an object was moved during a task. The model was trained mainly on ALOHA 2, a two-arm research platform, then adapted to Franka-based arms and Apptronik's Apollo humanoid.

The accompanying technical report says Gemini Robotics more than doubled the average performance of the compared vision-language-action systems on the team's generalization evaluation. It also reports adaptation to a new short-horizon task with as few as 100 demonstrations. Those numbers are useful evidence within the described test setup, but they are not a universal success rate for household or factory work. Results depend on the task distribution, hardware, training data and definition of success.

Gemini Robotics-ER separates high-level reasoning from physical execution. It can identify an appropriate part of an object to grasp, estimate a route through space and generate code that calls a robot controller. In the researchers' end-to-end evaluations, it achieved two to three times the success rate of the Gemini 2.0 baseline. This architecture lets teams retain deterministic controllers for timing, force and collision constraints while using a multimodal model for scene-level decisions.

## The safety stack still matters

A language-aware policy does not replace established robot safety engineering. DeepMind describes layered safeguards: conventional low-level controls can limit forces, prevent collisions and preserve dynamic stability, while a semantic layer evaluates whether an instruction is appropriate in context. The report also introduces ASIMOV, a benchmark for semantic safety in embodied systems.

That approach identifies an important boundary. A model may correctly recognize that a requested action is unsafe and still suffer a perception error or generate a poor trajectory. Conversely, a low-level controller may prevent excessive contact without understanding that the overall task is inappropriate. Practical systems need both layers, plus application-specific risk assessment and monitoring.

## What was released and what was not

This was a research introduction, not a general commercial deployment. Gemini Robotics-ER went to a selected group of trusted testers, including robotics companies, and the action model was demonstrated on a limited collection of platforms. DeepMind did not publish the model weights, a complete training dataset or enough information for an independent laboratory to reproduce every claimed result.

The practical advance is therefore an architecture and a set of measured demonstrations, rather than proof that general-purpose robots have been solved. The multi-embodiment results suggest that knowledge can transfer across hardware more efficiently than retraining every task from zero. The next evidence to watch is repeatable performance over long shifts, unfamiliar spaces and safety-critical edge cases outside the developer's laboratory.

## Primary sources

- [Google DeepMind announcement](https://deepmind.google/blog/gemini-robotics-brings-ai-into-the-physical-world/)
- [Gemini Robotics technical report](https://arxiv.org/abs/2503.20020)`,
  }),

  makeNewsArticle({
    id: 'robotics-news-iso-10218-2025',
    title: 'ISO 10218:2025 Rewrites the Safety Baseline for Industrial Robots',
    slug: 'iso-10218-2025-industrial-robot-safety-update',
    excerpt:
      'The first major revision since 2011 separates robot-maker duties from system-integration duties and brings collaborative applications, end effectors and safety-related cybersecurity into the core standard.',
    category: NEWS_CATEGORIES.robotics,
    tags: ['ISO 10218', 'Robot Safety', 'Industrial Robots', 'Functional Safety', 'Cobots', 'Cybersecurity'],
    readTime: 7,
    publishedAt: '2025-02-05T09:00:00Z',
    sourceUrls: [
      'https://www.iso.org/standard/73933.html',
      'https://www.iso.org/standard/73934.html',
      'https://www.automate.org/robotics/news/updated-iso-10218-major-advancements-in-industrial-robot-safety-standards-now-available',
    ],
    content: `## Two documents for two sets of responsibilities

ISO published the third edition of ISO 10218-1 and the second edition of ISO 10218-2 on February 5, 2025. Together they replace the 2011 editions of the main international safety standard for industrial robots. Part 1 covers the robot as partly completed machinery and is aimed mainly at manufacturers. Part 2 covers the complete robot application or cell and assigns requirements to integrators across design, commissioning, operation, maintenance and decommissioning.

That split reflects how industrial automation is actually delivered. A safe robot arm can become part of an unsafe cell if the end effector, workpiece, layout, guarding or control logic creates a new hazard. Conversely, an integrator cannot compensate for every weakness in the underlying machine. The two documents establish a chain of responsibilities rather than treating a robot's certification as the end of the safety process.

## What changed after fourteen years

According to the Association for Advancing Automation, which participated in the revision work, the 2025 editions make functional-safety requirements more explicit. They also incorporate collaborative-application material that previously sat in ISO/TS 15066 and bring guidance for manual loading, unloading and end effectors into the main framework. New robot classifications are paired with safety requirements and test methods.

The revision also addresses cybersecurity where it can affect safety. That does not turn ISO 10218 into a general information-security standard. It recognizes a narrower engineering fact: if a networked control function can be altered, disabled or given unsafe commands, a cyber failure can become a physical hazard. Integrators must consider that link within the application's risk assessment.

Collaborative operation is often misunderstood as permission to place any so-called cobot beside a person. The revised framework still requires the complete application to be assessed. Tooling, payload, speed, accessible crushing points and foreseeable misuse can make an otherwise force-limited arm hazardous. The label on the robot does not validate the final cell.

## Scope is deliberately limited

ISO 10218 applies to industrial environments where access is controlled and operators are working adults. Its published scope excludes medical, healthcare, consumer, law-enforcement, military, airborne and space robots, as well as robots that transport people. Separate standards and regulations govern many of those systems.

The documents also do not erase process hazards. Welding, lasers, machining, hot material and chemicals introduce risks beyond robot motion. Part 2 requires the integrated application to address its significant hazards, but specialist machinery and process standards may still be necessary.

## Practical consequences for a robot cell

For manufacturers, the new edition affects safety-related control functions, documentation, validation and the information supplied to integrators. For integrators, compliance requires evidence about the full application: defined operating modes, protective measures, stopping behavior, access control, recovery procedures and validation under foreseeable conditions.

An existing cell does not instantly become unsafe because a new edition was published. ISO's Part 1 scope states that it is not applicable to robots manufactured before publication, and local law determines how standards are adopted. However, organizations designing new systems or materially modifying old ones now have a newer consensus reference. National adoptions, such as the 2025 U.S. revision of ANSI/A3 R15.06, translate the international work into local practice.

The real significance is procedural. Fast-moving perception and AI software can change what a robot attempts, but safety still depends on defined limits, verified functions and a risk assessment of the complete application. The 2025 revision gives that work a more current common language.

## Primary sources

- [ISO 10218-1:2025](https://www.iso.org/standard/73933.html)
- [ISO 10218-2:2025](https://www.iso.org/standard/73934.html)
- [Association for Advancing Automation summary of the revision](https://www.automate.org/robotics/news/updated-iso-10218-major-advancements-in-industrial-robot-safety-standards-now-available)`,
  }),

  makeNewsArticle({
    id: 'robotics-news-nasa-cadre-rovers-2025',
    title: 'NASA Packs Three CADRE Rovers for a Cooperative Moon Mission',
    slug: 'nasa-cadre-cooperative-moon-rovers-2025',
    excerpt:
      'Three carry-on-size lunar rovers completed shipment preparations for a mission designed to test autonomous planning, formation driving and distributed subsurface measurements.',
    category: NEWS_CATEGORIES.robotics,
    tags: ['NASA CADRE', 'Lunar Robotics', 'Robot Swarms', 'Autonomous Rovers', 'Moon', 'Space Technology'],
    readTime: 6,
    publishedAt: '2025-02-11T09:00:00Z',
    sourceUrls: [
      'https://www.nasa.gov/technology/nasas-mini-rover-team-is-packed-for-lunar-journey/',
      'https://www.jpl.nasa.gov/missions/cadre/',
      'https://ai.jpl.nasa.gov/public/documents/papers/rabideau-aamas2025-cadre.pdf',
    ],
    content: `## Hardware ready to leave the laboratory

NASA's Jet Propulsion Laboratory announced on February 11, 2025 that the three flight rovers and their base station for CADRE had been packed and sent to Intuitive Machines for integration with a lunar lander. CADRE stands for Cooperative Autonomous Distributed Robotic Exploration. Its purpose is to test whether several small robots can divide work, navigate and collect coordinated measurements with limited direction from Earth.

Each four-wheeled rover is roughly the size of carry-on luggage. The vehicles carry stereo cameras and navigation sensors, while a multistatic ground-penetrating radar lets the team measure the lunar subsurface from multiple positions. They communicate with one another and with a base station on the lander through a mesh network.

Shipment is a real flight-hardware milestone, but it is not a lunar result. At the time of the announcement, the robots had not launched, landed or operated on the Moon. NASA's mission page lists the delivery on Intuitive Machines' IM-3 mission, targeting the Reiner Gamma region. Launch schedules for commercial lunar payload missions can change, so the central 2025 news was readiness for integration.

## Cooperation is the experiment

Planetary rovers normally receive carefully reviewed command sequences from operators on Earth. That method protects valuable hardware but introduces delay and idle time. CADRE's autonomy stack is intended to turn higher-level goals into coordinated rover activities onboard.

The team's technical description includes leader election, task allocation, safe route planning, map construction, formation driving and synchronized radar observations. A strategic planner schedules actions while considering time, energy, communication and geometric constraints. Lower layers handle localization, terrain mapping and motion planning for each vehicle.

This is more demanding than sending the same route to three independent machines. A team member may lose communication, encounter a hazard or consume energy faster than expected. The group must adapt its plan while preserving the geometry required for distributed measurements. JPL's 2025 planning paper reports simulation results suggesting that onboard planning can reduce rover idle time and energy use, but those estimates still need a flight demonstration.

## Why several small robots can outperform one large rover

A single large rover can carry sophisticated instruments, yet it can only observe from one location at a time and becomes a single point of failure. A coordinated group can spread across a site, view terrain from several angles and sample a physical process simultaneously. CADRE's radar experiment uses that spatial separation to support three-dimensional mapping below the surface.

Small rovers also create tradeoffs. Their solar area, thermal capacity, computing power and ability to cross obstacles are limited. Communication and coordination add software failure modes. The project therefore tests a complementary architecture, not a universal replacement for larger planetary vehicles.

## A short, constrained lunar test

The solar-powered experiment is designed for the daylight portion of one lunar day, roughly two Earth weeks, rather than indefinite operation. The robots must deploy from the lander, establish their network and complete increasingly complex driving and sensing activities within that window. They are technology demonstrators; their main product is evidence about cooperative autonomy.

If the experiment succeeds, the methods could support future teams that scout hazardous terrain, build maps ahead of astronauts or collect distributed science measurements. Failure would also be informative because lunar dust, lighting, temperature and communication constraints expose weaknesses that Earth tests cannot fully reproduce. CADRE's contribution is a controlled first step toward multi-robot surface missions, with its strongest claims contingent on performance after landing.

## Primary sources

- [NASA shipment announcement](https://www.nasa.gov/technology/nasas-mini-rover-team-is-packed-for-lunar-journey/)
- [JPL CADRE mission page](https://www.jpl.nasa.gov/missions/cadre/)
- [CADRE planning, scheduling and execution paper](https://ai.jpl.nasa.gov/public/documents/papers/rabideau-aamas2025-cadre.pdf)`,
  }),

  makeNewsArticle({
    id: 'robotics-news-amazon-vulcan-2025',
    title: 'Amazon Vulcan Adds Force Feedback to Warehouse Picking and Stowing',
    slug: 'amazon-vulcan-force-feedback-warehouse-robot-2025',
    excerpt:
      'Amazon moved its tactile manipulation system from pilot work toward beta testing, using six-axis force sensing to work inside crowded fabric storage pods.',
    category: NEWS_CATEGORIES.robotics,
    tags: ['Amazon Robotics', 'Warehouse Automation', 'Force Sensing', 'Robot Manipulation', 'Physical AI', 'Human-Robot Work'],
    readTime: 6,
    publishedAt: '2025-05-07T09:00:00Z',
    sourceUrls: [
      'https://www.aboutamazon.eu/news/company-news/introducing-vulcan-amazons-first-robot-with-a-sense-of-touch',
      'https://www.amazon.science/blog/how-amazons-vulcan-robots-use-touch-to-plan-and-execute-motions',
    ],
    content: `## Touch changes the warehouse manipulation problem

Amazon introduced Vulcan at its Delivering the Future event on May 7, 2025. The system is designed to pick products from and stow products into the fabric pods used in Amazon fulfillment centers. Those cubbies are densely packed, open only at the front and held by elastic bands, so a robot cannot reliably avoid contact with the pod and neighboring items.

Traditional industrial automation often treats unexpected contact as a fault: the machine stops or follows a rigid path despite the obstruction. Vulcan instead measures contact and uses it as part of the task. Amazon says the system completed a pilot and was moving into beta testing, with operating systems already present in Spokane, Washington, and Hamburg, Germany.

## Two tools and six-axis force measurements

The stowing side uses an end-of-arm tool that Amazon compares to a ruler mounted on a hair straightener. It pushes items and elastic bands to make space while force and torque sensors measure interaction along six axes. Control software adjusts the motion so the tool stays below force limits intended to avoid damage.

The picking side combines a camera and suction cup. Stereo vision estimates free space and item geometry, while force feedback helps the arm manage inevitable contact. The perception system also estimates which items the robot can handle and sends unsuitable cases to a person instead of forcing an attempted pick.

Amazon reported that Vulcan could pick and stow about 75 percent of the item types in its fulfillment network at speeds comparable to front-line employees. That is a vendor-reported operational figure, not an independently audited benchmark. It also means the remaining item mix still needs other automation or human handling, and aggregate coverage does not describe error rates for every shape, material or packing condition.

## Physical data rather than simulation alone

The company says it trained the manipulation system on thousands of physical examples that include touch and force measurements. Simulation is valuable for generating varied scenes, but deformable pod walls, elastic bands, crumpled packages and friction between arbitrary products are difficult to model precisely. Real interactions supply the contact data needed to decide when to push, back away or change the grasp.

Vulcan also records failures for later learning. That does not mean a deployed arm rewrites its behavior without controls during every attempt. In an industrial system, new policies need evaluation before release because an apparent improvement in one product configuration can create risk in another.

## Deployment is targeted at an ergonomic bottleneck

Amazon initially focused Vulcan on the highest and lowest rows of storage pods. Those locations make employees climb step ladders or repeatedly bend, so automating them can reduce an identified ergonomic burden while people handle the more accessible rows and exceptions. This is a narrower and more measurable use case than claiming a general replacement for warehouse labor.

The system's significance lies in controlled contact at operational scale. Force sensing has a long history in robotics, but integrating it with perception, task planning, exception handling and a diverse inventory is the hard systems problem. Amazon planned additional deployment in Europe and the United States over the following years; the 2025 evidence established pilot operation and beta readiness, not network-wide availability.

Long-term assessment will need data on damaged items, interventions, throughput, maintenance and worker injury exposure. The launch material provides detailed mechanisms and intended benefits, but it does not publish a controlled before-and-after safety study. Vulcan is best understood as a specialized tactile warehouse system whose early deployment tests whether contact-rich manipulation can remain useful and predictable across millions of different products.

## Primary sources

- [Amazon's Vulcan announcement](https://www.aboutamazon.eu/news/company-news/introducing-vulcan-amazons-first-robot-with-a-sense-of-touch)
- [Amazon Science engineering explanation](https://www.amazon.science/blog/how-amazons-vulcan-robots-use-touch-to-plan-and-execute-motions)`,
  }),

  makeNewsArticle({
    id: 'robotics-news-phase-transition-soft-actuator-2025',
    title: 'Water-Powered Soft Actuators Deliver More Than 50 Newtons at 24 Volts',
    slug: 'water-phase-transition-soft-actuators-2025',
    excerpt:
      'A peer-reviewed soft-robotics study revisited liquid-to-gas actuation with flexible heaters, closed-loop control and demonstrations in a robotic hand and quadruped.',
    category: NEWS_CATEGORIES.robotics,
    tags: ['Soft Robotics', 'Artificial Muscles', 'Phase-Change Actuation', 'Bioinspired Robots', 'Robot Hands', 'Materials Engineering'],
    readTime: 6,
    publishedAt: '2025-04-25T09:00:00Z',
    sourceUrls: [
      'https://www.nature.com/articles/s41467-025-59023-7',
      'https://arxiv.org/abs/2411.06963',
    ],
    content: `## Reconsidering a familiar physical process

Researchers at the University of Coimbra reported a liquid-gas phase-transition soft actuator in Nature Communications on April 25, 2025. A flexible electrical coil heats a sealed working fluid, producing vapor pressure that deforms a compliant structure. Cooling condenses the vapor and lets the actuator return.

Boiling a fluid to create motion is not a new idea. Soft-robotics researchers often avoided the approach because heating and cooling can be slow, energy can be lost, and delayed pressure response complicates control. Diogo Fonseca and Pedro Neto redesigned the heater, chamber and soft body as separate modules and paired them with a nonlinear controller intended to reduce lag and unwanted vibration.

## Measured force, speed and voltage

The paper reports strain rates above 16 percent per second and pressurization rates of 100 kilopascals per second. Blocked-force tests exceeded 50 newtons while the devices operated at voltages up to 24 volts. The authors describe this as roughly an order-of-magnitude improvement in strain and pressurization rate over earlier phase-transition attempts.

Different numbers measure different properties. Blocked force is the force produced when an actuator is prevented from moving; it is not the payload that a complete mobile robot can carry. Strain rate describes how quickly its length changes relative to its size, while system response also includes cooling, structure, load and control. The values are laboratory measurements under documented conditions, not a guarantee for every geometry.

Water was attractive because it is inexpensive, comparatively safe and diffuses slowly through the surrounding elastomer. Its high enthalpy of vaporization requires substantial heat, however. The researchers therefore provide a method for selecting other working fluids when an application needs a different balance of temperature, pressure, safety and response.

## From actuator samples to robot demonstrations

The team built linear McKibben-style devices and bending actuators based on fast pneumatic-network geometry. It demonstrated them in a cable-driven biomimetic hand and in a soft quadruped that could move in unstructured outdoor settings. The paper also reports more than one thousand actuation cycles for tested devices.

Those demonstrations show that the actuator can be integrated into mechanisms rather than measured only on a bench. They do not establish industrial lifetime, weather resistance or medical compatibility. A thousand cycles can be enough to compare prototypes, but production equipment may need millions of reliable cycles, predictable seals and service procedures.

## The central tradeoff is thermal

Low-voltage electrical input and compliant output are useful because they avoid an external compressed-air line and high-voltage electrostatic hardware. The phase transition can generate high pressure in a small chamber, and the modular construction uses common fabrication methods such as casting and 3D printing.

Heat remains the main constraint. Energy must enter the fluid before motion and leave it before full recovery. Repeated operation can raise the temperature of the robot and its surroundings. Applications near people, sensitive products or tissue would require insulation, temperature monitoring and failure analysis. Efficiency also has to be evaluated at system level, including the battery and thermal cycle.

The 2025 result expands the design space rather than identifying a universal artificial muscle. It is most promising where compliance, compact force and simple electrical control matter more than very high cycle frequency. The peer-reviewed measurements establish a stronger baseline for phase-change actuation; durability and efficiency in sustained field operation remain the tests that determine where it becomes practical.

## Primary sources

- [Nature Communications paper](https://www.nature.com/articles/s41467-025-59023-7)
- [Author preprint](https://arxiv.org/abs/2411.06963)`,
  }),

  makeNewsArticle({
    id: 'robotics-news-srt-h-surgery-2025',
    title: 'SRT-H Completes a 17-Step Phase of Gallbladder Surgery',
    slug: 'srt-h-autonomous-gallbladder-surgery-2025',
    excerpt:
      'A hierarchical imitation-learning system completed the clipping and cutting phase on eight ex vivo pig gallbladders, recovering from errors without human control during the trials.',
    category: NEWS_CATEGORIES.robotics,
    tags: ['Surgical Robotics', 'SRT-H', 'Autonomous Surgery', 'Imitation Learning', 'Medical AI', 'Johns Hopkins'],
    readTime: 7,
    publishedAt: '2025-07-09T09:00:00Z',
    sourceUrls: [
      'https://hub.jhu.edu/2025/07/09/robot-performs-first-realistic-surgery-without-human-help/',
      'https://doi.org/10.1126/scirobotics.adt5254',
      'https://h-surgical-robot-transformer.github.io/',
    ],
    content: `## A longer autonomous sequence

Johns Hopkins researchers reported SRT-H, the Surgical Robot Transformer-Hierarchy, in Science Robotics on July 9, 2025. The system performed the clipping and cutting phase of a cholecystectomy on ex vivo pig gallbladders. That phase was divided into 17 tasks, including identifying anatomy, grasping tissue, placing clips and cutting selected structures.

This was a larger challenge than an isolated needle pass or suture. Errors can compound across a long sequence: a weak grasp changes the scene for the next step, and a misplaced tool can make a later action unsafe. SRT-H completed trials on eight previously unseen gallbladders, with the project page reporting success in all eight.

The experiment used realistic biological tissue, but it was not surgery on a living patient. Ex vivo tissue does not reproduce bleeding, breathing, changing physiology or the full range of anatomy and complications in a clinical operating room. The work is a laboratory proof of concept and has not been authorized to operate autonomously on people.

## A hierarchy of language and motion

SRT-H uses two learned levels. A high-level policy expresses the current task or a correction in language. A low-level policy converts the selected instruction and camera observations into robot trajectories. The high-level layer also produces a correction flag that switches the controller from the planned task to a recovery instruction when it detects a suboptimal state.

The researchers collected about 18,000 demonstrations across more than 30 pig gallbladders. The dataset included ordinary demonstrations and deliberately created failure states followed by expert recoveries. This taught the policy what to do after a missed grasp, an overshot clip position or another non-catastrophic error, rather than assuming every previous action was perfect.

The system could also accept spoken corrections such as moving one arm in a specified direction. That interface is significant because future autonomy does not have to mean excluding the surgical team. A clinician needs a fast, understandable way to guide or halt a system, and corrections can become additional training examples.

## What the tests establish

The project reports that SRT-H completed the clipping and cutting task on all eight test gallbladders without human intervention during execution. It also handled introduced visual changes, including blood-like dye, and shifts in initial tool position. Ablation tests examined the contribution of wrist cameras, corrective instructions, online language tuning and the hierarchical design.

Eight successful specimens provide evidence that the method can generalize beyond its training examples, but the sample remains small. A 100 percent result in eight trials does not imply a 100 percent clinical reliability rate. Rare anatomy, equipment faults and emergencies require far larger and more varied evaluation. The robot also took longer than a human expert.

## Clinical autonomy remains a separate threshold

The U.S. Food and Drug Administration describes marketed robotically assisted surgical systems as computer-assisted devices controlled directly by a trained surgeon. SRT-H investigates a different level of autonomy. Before such a system could be used clinically, developers would need controlled studies, robust detection of conditions outside its competence, sterile and validated hardware, cybersecurity controls, clear responsibility for interventions and regulatory authorization.

The study's main contribution is a mechanism for long-horizon recovery. Earlier scripted systems could be precise when the world matched their plan, but biological tissue never presents exactly the same scene twice. A policy that recognizes and repairs small mistakes is a necessary capability for autonomous surgery.

Necessary is not sufficient. SRT-H automated one demanding phase on prepared specimens, not an entire operation on patients. Its results narrow a research gap between short robotic skills and procedure-level behavior while leaving the clinical evidence, supervision design and safety case as future work.

## Primary sources

- [Johns Hopkins University announcement](https://hub.jhu.edu/2025/07/09/robot-performs-first-realistic-surgery-without-human-help/)
- [Science Robotics paper](https://doi.org/10.1126/scirobotics.adt5254)
- [SRT-H research project and experiment details](https://h-surgical-robot-transformer.github.io/)`,
  }),

  makeNewsArticle({
    id: 'robotics-news-atlas-product-2026',
    title: 'Boston Dynamics Unveils a Product Version of Atlas for Industrial Work',
    slug: 'boston-dynamics-product-atlas-industrial-robot-2026',
    excerpt:
      'The electric humanoid moved from a research platform toward a manufactured enterprise product, with initial 2026 fleets committed to Hyundai and Google DeepMind.',
    category: NEWS_CATEGORIES.robotics,
    tags: ['Boston Dynamics', 'Atlas Robot', 'Humanoid Robots', 'Industrial Automation', 'Material Handling', 'CES 2026'],
    readTime: 7,
    publishedAt: '2026-01-05T09:00:00Z',
    sourceUrls: [
      'https://bostondynamics.com/blog/boston-dynamics-unveils-new-atlas-robot-to-revolutionize-industry/',
      'https://bostondynamics.com/products/atlas/',
      'https://bostondynamics.com/wp-content/uploads/2026/01/atlas-spec-sheet.pdf',
    ],
    content: `## From research demonstrations to a product configuration

Boston Dynamics unveiled the product version of its all-electric Atlas humanoid at CES on January 5, 2026. The company said manufacturing would begin immediately and that its 2026 deployments were committed to Hyundai's Robotics Metaplant Application Center and Google DeepMind. Additional customers were planned for 2027.

The wording matters. This was more than a laboratory concept because Boston Dynamics published a defined hardware configuration, began manufacturing and named initial recipients. It was not a broad, proven rollout across factories. The first fleets are early deployments intended to build and validate application-specific skills.

Atlas targets material handling, part sequencing, machine tending and order building in spaces designed for people. A humanoid shape can reach existing shelves, tools and workstations, but two legs and many joints add control, maintenance and energy challenges compared with a fixed arm or wheeled mobile robot.

## A detailed industrial specification

The 1.9-meter robot weighs 90 kilograms and has 56 degrees of freedom. Boston Dynamics lists a 2.3-meter reach, a 30-kilogram sustained payload, a 50-kilogram instantaneous payload and a 20-kilogram one-handed capacity. Tactile sensing in the fingers and palms complements a 360-degree camera view.

The product page gives a four-hour nominal battery life and two hours during heavy lifting. Atlas can walk to a station and exchange its battery in a claimed three minutes, which shifts the uptime problem from charging the whole robot to keeping charged packs available. Its published environmental specification includes IP67 protection and operation from minus 20 to 40 degrees Celsius.

Control can be autonomous, virtual-reality teleoperation or tablet steering. Orbit software links the robot with manufacturing and warehouse management systems and distributes a learned skill across a fleet. These interfaces are essential in production: a robot must receive the right job, identify the right part and report completion, not merely perform an impressive motion in isolation.

## Safety and serviceability become product questions

The specification lists human detection and fenceless guarding. Those features do not by themselves certify every shared workspace. Payloads, grippers, speed and the surrounding process determine the hazards of an application, so each deployment still needs integration and risk assessment under the relevant rules.

Boston Dynamics also emphasizes field-replaceable modular components and a path to customer repair certification. This is a meaningful change from a research robot that returns to its developers after a failure. Factory economics depend on mean time between failures, spare parts, diagnostic tools and recovery time, yet the launch did not publish long-duration reliability or total-cost data.

## What the first deployments can prove

Hyundai provides a manufacturing environment where Atlas can be tested on real sequencing and handling tasks. Google DeepMind is a development partner for foundation-model capabilities. Those settings should expose different questions: whether the hardware survives industrial duty cycles, and whether learned policies can acquire useful skills without sacrificing predictability.

All performance specifications currently come from the manufacturer. The live CES appearance and company videos demonstrate mobility, but they do not establish shift-level throughput or safety relative to established automation. The strongest claim supported in January 2026 is that Atlas reached a product design and manufacturing phase with scheduled customer deployments.

That milestone still matters. Humanoid robotics has often been evaluated through short research demonstrations. Atlas supplies concrete payload, battery, environmental and service parameters against which an enterprise system can be judged. The decisive evidence will come from documented uptime, intervention rates, task economics and safety performance in those first customer facilities.

## Primary sources

- [Boston Dynamics product announcement](https://bostondynamics.com/blog/boston-dynamics-unveils-new-atlas-robot-to-revolutionize-industry/)
- [Official Atlas product page](https://bostondynamics.com/products/atlas/)
- [Atlas product specification sheet](https://bostondynamics.com/wp-content/uploads/2026/01/atlas-spec-sheet.pdf)`,
  }),

  makeNewsArticle({
    id: 'robotics-news-figure-helix-02-2026',
    title: 'Figure’s Helix 02 Unifies Walking, Balance and Manipulation',
    slug: 'figure-helix-02-full-body-autonomy-2026',
    excerpt:
      'Figure demonstrated a hierarchical neural controller completing a continuous four-minute kitchen task with whole-body control, tactile sensing and palm cameras.',
    category: NEWS_CATEGORIES.robotics,
    tags: ['Figure AI', 'Helix 02', 'Humanoid Robots', 'Whole-Body Control', 'Robot Learning', 'Tactile Sensing'],
    readTime: 7,
    publishedAt: '2026-01-27T09:00:00Z',
    sourceUrls: [
      'https://www.figure.ai/news/helix-02',
      'https://www.figure.ai/news/helix',
      'https://www.figure.ai/news/introducing-figure-03',
    ],
    content: `## One policy stack for movement and manipulation

Figure introduced Helix 02 on January 27, 2026 as a control system for its Figure 03 humanoid. The company demonstrated a continuous four-minute task in which the robot walked around a kitchen, unloaded dishes, placed them in cabinets, reloaded the dishwasher and started it. Figure states that the run was autonomous, used onboard sensors and had no resets or human intervention.

The technical goal is whole-body loco-manipulation. Walking changes a robot's balance, reach and camera view; carrying an object changes its mass distribution; opening a door creates contact forces that travel through the arms and feet. Conventional systems often join separately designed walking, standing and manipulation controllers with state machines. Helix 02 instead connects a learned hierarchy from visual input to all of the robot's joints.

## Three systems at different speeds

The slowest layer, System 2, interprets the scene and language goal and sequences semantic behaviors. System 1 is a visuomotor transformer running at 200 hertz. It receives head-camera images, palm-camera images, fingertip forces and proprioception, then produces targets for the legs, torso, head, arms, wrists and fingers.

System 0 runs at 1 kilohertz and converts those targets into coordinated, stable movement. Figure describes it as a 10-million-parameter policy trained in simulation across more than 200,000 parallel environments and on more than 1,000 hours of retargeted human-motion data. Simulation randomization is intended to make the controller tolerate differences between virtual dynamics and the physical robot.

This hierarchy does not mean one network performs every calculation at the same rate. It connects slow task reasoning with a faster perceptual policy and an even faster balance-and-contact controller. That division is a practical response to the latency mismatch between language models and motor control.

## Hardware closes perception gaps

Figure 03 adds cameras in the palms for cases where the head camera cannot see an object inside a cabinet or behind the hand. Fingertip sensors are claimed to detect forces as small as three grams, allowing the policy to respond to contact and slip. In separate demonstrations, the system unscrewed a cap, manipulated individual pills and dispensed a requested syringe volume.

During the dishwasher sequence, the company counted 61 loco-manipulation actions. The robot carried objects while walking, used both hands and sometimes used its hip or foot when its hands were occupied. These behaviors illustrate coupled control, but a count of actions is not a standardized measure of general intelligence.

## Evidence from a curated demonstration

Figure provides detailed architecture, frequencies, sensor inputs and training-scale figures. It does not provide model weights, full evaluation data, repeated-trial success rates or an independent reproduction. The central evidence is company-produced video and description. A continuous four-minute run is stronger than a montage of disconnected movements, but it cannot reveal how often attempts fail or which scene conditions were selected.

Tasks involving pills and syringes are manipulation demonstrations, not authorization for medical use. Likewise, success in a prepared kitchen does not establish safe operation in arbitrary homes with children, pets, clutter or unexpected contact. The company presents the result as a robotics milestone, and its broader claims should be evaluated as vendor claims until outside testing is available.

Helix 02 nevertheless marks a clear technical direction: learned policies are expanding from arm-only manipulation to coordinated bodies with touch, in-hand vision and locomotion. The next measure of progress is repeatability—many robots, many rooms, long operating periods and transparent intervention rates. Those results will show whether unified control reduces engineering complexity without moving that complexity into an opaque model that is harder to validate.

## Primary sources

- [Figure Helix 02 announcement and demonstrations](https://www.figure.ai/news/helix-02)
- [Original Helix architecture](https://www.figure.ai/news/helix)
- [Figure 03 sensors and hardware](https://www.figure.ai/news/introducing-figure-03)`,
  }),

  makeNewsArticle({
    id: 'robotics-news-waymo-safety-220m-2026',
    title: 'Waymo Reports Safety Results Across 220 Million Driverless Miles',
    slug: 'waymo-safety-results-220-million-driverless-miles-2026',
    excerpt:
      'Waymo’s June 2026 update compared rider-only crash rates with human benchmarks across five operating areas, extending an analysis method published in peer-reviewed research.',
    category: NEWS_CATEGORIES.robotics,
    tags: ['Waymo', 'Autonomous Vehicles', 'Robotaxis', 'Road Safety', 'Self-Driving Cars', 'Safety Data'],
    readTime: 7,
    publishedAt: '2026-06-24T09:00:00Z',
    sourceUrls: [
      'https://waymo.com/blog/shorts/safetydata-june26/',
      'https://waymo.com/safety/impact/',
      'https://doi.org/10.1080/15389588.2025.2499887',
    ],
    content: `## A much larger real-world exposure set

Waymo published an updated safety analysis on June 24, 2026 covering more than 220 million miles of fully autonomous driving through March 2026. The data span five U.S. operating geographies, with Atlanta included for the first time. These are rider-only miles: the automated driving system performs the driving task without a safety driver behind the wheel.

Compared with human drivers in matched locations and periods, Waymo reported 94 percent fewer crashes involving serious or fatal injury, 82 percent fewer crashes with an airbag deployment and 82 percent fewer crashes involving any reported injury. It also reported fewer injury crashes involving pedestrians, cyclists and motorcyclists. The comparisons count crashes regardless of which road user was at fault.

These are large and consequential figures, but they are not simply the number of crashes divided by U.S. national mileage. The analysis constructs human benchmarks for the same operating areas and adjusts for differences between police-reported data and the records available for an automated fleet.

## Why comparison design matters

Minor crashes are underreported in human-driving databases. An automated-vehicle operator may record events that would never reach police or insurance systems, making a naive comparison unfair to the robot. Geography matters too: urban streets, weather, vehicle mix and trip time change crash exposure. The chosen outcome also matters because a bumper scrape and a serious injury should not be treated as the same safety signal.

Waymo's data hub documents its benchmarking approach and links it to a 2025 peer-reviewed study in Traffic Injury Prevention. That paper examined 56.7 million rider-only miles and found statistically lower rates for injury-reported, airbag-deployment and suspected-serious-injury-or-worse crashes. The 2026 update applies the method to a much larger dataset, but the update itself is a company publication rather than a new peer-reviewed paper.

Statistical uncertainty does not disappear at 220 million miles. Fatal and serious crashes are rare, so the confidence range for the most severe outcomes is wider than for common events. Service also operates within defined areas, routes and conditions. Results there should not be assumed to apply unchanged to every road, snowfall, rural environment or vehicle platform.

## A deployed autonomous system, not a driver-assistance feature

Waymo's system combines cameras, lidar, radar, maps and onboard computing. It plans and executes the complete driving task inside its operational design domain. This differs from consumer driver-assistance systems that require a human to supervise continuously.

Commercial operation supplies exposure to unusual interactions that closed-course testing cannot enumerate. Simulation and structured testing remain important for rare cases, while the road fleet provides outcome data. The combination creates a feedback loop: identify patterns, update the system, validate the release and continue monitoring after deployment.

## What the evidence supports

The update provides evidence that this specific system, in the places and period measured, had substantially lower rates for the selected crash outcomes than the constructed human benchmarks. It does not prove that every autonomous vehicle is safer than every human, nor does it answer all questions about congestion, accessibility, emergency response or behavior outside Waymo's service areas.

Waymo develops the technology and publishes much of the underlying analysis, so independent review and public reporting remain valuable. The peer-reviewed 2025 paper strengthens the methodology, while regulators and outside researchers need sufficiently detailed, consistent data to test broader claims.

The practical milestone is scale with measurable outcomes. Autonomous driving has moved beyond a handful of demonstrations in these service areas. Safety assessment can increasingly use real injury, airbag and vulnerable-road-user events, while still stating the geographic and statistical limits of the comparison.

## Primary sources

- [Waymo June 2026 safety update](https://waymo.com/blog/shorts/safetydata-june26/)
- [Waymo Safety Impact data and methodology hub](https://waymo.com/safety/impact/)
- [Peer-reviewed 56.7-million-mile comparison](https://doi.org/10.1080/15389588.2025.2499887)`,
  }),

  makeNewsArticle({
    id: 'robotics-news-ottava-fda-2026',
    title: 'FDA Authorizes Johnson & Johnson’s Table-Integrated OTTAVA Surgical System',
    slug: 'fda-authorizes-ottava-surgical-system-2026',
    excerpt:
      'The De Novo decision created a U.S. device category for a robotic surgical system whose four arms are integrated into the operating table for specified upper-abdominal procedures.',
    category: NEWS_CATEGORIES.robotics,
    tags: ['OTTAVA', 'Surgical Robotics', 'FDA', 'Johnson & Johnson', 'Medical Devices', 'Operating Room'],
    readTime: 7,
    publishedAt: '2026-07-22T09:00:00Z',
    sourceUrls: [
      'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/denovo.cfm?ID=DEN250068',
      'https://www.jnj.com/media-center/press-releases/johnson-johnson-receives-fda-market-authorization-in-the-u-s-for-its-ottava-robotic-surgical-system',
      'https://www.fda.gov/medical-devices/surgery-devices/computer-assisted-surgical-systems',
    ],
    content: `## A new device classification

The U.S. Food and Drug Administration granted De Novo authorization for the OTTAVA Robotic Surgical System on July 21, 2026, and Johnson & Johnson announced the decision the next day. The FDA database identifies the new classification as an integrated operating table-electromechanical surgical system, with De Novo number DEN250068.

De Novo review is used for a novel, low-to-moderate-risk device when there is no legally marketed predicate suitable for the standard 510(k) pathway. A granted decision creates a classification and regulatory controls that later devices may be able to use as a predicate. It is a marketing authorization for specified uses, not a general endorsement of every possible procedure or a finding that the system improves every clinical outcome.

OTTAVA was authorized for several upper-abdominal general-surgery procedures. Johnson & Johnson lists gastric bypass, gastrectomy, gallbladder removal, splenectomy, gastric sleeve, small-bowel resection, appendectomy, adhesion removal, fundoplication and hiatal-hernia repair. The company planned a selective U.S. commercial launch while continuing a trial in inguinal-hernia procedures.

## The arms move with the operating table

Four robotic arms are integrated into the surgical table rather than mounted on a separate boom or several independent bedside carts. Software coordinates predefined setup poses, and a feature called twin motion moves the table and arms together when the patient is repositioned. The design is intended to preserve access to different parts of the abdomen with fewer manual changes.

Johnson & Johnson says the system occupies 30 to 50 percent less floor space than traditional boom- or cart-mounted multi-port systems, based on its evaluation of products available in September 2025. That is a manufacturer-supported footprint comparison. Whether a hospital gains usable time or capacity will depend on its room, staff workflow, procedure mix and training.

The instrument set includes a combined needle driver designed to reduce accidental suture cutting and curved monopolar scissors. A connected digital platform supports training, media and surgical data. These features address the full operating-room workflow, where setup, instrument exchange and team movement can matter as much as the arm mechanism.

## Robotic assistance is not autonomous surgery

The FDA explains that marketed robotically assisted surgical devices are controlled directly by a trained surgeon. OTTAVA's automated setup and coordinated table motion do not make it an autonomous surgeon. The physician remains responsible for operating the instruments and making clinical decisions.

This distinction separates OTTAVA from 2025 research systems that learned to complete an experimental surgical phase without continuous human control. The two developments address different problems: one is an authorized teleoperated clinical platform and the other is preclinical autonomy research.

## What authorization establishes—and what comes next

The FDA decision means the agency found reasonable assurance of safety and effectiveness for the intended uses under the applicable controls. It does not establish superiority over open, laparoscopic or other robot-assisted approaches. Comparative outcomes, learning curves, reliability and cost will emerge through clinical use and postmarket evidence.

Training remains central. The FDA advises hospitals to verify that surgeons and staff are properly trained and credentialed for each device model. It also monitors malfunction, injury and death reports, while noting that reports can be duplicated, incomplete or unable to prove causation.

OTTAVA's 2026 authorization broadens the U.S. surgical-robot market and validates a table-integrated architecture as a regulated product category. The consequential next phase is less visual than a product launch: controlled adoption, transparent outcomes and surveillance across many teams and patients. Those data will determine whether the smaller footprint and coordinated motion translate into safer, more efficient or more accessible care.

## Primary sources

- [FDA De Novo decision record DEN250068](https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/denovo.cfm?ID=DEN250068)
- [Johnson & Johnson authorization announcement](https://www.jnj.com/media-center/press-releases/johnson-johnson-receives-fda-market-authorization-in-the-u-s-for-its-ottava-robotic-surgical-system)
- [FDA guidance on computer-assisted surgical systems](https://www.fda.gov/medical-devices/surgery-devices/computer-assisted-surgical-systems)`,
  }),
];
