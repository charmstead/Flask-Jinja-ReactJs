const HighCharts = require('highcharts');

const chartColors = ["#7C2715", "#153F7C", "#157C34", "rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"];



export const makeChart = (data, container,setRendered) => {
    return HighCharts.chart({
        chart: {
            type: 'column',
            renderTo:container,
            events:{
                load:function(){
                    setRendered(true)
                }
            }
        },
        title: {
            text: 'Smart Steel Technologies - Frontend Demo'
        },

        subtitle: {
            text: 'Sensor Data'
        },

        yAxis: {
            title: {
                text: 'Class Labels'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        xAxis: {
            minPadding: 0.05,
            maxPadding: 0.05
        },

        series: getDatasets(data),
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}

const getDatasets = (data) => {

    const datasets = [];

    for (let i = 0; i < 10; i++) {

        datasets.push(getDataset(data,i));
    }
    return datasets;
}

export const getDataset = (data, i) => {

    const name = "sensor" + i;

    return data[name].reduce((acc, curr, j) => {
        acc.data.push([curr,data["class_label"][j]]);
        return acc;
    },
        {
            name,
            data: [],
        }
    );

}


export const getDatasetChart = (data,i, container) => {
    return HighCharts.chart({
        chart: {
            type: 'column',
            renderTo:container
        },
        title: {
            text: `Sensor ${i} stats`
        },

        subtitle: {
            text: 'Source: Sensor '+i
        },

        yAxis: {
            title: {
                text: 'Class Labels'
            },
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        xAxis: {
            minPadding: 0.05,
            maxPadding: 0.05
        },

        series: [getDataset(data,i)],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}