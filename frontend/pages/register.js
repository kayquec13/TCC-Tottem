import React, { useEffect, useState } from 'react';

import Webcam from "react-webcam";
import { styled } from '@mui/material/styles';
import {
    Alert,
    Paper,
    AlertTitle,
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Slide,
    Snackbar,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
    CircularProgress
} from '@mui/material';

import { dataURItoBlob } from '../helpers';
import { createCustomer } from '../services/customer';
import { default as schema } from '../validators/customer';
import RecorderControls from '../components/RecorderControls';
import { createYupErrorsObject } from '../utils/createYupErrorsObject';
import { useRouter } from 'next/router';

const STEPS = [
    "Formulário",
    "Tirar foto",
    "Finalização"
];

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    maxWidth: 800,
    color: theme.palette.text.primary,
}));

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [index, setIndex] = useState(0);
    const [imgUri, setImgUri] = useState();
    const [errors, setErrors] = useState([]);
    const [document, setDocument] = useState();
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState();


    const validateForm = async () => {
        setErrors([]);
        try {
            await schema.validate({ document, email, name }, { abortEarly: false });
            setIndex(index + 1);
        } catch (e) {
            if (e.name === "ValidationError" && e.inner) {
                setErrors(createYupErrorsObject(e));
            }
        }
    }

    const create = async () => {
        setLoading(true);
        try {
            const imgBlob = dataURItoBlob(imgUri);
            const data = {
                name, email, document
            };
            const res = await createCustomer(data, imgBlob)
            router.push(`/home/${res.data.id}`);
        } catch (e) {
            setOpenAlert(true);
            if (e.response) {
                setAlertMessage(e.response.data.message);
            } else {
                setAlertMessage("Erro ao realizar cadastro. Revise seus dados e tente novamente");
            }
        }
        setLoading(false);
    }

    const setImage = (data) => {
        setImgUri(data);
        handleNext();
    }

    const handleBack = () => {
        setIndex(index - 1);
    }

    const handleNext = () => {
        if (index == 2) {
            create();
        } else {
            if (index == 0) {
                validateForm();
            } else {
                setIndex(index + 1);
            }
        }
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
                <StyledPaper
                    sx={{
                        my: 5,
                        mx: 'auto',
                        p: 2,
                    }}
                >
                    <Container maxWidth="xl">
                        <Stack sx={{ width: '100%' }} spacing={4}>
                            <div></div>
                            <Stepper activeStep={index} alternativeLabel>
                                {STEPS.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <Slide direction={index > 0 ? "right" : "left"} in={index == 0} mountOnEnter unmountOnExit>
                                <Grid container justifyContent="center">
                                    <div>
                                        <div style={{ display: "flex", marginTop: 30 }}>
                                            <TextField
                                                label="Nome"
                                                size="small"
                                                variant="outlined"
                                                id="outlined-size-small"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                            <RecorderControls setData={setName} fieldType={"string"} />
                                        </div>
                                        {errors?.name &&
                                            <div>
                                                <span style={{ color: "#d32f2f", fontSize: 13, marginLeft: 10 }}>{errors.name}</span>
                                            </div>
                                        }
                                        <div style={{ display: "flex", marginTop: 20 }}>
                                            <TextField
                                                label="E-mail"
                                                size="small"
                                                variant="outlined"
                                                id="outlined-size-small"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                            <RecorderControls setData={setEmail} fieldType={"email"} />
                                        </div>
                                        {errors?.email &&
                                            <div>
                                                <span style={{ color: "#d32f2f", fontSize: 13, marginLeft: 10 }}>{errors.email}</span>
                                            </div>
                                        }
                                        <div style={{ display: "flex", marginTop: 20 }}>
                                            <TextField
                                                label="CPF"
                                                size="small"
                                                variant="outlined"
                                                id="outlined-size-small"
                                                value={document}
                                                onChange={(e) => setDocument(e.target.value)}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                            <RecorderControls setData={setDocument} fieldType={"integer"} />
                                        </div>
                                        {errors?.document &&
                                            <div>
                                                <span style={{ color: "#d32f2f", fontSize: 13, marginLeft: 10 }}>{errors.document}</span>
                                            </div>
                                        }
                                    </div>
                                </Grid>
                            </Slide>
                            <Grid container justifyContent="center">
                                <Slide direction={index > 1 ? "right" : "left"} in={index == 1} mountOnEnter unmountOnExit>
                                    <div style={{ marginLeft: 100 }}>
                                        <Webcam
                                            audio={false}
                                            mirrored={true}
                                            height={500}
                                            width={520}
                                            videoConstraints={{
                                                width: 520,
                                                height: 500,
                                                facingMode: "user"
                                            }}
                                            screenshotFormat="image/jpg"
                                        >
                                            {({ getScreenshot }) => (
                                                <Grid container justifyContent={"center"}>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => setImage(getScreenshot())}
                                                    >
                                                        Capturar foto
                                                    </Button>
                                                </Grid>
                                            )}
                                        </Webcam>
                                    </div>
                                </Slide>
                            </Grid>
                            <Slide direction={"right"} in={index == 2} mountOnEnter unmountOnExit>
                                <Grid justifyContent={"center"}>
                                    <Container maxWidth="md">
                                        <div>
                                            <Grid container justifyContent={"center"} style={{ marginTop: 20 }}>
                                                <Avatar sx={{ width: 156, height: 156 }} alt="Foto de perfil" src={imgUri} />
                                            </Grid>
                                            <Alert severity="success" style={{ marginTop: 10 }}>
                                                <AlertTitle>Nome</AlertTitle>
                                                {name}
                                            </Alert>
                                            <Alert severity="success" style={{ marginTop: 10 }}>
                                                <AlertTitle>E-mail</AlertTitle>
                                                {email}
                                            </Alert>
                                            <Alert severity="success" style={{ marginTop: 10 }}>
                                                <AlertTitle>CPF</AlertTitle>
                                                {document}
                                            </Alert>
                                        </div>
                                    </Container>
                                </Grid>
                            </Slide>
                            <Box sx={{ width: "100%", mb: 2 }}>
                                <Grid container justifyContent="center">
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Voltar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                        endIcon={loading ? <CircularProgress color={"inherit"} size={15} /> : ""}
                                    >
                                        {index == 2 ? "Finalizar" : "Próximo"}
                                    </Button>
                                </Grid>
                            </Box>
                            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
                                <Alert onClose={() => setOpenAlert(false)} severity={"error"} sx={{ width: '100%' }}>
                                    {alertMessage}
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </Container>
                </StyledPaper>
            </Box>
        </React.Fragment>
    )
}