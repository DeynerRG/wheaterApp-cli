import 'dotenv/config'
import { pause, readInput, showMenu, showCities } from "./helpers/inquirer.js";
import Searchs from "./models/Searchs.js";


const main = async ()=>{
    
    const searchs = new Searchs();
    
    let option;
    do {
        console.clear()
        option = await showMenu();
        switch ( option ) {
            case 1:
                // show message 
                const cityName = await readInput('Ciudad: ');
                // search  place
                const cities = await searchs.city( cityName );
                // show place
                const id  = await showCities(cities);
                if( id === "0") continue;
                // get clima data
                const citie = cities.find((city)=> city.id === id);
                const {  name, lat, lon, country } = citie;
                const {temp, temp_min, temp_max } = await searchs.getClimate({ lat, lon})
                // show results
                console.clear();
                console.log('Información de la ciudad'.green);
                console.log(`Ciudad:        ${ name } ${ country }`);
                console.log(`Latitud:       ${ lat }`);
                console.log(`Longitud:      ${ lon }`);
                console.log(`Temperatura:   ${ temp } °C`);
                console.log(`Minima:        ${ temp_min } °C`);
                console.log(`Maxima:        ${ temp_max } °C`);
                searchs.addHistorial({
                    id,
                    name, 
                    lat,
                    lon,
                    country,
                    temp,
                    temp_max,
                    temp_min
                });
                break;
            case 2:
                searchs.historial.forEach((item)=>{
                    const { id, name,  lat, lon, country, temp, temp_max, temp_min } = item;
                    console.log(`${name} ${country}`.bold.green)
                    console.log(`${'lat:'.green} ${lat}`);
                    console.log(`${'lon:'.green} ${lon}`);
                    console.log(`${'temp:'.green} ${temp}`);
                    console.log(`${'temp_maxima:'.green} ${temp_max}`);
                    console.log(`${'temp_minima:'.green} ${temp_min}`);
                    console.log('\n');
                });
                break;
        
            default:
                break;
        };
        
        if( option !== 0 ) await pause();
    } while ( option !== 0);
    

};

main();