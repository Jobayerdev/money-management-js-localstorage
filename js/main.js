// Golobale var
let transactions = {
	income: [],
	expense: []
};

window.addEventListener("load", () => {
	const data = JSON.parse(localStorage.getItem("transactions"));
	transactions.income = [...data.income];
	transactions.expense = [...data.expense];
	upDateDisplay(transactions);
});

//UI Handle
const getAddRecorderPopUp = document.querySelector(".addrecord");
const getPlusesBtn = document.querySelector(".addRecordBtn");
const getCloseBtn = document.querySelector("#close");

getPlusesBtn.addEventListener("click", function(e) {
	e.target.classList.add("hide");
	getAddRecorderPopUp.classList.remove("hide");
});
getCloseBtn.addEventListener("click", function(e) {
	getAddRecorderPopUp.classList.add("hide");
	getPlusesBtn.classList.remove("hide");
	e.preventDefault();
});

//Income Expense
const getSaveBtn = document.querySelector("#save");
const getIncomeName = document.querySelector("#incomeName");
const getIncomeAmount = document.querySelector("#incomeAmount");

const getExpenseName = document.querySelector("#expenseName");
const getExpenseAmount = document.querySelector("#expenseAmount");

getSaveBtn.addEventListener("click", function(e) {
	const currentBlanche = parseFloat(
		document.querySelector("#blance").innerText
	);

	//Income
	const incomeName = getIncomeName.value;
	const incomeAmount = parseFloat(getIncomeAmount.value);
	//Expense
	const expenseName = getExpenseName.value;
	const expenseAmount = parseFloat(getExpenseAmount.value);

	//Validation
	if ((incomeName && incomeAmount) || (expenseName && expenseAmount)) {
		if (incomeName && incomeAmount) {
			const incomeItem = {
				title: incomeName,
				amount: incomeAmount
			};
			transactions.income.push(incomeItem);
		}
		if (expenseName && expenseAmount) {
			if (currentBlanche < expenseAmount) {
				alert("Insufficient Blance");
			} else {
				const expenseItem = {
					title: expenseName,
					amount: expenseAmount
				};
				transactions.expense.push(expenseItem);
			}
		}
		getPlusesBtn.classList.remove("hide");
	} else {
		getExpenseName.value = "";
		getExpenseAmount.value = "";
		alert("Your went to exist ?");
		getAddRecorderPopUp.classList.add("hide");
		getPlusesBtn.classList.remove("hide");
	}
	// CLear State
	getIncomeName.value = "";
	getIncomeAmount.value = "";
	getExpenseName.value = "";
	getExpenseAmount.value = "";
	getAddRecorderPopUp.classList.add("hide");
	upDateDisplay(transactions);
	localStorage.setItem("transactions", JSON.stringify(transactions));
	e.preventDefault();
});

// Display UI
function upDateDisplay(gatTransaction) {
	const getBlanche = document.querySelector("#blance");
	const getIncome = document.querySelector("#income");
	const getExpense = document.querySelector("#expense");

	let getIncomeObj = gatTransaction.income;
	let getExpenseObj = gatTransaction.expense;
	let sumIncome = getIncomeObj.reduce(
		(acc, currentValue) => acc + currentValue.amount,
		0
	);
	let sumExpense = getExpenseObj.reduce(
		(acc, currentValue) => acc + currentValue.amount,
		0
	);

	// Change Inner Text
	getBlanche.innerText = sumIncome - sumExpense;
	getIncome.innerText = sumIncome;
	getExpense.innerText = sumExpense;
	displayTransaction(gatTransaction);
}

//Display Transaction
function displayTransaction(gatTransactionObj) {
	let getIncomeEle = gatTransactionObj.income;
	let getExpenseEle = gatTransactionObj.expense;
	displayIncome(getIncomeEle);
	displayExpense(getExpenseEle);
}

function displayIncome(incomeItem) {
	const getRecordsList = document.querySelector(".income-list");
	const incomeEl = incomeItem.map((x) => {
		const parentEle = document.createElement("div");
		parentEle.innerHTML = `<div class="record">
						<span class="income-icon"><img src="img/salary.svg" alt=""/></span>
						<h4 class="title">${x.title}</h4>
						<h5 class="amount">$${x.amount}</h5>
                    </div>`;
		return parentEle;
	});
	getRecordsList.innerHTML = "";
	incomeEl.forEach((element) => {
		getRecordsList.appendChild(element);
	});
}
function displayExpense(expenseItem) {
	const getRecordsList = document.querySelector(".expense-list");
	const expenseEl = expenseItem.map((x) => {
		const parentEle = document.createElement("div");
		parentEle.innerHTML = `<div class="record">
						<span class="income-icon"><img src="img/budget.svg" alt=""/></span>
						<h4 class="title">${x.title}</h4>
						<h5 class="amount danger">$${x.amount}</h5>
                    </div>`;
		return parentEle;
	});
	getRecordsList.innerHTML = "";
	expenseEl.forEach((element) => {
		getRecordsList.appendChild(element);
	});
}
