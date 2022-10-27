import React, { useEffect, useState } from 'react';

import Webcam from 'react-webcam';
import { useRouter } from 'next/router';
import { Alert, Button, CircularProgress, Container, Grid, Snackbar } from '@mui/material';

import { detect } from '../../services/detect-face';
import { dataURItoBlob } from '../../helpers';

export default function SaldoDevedor() {
    const router = useRouter();
    const [customerId, setCustomerId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [approved, setApproved] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState();

    const detectFace = async (imgBlob) => {
        setLoading(true);
        try {
            const res = await detect(customerId, dataURItoBlob(imgBlob));
            setApproved(true);
        } catch (e) {
            setOpenAlert(true);
            setAlertMessage("Erro ao reconhecer a face");
        }
        setLoading(false);
    }

    useEffect(() => {
        const customerId = router.query.customer_id;
        if (customerId != undefined && customerId != null) {
            setCustomerId(router.query.customer_id);
        }
    }, [router.query.customer_id]);

    return (
        <React.Fragment>
            <Grid justifyContent={"center"}>
                <Container maxWidth="md">
                    {!approved ?
                        (!loading ?
                            <>
                                <Alert style={{ marginTop: 100 }} severity="info">
                                    Realize o reconhecimento facial para acessar seu saldo devedor
                                </Alert>
                                <div style={{ marginLeft: 130 }}>
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
                                                    style={{ marginRight: 200 }}
                                                    variant="outlined"
                                                    onClick={() => detectFace(getScreenshot())}
                                                >
                                                    Capturar foto
                                                </Button>
                                            </Grid>
                                        )}
                                    </Webcam>
                                </div>
                            </>
                            :
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                style={{ minHeight: '100vh' }}
                            >
                                <Grid item xs={3}>
                                    <CircularProgress color={"inherit"} size={50} style={{ marginLeft: 12, marginTop: 4 }} />
                                </Grid>
                            </Grid>
                        ) : 
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{ minHeight: '100vh' }}
                        >
                            <Grid item xs={3}>
                            <Alert severity="error">
                                    O seu saldo devedor é de R$ 123,58.
                                </Alert>
                            </Grid>
                        </Grid>
                    }
                </Container>
            </Grid>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
                <Alert onClose={() => setOpenAlert(false)} severity={"error"} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}