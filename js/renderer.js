var saveCharacterData = window.testAPI.saveCharacterData
var test = window.testAPI.checkTest
var updateTest = window.testAPI.updateTest

var testPlayer

document.getElementById("testButton").addEventListener("click", () => {

    if (!document.getElementById("nameInput").value) {
        console.log("where name")
        return
    }
    job = document.getElementById("jobInput").value
    pname = document.getElementById("nameInput").value

    if (job.length == 0)
        testPlayer = new Player(pname)
    else
        testPlayer = new Player(pname, job)

    testPlayer.generateStats()

    document.getElementById("playerName").innerHTML = `Name: ${testPlayer.entityName}`
    document.getElementById("jobName").innerHTML = `Job: ${testPlayer.jobName}`

    document.getElementById("playerStrength").innerHTML = `Str: ${testPlayer.entityStrength}`
    document.getElementById("playerDexterity").innerHTML = `Dex: ${testPlayer.entityDexterity}`
    document.getElementById("playerLuck").innerHTML = `Luk: ${testPlayer.entityLuck}`

    var weapon = Weapon.generateRandomItem(0)
    testPlayer.entityWeapon = weapon
    document.getElementById("testweapon").innerHTML = `weapon: ${weapon.itemName}`
})

document.getElementById("createCharacter").addEventListener("click", () => {
    if (testPlayer) {
        saveCharacterData(testPlayer.entityName, testPlayer)
        window.location.href = "./mainMenu.html"
    }
    else {
        console.log("no character")
    }
    
})

document.getElementById("testAttack").addEventListener("click", () => {
    if (testPlayer) {
        if (!testPlayer.entityWeapon) {
            console.log("Player has no weapon")
        }
        else {
            testPlayer.performAttack(testPlayer)
        }

        console.log("updated test is " + test())


    }
})

























































































































































// my password is password123