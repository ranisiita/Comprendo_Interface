"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ChevronDown } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const unidadesFeyAlegria = [
  "José María Vélaz, S.J.",
  "Tobar Donoso",
  "Hermano Miguel",
  "Carolina de Febres Cordero",
]

export function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [unidad, setUnidad] = useState<"fe" | "otro">("fe")
  const [selectedUnidad, setSelectedUnidad] = useState("")
  const [otroUnidad, setOtroUnidad] = useState("")
  
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic
    console.log("Register:", { ...formData, unidad: unidad === "fe" ? selectedUnidad : otroUnidad })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdf1]">
      <Navbar isLoggedIn={false} />
      
      {/* Yellow accent bar */}
      <div className="h-2 w-full bg-[#F1D87C]" />
      
      {/* Main content */}
      <div className="flex flex-1 items-center justify-center gap-0">
        {/* Left panel - Image (square) */}
        <div className="hidden lg:flex items-center justify-end flex-shrink-0 pl-8">
          <div className="relative w-[400px] h-[500px] rounded-l-2xl overflow-hidden">
            <img
              src="/images/img-registrarse1.jpg"
              alt="Maestra leyendo con estudiantes"
              className="w-full h-full object-cover object-left"
            />
            {/* Teal tint overlay */}
            <div className="absolute inset-0 bg-[#5B9B95]/35" />
          </div>
        </div>
        
        {/* Right panel - Form */}
        <div className="w-full lg:w-auto bg-[#faf6df] flex flex-col justify-center px-8 lg:px-16 py-10 lg:rounded-r-2xl">
          <h1 className="text-4xl font-bold text-[#9E5A78] italic mb-8">
            Registrarse
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name row - two columns */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[#7297C9] font-semibold text-sm mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Ignacio"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-[#fdfdf1] border border-[#F1D87C] rounded-xl px-4 py-2 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#7297C9] transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[#7297C9] font-semibold text-sm mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  placeholder="Libre"
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  className="w-full bg-[#fdfdf1] border border-[#F1D87C] rounded-xl px-4 py-2 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#7297C9] transition-colors"
                />
              </div>
            </div>
            
            {/* Email field */}
            <div>
              <label className="block text-[#7297C9] font-semibold text-sm mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="ejemplo@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#fdfdf1] border border-[#F1D87C] rounded-xl px-4 py-2 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#7297C9] transition-colors"
              />
            </div>
            
            {/* Password field */}
            <div>
              <label className="block text-[#7297C9] font-semibold text-sm mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#fdfdf1] border border-[#F1D87C] rounded-xl px-4 py-2 pr-10 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#7297C9] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C66B86] hover:text-[#9E5A78] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            {/* Unidad Educativa */}
            <div>
              <label className="block text-[#7297C9] font-semibold text-sm mb-2">
                Unidad Educativa
              </label>
              
              {/* Toggle buttons */}
              <div className="flex gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => setUnidad("fe")}
                  className={`rounded-full px-6 py-2 font-semibold transition-colors ${
                    unidad === "fe"
                      ? "bg-[#C66B86] text-white"
                      : "bg-[#fdfdf1] text-[#C66B86] border border-[#C66B86]"
                  }`}
                >
                  Fe y Alegría
                </button>
                <button
                  type="button"
                  onClick={() => setUnidad("otro")}
                  className={`rounded-full px-6 py-2 font-semibold transition-colors ${
                    unidad === "otro"
                      ? "bg-[#7297C9] text-white"
                      : "bg-[#fdfdf1] text-[#7297C9] border border-[#7297C9]"
                  }`}
                >
                  Otro
                </button>
              </div>
              
              {/* Conditional field */}
              {unidad === "fe" ? (
                <div className="relative">
                  <select
                    value={selectedUnidad}
                    onChange={(e) => setSelectedUnidad(e.target.value)}
                    className="w-full bg-[#fdfdf1] border border-[#F1D87C] rounded-xl px-4 py-2 pr-10 text-gray-700 appearance-none focus:outline-none focus:border-[#7297C9] transition-colors"
                  >
                    <option value="" disabled>Seleccione una Unidad</option>
                    {unidadesFeyAlegria.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                  <ChevronDown 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d4776a] pointer-events-none" 
                    size={20} 
                  />
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Ingresa tu unidad educativa"
                  value={otroUnidad}
                  onChange={(e) => setOtroUnidad(e.target.value)}
                  className="w-full bg-[#fdfdf1] border border-[#F1D87C] rounded-xl px-4 py-2 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#7297C9] transition-colors"
                />
              )}
            </div>
            
            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="block mx-auto bg-[#5B9B95] text-white font-semibold rounded-full px-10 py-2 hover:bg-[#4a8880] transition-colors"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Yellow accent bar */}
      <div className="h-2 w-full bg-[#F1D87C]" />
      
      <Footer />
    </div>
  )
}
