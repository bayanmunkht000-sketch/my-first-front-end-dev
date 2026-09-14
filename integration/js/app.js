const rooms = [
  {
    name: "自习室101",
    floor: "1",
    status: "open"
  },
  {
    name: "自习室102",
    floor: "1",
    status: "closed"
  },
  {
    name: "自习室201",
    floor: "2",
    status: "open"
  },
  {
    name: "自习室202",
    floor: "2",
    status: "open"
  },
  {
    name: "自习室301",
    floor: "3",
    status: "closed"
  },
  {
    name: "自习室302",
    floor: "3",
    status: "open"
  }
];

function renderRooms(roomData) {

  const roomList = document.querySelector("#roomList");

  roomList.innerHTML = "";

  roomData.forEach(function (room) {

    const statusText =
      room.status === "open" ? "开放" : "关闭";

    roomList.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">

            <h5 class="card-title">${room.name}</h5>

            <p class="card-text">
              楼层：${room.floor}楼
            </p>

            <p class="card-text">
              状态：${statusText}
            </p>

          </div>
        </div>
      </div>
    `;

  });

}

renderRooms(rooms);

const floorFilter = document.querySelector("#floorFilter");
const statusFilter = document.querySelector("#statusFilter");

function filterRooms() {

  const selectedFloor = floorFilter.value;
  const selectedStatus = statusFilter.value;

  const filteredRooms = rooms.filter(function (room) {

    const floorMatch =
      selectedFloor === "all" ||
      room.floor === selectedFloor;

    const statusMatch =
      selectedStatus === "all" ||
      room.status === selectedStatus;

    return floorMatch && statusMatch;

  });

  renderRooms(filteredRooms);
}

floorFilter.addEventListener("change", filterRooms);

statusFilter.addEventListener("change", filterRooms);

fetch("data/data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    if (data.rooms.length === 0) {
       const dataError = document.querySelector("#dataError");
       dataError.textContent = "暂无数据。";
       return;
}

    const roomNames = data.rooms.map(function (room) {
      return room.name;
    });

    const usageValues = data.rooms.map(function (room) {
      return room.usage;
    });

    createUsageChart(roomNames, usageValues);

  })
 .catch(function (error) {

  console.error("数据加载失败：", error);

  const dataError = document.querySelector("#dataError");

  dataError.textContent = "数据加载失败，请稍后再试。";

  });

  function createUsageChart(roomNames, usageValues) {

  const ctx = document.querySelector("#usageChart");

  new Chart(ctx, {
    type: "bar",

    data: {
      labels: roomNames,

      datasets: [
        {
          label: "使用率（%）",
          data: usageValues
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        title: {
          display: true,
          text: "校园自习室使用率"
        }
      },

      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });

}