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
    new Project("Project 0", [
        new Task("Wake Up", "Start the day by waking up.", "2025-01-07 06:00 AM", "High", true),
        new Task("Morning Exercise", "Do a 30-minute workout to get energized.", "2025-01-07 06:30 AM", "Medium", true),
        new Task("Breakfast", "Have a healthy breakfast to fuel your day.", "2025-01-07 07:15 AM", "Low", false),
        new Task("Work", "Focus on work tasks and productivity.", "2025-01-07 09:00 AM", "High", false),
    ])
);

manager.addProject(
    new Project("Project 1", [
        new Task("Plan", "Outline tasks for the week.", "2025-01-08 08:00 AM", "High", false),
        new Task("Team Meeting", "Discuss project progress with the team.", "2025-01-08 10:00 AM", "Medium", false),
        new Task("Lunch Break", "Take a break and recharge with a meal.", "2025-01-08 12:00 PM", "Low", false),
        new Task("Review", "Review completed tasks and plan for tomorrow.", "2025-01-08 05:00 PM", "Medium", true),
    ])
);

manager.addProject(
    new Project("Project 2", [
        new Task("Email Check", "Respond to important emails.", "2025-01-09 09:00 AM", "Medium", true),
        new Task("Presentation Prep", "Prepare slides for the client meeting.", "2025-01-09 11:00 AM", "High", false),
        new Task("Meeting with Client", "Discuss project updates with the client.", "2025-01-09 02:00 PM", "High", false),
        new Task("Feedback Session", "Gather feedback from the client.", "2025-01-09 03:30 PM", "Medium", false),
    ])
);

manager.addProject(
    new Project("Project 3", [
        new Task("Market Research", "Research trends and competitors.", "2025-01-10 08:00 AM", "Medium", false),
        new Task("Brainstorming", "Generate ideas for the new campaign.", "2025-01-10 10:00 AM", "High", false),
        new Task("Content Writing", "Write blog posts and social media captions.", "2025-01-10 01:00 PM", "Medium", false),
        new Task("Analysis", "Analyze the results of recent campaigns.", "2025-01-10 04:00 PM", "High", true),
    ])
);

manager.addProject(
    new Project("Project 4", [
        new Task("Inventory Check", "Review the stock levels.", "2025-01-11 09:00 AM", "Low", true),
        new Task("Supplier Meeting", "Negotiate terms with suppliers.", "2025-01-11 11:00 AM", "High", false),
        new Task("Restocking", "Order items that are running low.", "2025-01-11 02:00 PM", "Medium", false),
        new Task("Team Debrief", "Discuss inventory management strategy.", "2025-01-11 04:30 PM", "Medium", false),
    ])
);

ui.populateSidebar(manager);
ui.populateTaskList(manager, manager.projects[0]);