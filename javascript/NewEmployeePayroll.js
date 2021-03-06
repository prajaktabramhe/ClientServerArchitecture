let empPayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
  if (site_properties.use_local_storage.match("true")) {
    getEmployeePayrollDataFromStorage();
  } else getEmployeePayrollDataFromServer();
});

const getEmployeePayrollDataFromStorage = () => {
  empPayrollList = localStorage.getItem("EmployeePayrollList")
    ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
    : [];
  processEmployeePayrollDataResponse();
};

const processEmployeePayrollDataResponse = () => {
  document.querySelector(".emp-count").textContent = empPayrollList?.length;
  createInnerHtml();
  localStorage.removeItem("editEmp");
};

const getEmployeePayrollDataFromServer = () => {
  makeServiceCall("GET", site_properties.server_url, true)
    .then((responseText) => {
      empPayrollList = JSON.parse(responseText);
      processEmployeePayrollDataResponse();
    })
    .catch((error) => {
      console.log("GET Error Status: " + JSON.stringify(error));
      empPayrollList = [];
      processEmployeePayrollDataResponse();
    });
};

const createInnerHtml = () => {
  if (empPayrollList?.length == 0) return;
  const headerHtml =
    "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>start Date</th><th>Actions</th></tr>";
  let innerHtml = `${headerHtml}`;
  for (const empPayrollData of empPayrollList) {
    innerHtml = `${innerHtml}
        <tr>
        <td><img class="profile" src="${
          empPayrollData._profilePic
        }"  alt=""></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${stringifyDate(empPayrollData._startDate)}</td>
        <td>
            <img id="${
              empPayrollData.id
            }" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
            <img id="${
              empPayrollData.id
            }" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit" >
        </td>
    </tr>`;
  }
  document.querySelector("#display").innerHTML = innerHtml;
};

const getDeptHtml = (deptList) => {
  let deptHtml = "";
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
  }
  return deptHtml;
};

//remove function
const remove = (node) => {
  // console.log("harsha69", node.id, "harsha70",node.id);
  let empPayrollData = empPayrollList.find((empData) => empData.id == node.id);
  // console.log("Harsha72",empPayrollData);
  if (!empPayrollData) return;
  const index = empPayrollList
    .map((empData) => empData.id)
    .indexOf(empPayrollData.id);
  empPayrollList.splice(index, 1);
  if (site_properties.use_local_storage.match("true")) {
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList?.length;
    createInnerHtml();
  } else {
    let methodType = "DELETE";
    const deleteURL = site_properties.server_url + empPayrollData.id.toString();
    makeServiceCall(methodType, deleteURL, true)
      .then((responseText) => {
        createInnerHtml();
      })
      .catch((error) => {
        console.log("DELETE Error Status: " + JSON.stringify(error));
      });
  }
};
const update = (node) => {
  // let empPayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  // console.log("check id", node.id);
  let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
  console.log("check update function", empPayrollData);
  if (!empPayrollData) return;
  localStorage.setItem("editEmp", JSON.stringify(empPayrollData));
  window.location.replace("../pages/EmployeePayrollApp.html");
};
