const { v4: uuidv4 } = require('uuid');
require('colors');
const { Task } = require('./task');

class Tasks {
    constructor(){
        this._listado= {};
    }
    loadTaskFromArrary( tasks=[]){
        tasks.forEach(task=>{
            this._listado[task.id]=task;
        });
    }
    createtask(desc){
        const task = new Task(desc)
        this._listado[task.id]= task
    }
    get listTask(){
        const listado=[]
        Object.keys(this._listado).forEach(key=>{
            listado.push(this._listado[key])
        })
        return listado
    } 
    fullListTask(){
        this.printTask(this.listTask)
    }
    printTask(listTask=[]){
        console.log();
        listTask.forEach((task,i)=>{
            const index =`${i+1}`.yellow
            const {desc,completado,dateComplete} = task
            const isComplete = completado ? 'Completado'.green : 'Pendiente'.red
            console.log(`${index}. ${desc} :: ${isComplete} ${dateComplete??''}`)
        })
    }
    listCompletedTask(isComplete=true){
        this.printTask(this.listTask.filter(task=>{
            return task.completado===isComplete
        }))
    }
    
    completeTask(ids=[]){
        /*Object.keys(this._listado).forEach((id)=>{
            this._listado[id].completado=false;
        }) */ 
        this.listTask.forEach(task=>{
            if(!ids.includes(task.id))
            this._listado[task.id].completado=false
            this._listado[task.id].dateComplete=null
        }) 
        ids.forEach(id=>{
            this._listado[id].completado=true;
            this._listado[id].dateComplete=new Date().toISOString();
        })
        return 'Completado con exito'
    }
    deleteTask(id){
        return (delete this._listado[id])?'Borrado Correctamente':'No existe la tarea'
    }
}
module.exports={
    Tasks
}