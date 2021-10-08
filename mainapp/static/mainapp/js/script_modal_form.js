"use strict";




var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
let main_graph = document.getElementById("main_graph");

$('input[name="datefilter"]')
    .daterangepicker({
        locale: {
            format: "YYYY/MM/DD",
        },
    }).val();

btn.onclick = function () {
    modal.style.display = "block";
};

let options2 = {
    chart: {
        height: 265,
        type: "bar",
    },
    dataLabels: {
        enabled: false,
    },
    series: [],
    title: {
        text: "",
    },
    noData: {
        text: "Loading...",
    },
};
let chart = new ApexCharts(document.querySelector("#chart"), options2);
chart.render();

// График круговой на главной странице
let options3 = {
    series: [],
    chart: {
        height: 270,
        type: "radialBar",
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: "",
            },
        },
    },
    labels: ["Cricket"],
    noData: {
        text: "Loading...",
    },
};

let answer = new ApexCharts(document.querySelector("#answer"), options3);
answer.render();

span.onclick = function () {
    modal.style.display = "none";
};
// Кнопки назад, далее и готово
let back_button = document.getElementById("back_button");
let next_button = document.getElementById("next_button");
let done_button = document.getElementById("done_button");
next_button.hidden = false;
done_button.hidden = true;

let form_graph = document.getElementById("form_graph");
form_graph.disabled = true;

// Назначаем переменные шаблонам (data по умолчанию 'block')
let data = document.getElementById("data");
data.style.display = "block";
let visualization = document.getElementById("visualization");
let stylish = document.getElementById("stylish");
let design = document.getElementById("design");
let page_number = 0;

// Массив всех шаблонов
let sites = [data, visualization, stylish, design];

// Header цветовой индикатор над ссылками
let data_h1 = document.getElementById("data_h1");
let visualization_h1 = document.getElementById("visualization_h1");
let stylish_h1 = document.getElementById("stylish_h1");
let design_h1 = document.getElementById("design_h1");
data_h1.style.backgroundImage = 'url("../../../../media/site/purple.png")';
data_h1.style.backgroundRepeat = "no-repeat";
data_h1.style.backgroundPosition = "center";
back_button.disabled = page_number === 0;

// Получение базы по api
var xhr;

if (window.XMLHttpRequest) {
// Chrome, Mozilla, Opera, Safari
  xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    // Internet Explorer
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
let bigData;
xhr.open("GET", "http://127.0.0.1:8000/api/my_models/", true);
xhr.onload = function (e) {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            bigData = JSON.parse(xhr.responseText);
        } else {
            console.error(xhr.statusText);
        }
    }
};
xhr.onerror = function (e) {
    console.error(xhr.statusText);
};
xhr.send(null);

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

function visual_menu() {
    for (let i = 1; i < sites.length; i++) {
        sites[i].style.display = "none";
        done_button.hidden = true;
        next_button.hidden = false;
        next_button.disabled = false;
    }
    // $('[name="indicator_field"]').prop("checked", false);
    // $('[name="visualfields"]').prop("checked", false);

    sites[0].style.display = "block";
    data_h1.style.backgroundImage = 'url("../../../../media/site/purple.png")';
    data_h1.style.backgroundRepeat = "no-repeat";
    data_h1.style.backgroundPosition = "center";
    visualization_h1.style.backgroundImage =
        'url("../../../../media/site/grey.png")';
    visualization_h1.style.backgroundRepeat = "no-repeat";
    visualization_h1.style.backgroundPosition = "center";
    stylish_h1.style.backgroundImage = 'url("../../../../media/site/grey.png")';
    stylish_h1.style.backgroundRepeat = "no-repeat";
    stylish_h1.style.backgroundPosition = "center";
    design_h1.style.backgroundImage = 'url("../../../../media/site/grey.png")';
    design_h1.style.backgroundRepeat = "no-repeat";
    design_h1.style.backgroundPosition = "center";
    page_number = 0;
}

