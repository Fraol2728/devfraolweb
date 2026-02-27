import { Github, Linkedin, Youtube } from "lucide-react";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
};

export const InstructorCard = ({ instructor }) => (
  <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
    <h2 className="text-2xl font-bold text-white">Instructor</h2>
    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
      <img src={instructor.avatar} alt={instructor.name} className="h-20 w-20 rounded-2xl object-cover" />
      <div>
        <h3 className="text-xl font-semibold text-white">{instructor.name}</h3>
        <p className="text-sm text-cyan-300">{instructor.title}</p>
        <p className="mt-2 text-gray-300 leading-relaxed">{instructor.bio}</p>
        <div className="mt-3 flex gap-2">
          {instructor.socials?.map((social) => {
            const Icon = socialIcons[social.type];
            if (!Icon) return null;
            return (
              <a key={social.type} href={social.url} className="rounded-lg border border-white/20 p-2 text-white hover:text-cyan-200">
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
