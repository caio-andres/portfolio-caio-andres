"use client";

import { ChevronDown, Code2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Caio André";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const skills = ["Python", "AWS", "Terraform", "GenAI", "Automação"];

  const positions = [
    {
      title: "Engenheiro de Software Júnior @ Itaú Unibanco",
      description: "Desenvolvendo soluções inovadoras no banco",
      link: "https://www.itau.com.br",
    },
    {
      title: "Embaixador @ Alura",
      description: "Promovendo educação e comunidade",
      link: "https://www.alura.com.br",
    },
    {
      title: "Fundador @ Servidor dos Programadores",
      description: "Construindo comunidade de desenvolvedores",
      link: "https://discord.gg/programador",
    },
    {
      title: "Criador de Conteúdo na Área de Tecnologia",
      description: "Criando conteúdo de qualidade para a comunidade tech",
      link: "https://linktr.ee/caio_andres",
    },
  ];

  return (
    <main>
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-6 pt-20 pb-20"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column - Main Info */}
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <Code2
                  className="text-primary-blue w-6 h-6"
                  strokeWidth={1.5}
                />
                <span className="font-mono text-xs text-gray-600 tracking-widest">
                  SOFTWARE_ENGINEER
                </span>
              </div>

              <div>
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                  <span className="text-gray-600">&lt;</span>
                  <span className="text-glow">{displayText}</span>
                  <span className="text-gray-600">/&gt;</span>
                </h1>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div
                      key={skill}
                      className="group relative"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="font-mono text-xs px-4 py-2 bg-primary-dark border border-primary-blue/30 text-gray-400 hover:text-primary-blue hover:border-primary-blue transition-all cursor-default">
                        [{skill}]
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-4 font-mono tracking-widest">
                  CERTIFICAÇÃO
                </p>
                <a
                  href="https://www.credly.com/badges/91cc8685-4c19-4f44-a61d-2f0b66158540"
                  target="__blank"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://images.credly.com/size/110x110/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
                    alt="AWS Badge"
                  />
                </a>
              </div>
            </div>

            {/* Right Column - Positions */}
            <div
              className="space-y-6 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <div>
                <p className="text-xs text-gray-600 mb-6 font-mono tracking-widest">
                  POSIÇÕES
                </p>
                <div className="space-y-4">
                  {positions.map((position, index) => (
                    <a
                      key={position.title}
                      href={position.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                      style={{ animationDelay: `${300 + index * 100}ms` }}
                    >
                      <div className="p-4 border border-primary-blue/20 bg-gradient-to-r from-primary-dark/50 to-transparent hover:border-primary-blue/50 transition-all duration-300 rounded cursor-pointer hover:bg-primary-dark/30">
                        <div className="flex items-start gap-3">
                          <div>
                            <p className="text-gray-200 font-light text-sm md:text-base group-hover:text-primary-blue transition-colors">
                              {position.title}
                            </p>
                            <p className="text-gray-500 text-xs mt-1 font-light">
                              {position.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-20 animate-bounce opacity-50">
            <ChevronDown
              className="text-primary-blue"
              size={24}
              strokeWidth={1}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
