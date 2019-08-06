import React from 'react';
import './weather.css';

const Weather = props => {
  return(
    <div className="weather-div">
    {props.city &&
      <div className='weather-info'>
        <p>Location: {props.city}, {props.country}</p>
        <p>Temperature: {props.temp}</p>
      </div>}
    <p className="error">{ props.error }</p>
    </div>
  )
}

export default Weather;