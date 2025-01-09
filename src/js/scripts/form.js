// Imported scripts
import * as dom from "./domUtility.js";
import { saveToLocalStorage } from "./storageFunctions.js";
import createValidator from "./formValidator.js";
import createTaskList from "./taskList.js";
//Imported classes
import Project from "../classes/project.js";
import Task from "../classes/task.js";

const createForm = (manager, onFormSubmitted) => {
  const formElement = dom.newElement("div", null, null, [
    "form",
    "form-project",
  ]);

  // Show the form
  const show = () => {
    document.body.appendChild(formElement);
    document.querySelector(".content").classList.add("blur");
  };

  // Hide the form
  const hide = () => {
    document.body.removeChild(formElement);
    document.querySelector(".content").classList.remove("blur");
  };

  // Form for new projects
  const projectForm = () => {
    formElement.innerHTML = ""; // Clear form content

    // Close button
    const closeBtn = dom.newElement("p", "X", null, ["close-form-btn"]);
    closeBtn.addEventListener("click", hide);
    formElement.appendChild(closeBtn);

    // Heading
    formElement.appendChild(dom.newElement("h1", "New Project"));

    // Form title
    formElement.appendChild(dom.newLabel("project-title", "Project Title:"));
    formElement.appendChild(
      dom.newInput("text", "input-title", [], "project-title"),
    );
    // Title input validation message
    formElement.appendChild(
      dom.newElement("p", "Max Characters: 25", "val-title", [
        "validation-msg",
      ]),
    );

    // Confirm button
    const confirmBtn = dom.newElement("button", "Confirm", null, ["confirm"]);
    confirmBtn.addEventListener("click", () => {
      // Check if the form is valid
      const validator = createValidator(addProject);
      validator.validateProjectForm();
    });

    formElement.appendChild(confirmBtn);
  };

  // Form for new tasks
  const taskForm = () => {
    formElement.innerHTML = ""; // Clear form content

    // Close button
    const closeBtn = dom.newElement("p", "X", null, ["close-form-btn"]);
    closeBtn.addEventListener("click", hide);
    formElement.appendChild(closeBtn);

    // Header
    formElement.appendChild(dom.newElement("h1", "New Task"));

    // Task title
    formElement.appendChild(dom.newLabel("task-title", "Task Title:"));
    formElement.appendChild(
      dom.newInput("text", "input-title", [], "task-title"),
    );
    // Title validation message
    formElement.appendChild(
      dom.newElement("p", "Max Characters: 25", "val-title", [
        "validation-msg",
      ]),
    );

    // Description
    formElement.appendChild(
      dom.newLabel("task-description", "Task Description:"),
    );
    formElement.appendChild(dom.newElement("textarea", null, "input-desc"));
    // Description validation message
    formElement.appendChild(
      dom.newElement("p", "", "val-desc", ["validation-msg"]),
    );

    // Due date
    formElement.appendChild(dom.newLabel("due-date", "Due Date:"));
    formElement.appendChild(dom.newInput("date", "input-date", [], "due-date"));
    // Due date validation message
    formElement.appendChild(
      dom.newElement("p", "", "val-date", ["validation-msg"]),
    );

    // Priority
    const priorityFieldset = dom.newElement("fieldset");
    priorityFieldset.appendChild(dom.newElement("legend", "Priority:"));
    const options = ["High", "Med", "Low"];
    for (let i = 0; i < options.length; i++) {
      const radLabel = dom.newLabel(`priority-${options[i]}`);
      const radButton = dom.newInput("radio", null, [], "priority");

      const radDiv = priorityFieldset.appendChild(
        dom.newElement("div", null, null, ["radio-container"]),
      );
      radButton.value = options[i];
      radLabel.appendChild(radButton);

      radDiv.appendChild(radLabel);
      radDiv.innerHTML += options[i];

      priorityFieldset.appendChild(radDiv);
    }
    formElement.appendChild(priorityFieldset);
    // Priority validation message
    formElement.appendChild(
      dom.newElement("p", "", "val-priority", ["validation-msg"]),
    );

    // Confirm button
    const confirmBtn = dom.newElement("button", "Confirm", null, ["confirm"]);
    confirmBtn.addEventListener("click", () => {
      // Check if the form is valid
      const validator = createValidator(addTask);
      validator.validateTaskForm();
    });
    formElement.appendChild(confirmBtn);
  };

  // Add project
  const addProject = () => {
    const title = document.getElementById("input-title").value;
    const newProject = new Project(title, []);
    manager.addProject(newProject);
    saveToLocalStorage("manager", manager);
    onFormSubmitted(); // Callback to re-render the sidebar

    // Get the index of the new project and render it to the task list
    const newFocus = document.querySelectorAll(".sidebar-project").length - 1;
    const taskList = createTaskList(manager, manager.projects[newFocus]);
    taskList.init();

    // Close the form
    hide();
  };

  // Add task
  const addTask = () => {
    // Get all user input for the task properties
    const title = document.getElementById("input-title").value;
    const desc = document.getElementById("input-desc").value;
    const dueDate = document.getElementById("input-date").value;
    let priority = "Low"; // Default to low as a fail safe
    document.querySelectorAll(`input[name="priority"]`).forEach((radio) => {
      if (radio.checked) priority = radio.value;
    });

    // Create the task
    const newTask = new Task(title, desc, dueDate, priority, false);

    // Get the project ID by using the key in the DOM
    const key = document.querySelector(".key").id;
    const project = manager.projects[key];

    // Add the project
    project.addTask(newTask);
    saveToLocalStorage("manager", manager);
    onFormSubmitted(); // Callback to re-render the task list

    // Close the form
    hide();
  };

  return { projectForm, taskForm, show, hide };
};

export default createForm;
