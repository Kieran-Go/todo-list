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

        // Sort the project IDs into sequential order after deletion
        this.projects.forEach((proj, index) => {
            proj._id = index;
        });
    }
}