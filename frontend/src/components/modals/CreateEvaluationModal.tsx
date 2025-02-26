import React, { useState } from 'react';
import { Modal, Box, Typography, Select, MenuItem, Slider, TextField, Button, SelectChangeEvent } from '@mui/material';
import { evaluationService } from '../../services/evaluationService';

interface CreateEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: Array<{ id: number; name: string }>;
}

interface Evaluation {
  employeeId: string;
  score: number;
  comments: string;
  name: string;
  status: string;
}

interface Props {
  employees: {
    _id: string;
    name: string;
    lName: string;
  }[];
}

const marks = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
];

const CreateEvaluationModal: React.FC<CreateEvaluationModalProps> = ({ isOpen, onClose, users, employees, owner }) => {

  const { createEvaluation } = evaluationService()
  
  const [newEvaluation, setNewEvaluation] = useState<Evaluation>({
    employeeId: '',
    score: 1,
    comments: '',
    name: '',
    status: '',
  });

  const handleEmployeeChange = (event: SelectChangeEvent<string>) => {
    setNewEvaluation(prev => ({ ...prev, employeeId: event.target.value }));
  };

  const handleScoreChange = (event: Event, value: number | number[]) => {
    setNewEvaluation(prev => ({ ...prev, score: value as number }));
  };

  const handleCommentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvaluation(prev => ({ ...prev, comments: event.target.value }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvaluation(prev => ({ ...prev, name: event.target.value }));
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setNewEvaluation(prev => ({ ...prev, status: event.target.value }));
  };

  const onCreate = () => {
    createEvaluation({ token: owner?.token, employeeId: newEvaluation?.employeeId, evaluatorId: owner?.uid, date: new Date(), nameEvaluation: newEvaluation?.name, score: newEvaluation?.score, commets: newEvaluation?.comments, status: newEvaluation?.status })
    onClose();
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', width: 400, margin: 'auto', mt: 10 }}>
        <Typography variant="h6">Crear Evaluación</Typography>
        <Select
        label="Empleado"
        fullWidth
        sx={{ mt: 2 }}
        value={newEvaluation.employeeId}
        onChange={handleEmployeeChange}
      >
        {employees?.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            {user.name} {user.lName}
          </MenuItem>
        ))}
      </Select>

      <Typography sx={{ mt: 2 }}>Puntuación</Typography>
      <Slider
        value={newEvaluation.score}
        min={1}
        max={10}
        step={0.5}
        marks={marks}
        onChange={handleScoreChange}
      />

      <TextField
        label="Nombre de Evaluacion"
        fullWidth
        sx={{ mt: 2 }}
        value={newEvaluation.name}
        onChange={handleNameChange}
      />

      <TextField
        label="Comentarios"
        fullWidth
        sx={{ mt: 2 }}
        value={newEvaluation.comments}
        onChange={handleCommentsChange}
      />

      <Select
        label="Estado"
        fullWidth
        sx={{ mt: 2 }}
        value={newEvaluation.status}
        onChange={handleStatusChange}
      >
        <MenuItem value="Completed">Completo</MenuItem>
        <MenuItem value="In-Progress">En progreso</MenuItem>
        <MenuItem value="Pending">Pendiente</MenuItem>
      </Select>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={onCreate}>
          Guardar Evaluación
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateEvaluationModal;