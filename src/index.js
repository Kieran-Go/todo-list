// Imported styles
import "./css/normalize.css";
import "./css/styles.css";
// Imported Classes
import Task from "./js/classes/task.js";
import Project from "./js/classes/project.js";
import ProjectManager from "./js/classes/projectManager.js";
// Imported Scripts
import * as ui from "./js/scripts/ui.js";

// Init the manager
const manager = new ProjectManager();

// Add the default project to the manager
manager.addProject(
    new Project("Daily Routine", [
        new Task("Wake Up", "Start the day by waking up.", "2025-01-07 06:00 AM", "High", true),
        new Task("Morning Exercise", "Do a 30-minute workout to get energized.", "2025-01-07 06:30 AM", "Medium", true),
        new Task("Breakfast", "Have a healthy breakfast to fuel your day.", "2025-01-07 07:15 AM", "low", false),
        new Task("Work", "Focus on work tasks and productivity.", "2025-01-07 09:00 AM", "High", false),
    ])
);

ui.populateSidebar(manager);
ui.fillHeader(manager.projects[0].title);
ui.populateTaskList(manager.projects[0], 0);