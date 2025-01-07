export default class Project {
    // Constructor
    constructor(title, tasks){
        this._title = title;
        this._tasks = tasks;
    }

    // Getters
    get title(){
        return this._title;
    }

    get tasks(){
        return this._tasks;
    }

    // Setters
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
    }
}