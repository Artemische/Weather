import React, {Component} from 'react';
import './form.css'

export default class Form extends Component {

  state={
    value: this.props.location || localStorage.getItem('location') ,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      this.setState({ value: nextProps.location })
    }
  }
  
  handleChange=(e)=>{
    this.setState({value:e.target.value});
  }

  render(){

    console.log('state',this.state)
    return(
      <form className = "weather-form" >
        <input 
         ref={this.props.inputRef}
         value={this.state.value || ''} onChange={this.handleChange} 
         type="text" id="sity-inp"
         name="city" placeholder="City" autoComplete="off" />
        <button onClick={ this.props.weatherMethod } id="OWM">OWM source</button>
        <button onClick={ this.props.weatherMethod } id="APIXU">Apixu source</button>
      </form>
    );
  }
}