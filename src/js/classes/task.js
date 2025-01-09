export default class Task {
  static _idCounter = -1; // Auto incrementing ID that starts at 0

  constructor(title, description, dueDate, priority, complete = false) {
    this._id = ++Task._idCounter;
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this._complete = complete;
  }

  // Getters and Setters
  get id() {
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
  get complete() {
    return this._complete;
  }

  set id(id) {
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
  set complete(complete) {
    this._complete = complete;
  }

  // Convert to plain object for JSON serialization
  toJSON() {
    return {
      _id: this._id,
      _title: this._title,
      _description: this._description,
      _dueDate: this._dueDate,
      _priority: this._priority,
      _complete: this._complete,
    };
  }

  // Static method to create a Task from plain data
  static fromJSON(data) {
    const task = new Task(
      data._title,
      data._description,
      data._dueDate,
      data._priority,
      data._complete,
    );
    task._id = data._id; // Restore the ID
    return task;
  }
}
