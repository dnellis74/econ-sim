var city = [{
    "name": "New York",
    "pop": 1000000,
    "popprod": 0,
    "popconsum": 0,
    "popprice": 5,
    "food": 1000000,
    "foodprod": 1000000,
    "foodconsum": 1000000,
    "foodprice": 1
}, {
    "name": "Los Angeles",
    "pop": 1000000,
    "popprod": 0,
    "popconsum": 0,
    "popprice": 5,
    "food": 1000000,
    "foodprod": 1000000,
    "foodconsum": 1000000,
    "foodprice": 1
}, {
    "name": "Dallas",
    "pop": 1000000,
    "popprod": 0,
    "popconsum": 0,
    "popprice": 5,
    "food": 1000000,
    "foodprod": 1000000,
    "foodconsum": 1000000,
    "foodprice": 1
}, {
    "name": "Chicago",
    "pop": 1000000,
    "popprod": 0,
    "popconsum": 0,
    "popprice": 5,
    "food": 1000000,
    "foodprod": 1000000,
    "foodconsum": 1000000,
    "foodprice": 1
}, {
    "name": "Atlanta",
    "pop": 1000000,
    "popprod": 0,
    "popconsum": 0,
    "popprice": 5,
    "food": 1000000,
    "foodprod": 1000000,
    "foodconsum": 1000000,
    "foodprice": 1
}];

var date = new Date(2030, 2, 7);

function start() {
    $("#date").text(date.toString());
    drawPriceTable();
    println("Let's go!  You can ship food around.  That's all you can do right now.");
    mainMenu();
}

function drawPriceTable() {
    $("#prices tr").remove();
    $("#prices")
        .append(
            "<tr><th>City</th><th>Pop.</th><th>Food</th><th>Food Price</th></tr>");
    $.each(city, function (i, c) {
        $("#prices").append(
            "<tr id=" + c.name + "><td>" + c.name + "</td><td>" + c.pop
            + "</td><td>" + c.food + "</td><td>" + c.foodprice
            + "</td></tr>");
    })
}

function incDate(date, amount) {
    var tmpDate = new Date(date);
    tmpDate.setDate(tmpDate.getDate() + amount)
    return tmpDate;
}

function timePasses() {
    // food
    $.each(city, function (i, c) {
        c.food = c.food + c.foodprod - c.pop;
        var foodpricemodifier;
        if (c.pop === c.food) {
            foodpricemodifier = 0;
        } else {
            foodpricemodifier = (c.pop / c.food) - 1;
        }
        c.foodprice = c.foodprice + foodpricemodifier;
    })
    // pop
    println("Time passes....");
    date = incDate(date, 1);
    $("#date").text(date.toString());
    drawPriceTable();
}

function getCity(name) {
    var toReturn;
    $.each(city, function (i, c) {
        if (c.name === name) {
            toReturn = c;
            return false;
        }
    })
    return toReturn;
}

function doShipment() {
    selectedCity = $("#shipFrom :selected").text();
    c = getCity(selectedCity);
    c.food = c.food - 10;

    selectedCity = $("#shipTo :selected").text();
    c = getCity(selectedCity);
    c.food = c.food + 10;

    timePasses();
}

function mainMenu() {
    $("#menu").empty();
    $("#menu")
        .append(
            "<li><button onclick=\"doShipment()\">Ship!</button> - From: <select id=\"shipFrom\"/> - To: <select id=\"shipTo\"/>");
    $("#menu").append(
        "<li><button onclick=\"timePasses()\">End Turn.</button></li>");
    genCityDropDown($("#shipFrom"));
    genCityDropDown($("#shipTo"));

}

function genCityDropDown(element) {
    $.each(city, function (i, c) {
        element.append("<option value=" + c.name + ">" + c.name + "</option>");
    })
}

function println(line) {
    $("#output").append(line).append("<br>");
    $("#output").scrollTop = $("#output").scrollHeight;
}