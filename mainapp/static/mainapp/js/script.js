'use strict'




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
$('#checkboxes_indicator').on('change', function () {
    let values_indicator = [];
    $('#checkboxes_indicator :selected').each(function () {
        values_indicator.push($(this).val());

    });
    // $.ajax({
    //     data: {
    //         'values_indicator': JSON.stringify(values_indicator),
    //     }
    // });
    let b_left = document.getElementById("indi_result");
    $(b_left).html('');
    values_indicator.forEach(e => b_left.innerHTML += "<p>" + e + "</p>")
    let values_names = document.getElementById('checkboxes_visualization');
    $(values_names).html('');
    for (let i = 0; i < values_indicator.length; i++) {
        values_names.innerHTML += `<label class="form-check-label" for=${i}><input class="form-check-input" type=checkbox value=${values_indicator[i].replace(' ', '_')} name=visualfields id=${i}>${values_indicator[i].replace(' ', '_')}</label>`
    }
})


// Выбор фильтров
$('#checkboxes_filter').on('change', function () {
    let values_filter = [];
    $('#checkboxes_filter :selected').each(function () {
        values_filter.push($(this).val());
    });
    $.ajax({
        data: {'values_filter': JSON.stringify(values_filter)}
    });
    let b_right = document.getElementById("filter_result");
    $(b_right).html('');
    values_filter.forEach(e => b_right.innerHTML += "<p>" + e + "</p>");

});

for (let i = 1; i <= 5; i++) {
    document.getElementById("radio-" + i).disabled = true;
}

// Выбор показателей на вкладке визуализация
let wind3 = document.getElementById('checkboxes_visualization');
wind3.onclick = function () {
    let visual_arr = [];
    $('[name="visualfields"]:checked').each(function () {
        visual_arr.push($(this).val())
    })
    let radio_visual_on = document.getElementById("radio_visual_on");

    if (visual_arr.length < 2) {
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

