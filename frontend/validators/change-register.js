import * as yup from 'yup';

export default yup.object().shape({
    name: yup.string()
        .required("O nome é obrigatório"),
    document: yup.string()
        .required("O CPF é obrigatório")
        .min(11, "O CPF deve ter 11 caracteres")
        .max(11, "O CPF deve ter 11 caracteres"),
    cep: yup.string("CEP inválido")
        .required("O CEP é obrigatório")
        .min(8, "O CEP deve ter 8 caracteres")
        .max(8, "O CEP deve ter 8 caracteres"),
    street: yup.string()
        .required("A rua é obrigatória"),
    neighborhood: yup.string()
        .required("O bairro é obrigatório"),
    city: yup.string()
        .required("A cidade é obrigatória"),
    number: yup.number()
        .typeError("Número inválido")
        .required("O número é obrigatório")
});