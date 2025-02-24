function openTab(evt, tabName,objs) {
    // Declare all variables
    var i, tabcontent, tablinks;
    if(objs == "Click"){
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("nav-link");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    window.history.pushState('', '', '/#'+tabName);
  }
  if (objs == "Reload"){

    // Declare all variables
    
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("nav-link");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    //make the given tab active
    switch(tabName){
      case "Dashboard":
        Dashboard.style.display = "block";
        DashboardTitle.className += " active";

        break;
      case "Testing":
        Testing.style.display = "block";
        TestingTitle.className += " active";
        break;
      case "Returns":
        Returns.style.display = "block";
        ReturnsTitle.className += " active";
        break;
      }
    }
  } 
    
    
// callAPI function that takes the base and exponent numbers as parameters
var callAPI = (base,exponent)=>{
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"base":base,"exponent":exponent});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://n6uac60or4.execute-api.eu-west-1.amazonaws.com/beta/", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('API Call Error', error));
}

// callAPI function that takes the base and exponent numbers as parameters
var generalAPI = (SerialNumber,BatterySerial,IMEI,FailState,FailReason)=>{
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"SerialNumber":SerialNumber,"BatterySerial":BatterySerial,"IMEI":IMEI,"FailState":FailState,"FailReason":FailReason});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://n6uac60or4.execute-api.eu-west-1.amazonaws.com/beta/", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => window.alert('General API Error', error));
}
var TestingAPIFormat = (form)=>{
  let Database = "testing";
  TestPostAPI(form,Database);
}
var ReturnsAPIFormat = (form)=>{
  let Database = "returns";
  TestPostAPI(form,Database);
}
var TestPostAPI = (form,Database)=>{
  console.log("Form Parse Start")
  let object = {};
  var ATEXCompliant = false;
  for (var data of form.elements) 
  {
    console.log(data.id, data.value);
    if(data.id == "SensorTest")
    {
      if(data.value=="NONE")
      {
        window.alert("Mandatory Fields Missing")
        return;
      }
    }
    if(data.id == "CommsTest")
    {
      if(data.value=="NONE")
      {
        window.alert("Mandatory Fields Missing")
        return;
      }
    }
    if(data.id == "Status")
    {
      if(data.value=="NONE")
      {
        window.alert("Mandatory Fields Missing")
        return;
      }
    }
    if(data.id == "ATEX")
    {
      if(data.value=="NONE")
      {
        window.alert("Mandatory Fields Missing")
        return;
      }
    }
    object[data.id]=(data.value);
  }
  if(Database == "testing"){
  //Process the Data to fit the model 
  formattedObject = {"Parameters":TestFormatter(object),"Database":Database}}
  if(Database == "returns"){formattedObject = {"Parameters":ReturnFormatter(object),"Database":Database}}
  //Send to API for adding to database.
  TestAPIPost(formattedObject);
}
var TestFormatter = (object)=>{
  formatObject= {};
  formatObject[0] = object.SerialNumber;
  formatObject[1] = object.IMEI;
  formatObject[2] = object.DateOfTest;
  formatObject[3] = object.PrimaryDistance;
  formatObject[4] = object.SecondaryDistance;
  formatObject[5] = object.TertiaryDistance;
  formatObject[6] = object.ModbusOffset;
  formatObject[7] = object.BatterySerial;
  formatObject[8] = object.BatteryVoltage;
  formatObject[9] = object.ModemVersion;
  formatObject[10] = object.FirmwareVersion;
  formatObject[11] = object.DeviceName;
  formatObject[12] = object.LastAttemptedSend;
  formatObject[13] = object.LastSuccessfulSend;
  formatObject[14] = object.Coordinates;
  formatObject[15] = object.MobileNetwork;
  formatObject[16] = object.ConnectionType;
  formatObject[17] = object.RSSI;
  formatObject[18] = object.WS46Plus;
  formatObject[19] = object.WS46Hash;
  formatObject[20] = object.Bootstrapped;
  formatObject[21] = object.Registered;
  formatObject[22] = object.Exec;
  formatObject[23] = object.ATEX;
  formatObject[24] = object.FailReason;
  formatObject[25] = "Abdul Rahman";
  formatObject[26] = object.CompetentPerson;
  formatObject[27] = object.PointOfOrigin;
  return formatObject;
}
var ReturnFormatter = (object)=>{
  console.log(object);
  formatObject = {};
  formatObject[0] = object.BatterySerial;
  formatObject[1] = object.BatteryVoltage;
  formatObject[2] = object.Comments;
  formatObject[3] = object.CommsError;
  formatObject[4] = object.CommsTest;
  formatObject[5] = object.Customer;
  formatObject[6] = object.DateReturned;
  formatObject[7] = object.FaultCategory;
  formatObject[8] = object.FixApplied;
  formatObject[9] = object.History;
  formatObject[10] = object.IMEI;
  formatObject[11] = object.Product;
  formatObject[12] = object.ProductCode;
  formatObject[13] = object.ReturnReason;
  formatObject[14] = "Abdul Rahman";
  formatObject[15] = object.SensorError;
  formatObject[16] = object.SensorTest;
  formatObject[17] = object.SerialNumber;
  formatObject[18] = object.Status;
  formatObject[19] = object.Tags;
  formatObject[20] = new Date().toLocaleString();
  formatObject[21] =object.VisualComments;
  formatObject[22] = object.VisualInspection;
  console.log(formatObject);
  return formatObject;
}
var TestAPIPost = (object)=>{  
  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  var obj = JSON.stringify(object);
  console.log(obj);
  myHeaders.append("Content-Type", "application/json");
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: obj,
      redirect: 'follow'
  };
  var url = "https://n6uac60or4.execute-api.eu-west-1.amazonaws.com/beta/testing"
  // make API call with parameters and use promises to get response
  fetch(url, requestOptions)
  .then(response => response.text())
  .then(result => console.log(JSON.parse(result).body))
  .catch(error => console.log('Post API Error'+ error));
}
var getReturnsFilterAPI = (Filter,FilterInput)=>{
  Database = "returns";
  getFilterAPI(Database,Filter,FilterInput);
}
var getTestingFilterAPI = (Filter,FilterInput)=>{
  Database = "testing";
  getFilterAPI(Database,Filter,FilterInput);
}
var getUnitFilterAPI = (Filter,FilterInput)=>{
  Database = "units";
  getFilterAPI(Database,Filter,FilterInput);
}
var getFilterAPI = (Database,Filter,FilterInput)=>{
  console.log(Database);
  console.log(Filter);
  console.log(FilterInput);
    if(FilterInput.value == "")
    {
        window.alert("Filter Field Missing Value");
        return;
    }
    x = Filter;
    var url = "https://n6uac60or4.execute-api.eu-west-1.amazonaws.com/beta/"+Database
    var DatabasePointer = "";
    if(Database == "returns"){DatabasePointer = "ReturnsData";}
    if(Database == "testing"){DatabasePointer = "RigData";}
    if(Database == "units"){DatabasePointer = "UnitData";}
    var json = {"Database":DatabasePointer,"Filter":Filter.value,"Value":FilterInput.value};
    //json = JSON.stringify({"SerialNumber":SerialNumber.value});
    
    var query = encodeQuery(json);
    givenUrl = url +"?"+ query;
    console.log("Given URL:")
    console.log(givenUrl);
    // add content type header to object
    const headers = {
        "Content-Type": "application/json"
    };
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
    };
    // make API call with parameters and use promises to get response
    fetch(givenUrl, requestOptions)
    .then(response => response.text())
    .then(result => displayGetData(result,Database))
    .catch(error => window.alert('Filter API Error', error));
}
function displayGetData(data,Database){
  //Define and Clear old Table
  let list = document.getElementById("UnListTest");
  if(Database == "returns"){
    list = document.getElementById("UnListReturn");
  }
  
  list.innerHTML = "";
  //Parse JSON Data
  parsedData = JSON.parse(data);
  console.log(parsedData);
  var id = "";
  console.log(data);
  //Check if data is valid
  if(parsedData.message ==("Internal server error"))
  {
      window.alert("Internal Server Error")
      return;
  }
  //Define Header
  var HeaderRow = list.insertRow(0);
  var HeadCells = [];
  var HeadInt = 0;
  //Add Data to Header
  for(let column in parsedData[0]){
      HeadCells[HeadInt] = HeaderRow.insertCell();
      HeadCells[HeadInt].textContent = [column];
          HeadInt += 1;
  }
  list.appendChild(HeaderRow);
  //Add Parsed Data to Rows
  x = true;
  for (let row in parsedData) {
      console.log(parsedData[row]);
      //var li = document.createElement("row"+row);
      var TRow = list.insertRow(row);
      var cells = [];
      var tempInt = 0;
      for(let column in parsedData[row]){
          //var col = li.insertCell(column);
          //const newCell = document.createElement("row").insertCell();
          //newCell.textContent = column;
          //cells[tempInt] = TRow.insertCell(parsedData[row][column]);
          //cells[tempInt].innerHTML = parsedData[row].ConnectionType;
          cells[tempInt] = TRow.insertCell();
          cells[tempInt].textContent = parsedData[row][column];
          tempInt += 1;
      }
      list.appendChild(TRow);
    }
  // for (let column in parsedData[0]){
      
  // }

  // for (let i in parsedData)
  // {
  //     id = "SerialNumber"+i
  //     document.getElementById(id).innerHTML += parsedData[i].SerialNumber;
  // }
  }
