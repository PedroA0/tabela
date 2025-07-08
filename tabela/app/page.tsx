import Link from "next/link"
import { Calculator, Car, Zap, Palette, Settings, ArrowRight, Star, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-4">
              Bem-vindo a <span className="text-red-500">Calculadora da Redline</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Sua plataforma completa para orçamentos de tuning automotivo. Calcule o valor dos seus sonhos automotivos
              com precisão e facilidade.
            </p>
            <Link href="/preços">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
                🧮 Começar Orçamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Por que escolher a Redline?</h2>
          <p className="text-gray-400 text-lg">Excelência em cada detalhe do seu projeto automotivo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gray-900 border-gray-800 hover:border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20">
            <CardHeader className="text-center">
              <Calculator className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-white">Calculadora Inteligente</CardTitle>
              <CardDescription className="text-gray-400">
                Orçamentos precisos com nossa calculadora especializada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Produtos categorizados por especialidade</li>
                <li>• Cálculo automático de totais</li>
                <li>• Sistema de descontos progressivos</li>
                <li>• Interface intuitiva e rápida</li>
              </ul>
              <Link href="/calculator">
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Usar Calculadora</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20">
            <CardHeader className="text-center">
              <Car className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-white">Tuning Completo</CardTitle>
              <CardDescription className="text-gray-400">Serviços completos de modificação automotiva</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Performance e potência</li>
                <li>• Estética e visual</li>
                <li>• Interior personalizado</li>
                <li>• Sistemas especiais premium</li>
              </ul>
              <Link href="/calculator">
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Ver Serviços</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20">
            <CardHeader className="text-center">
              <Settings className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-white">Qualidade Premium</CardTitle>
              <CardDescription className="text-gray-400">Padrão de excelência em cada projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Peças e componentes de qualidade</li>
                <li>• Profissionais especializados</li>
                <li>• Garantia em todos os serviços</li>
                <li>• Atendimento personalizado</li>
              </ul>
              <Link href="/calculator">
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Fazer Orçamento</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Services Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Link href="/calculator">
            <Card className="bg-gray-900 border-gray-800 hover:border-red-600 transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Performance</h3>
                <p className="text-gray-400 text-sm">Motor, Turbo, Remap</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/calculator">
            <Card className="bg-gray-900 border-gray-800 hover:border-red-600 transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Palette className="h-8 w-8 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Estética</h3>
                <p className="text-gray-400 text-sm">Pintura, Aero, Visual</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/calculator">
            <Card className="bg-gray-900 border-gray-800 hover:border-red-600 transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Settings className="h-8 w-8 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Interior</h3>
                <p className="text-gray-400 text-sm">Bancos, Painel, Som</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/calculator">
            <Card className="bg-gray-900 border-gray-800 hover:border-red-600 transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Premium</h3>
                <p className="text-gray-400 text-sm">Neon, Blindagem</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Trophy className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
              <p className="text-red-100">Projetos Realizados</p>
            </div>
            <div>
              <Users className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">1000+</h3>
              <p className="text-red-100">Clientes Satisfeitos</p>
            </div>
            <div>
              <Star className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">5.0</h3>
              <p className="text-red-100">Avaliação Média</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Pronto para transformar seu carro?</h2>
          <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
            Use nossa calculadora especializada e descubra quanto custa realizar o projeto dos seus sonhos
          </p>
          <Link href="/calculator">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
              🧮 Calcular Orçamento
              <Calculator className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
