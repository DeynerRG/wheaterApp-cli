import axios from "axios";
import fs from 'fs';
import { v4 as generateUUID } from 'uuid';


class Searchs{

    historial = [];
    dbPath = './db/database.json';

    constructor(){
        this.readDB();

    }


    async city( cityName = '' ){
        
        let limitCities = 5;
        let API_KEY = process.env.OPENWHEATHER_API_KEY;
        const axiosInstance = axios.create({
            baseURL: 'http://api.openweathermap.org/geo/1.0/direct?',
            params: {
                'q': cityName,
                'limit': limitCities,
                'appid': API_KEY,
            }
        });

        try {
            const { data } = await axiosInstance.get();

            return data.map((city)=> {
                return {
                    id: generateUUID(),
                    name: city.name,
                    lat: city.lat,
                    lon: city.lon,
                    country: city.country
                }
            })
        } catch (error) {
            return [];
        }   
    };


    async getClimate({lat, lon}){
        const API_KEY = process.env.OPENWHEATHER_API_KEY;
        const axiosInstance = axios.create({
            baseURL: 'https://api.openweathermap.org/data/2.5/weather',
            params: {
                "lat": lat,
                "lon": lon,
                "appid": API_KEY,
            }
        });

        try {
            const resp = await axiosInstance.get();
            const { data } = resp;
            const { main: { temp, temp_min, temp_max }  } = data;
            // conversion from kelvin to celsius
            return {
                "temp": (temp - 273.15).toFixed(2),
                "temp_min": (temp_min - 273.15).toFixed(2),
                "temp_max": (temp_max - 273.15).toFixed(2),
            }
        } catch (error) {
            console.log(error)
        };


    };


    addHistorial( city = {} ){
        this.historial.unshift( city );
        this.saveDB();
    }


    saveDB(){
        fs.writeFileSync(this.dbPath, JSON.stringify(this.historial));
    };

    readDB(){
        // si existe el archivo db y no esta vacio
        if(fs.existsSync(this.dbPath) && fs.readFileSync(this.dbPath, { encoding: 'utf-8'}) !== ''){
            this.historial = JSON.parse(fs.readFileSync(this.dbPath, { encoding: 'utf-8'}));
        }else{
            this.historial = [];
        }
    };


};

export default Searchs;