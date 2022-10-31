import {object, string} from 'yup';

export const schema = object({
  email: string().email('Wpisz poprawny email').required('Wpisz e-mail'),
  password: string()
    .min(6, 'Hasło musi posiadać min. 6 znaków')
    .required('Wpisz hasło'),
}).required();
