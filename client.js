console.log('js ready');

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

//wait for DOM to load and then run readyNow()
$(document).ready(readyNow);
function readyNow() {
    console.log('DOM loaded');
    //display all employee data to the DOM
    displayAllEmployees();
    displayTotalMonthlyCost();
    $('#submit-button').on('click', addInputData);
}

function displayTotalMonthlyCost() {
    //iterate through employees and add each salary to global variable
    for (let i = 0; i < employees.length; i++) {
        totalMonthlyCost += employees[i].annualSalary;
    }
    $('#total-monthly-cost').empty(); //remove current number
    $('#total-monthly-cost').append(totalMonthlyCost.toLocaleString()); //append new number with commas
}

//display all employee data to the DOM
function displayAllEmployees() {
    //console table for testing
    console.table(employees);
    //iterate through employees array
    for (let i = 0; i < employees.length; i++) {
        //add each employee object property to the table body
        $('#employees-table-body').append(`            
            <tr>
                <td>${employees[i].firstName}</td>
                <td>${employees[i].lastName}</td>
                <td>${employees[i].id}</td>
                <td>${employees[i].title}</td>
                <td>$${employees[i].annualSalary.toLocaleString()}</td>
            </tr>`);
    }
}



//add input field data from DOM to the employees array as an object
function addInputData() {
    console.log('in addInputData');

    employees.push({
        firstName: $('#first-name-input').val(),
        lastName: $('#last-name-input').val(),
        id: $('#id-input').val(),
        title: $('#title-input').val(),
        annualSalary: $('#annual-salary-input').val()
    });

    displayAllEmployees();//display all employee data to the DOM
    clearInputFields(); //clear input field data
}

//clears the data currently listed in the input fields on the DOM
function clearInputFields() {
    $('#first-name-input').val('');
    $('#last-name-input').val('');
    $('#id-input').val('');
    $('#title-input').val('');
    $('#annual-salary-input').val('');
}