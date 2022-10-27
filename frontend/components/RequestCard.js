import React from 'react';

import { Alert, Box, Divider, Grid, Paper, Snackbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { getCreditCardByCustomer, requestCard } from '../services/credit-card';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import CreditCardShape from './CreditCardShape';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "100%"
}));

export default function RequestCard() {

    const router = useRouter();
    const [customerId, setCustomerId] = useState();
    const [creditCard, setCreditCard] = useState();
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState();

    const requestCreditCard = async (planCode, planDescription) => {
        try {
            if (confirm(`Deseja solicitar um cartão de crédito para o plano ${planDescription}?`)) {
                const response = await requestCard(planCode, customerId);
                setCreditCard(response?.data);
            }
        } catch (e) {
            setOpenAlert(true);
            setAlertMessage('Erro ao criar cartão de crédito');
        }
    }

    const getCreditCard = async () => {
        const response = await getCreditCardByCustomer(customerId);
        setCreditCard(response?.data);
    }

    useEffect(() => {
        try {
            if (customerId) {
                getCreditCard();
            }
        } catch (e) {
            setOpenAlert(true);
            setAlertMessage('Erro ao buscar cartão de crédito');
        }
    }, [customerId]);

    useEffect(() => {
        const customerId = router.query.customer_id;
        if (typeof customerId != undefined && customerId != null) {
            setCustomerId(customerId);
        }
    }, [router.query.customer_id]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} style={{ marginTop: 20 }}>
                {!creditCard ?
                    (
                        <>
                            <Grid item xs={4}>
                                <Item style={{ cursor: "pointer" }} variant={"elevation"} onClick={() => requestCreditCard(1, 'ouro')}>
                                    <Typography variant="h5" noWrap component="div">
                                        Ouro
                                    </Typography>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Garantia estendida</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Seguro Proteção de preço</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Seguro proteção de compras</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Ofertas Internacionais</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Seguro de emergências médicasem viagens</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Seguro de automóveis</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Card surpreenda</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ marginTop: 10 }}>
                                        <hr style={{ borderWidth: "0.2px" }} />
                                        <h3>R$ 20,00</h3>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item style={{ cursor: "pointer" }} onClick={() => requestCreditCard(2, 'prata')}>
                                    <Typography variant="h5" noWrap component="div">
                                        Prata
                                    </Typography>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Garantia estendida</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Seguro Proteção de preço</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Seguro proteção de compras</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Ofertas Internacionais</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Seguro de emergências médicasem viagens</Typography>
                                        <ClearIcon sx={{ fontSize: 18, color: "red" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Seguro de automóveis</Typography>
                                        <ClearIcon sx={{ fontSize: 18, color: "red" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Card surpreenda</Typography>
                                        <ClearIcon sx={{ fontSize: 18, color: "red" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ marginTop: 10 }}>
                                        <hr style={{ borderWidth: "0.2px" }} />
                                        <h3>R$ 14,00</h3>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item style={{ cursor: "pointer" }} onClick={() => requestCreditCard(3, 'bronze')}>
                                    <Typography variant="h5" noWrap component="div">
                                        Bronze
                                    </Typography>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Garantia estendida</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Seguro Proteção de preço</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Seguro proteção de compras</Typography>
                                        <CheckIcon sx={{ fontSize: 18, color: "green" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Ofertas Internacionais</Typography>
                                        <ClearIcon sx={{ fontSize: 18, color: "red" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Seguro de emergências médicasem viagens</Typography>
                                        <ClearIcon sx={{ fontSize: 18, color: "red" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Seguro de automóveis</Typography>
                                        <ClearIcon sx={{ fontSize: 18, color: "red" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10, justifyContent: 'center' }}>
                                        <Typography variant="subtitle1" noWrap component="div">Card surpreenda</Typography>
                                        <ClearIcon sx={{ fontSize: 18, color: "red" }} style={{ marginTop: 5, marginLeft: 10 }} />
                                    </div>
                                    <div style={{ marginTop: 10 }}>
                                        <hr style={{ borderWidth: "0.2px" }} />
                                        <h3>Gratuito</h3>
                                    </div>
                                </Item>
                            </Grid>
                        </>
                    )
                    : <CreditCardShape creditCardData={creditCard} />
                }
            </Grid>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
                <Alert onClose={() => setOpenAlert(false)} severity={"error"} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}