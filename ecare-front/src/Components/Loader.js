import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function Loader() {
    return(
       
                <Container>
                    <Box sx={{
                        marginTop:"30%",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <CircularProgress />
                    </Box>
                </Container>
    )
}