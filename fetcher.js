
document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementsByClassName("taskList")[0];
    const preloader = document.getElementsByClassName("preloader")[0];
    const errorMessage = document.getElementsByClassName("error-message")[0];

    preloader.classList.remove("active");
    errorMessage.classList.remove("active");

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


    const fetchData = () => {
        preloader.classList.add("active");

        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => {
                return response.json();
            })
            .then((data) => {
                preloader.classList.remove("active");
                renderData(data);
            })
            .catch(error => {
                preloader.classList.remove("active");
                errorMessage.classList.add("active");
                console.error("Ошибка: ", error);
            });
    };

    const renderData = (data) => {
        min = Math.floor(Math.random() * 10) + 1;
        max = min + Math.floor(Math.random() * 10) + 1;
        data = data.slice(min, max);

        data.forEach(todos => {
            addTaskToDOM(todos.title)
        });
    };

    if (taskList.children.length === 0) {
        fetchData();
        setTimeout(() => {
            saveTasks();
        }, 500);
    }
});
