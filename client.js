//global variable to hold toal monthly cost of all employee salaries
let totalMonthlyCost = 0;
//initial employees array with pre-entered employee objects
const employees = [
    {
    firstName: 'Jen',
    lastName: 'Barber', 
    id: 4521, 
    title: 'Team Lead', 
    annualSalary: 80000},
    {
    firstName: 'Maurice',
    lastName: 'Moss',
    id: 8724,
    title: 'Support Team',
    annualSalary: 58000
    },
    {
    firstName: 'Roy',
    lastName: 'Smith',
    id: 9623,
    title: 'Quality Assurance',
    annualSalary: 48000
    }
];

/*
--------------------------readyNow() FUNCTION---------------------------------------
 */

//wait for DOM to load and then run readyNow()
$(document).ready(readyNow);
function readyNow() {
    //display all employee data to the DOM
    displayAllEmployees();
    //display total cost of listed employees
    displayTotalMonthlyCost();
    //on submit click, enter input field data to array and DOm
    $('#submit-button').on('click', addInputData);
    //on delete click, remove row from the DOM and update total cost counter
    $('#employees-table-body').on('click', '.delete-button', deleteEmployeeData);
}

/*
-----------------------END readyNow() FUNCTION---------------------------------------
 */


/*
------------------------------DISPLAY FUNCTIONS---------------------------------------
 */

//display all employee data to the DOM
function displayAllEmployees() {
    $('#employees-table-body').empty(); //delete current table data
    //iterate through employees array
    for (let i = 0; i < employees.length; i++) {
        //add each employee object property to the table body
        $('#employees-table-body').append(`            
            <tr>
                <td>${employees[i].firstName}</td>
                <td>${employees[i].lastName}</td>
                <td class ="thisID">${employees[i].id}</td>
                <td>${employees[i].title}</td>
                <td class="thisSalary">$${employees[i].annualSalary.toLocaleString()}</td>
                <td><button class="delete-button">Delete</button></td>
            </tr>`);
    }
    //Alternate row colors for visibility
    //Source: https://stackoverflow.com/questions/3084261/alternate-table-row-color-using-css
    $("tr:even").css("background-color", "#00476D");
    $("tr:odd").css("background-color", "#005980");
}

//calculate and display 
function displayTotalMonthlyCost() {
    let totalAnnualCost = 0; //local annual cost, resets every time function is run

    //iterate through employees and add each salary to local variable
    for (let i = 0; i < employees.length; i++) {
        totalAnnualCost += parseInt(employees[i].annualSalary); //turn all salaries into a number variable
    }

    //monthly cost = annual cost divided by 12, rounded to the nearest integer
    totalMonthlyCost = Math.round(totalAnnualCost / 12);

    //add red color to cost on DOM if over $20k
    if (totalMonthlyCost > 20000) {
        $('#total-monthly-cost').addClass('overCost');
    }
    $('#total-monthly-cost').empty(); //remove current number
    $('#total-monthly-cost').append('$' + totalMonthlyCost.toLocaleString()); //append new number with commas
}

/*
---------------------------END DISPLAY FUNCTIONS---------------------------------------
 */



/*
--------------------------addInputData() FUNCTION---------------------------------------
 */
//add input field data from DOM to the employees array as an object
function addInputData() {
    //ensure all fields are entered before inputting an employee
    if ($('#first-name-input').val() === '' || 
        $('#last-name-input').val() === '' ||
        $('#id-input').val() === '' ||
        $('#title-input').val() === '' ||
        $('#annual-salary-input').val() === ''){
        alert("Please enter all of the required fields.");
    }
    else { //continue with input
        //check to see if an ID is unique with checkEmployeeID(id) function
        if (checkEmployeeID($('#id-input').val()) === false) {
            alert("This ID has already been used. Please enter a unique ID.");
            $('#id-input').val(''); //clear ID field
        }
        else {
            //add input field data to array
            employees.push({
                firstName: $('#first-name-input').val(),
                lastName: $('#last-name-input').val(),
                id: $('#id-input').val(),
                title: $('#title-input').val(),
                annualSalary: $('#annual-salary-input').val()
            });

            //ensure that the annual salary and ID are number variables before leaving the function
            employees[employees.length - 1].annualSalary = Number(employees[employees.length - 1].annualSalary);
            employees[employees.length - 1].id = Number(employees[employees.length - 1].id);

            displayAllEmployees(); //display all employee data to the DOM
            clearInputFields(); //clear input field data
            displayTotalMonthlyCost(); //update total monthly cost
        }
    }
}

/*
-----------------------END addInputData() FUNCTION---------------------------------------
 */



/* 
------------------------------DELETE FUNCTIONS---------------------------------------
 */

//grab the salary from the row(this was HARD!!!) and delete employee data from DOM
function deleteEmployeeData() {
    //find the salary from the row of the button being deleted
    //                  button buttontd   row    search for class    return data
    let annualSalary = $(this).parent().parent().find(".thisSalary").text();
    //track employee ID 
    let employeeID = $(this).parent().parent().find(".thisID").text();

    //remove the employee from the array upon deletion based off of employee ID
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id == employeeID) { // '==' in case the number is a string
            employees.splice(i, 1); //employees.'remove'(at an element, how many)
        }
    }

    //remove the non digit characters from the salary
    annualSalary = annualSalary.replaceAll("$", "").replaceAll(",", "");
    displayCostAfterDelete(annualSalary); //pass in annual salary and display new cost

    $(this).parent().parent().remove(); //deletes entire row
}

//passes in the deleted salary and works similarly to displayTotalMonthlyCost() but subtracts
function displayCostAfterDelete(annualSalary) {
    //convert the salary data into a number
    annualSalary = Number(annualSalary);
    monthlySalary = Math.round(annualSalary / 12);
    totalMonthlyCost -= monthlySalary; //subtract removed salary from the cost

    //if this brings the cost below $20k, remove red background
    if (totalMonthlyCost < 20000) {
        $('#total-monthly-cost').removeClass('overCost');
    }
    //encountered some -1 bugs, this is a fix
    if (totalMonthlyCost < 0) {
        totalMonthlyCost === 0;
    }

    $('#total-monthly-cost').empty(); //remove current number
    $('#total-monthly-cost').append('$' + totalMonthlyCost.toLocaleString()); //append new number with commas
}

/*
--------------------------END DELETE FUNCTIONS---------------------------------------
 */



/*
----------------------------OTHER FUNCTIONS---------------------------------------
 */

//ensure that no two employee IDs are the same
function checkEmployeeID(id) {
    //iterate through employees array
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id == id) { //if matched, return false
            return false;
        }
        else {
            //else, nothing needs to happen
        }
    }
}

//clears the data currently listed in the input fields on the DOM
function clearInputFields() {
    $('#first-name-input').val('');
    $('#last-name-input').val('');
    $('#id-input').val('');
    $('#title-input').val('');
    $('#annual-salary-input').val('');
}

//end of file