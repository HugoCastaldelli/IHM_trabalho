document.addEventListener("DOMContentLoaded", () => {
    // tarefas serão contadas dinamicamente a partir da lista
    // const tasks = document.querySelectorAll(".task-item");
    const progressBar = document.querySelector(".progress");
    const achievementImg = document.getElementById("achievement-img");
    const openBtn = document.getElementById('open-create');
    const overlay = document.getElementById('create-modal');
    const closeBtn = document.getElementById('close-create');
    const addBtn = document.getElementById('add-task');
    const input = document.getElementById('new-task-input');
    const taskList = document.querySelector('.task-list');

    function updateAchievement(percent) {
        if (percent === 100) {
            achievementImg.src = "../assets/img/achievement_gold.png";
        } else if (percent >= 60) {
            achievementImg.src = "../assets/img/achievement_silver.png";
        } else if (percent >= 30) {
            achievementImg.src = "../assets/img/achievement_bronze.png";
        } else {
            achievementImg.src = "../assets/img/achievement.png";
        }
    }

    function updateProgress() {
        // contar tarefas a partir da lista (inclui tarefas adicionadas dinamicamente)
        const total = taskList ? taskList.querySelectorAll('.task-item').length : 0;
        const completed = taskList ? taskList.querySelectorAll('.task-item.completed').length : 0;
        const percent = total === 0 ? 0 : (completed / total) * 100;

        progressBar.style.width = percent + "%";
        updateAchievement(percent);
    }

    // delegação de evento: trata cliques em qualquer .task-item dentro de taskList,
    // incluindo tarefas adicionadas posteriormente
    if (taskList) {
        taskList.addEventListener('click', (e) => {
            const task = e.target.closest('.task-item');
            if (task && taskList.contains(task)) {
                task.classList.toggle('completed');
                updateProgress();
            }
        });
    }

    function openModal() {
        overlay.classList.add('show');
        overlay.setAttribute('aria-hidden', 'false');
        input.value = '';
        setTimeout(() => input.focus(), 50);
    }
    function closeModal() {
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
        input.value = '';
    }

    openBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);

    // fechar clicando fora do modal
    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // adicionar tarefa
    addBtn?.addEventListener('click', () => {
        const value = input.value.trim();
        if (!value) return;
        const item = document.createElement('div');
        item.className = 'task-item';
        item.textContent = value;
        // insere no topo da lista
        taskList.insertBefore(item, taskList.firstChild);
        closeModal();
        // atualiza imediatamente o progresso / conquista após adicionar
        updateProgress();
    });

    // enter para adicionar
    input?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addBtn.click();
        }
    });

    updateProgress(); // inicial
});