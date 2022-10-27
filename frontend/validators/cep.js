import * as yup from 'yup';

export default yup.object().shape({
    cep: yup.string("CEP inválido")
        .required("O CEP é obrigatório")
        .min(8, "O CEP deve ter 8 caracteres")
        .max(8, "O CEP deve ter 8 caracteres")
});