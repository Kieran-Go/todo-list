const createValidator = (onValid) => {
  // Validate the project form
  const validateProjectForm = () => {
    let valid = false;

    if (validateTitle()) valid = true;

    if (valid) onValid();
  };

  // Validate the task form
  const validateTaskForm = () => {
    let titleIsValid = false;
    let descIsValid = false;
    let dueDateIsValid = false;
    let priorityIsValid = false;

    if (validateTitle()) titleIsValid = true;
    if (validateDescription()) descIsValid = true;
    if (validateDueDate()) dueDateIsValid = true;
    if (validatePriority()) priorityIsValid = true;

    if (titleIsValid && descIsValid && dueDateIsValid && priorityIsValid)
      onValid();
  };

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
      if (radio.checked) selectedPriority = radio.value;
    });

    if (selectedPriority === null) {
      validationMsg.textContent = "Error: Must choose a priority";
      validationMsg.classList.add("invalid");
      return false;
    }
    // Priority is valid. Undo invalid classes and remove message
    validationMsg.textContent = "";
    validationMsg.classList.remove("invalid");

    return true;
  };

  return { validateProjectForm, validateTaskForm };
};

export default createValidator;
