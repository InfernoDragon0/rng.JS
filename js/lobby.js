var readCharacter = window.testAPI.readCharacter

var player = new Player()
var enemies = []

window.onload = () => {
    readCharacter().then((data) => {
        var weapon = Weapon.fromJSON(data.equippedWeapon)
        var inventory = Inventory.fromJSON(data.inventory)
        player = Player.fromJSON(data)
        player.inventory = inventory
        player.entityWeapon = weapon
        showCharacterDetails()
    })
}

showCharacterDetails = () => {
    document.getElementById("playerName").innerHTML = `Welcome, ${player.entityName} (${player.jobName})`
    document.getElementById("playerHealth").innerHTML = `Health: ${player.health}/${player.maxHealth}`
    document.getElementById("playerMana").innerHTML = `Mana: ${player.mana}/${player.maxMana}`

    document.getElementById("playerStrength").innerHTML = `Str: ${player.entityStrength}`
    document.getElementById("playerDexterity").innerHTML = `Dex: ${player.entityDexterity}`
    document.getElementById("playerLuck").innerHTML = `Luk: ${player.entityLuck}`
    document.getElementById("equippedWeapon").innerHTML = `Equipped Weapon: ${player.equippedWeapon.itemName}`
}

document.getElementById("start").addEventListener("click", () => {
    window.location.href = "./gameFight.html"
})

document.getElementById("inventory").addEventListener("click", () => {
    window.location.href = "./gameInventory.html"
})

document.getElementById("testAttack").addEventListener("click", () => {
    var testEnemy = new Enemy()

    testEnemy.generateStats()

    testEnemy.maxHealth = 100
    testEnemy.health = 100

    console.log(`Before Attack: ${testEnemy.health}`)
    player.performAttack(testEnemy)
    console.log(`After Attack: ${testEnemy.health}`)

})