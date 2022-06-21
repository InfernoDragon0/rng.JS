document.getElementById("continueButton").addEventListener("click", () => {
    var selected = document.getElementById("selectCharacter").value

    if (selected == "New Character") {
        window.location.href = "./newCharacter.html"
    }
})