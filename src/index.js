// Imported styles
import "./css/normalize.css";
import "./css/styles.css";
// Imported Classes
import Task from "./js/classes/task.js";
import Project from "./js/classes/project.js";
import ProjectManager from "./js/classes/projectManager.js";
// Imported Scripts
import * as ui from "./js/scripts/ui.js";
import {loadFromLocalStorage, loadDefaultManager} from "./js/scripts/storageFunctions.js"

// Init the manager
const manager = loadFromLocalStorage("manager") || loadDefaultManager();
// const manager = loadDefaultManager();

console.log(manager);

// Populate the page
ui.populateSidebar(manager);
ui.populateTaskList(manager, manager.projects[0]);