'use client';

import { useEffect, useState } from 'react';
import { Open_Sans } from 'next/font/google';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const openSans = Open_Sans({ subsets: ['latin'] });

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const url = 'https://backendproyecto-btur.onrender.com';

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${url}/api/lista`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-white ${openSans.className}`}>
      <header className="bg-background p-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-lg font-semibold text-black">Usuarios y Contraseñas</h1>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-4xl w-full space-y-8">
          <Card>
            <CardHeader className="bg-black text-white py-[0.85em]">
              <CardTitle className="text-[1.03em]">Usuarios</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {error ? (
                <p className="text-red-500 text-sm">{error}</p>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-semibold">Usuario</TableCell>
                      <TableCell className="font-semibold">Contraseña</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.usuario}</TableCell>
                        <TableCell>{user.clave}</TableCell> {/* Asegúrate de no mostrar contraseñas en texto claro en producción */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-background p-4 text-center text-xs text-muted-foreground border-t border-border" role="contentinfo">
        <p>Footer content goes here...</p>
      </footer>
    </div>
  );
}
