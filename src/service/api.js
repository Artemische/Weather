const API_KEY = process.env.REACT_APP_API_KEY_LOCATION;
//getting your location(serv for location comp)
export default class ApiService {
  async getResourse() {
    const api_url = await 
    fetch(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=`);
    const data = await api_url.json();
    console.log('data: ', data)
    return data;
  }
}