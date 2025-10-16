const API_URL = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", getTasks);

// 1️⃣ Fetch tasks from backend and show in UI
function getTasks() {
    fetch(`${API_URL}/getData`)
        .then(response => response.json())
        .then(data => renderTasks(data))
        .catch(error => console.error("Error fetching tasks:", error));
}

// 2️⃣ Render tasks in the list
function renderTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <div class="task-content">
                <span>${task.title} - ${task.description}</span>
                <div class="task-actions">
                    <button class="action-btn update-btn" onclick="toggleComplete(${task.id})">✓</button>
                    <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
                </div>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// 3️⃣ Add new task from frontend
function addTask() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title || !description) {
        alert("Please enter title and description");
        return;
    }

    const newTask = {
        title,
        description,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    fetch(`${API_URL}/addData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        getTasks(); // Refresh task list
    })
    .catch(error => console.error("Error adding task:", error));
}

// 4️⃣ Toggle complete status
function toggleComplete(id) {
    fetch(`${API_URL}/getData`)
        .then(res => res.json())
        .then(tasks => {
            const task = tasks.find(t => t.id === id);
            if (!task) return;

            task.completed = !task.completed;
            task.updatedAt = new Date();

            fetch(`${API_URL}/updateData`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task)
            })
            .then(res => res.json())
            .then(() => getTasks());
        })
        .catch(error => console.error("Error toggling task:", error));
}

// 5️⃣ Delete task
function deleteTask(id) {
    fetch(`${API_URL}/deleteData/${id}`, { method: "DELETE" })
        .then(() => getTasks())
        .catch(error => console.error("Error deleting task:", error));
}
