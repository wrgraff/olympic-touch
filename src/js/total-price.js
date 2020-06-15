(function() {
    const totalPriceContainer = document.querySelector('.total__price .currency'),
          priceInputs = document.querySelectorAll('input[name="length"]')

    priceInputs.forEach(input => {
        input.addEventListener('change', evt => {
            if (evt.target.checked === true) {
                setTotalPrice(evt.target.dataset.price);
            };
        });
    });

    function setTotalPrice(price) {
        totalPriceContainer.innerHTML = price + ' <span class="visually-hidden">рублей</span>';
    };
    window.totalPrice = {
        set: setTotalPrice
    };
})();
