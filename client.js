console.log('js ready');
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
    //display the employees array
    displayAllEmployees();
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
                <td>${employees[i].annualSalary.toLocaleString()}</td>
            </tr>`);
    }
}
