// Imported Classes
import Task from "../classes/task.js";
import Project from "../classes/project.js";
import ProjectManager from "../classes/projectManager.js";

export function loadDefaultManager() {
  const manager = new ProjectManager();
  // Add the default project to the manager
  manager.addProject(
    new Project("Default Project", [
      new Task(
        "Task 1",
        "Confirm client requirements.",
        "08 January 2025",
        "High",
        false,
      ),
      new Task(
        "Task 2",
        "Complete the design documentation.",
        "10 January 2025",
        "Medium",
        false,
      ),
      new Task(
        "Task 3",
        "Review code for the new feature.",
        "12 January 2025",
        "Low",
        false,
      ),
      new Task(
        "Task 4",
        "Prepare presentation slides for the client meeting.",
        "15 January 2025",
        "High",
        false,
      ),
      new Task(
        "Task 5",
        "Update dependencies in the project repository.",
        "18 January 2025",
        "Medium",
        false,
      ),
    ]),
  );
  return manager;
}

// Functions to manage local storage
export function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromLocalStorage(key) {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const manager = new ProjectManager();

    // Deserialize projects and tasks from stored data
    parsedData.projects.forEach((projectData) => {
      const project = Project.fromJSON(projectData);
      manager.addProject(project);
    });

    return manager;
  }
  return null; // Return null if no data exists
}