function backPage() {
    done_button.hidden = true;
    next_button.hidden = false;
    if (page_number - 1 === 0) {
        back_button.disabled = true;
        next_button.disabled = false;
    }
    if (page_number < sites.length) {
        next_button.disabled = false;
    }
    sites[page_number].style.display = "none";
    page_number--;
    sites[page_number].style.display = "block";
    switch (page_number) {
        case 0:
            data_h1.style.backgroundImage =
                'url("../../../../media/site/purple.png")';
            data_h1.style.backgroundRepeat = "no-repeat";
            data_h1.style.backgroundPosition = "center";
            visualization_h1.style.backgroundImage =
                'url("../../../../media/site/grey.png")';
            visualization_h1.style.backgroundRepeat = "no-repeat";
            visualization_h1.style.backgroundPosition = "center";
            break;
        case 1:
            data_h1.style.textDecoration = "underline";
            visualization_h1.style.backgroundImage =
                'url("../../../../media/site/purple.png")';
            visualization_h1.style.backgroundRepeat = "no-repeat";
            visualization_h1.style.backgroundPosition = "center";
            stylish_h1.style.backgroundImage =
                'url("../../../../media/site/grey.png")';
            stylish_h1.style.backgroundRepeat = "no-repeat";
            stylish_h1.style.backgroundPosition = "center";
            break;
        case 2:
            stylish_h1.style.backgroundImage =
                'url("../../../../media/site/purple.png")';
            stylish_h1.style.backgroundRepeat = "no-repeat";
            stylish_h1.style.backgroundPosition = "center";
            design_h1.style.backgroundImage =
                'url("../../../../media/site/grey.png")';
            design_h1.style.backgroundRepeat = "no-repeat";
            design_h1.style.backgroundPosition = "center";
            break;
    }

    if (sites[page_number] === stylish) {
        createStylishCheckboxes();
        main_graph.innerHTML = "";
        get_data(bigData);
    }
}

function nextPage() {
    back_button.disabled = false;
    if (page_number + 1 === sites.length - 1) {
        next_button.disabled = true;
        next_button.hidden = true;
        done_button.hidden = false;
    } else {
        done_button.hidden = true;
    }
    sites[page_number].style.display = "none";
    page_number++;
    sites[page_number].style.display = "block";
    switch (page_number) {
        case 1:
            data_h1.style.backgroundImage =
                'url("../../../../media/site/green.png")';
            data_h1.style.backgroundRepeat = "no-repeat";
            data_h1.style.backgroundPosition = "center";
            visualization_h1.style.backgroundImage =
                'url("../../../../media/site/purple.png")';
            visualization_h1.style.backgroundRepeat = "no-repeat";
            visualization_h1.style.backgroundPosition = "center";
            break;
        case 2:
            visualization_h1.style.backgroundImage =
                'url("../../../../media/site/green.png")';
            visualization_h1.style.backgroundRepeat = "no-repeat";
            visualization_h1.style.backgroundPosition = "center";
            stylish_h1.style.backgroundImage =
                'url("../../../../media/site/purple.png")';
            stylish_h1.style.backgroundRepeat = "no-repeat";
            stylish_h1.style.backgroundPosition = "center";
            break;
        case 3:
            stylish_h1.style.backgroundImage =
                'url("../../../../media/site/green.png")';
            stylish_h1.style.backgroundRepeat = "no-repeat";
            stylish_h1.style.backgroundPosition = "center";
            design_h1.style.backgroundImage =
                'url("../../../../media/site/purple.png")';
            design_h1.style.backgroundRepeat = "no-repeat";
            design_h1.style.backgroundPosition = "center";
            break;
    }
    if (sites[page_number] === stylish) {
        createStylishCheckboxes();
        main_graph.innerHTML = "";

        get_data(bigData);
    }
}

function createStylishCheckboxes() {
    let color_arr = [
        "#8062C1",
        "#2FBD90",
        "#FD397A",
        "#FFBD33",
        "#1D1725",
        "#ACAEB6",
        "#F3F3F4",
        "#FFFFFF",
    ];
    let stylish_checkbox = document.getElementById("stylish_checkbox");
    stylish_checkbox.innerHTML = "";
    color_arr.forEach(function (color) {
        const color_checkbox_input = document.createElement("input");
        const color_checkbox_label = document.createElement("label");
        color_checkbox_input.type = "radio";
        color_checkbox_input.name = "color_field";
        color_checkbox_input.id = color;
        color_checkbox_input.value = color;
        color_checkbox_label.style.background = color;
        color_checkbox_label.innerHTML = "&nbsp";
        color_checkbox_label.setAttribute("for", color);
        let stylish_checkbox_item = document.createElement("div");
        stylish_checkbox_item.id = "stylish_checkbox_item";
        stylish_checkbox_item.innerHTML = "";
        stylish_checkbox_item.appendChild(color_checkbox_input);
        stylish_checkbox_item.appendChild(color_checkbox_label);
        stylish_checkbox.appendChild(stylish_checkbox_item);
    });
}

