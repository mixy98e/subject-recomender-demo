function onloadBody() {
  loadSubjectsTables();
  loadModulesTables();
  resetPredictionResultTable();

  resetAlerts();

  document.querySelector(".subject-data-cont").style.display = "none";
  document.querySelector(".module-data-cont").style.display = "block";

  document.querySelector(".inp-chs-module-id").style.display = "none";
}


let inputTypes = [ 
  'Module', 
  'Subject 1', 
  'Subject 2', 
  'Subject 3',
  'Module subjects pair',
  'No more objects...'
];

let mockApiResponse = {
  prediction: 0,
  score: [0],
};

let subjects = [
  "3MRZ1I33,Request Engineering,4",
  "3MRZ1I02,Intelligent Systems,4",
  "3MRZ1I01,Advanced Software Engineering,4",
  "3MRZ1I03,Geographic Information Systems,4",
  "3MRZ1I04,Advanced Web Technologies,4",
  "3MRZ1I05,Advanced Operating Systems,4",
  "3MRZ1I06,Information Interoperability and Integration,4",
  "3MRZ1I07,Computer animation,4",
  "3MRZ1I08,Requirements Engineering,4",
  "3MRZ1I09,Computer Network Security,4",
  "3MRZ1I10,Design and implementation of secure software,4",
  "3MRZ1I11,Digital Forensics,4",
  "3MRZ1I12,Cloud Computing,4",
  "3MRZ1I13,Virtualization,4",
  "3MRZ1I14,System Administration,4",
  "3MRZ1I15,Cryptography,4",
  "3MRZ1I16,High Performance Computing,4",
  "3MRZ1I17,Computer simulation,4",
  "3MRZ1I18,Application of multivalued logic in the representation and processing of discrete signals,4",
  "3MRZ1I19,Semantic Web,4",
  "3MRZ1I20,Image processing methods and techniques,4",
  "3MRZ1I21,Medical Information Systems,4",
  "3MRZ1I22,Advanced Educational Technologies,4",
  "3MRZ1I23,Command and control information systems,4",
  "3MRZ1I24,Techniques and methods of data analysis,4",
  "3MRZ1I25,Large Data Processing and Analysis Systems,4",
  "3MRZ1I26,Web Mining,4",
  "3MRZ1I27,Pattern Recognition,4",
  "3MRZ1I28,Data Visualization,4",
  "3MRZ1I29,Optimization Methods,4",
  "3MRZ1I30,Machine learning,4",
];

let modules = [
  "MOD01CS,Software engineering",
  "MOD02CS,Safety of computer systems",
  "MOD03CS,Information systems and technology",
  "MOD04CS,Data engineering",
];

let moduleDependentSubjects = [
  [
    "2MRZISI1,Database management systems",
    "2MRZISI2,Intelligent transport systems",
    "2MRZISI3,Ubiquitous computing",
    "2MRZISI4,Virtual and augmented reality systems"
  ],
  [
    "2MRZIBRS1,High reliability systems",
    "2MRZIBRS2,Algorithms and architectures of specialized computer systems",
    "2MRZIBRS3,Computer-based sensor systems",
    "2MRZIBRS4,Blockchain technology"
  ],
  [
    "2MRZIIST1,Spectral techniques",
    "2MRZIIST2,2MRZIIST1,Advanced techniques in 3D modeling and animation",
    "2MRZIIST3,Intelligent information systems",
    "2MRZIIST4,Fuzzy logic"
  ],
  [
    "2MRZIIP1,Natural language processing",
    "2MRZIIP2,Analysis of social networks",
    "2MRZIIP3,Business intelligence",
    "2MRZIIP4,Deep learning"
  ]
];


function getSubjectByIndex(index, part = "all") {
  if(part === "all")
    return modules[index - 1];
  if(part >= 0 && part <= 2)
    return subjects[index - 1].split(",")[part];
  return null;
}


function getModulesByIndex(index, part = "all") {
  if(part === "all")
    return modules[index - 1];
  if(part >= 0 && part <= 1)
    return modules[index - 1].split(",")[part];
  return null
}

function getModuleDependentSubjectByModuleByIndex(moduleIndex, subjectIndex, part = "all") {
  if(part === "all")
    return moduleDependentSubjects[moduleIndex - 1][subjectIndex - 1];
  if(part >= 0 && part <= 1)
    return moduleDependentSubjects[moduleIndex - 1][subjectIndex - 1].split(",")[part];
  return null;
}


let inputFormStructure = {
  type: "Module",
  gender: "",
  age: 0,
  averageGrade: 0,
  finalGrade: 0,
  numberOfYearsStudied: 0,
  studyStartYear: 0,
  averageNumberOfTestTaken: 0,
  maximumNumberOfTestTaken: 0,
  averageNumberOfOverflowExams: 0,
  chosenModuleID: 0,
};


