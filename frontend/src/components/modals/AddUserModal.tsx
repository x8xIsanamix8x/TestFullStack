import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Select, MenuItem, Button } from '@mui/material';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', password: '' });

  const handleSubmit = () => {
    console.log('Usuario agregado:', newUser);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', width: 400, margin: 'auto', mt: 10 }}>
        <Typography variant="h6">Agregar Usuario</Typography>
        <TextField label="Nombre" fullWidth sx={{ mt: 2 }} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <TextField label="Correo" fullWidth sx={{ mt: 2 }} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <Select label="Rol" fullWidth sx={{ mt: 2 }} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Employee">Employee</MenuItem>
        </Select>
        <TextField label="Contraseña" type="password" fullWidth sx={{ mt: 2 }} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
          Guardar Usuario
        </Button>
      </Box>
    </Modal>
  );
};

export default AddUserModal;