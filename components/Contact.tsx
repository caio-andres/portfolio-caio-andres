import { GraduationCap, Mail, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          Educação <span className="text-primary-blue">&</span> Contato
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-primary-dark/50 border border-gray-800 rounded-lg p-8 hover:border-primary-blue/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="text-primary-blue" size={32} />
              <h3 className="text-2xl font-semibold">Formação</h3>
            </div>

            <div className="space-y-2">
              <p className="text-xl text-primary-blue font-medium">
                Bacharelado em Ciência da Computação
              </p>
              <p className="text-gray-300">Universidade São Judas Tadeu</p>
              <p className="text-gray-400 text-sm">
                Janeiro de 2022 – Junho de 2026
              </p>
              <p className="text-gray-400 text-sm">9º/9º semestre</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-blue/10 to-primary-blueAlt/10 border border-primary-blue/30 rounded-lg p-8">
          <h3 className="text-3xl font-bold mb-6 text-center">
            Vamos conversar?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="mailto:caioandres2112@gmail.com"
              className="flex items-center gap-4 bg-primary-dark/50 border border-gray-700 rounded-lg p-6 hover:border-primary-blue hover:bg-primary-dark/80 transition-all group"
            >
              <Mail
                className="text-primary-blue group-hover:scale-110 transition-transform"
                size={32}
              />
              <div>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="text-white font-medium">
                  caioandres2112@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://discord.com/users/caio_andres"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-primary-dark/50 border border-gray-700 rounded-lg p-6 hover:border-primary-blue hover:bg-primary-dark/80 transition-all group"
            >
              <MessageCircle
                className="text-primary-blue group-hover:scale-110 transition-transform"
                size={32}
              />
              <div>
                <p className="text-sm text-gray-400 mb-1">Discord</p>
                <p className="text-white font-medium">caio_andres</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-20 text-center text-gray-500 text-sm">
        <p>© 2026 [Caio André Porto de Oliveira]</p>
      </footer>
    </section>
  );
}
