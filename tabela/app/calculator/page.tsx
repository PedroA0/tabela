"use client"

import { useState } from "react"
import { Plus, Minus, Trash2, Calculator, Percent, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

// Produtos reais da Redline baseados nas imagens
const REDLINE_PRODUCTS = [
  {
    category: "🎨 Estética Básica",
    items: [
      { name: "Aerofólio", price: 10000 },
      { name: "Para-choque Dianteiro", price: 10000 },
      { name: "Para-choque Traseiro", price: 10000 },
      { name: "Saias", price: 10000 },
      { name: "Escapamento", price: 10000 },
      { name: "Grelha", price: 10000 },
      { name: "Capô", price: 10000 },
      { name: "Para-lama", price: 10000 },
      { name: "Teto", price: 10000 },
    ],
  },
  {
    category: "🏎️ Performance & Motor",
    items: [
      { name: "Motor 1", price: 20000 },
      { name: "Motor 2", price: 40000 },
      { name: "Motor 3", price: 60000 },
      { name: "Motor 4", price: 120000 },
      { name: "Turbo", price: 50000 },
      { name: "Transmissão (Básica)", price: 60000 },
      { name: "Transmissão (Premium)", price: 120000 },
    ],
  },
  {
    category: "🛞 Rodas & Freios",
    items: [
      { name: "Rodas", price: 10000 },
      { name: "Cor das Rodas", price: 10000 },
      { name: "Custom das Rodas", price: 10000 },
      { name: "Freios 1", price: 20000 },
      { name: "Freios 2", price: 40000 },
      { name: "Freios 3", price: 60000 },
      { name: "Suspensão (Básica)", price: 20000 },
      { name: "Suspensão (Premium)", price: 120000 },
    ],
  },
  {
    category: "🎨 Pintura & Visual",
    items: [
      { name: "Pintura Primária", price: 10000 },
      { name: "Pintura Secundária", price: 10000 },
      { name: "Cor Primária", price: 10000 },
      { name: "Cor Secundária", price: 10000 },
      { name: "Perolado", price: 10000 },
      { name: "Vidro Insulfilm", price: 10000 },
      { name: "Decal", price: 10000 },
      { name: "Placa", price: 10000 },
    ],
  },
  {
    category: "🏠 Interior",
    items: [
      { name: "Interior/Estofados", price: 10000 },
      { name: "Interior/Painel", price: 10000 },
      { name: "Interior/Portinholas", price: 10000 },
      { name: "Interior/Janela", price: 10000 },
      { name: "Interior/Bancos", price: 10000 },
      { name: "Buzina", price: 10000 },
    ],
  },
  {
    category: "⚡ Especiais & Premium",
    items: [
      { name: "Remap Completo", price: 900000 },
      { name: "Kit Neon|Xenon", price: 2000000 },
    ],
  },
  {
    category: "📦 Pacotes Completos",
    items: [
      { name: "Full Tuning", price: 350000 },
      { name: "Blindagem de Pneu e Lataria", price: 1500000 },
      { name: "Full Tuning + Blindagem", price: 1850000 },
    ],
  },
]

const DISCOUNT_LEVELS = [
  { percentage: 0, label: "Sem desconto", color: "bg-gray-500" },
  { percentage: 5, label: "5% OFF", color: "bg-blue-500" },
  { percentage: 10, label: "10% OFF", color: "bg-green-500" },
  { percentage: 15, label: "15% OFF", color: "bg-yellow-500" },
  { percentage: 20, label: "20% OFF", color: "bg-orange-500" },
  { percentage: 25, label: "25% OFF", color: "bg-red-500" },
  { percentage: 30, label: "30% OFF", color: "bg-purple-500" },
]

export default function CalculatorPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("🎨 Estética Básica")
  const [discountPercentage, setDiscountPercentage] = useState(0)

  const addProductToCart = (product: { name: string; price: number }, category: string) => {
    const existingItem = cart.find((item) => item.name === product.name)

    if (existingItem) {
      setCart(cart.map((item) => (item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        name: product.name,
        price: product.price,
        quantity: 1,
        category: category,
      }
      setCart([...cart, newItem])
    }
  }

  const updateQuantity = (id: string, change: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + change)
            return newQuantity === 0 ? null : { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter(Boolean) as CartItem[],
    )
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getDiscountAmount = () => {
    return (getSubtotal() * discountPercentage) / 100
  }

  const getTotalPrice = () => {
    return getSubtotal() - getDiscountAmount()
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  const handleFinalizeBudget = () => {
    if (cart.length === 0) {
      alert("Adicione pelo menos um serviço ao orçamento!")
      return
    }

    // Salvar dados no localStorage
    const invoiceData = {
      items: cart,
      subtotal: getSubtotal(),
      discount: getDiscountAmount(),
      total: getTotalPrice(),
    }

    localStorage.setItem("redline-invoice-data", JSON.stringify(invoiceData))

    // Redirecionar para a página de nota fiscal
    router.push("/invoice")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center mb-8 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">🧮 Bem-vindo à Calculadora Redline</h1>
          <p className="text-gray-400">Tuning Automotivo - Selecione os serviços e veja o orçamento</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Calculator Section */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="bg-red-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Serviços de Tuning
                </CardTitle>
                <CardDescription className="text-red-100">
                  Clique nos serviços para adicionar ao orçamento
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* Category Selector */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {REDLINE_PRODUCTS.map((category) => (
                    <Button
                      key={category.category}
                      variant={selectedCategory === category.category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.category)}
                      className={
                        selectedCategory === category.category
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "border-gray-600 text-gray-300 hover:bg-gray-800"
                      }
                    >
                      {category.category}
                    </Button>
                  ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {REDLINE_PRODUCTS.find((cat) => cat.category === selectedCategory)?.items.map((product, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex justify-between items-center hover:bg-gray-800 hover:border-red-600 transition-all bg-gray-900 border-gray-700 text-white"
                      onClick={() => addProductToCart(product, selectedCategory)}
                    >
                      <div className="text-left flex-1">
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-red-500 font-bold text-lg">{formatPrice(product.price)}</p>
                      </div>
                      <Plus className="h-5 w-5 text-red-500 ml-2" />
                    </Button>
                  ))}
                </div>

                {/* Calculator Display */}
                <div className="mt-6 bg-black text-white p-6 rounded-lg border border-red-600">
                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-1">Subtotal:</div>
                    <div className="text-3xl font-mono mb-2">{formatPrice(getSubtotal())}</div>
                    {discountPercentage > 0 && (
                      <>
                        <div className="text-sm text-green-400 mb-1">
                          Desconto ({discountPercentage}%): -{formatPrice(getDiscountAmount())}
                        </div>
                        <Separator className="my-3 bg-gray-700" />
                        <div className="text-4xl font-mono text-green-400">{formatPrice(getTotalPrice())}</div>
                      </>
                    )}
                  </div>
                </div>

                {/* Discount Controls */}
                <div className="mt-6">
                  <Label className="text-sm font-medium text-gray-300 mb-3 block">
                    <Percent className="h-4 w-4 inline mr-1" />
                    Aplicar Desconto Promocional:
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {DISCOUNT_LEVELS.map((discount) => (
                      <Button
                        key={discount.percentage}
                        variant={discountPercentage === discount.percentage ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDiscountPercentage(discount.percentage)}
                        className={
                          discountPercentage === discount.percentage
                            ? `${discount.color} hover:opacity-90 text-white`
                            : "border-gray-600 text-gray-300 hover:bg-gray-800"
                        }
                      >
                        {discount.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    disabled={cart.length === 0}
                  >
                    🗑️ Limpar Orçamento
                  </Button>
                  <Button
                    onClick={() => setDiscountPercentage(0)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    disabled={discountPercentage === 0}
                  >
                    Remover Desconto
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shopping Cart Section */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800 sticky top-4">
              <CardHeader className="bg-red-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Orçamento
                  {getTotalItems() > 0 && (
                    <Badge variant="secondary" className="bg-white text-red-600">
                      {getTotalItems()}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-red-100">Serviços selecionados</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                {/* Cart Summary */}
                {cart.length > 0 && (
                  <div className="mb-4 p-4 bg-red-950 rounded-lg border border-red-800">
                    <h3 className="font-semibold text-red-400 mb-3 flex items-center gap-2">📋 Resumo do Orçamento:</h3>
                    <div className="space-y-2 text-sm">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <span className="flex-1 mr-2 text-gray-300">
                            <span className="font-medium">{item.quantity}x</span> {item.name}
                            <br />
                            <span className="text-xs text-gray-500">{item.category}</span>
                          </span>
                          <span className="text-red-400 font-medium text-right">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                      <Separator className="my-3 bg-gray-700" />
                      <div className="flex justify-between font-medium text-base text-gray-300">
                        <span>Subtotal:</span>
                        <span>{formatPrice(getSubtotal())}</span>
                      </div>
                      {discountPercentage > 0 && (
                        <div className="flex justify-between text-green-400 font-medium">
                          <span>Desconto ({discountPercentage}%):</span>
                          <span>-{formatPrice(getDiscountAmount())}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-red-400 text-lg pt-2 border-t border-gray-700">
                        <span>TOTAL:</span>
                        <span>{formatPrice(getTotalPrice())}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Calculator className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Nenhum serviço selecionado</p>
                      <p className="text-xs mt-1">Clique nos serviços para adicionar</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg bg-gray-800"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-white">{item.name}</h4>
                          <p className="text-xs text-gray-400">{item.category}</p>
                          <p className="text-xs text-gray-400">{formatPrice(item.price)} cada</p>
                          <p className="text-sm font-semibold text-red-400">
                            Total: {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="h-6 w-6 p-0 border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm font-semibold text-white">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-6 w-6 p-0 border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeFromCart(item.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <>
                    <Separator className="my-4 bg-gray-700" />
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3"
                      onClick={handleFinalizeBudget}
                    >
                      📄 Gerar Nota Fiscal - {formatPrice(getTotalPrice())}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
