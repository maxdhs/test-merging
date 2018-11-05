var Pizza = function(toppings, size) {
  this.toppings = toppings;
  this.size = size;
};

Pizza.prototype.cost = function() {
  var cost = 10;
  if (this.toppings.length > 3) {
    cost += 5;
  }
  if (this.size == "medium") {
    cost += 5;
  }
  if (this.size == "large") {
    cost += 5;
  }
  return cost;
};

var totalCost = 0;
var pieNumber = 0;
function showOrder(newPizza) {
  pieNumber ++;
  totalCost += newPizza.cost();
  $("#orderOutput").append("Pie No. " + pieNumber + ": " + newPizza.size + " " + newPizza.toppings.join(", ") + "<br>");
  $("#orderTotal").text("The total for your order is: $" + totalCost + ".00")
}

var pizzaOrdersArray = [];

var pickUpOrDelivery = "";

$(document).ready(function () {

  $("input[name='pickUpOrDelivery']").change(function(){
    pickUpOrDelivery = $("input[name='pickUpOrDelivery']:checked").val();
    if (pickUpOrDelivery == "pick-up") {
      $("#pickUpDisplay").slideDown();
      $("#deliveryDisplay").hide();
    }
    else {
      $("#deliveryDisplay").slideDown();
      $("#pickUpDisplay").hide();
    }
  });
  
  $("#addOrder").click(function() {

    inputAddress = $("#inputAddress").val();
    var inputToppings = [];
    if (inputAddress == "" && pickUpOrDelivery == "delivery") {
      alert ("Please enter your address");
    }
    else {
      $(".chk:checked").each(function() {
        inputToppings.push($(this).val());
      });
      
      var inputSize = $("#inputSize").val();
      var newPizza = new Pizza (inputToppings, inputSize);

      showOrder(newPizza);
      $("#confirmOrder").show();
 
      pizzaOrdersArray.push(newPizza);
      
      inputName = $("#inputName").val();

      var inputPhoneNumber = $("#inputPhoneNumber").val();

    }
  });

  $("#confirmOrder").click(function() {
    if (pickUpOrDelivery == "delivery") {
      $("#output").text("Thanks " + inputName + "! Order confirmed. Your delivery is guaranteed to " + inputAddress + " in 20 minutes or less.");
    }
    else {
      $("#output").text("Order confirmed. We will have your order ready in our store for pick-up in 20 minutes.");
    }
  });

});