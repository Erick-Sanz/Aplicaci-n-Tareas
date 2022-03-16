const inquirer = require('inquirer');
require('colors')
const questions = [
    {
        type:'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value:'1',
                name: `${'1'.green}. Crear tarea`,
            },
            {
                value:'2',
                name: `${'2'.green}. Listar tareas`,
            },
            {
                value:'3',
                name: `${'3'.green}. Listar tareas completadas`,
            },
            {
                value:'4',
                name: `${'4'.green}. Listar tareas pendientes`,
            },
            {
                value:'5',
                name: `${'5'.green}. Completar tarea(s)`,
            },
            {
                value:'6',
                name: `${'6'.green}. Borrar tarea`,
            },
            {
                value:'0',
                name: `${'0'.green}. Salir`,
            },
        ]
    }
]
const inquirerMenu = async() =>{
    console.clear();
    console.log('============================='.green);
    console.log('    Seleccione una opción    '.rainbow);
    console.log('=============================\n'.red);
    const {opcion} = await inquirer.prompt(questions)
    return opcion
}
const question=[
    {
        type: 'input',
        name: 'enter',
        message: `Presione ${'Enter'.green} para continuar`,  
    }
]
const pausa = async () =>{
    await inquirer.prompt(question)
}
const readInput=async(message)=>{
    const question = [
        {
            type:'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length===0)
                return 'ingresa un valor'
                return true
            }
        }
    ];
    const {desc} = await inquirer.prompt(question)
    return desc
}

const listTaskDelete = async (task=[]) =>{
    console.clear()
    let choices= task.map((t,i)=>{
        const {id,desc}=t
        return {
                value: id,
                name: `${(i+1).toString().green}. ${desc}`,
        }    
    })
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar' 
    })
    const {id} = await inquirer.prompt(
        {
            type:'list',
            name: 'id',
            message: 'Marque las tareas a Borrar con Enter y despues da clic en Borrar Tareas',
            choices
        }
    )
    return id
}
const confirm = async (message)=>{
    const question =[
        {
            type:'confirm',
            name: 'ok',
            message,
        }
    ]
    const { ok } = await inquirer.prompt(question)
    return ok
}
const showListCheckList = async (task=[]) =>{
    console.clear()
    const choices= task.map((t,i)=>{
        const {id,desc,completado}=t
        return {
                value: id,
                name: `${(i+1).toString().green}. ${desc}`,
                checked: completado
        }    
    })
    
    const {ids} = await inquirer.prompt(
        {
            type:'checkbox',
            name: 'ids',
            message: 'Seleccione las tareas a completar',
            choices
        }
    )
    return ids
}

module.exports = {
    inquirerMenu,
    listTaskDelete,
    pausa,
    readInput,
    confirm,
    showListCheckList
}