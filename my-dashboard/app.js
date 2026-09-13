const state = {
  data: null
};

const loadData = async () => {

  $('#status').text('Loading...').show();

  try {

    const response = await fetch('data/expenses.json');

    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }

    const data = await response.json();

    if (data.series.length === 0) {
      $('#status').text('No data available').show();
      return;
    }

    state.data = data;

    $('#sub-title').text(
      data.title + ' · Data source: Personal spending practice data'
    );

    $('#status').hide();

    renderCards(data);
    renderBarChart(data);

  } catch (error) {

    $('#status').text(
      'Loading failed: ' + error.message
    ).show();

  }
};


const renderCards = (data) => {

  const months = data.months;

  data.series.forEach(s => {

    const total = s.counts.reduce(
      (sum, number) => sum + number,
      0
    );

    $('#cards').append(`
      <div>
        <h3>${s.category}</h3>

        <p>${total} RMB</p>

        <p>
          Total spending over ${months.length} months
        </p>
      </div>
    `);

  });
};


let barChart = null;

const renderBarChart = (data) => {

  const chartDom = document.getElementById('bar-chart');

  barChart = echarts.init(chartDom);

  const option = {

    title: {
      text: 'Monthly Spending by Category',
      left: 'center'
    },

    tooltip: {
      trigger: 'axis'
    },

    legend: {
      data: data.series.map(s => s.category),
      bottom: 0
    },

    xAxis: {
      type: 'category',
      data: data.months
    },

    yAxis: {
      type: 'value',
      name: 'RMB'
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