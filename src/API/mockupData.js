import React from 'react';

import Car from '../assets/img/car.png';
import Bus from '../assets/img/bus.png';
import Motorcycle from '../assets/img/motorcycle.png';
import VehicleCard from '../components/VehicleCard';

export const MockupData = (
  <>
    <VehicleCard
      img={Car}
      name="Mój merc"
      operation="Tankowanie"
      brand="Mercedes-Benz"
      model="Klasa S (W140)"
      VIN="VF73A9HC8DJ819035"
      date="04.11.2022 10:28"
    />
    <VehicleCard
      img={Bus}
      name="Mój bus"
      operation="Tankowanie"
      brand="Mercedes-Benz"
      model="Klasa S (W140)"
      VIN="VF73A9HC8DJ819035"
      date="04.11.2022 10:28"
    />
    <VehicleCard
      img={Motorcycle}
      name="Moje moto"
      operation="Tankowanie"
      brand="Mercedes-Benz"
      model="Klasa S (W140)"
      VIN="VF73A9HC8DJ819035"
      date="04.11.2022 10:28"
    />
    <VehicleCard
      img={Car}
      name="Służbowe"
      operation="Tankowanie"
      brand="Mercedes-Benz"
      model="Klasa S (W140)"
      VIN="VF73A9HC8DJ819035"
      date="04.11.2022 10:28"
    />
  </>
);
