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

    firstFunction(testPlayer.entityName)
    secondFunction(testPlayer.entityName)
    var weapon = Weapon.generateRandomItem(0)
    testPlayer.entityWeapon = weapon
    document.getElementById("testweapon").innerHTML = `weapon: ${weapon.itemName}`

    //secondFunction(tempVar)
})

document.getElementById("testAttack").addEventListener("click", () => {
    if (testPlayer) {
        if (!testPlayer.entityWeapon) {
            console.log("Player has no weapon")
        }
        else {
            testPlayer.performAttack(testPlayer)
        }

    }
})

























































































































































// my password is password123