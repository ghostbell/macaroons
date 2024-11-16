let loader = $('.loader');

$('#burger').on('click', function() {
    $('#menu').addClass('menu_open');
});

$('#menu *').on('click', function() {
    $('#menu').removeClass('menu_open');
});

$('#submit').click(function () {
    let name = $('#order-name');
    let product = $('#order-product');
    let phone = $('#order-phone');
    let hasError = false;

    loader.css('display', 'flex');
    name.css('border-color', 'rgb(130, 19, 40)');
    product.css('border-color', 'rgb(130, 19, 40)');
    phone.css('border-color', 'rgb(130, 19, 40)');

    $('.error-input').hide();

    if (!name.val()) {
        name.next().show();
        name.css('border-color', '#ff4343');
        hasError = true;
    }
    if (!product.val()) {
        product.next().show();
        product.css('border-color', '#ff4343');
        hasError = true;
    }
    if (!phone.val()) {
        phone.next().show();
        phone.css('border-color', '#ff4343');
        hasError = true;
    }

    if (!hasError) {
        $.ajax({
            method: 'POST',
            url: 'https://testologia.ru/checkout',
            data: { name: name.val(), product: product.val(), phone: phone.val() }
        })
            .done(function (message) {
                loader.hide();
                if (message.success) {
                    alert('Заказ создан');
                    $('.order-form').hide();
                    $('.success-info').css('display', 'flex');
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            })
    } else {
        loader.hide();
    }
})