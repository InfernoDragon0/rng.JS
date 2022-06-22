var loadCharacter = window.testAPI.loadCharacter
var getSaves = window.testAPI.getSaves



loadData = async () => {
    var data = await getSaves()
    console.log(data)
    var selector = document.getElementById("selectCharacter")
    for (save of data) {
        var option = document.createElement("option")
        option.value = save
        option.textContent = save.split('.')[0] // get the name only, no .txt/.json
        selector.appendChild(option)
    }
}

window.onload = () => {
    console.log("loaded")
    loadData()
    
}

document.getElementById("continueButton").addEventListener("click", () => {
    var selected = document.getElementById("selectCharacter").value

    if (selected == "New Character") {
        window.location.href = "./newCharacter.html"
    }
    else {
        loadCharacter(selected)
    }
})