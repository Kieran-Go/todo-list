// Imported Scripts
import * as dom from "./domUtility.js";
// Imported media
import deleteSVG from "../../media/images/del-btn.svg";
import plusSVG from "../../media/images/plus-btn.svg";

export function populateSidebar(manager){
    const sidebar = document.querySelector(".sidebar");
    const projects = manager.projects;

    projects.forEach((project, index) => {
        // Create the div for each project
        const div = dom.newElement("div", null, `project${index}`, ["sidebar-project"]);
    
        // Append the project title
        div.appendChild(dom.newElement("p", project.title));
    
        // Create the delete button
        const delBtn = dom.newImg(deleteSVG, null, null, ["del-btn"]);
    
        // Create the delete button's click event
        delBtn.addEventListener("click", () => {
            manager.deleteProject(projects.findIndex(p => p.id === project.id));

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
            populateTaskList(manager.projects[newIndex], newIndex);
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
            populateTaskList(manager.projects[project.id], project.id);
        });
    });
}

export function populateTaskList(project, projectIndex){
    // Show the project title
    showProjectTitle(project);

    // Return if there are no projects
    if(project === undefined){
        showNoProjects();
        return;
    }

    const taskContainer = document.querySelector(".task-container");
    const tasks = project.tasks;

    taskContainer.innerHTML = ""; // Reset the task content

    if(tasks.length > 0){
        showTasks();
        tasks.forEach(task => {
            // Create a div for each task
            const div = dom.newElement("div", null, `project${projectIndex}-task${task.id}`, ["task"]);
        
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
                project.deleteTask(tasks.findIndex(t => t.id === task.id));
        
                // Remove the task from the DOM
                div.remove();     
                
                // Reassign the IDs of all task divs to match the new order of task IDs
                const taskDivs = Array.from(document.querySelectorAll('.task'));
                taskDivs.forEach((taskDiv, index) => {
                    taskDiv.id = `project${projectIndex}-task${index}`; // Update the div ID to match the new task ID
                });

                // Show the 'no tasks' message if there are no tasks
                if(tasks.length <= 0) showNoTasks();
            });
        
            // Append the task delete button
            div.appendChild(taskDeleteBtn);
    
            // Append the description
            div.appendChild(dom.newElement("p", task.description, null, ["description"]));
        
            taskContainer.appendChild(div);
        });
    }
    else showNoTasks();
    
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

export function showTasks(){
    const taskContainer = document.querySelector(".task-container"); // Init the task container
    const taskHeader = dom.newElement("div", null, null, ["task-container-header"]); // Init the task header

    taskHeader.appendChild(dom.newElement("h2", "Tasks", null, ["task-header"]));
    taskHeader.appendChild(dom.newImg(plusSVG, null, null, ["plus-btn"]));
    taskContainer.appendChild(taskHeader);
}

export function showNoTasks(){
    const taskContainer = document.querySelector(".task-container"); // Init the task container
    const taskHeader = dom.newElement("div", null, null, ["task-container-header"]); // Init the task header

    taskContainer.innerHTML = "";
    taskHeader.appendChild(dom.newElement("h2", "No tasks...", null, ["task-header"]));
    taskHeader.appendChild(dom.newImg(plusSVG, null, null, ["plus-btn"]));
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

