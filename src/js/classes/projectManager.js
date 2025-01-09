import Project from "./project.js";

export default class ProjectManager {
  constructor() {
    // Init an empty array of projects
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project);
  }

  deleteProject(id) {
    // Iterate through the projects to find the match
    for (let i = 0; i < this.projects.length; i++) {
      if (id === this.projects[i].id) {
        // Delete the project
        this.projects.splice(i, 1);
      }
    }

    // Sort the project IDs into sequential order after deletion
    for (let i = 0; i < this.projects.length; i++) {
      this.projects[i].id = i;
    }
    // Set the id counter for correct auto-incrementation
    Project._idCounter = this.projects.length - 1;
  }
}
