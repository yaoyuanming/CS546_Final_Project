// login modal
$("#login-button").click(function() {
    $("#login-modal").modal("show");
});

$(document).ready(function() {
    $("#searchInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#productLists #single").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    })
})

/*function search() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toLowerCase();
    var allCards = document.getElementById("productLists");
    var results = document.getElementsById("single");
    for (i = 0 ; i < results.length; i ++) {
        var title = results[i].getElementByClassName("card-title");
        var category = results[i].getElementById("category");
        if(title || category) {
            titletext = title.textContent.toLowerCase();
            category = category.textContent.toLowerCase();
            if(titletext.indexOf(filter) > -1 || category.indexOf(filter) > -1) {
                results[i].style.display = "";
            } else {
                results[i].style.display = "none";
            }
        }
    }
}*/


