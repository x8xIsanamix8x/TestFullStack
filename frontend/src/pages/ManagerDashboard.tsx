import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Paper, Typography, Button, Avatar } from '@mui/material'; 
import useModal from '../hooks/useModal';
import ViewTeamModal from '../components/modals/ViewTeamModal';
import CreateEvaluationModal from '../components/modals/CreateEvaluationModal';
import ViewTeamEvaluationsModal from '../components/modals/ViewEvaluationsModal';
import GenerateTeamReportModal from '../components/modals/GenerateReportModal';
import SendReminderModal from '../components/modals/SendReminderModal';
import SummaryCard from '../components/SummaryCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ManagerDashboard: React.FC = () => {
  // Datos "quemados" para el equipo del manager
  const teamTotalEmployees = 15;
  const teamCompletedEvaluations = 10;
  const teamPendingEvaluations = 5;
  const teamAverageScore = 4.2;

  // Datos de empleados bajo su supervisión
  const teamEmployees = [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", position: "Desarrollador", lastEvaluationDate: "2024-02-20", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Ana Gómez", email: "ana@example.com", position: "Diseñadora", lastEvaluationDate: "2024-01-15", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Carlos Díaz", email: "carlos@example.com", position: "Analista", lastEvaluationDate: "2024-02-10", avatar: "https://i.pravatar.cc/150?img=3" },
  ];

  // Datos de evaluaciones del equipo
  const teamEvaluations = [
    { id: 1, employeeName: "Juan Pérez", evaluatorName: "Ana Gómez", evaluationDate: "2024-02-20", status: "Completed", averageScore: 4.8 },
    { id: 2, employeeName: "Carlos Díaz", evaluatorName: "Juan Pérez", evaluationDate: "2024-02-18", status: "Pending", averageScore: 0 },
    { id: 3, employeeName: "Ana Gómez", evaluatorName: "Carlos Díaz", evaluationDate: "2024-02-25", status: "Completed", averageScore: 4.6 },
  ];

  // Datos para el gráfico de rendimiento por empleado
  const teamPerformanceData = {
    labels: teamEmployees.map(employee => employee.name),
    datasets: [
      {
        label: 'Puntaje Promedio',
        data: teamEmployees.map(employee => (Math.random() * 5).toFixed(1)), // Datos aleatorios para el ejemplo
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Estados para los modales usando el hook useModal
  const modals = {
    viewTeam: useModal(),
    createEvaluation: useModal(),
    viewTeamEvaluations: useModal(),
    generateTeamReport: useModal(),
    sendReminder: useModal(),
  };

  // Funciones de acciones
  const viewEmployeeDetails = (id: number) => {
    console.log('Ver detalles del empleado:', id);
  };

  const viewEvaluationDetails = (id: number) => {
    console.log('Ver detalles de la evaluación:', id);
  };

  const handleDeleteEvaluation = (id: number) => {
    const updatedEvaluations = teamEvaluations.filter(evaluation => evaluation.id !== id);
    setTeamEvaluations(updatedEvaluations); // O la lógica que uses para actualizar el estado
  };

  // Botones de acciones
  const actions = [
    { label: 'Ver Mi Equipo', onClick: modals.viewTeam.openModal },
    { label: 'Crear Evaluación', onClick: modals.createEvaluation.openModal },
    { label: 'Ver Evaluaciones del Equipo', onClick: modals.viewTeamEvaluations.openModal },
    { label: 'Generar Reporte del Equipo', onClick: modals.generateTeamReport.openModal },
    { label: 'Enviar Recordatorio a Empleados', onClick: modals.sendReminder.openModal },
  ];

  // Datos para las tarjetas de resumen
  const summaryCards = [
    { title: 'Total de empleados en su equipo', value: teamTotalEmployees, percentage: '+2%', color: '#16a34a' },
    { title: 'Evaluaciones completadas', value: teamCompletedEvaluations, percentage: '+3%', color: '#4f46e5' },
    { title: 'Evaluaciones pendientes', value: teamPendingEvaluations, percentage: '-1%', color: '#ea580c' },
    { title: 'Promedio de desempeño del equipo', value: teamAverageScore, percentage: '+4.2%', color: '#ca8a04' },
  ];

  // Nuevas tarjetas con información de empleados
  const employeeCards = teamEmployees.map((employee) => ({
    title: `${employee.name} - ${employee.position}`,
    value: `Última evaluación: ${employee.lastEvaluationDate}`,
    avatar: employee.avatar,
    color: '#E5E4E2',
  }));

  return (
    <Box sx={{ backgroundColor: '#f3f4f6', p: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Botones de acciones */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', textAlign: 'center', justifyContent: 'center' }}>
        {actions.map((action, index) => (
          <Button key={index} variant="contained" color="primary" onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
      </Box>

      {/* Resumen del Equipo */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 3 }}>
          Resumen del Equipo
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
          {summaryCards.map((card, index) => (
            <SummaryCard key={index} title={card.title} value={card.value} percentage={card.percentage} color={card.color} />
          ))}
        </Box>
      </Paper>

      {/* Nuevas Tarjetas de Personal con Avatares */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 3 }}>
          Personal del Equipo
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {employeeCards.map((card, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', backgroundColor: card.color, borderRadius: 2 }}>
              <Avatar alt={card.title} src={card.avatar} sx={{ width: 56, height: 56, mb: 2 }} />
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{card.value}</Typography>
            </Paper>
          ))}
        </Box>
      </Paper>

      {/* Gráfico de rendimiento por empleado */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 3 }}>
          Rendimiento por Empleado
        </Typography>
        <Box sx={{ height: 400 }}>
          <Bar data={teamPerformanceData} />
        </Box>
      </Paper>

      {/* Modales */}
      <ViewTeamModal
        isOpen={modals.viewTeam.isOpen}
        onClose={modals.viewTeam.closeModal}
        employees={teamEmployees}
        onViewEmployee={viewEmployeeDetails}
      />
      <CreateEvaluationModal
        isOpen={modals.createEvaluation.isOpen}
        onClose={modals.createEvaluation.closeModal}
        users={teamEmployees}
      />
      <ViewTeamEvaluationsModal
        isOpen={modals.viewTeamEvaluations.isOpen}
        onClose={modals.viewTeamEvaluations.closeModal}
        evaluations={teamEvaluations}
        onViewEvaluation={viewEvaluationDetails}
        onDeleteEvaluation={handleDeleteEvaluation} // Aquí pasas la función de eliminación
      />
      <GenerateTeamReportModal
        isOpen={modals.generateTeamReport.isOpen}
        onClose={modals.generateTeamReport.closeModal}
      />
      <SendReminderModal
        isOpen={modals.sendReminder.isOpen}
        onClose={modals.sendReminder.closeModal}
      />
    </Box>
  );
};

export default ManagerDashboard;
