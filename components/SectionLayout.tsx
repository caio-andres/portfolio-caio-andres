"use client";

import { useState, type ReactNode } from "react";

type Section = "about" | "experience" | "projects" | "contact";

const tabs: { id: Section; label: string }[] = [
  { id: "about",      label: "about"      },
  { id: "experience", label: "experience" },
  { id: "projects",   label: "projects"   },
  { id: "contact",    label: "contact"    },
];

interface Props {
  about:      ReactNode;
  experience: ReactNode;
  projects:   ReactNode;
  contact:    ReactNode;
}

export default function SectionLayout({ about, experience, projects, contact }: Props) {
  const [active, setActive] = useState<Section>("about");

  const sections: Record<Section, ReactNode> = { about, experience, projects, contact };

  return (
    <div className="mt-3">
      {/* Tab navigation */}
      <div className="flex items-center gap-1 flex-wrap border-b border-primary-blue/10 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`font-mono text-xs px-4 py-2.5 transition-all relative ${
              active === tab.id
                ? "text-primary-blue"
                : "text-gray-600 hover:text-gray-300"
            }`}
          >
            [{tab.label}]
            {active === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-primary-blue" />
            )}
          </button>
        ))}
      </div>

      {/* Section content — key triggers fade-in on each change */}
      <div key={active} className="animate-fade-in">
        {sections[active]}
      </div>
    </div>
  );
}
