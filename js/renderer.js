var fromAPI = window.testAPI.theAPI()

var testPlayer

const firstFunction = (someParams) => {
    console.log(fromAPI + someParams)
}

const secondFunction = (someParams) => {
    console.log(`${someParams}: my job is ${testPlayer.jobName}`)
}

document.getElementById("testButton").addEventListener("click", () => {

    if (!document.getElementById("nameInput").value) {
        console.log("where name")
        return
    }
    if (!testPlayer) {
        job = document.getElementById("jobInput").value
        pname = document.getElementById("nameInput").value

        if (job.length == 0)
            testPlayer = new Player(pname)
        else
            testPlayer = new Player(pname, job)

        testPlayer.generateStats()

        document.getElementById("playerName").innerHTML = `Name: ${testPlayer.playerName}`
        document.getElementById("jobName").innerHTML = `Job: ${testPlayer.jobName}`

        document.getElementById("playerStrength").innerHTML = `Str: ${testPlayer.playerStrength}`
        document.getElementById("playerDexterity").innerHTML = `Dex: ${testPlayer.playerDexterity}`
        document.getElementById("playerLuck").innerHTML = `Luk: ${testPlayer.playerLuck}`

        document.getElementById("nameInput").disabled = true
        document.getElementById("jobInput").disabled = true
        document.getElementById("testButton").disabled = true

        firstFunction(testPlayer.playerName)
        secondFunction(testPlayer.playerName)
        var weapon = Weapon.generateRandomItem()
        testPlayer.playerWeapon = weapon
        document.getElementById("testweapon").innerHTML = `weapon: ${weapon.itemName}`

    }
    else {
        console.log("Character is already created")
    }


    //secondFunction(tempVar)
})

document.getElementById("testAttack").addEventListener("click", () => {
    if (testPlayer) {
        if (!testPlayer.playerWeapon) {
            console.log("Player has no weapon")
        }
        else {
            testPlayer.performAttack(testPlayer)
        }

    }
})

























































































































































// my password is password123