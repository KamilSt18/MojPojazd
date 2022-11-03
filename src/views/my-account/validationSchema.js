import {object, string} from 'yup';

export const schema = object({
  displayName: string().required('Wpisz nazwę użytkownika'),
}).required();
