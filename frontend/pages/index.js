import React, { useState } from 'react';

import Webcam from "react-webcam";
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography, TextField, Button, Modal, Snackbar, Alert, CircularProgress } from '@mui/material';

import { dataURItoBlob } from '../helpers';
import { authenticate } from '../services/auth';
import { default as schema } from '../validators/auth';
import RecorderControls from '../components/RecorderControls';
import { createYupErrorsObject } from '../utils/createYupErrorsObject';

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
}));

const modalStyle = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function Auth() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [errors, setErrors] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState();

    const validateEmail = async () => {
        setErrors([]);
        try {
            await schema.validate({ email }, { abortEarly: false });
            setOpenModal(true);
        } catch (e) {
            if (e.name === "ValidationError" && e.inner) {
                setErrors(createYupErrorsObject(e));
            }
        }
    }

    const auth = async (imgBlob) => {
        setLoading(true);
        setOpenModal(false);
        try {
            const res = await authenticate(email, imgBlob);
            router.push(`home/${res.data.id}`);
        } catch (e) {
            setOpenAlert(true);
            setAlertMessage("E-mail ou autenticação facial inválida");
        }
        setLoading(false);
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
                <StyledPaper
                    sx={{
                        my: 15,
                        mx: 'auto',
                        p: 2,
                    }}
                >
                    <Typography
                        mt={4}
                        variant="h6"
                        component="h6"
                        align={"center"}
                    >
                        Bem-vindo! Entre com sua conta
                    </Typography>
                    <Grid container justifyContent="center">
                        <div>
                            <div style={{ display: "flex", marginTop: 50 }}>
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
                            <div style={{ marginTop: 10 }}>
                                {errors?.email &&
                                    <div>
                                        <span style={{ color: "#d32f2f", fontSize: 13, marginLeft: 10 }}>{errors.email}</span>
                                    </div>
                                }
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 3, mr: 1 }}
                                    onClick={() => validateEmail()}
                                    endIcon={loading ? <CircularProgress color={"inherit"} size={15} /> : ""}
                                >
                                    Entrar
                                </Button>
                            </div>
                            <div style={{ marginTop: 40, marginBottom: 30 }}>
                                <span>
                                    Não possui uma conta?{" "}
                                    <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => router.push("/register")}>
                                        Clique aqui
                                    </span>
                                    {" "}para se cadastrar
                                </span>
                            </div>
                        </div>
                    </Grid>
                </StyledPaper>
            </Box>
            <Modal
                open={openModal}
                onClose={closeModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...modalStyle, width: 500 }}>
                    <Grid container justifyContent={"center"}>
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
                                        onClick={() => auth(dataURItoBlob(getScreenshot()))}
                                    >
                                        Capturar foto
                                    </Button>
                                </Grid>
                            )}
                        </Webcam>
                    </Grid>
                </Box>
            </Modal>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
                <Alert onClose={() => setOpenAlert(false)} severity={"error"} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}