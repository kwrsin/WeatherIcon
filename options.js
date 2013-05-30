// Save this script as `options.js`

// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("place");
  var place = $("#place option")[select.selectedIndex].value;
  // var place = select.children[select.selectedIndex].value;
  localStorage["place"] = place;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "オプションを保存します";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);

  getWeatherInfomation(place, 1);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var place = localStorage["place"];
  if (!place) {
    return;
  }
  var select = document.getElementById("place");
  var elm = $("#place option");
  for (var i = 0; i < elm.length; i++) {
    var child = elm[i];
    if (child.value == place) {
      child.selected = "true";
      break;
    }
  }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
