function arri() {
    let data_name = new Array();
    let data_fact = new Array();
    let data_plan = new Array();
    let data_date = new Array();
    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://127.0.0.1:8000/demomy_models/', true)
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log('success')
            // let models = JSON.parse(this.response).filter(elem => elem.stuff_amount < 10);
            let models = JSON.parse(this.response);
            let result = document.getElementById('result');
            for (let i = 0; i < models.length; i++) {
                if (models[i].name === 'Количество обращений' || models[i].name === 'Заявки СТП') {
                    data_name.push(models[i].name);
                    data_fact.push(models[i].fact);
                    data_plan.push(models[i].plan);
                    data_date.push(models[i].date);
                }

            }
            // result.innerHTML = models;
            // console.log(models);
        }
    }
    xhr.send();
    return [data_name, data_fact, data_plan, data_date]
}

function printVertBar(arr) {
    let options = {
        series: [{
            name: 'fact',
            type: 'column',
            data: arr[1]
        }, {
            name: 'plan',
            type: 'column',
            data: arr[2]
        }],
        chart: {
            height: 300,
            type: 'line',
        },
        stroke: {
            width: [0, 4],
        },
        title: {

            text: 'Traffic Sources'
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
        },
        labels: arr[0],
        xaxis: {
            type: 'string',
            name: 'arr[0]',
        },
        yaxis: [{
            title: {
                text: 'Website Blog',

            },
            name: arr[0],

        }, {
            opposite: true,
            title: {
                text: 'Social Media',
                name: arr[0],
            },

        }]
    };

    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

function printArea(arr) {
    var options = {
        series: [{
            name: "Stuff amount",
            data: arr[1]
        }],
        chart: {
            height: 300,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: arr[0],
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

console.log(arri());
printVertBar(arri());
// printArea(arri());