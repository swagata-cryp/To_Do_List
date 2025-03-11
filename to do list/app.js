document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.getElementById('emptyMessage');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    
    function renderTasks() {
      
        taskList.innerHTML = '';
        
        if (tasks.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
        }
        
        tasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.textContent = task;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function() {
                deleteTask(index);
            });
            
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText !== '') {
            tasks.push(taskText);
            taskInput.value = '';
            renderTasks();
            taskInput.focus();
        }
    }
    
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }
    
    addTaskBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    renderTasks();
});
