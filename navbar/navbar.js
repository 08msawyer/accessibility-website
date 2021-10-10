let expanded = false;

function expandNavbar() {
    expanded = !expanded
    if (expanded) {
        $("#navbar").addClass("expanded")
    } else {
        $("#navbar").removeClass("expanded")
    }
}

$(() => {
    $("#nav-placeholder").load("/navbar", () => {
        if (page !== "/") {
            $("#home-link").attr("href", "../").removeClass("active")
        }
        $(`a[href="${page}"]`).addClass("active")
    })
})