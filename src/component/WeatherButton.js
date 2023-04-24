import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity, handleCityChange, city}) => {
  // const searchByCity = async (cityName) => {
  //   setCity(cityName);
  //   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=18a659b620453d9ec4421892aece6d91`;
  //   let response = await fatch(url);
  //   let data = await response.json();
  // };
  // const [city, setCity] = useState('');
  return (
    <div>
        <Button variant={`${city == '' ? 'outline-warning' : 'warning'}`} onClick={() => handleCityChange('current')}>
          Current Loaction
        </Button>
        {cities.map((item) => {
          return(
            <Button variant={`${city == item ? 'outline-warning' : 'warning'}`} onClick={() => setCity(item)}>
              {item}
            </Button>
          );
        })}
    </div>
  );
};

export default WeatherButton