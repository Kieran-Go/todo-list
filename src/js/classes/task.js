export default class Task {
    // Constructor
    constructor(title, description, dueDate, priority, complete) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._complete = complete;
    }

    // Getters
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
