import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCustomerById } from '../../services/customer';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCardIcon from '@mui/icons-material/AddCard';
import SettingsIcon from '@mui/icons-material/Settings';
import { Alert, Avatar, Grid, Snackbar } from '@mui/material';
import CustomerWelcome from '../../components/CustomerWelcome';
import HomeIcon from '@mui/icons-material/Home';
import ChangeRegistration from '../../components/ChangeRegistration';
import RequestCard from '../../components/RequestCard';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import Offers from '../../components/Offers';
import News from '../../components/News';

const drawerWidth = 240;

const MENU_OPTIONS = [
    {
        title: "Ínicio",
        icon: <HomeIcon />,
        screen: null
    },
    {
        title: "Cartão",
        icon: <AddCardIcon />,
        screen: <RequestCard />
    },
    {
        title: "Ofertas",
        icon: <LocalOfferOutlinedIcon />,
        screen: <Offers />
    },
    {
        title: "Novidades",
        icon: <NewReleasesOutlinedIcon />,
        screen: <News />
    },
    {
        title: "Alterar Cadastro",
        icon: <SettingsIcon />,
        screen: <ChangeRegistration />
    }

];

const screenQuery = {
    'cartao': <RequestCard />,
    'novidades': <News />,
    'ofertas': <Offers />,
    'cadastro': <ChangeRegistration />
}
export default function Home() {

    const router = useRouter();
    const [screen, setScreen] = useState(null);
    const [customer, setCustomer] = useState("");
    const [customerId, setCustomerId] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState();

    const getCustomer = async (customerId) => {
        try {
            setCustomerId(customerId);
            const res = await getCustomerById(customerId);
            setCustomer(res?.data);
        } catch (e) {
            setOpenAlert(true);
            setAlertMessage("Erro ao carregar dados do cliente");
        }
    }

    useEffect(() => {
        const customerId = router.query.customer_id;
        if (typeof customerId != undefined && customerId != null) {
            getCustomer(router.query.customer_id);
        }
    }, [router.query.customer_id]);

    useEffect(() => {
        if (router.query?.screen) {
            setScreen(screenQuery[router.query?.screen]);
        } 
    }, [router.query?.screen]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {"Fashion Clothes"}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Grid container justifyContent="center">
                    {customer?.photo ?
                        <Avatar
                            sx={{ width: 100, height: 100, marginBottom: 5 }}
                            src={`http://localhost:8080/images/${customer.photo}`}
                            alt={`Foto de perfil - ${customer.name}`}
                        />
                        :
                        <Avatar
                            sx={{ width: 100, height: 100, marginBottom: 5 }}
                        />
                    }
                </Grid>
                <Divider />
                <List>
                    {MENU_OPTIONS.map((data, index) => (
                        <ListItem button key={index} onClick={() => setScreen(data.screen)}>
                            <ListItemIcon>
                                {data.icon}
                            </ListItemIcon>
                            <ListItemText primary={data.title} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Grid container style={{ marginTop: 80 }}>
                {screen ? screen : <CustomerWelcome customer={customer} />}
            </Grid>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
                <Alert onClose={() => setOpenAlert(false)} severity={"error"} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}