const state = { data: null };

const loadData = async () => {
  $('#status').text('加载中...').show();

  try {
    const response = await fetch('data/books.json');

    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }

    const data = await response.json();

    if (data.series.length === 0) {
      $('#status').text('暂无数据').show();
      return;
    }

    state.data = data;

    $('#sub-title').text(
      data.title + ' · 数据来源：课程统一数据集'
    );

    $('#status').hide();

    renderCards(data);
    renderBarChart(data);

  } catch (error) {
    $('#status').text(
      '加载失败：' + error.message
    ).show();
  }
};

const renderCards = (data) => {
  const months = data.months;

  data.series.forEach(s => {
    const total = s.counts.reduce((sum, n) => sum + n, 0);

    $('#cards').append(`
      <div>
        <div>
          <div>
            <h3 class="card-title h6">${s.category}</h3>
            <p class="card-text fs-4">${total}</p>
            <p class="card-text small text-muted">
              共${months.length}个月累计借阅
            </p>
          </div>
        </div>
      </div>
    `);
  });
};

let barChart = null;

const renderBarChart = (data) => {
  const chartDom = document.getElementById('bar-chart');

  barChart = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: 'axis'
    },

    legend: {
      data: data.series.map(s => s.category)
    },

    xAxis: {
      type: 'category',
      data: data.months
    },

    yAxis: {
      type: 'value'
    },

    series: data.series.map(s => ({
      name: s.category,
      type: 'bar',
      data: s.counts
    }))
  };

  barChart.setOption(option);
};

loadData();