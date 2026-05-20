"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", { email, password })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdf1]">
      <Navbar isLoggedIn={false} />
      
      {/* Yellow accent bar */}
      <div className="h-2 w-full bg-[#F1D87C]" />
      
      {/* Main content - two columns */}
      <main className="flex-1 flex">
        {/* Left panel - Image with blur and tint */}
        <div className="hidden lg:block w-[55%] relative overflow-hidden">
          <img
            src="/images/img-iniciarsesion1.jpg"
            alt="Estudiantes en clase"
            className="w-full h-full object-cover"
          />
          {/* Blue tint overlay */}
          <div className="absolute inset-0 bg-[#7297C9]/35" />
        </div>
        
        {/* Right panel - Login form */}
        <div className="w-full lg:w-[45%] bg-[#faf6df] flex flex-col justify-center px-8 md:px-16 py-12">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full">
            <h1 className="font-bold text-4xl text-[#9E5A78] italic mb-10">
              Iniciar Sesión
            </h1>
            
            {/* Email field */}
            <div className="mb-6">
              <label 
                htmlFor="email" 
                className="block text-[#7297C9] font-semibold text-sm mb-1"
              >
                Usuario o correo
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@gmail.com"
                className="bg-[#fdfdf1] border border-[#F1D87C] rounded-xl px-4 py-2 w-full focus:outline-none focus:border-[#7297C9] transition-colors"
              />
            </div>
            
            {/* Password field */}
            <div className="mb-6">
              <label 
                htmlFor="password" 
                className="block text-[#7297C9] font-semibold text-sm mb-1"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#fdfdf1] border border-[#F1D87C] rounded-xl px-4 py-2 w-full pr-10 focus:outline-none focus:border-[#7297C9] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C66B86] hover:text-[#9E5A78] transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            {/* Submit button */}
            <button
              type="submit"
              className="bg-[#5B9B95] text-white font-semibold rounded-full px-8 py-2 mx-auto block hover:bg-[#4a8880] transition-colors mt-6"
            >
              Iniciar Sesión
            </button>
            
            {/* Register link */}
            <p className="text-center mt-4">
              <button
                type="button"
                onClick={() => router.push("/registro")}
                className="text-[#C66B86] underline text-sm cursor-pointer hover:text-[#9E5A78] transition-colors"
              >
                Crea tu cuenta hoy
              </button>
            </p>
          </form>
        </div>
      </main>
      
      {/* Yellow accent bar */}
      <div className="h-2 w-full bg-[#F1D87C]" />
      
      <Footer />
    </div>
  )
}
