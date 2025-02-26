import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GenerateReportModal: React.FC<GenerateReportModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', width: 400, margin: 'auto', mt: 10 }}>
        <Typography variant="h6">Generar Reporte</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Exportar a PDF
        </Button>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Exportar a CSV
        </Button>
      </Box>
    </Modal>
  );
};

export default GenerateReportModal;