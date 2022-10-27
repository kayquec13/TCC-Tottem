import api from './api';


export const getCreditCardByCustomer = customerId => {
    return api.get(`credit-card/${customerId}`);
}

export const requestCard = (planCode, customerId) => {
    return api.post(`credit-card/${planCode}/${customerId}`)
}