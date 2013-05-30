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

  var entry = getHeadObject(obj.forecasts);
  file_name = getImage(entry);
  chrome.browserAction.setIcon({path:file_name});
}

function getHeadObject(data) {
    if(data && data.length > 0) {
        return data[0];
    }
    return null;
}

function getFileName(file_path) {  
    file_name = file_path.substring(file_path.lastIndexOf('/')+1, file_path.length);  
    return file_name;  
}  

function getImage(entry) {
  if (entry) {
    var url = entry.image.url;
    return getFileName(url).replace(".gif", ".png");
  };
}

initialize();
// function setChromeIcon(file) {
// 	chrome.browserAction.setIcon(file);
// }
// chrome.browserAction.setIcon({"path":"1.png"});