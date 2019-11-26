$(document).ready(function () {

    //runs api call
    function sendData(orderValues) {
        $.ajax({
            type: 'PUT',
            url: '/api/order',
            data: { "fullorder": orderValues },
        }).then(function (results) {
            $("#orderModal").show();
            $("#orderBody").empty();
            console.log(results);
            let orderTotal = 0;
            results.forEach(function (item) {
                let itemTotal = 0;

                //Only calculate item total if item in stock
                if (typeof item.stock === "number") {
                    itemTotal = (item.price * item.stock)
                }

                //adds item to the order modal
                let itemRow = `<div class="row"><h6 class="col-3">${item.product_name}</h6>
                <h6 class="col-3">$${item.price}</h6>
                <h6 class="col-3">${item.stock}</h6>
                <h6 class="col-3">$${itemTotal.toFixed(2)}</h6><div>`
                orderTotal += itemTotal;
                $("#orderBody").append(itemRow);
            });
            //Show order total
            let orderRow = `<div class="row"><div class="col-9"></div><h6 class="col-3">TOTAL: $${orderTotal.toFixed(2)}</h6></div>`;
            $("#orderBody").append(orderRow);

        });

    }

    //Modal close button 
    $(".close").on("click", function () {
        event.preventDefault();
        $("#orderModal").hide();
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
            const productRow = `<div class="row">${data[i].product_name} | ${data[i].department} | $${data[i].price}  <div class="form-inline">
            <input type="number" class="form-control" data-id=${data[i].id} placeholder="0" min="0" value="0"></div></div>`
            $("#productsPage").append(productRow);
        }

    }

    //Takes values from the inputs
    $("#orderBtn").on("click", function () {

        event.preventDefault();

        let orderValues = [];
        //get values from form
        $(".form-control").each(function () {
            const quantity = $(this).val();
            if (quantity > 0) {
                const productid = $(this).data("id");
                const productObj = { productid, "quantity": quantity }
                orderValues.push(productObj);
            }
        })

        //only send the order if items actually selected
        if (orderValues.length > 0) {
            sendData(orderValues);
        }

        //resets values
        $(".form-control").each(function () {
            $(this).val(0);
    
        })

    });

    getProducts();

});