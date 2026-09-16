const tasks = [
  {
    name: "复习数据结构",
    subject: "cs",
    status: "pending"
  },
  {
    name: "完成编程作业",
    subject: "cs",
    status: "done"
  },
  {
    name: "复习汉语词汇",
    subject: "chinese",
    status: "pending"
  }
];

function renderTasks(taskData) {

  const taskList = document.querySelector("#taskList");

  taskList.innerHTML = "";

  taskData.forEach(function (task) {

    const statusText =
      task.status === "done" ? "Completed" : "Not Completed";

    taskList.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">

            <h5 class="card-title">${task.name}</h5>

            <p class="card-text">
              Subject: ${task.subject}
            </p>

            <p class="card-text">
              Status: ${statusText}
            </p>

          </div>
        </div>
      </div>
    `;

  });

}

renderTasks(tasks);


const subjectFilter =
  document.querySelector("#subjectFilter");

const statusFilter =
  document.querySelector("#statusFilter");


function filterTasks() {

  const selectedSubject = subjectFilter.value;
  const selectedStatus = statusFilter.value;

  const filteredTasks = tasks.filter(function (task) {

    const subjectMatch =
      selectedSubject === "all" ||
      task.subject === selectedSubject;

    const statusMatch =
      selectedStatus === "all" ||
      task.status === selectedStatus;

    return subjectMatch && statusMatch;

  });

  renderTasks(filteredTasks);
}


subjectFilter.addEventListener("change", filterTasks);

statusFilter.addEventListener("change", filterTasks);

fetch("data/data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    if (data.subjects.length === 0) {
       const dataError = document.querySelector("#dataError");
       dataError.textContent = "暂无数据。";
       return;
}

    const subjectNames = data.subjects.map(function (subject) {
      return subject.name;
    });

    const studyHours = data.subjects.map(function (subject) {
      return subject.hours;
    });

    createStudyChart(subjectNames, studyHours);

  })
 .catch(function (error) {

  console.error("数据加载失败：", error);

  const dataError = document.querySelector("#dataError");

  dataError.textContent = "数据加载失败，请稍后再试。";

  });

  function createStudyChart(subjectNames, studyHours) {

  const ctx = document.querySelector("#studyChart");

  new Chart(ctx, {
    type: "bar",

    data: {
      labels: subjectNames,

      datasets: [
        {
          label: "学习时间（小时）",
          data: studyHours
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        title: {
          display: true,
          text: "每周学习时间"
        }
      },

      scales: {
        y: {
          beginAtZero: true,
        
        }
      }
    }
  });

}