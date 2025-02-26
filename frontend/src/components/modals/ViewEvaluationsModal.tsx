import React from 'react';
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

interface ViewEvaluationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluations: Array<{ id: number; employeeName: string; evaluatorName: string; evaluationDate: string; status: string; averageScore: number }>;
  onViewEvaluation: (id: number) => void; // Asegúrate de que se declare correctamente
  onDeleteEvaluation: (id: number) => void;
}

const ViewEvaluationsModal: React.FC<ViewEvaluationsModalProps> = ({ isOpen, onClose, evaluations, onViewEvaluation, onDeleteEvaluation }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', width: 600, margin: 'auto', mt: 10 }}>
        <Typography variant="h6">Ver Evaluaciones</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Empleado</TableCell>
                <TableCell>Evaluador</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Puntaje Promedio</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {evaluations.map((evaluation) => (
                <TableRow key={evaluation.id}>
                  <TableCell>{evaluation.employeeName}</TableCell>
                  <TableCell>{evaluation.evaluatorName}</TableCell>
                  <TableCell>{evaluation.evaluationDate}</TableCell>
                  <TableCell>{evaluation.status}</TableCell>
                  <TableCell>{evaluation.averageScore}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onViewEvaluation(evaluation.id)}><Visibility /></IconButton>
                    <IconButton><Edit /></IconButton>
                    <IconButton onClick={() => onDeleteEvaluation(evaluation.id)}><Delete /></IconButton>
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

export default ViewEvaluationsModal;