document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.querySelector(".taskInput");
    const taskList = document.querySelector(".taskList");

    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(
            Array.from(taskList.children).map(task => task.querySelector("span").innerText)
        ));
    };

    const addTaskToDOM = (taskText) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");
        taskItem.innerHTML = `<span>${taskText}</span> 
                              <button class="delete-btn">Удалить</button>`;
        
        taskItem.querySelector(".delete-btn").addEventListener("click", () => {
            taskItem.remove();
            saveTasks();
        });

        taskList.appendChild(taskItem);
    };

    JSON.parse(localStorage.getItem("tasks") || "[]").forEach(addTaskToDOM);

    document.querySelector(".todoForm").addEventListener("submit", (e) => {
        e.preventDefault();
        if (taskInput.value.trim()) {
            addTaskToDOM(taskInput.value.trim());
            saveTasks();
            taskInput.value = "";
        }
    });
});
