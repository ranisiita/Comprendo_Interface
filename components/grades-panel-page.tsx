"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const gradesData = [
  { id: 1, number: 1, ordinal: "ro", name: "Primero", courses: 4 },
  { id: 2, number: 2, ordinal: "do", name: "Segundo", courses: 5 },
  { id: 3, number: 3, ordinal: "ro", name: "Tercero", courses: 4 },
  { id: 4, number: 8, ordinal: "vo", name: "Octavo", courses: 4 },
  { id: 5, number: 9, ordinal: "no", name: "Noveno", courses: 5 },
  { id: 6, number: 10, ordinal: "mo", name: "Décimo", courses: 4 },
]

export function GradesPanelPage() {
  const router = useRouter()
  const [sortAsc, setSortAsc] = useState(true)
  const [search, setSearch] = useState("")

  const filteredAndSortedGrades = useMemo(() => {
    let result = [...gradesData]

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (grade) =>
          grade.name.toLowerCase().includes(searchLower) ||
          String(grade.courses).includes(search) ||
          String(grade.number).includes(search)
      )
    }

    // Sort by grade number
    result.sort((a, b) => {
      if (sortAsc) {
        return a.number - b.number
      }
      return b.number - a.number
    })

    return result
  }, [sortAsc, search])

  return (
    <div className="min-h-screen bg-[#faf6df] flex flex-col">
      <Navbar isLoggedIn={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-10">
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Left Side - Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#9E5A78] italic">
              Grados Asignados
            </h1>
            <span className="bg-[#fdfdf1] border border-[#9BC294] text-[#5B9B95] text-sm font-semibold rounded-full px-3 py-1">
              2025-2026
            </span>
          </div>

          {/* Right Side - Controls */}
          <div className="flex items-center gap-3">
            {/* Nuevo Grado Button */}
            <button
              className="bg-[#9BC294] text-white font-semibold rounded-full px-4 py-1.5 text-sm hover:bg-[#7aaa73] transition-colors flex items-center gap-1"
            >
              Nuevo Grado
              <span className="text-lg leading-none">+</span>
            </button>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="bg-[#5B9B95] text-white rounded-full px-4 py-1.5 text-sm font-medium hover:bg-[#4a8a84] transition-colors"
            >
              {sortAsc ? "Ascendente ▲" : "Descendente ▼"}
            </button>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar grado o curso..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#fdfdf1] border border-[#F1D87C] rounded-full px-4 py-1.5 pr-10 text-sm text-[#9E5A78] placeholder:text-[#C66B86]/50 focus:outline-none focus:border-[#5B9B95] w-48"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B9B95]" />
            </div>
          </div>
        </div>

        {/* Grade Cards Grid */}
        {filteredAndSortedGrades.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAndSortedGrades.map((grade) => (
              <button
                key={grade.id}
                onClick={() => router.push(`/curso/${grade.id}`)}
                className="bg-[#fdfdf1] rounded-2xl shadow-sm px-6 py-5 flex items-center gap-4 hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-left"
              >
                {/* Grade Number with Superscript */}
                <div className="flex items-start">
                  <span className="text-5xl font-bold text-[#5B9B95]">
                    {grade.number}
                  </span>
                  <sup className="text-lg font-bold text-[#5B9B95] ml-0.5">
                    {grade.ordinal}
                  </sup>
                </div>

                {/* Grade Info */}
                <div>
                  <div className="font-bold text-xl text-[#9E5A78]">
                    {grade.name}
                  </div>
                  <div className="text-[#C66B86] text-sm">
                    {grade.courses} cursos
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#C66B86] text-lg">No se encontraron grados</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
