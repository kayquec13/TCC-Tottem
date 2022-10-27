import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { Box } from '@mui/system';
import RecorderControls from './RecorderControls';
import Router, { useRouter } from 'next/router';

export default function CustomerWelcome({ customer }) {
    const [value, setValue] = useState();
    const router = useRouter();
    const { 'customer_id': customerId } = router.query;

    useEffect(() => {
       if (value) {
          if (value.toLowerCase().indexOf('cartão') > -1) {
            Router.push({
                pathname: `/home/${customerId}`,
                query: { screen: 'cartao' }
              }, 
              undefined, { shallow: true }
              );
          }
          if (value.toLowerCase().indexOf('novidades') > -1) {
            Router.push({
                pathname: `/home/${customerId}`,
                query: { screen: 'novidades' }
              }, 
              undefined, { shallow: true }
              );
          }
          if (value.toLowerCase().indexOf('ofertas') > -1) {
            Router.push({
                pathname: `/home/${customerId}`,
                query: { screen: 'ofertas' }
              }, 
              undefined, { shallow: true }
              );
          }
          if (value.toLowerCase().indexOf('cadastro') > -1) {
            Router.push({
                pathname: `/home/${customerId}`,
                query: { screen: 'cadastro' }
              }, 
              undefined, { shallow: true }
              );
          }
       }
    }, [value]);

    return (
        <React.Fragment>
            <Box style={{ marginLeft: 50 }}>
                {customer?.name ?
                    <>
                        <div style={{ marginTop: 20, marginBottom: 20 }}>
                            <Alert severity="info">{customer.name}, caso precise de ajuda, selecione o botão abaixo e fale uma das nossas palavras-chave! (ofertas, novidades, cartão ou cadastro)</Alert>
                        </div>
                        <RecorderControls setData={setValue} showRest={false} />
                    </>
                    : <></>
                }
            </Box>
        </React.Fragment>
    );
}