import Task from "./task.js";

export default class Project {
    static _idCounter = -1; // Auto incrementing ID that starts at 0

    // Constructor
    constructor(title, tasks){
        this._id = ++Project._idCounter; // Auto increment the ID
        this._title = title;
        this._tasks = tasks;
    }

    // Getters
    get id(){
        return this._id;
    }
    get title(){
        return this._title;
    }

    get tasks(){
        return this._tasks;
    }

    // Setters
    set id(id){
        this._id = id;
    }
    set title(title){
        this._title = title;
    }

    set tasks(tasks){
        this._tasks = tasks;
    }

    // Functions
    addTask(task){
        this._tasks.push(task);
    }

    deleteTask(index){
        this._tasks.splice(index, 1);

        // Sort the task IDs into sequential order after deletion
        for(let i = 0; i < this._tasks.length; i++){
            this._tasks[i].id = i;
        }
        Task._idCounter = this._tasks.length - 1;
    }
}