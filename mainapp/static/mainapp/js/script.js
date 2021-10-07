"use strict";

let visial_flag = true;
let select_item = document.getElementById("select_item");
function showCheckboxesVisualization() {
    let checkboxes3 = document.getElementById("checkboxes_visualization");
    if (!visial_flag) {
        checkboxes3.style.display = "block";
        visial_flag = true;
    } else {
        checkboxes3.style.display = "none";
        visial_flag = false;
    }
}

// Выбор показателей
$("#checkboxes_indicator").on("change", function () {
    let values_indicator = [];
    $("#checkboxes_indicator :selected").each(function () {
        values_indicator.push($(this).val());
    });
    // $.ajax({
    //     data: {
    //         'values_indicator': JSON.stringify(values_indicator),
    //     }
    // });
    let b_left = document.getElementById("indi_result");
    $(b_left).html("");
    values_indicator.forEach((e) => (b_left.innerHTML += "<p>" + e + "</p>"));
    fill_visual_select(values_indicator)
});

// Выбор фильтров
$("#checkboxes_filter").on("change", function () {
    let values_filter = [];
    $("#checkboxes_filter :selected").each(function () {
        values_filter.push($(this).val());
    });
    $.ajax({
        data: { values_filter: JSON.stringify(values_filter) },
    });
    let b_right = document.getElementById("filter_result");
    $(b_right).html("");
    values_filter.forEach((e) => (b_right.innerHTML += "<p>" + e + "</p>"));
});

for (let i = 1; i <= 5; i++) {
    document.getElementById("radio-" + i).disabled = true;
}


$("#visual_select").on("change", function () {
    let number =  $("#visual_select :selected").length;
    visible_radio_graphs(number);
})


function visible_radio_graphs(number) {
    let radio_visual_on = document.getElementById("radio_visual_on");

    if (number < 2) {
        radio_visual_on.classList.add('gray_disabled');
        for (let i = 1; i <= 5; i++) {
            document.getElementById("radio-" + i).disabled = true;
        }
    } else {
        radio_visual_on.classList.remove('gray_disabled')
        radio_visual_on.style.display = 'flex';
        for (let i = 1; i <= 5; i++) {
            document.getElementById("radio-" + i).disabled = false;
        }
    }
}

class Selections {
    constructor() {
        this.values_indicator = [];
    }
    fill_in_arr() {
        let arr = this.values_indicator;
        $("#checkboxes_indicator :selected").each(function () {
            arr.push($(this).val());
        });
    }
    get_arr() {
        return this.values_indicator;
    }
    fill_data(array) {
        $("#visual_select").html("");
        $("#visual_select").selectpicker("refresh");
        for (let i = 0; i < array.length; i++) {
            $("#visual_select").append(
                '<option value="' + array[i] + '">' + array[i] + "</option>"
            );
            $("#visual_select").selectpicker("refresh");
        }
    }
}

function fill_visual_select() {
    let fill_arr;
    let select_arr = new Selections();
    select_arr.fill_in_arr();
    fill_arr = select_arr.get_arr();
    select_arr.fill_data(fill_arr);
}