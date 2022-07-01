var readCharacter = window.testAPI.readCharacter
var saveCharacterData = window.testAPI.saveCharacterData
var player = new Player()

window.onload = () => {
    readCharacter().then((data) => {
        var weapon = Weapon.fromJSON(data.equippedWeapon)
        var inventory = Inventory.fromJSON(data.inventory)
        var weapons = []

        player = Player.fromJSON(data)
        player.inventory = inventory
        player.entityWeapon = weapon
        

        player.inventory.weapons.map((weaponz) => {
            var tempWeapon = Weapon.fromJSON(weaponz)
            weapons.push(tempWeapon)
        })
        player.inventory.weapons = weapons

        showCharacterDetails()
        addShopItems()
    })
}

saveData = () => {
    if (player)
        saveCharacterData(player.entityName, player, "w")
}

showCharacterDetails = () => {
    document.getElementById("playerSlots").innerHTML = `Slots: ${player.inventory.slotsLeft}/${player.inventory.slots}`
    document.getElementById("playerGold").innerHTML = `Gold: ${player.inventory.gold}`

}

addShopItems = () => {
    var shopItemDiv = document.getElementById("items")
    //inventory add 1, 3, 5, 7 slots, max slots is 200 slots
    for (let i = 0; i < 8; i++) {
        if (i % 2 == 1) {
            let price = 5+ i*5
            var bagUpgrade = document.createElement("div")
            bagUpgrade.className = "item " + (i == 1 ? "uncommon" : i == 3 ? "rare" : i == 5 ? "epic" : i == 7 ? "mythic" : "")
            bagUpgrade.title = `Inventory Upgrade +${i} (${price} gold)`
            bagUpgrade.id = `inventory${i}`
            var item = document.createElement("i")
            item.className = "ra ra-tesla ra-2x"

            bagUpgrade.addEventListener("click", () => {
                console.log(`buying bag ${i} for ${price} gold`)
            })
            bagUpgrade.appendChild(item)
            shopItemDiv.appendChild(bagUpgrade)
        }
    }
    
    //lootbox for common / uncommon / rare potion
    var potionDiv = document.getElementById("potions")

    for (let i = 0; i < 6; i++) {
        if (i % 2 == 1) {
            let price = 3+ i*4
            var potionLootBox = document.createElement("div")
            potionLootBox.className = "item " + (i == 1 ? "common" : i == 3 ? "uncommon" : i == 5 ? "rare" : "")
            potionLootBox.title = `Potion Lootbox +${i} (${price} gold)`
            potionLootBox.id = `potion${i}`
            var item = document.createElement("i")
            item.className = "ra ra-crystals ra-2x"

            potionLootBox.addEventListener("click", () => {
                console.log(`buying potion ${i} for ${price} gold`)
            })

            potionLootBox.appendChild(item)
            potionDiv.appendChild(potionLootBox)
        }
    }


    //lootbox for common / uncommon / rare weapon
    var weaponDiv = document.getElementById("weapons")

    for (let i = 0; i < 6; i++) {
        if (i % 2 == 1) {
            let price = 15+ i*20
            var weaponLootbox = document.createElement("div")
            weaponLootbox.className = "item " + (i == 1 ? "common" : i == 3 ? "uncommon" : i == 5 ? "rare" : "")
            weaponLootbox.title = `Weapon Lootbox +${i} (${price} gold)`
            weaponLootbox.id = `weapon${i}`
            var item = document.createElement("i")
            item.className = "ra ra-perspective-dice-random ra-2x"

            weaponLootbox.addEventListener("click", () => {
                console.log(`buying weapon ${i} for ${price} gold`)
            })

            weaponLootbox.appendChild(item)
            weaponDiv.appendChild(weaponLootbox)
        }
    }

}

document.getElementById("lobby").addEventListener("click", () => {
    window.location.href = "./gameLobby.html"
})

document.getElementById("inventory").addEventListener("click", () => {
    window.location.href = "./gameInventory.html"
})