// Imported Scripts
import * as dom from "./domUtility.js";
// Imported media
import deleteSVG from "../../media/images/del-btn.svg";
import plusSVG from "../../media/images/plus-btn.svg";
// Imported Classes
import Task from "../classes/task.js";
import Project from "../classes/project.js";
import ProjectManager from "../classes/projectManager.js";

export function populateSidebar(manager){
    const sidebar = document.querySelector(".sidebar");
    const projects = manager.projects;

    // Create the event listener for the 'add projects' button
    document.querySelector(".add-project-btn").addEventListener("click", () => showProjectForm(manager));

    // Add each project to the dom
    projects.forEach((project, index) => {
        addProjectToDom(manager, project)
    });
}

export function addProjectToDom(manager, project){
    const sidebar = document.querySelector(".sidebar");
    const index = project.id;

    // Create the div for each project
    const div = dom.newElement("div", null, `project${index}`, ["sidebar-project"]);
    
    // Append the project title
    div.appendChild(dom.newElement("p", project.title));

    // Create the delete button
    const delBtn = dom.newImg(deleteSVG, null, null, ["del-btn"]);

    // Create the delete button's click event
    delBtn.addEventListener("click", () => {
        manager.deleteProject(manager.projects.findIndex(p => p.id === project.id));

        // Remove the project from the DOM
        div.remove();

        // Reassign the IDs of all project divs to match the new order of project IDs
        const projDivs = Array.from(document.querySelectorAll(`.sidebar-project`));
        projDivs.forEach((projDiv, index) => {
            projDiv.id = `project${index}`;
        })

        // Focus onto a new project
        let newIndex = -1;
        if(project.id < manager.projects.length){
            newIndex = project.id;
        }
        else if (manager.projects.length > 0) {
            newIndex = manager.projects.length - 1; // Focus on the previous project if the deleted one was the last
        }
        populateTaskList(manager, manager.projects[newIndex]);
    });
    // Track if the delete button is being hovered
    let delBtnHovered = false;
    delBtn.addEventListener("mouseenter", () => {delBtnHovered = true;});
    delBtn.addEventListener("mouseleave", () => {delBtnHovered = false;});

    // Append the delete button
    div.appendChild(delBtn);

    sidebar.appendChild(div);

    // Create the event listener for this project
    div.addEventListener("click", () =>{
        if(delBtnHovered) return; // To prevent calling this event when trying to delete a project

        if(manager.projects.length <= 0){
            showNoProjects();
            return;
        }
        if(manager.projects[project.id] === undefined){
        } 
        populateTaskList(manager, manager.projects[project.id]);
    });
}

export function populateTaskList(manager, project){
    // Show the project title
    showProjectTitle(project);

    // Return if there are no projects
    if(project === undefined){
        showNoProjects();
        return;
    }

    // Reset the task content;
    document.querySelector(".task-container").innerHTML = "";

    // If this project has tasks
    if(project.tasks.length > 0){
        showTasks(manager, project);
        project.tasks.forEach(task => {
            addTaskToDom(manager, task, project);
        });
    }
    else showNoTasks(manager, project);
}

function addTaskToDom(manager, task, project) {
    const taskContainer = document.querySelector(".task-container");

    // Create a div for each task
    const div = dom.newElement("div", null, `project${project.id}-task${task.id}`, ["task"]);
    
    // Create the task name
    const taskName = dom.newElement("p", task.title, null, ["task-name"]);
    
    // Create the checkbox
    const checkbox = dom.newInput("checkbox", null, ["checkbox"]);
    
    if(task.complete){
        // Assign the completed class if task completed
        taskName.classList.add("task-complete");
        // Tick the checkbox automatically if task completed
        checkbox.checked = true;
    }
    
    // Add the event listener to the checkbox to toggle the task completion status
    checkbox.addEventListener("click", () => {
        // Toggle the task completion status
        task.complete = !task.complete;
    
        // Assign the completed class to the task name
        taskName.classList.toggle("task-complete");
    })
    
    // Append the checkbox and task name
    div.appendChild(checkbox);
    div.appendChild(taskName);
    
    // Create the priority dot
    const pri = task.priority.toLowerCase();
    div.appendChild(dom.newElement("div", null, null, ["priority-dot", `priority-${pri}`]));
    
    // Append the date
    div.appendChild(dom.newElement("p", task.dueDate, null, ["due-date"]));
    
    // Create the task delete button, which is actually just a <p> with 'X' as the content
    const taskDeleteBtn = dom.newElement("p", "X", null, ["del-task-btn"]);
    
    // Add the delete button's click event
    taskDeleteBtn.addEventListener("click", () => {
        // Find the index of the task by its ID and then delete it
        project.deleteTask(project.tasks.findIndex(t => t.id === task.id));
    
        // Remove the task from the DOM
        div.remove();     
    
        // Reassign the IDs of all task divs to match the new order of task IDs
        const taskDivs = Array.from(document.querySelectorAll('.task'));
        taskDivs.forEach((taskDiv, index) => {
            taskDiv.id = `project${project.id}-task${index}`; // Update the div ID to match the new task ID
        });

        // Show the 'no tasks' message if there are no tasks
        if(project.tasks.length <= 0) showNoTasks(manager, project);
    });
    
    // Append the task delete button
    div.appendChild(taskDeleteBtn);

    // Append the description
    div.appendChild(dom.newElement("p", task.description, null, ["description"]));
    
    taskContainer.appendChild(div);
}

