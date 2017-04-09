// Course: COMP 420
// Name: Ruichong Liu
// WesMail: rliu01@wesleyan.edu
// Due on: April 9, Midnight

//HTML elements collections
var budgetSheet = document.querySelector('#budget-sheet');
var addItemNameInput = document.querySelector('#new-budget > input[type="text"]');
var addItemNumInput = document.querySelector('#new-budget > input[type="number"]');
var addItemBtn = document.querySelector('#new-budget > button');

//Read data from local storage
var budgetItems = getItemsFromStorage() || [];
function getItemsFromStorage() {
	return JSON.parse(localStorage.getItem('budgetItems'));
}

//Save data to local storage
function saveItemsToStorage(items) {
	localStorage.setItem('budgetItems',items);
}

//Stylish text
function itemTemplate(item, index) {
	return 	`
			<li class="budget-item clearfix">
				<div class="details pull-left">
					<strong class="name">${item["name"]}</strong>
					<span class="money">$${item["money"]}</span>
				</div>
				<form class="form-inline pull-right">
					<input class="form-control"
							type="number"
							placeholder="Amount">
					<button class="btn btn-default"
							data-index=${index} data-type="deduct">
						Deduct
					</button>
					<button class="btn btn-default"
							data-index=${index+100} data-type="add">
						Add
					</button>
				</form>
			</li>
			`
}

//implemention
function render(displayDiv, items) {
	var template = items.map(function(item, index) {
		return itemTemplate(item, index);
	}).join('');
	displayDiv.innerHTML = template;
}

//Generate an object with the two properties given
function generateItemObject(name, money) {
	return {"name":name, "money":money}
}

//Append the object with the two properties to the main array
function addItem(name, money) {
	var temp = generateItemObject(name, money);
	budgetItems.push(temp);
	saveItemsToStorage(JSON.stringify(budgetItems));
	render(budgetSheet, budgetItems);
}

//Deduct certain amount of money from the object at the given index position
function deduct(index, amount) {
	var temp = budgetItems[index];
	temp["money"] -= amount;
	saveItemsToStorage(JSON.stringify(budgetItems));
	render(budgetSheet, budgetItems);
}

function add(index, amount) {
	var temp = budgetItems[index];
	temp["money"] += amount;
	saveItemsToStorage(JSON.stringify(budgetItems));
	render(budgetSheet, budgetItems);
}

//Add the input to the content
addItemBtn.addEventListener('click', function(e) {
	e.preventDefault();
	var name = addItemNameInput.value;
	var money = addItemNumInput.value;
	if (name != "" && money != "") {
		addItem(name,parseInt(money));
		addItemNameInput.innerHTML = "";
		addItemNumInput.innerHTML = "";
	}
})

//Implement changes
budgetSheet.addEventListener('click', function(e) {
	e.preventDefault();
	var obj = e.target;
	if (obj.tagName != "BUTTON") {return;}

	if (obj.dataset.type == "deduct") {
		var index = obj.dataset.index;
		var deduction = budgetSheet.getElementsByTagName("input")[index].value;
		if (deduction != "") {
			deduct(index, parseInt(deduction));
		}}
		else {
			var index = obj.dataset.index - 100;
			var addition = budgetSheet.getElementsByTagName("input")[index].value;
			if (addition != "") {
				add(index, parseInt(addition));
			}
		}


})

render(budgetSheet, budgetItems);
