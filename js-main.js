// NEED TO ADJUST FUNCTION TO EDIT ENTRY TO OPEN MODAL AND POPULATE ENTRY


// Select Elements
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const expenseTotalEl = document.querySelector(".expense-total");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");
const incomeModal = document.querySelector(".modal-container-income");
const expenseModal = document.querySelector(".modal-container-expense");

// Select Btns
const incomeBtn = document.querySelector(".tab1");
const expenseBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");
const addBtnIncome = document.getElementById("add-btn-income");
const addBtnExpense = document.getElementById("add-btn-expense");
const closeBtnIncome = document.querySelector(".close1");
const closeBtnExpense = document.querySelector(".close2");

// Input Btns
const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

// Variables
let ENTRY_LIST = [];
let balance = 0, income = 0, outcome = 0;

ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
updateUI();

const DELETE = "delete", EDIT = "edit";

// Event Listeners
// Nav + lists
incomeBtn.addEventListener("click", function () {
    show(incomeEl);  
    hide([expenseEl, allEl, addBtnExpense]);
    active(incomeBtn);
    inactive([expenseBtn, allBtn]);
})
expenseBtn.addEventListener("click", function(){
    show(expenseEl);
    hide([incomeEl, allEl, addBtnIncome]);
    active(expenseBtn);
    inactive([incomeBtn, allBtn]);
})
allBtn.addEventListener("click", function(){
    show(allEl);
    hide([incomeEl, expenseEl, addBtnExpense, addBtnIncome]);
    active(allBtn);
    inactive([incomeBtn, expenseBtn]);
})
// Modal 
addBtnIncome.addEventListener("click", () => {
    incomeModal.classList.add('modal-show');
});
addBtnExpense.addEventListener("click", () => {
    expenseModal.classList.add('modal-show');
});
closeBtnIncome.addEventListener("click", () => {
    incomeModal.classList.remove('modal-show');
});
closeBtnExpense.addEventListener("click", () => {
    expenseModal.classList.remove('modal-show');
});


addExpense.addEventListener("click", function () {
    // IF ONE OF THE INPUTS IS EMPTY => EXIT
    if (!expenseTitle.value || !expenseAmount.value) return;

    // SAVE THE ENTRY TO ENTRY_LIST
    let expense = {
        type: "expense",
        title: expenseTitle.value,
        amount: parseInt(expenseAmount.value)
    }
    ENTRY_LIST.push(expense);

    updateUI();
    clearInput([expenseTitle, expenseAmount])
})
addIncome.addEventListener("click", function () {
    // IF ONE OF THE INPUTS IS EMPTY => EXIT
    if (!incomeTitle.value || !incomeAmount.value) return;

    // SAVE THE ENTRY TO ENTRY_LIST
    let income = {
        type: "income",
        title: incomeTitle.value,
        amount: parseInt(incomeAmount.value)
    }
    ENTRY_LIST.push(income);

    updateUI();
    clearInput([incomeTitle, incomeAmount])
})

incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);

// Helpers
function deleteOrEdit(event) {
    const targetBtn = event.target;

    const entry = targetBtn.parentNode;

    if (targetBtn.id == DELETE) {
        deleteEntry(entry);
    } else if (targetBtn.id == EDIT) {
        editEntry(entry);
    }
}
function deleteEntry(entry) {
    ENTRY_LIST.splice(entry.id, 1);

    updateUI();
}
function editEntry(entry) {
    console.log(entry)
    let ENTRY = ENTRY_LIST[entry.id];

    if (ENTRY.type == "income") {
        incomeModal.classList.add('modal-show');
        incomeAmount.value = ENTRY.amount;
        incomeTitle.value = ENTRY.title;
    } else if (ENTRY.type == "expense") {
        expenseModal.classList.add('modal-show');
        expenseAmount.value = ENTRY.amount;
        expenseTitle.value = ENTRY.title;
    }

    deleteEntry(entry);
}
function show() {
    var hide = Array.prototype.slice.call(document.querySelectorAll(".hide"));

    hide.forEach(function(item) {
        item.classList.remove("hide");
    });
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
function updateUI() {
    income = calculateTotal("income", ENTRY_LIST);
    expense = calculateTotal("expense", ENTRY_LIST);
    balance = Math.abs(calculateBalance(income, expense));


    // // DETERMINE SIGN OF BALANCE
    let sign = (income >= expense) ? "$" : "-$";

    // // UPDATE UI
    balanceEl.innerHTML = `<small>${sign}</small>${balance}`;
    expenseTotalEl.innerHTML = `<small>$</small>${expense}`;
    incomeTotalEl.innerHTML = `<small>$</small>${income}`;

    clearElement([expenseList, incomeList, allList]);

    ENTRY_LIST.forEach((entry, index) => {
        if (entry.type == "expense") {
            showEntry(expenseList, entry.type, entry.title, entry.amount, index)
        } else if (entry.type == "income") {
            showEntry(incomeList, entry.type, entry.title, entry.amount, index)
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    });

    updateChart(income, expense);

    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}
function showEntry(list, type, title, amount, id) {
    const entry = ` <li id = "${id}" class="${type}">
                        <div class="entry">${title}: $${amount}</div>
                        <div class= "entry-buttons">
                            <div id="edit"></div>
                            <div id="delete"></div>
                        <div>
                    </li>`;
    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}
function clearElement(elements) {
    elements.forEach(element => {
        element.innerHTML = "";
    })
}
function calculateTotal(type, list) {
    let sum = 0;

    list.forEach(entry => {
        if (entry.type == type) {
            sum += entry.amount;
        }
    });

    return sum;
}
function calculateBalance(income, expense) {
    return income - expense;
}
function clearInput(inputs) {
    inputs.forEach(input => {
        input.value = "";
    });
}
