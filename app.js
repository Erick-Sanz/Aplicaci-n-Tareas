require('colors')

const { inquirerMenu,pausa, readInput,listTaskDelete,confirm,showListCheckList } = require('./helpers/inquirer');
const { saveDb,readDb } = require('./helpers/saveFile');
const { Tasks } = require('./models/tasks');


const main = async() =>{
    let res='';
    const tasks = new Tasks(); 
    const taskDb = readDb();
    if(taskDb) {
       tasks.loadTaskFromArrary(taskDb)
    }    
    do {
        res = await inquirerMenu()   
        switch(res) {
            case '1':
                const desc = await readInput('Descripcion:');
                tasks.createtask(desc)
            break;
            case '2':
                tasks.fullListTask();
            break;
            case '3':
                tasks.listCompletedTask();
            break;
            case '4':
                tasks.listCompletedTask(false);
            break;
            case '5':
                console.log(tasks.completeTask(await showListCheckList(tasks.listTask)));
            break;
            case '6':
                const list= await listTaskDelete(tasks.listTask)
                if(list!=='0') {
                    const ok  = await confirm('¿Estas Seguro?')
                    console.log(ok?tasks.deleteTask(list):'cancelado');
                }
            break;
            case '0':
                // console.log(tasks._listado);
                console.clear()
            break;
           
        }
        saveDb(tasks.listTask)
        if(res!=='0') await pausa() 
    } while (res!=='0')
}

main();