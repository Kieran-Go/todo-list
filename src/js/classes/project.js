import Task from "./task.js";

export default class Project {
  static _idCounter = -1; // Auto incrementing ID that starts at 0

  // Constructor
  constructor(title, tasks = []) {
    this._id = ++Project._idCounter; // Auto increment the ID
    this._title = title;
    this._tasks = tasks;
  }

  // Getters
  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get tasks() {
    return this._tasks;
  }

  // Setters
  set id(id) {
    this._id = id;
  }

  set title(title) {
    this._title = title;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }

  // Functions
  addTask(task) {
    this._tasks.push(task);
  }

   deleteTask(taskIndex) {
    this._tasks.splice(taskIndex, 1);
  }

  // Convert to plain object for JSON serialization
  toJSON() {
    return {
      _id: this._id,
      _title: this._title,
      _tasks: this._tasks.map((task) => task.toJSON()), // Make sure tasks are also serialized
    };
  }

  // Static method to create a Project from plain data
  static fromJSON(data) {
    const project = new Project(
      data._title,
      data._tasks.map((taskData) => Task.fromJSON(taskData)),
    );
    project._id = data._id; // Restore the ID
    return project;
  }
}
