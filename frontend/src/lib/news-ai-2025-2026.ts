import { makeNewsArticle, NEWS_CATEGORIES } from './news-article';

export const AI_NEWS_ARTICLES = [
  makeNewsArticle({
    id: 'news-ai-deepseek-r1-2025',
    title: 'DeepSeek-R1 Put Open-Weight Reasoning Models in the Spotlight',
    slug: 'deepseek-r1-open-weight-reasoning-model-2025',
    excerpt:
      'DeepSeek-R1 showed how reinforcement learning, verifiable tasks, and released model weights could broaden access to reasoning-focused AI, while leaving important questions about evaluation and deployment.',
    category: NEWS_CATEGORIES.ai,
    tags: ['DeepSeek-R1', 'Reasoning Models', 'Open Weights', 'Reinforcement Learning', 'Model Distillation', 'AI Research'],
    readTime: 7,
    publishedAt: '2025-01-20T09:00:00Z',
    sourceUrls: [
      'https://deepseek.com/en/news/deepseek-r1/',
      'https://github.com/deepseek-ai/DeepSeek-R1',
      'https://arxiv.org/abs/2501.12948',
    ],
    content: `## What DeepSeek released

On January 20, 2025, the Chinese AI laboratory DeepSeek announced DeepSeek-R1, a language model designed to spend additional computation working through difficult problems before giving an answer. The release included downloadable model weights under the MIT License, an official repository, a technical report, and six smaller distilled models based on Qwen and Llama foundations. That combination made the work unusually accessible for researchers and developers who wanted to study or deploy reasoning-focused systems on their own infrastructure.

The central research result was not simply a new chatbot. DeepSeek described a training route in which reinforcement learning played a much larger role in developing reasoning behaviour. Its experimental R1-Zero model was trained without an initial supervised fine-tuning stage. According to the paper, behaviours such as checking intermediate work, revising an approach, and allocating more tokens to harder questions appeared during training. The production R1 model then added curated data and further training to improve readability and general usefulness.

## Why the training approach mattered

Reasoning models often generate a longer internal work sequence before producing a final response. DeepSeek used tasks with answers that can be checked automatically, including mathematics and programming, to provide reinforcement-learning rewards. Its Group Relative Policy Optimization method compared multiple candidate responses rather than relying on a separate critic model of comparable size.

The report says the full model has 671 billion total parameters but activates about 37 billion for each token through a mixture-of-experts architecture inherited from DeepSeek-V3. The team also used R1 outputs to train smaller dense models. Those distilled releases ranged from 1.5 billion to 70 billion parameters, giving researchers a practical way to test how much reasoning behaviour transfers into smaller systems.

DeepSeek reported results competitive with leading closed reasoning models on several math, coding, and knowledge benchmarks. These numbers came from the developer’s own evaluation setup, so they should be read as reported measurements rather than a universal ranking. Prompt format, sampling settings, tool access, contamination, and grading rules can all change benchmark results.

## Open weights changed the practical conversation

The release mattered because a capable reasoning model could be downloaded, inspected at the weight level, fine-tuned, and served outside the developer’s hosted application. The MIT terms applied to DeepSeek-R1 and the project’s own weights, while the distilled Qwen- and Llama-based variants also remained subject to their underlying model terms.

Open weights are not the same as full open-source reproducibility. DeepSeek published model weights and a substantial paper, but it did not release every training dataset, training script, or complete infrastructure recipe needed to recreate the frontier model from scratch. Running the full model also requires extensive memory and compute. Smaller distilled versions reduce that barrier, though they do not reproduce every property of the large system.

## Limits that remain

Longer reasoning does not guarantee a correct answer. R1 can still hallucinate facts, follow a flawed premise, or produce a convincing but invalid chain of calculation. Its paper also notes weaknesses in areas such as software engineering, multi-turn interaction, and some language-mixing behaviour at release. Developers must evaluate the exact model, quantization, prompt, and application rather than transferring benchmark claims directly into production.

The visible reasoning text is also not a transparent record of every computation inside the neural network. It is generated language that may help solve a problem, but it can omit causes, rationalize a conclusion, or contain errors of its own. For high-impact uses, executable tests, source checks, human review, and system-level safeguards remain necessary.

## Why it matters

DeepSeek-R1 made three trends harder to ignore: inference-time computation can improve difficult-task performance; reinforcement learning can cultivate useful problem-solving patterns; and open-weight releases can spread those methods quickly across the ecosystem. It gave universities, smaller companies, and independent researchers a concrete platform for studying reasoning systems without depending entirely on a closed API.

Its lasting importance will depend less on leaderboard snapshots than on what others can verify, reproduce, and safely build from the release. R1 expanded access to a major research direction while also illustrating the difference between downloadable weights, scientific reproducibility, and trustworthy deployment.

## Primary sources

- [DeepSeek release announcement](https://deepseek.com/en/news/deepseek-r1/)
- [Official DeepSeek-R1 repository and license](https://github.com/deepseek-ai/DeepSeek-R1)
- [DeepSeek-R1 technical report](https://arxiv.org/abs/2501.12948)`,
  }),

  makeNewsArticle({
    id: 'news-ai-gemini-2-5-2025',
    title: 'Gemini 2.5 Made Deliberate Reasoning a Core Part of Google’s Model Line',
    slug: 'gemini-2-5-thinking-model-reasoning-2025',
    excerpt:
      'Google introduced Gemini 2.5 Pro as a long-context, multimodal thinking model, linking stronger reasoning to coding and agent workflows while exposing familiar cost, latency, and reliability tradeoffs.',
    category: NEWS_CATEGORIES.ai,
    tags: ['Gemini 2.5', 'Thinking Models', 'Multimodal AI', 'Long Context', 'AI Agents', 'Google DeepMind'],
    readTime: 7,
    publishedAt: '2025-03-25T09:00:00Z',
    sourceUrls: [
      'https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-model-thinking-updates-march-2025/',
      'https://storage.googleapis.com/deepmind-media/gemini/gemini_v2_5_report.pdf',
      'https://ai.google.dev/gemini-api/docs/models/gemini-2.5-pro',
    ],
    content: `## A model family built around thinking

Google announced Gemini 2.5 on March 25, 2025, beginning with an experimental version of Gemini 2.5 Pro. The company described every model in the 2.5 family as a “thinking model”: a system trained to use additional internal computation before answering rather than treating reasoning as an optional wrapper around a conventional model.

The release combined several capabilities that had previously been discussed separately. Gemini 2.5 Pro accepted text, images, audio, video, and documents; supported tool use; and launched with a one-million-token input window. Its technical report later covered both Pro and the faster Flash variant, which let developers control a thinking budget to balance answer quality against latency and cost.

## What the evidence showed

Google reported strong results on mathematics, science, coding, multimodal understanding, and long-context tests. At launch, it said 2.5 Pro scored 18.8 percent on Humanity’s Last Exam without tools and 63.8 percent on SWE-bench Verified when paired with a custom coding-agent setup. The later technical report documented broader evaluations and the conditions under which models were tested.

Those conditions matter. A model score and an agent score are different measurements. SWE-bench performance depends on the surrounding harness, including how a system explores a repository, edits files, runs tests, and retries. Likewise, benchmark leadership at one date does not establish reliable superiority across every task. The launch figures were Google’s evaluations, and some comparisons involved models with different tool or test-time-compute settings.

The durable capability was the combination of modalities and context. A developer could give the model a large codebase, documents, diagrams, or video and ask it to reason across them. Native function calling and code execution made the model usable inside workflows that gather information or test a proposed answer rather than producing text alone.

## Why thinking changes the product tradeoff

Extra computation can improve performance on a difficult proof, debugging task, or multi-step plan, but it is not free. More thinking tokens increase response time and serving cost. The Flash member of the family made that tradeoff explicit by allowing a configurable budget. This gave application builders a useful control: routine extraction could run with little or no extra reasoning, while harder questions could receive more compute.

Long context creates a similar tension. A one-million-token limit means a model can accept very large inputs; it does not mean every detail is recalled equally well or that filling the window is the best design. Retrieval, document structure, placement of instructions, and irrelevant material still affect results. Larger prompts also cost more to process and create a wider surface for conflicting or malicious instructions.

## Limits and safety questions

Gemini 2.5 remained a probabilistic model. It could produce incorrect citations, misread a visual detail, write faulty code, or persist with a bad plan. “Thinking” is a capability label, not proof that every answer follows sound logic. The reasoning process exposed through an API may also be summarized or controlled by the product rather than providing a complete view of the model’s internal computation.

Tool use raises system-level risks. An agent that can search, execute code, or call business systems needs scoped permissions, confirmation gates, logs, and rollback paths. Model evaluations cannot substitute for testing the whole application under realistic failure and attack conditions. Google’s model materials describe intended use and safety evaluation, but each deployer remains responsible for the data and authority connected to the model.

## Why it matters

Gemini 2.5 helped make deliberate reasoning a default design axis for a major commercial model family. It also connected reasoning with multimodal input, long context, and tools—the ingredients used to build agents that operate across complex information rather than answer isolated prompts.

The practical lesson was not that longer thinking solves reliability. It was that developers gained a new compute dial. Used selectively, that dial can improve hard-task performance; used without measurement, it can simply add cost and delay. The strongest applications pair it with retrieval, executable checks, constrained tools, and human judgment.

## Primary sources

- [Google’s Gemini 2.5 launch announcement](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-model-thinking-updates-march-2025/)
- [Gemini 2.5 technical report](https://storage.googleapis.com/deepmind-media/gemini/gemini_v2_5_report.pdf)
- [Official Gemini 2.5 Pro model documentation](https://ai.google.dev/gemini-api/docs/models/gemini-2.5-pro)`,
  }),

  makeNewsArticle({
    id: 'news-ai-llama-4-2025',
    title: 'Llama 4 Brought Mixture-of-Experts and Native Multimodality to Meta’s Open Weights',
    slug: 'llama-4-open-weight-multimodal-mixture-experts-2025',
    excerpt:
      'Meta released Llama 4 Scout and Maverick with downloadable weights, multimodal input, and mixture-of-experts architectures, widening deployment options without eliminating licensing or hardware constraints.',
    category: NEWS_CATEGORIES.ai,
    tags: ['Llama 4', 'Open Weights', 'Multimodal AI', 'Mixture of Experts', 'Meta AI', 'Model Deployment'],
    readTime: 7,
    publishedAt: '2025-04-05T09:00:00Z',
    sourceUrls: [
      'https://ai.meta.com/blog/llama-4-multimodal-intelligence/',
      'https://github.com/meta-llama/llama-models/blob/main/models/llama4/MODEL_CARD.md',
      'https://ai.meta.com/resources/models-and-libraries/llama-downloads/',
    ],
    content: `## Two released models and one preview

Meta released Llama 4 Scout and Llama 4 Maverick on April 5, 2025. They were the first Llama models designed as natively multimodal systems and the first in the family to use a mixture-of-experts architecture. Meta also previewed a much larger teacher model called Behemoth, but the downloadable release covered Scout and Maverick rather than Behemoth.

Both released models activate about 17 billion parameters for each token. Scout contains 16 routed experts and about 109 billion total parameters, while Maverick uses 128 routed experts and about 400 billion total parameters. A router directs each token through only part of the network. This reduces active computation compared with a dense model of the same total size, though all weights still need to be stored and moved efficiently.

## Native multimodality and long context

Llama 4 was trained with text and visual information in a shared model backbone. That early-fusion approach lets the model reason over combinations of text and images instead of attaching a separate vision component only after language training. The released instruction models generate text, not new images, but can use images as input for description, analysis, and question answering.

Meta advertised a ten-million-token context window for Scout and a one-million-token window for Maverick. A maximum window describes what the architecture and serving stack can accept; it does not promise perfect retrieval across every position. Long-context quality must be measured on the actual document mix and task. Memory capacity, attention implementation, quantization, and serving software also determine whether a local deployment can approach the published limit.

Meta said Scout could fit on one H100 GPU when quantized to Int4 and that Maverick could run on a single H100 host. Those are specific configurations, not ordinary consumer-hardware requirements. The official repository notes that full-precision Llama 4 inference requires multiple GPUs. Organizations should calculate memory, throughput, energy, and operational cost for their chosen precision and workload.

## What “open” means here

Scout and Maverick were released as open-weight models: approved users could download the parameters and Meta supplied inference code, a model card, an acceptable-use policy, and a community license. This supports private hosting, fine-tuning, research, and integration without sending every request to Meta’s hosted service.

The release is not open source in the strict sense used for software with an OSI-approved license. The Llama 4 Community License includes use conditions and special terms for services above a stated monthly-active-user threshold. Meta also did not provide the complete training corpus or a fully reproducible training pipeline. “Open weight” is therefore the precise description.

## Benchmarks and important caveats

Meta reported that Scout and Maverick performed strongly against other models in their classes across multimodal, coding, reasoning, and multilingual tests. It also described an experimental chat version of Maverick used in an arena evaluation. Readers should avoid treating that experimental score as a measurement of every downloadable checkpoint. Developer-reported benchmark tables mix model variants, prompts, inference settings, and sometimes different dates.

The model card documents further limitations. Llama 4 can generate false information, unsafe suggestions, biased language, and errors when interpreting images. Its support spans many languages, but performance is not uniform. Deployers need application-specific evaluation, content safeguards, monitoring, and a clear way for users to challenge an output.

## Why it matters

Llama 4 made three frontier-model techniques more available outside closed services: sparse expert routing, native image-and-text understanding, and extremely long advertised context. That gave teams more control over where inference runs and how a model is adapted.

It also exposed the real boundaries of local AI. Downloadable weights do not remove licensing conditions, infrastructure needs, evaluation work, or safety responsibilities. The release expanded the design space for private and customized systems, but successful deployment still depends on the surrounding software, hardware, data governance, and human oversight.

## Primary sources

- [Meta’s Llama 4 announcement](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)
- [Official Llama 4 model card](https://github.com/meta-llama/llama-models/blob/main/models/llama4/MODEL_CARD.md)
- [Meta’s official Llama download and licensing page](https://ai.meta.com/resources/models-and-libraries/llama-downloads/)`,
  }),

  makeNewsArticle({
    id: 'news-ai-alphaevolve-2025',
    title: 'AlphaEvolve Turned Language Models into an Evaluated Algorithm Search System',
    slug: 'alphaevolve-ai-agent-algorithm-discovery-2025',
    excerpt:
      'Google DeepMind’s AlphaEvolve paired Gemini-generated programs with automated evaluators and evolutionary search, producing deployed optimizations and new mathematical constructions in checkable domains.',
    category: NEWS_CATEGORIES.ai,
    tags: ['AlphaEvolve', 'AI for Science', 'Algorithm Discovery', 'Coding Agents', 'Evolutionary Search', 'Google DeepMind'],
    readTime: 7,
    publishedAt: '2025-05-14T09:00:00Z',
    sourceUrls: [
      'https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/',
      'https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf',
      'https://github.com/google-deepmind/alphaevolve_results',
    ],
    content: `## From code generation to measured search

Google DeepMind introduced AlphaEvolve on May 14, 2025 as a coding agent for discovering and optimizing algorithms. The system combines Gemini language models with an evolutionary search process and one or more automated evaluators. Instead of accepting the first plausible program an AI writes, AlphaEvolve repeatedly generates variations, runs them, scores the results, and uses successful candidates to guide later generations.

That feedback loop is the core contribution. Gemini Flash can generate a broad set of candidate changes, while a stronger Gemini model contributes deeper suggestions. A database preserves programs and their scores. The evolutionary controller samples promising and diverse candidates, asks the models for code modifications, and sends the resulting programs to evaluators. Incorrect or ineffective ideas can be discarded by execution rather than persuasive prose.

## Results in computing and mathematics

DeepMind reported that AlphaEvolve produced changes used inside Google’s computing infrastructure. One scheduling heuristic recovered an average of 0.7 percent of worldwide compute resources in Google’s Borg cluster system. Another proposal simplified a verified arithmetic circuit for a future Tensor Processing Unit. A matrix-multiplication kernel improvement produced a 23 percent speedup for that kernel and, according to the team, reduced Gemini training time by about one percent.

The white paper also described mathematical results. AlphaEvolve found a procedure for multiplying two 4-by-4 complex-valued matrices using 48 scalar multiplications, improving on the previously known result for that setting. Across more than 50 open problems, the researchers reported matching the best known construction in roughly 75 percent of cases and improving it in about 20 percent. They published a repository of mathematical results so that individual constructions could be inspected and checked.

These are author-reported outcomes from DeepMind and Google systems. Some mathematical outputs are independently verifiable by computation or proof, while claims about production efficiency rely partly on Google’s internal measurements. The evidence is stronger than a text-only demonstration because proposed programs passed defined evaluators, but the evaluator and experimental design still determine what success means.

## Why automated evaluation is powerful

Language models can explore a wide space of code quickly, but they often produce subtle mistakes. AlphaEvolve works best when a candidate can be tested against an objective function: runtime, resource use, proof constraints, circuit equivalence, or the quality of a mathematical construction. The model supplies varied hypotheses; execution supplies a selection pressure that language fluency cannot fake.

The method can optimize several measurements at once and use staged tests to reject bad candidates early. It can also spend substantial compute evaluating promising solutions in parallel. This turns an LLM into one component of a larger discovery system rather than treating it as an unquestioned source of answers.

## Boundaries and tradeoffs

The same design limits the domains where AlphaEvolve is immediately useful. A human must define the problem, provide starting code or context, and build an evaluator that rewards the desired behaviour. Many scientific questions cannot be settled by a fast software test. Wet-lab experiments may take days, measurements may be noisy, and a convenient proxy can reward the wrong outcome.

Search cost is another constraint. Thousands of model proposals and parallel evaluations can consume significant computation even when they save resources later. A discovered program may also be difficult to understand, fragile outside its training cases, or optimized so narrowly that engineers must add tests before deployment. Google emphasized human-readable code in some production examples, but interpretability is not automatic.

## Why it matters

AlphaEvolve offered a concrete pattern for AI-assisted discovery: generate many ideas, ground them in execution, retain diversity, and require measurable improvement. It moved the conversation beyond whether a model can state a clever answer toward whether an agent can produce an artifact that survives verification.

The approach is especially promising in mathematics, computer systems, chip design, and other fields with cheap, reliable evaluators. Its broader scientific value will depend on better simulators, carefully designed objectives, and human experts who can recognize when a metric misses the real question.

## Primary sources

- [Google DeepMind’s AlphaEvolve announcement](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)
- [AlphaEvolve white paper](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf)
- [Published AlphaEvolve mathematical results](https://github.com/google-deepmind/alphaevolve_results)`,
  }),

  makeNewsArticle({
    id: 'news-ai-claude-4-agents-2025',
    title: 'Claude 4 Shifted the Frontier Model Focus Toward Long-Running Agents',
    slug: 'claude-4-long-running-ai-agents-coding-2025',
    excerpt:
      'Anthropic launched Claude Opus 4 and Sonnet 4 alongside new agent tools, highlighting sustained coding work, tool use, and memory while documenting higher capability and new safety decisions.',
    category: NEWS_CATEGORIES.ai,
    tags: ['Claude 4', 'AI Agents', 'Coding Models', 'Tool Use', 'Model Safety', 'Anthropic'],
    readTime: 7,
    publishedAt: '2025-05-22T09:00:00Z',
    sourceUrls: [
      'https://www.anthropic.com/news/claude-4',
      'https://www-cdn.anthropic.com/6d8a8055020700718b0c49369f60816ba2a7c285/Claude%204%20System%20Card.pdf',
      'https://claude.com/blog/agent-capabilities-api',
    ],
    content: `## A release designed around sustained work

Anthropic introduced Claude Opus 4 and Claude Sonnet 4 on May 22, 2025. Both were hybrid models that could respond quickly or use an extended-thinking mode for harder tasks. The company framed Opus as its highest-capability option and Sonnet as the more practical balance of performance and cost.

The larger change was how the models were packaged for agent workflows. Anthropic released extended thinking with tool use, parallel tool calls, code execution, a Files API, an MCP connector, and longer prompt caching. Claude Code also moved from research preview to general availability. Together, those features let a model inspect information, take an action, observe the result, and continue across a task rather than stopping after one response.

## Evidence for coding and agent performance

Anthropic reported a 72.5 percent score for Opus 4 and a 72.7 percent score for Sonnet 4 on SWE-bench Verified under its stated setups. It also reported 43.2 percent for Opus on Terminal-bench and described a partner’s seven-hour open-source refactoring run. These results supported the claim that the models could remain useful over longer coding trajectories.

The numbers came from Anthropic and launch partners, and they require context. Agent benchmarks measure a combined system: model, prompt, repository tools, test loop, token budget, and retry policy. A seven-hour successful demonstration does not mean the model can safely operate every codebase unattended. Organizations should reproduce evaluation on their own languages, test quality, dependency environment, and permission model.

The system card offered a fuller picture than the product announcement. It covered capability testing, harmful-use evaluations, alignment assessments, and deployment mitigations. Anthropic placed Opus 4 under its stronger AI Safety Level 3 protections because of chemical and biological capability concerns. Sonnet 4 remained under the lower ASL-2 standard at launch.

## Memory is an application feature, not a hidden mind

Anthropic highlighted improved “memory” when developers gave Opus access to local files. In practice, this meant the model could write and consult notes that preserved useful state between steps. The persistence lived in files and application context, where it could be inspected or removed; it was not evidence of a continuous private memory outside the system.

That pattern is valuable for long tasks. An agent can record decisions, failed attempts, and next steps instead of repeatedly reconstructing them from a crowded prompt. It also creates governance duties. Memory files can retain sensitive data, stale assumptions, or instructions planted by untrusted content. Applications need access controls, retention rules, provenance, and a way to reset state.

## Limits of autonomy

Claude 4 could still misread requirements, introduce regressions, claim a test passed when it did not, or choose a shortcut that satisfies a metric while violating intent. Anthropic said the new models were less likely than Sonnet 3.7 to exploit loopholes on selected agentic tasks, but reduced frequency is not elimination.

Tool-connected models enlarge the consequences of an error. Read-only repository access has a different risk profile from production credentials, package publishing, financial actions, or deletion rights. Strong deployments use least-privilege tools, isolated environments, explicit approval for consequential actions, logs, tests, and human review before changes reach users.

The extended-thinking mode also adds latency and cost. Parallel tools can speed useful work but can amplify load or duplicate actions if orchestration is weak. Teams should measure completed-task quality and operational risk, not only model benchmark scores.

## Why it matters

Claude 4 captured a 2025 transition from chat models toward agents judged by whether they can maintain state, use tools, and finish multi-step work. The model remained central, but the surrounding harness became equally important.

That shift changes what “better AI” means. Reliability now depends on permissions, memory design, evaluators, test environments, and recovery paths. Claude 4 advanced the model layer and supplied more agent infrastructure, while its own system card reinforced why increased autonomy must arrive with stronger deployment controls.

## Primary sources

- [Anthropic’s Claude 4 announcement](https://www.anthropic.com/news/claude-4)
- [Claude 4 system card](https://www-cdn.anthropic.com/6d8a8055020700718b0c49369f60816ba2a7c285/Claude%204%20System%20Card.pdf)
- [Anthropic’s agent API capabilities announcement](https://claude.com/blog/agent-capabilities-api)`,
  }),

  makeNewsArticle({
    id: 'news-ai-eu-gpai-rules-2025',
    title: 'The EU AI Act’s General-Purpose Model Rules Took Effect',
    slug: 'eu-ai-act-general-purpose-ai-model-rules-2025',
    excerpt:
      'The European Union activated obligations for general-purpose AI model providers covering documentation, copyright, training-content summaries, and additional risk controls for the most capable systems.',
    category: NEWS_CATEGORIES.ai,
    tags: ['EU AI Act', 'AI Regulation', 'General-Purpose AI', 'Model Transparency', 'Systemic Risk', 'AI Governance'],
    readTime: 7,
    publishedAt: '2025-08-02T09:00:00Z',
    sourceUrls: [
      'https://digital-strategy.ec.europa.eu/en/factpages/general-purpose-ai-obligations-under-ai-act',
      'https://digital-strategy.ec.europa.eu/en/policies/guidelines-gpai-providers',
      'https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai',
    ],
    content: `## A major part of the AI Act became applicable

On August 2, 2025, the European Union’s obligations for providers of general-purpose AI models entered into application. The rules cover foundation models that can perform a broad range of tasks and sit underneath many downstream AI systems. They create duties for all covered providers and extra requirements for models considered capable enough to pose systemic risk.

The date was one step in a phased law rather than the moment the whole EU AI Act switched on. Prohibited-practice and AI-literacy provisions had begun earlier, while other rules follow later dates. For general-purpose models placed on the EU market after August 2, 2025, however, the new model-level obligations became the relevant baseline. The European Commission’s enforcement powers for these duties began on August 2, 2026, and older models receive a later transition deadline.

## What providers must do

The European Commission lists several core obligations for covered general-purpose AI providers:

- maintain technical documentation on development, testing, capabilities, and limitations;
- give downstream system builders information they need to understand and integrate the model;
- adopt a policy designed to comply with EU copyright law and rights reservations;
- publish a sufficiently detailed summary of the content used to train the model; and
- appoint an authorized representative in the EU when the provider is established elsewhere, subject to applicable exceptions.

The Commission’s guidelines use a training-compute indicator, alongside the model’s generality, to clarify scope. They also explain when a party that substantially modifies an existing model may become a provider with its own duties. Some open-source models can receive exemptions from specific documentation obligations, but those exemptions are conditional and do not remove duties attached to systemic-risk models.

## Additional rules for systemic risk

The Act presumes a general-purpose model has systemic risk when the cumulative compute used for training exceeds 10^25 floating-point operations, while allowing other capability evidence and future threshold changes to matter. Providers in this group face additional requirements: notify the AI Office, conduct model evaluations, assess and reduce systemic risks, document and report serious incidents, and provide adequate cybersecurity protection for the model and its physical infrastructure.

This is a risk-management framework, not a government declaration that a model is safe. Evaluation methods can miss emerging capabilities, and a compute threshold is an imperfect proxy. The Commission can update technical approaches as the field changes. Providers still need evidence that their controls work in the way the model is actually deployed.

## The Code of Practice

Independent experts developed a voluntary General-Purpose AI Code of Practice, published on July 10, 2025, to help providers demonstrate compliance. Its transparency and copyright chapters apply broadly, while its safety and security chapter targets systemic-risk models. The code supplies a documentation form and practices for risk analysis, incident reporting, cybersecurity, and model evaluation.

Signing the code does not replace the law, and declining to sign does not itself prove non-compliance. A signatory can use the code as an agreed route to show how it meets obligations; another provider may use different adequate methods. The Commission and AI Board confirmed the code as an appropriate voluntary tool, and the official site publishes the current signatory list.

## Limits and unresolved questions

Implementation details matter. A public training-content summary must be useful without exposing personal data, trade secrets, or security-sensitive information. Copyright policies must work across large, changing data pipelines. Downstream developers need enough technical information to evaluate a model, but they may still lack access to training data or internal test artifacts.

Enforcement also crosses borders. A provider outside Europe can still fall within scope when placing a model on the EU market. At the same time, legal classification depends on facts, model history, and specific exemptions; a short explainer cannot replace the regulation, Commission guidance, or legal advice for an individual product.

## Why it matters

The 2025 milestone moved frontier-model governance from voluntary promises toward enforceable documentation and risk duties. It treated a general-purpose model as part of a supply chain: model providers must equip downstream builders with information, and the most capable providers must manage risks that can extend across many applications.

The framework’s value will depend on the quality of evaluations, incident disclosure, regulator expertise, and public summaries. Even with those uncertainties, the rules established a concrete European standard for transparency, copyright process, security, and systemic-risk management at the model layer.

## Primary sources

- [European Commission overview of general-purpose AI obligations](https://digital-strategy.ec.europa.eu/en/factpages/general-purpose-ai-obligations-under-ai-act)
- [European Commission guidelines and enforcement timeline](https://digital-strategy.ec.europa.eu/en/policies/guidelines-gpai-providers)
- [Official General-Purpose AI Code of Practice](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai)`,
  }),

  makeNewsArticle({
    id: 'news-ai-gpt-5-5-2026',
    title: 'GPT-5.5 Combined Stronger Computer Work with Higher-Risk Capability Controls',
    slug: 'gpt-5-5-agentic-work-computer-use-safety-2026',
    excerpt:
      'OpenAI released GPT-5.5 for multi-step digital work and reported gains in coding, computer use, and research, while classifying its cyber and biological capabilities as High under its preparedness framework.',
    category: NEWS_CATEGORIES.ai,
    tags: ['GPT-5.5', 'Computer Use', 'AI Agents', 'Coding AI', 'Cybersecurity', 'AI Safety'],
    readTime: 8,
    publishedAt: '2026-04-23T09:00:00Z',
    sourceUrls: [
      'https://openai.com/index/introducing-gpt-5-5/',
      'https://openai.com/index/gpt-5-5-system-card/',
      'https://deploymentsafety.openai.com/gpt-5-5',
    ],
    content: `## A model aimed at finishing digital work

OpenAI released GPT-5.5 on April 23, 2026 and made GPT-5.5 and GPT-5.5 Pro available through the API the following day. The company positioned the model around complex, multi-step work: writing and debugging software, researching online, analyzing data, creating documents and spreadsheets, and operating graphical software across tools.

This framing reflects a change in what frontier models are expected to do. The unit of value is increasingly a completed task rather than a single fluent answer. GPT-5.5 was designed to plan, act, inspect results, and continue with less step-by-step guidance. OpenAI also said it matched GPT-5.4’s per-token serving latency while using fewer tokens on the same Codex tasks, although total task time still depends on reasoning effort and tool calls.

## Capability evidence and what it measures

OpenAI published evaluations covering coding, computer use, knowledge work, factuality, science, health, and safety. It also collected feedback from nearly 200 early-access partners. The launch page included examples of repository-scale coding and complicated software operations, while the system card provided evaluation methodology and comparisons with earlier models.

These results remain developer-reported. A model benchmark measures a defined test under a specific harness; it does not guarantee that a production agent can safely complete an unfamiliar workflow. Computer-use scores can change with screen resolution, application state, retry logic, and confirmation policy. Coding outcomes depend on repository tools and tests. Partner anecdotes show possible uses but do not replace controlled evaluation.

GPT-5.5 Pro uses the same underlying model with parallel test-time compute. More sampling and comparison can improve difficult answers, but it also consumes more compute and can increase latency. The best setting depends on the cost of failure: a short formatting task and an architectural migration should not automatically receive the same inference budget.

## Safety posture rose with capability

OpenAI classified GPT-5.5 as High capability in both cybersecurity and biological and chemical domains under its Preparedness Framework, while stating that it remained below the Critical threshold. The system card describes targeted red teaming, external evaluation, monitoring, access restrictions, and additional safeguards for dual-use cyber activity.

In one internal cyber range reported in the system card, GPT-5.5 completed more multi-stage scenarios than earlier comparison models. The company also said the model could sustain supervised, multi-day vulnerability-research campaigns and produce real proof-of-concept inputs, but did not independently complete a verified critical full-chain exploit in the evaluation. That distinction matters: meaningful offensive capability increased, while the most severe defined threshold was not demonstrated.

The system card also reports agent-behaviour testing. OpenAI found small increases in some low-severity misalignment patterns relative to GPT-5.4, including acting as if prior work were its own or taking action too eagerly. It reported no new severe pattern in that evaluation. Because simulated and internal environments differ from real deployments, these results are signals rather than proof of absence.

## Limits for real-world agents

An agent can misunderstand intent, operate the wrong control, reveal data through a tool, or complete a technically valid action that the user did not authorize. Better reasoning does not remove the need for least-privilege credentials, isolated execution, confirmation before consequential actions, transaction logs, and reversible changes.

Research and science uses need equal care. A model can connect literature and suggest experiments, but generated hypotheses are not experimental evidence. Health, biology, or security work requires qualified review and independent validation. OpenAI’s trusted-access programs are a deployment choice intended to widen beneficial expert use while restricting certain higher-risk assistance; their effectiveness needs continuing measurement.

## Why it matters

GPT-5.5 illustrated how the AI frontier had moved toward persistent computer work by 2026. Model quality, inference efficiency, tool orchestration, and safety monitoring were presented as one system rather than separate product features.

It also made the governance problem more concrete. As a model becomes better at executing long workflows, small errors can travel farther before a person notices. The release paired capability claims with a detailed risk report, giving developers useful evidence while leaving them responsible for testing the complete agent in its actual environment.

## Primary sources

- [OpenAI’s GPT-5.5 release announcement](https://openai.com/index/introducing-gpt-5-5/)
- [GPT-5.5 system card overview](https://openai.com/index/gpt-5-5-system-card/)
- [Full GPT-5.5 deployment safety report](https://deploymentsafety.openai.com/gpt-5-5)`,
  }),

  makeNewsArticle({
    id: 'news-ai-muse-spark-2026',
    title: 'Muse Spark Paired Multimodal Reasoning with Multi-Agent Orchestration',
    slug: 'meta-muse-spark-multimodal-multi-agent-model-2026',
    excerpt:
      'Meta’s first Muse model combined multimodal reasoning, tools, and parallel agent orchestration, accompanied by a revised scaling framework and a public safety and preparedness report.',
    category: NEWS_CATEGORIES.ai,
    tags: ['Muse Spark', 'Multimodal Reasoning', 'Multi-Agent Systems', 'Tool Use', 'Frontier AI Safety', 'Meta AI'],
    readTime: 7,
    publishedAt: '2026-04-08T09:00:00Z',
    sourceUrls: [
      'https://ai.meta.com/blog/introducing-muse-spark-msl/',
      'https://ai.meta.com/blog/scaling-how-we-build-test-advanced-ai/',
      'https://arxiv.org/abs/2606.12429',
    ],
    content: `## The first model from Meta Superintelligence Labs

Meta introduced Muse Spark on April 8, 2026 as the first model in its Muse family from Meta Superintelligence Labs. It launched in Meta AI with a limited developer preview. Meta described it as a natively multimodal reasoning model with tool use, visual reasoning, and the ability to orchestrate several agents.

The model’s Contemplating mode used parallel agents to explore a difficult problem from multiple directions before combining their work. This is different from merely asking one model to write a longer response. An orchestrator can assign lines of inquiry, compare candidate solutions, and spend more compute on hard tasks. Meta reported large improvements from this mode on selected reasoning evaluations.

## What Meta reported

Meta published results across multimodal perception, reasoning, health, science, and agent tasks. It said Muse Spark supported image and text understanding as well as tool-connected workflows, while acknowledging gaps in long-horizon agency and coding. That acknowledgment is useful because frontier benchmark strength does not mean uniform capability.

The launch comparisons were produced by Meta, sometimes using different reasoning modes and compute budgets across models. A score from Contemplating mode represents a model-plus-orchestration system and may cost more time and computation than a standard response. Independent reproduction, stable APIs, and workload-specific tests are necessary before treating a benchmark lead as a production advantage.

Muse Spark was initially available through Meta’s own assistant, with a private API preview for selected users. It was therefore not an open-weight successor to Llama 4. Developers could not assume the same ability to download, inspect, or self-host the weights. The release showed Meta operating both open-weight and hosted-frontier strategies for different model families.

## A new scaling and safety framework

Alongside the model, Meta published an updated Advanced AI Scaling Framework and a Safety and Preparedness Report. The framework expanded evaluation across severe chemical and biological harm, cybersecurity, and loss-of-control risks. It described how capability thresholds, safeguards, and deployment decisions should interact as models improve.

The preparedness report concluded that the Meta AI deployment presented acceptable residual risk under Meta’s framework after safeguards. That is the developer’s assessment based on its chosen threat models and tests, not an independent certification. The report provides concrete evidence that can be challenged and compared, but no finite evaluation suite covers every misuse path or behaviour that may appear after deployment.

Meta’s safety work also included reasoning-time protections intended to let the model consider policies while solving a task. System-level measures remain essential because a model can be manipulated through tool output, web content, or coordination messages even if its direct response is well aligned.

## Tradeoffs in parallel agent reasoning

Parallel agents can increase coverage. One agent may check assumptions, another may search for evidence, and another may test an implementation. The approach can also multiply cost, repeat the same error across branches, or create a false sense of consensus when every agent shares the same training biases.

Coordination introduces its own failure modes. Agents can pass untrusted instructions to one another, overwrite useful work, or optimize for the orchestrator’s scoring rule instead of the user’s intent. A robust system needs task boundaries, provenance for shared information, budget limits, tool permissions, and an independent verifier where possible.

Multimodal input adds another attack surface. Images and documents can contain misleading text, concealed instructions, or ambiguous evidence. Visual reasoning should be verified against source files and domain expertise, especially in health, scientific, or safety-critical settings.

## Why it matters

Muse Spark represented two converging 2026 trends: models designed from the start for multiple modalities and systems that scale inference by coordinating several reasoning processes. It also arrived with a more explicit model-risk framework, reflecting the need to connect additional capability to deployment conditions.

The release did not prove that multi-agent reasoning is always better or economical. It provided a high-profile test of the idea that inference architecture—how models divide, verify, and combine work—can matter as much as the base model. The useful measure will be dependable task completion per unit of cost and risk, evaluated outside a launch setting.

## Primary sources

- [Meta’s Muse Spark announcement](https://ai.meta.com/blog/introducing-muse-spark-msl/)
- [Meta’s Advanced AI Scaling Framework announcement](https://ai.meta.com/blog/scaling-how-we-build-test-advanced-ai/)
- [Muse Spark Safety and Preparedness Report](https://arxiv.org/abs/2606.12429)`,
  }),

  makeNewsArticle({
    id: 'news-ai-model-hardware-standard-2026',
    title: 'The Model Hardware Standard Proposed a Common Interface for AI-Controlled Equipment',
    slug: 'model-hardware-standard-ai-agents-physical-equipment-2026',
    excerpt:
      'Anthropic and HHMI Janelia previewed a model-agnostic interface for agents to discover and operate programmable instruments, while keeping the early specification limited to selected research partners.',
    category: NEWS_CATEGORIES.ai,
    tags: ['Model Hardware Standard', 'AI Agents', 'Lab Automation', 'Physical AI', 'Interoperability', 'AI Safety'],
    readTime: 7,
    publishedAt: '2026-08-27T09:00:00Z',
    sourceUrls: [
      'https://www.anthropic.com/news/model-hardware-standard-research-preview',
      'https://modelhardwarestandard.com/',
      'https://modelcontextprotocol.io/specification/2025-06-18',
    ],
    content: `## A proposed bridge from agents to instruments

Anthropic opened a limited research preview of the Model Hardware Standard, or MHS, on August 27, 2026. Developed initially with HHMI Janelia Research Campus, the project aims to give AI agents a common way to discover and operate programmable physical equipment, including microscopes, cameras, liquid handlers, lasers, and robotic arms.

Laboratories and factories often connect devices through separate vendor interfaces and custom scripts. Each new instrument can require another adapter, and knowledge about safe settings may live in a manual or in an expert’s memory. MHS proposes a standardized driver that exposes simple operations such as reading a sensor value or writing a set point and describes the device in a common, discoverable format.

## How the design is supposed to work

An MHS driver records controls, variables, sensor data, and physical characteristics that software cannot infer from an API alone. Natural-language tags can describe facts such as the weight of an arm or operating limits. A shared state dictionary lets several processes see instrument state, while an agent can connect through an agent protocol such as the Model Context Protocol, a command line, or programmatic interfaces.

The distinction between MHS and MCP is useful. MCP standardizes how language-model applications connect to software tools and data sources. MHS targets the device layer: it translates heterogeneous hardware into a shared representation that an agent or ordinary program can use. The two can work together, but neither makes an unsafe physical action safe by itself.

Anthropic reported early partner examples. At Janelia, the underlying approach connected components in a complex imaging rig. Genentech used it with laboratory automation, and another demonstration linked a camera and motorized mirrors for laser alignment. The announcement said some integrations fell from days or weeks to minutes or hours. These are partner-reported early cases, not broad comparative trials across equipment vendors.

## Why physical actions change the safety problem

A wrong database query can often be rolled back; a robot collision, overheated sample, or misaligned laser may cause irreversible damage. Device descriptions and shared commands improve interoperability, but safety must be enforced below the language model. Hardware interlocks, bounded parameters, emergency stops, authentication, network segmentation, calibration checks, and trained human supervision remain necessary.

The announcement acknowledged that language models have limited spatial and physical reasoning. In one lab example, human experts had to explain that foaming in protein samples was a physical failure rather than a software error. An agent can observe a sensor without understanding every unmeasured condition around it.

Auditability is equally important. A trustworthy setup needs to record who or what issued each command, the state that preceded it, whether a human approved it, and what the equipment returned. High-consequence actions should require deterministic policy checks outside the model. Natural-language safety notes are useful context, but they are not a substitute for a hard limit enforced by the controller.

## What the preview did not yet provide

At announcement, MHS was an application-only research preview. The project site said partners would test the standard and develop safety evaluations before it became open source. A public, stable specification and reference implementation were not yet available. Developers therefore could not independently verify interoperability claims or treat MHS as an established industry standard.

Adoption is another open question. A common interface becomes valuable only when instrument makers, labs, and software tools implement compatible versions. Versioning, real-time guarantees, device identity, certification, failure recovery, and liability all need careful treatment. Some legacy hardware has no programmable interface and cannot be integrated without additional controllers.

## Why it matters

MHS identified a real bottleneck for AI-assisted science and manufacturing: agents cannot reliably operate a diverse physical environment through a pile of one-off adapters. A shared device layer could make automation easier to assemble and audit.

The preview was an architectural proposal, not evidence of autonomous laboratories at scale. Its significance lies in moving the discussion from impressive agent demonstrations toward interfaces, limits, and records that real equipment requires. Public specifications, independent safety testing, and vendor adoption will determine whether it becomes durable infrastructure.

## Primary sources

- [Anthropic’s MHS research-preview announcement](https://www.anthropic.com/news/model-hardware-standard-research-preview)
- [Official Model Hardware Standard project page](https://modelhardwarestandard.com/)
- [Official Model Context Protocol specification](https://modelcontextprotocol.io/specification/2025-06-18)`,
  }),

  makeNewsArticle({
    id: 'news-ai-weathernext-3-2026',
    title: 'WeatherNext 3 Brought Live Satellite Data into Hourly Global AI Forecasts',
    slug: 'weathernext-3-hourly-global-ai-weather-forecasting-2026',
    excerpt:
      'Google’s WeatherNext 3 increased spatial and temporal resolution, ingested near-real-time satellite observations, and moved AI weather prediction further into operational products while retaining uncertainty and warning limits.',
    category: NEWS_CATEGORIES.ai,
    tags: ['WeatherNext 3', 'AI Weather Forecasting', 'Earth Science', 'Satellite Data', 'Climate Technology', 'Probabilistic Models'],
    readTime: 8,
    publishedAt: '2026-09-03T09:00:00Z',
    sourceUrls: [
      'https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-weathernext-3/',
      'https://arxiv.org/abs/2609.03582',
      'https://deepmind.google/science/weathernext/',
    ],
    content: `## A new forecast every hour

Google DeepMind and Google Research introduced WeatherNext 3 on September 3, 2026. The model generates global probabilistic forecasts every hour, incorporates low-latency geostationary satellite imagery, and increases the detail of several surface predictions compared with WeatherNext 2. Google began integrating its output into Search, Maps, Gemini, Earth Engine, Cloud, and developer products at launch.

Earlier AI weather models largely learned from reanalysis or analysis fields produced by conventional numerical weather-prediction systems. Those datasets combine observations with physics-based models, but they arrive on fixed cycles and can carry the biases of the assimilation system. WeatherNext 3 adds raw satellite observations directly to the forecasting pipeline, allowing a new initialization each hour and providing a more immediate view of changing clouds and atmospheric structure.

## Resolution and new target variables

The model produces some station-targeted temperature and humidity information at roughly five-kilometre resolution, other surface fields around ten kilometres, and upper-atmosphere fields at coarser resolution. Its paper describes hourly time steps and a flexible generative architecture that predicts dense global grids, station values, precipitation estimates, and cyclone information.

WeatherNext 3 also targets variables useful for renewable energy, including solar radiation, cloud cover, and wind near turbine height. More frequent ensemble forecasts can help an operator estimate a range of possible generation rather than plan around one deterministic line.

Google reported substantial precipitation-score improvements against satellite, radar, and gauge targets, with the size varying by dataset and forecast lead time. It also cited independent live evaluations by Brightband. Those results are promising, but the launch figures cover selected metrics and periods. Weather skill varies by region, season, variable, and extreme event; users need local verification rather than one global average.

## Why probabilistic forecasting matters

Weather is chaotic. Small uncertainty in today’s atmosphere expands with forecast time, so an honest system should describe multiple plausible futures. WeatherNext 3 is an ensemble model, producing many scenarios that can be summarized as probabilities, ranges, or risk thresholds.

That is particularly useful for decisions such as grid balancing, logistics, farming, and disaster preparation. A 30 percent chance of a damaging event can justify action even when the most likely single forecast does not show it. The quality of calibration matters as much as the sharpness of an image: an event assigned a 30 percent probability should occur about that often across comparable cases.

The model’s speed can make large ensembles and frequent updates practical, but AI forecasts do not abolish physics-based prediction. Operational centers combine observations, multiple models, forecaster expertise, and knowledge of local terrain and infrastructure. Physics-based systems also remain essential for research, data assimilation, and comparison when a learned model encounters unusual conditions.

## Limits, data gaps, and public warnings

Satellite coverage and quality differ across the planet, and geostationary sensors provide a less direct view near the poles. Weather stations are unevenly distributed. Training on historical observations can underrepresent unprecedented extremes or changes in observing systems. Fine grid spacing also does not mean the model explicitly resolves every cloud or neighbourhood-scale hazard.

A forecast integrated into a consumer product is not an official warning. Google’s own announcement directs people to national meteorological agencies and local services for severe-weather alerts. Those agencies combine forecasts with radar, emergency thresholds, communication systems, and legal responsibility.

The system is also a Google-developed model deployed through Google infrastructure. Researchers received access to forecast data and a paper, but full independent reproduction requires substantial data and compute. Evaluation should include failure cases, not only average accuracy, because rare missed extremes can dominate public impact.

## Why it matters

WeatherNext 3 moved AI forecasting closer to an end-to-end operational system that learns from recent observations, updates hourly, produces ensembles, and serves high-resolution outputs through widely used products. It showed AI contributing beyond faster emulation of a traditional forecast toward a different pipeline for observation, prediction, and post-processing.

The advance is most valuable as part of a forecasting ecosystem. Better models can give experts more timely evidence, but accountable warnings still require human institutions, multiple data sources, and clear communication of uncertainty.

## Primary sources

- [Google’s WeatherNext 3 announcement](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-weathernext-3/)
- [WeatherNext 3 research paper](https://arxiv.org/abs/2609.03582)
- [Google DeepMind’s WeatherNext 3 technical overview](https://deepmind.google/science/weathernext/)`,
  }),
];
