import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Send } from '@mui/icons-material';

interface SendReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SendReminderModal: React.FC<SendReminderModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', width: 400, margin: 'auto', mt: 10 }}>
        <Typography variant="h6">Enviar Recordatorio</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} startIcon={<Send />}>
          Enviar Notificación
        </Button>
      </Box>
    </Modal>
  );
};

export default SendReminderModal;