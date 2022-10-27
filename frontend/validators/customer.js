import * as yup from 'yup';

export default yup.object().shape({
    email: yup.string().required("O e-mail é obrigatório").email("E-mail inválido"),
    name: yup.string().required("O nome é obrigatório"),
    document: yup.number("CPF inválido")
        .min(11, "O CPF deve ter no mínimo 11 caracteres")
        .required("O CPF é obrigatório")
})