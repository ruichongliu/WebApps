// Course: COMP 420
// Name: Ruichong Liu
// WesMail: rliu01@wesleyan.edu
// Due on: April 2, Midnight
var dropdown_from = document.getElementById("from");
var dropdown_to = document.getElementById("to");
var btn = document.getElementById("btnn");
var content = document.getElementById("content");

var currencylst = ["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD",
"HRK","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN",
"RON","RUB","SEK","SGD","THB","USD","ZAR"];

window.addEventListener("load",function (e) {
    for (cur in currencylst) {
        dropdown_from.innerHTML += `
        <option value="${currencylst[cur]}">${currencylst[cur]}</option>
        `;
        dropdown_to.innerHTML += `
        <option value="${currencylst[cur]}">${currencylst[cur]}</option>
        `;}
});

btn.addEventListener("click",function (e) {
    var strUser_1 = dropdown_from.options[dropdown_from.selectedIndex].text;
    var strUser_2 = dropdown_to.options[dropdown_to.selectedIndex].text;

    if (strUser_1 == strUser_2) {
        content.innerHTML = "1.0000";
    }
    else {
        $.ajax({
            url: 'http://api.fixer.io/latest?base=' + strUser_1,
        }).done(function(response) {
        content.innerHTML = response['rates'][strUser_2];
     });
    }
});
// End of the File
