import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from "react-router-dom";
function NoMatch(){
    const navigate = useNavigate();
    return(
       
        <Container sx={{ py: 10 }} maxWidth="md">
           
        <Typography   gutterBottom variant="h3" component="h3">
            NO Match FOUND
        </Typography> 
        <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/')}
          >
            <ArrowBackIosIcon />
            Back to Home
          </Button>
        </Container>
    )
}
export default NoMatch;