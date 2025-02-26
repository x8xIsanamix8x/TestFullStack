import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Avatar } from '@mui/material';
import useModal from '../hooks/useModal';
import AddUserModal from '../components/modals/AddUserModal';
import ManageUsersModal from '../components/modals/ManageUsersModal';
import CreateEvaluationModal from '../components/modals/CreateEvaluationModal';
import ViewEvaluationsModal from '../components/modals/ViewEvaluationsModal';
import GenerateReportModal from '../components/modals/GenerateReportModal';
import SendReminderModal from '../components/modals/SendReminderModal';
import SummaryCard from '../components/SummaryCard';
import { useEffect } from 'react';
import { useEmployeesServices } from '../services/employeesService';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { evaluationService } from '../services/evaluationService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {

  const { user } = useSelector((state: RootState) => state.auth);

  const evaluations = [
    { id: 1, employeeName: "Juan Pérez", evaluatorName: "Ana Gómez", evaluationDate: "2024-02-20", status: "Completed", averageScore: 4.8 },
    { id: 2, employeeName: "Carlos Díaz", evaluatorName: "Juan Pérez", evaluationDate: "2024-02-18", status: "Pending", averageScore: 0 },
    { id: 3, employeeName: "Ana Gómez", evaluatorName: "Carlos Díaz", evaluationDate: "2024-02-25", status: "Completed", averageScore: 4.6 },
  ];

  const users = [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "Employee" },
    { id: 2, name: "Ana Gómez", email: "ana@example.com", role: "Manager" },
  ];

  // Preparar los datos para el gráfico
  const evaluationData = evaluations.map(evaluation => ({
    label: evaluation.employeeName,
    score: evaluation.averageScore,
  }));

  const data = {
    labels: evaluationData.map(data => data.label),
    datasets: [
      {
        label: 'Puntaje Promedio por Evaluación',
        data: evaluationData.map(data => data.score),
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Azul suave
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const { getEmployees, employees } = useEmployeesServices()
  const { getEvaluation, evaluationsList, getEvaluationEmployee, evaluationEmployee } = evaluationService()


  const getInitials = (name) => {
      if (!name) return "U";
      const parts = name.split(" ");
      return parts.length > 1 
          ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() 
          : parts[0][0].toUpperCase();
  };

  // Estados para los modales usando el hook useModal
  const modals = {
    addUser: useModal(),
    manageUsers: useModal(),
    createEvaluation: useModal(),
    viewEvaluations: useModal(),
    generateReport: useModal(),
    sendReminder: useModal(),
  };

  // Funciones CRUD para usuarios
  const deleteUser = (id: number) => {
    console.log('Usuario eliminado:', id);
  };

  // Funciones CRUD para evaluaciones
  const deleteEvaluation = (id: number) => {
    console.log('Evaluación eliminada:', id);
  };

  // Botones de acciones
  const actions = [
    { label: 'Agregar Usuario', onClick: modals.addUser.openModal },
    { label: 'Gestionar Usuarios', onClick: modals.manageUsers.openModal },
    { label: 'Crear Evaluación', onClick: modals.createEvaluation.openModal },
    { label: 'Ver Evaluaciones', onClick: modals.viewEvaluations.openModal },
    { label: 'Generar Reporte', onClick: modals.generateReport.openModal },
    { label: 'Enviar Recordatorio', onClick: modals.sendReminder.openModal },
  ];

  // Datos para las tarjetas de resumen
  const summaryCards = [
    { title: 'Total de empleados', value: employees?.length, percentage: '+5%', color: '#16a34a' },
    { title: 'Evaluaciones completadas', value: evaluationsList?.evaluations?.filter(evaluation => evaluation?.status === 'Completed').length, percentage: '+3%', color: '#4f46e5' },
    { title: 'Evaluaciones pendientes', value: evaluationsList?.evaluations?.filter(evaluation => evaluation?.status === 'pending').length, percentage: '-2%', color: '#ea580c' },
    { title: 'Promedio de calificaciones', value:( evaluationsList?.evaluations?.reduce((acumulador, evaluacion) => acumulador + evaluacion?.score, 0) / evaluationsList?.evaluations?.length).toFixed(2), percentage: '+4.5%', color: '#ca8a04' },
  ];

  useEffect(() => {
    getEmployees(user?.token)
    getEvaluation(user?.token)
    getEvaluationEmployee(user?.uid, user?.token)
  }, [ user ])

  console.log( evaluationEmployee )

  return (
    <Box sx={{ backgroundColor: '#f3f4f6', p: 4, display: 'flex', flexDirection: 'column', gap: 4, height: '100vh' }}>
      
      {/* Botones de acciones */}
      <Box sx={{ display: ( user?.role !== 'employee' ) ? 'flex' : 'none', gap: 2, flexWrap: 'wrap', textAlign: 'center', justifyContent: 'center' }}>
        {actions.map((action, index) => {
          if (user?.role !== 'admin' && index === 0 || user?.role !== 'admin' && index === 1) return null;
          return (
            <Button key={index} variant="contained" color="primary" onClick={action.onClick}>
              {action.label}
            </Button>
          );
        })}
      </Box>

      {/* Resumen General */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, display: ( user?.role !== 'employee' ) ? 'block' : 'none' }}>
        <Typography variant="h5" sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 3 }}>
          Resumen General
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
          {summaryCards.map((card, index) => (
            <SummaryCard key={index} title={card.title} value={card.value} percentage={card.percentage} color={card.color} />
          ))}
        </Box>
      </Paper>

        {/* Empleados */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, display: ( user?.role !== 'employee' ) ? 'block' : 'none' }}>
            <Typography
                variant="h5"
                sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 3 }}
            >
                Personal del Equipo
            </Typography>
            <Box
                sx={{
                display: 'flex',
                overflowX: 'auto',
                flexWrap: 'nowrap', // Evita que se envuelvan a otra fila
                gap: 3,
                pb: 2
                }}
            >
                {employees.length > 0 && employees.map((card, index) => (
                    <Paper
                        key={index}
                        elevation={2}
                        sx={{
                        minWidth: 250,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        backgroundColor: "#F8F8F8",
                        borderRadius: 2,
                        }}
                    >
                        <Avatar
                            sx={{ width: 56, height: 56, mb: 2 }}
                        >
                           {getInitials(`${card.name?.trim()} ${card.lName?.trim()}`)} 
                        </Avatar>
                        <Typography variant="h6">{card.name} {card.lName}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Cargo: {card.role}
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Paper>



      

      {/* Gráfico de Evaluaciones */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, display: ( user?.role !== 'employee' ) ? 'block' : 'none' }}>
        <Typography variant="h5" sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 3 }}>
          Gráfico de Puntajes Promedio
        </Typography>
        <Box sx={{ height: 400 }}>
          <Bar data={data} />
        </Box>
      </Paper>

      {/* Tabla de Evaluaciones */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, marginBottom: '10vh' }}>
        <Typography variant="h5" sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 3 }}>
          Evaluaciones
        </Typography>
        { user?.role != 'employee' && (
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    { user?.role != 'employee' && <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Empleado</TableCell> }
                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Evaluacion</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Puntaje</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {evaluationsList?.evaluations?.map((evaluation) => (
                    <TableRow key={evaluation._id}>
                      { user?.role != 'employee' && <TableCell>{evaluation.employeeId}</TableCell> }
                      <TableCell>{evaluation.nameEvaluation}</TableCell>
                      <TableCell>{evaluation.date}</TableCell>
                      <TableCell>{evaluation.status}</TableCell>
                      <TableCell>{evaluation.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        )}
        { user?.role === 'employee' && (
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Evaluacion</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Puntaje</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {evaluationEmployee?.evaluations?.map((evaluation) => (
                    <TableRow key={evaluation._id}>
                      <TableCell>{evaluation.nameEvaluation}</TableCell>
                      <TableCell>{evaluation.date}</TableCell>
                      <TableCell>{evaluation.status}</TableCell>
                      <TableCell>{evaluation.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        )}
      </Paper>

      {/* Modales */}
      <AddUserModal isOpen={modals.addUser.isOpen} onClose={modals.addUser.closeModal} />
      <ManageUsersModal
        isOpen={modals.manageUsers.isOpen}
        onClose={modals.manageUsers.closeModal}
        users={users}
        onDeleteUser={deleteUser}
      />
      <CreateEvaluationModal
        isOpen={modals.createEvaluation.isOpen}
        onClose={modals.createEvaluation.closeModal}
        users={users}
        employees={employees}
        owner={user}
      />
      <ViewEvaluationsModal
        isOpen={modals.viewEvaluations.isOpen}
        onClose={modals.viewEvaluations.closeModal}
        evaluations={evaluations}
        onDeleteEvaluation={deleteEvaluation}
      />
      <GenerateReportModal isOpen={modals.generateReport.isOpen} onClose={modals.generateReport.closeModal} />
      <SendReminderModal isOpen={modals.sendReminder.isOpen} onClose={modals.sendReminder.closeModal} />
    </Box>
  );
};

export default Dashboard;