
import { useEffect, useState, CSSProperties } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const cities  = ['busan', 'seoul', 'pohang', 'daegu'];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat =  position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=18a659b620453d9ec4421892aece6d91&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=18a659b620453d9ec4421892aece6d91&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };
  const handleCityChange = (city) => {
    if(city === "current"){
      setCity('');
    }else{
      setCity(city);
    }
  };

  useEffect(() => {
    if(city == ''){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  }, [city]);
  return (
    <div>
      {
        loading ? (
          <div className="container">
            <ClipLoader color='#f88c66' loading={loading} size={150} />
          </div>
        ) : (
          <div className="container">
            <WeatherBox weather={weather}/>
            <WeatherButton cities={cities} handleCityChange={handleCityChange} setCity={setCity} city={city} />
          </div>
        )
      }
      
    </div>
  );
}

export default App;
// 1. 유저는 현재 위치의 날씨를 볼 수 있다.(지역, 온도, 날씨 상태)
// 2. 하단에 버튼들이 5개 있다. 하나는 현재 위치, 나머지는 다른 도시. 이 버튼 누르면 해당 도시의 날씨를 볼 수 있다.
// 3. 로딩이 되어지는 중에 빨간 동그라마 빙글빙글 로딩스피너
