
function onloadBody() {
  loadSubjectsTables();
  loadModulesTables();

  document.querySelector(".subject-data-cont").style.display = 'none';
  document.querySelector(".module-data-cont").style.display = 'block';

  callRecommendationService()
};

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
  "Software engineering",
  "Safety of computer systems",
  "Information systems and technology",
  "Data engineering",
];

function getSubjectByIndex(index) {
  return subjects[index - 1];
};

function getModulesByIndex(index) {
  return modules[index - 1];
};

let inputFormStructure = {
    type: "",
    gender: "",
    age: 0,
    averageGrade: 0,
    finalGrade: 0,
    numberOfYearsStudied: 0,
    studyStartYear: 0,
    averageNumberOfTestTaken: 0,
    maximumNumberOfTestTaken: 0,
    averageNumberOfOverflowExams: 0,
    chosenModuleID: 0
};

function setInputParameter(event) {
    console.log(event);
    console.log(event.name, event.option);
    console.log(inputFormStructure);
    inputFormStructure[event.name] = event.value;
    console.log(inputFormStructure);
};

function setTypeInputParameter(event) {
    console.log(event);
    console.log(event.value);
    console.log(inputFormStructure);
    inputFormStructure['type'] = event.value;
    console.log(inputFormStructure);
};

function requestRecommendation(event) {
    console.log('Recommending api called');
};


function loadSubjectsTables() {
  let tblBody = document.querySelector(".subject-table-body-data");
  tblBody.innerHTML = "";

  subjects.forEach((el, index) => {
    let rowData = el.split(",") 
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
};

function loadModulesTables() {
  let tblBody = document.querySelector(".module-table-body-data");
  tblBody.innerHTML = "";

  modules.forEach((el, index) => {
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    cell.appendChild(document.createTextNode(index + 1));
    row.appendChild(cell);
    cell = document.createElement("td");
    cell.appendChild(document.createTextNode(el));
    row.appendChild(cell);
    tblBody.appendChild(row);
  });
};

function setSourceDataTableView(event) {
  console.log(event.value);
  if(event.value === 'Subjects'){
    document.querySelector(".subject-data-cont").style.display = 'block';
    document.querySelector(".module-data-cont").style.display = 'none';
  } else {
    document.querySelector(".subject-data-cont").style.display = 'none';
    document.querySelector(".module-data-cont").style.display = 'block';
  }
};

function getSubEndPoint(type){
  if(type === "Module")
    return 'm';
  else if(type === "Subject 1")
    return 's1';
  else if(type === "Subject 2")
    return 's2';
  else if(type === "Subject 3")
    return 's3';
  else return '';
}

function callRecommendationService(type = 'Module'){
  console.log('fetch', type)
  fetch('https://localhost:5551/' + getSubEndPoint(type), {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
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
              "chooseN_MODULE_ID": -1
            }`,
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      // let tmpAdr = { value: address };
      // onchangeAccSrc(tmpAdr);
      // SuccessfullRequest("Withdraw action successfully to executed!");
  })
  .catch((error) => {
      console.error('Error:', error);
      // failedRequest("Withdraw action failed to execute!");
  });
}

