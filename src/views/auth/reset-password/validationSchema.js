import {object, string} from 'yup';

export const schema = object({
  email: string().email('Wpisz poprawny email').required('Wpisz e-mail'),
}).required();