export function showProjectTitle(proj){
    // Init the header
    const header = document.querySelector(".main-header");

    // Reset the header's content
    header.innerHTML = "";

    let title = "";
    if(proj === undefined) title = "No Projects";
    else title = proj.title;

    header.appendChild(dom.newElement("h1", title, null));
}

export function showTasks(manager, project){
    const taskContainer = document.querySelector(".task-container"); // Init the task container
    const taskHeader = dom.newElement("div", null, null, ["task-container-header"]); // Init the task header

    taskHeader.appendChild(dom.newElement("h2", "Tasks", null, ["task-header"]));

    const plusBtn = dom.newImg(plusSVG, null, null, ["plus-btn"])
    plusBtn.addEventListener("click", ()=> showTaskForm(manager, project));

    taskHeader.appendChild(plusBtn);
    taskContainer.appendChild(taskHeader);
}

export function showNoTasks(manager, project){
    const taskContainer = document.querySelector(".task-container"); // Init the task container
    const taskHeader = dom.newElement("div", null, null, ["task-container-header"]); // Init the task header

    taskContainer.innerHTML = "";
    taskHeader.appendChild(dom.newElement("h2", "No tasks...", null, ["task-header"]));

    const plusBtn = dom.newImg(plusSVG, null, null, ["plus-btn"])
    plusBtn.addEventListener("click", ()=> showTaskForm(manager, project));
    taskHeader.appendChild(plusBtn);

    taskContainer.appendChild(taskHeader);
    taskContainer.appendChild(dom.newElement("p", "Add tasks to this project.", null, ["no-task-msg"]));
}

export function showNoProjects(){
    const taskContainer = document.querySelector(".task-container");
    taskContainer.innerHTML = "";
    const taskHeader = dom.newElement("div", null, null, ["task-container-header"]);

    taskHeader.appendChild(dom.newElement("p", "Add a project to get started", null, ["task-header"]));
    taskContainer.appendChild(taskHeader);
}

export function showProjectForm(manager){
    // Show blur filter over content
    document.querySelector(".content").classList.add("blur");

    // Create and append the form
    const form = dom.newElement("div", null, null, ["form", "form-project"]);
    document.body.appendChild(form);

    // Create and append the close button
    const closeBtn = dom.newElement("p", "X", null, ["close-form-btn"]);
    closeBtn.addEventListener("click", () => closeForm());
    form.appendChild(closeBtn);

    // Append the heading
    form.appendChild(dom.newElement("h1","New Project"));

    // Append the label for the project title
    form.appendChild(dom.newLabel("project-title", "Project Title:"));

    // Create the text input for the project title
    const title = dom.newInput("text", null);
    form.appendChild(title);

    // Focus on the input
    title.focus();

    // Create the validation message
    const validationMsg = dom.newElement("p", "Max Characters: 25", null, ["validation-msg"]);

    // Create the confirm button
    const confirmBtn = dom.newElement("button", "Confirm", null, ["confirm"]);
    confirmBtn.addEventListener("click", () =>{
        // validate the form
        if (title.value.trim() === "") {
            validationMsg.textContent = "Error: Empty title";
            validationMsg.classList.add("invalid");
            return;
        }
        else if(title.value.length > 25){
            validationMsg.textContent = "Error: Title is over 25 characters";
            validationMsg.classList.add("invalid");
            return;
        }

        // Add the project to the array
        const newProj = new Project(title.value, []);
        manager.addProject(newProj);

        // Add the project to the DOM
        addProjectToDom(manager, newProj);

        // Focus on the new project
        populateTaskList(manager, manager.projects[manager.projects.length-1]);

        closeForm();
    });

    //Append the validation message and confirm button
    form.appendChild(validationMsg);
    form.appendChild(confirmBtn);
}

