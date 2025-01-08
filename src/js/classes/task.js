export default class Task {
    static _idCounter = -1; // Auto incrementing ID that starts at 0

    // Constructor
    constructor(title, description, dueDate, priority, complete) {
        this._id = ++Task._idCounter; // Auto increment the ID
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._complete = complete;
    }

    // Getters
    get id(){
        return this._id;
    }
    get title() {
        return this._title;
    }
    get description() {
        return this._description;
    }
    get dueDate() {
        return this._dueDate;
    }
    get priority() {
        return this._priority;
    }
    get complete(){
        return this._complete;
    }

    // Setters
    set id(id){
        this._id = id;
    }
    set title(title) {
        this._title = title;
    }
    set description(description) {
        this._description = description;
    }
    set dueDate(dueDate) {
        this._dueDate = dueDate;
    }
    set priority(priority) {
        this._priority = priority;
    }
    set complete(complete){
        this._complete = complete;
    }
}
