// Imported Scripts
import * as dom from "./domUtility.js";
import { saveToLocalStorage } from "./storageFunctions.js";
import createForm from "./form.js";
// Imported media
import plusSVG from "../../media/images/plus-btn.svg";
// Imported Classes
import Task from "../classes/task.js";
import Project from "../classes/project.js";

const createTaskList = (manager, project) => {
  const taskListElement = document.querySelector(".task-container");

  // Render the task list
  const render = () => {
    // Set the project ID key to be accessed later
    if(manager.projects.length > 0) document.querySelector(".key").id = project.id;
    
    // Clear the sidebar
    const content = document.querySelectorAll(".task");
    content.forEach((task) => {
      task.remove();
    });

    // Render the project's title above the task list
    renderTitle();

    // Add tasks to the DOM
    if (project) {
      renderTaskHead();
      if (project.tasks.length > 0)
        project.tasks.forEach((task) => addTaskToDom(task));
    } else renderNoProjects();
  };

  const renderTitle = () => {
    // Get the title element
    const titleElement = document.querySelector(".main-header");
    titleElement.innerHTML = ""; // Clear the title's content

    // Determine the title based on if project exists
    let title = "No projects";
    if (project) title = project.title;

    // Append the title to the element
    titleElement.appendChild(dom.newElement("h1", title, null));
  };

  const addTaskToDom = (task) => {
    const taskContainer = document.querySelector(".task-container");

    // Create a div to contain the task
    const div = dom.newElement("div", null, null, ["task", `from-project${project.id}`]);

    // Task name
    const taskName = dom.newElement("p", task.title, null, ["task-name"]);

    // Checkbox
    const checkbox = dom.newInput("checkbox", null, ["checkbox"]);
    if (task.complete) {
      // Assign the 'complete' class
      taskName.classList.add("task-complete");
      checkbox.checked = true;
    }

    // Checkbox event listener to toggle the task completion
    checkbox.addEventListener("click", () => {
      // Toggle the task completion status
      task.complete = !task.complete;
      saveToLocalStorage("manager", manager);

      // Assign the completed class to the task name
      taskName.classList.toggle("task-complete");
    });

    // Append checkbox and task name
    div.appendChild(checkbox);
    div.appendChild(taskName);

    // Priority Dot
    const pri = task.priority.toLowerCase();
    div.appendChild(
      dom.newElement("div", null, null, ["priority-dot", `priority-${pri}`]),
    );

    // Due date
    div.appendChild(dom.newElement("p", task.dueDate, null, ["due-date"]));
    taskContainer.appendChild(div);

    // Delete button
    const delBtn = dom.newElement("p", "X", null, ["del-task-btn"]);
    delBtn.addEventListener("click", () => deleteTask(task));
    div.appendChild(delBtn);

    // Description
    div.appendChild(
      dom.newElement("p", task.description, null, ["description"]),
    );
  };

  const renderTaskHead = () => {
    // Clear the header
    const oldHeader = document.querySelector(".task-container-header");
    const para = document.querySelector(".no-task-msg");
    if (para) para.remove();
    if (oldHeader) oldHeader.remove();

    let noTasks = false;

    // Create new header
    const header = dom.newElement("div", null, null, ["task-container-header"]);

    // Set header content and check if there are tasks
    let headerContent = "No tasks";
    if (project.tasks.length > 0) headerContent = "Tasks";
    else noTasks = true;

    // Append header
    header.appendChild(
      dom.newElement("h2", headerContent, null, ["task-header"]),
    );

    // Plus button
    const plusBtn = dom.newImg(plusSVG, null, null, ["plus-btn"]);
    header.appendChild(plusBtn);

    // Append the header
    taskListElement.appendChild(header);

    // Initialize the 'add task' button
    initAddTaskButton();

    // Append a 'no tasks' message if there are no tasks
    if (noTasks)
      taskListElement.appendChild(
        dom.newElement("p", "Add tasks to this project", null, ["no-task-msg"]),
      );
  };

  const renderNoProjects = () => {
    // Clear the header
    const oldHeader = document.querySelector(".task-container-header");
    const para = document.querySelector(".no-task-msg");
    if (para) para.remove();
    if (oldHeader) oldHeader.remove();

    // Create new header
    const header = dom.newElement("div", null, null, ["task-container-header"]);
    header.appendChild(
      dom.newElement("p", "Add a project to get started", null, []),
    );

    taskListElement.appendChild(header);
  };

  const deleteTask = (task) => {
    // First delete the task from the project tasks array
    project.deleteTask(task.id);
    saveToLocalStorage("manager", manager);

    // Re-render the task list
    render();
  };

  const initAddTaskButton = () => {
    document.querySelector(".plus-btn").addEventListener("click", () => {
      const form = createForm(manager, render); // Initialize the form
      form.taskForm(); // Setup a task form
      form.show(); // Show the form
    });

  };

  // Initialize the task list
  const init = () => {
    render();
  };

  return { init };
};

export default createTaskList;
