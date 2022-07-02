var readCharacter = window.testAPI.readCharacter
var saveCharacterData = window.testAPI.saveCharacterData

var player = new Player()
var enemies = []

window.onload = () => {
    readCharacter().then((data) => {
        var weapon = Weapon.fromJSON(data.equippedWeapon)
        var inventory = Inventory.fromJSON(data.inventory)
        player = Player.fromJSON(data)
        player.inventory = inventory
        player.entityWeapon = weapon

        if (player.health == 0 && player.inventory.gold == 0) { //pity heal
            player.health = Math.floor(player.maxHealth / 2)
            saveData()
            window.location.reload()
        }

        showCharacterDetails()
    })
}

showCharacterDetails = () => {
    document.getElementById("playerName").innerHTML = `Welcome, ${player.entityName} (${player.jobName})`
    document.getElementById("playerHealth").innerHTML = `Health: ${player.health.toFixed(2)}/${player.maxHealth}`
    document.getElementById("playerMana").innerHTML = `Mana: ${player.mana}/${player.maxMana}`

    document.getElementById("playerLevel").innerHTML = `Level: ${player.entityLevel}`
    document.getElementById("playerExp").innerHTML = `Exp: ${player.experience}`
    document.getElementById("playerGold").innerHTML = `Gold: ${player.inventory.gold}`
    document.getElementById("playerStrength").innerHTML = `Str: ${player.entityStrength}`
    document.getElementById("playerDexterity").innerHTML = `Dex: ${player.entityDexterity}`
    document.getElementById("playerLuck").innerHTML = `Luk: ${player.entityLuck}`
    document.getElementById("playerStats").innerHTML = `Stats: ${player.statPoints}`
    document.getElementById("equippedWeapon").innerHTML = `Equipped Weapon: ${player.equippedWeapon.itemName}`

    document.getElementById("addStr").style = "display: inline-block;"
    document.getElementById("addDex").style = "display: inline-block;"
    document.getElementById("addLuk").style = "display: inline-block;"
    if (player.statPoints == 0) {
        document.getElementById("addStr").style = "display: none;"
        document.getElementById("addDex").style = "display: none;"
        document.getElementById("addLuk").style = "display: none;"
    }
}

document.getElementById("addStr").addEventListener("click", () => {
    if (player.statPoints == 0) return
    player.entityStrength += 1
    player.statPoints -= 1
    showCharacterDetails()
    saveData()
})

document.getElementById("addDex").addEventListener("click", () => {
    if (player.statPoints == 0) return
    player.entityDexterity += 1
    player.statPoints -= 1
    showCharacterDetails()
    saveData()
})

document.getElementById("addLuk").addEventListener("click", () => {
    if (player.statPoints == 0) return
    player.entityLuck += 1
    player.statPoints -= 1
    showCharacterDetails()
    saveData()
})

saveData = () => {
    saveCharacterData(player.entityName, player, "w")
}

document.getElementById("start").addEventListener("click", () => {
    window.location.href = "./gameFight.html"
})

document.getElementById("shop").addEventListener("click", () => {
    window.location.href = "./gameShop.html"
})


document.getElementById("inventory").addEventListener("click", () => {
    window.location.href = "./gameInventory.html"
})

document.getElementById("heal").addEventListener("click", () => {
    if (player.health == player.maxHealth) {
        console.log("can't heal when full health")
        return
    }
    let price = Math.floor(player.maxHealth - player.health) * 2
    if (player.inventory.gold >= price) {
        player.inventory.gold -= price
        player.modifyHealth(-player.maxHealth)
        saveData()
        window.location.reload()
    }
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