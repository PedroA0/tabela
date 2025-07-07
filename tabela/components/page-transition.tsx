"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => {
    if (pathname !== prevPathname) {
      setIsTransitioning(true)

      const timer = setTimeout(() => {
        setDisplayChildren(children)
        setIsTransitioning(false)
        setPrevPathname(pathname)
      }, 1000) // Reduzido para 1 segundo

      return () => clearTimeout(timer)
    } else {
      setDisplayChildren(children)
    }
  }, [pathname, prevPathname, children])

  return (
    <>
      {/* Overlay de transição */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse">
              <Image
                src="/logo-redline.png"
                alt="Redline Logo"
                width={150}
                height={150}
                className="object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da página */}
      <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {displayChildren}
      </div>
    </>
  )
}
