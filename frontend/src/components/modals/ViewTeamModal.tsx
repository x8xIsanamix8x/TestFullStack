import React from 'react';
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  lastEvaluationDate: string;
}

interface ViewTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  onViewEmployee: (id: number) => void;
}

const ViewTeamModal: React.FC<ViewTeamModalProps> = ({ isOpen, onClose, employees, onViewEmployee }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, maxWidth: 800, margin: 'auto', mt: 5 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Mi Equipo</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Correo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Cargo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Última Evaluación</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.lastEvaluationDate}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => onViewEmployee(employee.id)}>
                      Ver Detalles
                    </Button>
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

export default ViewTeamModal;