export default class ProjectManager {
    constructor() {
        // Init an empty array of projects
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    deleteProject(index) {
        this.projects.splice(index, 1);
    }
}