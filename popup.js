function setParameters(req) {
  req.setRequestHeader('X-PrettyPrint', 'true');
  req.setRequestHeader('Accept', 'application/json');
  req.setRequestHeader('Content-Type', 'application/json');
  return req;
}

function sendGetRequest(url) {
  req = new XMLHttpRequest();
  req.open("GET", url, false);
  setParameters(req);
  req.send(null);
  return req.responseText;
}

function initialize() {
  var place = localStorage["place"];
  if (!place) {
    place = "400010";
  }
  getWeatherInfomation(place, 1);

}

function getWeatherInfomation(cd, type) {
  var url =
    "http://weather.livedoor.com/forecast/webservice/json/v1?city=" + cd;
  var jsonText = sendGetRequest(url);
  var obj = JSON.parse(jsonText);
  var ent = obj.forecasts;
  if (ent == null) return;

  var htmlText = "<tr>";
  var len = ent.length;
  for (var i = 0; i < len; i++) {
    htmlText += "<td>";
    htmlText += getWeatherDate(ent[i]);
    htmlText += "</td>";
  };

  htmlText += "</tr>";

  htmlText += "<tr>";
  for (var i = 0; i < len; i++) {
    htmlText += "<td>";
    htmlText += getWeatherDateLabel(ent[i]);
    htmlText += "</td>";
  };
  htmlText += "</tr>";

  htmlText += "<tr>";
  for (var i = 0; i < len; i++) {
    htmlText += "<td><img src='";
    htmlText += "large/" + getImage(ent[i]);
    htmlText += "'/></td>";
  };
  htmlText += "</tr>";

  htmlText += "<tr>";
  for (var i = 0; i < len; i++) {
    htmlText += "<td>";
    htmlText += getWeatherState(ent[i]);
    htmlText += "</td>";
  };
  htmlText += "</tr>";

  htmlText += "<tr>";
  for (var i = 0; i < len; i++) {
    htmlText += "<td>";
    htmlText += getWeatherMaxDegree(ent[i]);
    htmlText += "</td>";
  };

  htmlText += "</tr>";
  var ti = "<tr><td colspan='" + len + "'>" + obj.title + "</td></tr>";
  var desp = "<tr><td colspan='" + len + "'>" + getText(obj.description) + "</td></tr>";
  var link = "<tr><td cospan='" + len + "'><a target='_blank' href='" + obj.link + "'>詳細</a></td></tr>";

  var begin = "<table>";
  var end = "</table>";

  $("body").append(begin + ti + htmlText + desp + link + end);

  // TODO: 時間ごとの天気概況が取得できない。スクレイピングする！？

  file_name = getImage(ent[0]);
  chrome.browserAction.setIcon({path:file_name});

}

function getHeadObject(data) {
    if(data && data.length > 0) {
        return data[0];
    }
    return null;
}

function getText(ent) {
  var value = ""
  if (ent) {
    try {
      value = ent.text;
    }catch(e){}
  }
  return value;
}

function getWeatherState(ent) {
  var value = "";
  if (ent) {
    try {
      value = ent.telop;
    }catch(e){}
  }
  return value;
}

function getWeatherMaxDegree(ent) {
  var value = "";
  if (ent) {
    try {
      value = ent.temperature.max.celsius;
    }catch(e){}
  }
  return value;
}

function getWeatherDate(ent) {
  var value = "";
  if (ent) {
    try {
      value = ent.date;
    }catch(e){}
  }
  return value;
}

function getWeatherDateLabel(ent) {
  var value = "";
  if (ent) {
    try {
      value = ent.dateLabel;
    }catch(e){}
  }
  return value;
}

function getFileName(file_path) {  
    file_name = file_path.substring(file_path.lastIndexOf('/')+1, file_path.length);  
    return file_name;  
}  

function getImage(ent) {
  if (ent) {
    var url = ent.image.url;
    return getFileName(url).replace(".gif", ".png");
  };
}

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  initialize();
});
