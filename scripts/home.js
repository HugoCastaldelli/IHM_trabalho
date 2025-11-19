document.addEventListener("DOMContentLoaded", () => {
    const tasks = document.querySelectorAll(".task-item");
    const progressBar = document.querySelector(".progress");
    const achievementImg = document.getElementById("achievement-img");

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
        const total = tasks.length;
        const completed = document.querySelectorAll(".task-item.completed").length;
        const percent = (completed / total) * 100;

        progressBar.style.width = percent + "%";
        updateAchievement(percent);
    }

    tasks.forEach(task => {
        task.addEventListener("click", () => {
            task.classList.toggle("completed");
            updateProgress();
        });
    });

    updateProgress(); // inicial
});
