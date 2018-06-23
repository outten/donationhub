var url = 'https://script.google.com/macros/s/AKfycbwdVvITI--CW158VQNa9cMgiDOPpRSOdh1omxNn10JfxXavXA/exec';
var $form = $('form#test-form')

function getFormData($form_input){
    var unindexed_array = $form_input.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function processForm(e,$form_origin) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: getFormData($form_origin)
  }).done(function() {
    // do something
    alert('success! check spreadsheet')
  });
}

$('#non_profits_submit').on('click', function(e) {
  processForm(e,$('form#non_profits_site_form').first())
})

$('#sponsors_submit').on('click', function(e) {
  processForm(e,$('form#sponsors_site_form').first())
})

$('#pitch_deck_submit').on('click', function(e) {
  processForm(e,$('form#pitch_deck_site_form').first())
})