function get_data(models, color) {
    let values_filter = [];
    let visualfields = [];
    $("#checkboxes_filter :selected").each(function () {
        values_filter.push($(this).val());
    });
    let modelDict = {};
    chart.innerHTML = "";
    $("#visual_select :selected").each(function () {
        visualfields.push($(this).val());
    });
    models = models.filter((model) => visualfields.includes(model.name));
    let get_arr_data = [];
    models.forEach((element) => {
        if (!get_arr_data.includes(element.date)){
            get_arr_data.push(element.date)
        }
    })
    for (let i = 0; i < Object.keys(models).length; i++) {
        
        if (!modelDict.hasOwnProperty(models[i].name)) {
            modelDict[models[i].name] = {
                fact: [+models[i].fact],
                plan: [+models[i].plan],
                data: [models[i].date],
                status: [+models[i].active],
            }
        }
        else {
            modelDict[models[i].name]["fact"].push(+models[i].fact);
            modelDict[models[i].name]["plan"].push(+models[i].plan);
            modelDict[models[i].name]["data"].push(models[i].date);
            modelDict[models[i].name]["status"].push(+models[i].active);
        }
    }
    let answer_len = 0;
    let status_ok = 0;
    for (let key in modelDict) {
        answer_len += modelDict[key].status.length;
        for (let i = 0; i < modelDict[key].status.length; i++) {
            status_ok += modelDict[key].status[i];
        }
    }
    status_ok = (status_ok * 100) / answer_len;

    chart.destroy();
    answer.destroy();

    get_answer(status_ok);
    // Перерисовка графика при нажатии на цвет
    let type_of_graph = $('[name="radio"]:checked').val();

    // Фильтр графика по факту или планы
    let args = document.getElementById("integerSelect").value;

    // Отрисовка графика
    switch (type_of_graph) {
        case "areachart":
            printArea(modelDict, color, args);
            break;
        case "pie":
            printPie(modelDict, color, args);
            break;
        case "bar":
            printBar(modelDict, color, args);
            break;
        case "vertbar":
            printVertBar(modelDict, args);
            break;
        case "wtf":
            printWtf(modelDict, args);
            break;
    }
    targe_achived(modelDict)
    return modelDict;
}

// Изменение показателя исходные данные ЦЕЛОЕ и перерисовка графика
let integerSelect = document.getElementById("integerSelect");
integerSelect.onchange = () => get_data(bigData);

// Отображать / не отображать долю выполнения плана
let partSelect = document.getElementById("partSelect");
let select_part_data = document.getElementById("select_part_data");
let part_content = document.getElementById("part_content");

partSelect.onchange = () => {
    if (partSelect.value == 'show') {
        
        get_data(bigData);
    } else if (partSelect.value == 'notshow') {
        part_content.innerHTML = '';
        part_content.innerHTML = `<h1>Тут могла бы быть шкала выполнения планов!</h1>`;
        select_part_data.appendChild(part_content)
    }
}

Array.prototype.sum = function(){
    var s = 0;
    for (let i = 0; i < this.length; i++){
       s += this[i]
    }
    return s / this.length
 }


function targe_achived(data) {
    part_content.innerHTML = '';
    for (let key in data) {
        let total = ((data[key].fact.sum() * 100) / data[key].plan.sum()).toFixed(2);
        part_content.innerHTML += `<p class="p-0 m-0">${key} </p><div class="progress p-0">
        <div class="progress-bar"  style="width:${total}%; color:white; margin:0" aria-valuenow="${total}" aria-valuemin="0" aria-valuemax="100">${total}%</div>
        </div>`;
        select_part_data.appendChild(part_content)
    }
}


function get_answer(series) {
    let options3 = {
        series: [`${series.toFixed()}`],

        chart: {
            height: 270,
            type: "radialBar",
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 15,
                    size: "70",
                },
                dataLabels: {
                    value: {
                        show: false,
                    },
                },
                track: {
                    background: "#fff",
                },
            },
        },
        labels: [`${series.toFixed()}%`],
    };

    let answer = new ApexCharts(document.querySelector("#answer"), options3);
    answer.render();
}

