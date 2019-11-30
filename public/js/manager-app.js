$(document).ready(function () {

    //runs api call
    function sendData(restockValues) {
        $.ajax({
            type: 'PUT',
            url: '/api/add',
            data: { "fullstockorder": restockValues },
        }).then(function (results) {

            //alert(results);
            $("#productsPage").empty();
            getProducts();


        });

    }

    //Modal close button 
    $(".close").on("click", function () {
        event.preventDefault();
        $(".modal").hide();
    });

    //Show add new product modal
    $("#newBtn").on("click", function () {
        event.preventDefault();
        $("#addModal").show();
    });


    //Retrieves products from the database
    function getProducts() {

        $.get("/api/products", function (data) {
            displayProducts(data);
        });
    }

    //Adds products to the page
    function displayProducts(data) {
        for (let i = 0; i < data.length; i++) {
            const productRow = `<div class="row">${data[i].id} | ${data[i].product_name} | ${data[i].department} | $${data[i].price} | Stock: ${data[i].stock_quantity} <div class="form-inline">
            <input type="number" class="form-control" data-id=${data[i].id} placeholder="0" min="0" value="0"></div></div>`
            $("#productsPage").append(productRow);
        }

    }

    //Takes values from the inputs
    $("#restockBtn").on("click", function () {

        event.preventDefault();

        let restockValues = [];
        //get values from form
        $(".form-control").each(function () {
            const quantity = $(this).val();
            if (quantity > 0) {
                const productid = $(this).data("id");
                const productObj = { productid, "quantity": quantity }
                restockValues.push(productObj);
            }
        })

        //only send the order if items actually selected
        if (restockValues.length > 0) {
            sendData(restockValues);
        }

        //resets values
        $(".form-control").each(function () {
            $(this).val(0);

        })

    });

    getProducts();

});