import {object, string, ref} from 'yup';

export const schema = object({
  email: string().email('Wpisz poprawny email').required('Wpisz e-mail'),
  password: string()
    .min(6, 'Hasło musi posiadać min. 6 znaków')
    .required('Wpisz hasło'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Hasła nie pasują do siebie')
    .required('Wpisz ponownie hasło'),
}).required();