function encodeQuery(data) {
  let query = ""
  for (let d in data)
      query += encodeURIComponent(d) + '='
          + encodeURIComponent(data[d]) + '&'
  return query.slice(0, -1)
}
function testAPI(){
  var url = "https://n6uac60or4.execute-api.eu-west-1.amazonaws.com/beta/"
  //var query = encodeQuery();
  
  // add content type header to object
  const headers = {
      "Content-Type": "application/json"
  };
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
  };
  givenUrl = "https://n6uac60or4.execute-api.eu-west-1.amazonaws.com/beta/query1"
  console.log(requestOptions,givenUrl);
  // make API call with parameters and use promises to get response
  fetch(givenUrl, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('Test API Error', error));
}
function TableHide(TableVar){
  $("#"+TableVar).hide("slow");
  console.log("Hide "+TableVar+" List Complete")
}
function TableShow(TableVar){
  $("#"+TableVar).show("slow");
}
function CSVParse(line){
  let object = {};
  var skipHeader = false;
  var i =0;
  for (var data of line)
  {
    object[i]=data;
    i++;
  }
  if (Object.keys(object)[0] == "0")
  {
    if ((String(object["0"]) == "") || (String(object["0"]) == "Serial Number")){ console.log("Skip Line"); return;}
    console.log(object);
    TestAPIPost(object);
    console.log("Line Parse Complete");
  }
}
function ProductSelect(ProductSelect){
  ProductVariant = document.getElementById("ProductVariant");
  ProductCode = document.getElementById("ProductCode");
  if(ProductSelect.value == "LIDoTT SMART V1")
  {
    switch(ProductVariant.value) {
      default:
        ProductCode.value = "P131-1";
    }
  }
  if(ProductSelect.value == "LIDoTT SMART V2")
  {
    switch(ProductVariant.value) {
      case "A":
        ProductCode.value = "P131-SRT-A-2";
        break;
      case "B":
        ProductCode.value = "P131-SRT-B-2";
        break;
      case "C":
        ProductCode.value = "P131-SRT-C-2";
        break;
      default:
        ProductCode.value = "Invalid Product";
    }
  }
  if(ProductSelect.value == "LIDoTT ALARM")
  {
    switch(ProductVariant.value) {
      case "A":
        ProductCode.value = "P134-2-A";
        break;
      case "B":
        ProductCode.value = "P134-2-B";
        break;
      case "C":
        ProductCode.value = "P134-2-C";
        break;
      case "D":
        ProductCode.value = "P134-2-D";
        break;
      default:
        ProductCode.value = "Invalid Product";
    }
  }
  if(ProductSelect.value == "NONE"){
    document.getElementById("ProductCode").value = "Invalid Product";
  }
  const barColors = ["red","blue","green","gray"];
var DeviceTypeValues = []
function RenderDeviceType(){
  new Chart("DeviceTypeChart", {
  type: "doughnut",
  data: {
    labels: ["Alarm", "Smart"],
    datasets: [{
    backgroundColor: barColors,
    data: DeviceTypeValues
    }]
  },
  options: {
      title: {
      display: true,
      text: "Device Type Testing Breakdown"
      }
  }
  });
}
var PassFailData = []
  function RenderPassFail(){
    new Chart("PassFailChart", {
    type: "bar",
    data: {
      labels: ["Pass", "Fail"],
      datasets: [{
      backgroundColor: ["green","red"],
      data: PassFailData
      }]
    },
    options: {
        scales: {
          yAxes: [{
              ticks: {
                    beginAtZero:true
                }
          }]
        },
        title: {
        display: true,
        text: "Device Testing Results Breakdown"
        },
        legend: {
                display: false
        }        
    }
  });
}
var testHistoryDates = []
var testHistoryUnits = []
function RenderTestHistory(){
  //get data from database
  new Chart("TestHistoryChart", {
  type: "line",
  data: {
    labels: testHistoryDates,
    datasets: [{
      backgroundColor: 'rgba(154, 52, 235, 0.5)',
      data: testHistoryUnits
    }]
  },
  options: {
      title: {
      display: true,
      text: "Device Testing History"
      },
      legend: {
              display: false
      },
      elements:{ 
        point:{
          radius:5
        }
      }
  }
});
}
function DashboardPress(event,text)
{
  openTab(event, text,"Click");
  RefreshGraphs();
}
function RefreshGraphs()
{
  RenderDeviceType();
  RenderPassFail();
  RenderTestHistory();
}
async function GetPage()
{
  //if page is dashboard or default
  var currentUrl = (window.location.href);
  console.log(currentUrl);
  //scrub base url then split by & to just get the chosen page
  var currentParams = (currentUrl.replace("https://main.d23gwgub2u9aya.amplifyapp.com","")).replace("/","").replace("#","").split("+");
  var currentPage = currentParams[0];
  switch(currentPage) {
    case "Testing":
      currentPage = "RigData"
      break;
    case "Returns":
      currentPage = "ReturnsData"
      break;
    default:
      currentPage = "Dashboard"
      break;
  }
  await openTab(null,currentPage,"Reload");
  if (currentPage == "Dashboard")
  {
    var databaseChosen = "";
    var dateTimeChosen = "";
    if(currentParams.length == 3)
    {
      databaseChosen=currentParams[1];
      dateTimeChosen=currentParams[2];
    }
    //parse testing or returns & datetime period chosen
    await GetGraphData(databaseChosen, dateTimeChosen);
    //else do nothing
    RefreshGraphs();
  }
}
async function GetGraphData(DatabaseChosen,DatetimeChosen)
{
  //Get selected database
  var DataBase = "";
  switch(DatabaseChosen) {
    case "Testing":
      DataBase = "RigData"
      break;
    case "Returns":
      DataBase = "ReturnsData"
      break;
    default:
      DatabaseChosen = "Testing";
      DataBase = "RigData";
      break;
  }

  switch(DatetimeChosen) {
    case "Daily":
      DatetimeChosen = "Daily"
      break;
    case "Weekly":
      DatetimeChosen = "Weekly"
      break;
    case "Monthly":
      DatetimeChosen = "Monthly"
      break;
    case "Yearly":
      DatetimeChosen = "Yearly"
      break;
    default:
      DatetimeChosen = "Weekly";
      break;
  }
  //Update URL with new values
  await UpdateURL(DatabaseChosen,DatetimeChosen)
  //Call Graph API
  await GraphDataAPI(DataBase,DatetimeChosen);
}
async function GraphDataAPI(Database, Timescale)
{
  var url = "https://n6uac60or4.execute-api.eu-west-1.amazonaws.com/beta/";
  var json = {"Database":Database,"Dashboard":Timescale};
  
  var query = encodeQuery(json);
  givenUrl = url +"dashboard?"+ query;
  // add content type header to object
  const headers = {
      "Content-Type": "application/json"
  };
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
  };
  // make API call with parameters and use promises to get response
  await fetch(givenUrl, requestOptions)
  .then(response => response.text())
  .then(result => GraphAPIParse(result))
  .catch(error => console.log('Filter API Error', error));
}  
function GraphAPIParse(dataRaw){
  console.log(dataRaw)
  dataFormat = dataRaw.replaceAll("[","").replaceAll("\"","").replaceAll("\'","").replaceAll("\"","")
  dataSplit = dataFormat.split("]")[0];
  dataSplitValues = dataSplit.split(",")
  var dataValuesParse = [];
  for(let i = 0;i< dataSplitValues.length; i++){
    dataValuesParse[i] = parseInt(dataSplitValues[i]);
  }
  DeviceTypeValues = [dataValuesParse[0],dataValuesParse[1]];
  PassFailData = [dataValuesParse[2],dataValuesParse[3]];
  var dataTimestampsPre = dataFormat.replaceAll(",","").split("]");
  dataTimestamps = dataTimestampsPre.slice(1,(dataTimestampsPre.length-2))

  for(let i = 0;i< dataTimestamps.length; i++){
    var tempTimestamps = dataTimestamps[i].split(" ").slice(1)
    testHistoryDates[i] = tempTimestamps[0];
    testHistoryUnits[i] = parseInt(tempTimestamps[1]);
  }
  
  if(testHistoryDates.length == 0){window.alert("No Data for selected filter"); ChartDiv.style.display='none'; ChartError.style.display='block'; return;}
  console.log(DeviceTypeValues)
  console.log(PassFailData)
  console.log(testHistoryDates)
  console.log(testHistoryUnits)
}
function DateTimeChange(){
  var text = timescale.options[timescale.selectedIndex].text;
  UpdateURL("",text)
}
function TestReturnPress(context){
  switch(context) {
    case 'Testing':
      if (!(TestingDBButton.className.includes(" active"))){
      TestingDBButton.className += " active";
      ReturnsDBButton.className = ReturnsDBButton.className.replace(" active", "");
      UpdateURL("Testing","");
      }
      break;
    case 'Returns':
    if (!(ReturnsDBButton.className.includes(" active"))){
      ReturnsDBButton.className += " active";
      TestingDBButton.className = TestingDBButton.className.replace(" active", "");
      UpdateURL("Returns","");
      }
      break;
    default:
      if (!(TestingDBButton.className.includes(" active"))){
      TestingDBButton.className += " active";
      ReturnsDBButton.className = ReturnsDBButton.className.replace(" active", "");
      UpdateURL("Testing","");
      }
  }
}
function UpdateURL(database,datetime)
{
  var currentUrl = (window.location.href);
  var currentParams = (currentUrl.replace("https://main.d23gwgub2u9aya.amplifyapp.com","")).replace("/","").replace("#","").split("+");
  var databaseChosen = ""
  if(currentParams.length == 3)
  {
    databaseChosen=currentParams[1];
    var dateTimeChosen=currentParams[2];
    if(database != ""){if(database == ""){database = "Testing"}databaseChosen = database}
    if(datetime != ""){if(datetime == ""){datetime = "Weekly"}dateTimeChosen = datetime}
  }
  
  var setUrl = "https://main.d23gwgub2u9aya.amplifyapp.com/#Dashboard"+"+"+databaseChosen+"+"+dateTimeChosen;
  window.location.href=setUrl;
}
function FileUpdateCall(){
  document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
          worker: true,
          step: function(results) {
            CSVParse(results.data)
          },
          complete: function() {
              window.alert('CSV file successfully processed');
          },
          error: function(error) {
              window.alert('Error parsing CSV:', error);
          }
        }
      );
    }
  });
}

function OnAppearing()
{
  GetPage();
  //FileUpdateCall();
  //TableHide("UnListTest")
}
}