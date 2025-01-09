// Imported styles
import "./css/normalize.css";
import "./css/styles.css";
// Imported Scripts
import * as ui from "./js/scripts/ui.js";
import createSidebar from "./js/scripts/sidebar.js";
import createTaskList from "./js/scripts/taskList.js";
import {
  loadFromLocalStorage,
  loadDefaultManager,
} from "./js/scripts/storageFunctions.js";

// Init the manager
const manager = loadFromLocalStorage("manager") || loadDefaultManager();
// const manager = loadDefaultManager();
const sidebar = createSidebar(manager);
const taskList = createTaskList(manager, manager.projects[0]);

sidebar.init();
taskList.init();