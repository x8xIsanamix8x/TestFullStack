import React from 'react';
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

interface ManageUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: Array<{ id: number; name: string; email: string; role: string }>;
  onDeleteUser: (id: number) => void;
}

const ManageUsersModal: React.FC<ManageUsersModalProps> = ({ isOpen, onClose, users, onDeleteUser }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', width: 600, margin: 'auto', mt: 10 }}>
        <Typography variant="h6">Gestionar Usuarios</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => console.log('Editar:', user.id)}><Edit /></IconButton>
                    <IconButton onClick={() => onDeleteUser(user.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default ManageUsersModal;