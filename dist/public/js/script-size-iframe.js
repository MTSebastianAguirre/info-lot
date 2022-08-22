window.onload = function() {
    var iframe = document.querySelector('#iframe-product-mowin');
    var header = document.querySelectorAll('.info-lot')[0];
    if (iframe && header) {
        var height = header.offsetHeight;
        iframe.style.height = `calc(100vh - (${height + 10}px + (.25rem * 2)))`;
        console.log(header);
        console.log(iframe);
    }
};
