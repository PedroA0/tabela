"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, FileText, User, Download, Printer, Wrench, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

interface InvoiceData {
  items: CartItem[]
  subtotal: number
  discount: number
  total: number
}

export default function InvoicePage() {
  const [clientName, setClientName] = useState("")
  const [clientPassport, setClientPassport] = useState("")
  const [mechanicName, setMechanicName] = useState("")
  const [mechanicPassport, setMechanicPassport] = useState("")
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
  const [isSendingToDiscord, setIsSendingToDiscord] = useState(false)

  // Canal específico pré-definido
  const DISCORD_CHANNEL_NAME = "📊𝗖𝗔𝗟𝗖𝗨𝗟𝗔𝗗𝗢𝗥𝗔 𝗙𝗜𝗦𝗖𝗔𝗟📝"

  useEffect(() => {
    // Recuperar dados do localStorage quando a página carregar
    try {
      const savedData = localStorage.getItem("redline-invoice-data")
      if (savedData) {
        setInvoiceData(JSON.parse(savedData))
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    }
  }, [])

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  const generateInvoiceNumber = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `RL-${year}${month}${day}-${random}`
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleGenerateInvoice = () => {
    if (!clientName || !clientPassport || !mechanicName || !mechanicPassport) {
      alert("Por favor, preencha todos os campos obrigatórios!")
      return
    }

    const invoiceText = `🏎️ REDLINE - NOTA FISCAL DE SERVIÇOS

═════��═════════════════════════════════
📋 DADOS DA NOTA FISCAL
═══════════════════════════════════════
Número: ${generateInvoiceNumber()}
Data: ${getCurrentDate()}
Hora: ${getCurrentTime()}

═══════════════════════════════════════
👤 DADOS DO CLIENTE
═══════════════════════════════════════
Nome: ${clientName}
Passaporte/CPF: ${clientPassport}

═══════════════════════════════════════
🔧 DADOS DO MECÂNICO RESPONSÁVEL
═══════════════════════════════════════
Nome: ${mechanicName}
Passaporte/CPF: ${mechanicPassport}

═══════════════════════════════════════
🔧 SERVIÇOS CONTRATADOS
═══════════════════════════════════════
${invoiceData?.items
  .map(
    (item) =>
      `${item.quantity}x ${item.name}
   Categoria: ${item.category}
   Valor Unit.: ${formatPrice(item.price)}
   Subtotal: ${formatPrice(item.price * item.quantity)}`,
  )
  .join("\n\n")}

═══════════════════════════════════════
💰 RESUMO FINANCEIRO
═══════════════════════════════════════
Subtotal: ${formatPrice(invoiceData?.subtotal || 0)}
${invoiceData?.discount ? `Desconto: -${formatPrice(invoiceData.discount)}` : ""}
VALOR TOTAL: ${formatPrice(invoiceData?.total || 0)}

═══════════════════════════════════════
📞 CONTATO PARA AGENDAMENTO
═══════════════════════════════════════
WhatsApp: 998-429
Instagram: @pp_arthuzin
Email: redline01dacity@gmail.com

═══════════════════════════════════════
⚠️ TERMOS E CONDIÇÕES
═══════════════════════════════════════
• Orçamento válido por 30 dias
• Serviços sujeitos à disponibilidade
• Pagamento: À vista ou parcelado
• Garantia conforme especificação
• Mecânico responsável: ${mechanicName}

🚗 Transforme seu carro com a Redline!
Tuning Automotivo Premium`

    // Copiar para clipboard
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(invoiceText)
        .then(() => {
          alert("Nota fiscal copiada para a área de transferência!")
        })
        .catch(() => {
          alert("Erro ao copiar. Tente novamente.")
        })
    } else {
      alert("Funcionalidade de cópia não disponível neste navegador.")
    }

    // Limpar dados do localStorage
    localStorage.removeItem("redline-invoice-data")
  }

  const handleSendToDiscord = async () => {
    if (!clientName || !clientPassport || !mechanicName || !mechanicPassport) {
      alert("Por favor, preencha todos os campos obrigatórios!")
      return
    }

    setIsSendingToDiscord(true)

    try {
      // ⚠️ IMPORTANTE: Substitua pela URL do webhook do canal "📊𝗖𝗔𝗟𝗖𝗨𝗟𝗔𝗗𝗢𝗥𝗔 𝗙𝗜𝗦𝗖𝗔𝗟📝"
      const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1391802608854896750/wowtz252MVe-jxROVCSeiZo5BI1eEg-zLZaik73txCd6QKzQoCugnItwa086lfgU_3ru"

      const invoiceNumber = generateInvoiceNumber()
      const currentDate = getCurrentDate()
      const currentTime = getCurrentTime()

      // Criar embed personalizado para o canal de calculadora fiscal
      const discordMessage = {
        username: "🏎️ Redline Calculadora",
        avatar_url: "https://cdn.discordapp.com/attachments/exemplo/logo-redline.png",
        embeds: [
          {
            title: "📊 NOVA NOTA FISCAL GERADA",
            description: `**Canal:** ${DISCORD_CHANNEL_NAME}\n**Sistema:** Calculadora Redline`,
            color: 0xdc2626, // Vermelho Redline
            timestamp: new Date().toISOString(),
            thumbnail: {
              url: "https://cdn.discordapp.com/attachments/exemplo/logo-redline.png",
            },
            fields: [
              {
                name: "📋 Dados da Nota Fiscal",
                value: `**Número:** \`${invoiceNumber}\`\n**Data:** ${currentDate}\n**Hora:** ${currentTime}`,
                inline: false,
              },
              {
                name: "👤 Informações do Cliente",
                value: `**Nome:** ${clientName}\n**Documento:** \`${clientPassport}\``,
                inline: true,
              },
              {
                name: "🔧 Mecânico Responsável",
                value: `**Nome:** ${mechanicName}\n**Documento:** \`${mechanicPassport}\``,
                inline: true,
              },
              {
                name: "🛠️ Serviços Contratados",
                value:
                  invoiceData?.items
                    .map(
                      (item) =>
                        `• **${item.quantity}x** ${item.name}\n  └ ${item.category} - ${formatPrice(item.price * item.quantity)}`,
                    )
                    .join("\n") || "Nenhum serviço encontrado",
                inline: false,
              },
              {
                name: "💰 Resumo Financeiro",
                value: `**Subtotal:** ${formatPrice(invoiceData?.subtotal || 0)}\n${invoiceData?.discount ? `**Desconto:** -${formatPrice(invoiceData.discount)}\n` : ""}**💎 VALOR TOTAL:** ${formatPrice(invoiceData?.total || 0)}`,
                inline: false,
              },
              {
                name: "📞 Contatos para Agendamento",
                value: "**WhatsApp:** `998-429`\n**Instagram:** `@pp_arthuzin`\n**Email:** `redline01dacity@gmail.com`",
                inline: false,
              },
            ],
            footer: {
              text: "Redline - Tuning Automotivo Premium | Sistema de Calculadora Fiscal",
              icon_url: "https://cdn.discordapp.com/attachments/exemplo/logo-redline-small.png",
            },
          },
        ],
      }

      // Enviar para Discord
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordMessage),
      })

      if (response.ok) {
        alert(`✅ Nota fiscal enviada com sucesso!\n\n📊 Canal: ${DISCORD_CHANNEL_NAME}\n🏎️ Número: ${invoiceNumber}`)
        // Limpar dados após envio bem-sucedido
        localStorage.removeItem("redline-invoice-data")
      } else {
        const errorData = await response.text()
        console.error("Erro na resposta:", errorData)
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error("Erro ao enviar para Discord:", error)
      alert(
        `❌ Erro ao enviar para Discord.\n\nVerifique:\n• Conexão com internet\n• Configuração do webhook\n• Permissões do canal\n\nTente novamente em alguns segundos.`,
      )
    } finally {
      setIsSendingToDiscord(false)
    }
  }

  const handlePrint = () => {
    if (!clientName || !clientPassport || !mechanicName || !mechanicPassport) {
      alert("Por favor, preencha todos os campos antes de imprimir!")
      return
    }
    window.print()
  }

  if (!invoiceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <Card className="bg-gray-900 border-gray-800 max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <FileText className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-white">Nenhum Orçamento Encontrado</CardTitle>
            <CardDescription className="text-gray-400">
              Você precisa fazer um orçamento na calculadora primeiro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/calculator">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar à Calculadora
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pt-8">
          <Link href="/calculator">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">📄 Nota Fiscal</h1>
            <p className="text-gray-400">Finalize seu orçamento e envie para o Discord</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário do Cliente e Mecânico */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Dados do Cliente */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="bg-red-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Dados do Cliente
                  </CardTitle>
                  <CardDescription className="text-red-100">Informações do proprietário do veículo</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="clientName" className="text-sm font-medium text-gray-300">
                      Nome Completo *
                    </Label>
                    <Input
                      id="clientName"
                      type="text"
                      placeholder="Digite o nome completo do cliente"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientPassport" className="text-sm font-medium text-gray-300">
                      Passaporte/CPF *
                    </Label>
                    <Input
                      id="clientPassport"
                      type="text"
                      placeholder="Digite o passaporte ou CPF do cliente"
                      value={clientPassport}
                      onChange={(e) => setClientPassport(e.target.value)}
                      className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Dados do Mecânico */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="bg-orange-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Dados do Mecânico
                  </CardTitle>
                  <CardDescription className="text-orange-100">Profissional responsável pelos serviços</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="mechanicName" className="text-sm font-medium text-gray-300">
                      Nome Completo *
                    </Label>
                    <Input
                      id="mechanicName"
                      type="text"
                      placeholder="Digite o nome completo do mecânico"
                      value={mechanicName}
                      onChange={(e) => setMechanicName(e.target.value)}
                      className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="mechanicPassport" className="text-sm font-medium text-gray-300">
                      Passaporte/CPF *
                    </Label>
                    <Input
                      id="mechanicPassport"
                      type="text"
                      placeholder="Digite o passaporte ou CPF do mecânico"
                      value={mechanicPassport}
                      onChange={(e) => setMechanicPassport(e.target.value)}
                      className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Informações do Discord */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="bg-purple-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Discord - Canal Fiscal
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    Envio automático para o canal de calculadora fiscal
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-purple-950 p-4 rounded-lg border border-purple-800">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-medium text-purple-300">Canal de Destino:</span>
                    </div>
                    <p className="text-purple-100 font-mono text-sm bg-purple-900 p-2 rounded">
                      {DISCORD_CHANNEL_NAME}
                    </p>
                    <p className="text-xs text-purple-400 mt-2">
                      A nota fiscal será enviada automaticamente para este canal específico
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Botões de Ação */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6 space-y-3">
                  <Button
                    onClick={handleGenerateInvoice}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                    disabled={!clientName || !clientPassport || !mechanicName || !mechanicPassport}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Gerar Nota Fiscal
                  </Button>

                  <Button
                    onClick={handleSendToDiscord}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                    disabled={
                      !clientName || !clientPassport || !mechanicName || !mechanicPassport || isSendingToDiscord
                    }
                  >
                    {isSendingToDiscord ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando para Discord...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />📊 Enviar para Canal Fiscal
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    disabled={!clientName || !clientPassport || !mechanicName || !mechanicPassport}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Preview da Nota Fiscal */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="bg-red-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Preview da Nota Fiscal
                </CardTitle>
                <CardDescription className="text-red-100">
                  Visualização do documento que será enviado para o Discord
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* Cabeçalho da Nota */}
                <div className="bg-white text-black p-6 rounded-lg print:shadow-none print:border print:border-gray-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Image src="/logo-redline.png" alt="Redline Logo" width={60} height={60} />
                      <div>
                        <h2 className="text-2xl font-bold text-black">Redline</h2>
                        <p className="text-gray-600">Tuning Automotivo Premium</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Nota Fiscal de Serviços</p>
                      <p className="font-mono text-lg">{generateInvoiceNumber()}</p>
                      <p className="text-sm text-gray-600">
                        {getCurrentDate()} - {getCurrentTime()}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-4 bg-gray-300" />

                  {/* Info do Discord */}
                  <div className="mb-6 p-3 bg-purple-50 rounded border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Destino Discord
                    </h4>
                    <p className="text-sm text-purple-700 font-mono bg-purple-100 p-2 rounded">
                      {DISCORD_CHANNEL_NAME}
                    </p>
                  </div>

                  <Separator className="my-4 bg-gray-300" />

                  {/* Dados do Cliente e Mecânico */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-black flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Dados do Cliente
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600">Nome:</p>
                          <p className="font-medium text-black">{clientName || "Nome não informado"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Passaporte/CPF:</p>
                          <p className="font-medium text-black">{clientPassport || "Documento não informado"}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-black flex items-center gap-2">
                        <Wrench className="h-4 w-4" />
                        Mecânico Responsável
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600">Nome:</p>
                          <p className="font-medium text-black">{mechanicName || "Nome não informado"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Passaporte/CPF:</p>
                          <p className="font-medium text-black">{mechanicPassport || "Documento não informado"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4 bg-gray-300" />

                  {/* Serviços */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-4 text-black">Serviços Contratados</h3>
                    <div className="space-y-3">
                      {invoiceData.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start p-3 bg-gray-50 rounded">
                          <div className="flex-1">
                            <p className="font-medium text-black">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.category}</p>
                            <p className="text-sm text-gray-600">
                              {item.quantity}x {formatPrice(item.price)}
                            </p>
                          </div>
                          <p className="font-semibold text-black">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-4 bg-gray-300" />

                  {/* Totais */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-black">Subtotal:</span>
                      <span className="text-black">{formatPrice(invoiceData.subtotal)}</span>
                    </div>
                    {invoiceData.discount > 0 && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-600">Desconto:</span>
                        <span className="text-green-600">-{formatPrice(invoiceData.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-xl font-bold pt-2 border-t border-gray-300">
                      <span className="text-black">TOTAL:</span>
                      <span className="text-red-600">{formatPrice(invoiceData.total)}</span>
                    </div>
                  </div>

                  <Separator className="my-4 bg-gray-300" />

                  {/* Responsabilidade Técnica */}
                  <div className="mb-4 p-3 bg-orange-50 rounded border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      Responsabilidade Técnica
                    </h4>
                    <p className="text-sm text-orange-700">
                      Mecânico responsável pelos serviços: <strong>{mechanicName || "Não informado"}</strong>
                    </p>
                    <p className="text-sm text-orange-700">
                      Documento: <strong>{mechanicPassport || "Não informado"}</strong>
                    </p>
                  </div>

                  {/* Rodapé */}
                  <div className="text-center text-sm text-gray-600">
                    <p className="mb-2">
                      <strong>Contato:</strong> WhatsApp 998-429 | Instagram @pp_arthuzin
                    </p>
                    <p className="mb-2">
                      <strong>Email:</strong> redline01dacity@gmail.com
                    </p>
                    <p className="text-xs">
                      Orçamento válido por 30 dias • Serviços sujeitos à disponibilidade • Garantia conforme
                      especificação
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