export function showTaskForm(manager, project){
    // Show blur filter over content
    document.querySelector(".content").classList.add("blur");

    // Create and append the form
    const form = dom.newElement("div", null, null, ["form", "form-task"]);
    document.body.appendChild(form);

    // Create and append the close button
    const closeBtn = dom.newElement("p", "X", null, ["close-form-btn"]);
    closeBtn.addEventListener("click", () => closeForm());
    form.appendChild(closeBtn);

    // Append the heading
    form.appendChild(dom.newElement("h1","New Task"));

    // Append the label for the task title
    form.appendChild(dom.newLabel("task-title", "Task Title:"));

    // Create the text input for the task title
    const title = dom.newInput("text", null);
    form.appendChild(title);

    // Focus on the input
    title.focus();

    // Create the validation message
    const titleValidationMsg = dom.newElement("p", "Max Characters: 25", null, ["validation-msg"]);
    form.appendChild(titleValidationMsg);

    // Create the description
    form.appendChild(dom.newLabel("task-description", "Task Description:"));
    const description = dom.newElement("textarea", null, null, ["form-description"])
    form.appendChild(description);
    // Create the validation message
    const descriptionValidationMsg = dom.newElement("p", "", null, ["validation-msg"]);
    form.appendChild(descriptionValidationMsg);

    // Create the due date
    form.appendChild(dom.newLabel("due-date", "Due Date:"));
    const dueDate = dom.newInput("date", null, [], "due-date");
    form.appendChild(dueDate);
    // Create the validation message
    const dateValidationMsg = dom.newElement("p", "", null, ["validation-msg"]);
    form.appendChild(dateValidationMsg);

    // Create the priority radio buttons
    const priorityContainer = dom.newElement("fieldset");
    priorityContainer.appendChild(dom.newElement("legend", "Priority:"));
    const options = ["High", "Med", "Low"];
    for(let i = 0; i < options.length; i++){
        const radioLabel = dom.newLabel(`priority-${options[i]}`);
        const radioButton = dom.newInput("radio", null, [], "priority");

        radioButton.value = options[i];
        radioLabel.appendChild(radioButton);

        priorityContainer.appendChild(radioLabel);
        priorityContainer.innerHTML += options[i];
    }
    form.appendChild(priorityContainer);
    // Create the validation message
    const radioValidationMsg = dom.newElement("p", "", null, ["validation-msg"]);
    form.appendChild(radioValidationMsg);

    // Create the confirm button
    const confirmBtn = dom.newElement("button", "Confirm", null, ["confirm"]);
    confirmBtn.addEventListener("click", () =>{
        // validate the form
        if (title.value.trim() === "") {
            titleValidationMsg.textContent = "Error: Empty title";
            titleValidationMsg.classList.add("invalid");
            return;
        }
        else if(title.value.length > 25){
            titleValidationMsg.textContent = "Error: Title is over 25 characters";
            titleValidationMsg.classList.add("invalid");
            return;
        }
        else titleValidationMsg.classList.remove("invalid");

        if(description.value.trim() === ""){
            descriptionValidationMsg.textContent = "Error: Empty description";
            descriptionValidationMsg.classList.add("invalid");
            return;
        }
        else descriptionValidationMsg.textContent = "";

        if(dueDate.value === ""){
            dateValidationMsg.textContent = "Error: Date required";
            dateValidationMsg.classList.add("invalid");
            return
        }
        else dateValidationMsg.textContent = "";

        // get the checked radio button
        const radios = document.querySelectorAll('input[name="priority"]');
        let selectedPriority = null;
        radios.forEach((radio) => {
            if (radio.checked) {
                selectedPriority = radio.value;
            }
        });

        if(selectedPriority === null){
            radioValidationMsg.textContent = "Error: Select a priority";
            radioValidationMsg.classList.add("invalid");
            return
        }
        else radioValidationMsg.textContent = "";

        // Create the task
        const newTask = new Task(title.value, description.value, dueDate.value, selectedPriority, false);
        
        // Add the task to the project
        project.addTask(newTask);

        // Add the task to the DOM
        addTaskToDom(manager, newTask, project);

        // Remove the no task message
        document.querySelector(".task-header").textContent = "";
        const noTaskMsg = document.querySelector(".no-task-msg");
        if(noTaskMsg) noTaskMsg.remove();

        closeForm();
    });
    //Append the confirm button
    form.appendChild(confirmBtn);
}

function closeForm(){
    // Remove the blur filter
    document.querySelector(".content").classList.remove("blur");

    // Reset form content
    const form = document.querySelector(".form");
    form.remove();
}

