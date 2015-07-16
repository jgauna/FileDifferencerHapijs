$(document).ready(function() {
  var table,
    form,
    formData,
    xhr,
    row,
    colNumberId,
    data;
  $('#compareFiles').on('click', function() {
    // Clean old results
    $("#resultTable tbody tr").remove();
    $('#resultLog').text('');
    // Get the form binary data
    form = document.getElementById("filesForm");
    formData = new FormData(form);
    xhr = new XMLHttpRequest();
    // Request
    xhr.open('POST', form.action, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        data = JSON.parse(xhr.response);
        if (data !== Boolean(data)) {
          drawTableData(data);
        } else {
          $('#resultLog').text('Not Supported File Extension');
        }
      }
    }
    xhr.send(formData);
    return false;
  });

  $('#addFile').on('click', function() {
    $('#filesForm').append('<input type="file" class="fileInput" name="file" class="button-wide" required/>');
  });

  var drawTableData = function(jsonData) {
    // Since every object's key will always have the same array length ...
    for (var i = 0; i < jsonData.lines.length; i++) {
      colNumberId = 'col' + (i + 1);
      table = $('#resultTable');
      row = $('<tr></tr>');
      row.attr('id', colNumberId);
      table.append(row);
      $('#' + colNumberId).append('<td>' + (jsonData.lines[i] + 1) + '</td> <td> ' + jsonData.diff[i] +
        '</td><td> ' + jsonData.explain[i] + ' </td>');
    }
  }
});