/*********(main-hoolder-function)************* */
const Add_Employee = document.querySelector(".add_Employee");
const Update_Employee = document.querySelector(".update_Employee");
const Employee_T = document.querySelector(".Employee-T");
const database = new Localbase("database");







/********************************************************************************* */
/***************(1) Add Employee function******************/
Add_Employee.addEventListener("submit", (e) => {
  e.preventDefault();

  let firstName = e.target.firstName.value.trim(),
      lastName = e.target.lastName.value.trim(),
      email = e.target.email.value.trim();

  if (firstName !== "" && lastName !== "" && email !== "") {
    enter_data_Emp(firstName, lastName, email);
    setTimeout(() => (window.location = "index.html"), 100);
  }
});



/***************(2)Updata Employee function******************/
Update_Employee.addEventListener("submit", (e) => {
  e.preventDefault();
  let userID = e.target.userID.value.trim(),
      firstName = e.target.firstName.value.trim(),
      lastName = e.target.lastName.value.trim(),
      email = e.target.email.value.trim();

  if (firstName !== "" && lastName !== "" && email !== "") {
    updata_Emp(userID, firstName, lastName, email);
    setTimeout(() => (window.location = "index.html"), 100);
  }
});

//callback Show_Emp_data function  
Show_Emp_data(Employee_T);





/************(navbar-tap)************* */
const navTabs = document.querySelectorAll("#main-navbar .nav-link");
const tabsContent = document.querySelectorAll(".TabContent .TabPanel");

navTabs.forEach((link, index) => {
  link.addEventListener("click", () => {
    navTabs.forEach((link, inx) => {
      link.classList.remove("active");
      tabsContent[inx].classList.remove("active", "show");
    });

    link.classList.add("active");
    tabsContent[index].classList.add("active", "show");
  });
});



/************(enter data to add employee)************ */
function enter_data_Emp(firstName, lastName, email) {
  database.collection("users").add({
    id: Math.floor(Math.random() * 34252),
    firstName: firstName,
    lastName: lastName,
    email: email,
  });
}




/*********** enter Data Update in database **************/
function updata_Emp(userID, firstName, lastName, email) {
  database
    .collection("users")
    .doc({ id: +userID })
    .update({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
}




/******** Move to updata tab Function ***********/
function moveToOtherTab(id) {
  const navTabs = document.querySelectorAll(".main-navbar .nav-link");
  const tabsContent = document.querySelectorAll(".TabContent .TabPanel");

  navTabs.forEach((link, inx) => {
    link.classList.remove("active");
    tabsContent[inx].classList.remove("show", "active");

    link.addEventListener("click", () => {
      setTimeout(() => (window.location = "index.html"), 100);
    });
  });

  Add_Employee.classList.add("hide-show");
  Update_Employee.classList.remove("hide-show");

  navTabs[1].classList.add("active");
  tabsContent[1].classList.add("show", "active");

  // Get selected user data values to inputs
  database
    .collection("users")
    .doc({ id: +id })
    .get()
    .then((user) => {
      Update_Employee.userID.value = user.id;
      Update_Employee.firstName.value = user.firstName;
      Update_Employee.lastName.value = user.lastName;
      Update_Employee.email.value = user.email;
    });
}






/****************  (3) Delete Function  *************************/
function Delete_Emp(id) {
  database
    .collection("users")
    .doc({ id: +id })
    .delete();

  setTimeout(() => (window.location = "index.html"), 100);
}








/************* Show updata form *******/
function Show_Emp_data(list) {
  database
    .collection("users")
    .get()
    .then((users) => {
      const dataList = list.querySelector(".table-data");

      const data = users.map((user) => {
        return `
          <tr>
            <td class="add">${user.firstName}</td>
            <td>${user.lastName}</td>
            <td class="add">${user.email}</td>
            <td>
              <button class="btn btn-danger" data-delid=${user.id}>Delete</button>
              <button class="btn btn-info text-light" data-updateid=${user.id}>Update</button>
            </td>
          </tr>
      `;
      });

      if (data.length) {  dataList.innerHTML = data.join("");
      }else {
        list.parentElement.querySelector( ".messege")
        .innerHTML = `<div class='text-center p-2'>has no employee to show</div>`;
      }
    });



  // Delete Empployee by id
  setTimeout(() => {
    const delBtns = document.querySelectorAll("[data-delid]");

    delBtns.forEach((button) => {
      button.addEventListener("click", () => {  Delete_Emp(button.dataset.delid); }); });
  }, 100);

  // Update Empployee by id 
  setTimeout(() => {
    const updateBtns = document.querySelectorAll("[data-updateid]");

    updateBtns.forEach((button) => {
      button.addEventListener("click", () => {  moveToOtherTab(button.dataset.updateid); }); });
  }, 100);
}
