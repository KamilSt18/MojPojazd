import {object, string, date} from 'yup';

export const schema = object({
  registrationPlate: string().required('Wpisz numer rejestracyjny'),
  vin: string().required('Wpisz VIN'),
  // dateFirstReg: date(),
}).required();
