// Imported scripts
import * as dom from "./domUtility.js";
import { saveToLocalStorage } from "./storageFunctions.js";
//Imported classes
import Project from "../classes/project.js";
import Task from "../classes/task.js";

const createForm = (manager, onFormSubmitted) => {
  const formElement = dom.newElement("div", null, null, [
    "form",
    "form-project",
  ]);

  // --- Form Visibility Functions ---
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

  // Form Renderers ---
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
    formElement.appendChild(dom.newInput("text", "input-title", [], "project-title"));
    // Title input validation message
    formElement.appendChild(dom.newElement("p", "Max Characters: 25", "val-title" , ["validation-msg"]));

    // Confirm button
    const confirmBtn = dom.newElement("button", "Confirm", null, ["confirm"]);
    confirmBtn.addEventListener("click", () => {
      // Check if the form is valid
      if(validateProjectForm()){
        addProject();
        hide(); // Close the form
      }
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
    formElement.appendChild(dom.newInput("text", "input-title", [], "task-title"));
    // Title validation message
    formElement.appendChild(dom.newElement("p", "Max Characters: 25", "val-title", ["validation-msg"]));

    // Description
    formElement.appendChild(dom.newLabel("task-description", "Task Description:"));
    formElement.appendChild(dom.newElement("textarea", null, "input-desc"));
    // Description validation message
    formElement.appendChild(dom.newElement("p", "", "val-desc", ["validation-msg"]));

    // Due date
    formElement.appendChild(dom.newLabel("due-date", "Due Date:"));
    formElement.appendChild(dom.newInput("date", "input-date", [], "due-date"));
    // Due date validation message
    formElement.appendChild(dom.newElement("p", "", "val-date", ["validation-msg"]));

    // Priority
    const priorityFieldset = dom.newElement("fieldset");
    priorityFieldset.appendChild(dom.newElement("legend", "Priority:"));
    const options = ["High", "Med", "Low"];
    for(let i = 0; i < options.length; i++){
      const radLabel = dom.newLabel(`priority-${options[i]}`);
      const radButton = dom.newInput("radio", null, [], "priority");

      const radDiv = priorityFieldset.appendChild(dom.newElement("div", null, null, [
        "radio-container"
      ]));
      radButton.value = options[i];
      radLabel.appendChild(radButton);

      radDiv.appendChild(radLabel);
      radDiv.innerHTML+= options[i];

      priorityFieldset.appendChild(radDiv);
    }
    formElement.appendChild(priorityFieldset);
    // Priority validation message
    formElement.appendChild(dom.newElement("p", "", "val-priority", ["validation-msg"]));

    // Confirm button
    const confirmBtn = dom.newElement("button", "Confirm", null, ["confirm"]);
    confirmBtn.addEventListener("click", () => {
      // Check if the form is valid
      if(validateTaskForm()){
        addTask();
        hide(); // Close the form
      }
    });
    formElement.appendChild(confirmBtn);
  };

  // --- Adding Functions ---
   // Add project
   const addProject = () => {
    const title = document.getElementById("input-title").value;
    const newProject = new Project(title, []);
    manager.addProject(newProject);
    saveToLocalStorage("manager", manager);
    onFormSubmitted(); // Callback to re-render the sidebar
  };

  // Add task
  const addTask = () => {
    // Get all user input for the task properties
    const title = document.getElementById("input-title").value;
    const desc = document.getElementById("input-desc").value;
    const dueDate = document.getElementById("input-date").value;
    let priority = "Low"; // Default to low as a fail safe
    document.querySelectorAll(`input[name="priority"]`).forEach((radio) =>{
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
  };

  // --- Validation Functions --- 
  // Validate the project form
  const validateProjectForm = () => {
    let valid = false;

    if(validateTitle()) valid = true;

    return valid;    
  };

  // Validate the task form
  const validateTaskForm = () => {
    let titleIsValid = false;
    let descIsValid = false;
    let dueDateIsValid = false;
    let priorityIsValid = false;

    if(validateTitle()) titleIsValid = true;
    if(validateDescription()) descIsValid = true;
    if(validateDueDate()) dueDateIsValid = true; 
    if(validatePriority()) priorityIsValid = true;

    if(titleIsValid && descIsValid && dueDateIsValid) return true;
  };

  // --- Validation helper functions---
  // Validate title
  const validateTitle = () => {
    const titleElement = document.getElementById("input-title");
    const title = titleElement.value;
    const validationMsg = document.getElementById("val-title");

    // Check if title is empty
    if (title.trim() === "") {
      validationMsg.textContent = "Error: Empty title";
      validationMsg.classList.add("invalid");
      titleElement.classList.add("invalid");
      return false;
    }
    // Check if title exceeds 25 characters
    if (title.length > 25) {
      validationMsg.textContent = "Error: Title is over 25 characters";
      validationMsg.classList.add("invalid");
      return false;
    }

    // Title is valid. Undo invalid classes
    validationMsg.textContent = "Max Characters: 25";
    validationMsg.classList.remove("invalid");
    titleElement.classList.remove("invalid");

    return true;
  };

  // Validate description
  const validateDescription = () => {
    const descElement = document.getElementById("input-desc");
    const desc = descElement.value;
    const validationMsg = document.getElementById("val-desc");

    // Check if description is empty
    if (desc.trim() === "") {
      validationMsg.textContent = "Error: Description is empty";
      validationMsg.classList.add("invalid");
      descElement.classList.add("invalid");
      return false;
    }

    // Description is valid. Undo invalid classes and remove message
    validationMsg.classList.remove("invalid");
    validationMsg.textContent = "";
    descElement.classList.remove("invalid");

    return true;
  };

  // Validate date
  const validateDueDate = () => {
    const dateElement = document.getElementById("input-date");
    const date = dateElement.value;
    const validationMsg = document.getElementById("val-date");

    // Check if date is null
    if (date === "") {
      validationMsg.textContent = "Error: Select a date";
      validationMsg.classList.add("invalid");
      dateElement.classList.add("invalid");
      return false;
    }
    // Date is valid. Undo invalid classes and remove message
    validationMsg.classList.remove("invalid");
    validationMsg.textContent = "";
    dateElement.classList.remove("invalid");

    return true;
  };

  const validatePriority = () => {
    const radios = document.querySelectorAll('input[name="priority"]');
    const validationMsg = document.getElementById("val-priority");

    // Confirm if a radio button is checked
    let selectedPriority = null;
    radios.forEach((radio) => {
      if(radio.checked) selectedPriority = radio.value;
    });

    if(selectedPriority === null){
      validationMsg.textContent = "Error: Must choose a priority";
      validationMsg.classList.add("invalid");
      return false;
    }
    // Priority is valid. Undo invalid classes and remove message
    validationMsg.textContent = "";
    validationMsg.classList.remove("invalid");
    
    return true;
  };

  return { projectForm, taskForm, show, hide };
};

export default createForm;