// График вид Пирог
function printPie(arr, my_color, args) {
    let series = [];
    let datas = [];
    let labels = [];
    for (let key in arr) {
        labels.push(key);

        if (args == 'fact') {
            series.push(
                arr[key].fact.reduce((sum, current) => sum + current, 0) /
                    arr[key].fact.length
            );
        }
        if (args == 'plan') {
            series.push(
                arr[key].plan.reduce((sum, current) => sum + current, 0) /
                    arr[key].plan.length
            );
        }
        datas.push(arr[key].data);
    }
    let color;
    if (my_color === undefined) {
        color = ["#69b1b7", "#d29c83", "#6ca76f"];
    } else {
        color = [my_color];
    }
    let options2 = {
        series: series,
        chart: {
            height: 265,
            type: "pie",
        },
        labels: labels,
        responsive: [
            {
                breakpoint: 10,
                options: {
                    chart: {
                        width: 400,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
        xaxis: {
            categories: datas,
        },
        colors: color,
    };

    let chart = new ApexCharts(document.querySelector("#chart"), options2);
    chart.render();
}

// График вид Линия
function printArea(arr, my_color, args) {
    let series = [];
    let datas = [];
    for (let key in arr) {
        // if (args == 'fact') {
        //     series.push({
        //         name: key,
        //         type: "line",
        //         data: arr[key].fact,
        //     });
        // }
        // if (args == 'plan') {
        //     series.push({
        //         name: key,
        //         type: "line",
        //         data: arr[key].plan,
        //     });
        // }
        if (args == "fact") {
            series.push({
                name: `${key} - fact`,
                type: "line",
                data: arr[key].fact,
            });
        }
        if (args == "plan") {
            series.push({
                name: `${key} - plan`,
                type: "line",
                data: arr[key].plan,
            });
        }
        arr[key].data.map((key) => {
            if (!datas.includes(key)) {
                datas = datas.concat(key);
            }
        });
    }
    let color;
    if (my_color === undefined) {
        color = ["#69b1b7", "#d29c83", "#6ca76f"];
    } else {
        color = [my_color];
    }
    let options2 = {
        series: series,
        chart: {
            height: 265,
            type: "line",
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
        },
        grid: {
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: datas,
        },
    };

    let chart = new ApexCharts(document.querySelector("#chart"), options2);
    chart.render();
}

let colors_bar = document.getElementById("stylish_checkbox");
colors_bar.onclick = function () {
    let color = $('[name="color_field"]:checked').val();
    get_data(bigData, color);
};

// График вид Бары
function printBar(arr, my_color, args) {
    let series = [];
    let datas = [];
    for (let key in arr) {
        if (args == 'fact') {
            series.push({
                name: key,
                data: arr[key].fact,
            });
        }
        if (args == 'plan') {
            series.push({
                name: key,
                data: arr[key].plan,
            });
        }
        
        arr[key].data.map((key) => {
            if (!datas.includes(key)) {
                datas = datas.concat(key);
            }
        });
    }
    let color;
    if (my_color === undefined) {
        color = ["#69b1b7", "#d29c83", "#6ca76f"];
    } else {
        color = my_color;
    }
    let options2 = {
        series: series,
        chart: {
            height: 265,
            type: "bar",
        },
        plotOptions: {
            bar: {
                width: 4,
                borderRadius: 4,
                horizontal: true,
            },
        },
        stroke: {
            width: [2, 6],
        },
        dataLabels: {
            enabled: false,
            colors: [color],
        },
        xaxis: {
            categories: datas,
        },
    };

    let chart = new ApexCharts(document.querySelector("#chart"), options2);
    chart.render();
}

// График вид вертикальыне Бары
function printVertBar(arr, args) {
    let series = [];
    let datas = [];
    let categories = [];
    for (let key in arr) {
        if (args == 'fact') {
            series.push({
                name: key,
                type: "column",
                data: arr[key].fact,
            });
        }
        if (args == 'plan') {
            series.push({
                name: key,
                type: "column",
                data: arr[key].plan,
            });
        }
        

        arr[key].data.map((key) => {
            if (!datas.includes(key)) {
                datas = datas.concat(key);
            }
        });
        categories.push(key);
    }
    let options2 = {
        series: series,
        chart: {
            // height: '100%',
            type: "bar",
            height: 265,
        },
        stroke: {
            width: [2, 6],
        },
        title: {
            text: "",
        },
        dataLabels: {
            enabled: false,
        },
        labels: datas,
        xaxis: {
            type: "string",
        },
        yaxis: [
            {
                title: {
                    text: 'График по "факт"',
                },
            },
            {
                opposite: true,
                title: {
                    text: "",
                },
            },
        ],
    };

    let chart = new ApexCharts(document.querySelector("#chart"), options2);
    chart.render();
}

// График вид сложные Бары
function printWtf(arr, args) {
    let series = [];
    let series_plan = [];
    let datas = [];
    let categories = [];
    for (let key in arr) {
        if (args == 'fact') {
            series.push({
                name: key,
                data: arr[key].fact,
            });
        }
        if (args == 'plan') {
            series.push({
                name: key,
                data: arr[key].plan,
            });
        }
        arr[key].data.map((key) => {
            if (!datas.includes(key)) {
                datas = datas.concat(key);
            }
        });
    }
    var options2 = {
        series: series,
        chart: {
            height: 265,
            type: "radar",
            dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1,
            },
        },
        title: {
            text: "",
        },
        stroke: {
            width: 2,
        },
        fill: {
            opacity: 0.1,
        },
        markers: {
            size: 0,
        },
        xaxis: {
            categories: datas,
        },
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options2);
    chart.render();
}

// Блоки фильтров, которые отображаются после их выбора в select
let period_block = document.getElementById("period_block");
let done_block = document.getElementById("done_block");
let plan_block = document.getElementById("plan_block");
let indicator_block = document.getElementById("indicator_block");
let plan_achived_block = document.getElementById("plan_achived_block");



done_button.onclick = function () {
    let B_two = document.querySelector('#b_two');
    let graphName = document.querySelector('#graphName');
    if (graphName) {
        B_two.removeChild(graphName);
    }
    
    let graph_input_name = document.createElement('h2');
    graph_input_name.insertAdjacentHTML('beforeend', (document.getElementById("graphName_input").value).toUpperCase());
    B_two.appendChild(graph_input_name);
    let count_filters = 0;
    modal.style.display = "none";
    let values_filter = [];
    $("#checkboxes_filter :selected").each(function () {
        values_filter.push($(this).val());
    });
    for (let i = 0; i < values_filter.length; i++) {
        if (values_filter[i] === "дата") {
            period_block.style.display = "block";
            count_filters++;
        }
        if (values_filter[i] === "значение план") {
            plan_block.style.display = "block";
            count_filters++;
        }
        if (values_filter[i] === "отработано / не отработано") {
            done_block.style.display = "block";
            count_filters++;
        }
        if (values_filter[i] === "показатель") {
            indicator_block.style.display = "block";
            count_filters++;
        }
    }
    if (count_filters > 0) {
        form_graph.disabled = false;
    }

    $("#chart").clone(false).unwrap().appendTo("#main_graph");
};

function reload_page() {
    location.reload();
    return false;
}

form_graph.onclick = function () {
    let important = document.getElementById("important");

    main_graph.innerHTML = "";
    chart.destroy();

    // Получаем базу данных
    let models;
    models = bigData;
    if (period_block.style.display === "block") {
        // Фильтр по периоду
        let data_list = new Array();
        let perdiod = $('input[name="datefilter"]').on(
            "apply.daterangepicker",
            function (ev, picker) {
                $(this).val(
                    picker.startDate.format("YYYY/MM/DD") +
                        "-" +
                        picker.endDate.format("YYYY/MM/DD")
                );
            }
        );
        perdiod = perdiod.val().split("-");
        console.log(perdiod)
        for (let key in perdiod) {
            data_list.push([perdiod[key]]);
        }
        models = models.filter(
            (model) =>
                Date.parse(data_list[0]) <= Date.parse(model.date) &&
                Date.parse(data_list[1]) >= Date.parse(model.date)
        );
    }
    if (indicator_block.style.display === "block") {
        // фильтр по исполнителю
        let values_indicator = [];
        $("#indicator_block_select :selected").each(function () {
            values_indicator.push($(this).val());
        });
        models = models.filter((model) =>
            values_indicator.includes(model.name)
        );
    }
    if (done_block.style.display === "block") {
        // Фильтр по отработанным / не отработанным 
        let done_selector = $("#done_block_select :selected").val();
        if (done_selector != 2) {
            models = models.filter((model) => model.active == done_selector);
        }
        models = models;
    }
    if (plan_block.style.display === "block") {
        // Фильтр выполнению плана
        let plan_achived_block_select = $("#plan_achived_block_select :selected").val();
        switch (plan_achived_block_select) {
            case 'target_achived':
                models = models.filter(model => (+model.fact >=  +model.plan));
                break;
            case 'target_not_achived':
                models = models.filter(model => (+model.fact <  +model.plan));
                break;
            case 'all_meanings':
                models = models;
                break;
        }
    }

    // main_graph.destroy();
    $("#chart").clone(false).unwrap().appendTo("#main_graph");

    get_data(models);
};