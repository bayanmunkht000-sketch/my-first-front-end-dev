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