// Imported styles
import "./css/normalize.css";
import "./css/styles.css";
// Imported Scripts
import createSidebar from "./js/scripts/sidebar.js";
import createTaskList from "./js/scripts/taskList.js";
import {
  loadFromLocalStorage,
  loadDefaultManager,
} from "./js/scripts/storageFunctions.js";

// Init the manager
const manager = loadFromLocalStorage("manager") || loadDefaultManager();

// Init DOM
createSidebar(manager).init();
createTaskList(manager, manager.projects[0]).init();