function setInputParameter(event) {
  console.log(event);
  console.log(event.name, event.option);
  console.log(inputFormStructure);
  inputFormStructure[event.name] = event.value;
  console.log(inputFormStructure);
}


function setTypeInputParameter(event) {
  console.log(event);
  console.log(event.value);
  console.log(inputFormStructure);
  inputFormStructure["type"] = event.value;
  if (event.value === "Module")
    document.querySelector(".inp-chs-module-id").style.display = "none";
  else document.querySelector(".inp-chs-module-id").style.display = "block";

  console.log(inputFormStructure);
}


function requestRecommendation(event) {
  console.log("Recommendation api called");
  callRecommendationService(inputFormStructure.type);
}


function loadSubjectsTables() {
  let tblBody = document.querySelector(".subject-table-body-data");
  tblBody.innerHTML = "";

  subjects.forEach((el, index) => {
    let rowData = el.split(",");
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    cell.appendChild(document.createTextNode(index + 1));
    row.appendChild(cell);
    cell = document.createElement("td");
    cell.appendChild(document.createTextNode(rowData[0]));
    row.appendChild(cell);
    cell = document.createElement("td");
    cell.appendChild(document.createTextNode(rowData[1]));
    row.appendChild(cell);
    cell = document.createElement("td");
    cell.appendChild(document.createTextNode(rowData[2]));
    row.appendChild(cell);
    tblBody.appendChild(row);
  });
}


function loadModulesTables() {
  let tblBody = document.querySelector(".module-table-body-data");
  tblBody.innerHTML = "";

  modules.forEach((el, index) => {
    let rowData = el.split(",");
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    cell.appendChild(document.createTextNode(index + 1));
    row.appendChild(cell);
    cell = document.createElement("td");
    cell.appendChild(document.createTextNode(rowData[0]));
    row.appendChild(cell);
    cell = document.createElement("td");
    cell.appendChild(document.createTextNode(rowData[1]));
    row.appendChild(cell);
    tblBody.appendChild(row);
  });
}


function setSourceDataTableView(event) {
  console.log(event.value);
  if (event.value === "Subjects") {
    document.querySelector(".subject-data-cont").style.display = "block";
    document.querySelector(".module-data-cont").style.display = "none";
  } else {
    document.querySelector(".subject-data-cont").style.display = "none";
    document.querySelector(".module-data-cont").style.display = "block";
  }
}


function getSubEndPoint(type) {
  if (type === "Module") return "m";
  else if (type === "Subject 1") return "s1";
  else if (type === "Subject 2") return "s2";
  else if (type === "Subject 3") return "s3";
  else if (type === "Module subjects pair") return "mds";
  else return "";
}


