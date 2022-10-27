import React, { useEffect, useState } from 'react';
import { Alert, Button, CircularProgress, Divider, FormControl, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

import RecorderControls from './RecorderControls';
import { findAddress } from '../services/address';
import { default as schema } from '../validators/change-register';
import { default as cepSchema } from '../validators/cep';
import { createYupErrorsObject } from '../utils/createYupErrorsObject';
import { getCustomerById, updateCustomer } from '../services/customer';

const DEFAULT_ADDRESS = {
    address_id: "",
    cep: "",
    city: "",
    street: "",
    neighborhood: "",
    number: null
};

export default function ChangeRegistration() {

    const router = useRouter();
    const [customerId, setCustomerId] = useState();
    const [name, setName] = useState();
    const [document, setDocument] = useState();
    const [address, setAddress] = useState(DEFAULT_ADDRESS);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [findCepLoading, setFindCepLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState();

    const updateCustomerData = async () => {
        setErrors([]);
        setLoading(true);
        try {
            await schema.validate({ name, document, ...address }, { abortEarly: false });
            const request = {
                customer: { name, document }, address: {
                    address_id: address?.address_id,
                    cep: address.cep,
                    street: address.street,
                    number: address.number,
                    neighborhood: address.neighborhood,
                    city: address.city
                }
            };
            await updateCustomer(request, customerId);
            setOpenAlert(true);
            setAlertMessage("Dados atualizados com sucesso");
        } catch (e) {
            if (e.name === "ValidationError" && e.inner) {
                setErrors(createYupErrorsObject(e));
            } else {
               // 
            }
        }
        setLoading(false);
    }

    const findAddressByCep = async () => {
        setErrors([]);
        setFindCepLoading(true);
        try {
            await cepSchema.validate({ cep: address.cep }, { abortEarly: false });
            const { data } = await findAddress(address.cep);
            setAddress({ ...address, ...data });
        } catch (e) {
            if (e.name === "ValidationError" && e.inner) {
                setErrors(createYupErrorsObject(e));
            } else {
                setErrors({ cep: "Erro ao consultar endereço" });
            }
        }
        setFindCepLoading(false);
    }

    const getCustomer = async (customerId) => {
        try {
            setCustomerId(customerId);
            const { data } = await getCustomerById(customerId);
            setName(data.name);
            setDocument(data.document);
            setAddress({
                address_id: data.address_id,
                street: data.street,
                city: data.city,
                number: data.number,
                neighborhood: data.neighborhood,
                city: data.city,
                cep: data.cep
            });
        } catch (e) {
            //
        }
    }

    useEffect(() => {
        const customerId = router.query.customer_id;
        if (typeof customerId != undefined && customerId != null) {
            getCustomer(customerId);
        }
    }, [router.query.customer_id]);

    return (
        <React.Fragment>
            <Box style={{ marginLeft: 50 }}>
                <FormControl sx={{ m: 1, width: '150ch' }} variant="outlined">
                    <Typography variant={"h7"}>Dados gerais</Typography>
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
                </FormControl>
                <div style={{ marginTop: 15 }}>
                    <Typography variant={"h7"}>Endereço</Typography>
                    <div style={{ display: "flex", marginTop: 30 }}>
                        <TextField
                            label="CEP"
                            size="small"
                            variant="outlined"
                            id="outlined-size-small"
                            value={address.cep}
                            onChange={(e) => setAddress({ ...address, cep: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                        />
                        {findCepLoading ? <CircularProgress color={"inherit"} size={17} style={{ marginLeft: 12, marginTop: 4 }} /> : <></>}
                        <div className="search-button-container">
                            <button className="search-button" title="Buscar endereço" onClick={() => findAddressByCep()}>
                                <SearchIcon sx={{ fontSize: 17 }} />
                            </button>
                        </div>
                        <RecorderControls setData={(cep) => setAddress({ ...address, cep: cep })} fieldType={"integer"} />
                    </div>
                    {errors?.cep &&
                        <div>
                            <span style={{ color: "#d32f2f", fontSize: 13, marginLeft: 10 }}>{errors.cep}</span>
                        </div>
                    }
                    <div style={{ display: "flex", marginTop: 30 }}>
                        <TextField
                            label="Rua"
                            size="small"
                            variant="outlined"
                            id="outlined-size-small"
                            value={address.street}
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: '40ch' }}
                        />
                        <RecorderControls setData={(street) => setAddress({ ...address, street: street })} fieldType={"integer"} />
                    </div>
                    {errors?.street &&
                        <div>
                            <span style={{ color: "#d32f2f", fontSize: 13, marginLeft: 10 }}>{errors.street}</span>
                        </div>
                    }
                    <div style={{ display: "flex", marginTop: 30 }}>
                        <TextField
                            label="Nº"
                            size="small"
                            variant="outlined"
                            id="outlined-size-small"
                            value={address.number}
                            onChange={(e) => setAddress({ ...address, number: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: '20ch' }}
                        />
                        <RecorderControls setData={(number) => setAddress({ ...address, number: number })} fieldType={"integer"} />
                    </div>
                    {errors?.number &&
                        <div>
                            <span style={{ color: "#d32f2f", fontSize: 13, marginLeft: 10 }}>{errors.number}</span>
                        </div>
                    }
                    <div style={{ display: "flex", marginTop: 30 }}>
                        <TextField
                            label="Bairro"
                            size="small"
                            variant="outlined"
                            id="outlined-size-small"
                            value={address.neighborhood}
                            onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                        />
                        <RecorderControls setData={(neighborhood) => setAddress({ ...address, neighborhood: neighborhood })} fieldType={"integer"} />
                    </div>
                    {errors?.neighborhood &&
                        <div>
                            <span style={{ color: "#d32f2f", fontSize: 13, marginLeft: 10 }}>{errors.neighborhood}</span>
                        </div>
                    }
                    <div style={{ display: "flex", marginTop: 30 }}>
                        <TextField
                            label="Cidade"
                            size="small"
                            variant="outlined"
                            id="outlined-size-small"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                        />
                        <RecorderControls setData={(city) => setAddress({ ...address, city: city })} fieldType={"integer"} />
                    </div>
                    {errors?.city &&
                        <div>
                            <span style={{ color: "#d32f2f", fontSize: 13, marginLeft: 10 }}>{errors.city}</span>
                        </div>
                    }
                    <div>
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mr: 1 }}
                            onClick={() => updateCustomerData()}
                            endIcon={loading ? <CircularProgress color={"inherit"} size={15} /> : ""}
                        >
                            Salvar
                        </Button>
                    </div>
                </div>
            </Box>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
                <Alert onClose={() => setOpenAlert(false)} severity={"success"} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}