import React from 'react';

import Car from '../assets/img/car.png';
import Bus from '../assets/img/bus.png';
import Motorcycle from '../assets/img/motorcycle.png';
import VehicleCard from '../components/VehicleCard';

export const MockupData = (
  <>
    <VehicleCard
      img={Car}
      name="SKODA, 3U, SUPERB"
      operation="Tankowanie"
      brand="Mercedes-Benz"
      model="Klasa S (W140)"
      VIN="VF73A9HC8DJ819035"
      date="04.11.2022 10:28"
    />
    <VehicleCard
      img={Bus}
      name="SKODA, 3U, SUPERB"
      operation="Naprawa"
      brand="Mercedes-Benz"
      model="Klasa S (W140)"
      VIN="VF73A9HC8DJ819035"
      date="03.11.2022 10:28"
    />
    <VehicleCard
      img={Motorcycle}
      name="SKODA, 3U, SUPERB"
      operation="Ubezpieczenie"
      brand="Mercedes-Benz"
      model="Klasa S (W140)"
      VIN="VF73A9HC8DJ819035"
      date="02.11.2022 10:28"
    />
    <VehicleCard
      img={Car}
      name="SKODA, 3U, SUPERB"
      operation="Serwis"
      brand="Mercedes-Benz"
      model="Klasa S (W140)"
      VIN="VF73A9HC8DJ819035"
      date="01.11.2022 10:28"
    />
    <VehicleCard
      img={Motorcycle}
      name="SKODA, 3U, SUPERB"
      operation="Ubezpieczenie"
      brand="Mercedes-Benz"
      model="Klasa S (W140)"
      VIN="VF73A9HC8DJ819035"
      date="01.11.2022 10:28"
    />
    <VehicleCard
      img={Bus}
      name="SKODA, 3U, SUPERB"
      operation="Naprawa"
      brand="Mercedes-Benz"
      model="Klasa S (W140)"
      VIN="VF73A9HC8DJ819035"
      date="01.11.2022 10:28"
    />
  </>
);
