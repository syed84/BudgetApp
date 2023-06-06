let expenesArr = [];
let amountArr = 0;

const budget = document.getElementById("budget");
const totalBudget = document.getElementById("totalBudget");

const iCategory = document.getElementById("iCategory");
const iAmount = document.getElementById("iAmount");
const iDate = document.getElementById("iDate");
const subBtn = document.getElementById("subBtn");
const listData = document.getElementById("listData");
const totalExpense = document.getElementById("totalExpense");

let arr = [];
subBtn.addEventListener("click", () => {
    
    let obj = {
        "Expense"  : iAmount.value,
        "Category" : iCategory.value,
        "Date"     : iDate.value
    }
    arr.push(obj);
    localStorage.setItem("Budget Data", JSON.stringify(arr));
    // console.log(iAmount.value, iCategory.value, iDate.value)
    // console.log(uArr);
    // console.log(xyz);


    const category = iCategory.value;
    const amount = Number(iAmount.value);
    const date = iDate.value;

    if (category === "") {
        alert("Please select a category");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid number");
        return;
    }
    if (date === "") {
        alert("Please select a date");
        return;
    }

    expenesArr.push({ category, amount, date });
   
    totalBudget.innerHTML =  "$ "+budget.value;
 
    amountArr += amount;
    totalExpense.textContent = "$ " + amountArr;

    const newRow = listData.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        const index = expenesArr.findIndex(expense => expense.date === dateCell.textContent);
        const expense = expenesArr[index];
        expenesArr.splice(index, 1);

        amountArr -= expense.amount;
        totalExpense.textContent = amountArr;
        
        listData.removeChild(newRow);
        
        updateTable(); 
    });

    const expense = expenesArr[expenesArr.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);

    updateTable(); 

});


updateTable = () => {
    listData.innerHTML = "";
    for (const expense of expenesArr) {
    
        const remainingBalance = budget.value - amountArr;
        const balance = document.getElementById("Remaining-Balance");
        balance.innerHTML = "$ "+remainingBalance;

        const newRow = listData.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            const index = expenesArr.findIndex(item => item.date === dateCell.textContent);
            const expense = expenesArr[index];
            expenesArr.splice(index, 1);

            amountArr -= expense.amount;
            totalExpense.textContent = amountArr;

            listData.removeChild(newRow);

            updateTable(); 
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    }
}



updateTable();