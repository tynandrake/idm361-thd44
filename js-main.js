// Left on ADD ENTRY section 14min

// Header
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".expense-total");
const expenseTotalEl = document.querySelector(".income-total");
const chartEl = document.querySelector(".chart");
const expenseEl = document.querySelector("#expense");
const incomeEl = document.querySelector("#income");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

// Tab buttons
const incomeBtn = document.querySelector(".tab1");
const expenseBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

// Add Expense/income
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

let ENTRY_LIST =[];
let balance = 0, income = 0, expense = 0;
const DELETE = "delete", EDIT = "edit";
 
// Event listeners
expenseBtn.addEventListener("click", function () {
    active(expenseBtn);
    inactive([incomeBtn, allBtn]);
    show(expenseEl);
    hide([incomeEl, allEl]);
});
incomeBtn.addEventListener("click", function () {
    active(incomeBtn);
    inactive([expenseBtn, allBtn]);
    show(incomeEl);
    hide([expenseEl, allEl]);
});
allBtn.addEventListener("click", function () {
    active(allBtn);
    inactive([incomeBtn, expenseBtn]);
    show(allEl);
    hide([incomeEl, expenseEl]);
});

// addExpense.addEventListener("click", function() {
//     if(!expenseTitle.value || !expenseAmount.value ) return;

//     let expense = {
//         type : "expense",
//         title : expenseTitle.value,
//         amount : expenseAmount.value
//     }
//     ENTRY_LIST.push(expense);
// })

// addIncome.addEventListener("click", function() {
//     if(!incomeTitle.value || !incomeAmount.value ) return;

//     let income = {
//         type : "income",
//         title : incomeTitle.value,
//         amount : incomeAmount.value
//     }
//     ENTRY_LIST.push(income);
// })

// Functions
function show(element) {
    element.classList.remove("hide");
}
function hide(elementsArray) {
    elementsArray.forEach(element => {
        element.classList.add("hide");
    });
}
function active(element) {
    element.classList.add("active");
}
function inactive(elementsArray) {
    elementsArray.forEach(element => {
        element.classList.remove("active");
    });
}






