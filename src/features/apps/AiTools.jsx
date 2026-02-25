import { motion } from "framer-motion";
import { ArrowUpRight, AudioLines, Bot, Briefcase, Code2, Database, Image, PenLine } from "lucide-react";

const aiToolCategories = [
  {
    id: "conversational-ai-assistants",
    title: "Conversational AI & Assistants",
    icon: Bot,
    apps: [
      { id: "chatgpt", name: "ChatGPT (OpenAI)", description: "Advanced conversational AI for reasoning and context.", link: "https://chatgpt.com/" },
      { id: "claude", name: "Claude (Anthropic)", description: "Great for long-form analysis and ethical AI.", link: "https://claude.ai/" },
      { id: "gemini", name: "Gemini (Google)", description: "Strong in research and real-time web data retrieval.", link: "https://gemini.google.com/" },
      { id: "deepseek", name: "DeepSeek", description: "Known for coding and reasoning abilities.", link: "https://chat.deepseek.com/" },
      { id: "grok", name: "Grok (xAI)", description: "Focused on real-time data and trending topics.", link: "https://x.ai/grok" },
    ],
  },
  {
    id: "image-video-generation",
    title: "Image & Video Generation",
    icon: Image,
    apps: [
      { id: "midjourney", name: "MidJourney", description: "Hyper-realistic art generation.", link: "https://www.midjourney.com/" },
      { id: "dalle", name: "DALL·E (OpenAI)", description: "Creative image generation from text prompts.", link: "https://openai.com/index/dall-e-3/" },
      { id: "runway", name: "Runway", description: "AI-powered video editing and effects.", link: "https://runwayml.com/" },
      { id: "synthesia", name: "Synthesia", description: "Create AI avatars and professional videos.", link: "https://www.synthesia.io/" },
      { id: "stable-diffusion", name: "Stable Diffusion", description: "Open-source image generation.", link: "https://stability.ai/stable-image" },
    ],
  },
  {
    id: "writing-content-creation",
    title: "Writing & Content Creation",
    icon: PenLine,
    apps: [
      { id: "sudowrite", name: "Sudowrite", description: "Tailored for fiction writers and novelists.", link: "https://www.sudowrite.com/" },
      { id: "grammarly", name: "Grammarly", description: "AI-powered grammar and style checking.", link: "https://www.grammarly.com/" },
      { id: "jasper", name: "Jasper AI", description: "Marketing copy, blogs, and ad automation.", link: "https://www.jasper.ai/" },
      { id: "copy-ai", name: "Copy.ai", description: "Quick generation of social media and ad content.", link: "https://www.copy.ai/" },
      { id: "hubspot-ai", name: "HubSpot AI", description: "Email automation and lead generation.", link: "https://www.hubspot.com/products/ai" },
    ],
  },
  {
    id: "coding-development",
    title: "Coding & Development",
    icon: Code2,
    apps: [
      { id: "github-copilot", name: "GitHub Copilot", description: "Code completion and suggestions.", link: "https://github.com/features/copilot" },
      { id: "amazon-codewhisperer", name: "Amazon CodeWhisperer", description: "AI-powered coding assistant.", link: "https://aws.amazon.com/codewhisperer/" },
      { id: "tabnine", name: "Tabnine", description: "Autocomplete for multiple programming languages.", link: "https://www.tabnine.com/" },
      { id: "deepseek-coder", name: "DeepSeek Coder", description: "Strong reasoning and debugging support.", link: "https://www.deepseek.com/" },
      { id: "openai-codex", name: "OpenAI Codex", description: "General-purpose code generation.", link: "https://openai.com/index/openai-codex/" },
    ],
  },
  {
    id: "data-research",
    title: "Data & Research",
    icon: Database,
    apps: [
      { id: "perplexity", name: "Perplexity AI", description: "Research assistant with citations.", link: "https://www.perplexity.ai/" },
      { id: "elicit", name: "Elicit", description: "AI for academic research and literature review.", link: "https://elicit.com/" },
      { id: "consensus", name: "Consensus", description: "Summarizes scientific papers.", link: "https://consensus.app/" },
      { id: "datarobot", name: "DataRobot", description: "Automated machine learning for enterprises.", link: "https://www.datarobot.com/" },
      { id: "rapidminer", name: "RapidMiner", description: "AI-driven data science workflows.", link: "https://www.rapidminer.com/" },
    ],
  },
  {
    id: "business-productivity",
    title: "Business & Productivity",
    icon: Briefcase,
    apps: [
      { id: "notion-ai", name: "Notion AI", description: "Enhances productivity with smart notes and summaries.", link: "https://www.notion.com/product/ai" },
      { id: "otter-ai", name: "Otter.ai", description: "Real-time transcription and meeting notes.", link: "https://otter.ai/" },
      { id: "fireflies", name: "Fireflies.ai", description: "Meeting assistant with summaries and insights.", link: "https://fireflies.ai/" },
      { id: "zapier-ai", name: "Zapier AI", description: "Workflow automation with AI triggers.", link: "https://zapier.com/ai" },
      { id: "trello-ai", name: "Trello AI", description: "Smart task management suggestions.", link: "https://www.atlassian.com/software/trello" },
    ],
  },
  {
    id: "audio-speech",
    title: "Audio & Speech",
    icon: AudioLines,
    apps: [
      { id: "elevenlabs", name: "ElevenLabs", description: "Realistic AI voice generation.", link: "https://elevenlabs.io/" },
      { id: "descript", name: "Descript", description: "Podcast editing and transcription.", link: "https://www.descript.com/" },
      { id: "murf", name: "Murf AI", description: "Voiceovers for presentations and videos.", link: "https://murf.ai/" },
      { id: "whisper", name: "Whisper (OpenAI)", description: "Speech-to-text transcription.", link: "https://openai.com/index/whisper/" },
      { id: "speechify", name: "Speechify", description: "Text-to-speech for accessibility.", link: "https://speechify.com/" },
    ],
  },
];

export const AiTools = () => {
  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground">AI Tools</h3>
      <p className="mt-2 text-sm text-foreground/70">Explore categories below. Each app opens the official website in a new tab.</p>

      <div className="mt-5 space-y-5">
        {aiToolCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;

          return (
            <section key={category.id} className="rounded-xl border border-border/70 bg-background/30 p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex rounded-lg bg-[#FF3B30]/15 p-2 text-[#FF3B30]">
                  <CategoryIcon className="h-4 w-4" />
                </span>
                <h4 className="text-sm font-semibold text-foreground">{category.title}</h4>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {category.apps.map((app, appIndex) => (
                  <motion.a
                    key={app.id}
                    href={app.link}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.05 + appIndex * 0.04 }}
                    className="group rounded-xl border border-border/70 bg-background/35 p-4 transition hover:border-[#FF3B30]/70"
                  >
                    <h5 className="text-sm font-semibold text-foreground">{app.name}</h5>
                    <p className="mt-1 text-xs text-foreground/70">{app.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#FF3B30]">
                      Open website
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </motion.a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
};
