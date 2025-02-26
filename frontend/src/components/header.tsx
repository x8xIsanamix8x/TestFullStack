import { Avatar, Button, Divider, Grid, Typography } from "@mui/material"
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAuthStore } from "../hooks/useAuthStore";

export const HeaderComponent = () => {

    const { user } = useSelector((state: RootState) => state.auth);
    const { startLogout } = useAuthStore()

    const getInitials = (name) => {
        if (!name) return "U"; // Si no hay nombre, mostrar "U" de Usuario
        const parts = name.split(" ");
        return parts.length > 1 
            ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() 
            : parts[0][0].toUpperCase();
    };

    const formattedDate = format(new Date(), "EEEE, dd 'de' MMMM yyyy", { locale: es });

    return (
        <Grid 
            container 
            direction="row" 
            alignItems="center" 
            px="5.1vh"
            sx={{ backgroundColor: "#f3f4f6", height: '9.3vh', borderColor: "#E0E0E0" }}
            mt="4.4vh"
        >
            <Grid item xs={6}>
                <Typography fontSize={24} fontWeight={700} color="#272727" ml="5.2vh">¡Hola, { user?.name } { user?.lastName }!</Typography>
                <Typography fontSize={16} fontWeight={400} color="#272727" ml="5.2vh">{ formattedDate }</Typography>
            </Grid>
            <Grid item xs={6}>
                <Grid 
                    container 
                    direction="row" 
                    justifyContent="flex-end" 
                    alignItems="center" 
                    sx={{ gap: '1rem', paddingRight: '1rem' }} // Espaciado entre elementos
                >
                    <Grid item xs="auto">
                        <Grid 
                            container 
                            direction="row"
                            justifyContent="center" 
                            alignItems="center"
                        >
                            <Avatar
                                sx={{
                                    width: "5.3vh",
                                    height: "5.3vh",
                                    backgroundColor: "#004E9B", // Color de fondo azul
                                    color: "white", // Letras blancas
                                    fontWeight: "bold",
                                    fontSize: "1.8vh",
                                }}
                            >
                                {getInitials(`${ user?.name?.trim() } ${ user?.lastName?.trim() }`)}
                            </Avatar>
                            <Grid item ml="3.11vh">
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: "#004E9B",
                                        color: "white",
                                    }}
                                    onClick={ startLogout }
                                >
                                    <Grid container direction="row" justifyContent="center" alignItems="center">
                                        Logout
                                    </Grid>
                                </Button>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography fontSize={16} fontWeight={700} color="#272727" ml="5.2vh">{ user?.name }</Typography>
                                <Typography fontSize={16} fontWeight={400} color="#272727" ml="5.2vh">{ user?.role }</Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} mt="3.5vh">
                <Divider />
            </Grid>
        </Grid>
    )
} 