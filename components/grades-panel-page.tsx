"use client"

import { useState, useMemo } from "react"
import { Search, Pencil, X, ChevronDown } from "lucide-react"
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

type Course = { name: string; color: string; students: number }
type Section = { id: string; baseName: string; courses: Course[] }

const mockSections: Section[] = [
  { id: "A", baseName: "A", courses: [] },
  { id: "B", baseName: "B", courses: [] },
  { id: "C", baseName: "C", courses: [] },
  {
    id: "D",
    baseName: "D",
    courses: [
      { name: "Física", color: "#d4776a", students: 30 },
      { name: "Lenguaje", color: "#5B9B95", students: 33 },
    ],
  },
]

function GradeModal({
  grade,
  onClose,
}: {
  grade: (typeof gradesData)[0]
  onClose: () => void
}) {
  const [expandedId, setExpandedId] = useState<string | null>("D")

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#faf6df] rounded-2xl shadow-xl w-80 max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="bg-[#9E5A78] rounded-t-2xl py-4 px-6 text-center relative flex-shrink-0">
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button className="bg-[#F1D87C] text-[#9E5A78] rounded-lg p-1.5 hover:opacity-80 transition-opacity">
              <Pencil size={14} />
            </button>
            <button
              onClick={onClose}
              className="bg-white/20 text-white rounded-lg p-1.5 hover:bg-white/30 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          <h2 className="text-white font-bold text-xl">{grade.name}</h2>
          <p className="text-white/80 text-sm mt-0.5">Selecciona una sección</p>
        </div>

        {/* Sections list */}
        <div className="py-2 flex-1">
          {mockSections.map((section) => {
            const isExpanded = expandedId === section.id
            const sectionName = `${grade.name} '${section.id}'`
            return (
              <div
                key={section.id}
                className={`bg-white rounded-xl mx-4 my-2 px-4 py-3 ${
                  isExpanded ? "border-2 border-[#9E5A78]" : ""
                }`}
              >
                {/* Section header */}
                <div className="flex items-center justify-between">
                  <span className="text-[#9E5A78] font-semibold text-sm">
                    {sectionName}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="text-[#7297C9] hover:text-[#5b7daa] transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : section.id)
                      }
                      className="bg-[#d4776a] text-white rounded-full p-1 hover:bg-[#c0675c] transition-colors"
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Expanded courses */}
                {isExpanded && section.courses.length > 0 && (
                  <div className="mt-2">
                    {section.courses.map((course, idx) => (
                      <div
                        key={course.name}
                        className={`flex items-center justify-between py-1.5 ${
                          idx < section.courses.length - 1
                            ? "border-b border-[#E8E0D5]/50"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: course.color }}
                          />
                          <span className="text-[#9E5A78] text-sm font-medium">
                            {course.name}
                          </span>
                        </div>
                        <span className="bg-[#5B9B95] text-white text-xs rounded-full px-2 py-0.5">
                          {course.students} est.
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#faf6df] border-t border-[#E8E0D5] py-3 px-4 text-center rounded-b-2xl flex-shrink-0">
          <button className="text-[#9E5A78] font-semibold text-sm hover:text-[#C66B86] transition-colors">
            ⊕ Añadir nueva sección
          </button>
        </div>
      </div>
    </div>
  )
}

export function GradesPanelPage() {
  const [sortAsc, setSortAsc] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedGrade, setSelectedGrade] = useState<
    (typeof gradesData)[0] | null
  >(null)

  const filteredAndSortedGrades = useMemo(() => {
    let result = [...gradesData]

    if (search.trim()) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (grade) =>
          grade.name.toLowerCase().includes(searchLower) ||
          String(grade.courses).includes(search) ||
          String(grade.number).includes(search)
      )
    }

    result.sort((a, b) =>
      sortAsc ? a.number - b.number : b.number - a.number
    )

    return result
  }, [sortAsc, search])

  return (
    <div className="min-h-screen bg-[#faf6df] flex flex-col">
      <Navbar isLoggedIn={true} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-10">
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#9E5A78] italic">
              Grados Asignados
            </h1>
            <span className="bg-[#fdfdf1] border border-[#9BC294] text-[#5B9B95] text-sm font-semibold rounded-full px-3 py-1">
              2025-2026
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-[#9BC294] text-white font-semibold rounded-full px-4 py-1.5 text-sm hover:bg-[#7aaa73] transition-colors flex items-center gap-1">
              Nuevo Grado
              <span className="text-lg leading-none">+</span>
            </button>

            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="bg-[#5B9B95] text-white rounded-full px-4 py-1.5 text-sm font-medium hover:bg-[#4a8a84] transition-colors"
            >
              {sortAsc ? "Ascendente ▲" : "Descendente ▼"}
            </button>

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
                onClick={() => setSelectedGrade(grade)}
                className="bg-[#fdfdf1] rounded-2xl shadow-sm px-6 py-5 flex items-center gap-4 hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-left"
              >
                <div className="flex items-start">
                  <span className="text-5xl font-bold text-[#5B9B95]">
                    {grade.number}
                  </span>
                  <sup className="text-lg font-bold text-[#5B9B95] ml-0.5">
                    {grade.ordinal}
                  </sup>
                </div>

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

      {selectedGrade && (
        <GradeModal
          grade={selectedGrade}
          onClose={() => setSelectedGrade(null)}
        />
      )}
    </div>
  )
}
