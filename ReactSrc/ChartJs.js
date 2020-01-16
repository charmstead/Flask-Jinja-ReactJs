const ChartJs = require('chart.js');

const chartColors = ["#7C2715", "#153F7C", "#157C34", "rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"];

export const makeChart = (data) => {
    const config = {
        type: 'line',
        data: {
            datasets: getDatasets(data)
        },
        options: {
            responsive: true,
            animation: {
                animateScale: true,
                animateRotate: true
            },
            title: {
                display: true,
                text: 'Smart Steel Technologies - Frontend Demo'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    type: "linear",
                    position: "bottom",
                    scaleLabel: {
                        display: true,
                        labelString: 'Class Labels'
                    },
                    ticks: {
                        min: -1,
                        max: 1
                      }
                }],
                yAxes: [{
                    // stacked: true,
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Class Labels'
                    }
                }]
            }
        }
    };
    new ChartJs(chartRef.current, config)
}


const getDatasets = (data) => {

    const datasets = [];

    for (let i = 0; i < 10; i++) {
        const label = "sensor" + i;

        const set = data[label].reduce((acc, curr, j) => {
            acc.data.push(
                {
                    x: data["class_label"][j],
                    y: curr
                }
            )

            return acc;

        }, {
                label,
                backgroundColor: chartColors[i],
                borderColor: chartColors[i],
                data: [],
                fill: false,
            });

        datasets.push(set);
    }

    return datasets;
}