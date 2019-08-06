import React,{Component} from 'react';
import './App.css';

import Form from './components/form';
import Weather from './components/weather';
import Location from './components/location';
import {localCheck, localClear} from './functions';

const API_KEY_OWM = process.env.REACT_APP_API_KEY_OWM;
const API_KEY_APIXU = process.env.REACT_APP_API_KEY_APIXU;

const firstRequests = JSON.parse(localStorage.getItem('OWM') || '[]');
const secondRequests = JSON.parse(localStorage.getItem('APIXU') || '[]');

export default class App extends Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    error: undefined,
    location: undefined,
  }

  componentDidMount(){
    localClear();
  }

  setRef = (ref) => {this.refs = ref}

  //function for getting value(city) from location component
  updateData = (value) => {
    this.setState({location: value});
    console.log('value:', value);
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = this.refs.value;
    let isAny = false;
    const id = e.target.id + '';

    //check localStorage of the first source if id = OWM
    if ((id === 'OWM') && (localStorage.getItem('OWM') !== null)){
      const res = localCheck(id, city);
      isAny = res[0];
      this.setState({
        temp: res[1],
        city: res[2],
        country: res[3],
        error: res[4],
      });
    }
    
    //check localStorage of the second source if id = APIXU
    if ((id === 'APIXU') && (localStorage.getItem('APIXU') !== null)){
      const res = localCheck('APIXU', city);
      isAny = res[0];
      this.setState({
        temp: res[1],
        city: res[2],
        country: res[3],
        error: res[4],
      });
    }
    //check on the entered city
    if (city){
      let url;
      //link creation depending on the service
      id === 'OWM' ? url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_OWM}&units=metric` :
       url = `http://api.apixu.com/v1/current.json?key=${API_KEY_APIXU}&q=${city}`;

      const api_url = await fetch(url)
      const data = await api_url.json();

      //Is the city correct
      try {
        console.log(id);
        if (id === 'OWM' && !isAny) {
          this.setState({
            temp: data.main.temp,
            city: city,
            country: data.sys.country,
            error: '',
        })}
        if (id === 'APIXU' && !isAny) {
          this.setState({
            temp: data.current.temp_c,
            city: city,
            country: data.location.country,
            error: '',
          })
        }
        //add city to localStorage
        if (!isAny){
          switch (id) {
            case 'OWM':
              firstRequests.push([this.state.city,this.state.country,this.state.temp]);
              localStorage.setItem('OWM', JSON.stringify(firstRequests));
              break;
            case 'APIXU':
              secondRequests.push([this.state.city,this.state.country,this.state.temp]);
              localStorage.setItem('APIXU', JSON.stringify(secondRequests));
              break;
            default:
              console.log('Ошибка!');
          }
        }
      } catch {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          error: "City not found",
        })
      }
    }else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        error: "Enter the city",
      })
    }
  }
  
  render() {
    return(
      <div className="main">
        <div className="image-div">
          <h1>Weather forecasting 
            application</h1>
        </div>
        <div className="content">
          <Form 
          inputRef={this.setRef}
          location={this.state.location}
          weatherMethod={this.gettingWeather}
          />
          <Weather
          {...this.state}
          />
        <Location
        getData={this.updateData}
        />
        </div>
      </div>
    )
  }
}