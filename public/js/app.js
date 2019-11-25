$(document).ready(function () {

    //runs api call
    function sendData(orderValues) {
        $.ajax({
            type: 'PUT',
            url: '/api/order',
            data: { "fullorder": orderValues },
        }).then(function (results) {
            alert("Order placed!");
            console.log(results);
        });

    }

    //Retrieves products from the database
    function getProducts() {

        $.get("/api/products", function (data) {
            displayProducts(data);
        });
    }

    //Adds products to the page
    function displayProducts(data) {
        for (let i = 0; i < data.length; i++) {
            const productRow = `<div class="row">${data[i].product_name} | ${data[i].department} | $${data[i].price}  <div class="form-inline">
            <input type="number" class="form-control" data-id=${data[i].id} placeholder="0" min="0" value="0"></div></div>`
            $("#productsPage").append(productRow);
        }

    }

    //Takes values from the inputs
    $("#orderBtn").on("click", function () {

        event.preventDefault();

        let orderValues = [];

        $(".form-control").each(function () {
            const quantity = $(this).val();
            if (quantity > 0) {
                const productid = $(this).data("id");
                const productObj = { productid, "quantity": quantity }
                orderValues.push(productObj);
            }
        })

        sendData(orderValues);

    });

    getProducts();

});