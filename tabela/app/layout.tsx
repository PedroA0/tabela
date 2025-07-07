import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { Calculator, Home, Mail, FileText } from "lucide-react"
import Image from "next/image"
import PageTransition from "@/components/page-transition"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Redline - Tuning Automotivo",
  description: "Calculadora de orçamentos para tuning automotivo - Redline",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* Navigation */}
          <nav className="bg-black text-white p-4 shadow-lg border-b-2 border-red-600 relative z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Image src="/logo-redline.png" alt="Redline Logo" width={40} height={40} className="object-contain" />
                <span className="text-xl font-bold">Redline</span>
              </Link>
              <div className="flex gap-2">
                <Link href="/" className="flex items-center gap-2 hover:bg-red-600 px-3 py-2 rounded transition-colors">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Início</span>
                </Link>
                <Link
                  href="/calculator"
                  className="flex items-center gap-2 hover:bg-red-600 px-3 py-2 rounded transition-colors"
                >
                  <Calculator className="h-4 w-4" />
                  <span className="hidden sm:inline">Calculadora</span>
                </Link>
                <Link
                  href="/invoice"
                  className="flex items-center gap-2 hover:bg-red-600 px-3 py-2 rounded transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Nota Fiscal</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Page Transition Wrapper */}
          <PageTransition>{children}</PageTransition>

          {/* Footer */}
          <footer className="bg-black text-white py-8 border-t-2 border-red-600 relative z-40">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/logo-redline.png"
                      alt="Redline Logo"
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                    <div>
                      <h3 className="text-xl font-bold">Redline</h3>
                      <p className="text-gray-400">Tuning Automotivo Premium</p>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    Transforme seu veículo com os melhores serviços de tuning do mercado. Qualidade, performance e
                    estilo em cada projeto.
                  </p>
                </div>

                <div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-red-500">Contato do Criador</h4>
                    <div className="space-y-3">
                      <a
                        href="mailto:pedroa.devfrontend@gmail.com"
                        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                      >
                        <Mail className="h-5 w-5 text-blue-500" />
                        <span>Email: pedroa.devfrontend@gmail.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-8 pt-6 text-center">
                <p className="text-gray-400">
                  © 2024 Redline. Todos os direitos reservados. | Desenvolvido com ❤️ para entusiastas automotivos.
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
