import inquirer from 'inquirer';
import colors from 'colors';


const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué deseas hacer?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.magenta } Buscar ciudad`
            },
            {
                value: 2,
                name: `${ '2.'.magenta } Historial`
            },
            {
                value: 0,
                name: `${ '3.'.magenta } Salir`
            },
        ]
    }
];


const showMenu = async ()=>{

    console.clear();
    console.log('============================');
    console.log('     Selecciona una opción');
    console.log('============================');

    const { option } = await inquirer.prompt(menuOptions);
    return option;

};

const pause = async ()=>{
    const pauseOptions = [
        {
            type: 'input',
            name: 'option',
            message: `Presiona ${'ENTER'.magenta} para continuar`
        }
    ];
    
    const { option } = await inquirer.prompt(pauseOptions);
    return option;
    
};

const readInput = async ( message )=>{
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate( value ){
                if( value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { description } = await inquirer.prompt(question);
    return description
};


const showCities = async( cities = [] )=>{

    const choices = cities.map((city, index)=>{

        let num = (index + 1).toString();

        return {
            value: city.id,
            name: `${ num }. ${city.name} ${ city.country}`
        }
    })

    choices.unshift({
        value: '0',
        name: `0. Cancelar`
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            loop: false,
            message: 'Selecciona la ciudad: ',
            choices
        }
    ];

    const { id } = await inquirer.prompt(questions);
    return id;

};




const confirm = async ( message = '¿Deseas continuar?' )=>{

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            default: false,
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);

    return ok
};




export { 
    showMenu,
    pause, 
    readInput,
    showCities,
    confirm,
    
};
