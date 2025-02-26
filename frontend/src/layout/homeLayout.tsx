import { Box, Grid } from "@mui/material"
import { HeaderComponent } from "../components/header"


export const HomeLayout = ({ children }) => {
    return (
        <Grid container>
            <Box 
                sx={{ 
                    display: "flex",
                    flexDirection: "column",
                    height: '100%',
                    width: '100%',
                    overflow: "hidden",
                    overflowY: "scroll",
                    flex: 1,
                    backgroundColor: "#f3f4f6"
                }}>
                <Grid container direction="row" sx={{ height: '100%' }}>
                    <Grid item xs={12}>
                        <HeaderComponent />
                            { children }
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}