function callRecommendationService(type) {
  let moduleParam = -1;
  if (getSubEndPoint(type) === "mds" && lastPredictedModuleId != -1) {
    moduleParam = lastPredictedModuleId
  } else if (getSubEndPoint(type) === "mds" && lastPredictedModuleId == -1) {
    failedRequest("Valid module ID needed for module dependent subject prediction!");
  }

  fetch("https://localhost:5551/" + getSubEndPoint(type), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{
              "id": -1,
              "gender": "${inputFormStructure.gender}",
              "age": ${inputFormStructure.age},
              "averagE_GRADE": ${inputFormStructure.averageGrade},
              "finaL_GRADE": ${inputFormStructure.finalGrade},
              "numbeR_OF_YEARS_STUDIED": ${inputFormStructure.numberOfYearsStudied},
              "yeaR_STUDY_START": ${inputFormStructure.studyStartYear},
              "averagE_TEST_TAKEN": ${inputFormStructure.averageNumberOfTestTaken},
              "maX_TEST_TAKEN": ${inputFormStructure.maximumNumberOfTestTaken},
              "averagE_OVERFLOW_EXAM": ${inputFormStructure.averageNumberOfOverflowExams},
              "chooseN_MODULE_ID": ${moduleParam}
            }`,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      successfullRequest("Recommendation action successfully to executed!");
      processRecommenderResponseData(type, data);
      invokeExternalIndex("progressNext");
    })
    .catch((error) => {
      console.error("Error:", error);
      failedRequest("Recommendation action failed to execute!");
    });
}


function failedRequest(text) {
  let alertItems = document.querySelectorAll(".alert-danger");
  alertItems.forEach(el => {
    el.innerHTML = text;
    el.hidden = false;
    setTimeout(() => {
      el.hidden = true;
    }, 2000);
  })
}


function successfullRequest(text) {
  let alertItems = document.querySelectorAll(".alert-primary");
  alertItems.forEach(el => {
    el.innerHTML = text;
    el.hidden = false;
    setTimeout(() => {
      el.hidden = true;
    }, 2000);
  })
}

function resetAlerts() {
  let alertsErr = document.querySelectorAll(".alert-danger");
  let alertsScs = document.querySelectorAll(".alert-primary");
  alertsErr.forEach(el => el.hidden = true);
  alertsScs.forEach(el => el.hidden = true);
}


/*------------------------------------------
RECOMMENDATION DATA MODEL
------------------------------------------*/

// {
//   "prediction": 2,
//   "score": [
//       0.31225547,
//       0.28551683,
//       0.19202355,
//       0.2102042,
//       ...
//   ]
// }


function processRecommenderResponseData(objType, data) {
  selectNextStageOption();
  let objectType = objType;
  let objectId = data.prediction;
  // let objectName = objType === 'Module' ? 
  //                 getModulesByIndex(data.prediction, 1) :
  //                 getSubjectByIndex(data.prediction, 1);

  let maxScore = calculateMaximumScore(data.score);
  let averageScore = calculateAverageScore(data.score);
  let minScore = calculateMinimumScore(data.score);

  let objectId_secondary;
  let objectName_secondary;

  console.log(objType)

  if ( objType === 'Module'){
    objectName = getModulesByIndex(data.prediction, 1);
  }
  else if ( objType === 'Module subjects pair') {
    objectId = data.prediction % 10;
    objectName = getModuleDependentSubjectByModuleByIndex(lastPredictedModuleId, objectId, 1);
    objectId_secondary = (data.prediction - (data.prediction % 10)) / 10;
    objectName_secondary = getModuleDependentSubjectByModuleByIndex(lastPredictedModuleId, objectId_secondary, 1);
    loadPredictionResultInDatatable(objType,
                                    objectId_secondary,
                                    objectName_secondary,
                                    maxScore,
                                    averageScore,
                                    minScore);
    invokeExternalIndex("progressNext");
  }
  else {
    objectName = getSubjectByIndex(data.prediction, 1);
  }
    
  if( objType === 'Module') {
    lastPredictedModuleId = data.prediction;
  }

  loadPredictionResultInDatatable(objType,
                                  objectId,
                                  objectName,
                                  maxScore,
                                  averageScore,
                                  minScore);
}


function calculateAverageScore(array) {
  let sum = 0;
  array.forEach(el => {
    sum += el;
  });
  return sum / array.length;
}


function calculateMaximumScore(array) {
  if(array.length > 0) {
    let maxEl = array[0];
    array.forEach(el => {
      if(el > maxEl)
        maxEl = el;
    });
    return maxEl;
  }
  return null;
}


function calculateMinimumScore(array) {
  if(array.length > 0) {
    let minEl = array[0];
    array.forEach(el => {
      if(el < minEl)
        minEl = el;
    });
    return minEl;
  }
  return null;
}


function resetPredictionResultTable() {
  let tblBody = document.querySelector(".table-body-data");
  tblBody.innerHTML = "";
  lastPredictedModuleId = -1;
}


function loadPredictionResultInDatatable(type, id, name, max, avg, min) {
  let tblBody = document.querySelector(".table-body-data");
  let row = document.createElement("tr");
  let cell = document.createElement("td");
  cell.appendChild(document.createTextNode(type));
  row.appendChild(cell);
  cell = document.createElement("td");
  cell.appendChild(document.createTextNode(id));
  row.appendChild(cell);
  cell = document.createElement("td");
  cell.appendChild(document.createTextNode(name));
  row.appendChild(cell);
  cell = document.createElement("td");
  cell.appendChild(document.createTextNode(max));
  row.appendChild(cell);
  cell = document.createElement("td");
  cell.appendChild(document.createTextNode(avg));
  row.appendChild(cell);
  cell = document.createElement("td");
  cell.appendChild(document.createTextNode(min));
  row.appendChild(cell);
  tblBody.appendChild(row);
}


let lastPredictedModuleId = -1;


function invokeExternalIndex(externalFunctionName) {
  switch (externalFunctionName) {
    case 'progressNext':
      document.getElementById("js-index-merge-progress-next").click()
      break;
    
    case 'progressPrev' :
      document.getElementById("js-index-merge-progress-next").click()
      break;

    default: break;
  }
  console.log('External function: -> ' + externalFunctionName + '() has been invoked');
}


let type = 0;

function selectNextStageOption() {
  type++;
  document.querySelector('#exampleFormControlSelect1').value = inputTypes[type]
  inputFormStructure.type = inputTypes[type];
}