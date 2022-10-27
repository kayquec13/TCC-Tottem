import { Typography } from '@mui/material';
import React from 'react';

const plans = {
    1: 'OURO',
    2: 'PRATA',
    3: 'BRONZE'
}

export default function CreditCardShape({ creditCardData }) {
    return (
        <div class="d-block">
            <Typography variant="h5" noWrap component="div" class="active-plan">
                Plano ativo: {plans[creditCardData['plan_code']]}
            </Typography>
            <div class='card'>
                <div class='top-block'>
                    <div class='card-chip'>
                        <i class="icon-credit-card icon-3x"></i>
                    </div>
                    <span class='card-name'>
                        <Typography>Fashion Clothes</Typography>
                    </span>
                </div>
                <div class='card-number'>
                    <Typography>xxxx xxxx xxxx {creditCardData['last_digits']}</Typography>
                </div>
                <div class='bottom-block'>
                    <div class='due-date'>
                        <Typography>{creditCardData['customer_name']?.toUpperCase()}</Typography>
                        <div class='card-due-date'>
                            <Typography>{creditCardData['due_date']}</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}