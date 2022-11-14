import {object, string, number} from 'yup';

export const schema = object({
  name: string().required('Wpisz nazwę wydatku'),
  cost: number()
    .typeError('Użyj kropki zamiast przecinka')
    .positive('Koszt musi być wartością dodatnią')
    .required('Uzupełnij koszt'),
}).required();
