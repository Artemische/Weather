import React, {Component} from 'react';
import './location.css';

import Api from '../../service/api'


export default class Location extends Component {
  
  apiServise = new Api();

  state = {
    ok: true,
    location: undefined || localStorage.getItem('location'),
  }
  //getting location
  getLocation = () => {
    this.apiServise.getResourse().then(( d )=>{
        this.setState({
          ok: false,
          location: d.location.city + ', ' + d.location.country,
        })
        localStorage.setItem('isOK',this.state.ok);
        localStorage.setItem('location',d.location.city + ', ' + d.location.country);
        this.props.getData(this.state.location);
      });
  }
  //to hide location
  confirm = (e) =>{
    localStorage.setItem('visibility', 'hidden');
    e.target.previousSibling.style.visibility = 
    localStorage.getItem('visibility') +'';
    e.target.style = "visibility: hidden";
  }
  //to show location 
  show = (e) => {
    console.log(e.target.previousSibling.previousSibling);
    localStorage.setItem('visibility', 'visible');
    e.target.previousSibling.previousSibling.style.visibility = 
    localStorage.getItem('visibility');
    e.target.previousSibling.style = "visibility: visible";
  }

  render() {
    //function call on first run
    if(localStorage.getItem('location') === null) {
      this.getLocation();
    }

    return(
      <div className="location-div">
        <p id="location" style={{
          visibility: localStorage.getItem('visibility')
        }}>
          {localStorage.getItem('location')}
        </p>
        <button id="location-confirm" onClick={ this.confirm } title="click to hide"
        style={{
          visibility: localStorage.getItem('visibility')
        }}>ok</button>
        <button id="show-location" onClick={ this.show }>show my location</button>
      </div>
    )
  }

}