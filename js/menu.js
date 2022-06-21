document.getElementById("continueButton").addEventListener("click", () => {
    var selected = document.getElementById("selectCharacter").value
    alert(selected)

    if (selected == "New Character") {
        window.location.href = "./index.html"
    }
})