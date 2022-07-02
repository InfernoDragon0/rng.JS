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
    document.getElementById("playerSlots").innerHTML = `Inventory: ${player.inventory.itemCount}/${player.inventory.slots} (${player.inventory.slotsLeft} slots left)`
    document.getElementById("playerGold").innerHTML = `Gold: ${player.inventory.gold}`

}

addSpecial = (price, rarity, plus, name, itemType, icon) => {
    var shopItemDiv = document.getElementById("items")
    var itemDiv = document.createElement("div")
    itemDiv.className = "item " + (rarity == 1 ? "uncommon" : rarity == 2 ? "rare" : rarity == 3 ? "epic" : rarity == 4 ? "mythic" : "common")
    itemDiv.title = `${name} +${plus} (${price} gold)`
    itemDiv.id = `special${plus}`
    var item = document.createElement("i")
    item.className = "ra ra-2x " + icon

    itemDiv.addEventListener("click", () => {
        
        if (player.inventory.gold >= price) {
            player.inventory.gold -= price
            let box = new Item(`${name} +${plus}`, itemType, rarity)
            player.inventory.addToInventory(box)
            saveData()
            window.location.reload()
        }
        else {
            console.log(`not enough gold! ${name} +${plus} requires ${price} gold!`)
        }

    })
    itemDiv.appendChild(item)
    shopItemDiv.appendChild(itemDiv)
}

addShopItems = () => {
    var shopItemDiv = document.getElementById("items")
    //special items
    addSpecial(1100, 4, 1, "Weapon Enhancement", "weaponenhance", "ra-lightning-sword")

    //inventory add 1, 3, 5, 7 slots, max slots is 200 slots
    for (let i = 0; i < 8; i++) {
        if (i % 2 == 1) {
            let price = 50+ i*150
            var bagUpgrade = document.createElement("div")
            bagUpgrade.className = "item " + (i == 1 ? "uncommon" : i == 3 ? "rare" : i == 5 ? "epic" : i == 7 ? "mythic" : "")
            bagUpgrade.title = `Inventory Upgrade +${i} (${price} gold)`
            bagUpgrade.id = `inventory${i}`
            var item = document.createElement("i")
            item.className = "ra ra-tesla ra-2x"

            bagUpgrade.addEventListener("click", () => {
                
                if (player.inventory.gold >= price) {
                    player.inventory.gold -= price
                    player.inventory.slots += i
                    saveData()
                    window.location.reload()
                }
                else {
                    console.log(`not enough gold! Inventory Upgrade +${i} requires ${price} gold!`)
                }

            })
            bagUpgrade.appendChild(item)
            shopItemDiv.appendChild(bagUpgrade)
        }
    }
    
    //lootbox for common / uncommon / rare potion
    var potionDiv = document.getElementById("potions")

    for (let i = 0; i < 6; i++) {
        if (i % 2 == 1) {
            let price = 30+ i*40
            var potionLootBox = document.createElement("div")
            potionLootBox.className = "item " + (i == 1 ? "common" : i == 3 ? "uncommon" : i == 5 ? "rare" : "")
            potionLootBox.title = `Potion Lootbox +${i} (${price} gold)`
            potionLootBox.id = `potion${i}`
            var item = document.createElement("i")
            item.className = "ra ra-crystals ra-2x"

            potionLootBox.addEventListener("click", () => {
                console.log(`buying potion ${i} for ${price} gold`)
                if (player.inventory.slotsLeft > 0) {
                    if (player.inventory.gold >= price) {
                        player.inventory.gold -= price
                        let box = new Item(`Potion Lootbox +${i}`, "potionlootbox", Math.floor(i/2), i)
                        player.inventory.addToInventory(box)
                        saveData()
                        window.location.reload()
                    }
                    else {
                        console.log(`not enough gold! Potion Lootbox +${i} requires ${price} gold!`)
                    }
                }
                else {
                    console.log("No space in your inventory left to purchase.")
                }
            })

            potionLootBox.appendChild(item)
            potionDiv.appendChild(potionLootBox)
        }
    }


    //lootbox for common / uncommon / rare weapon
    var weaponDiv = document.getElementById("weapons")

    for (let i = 0; i < 6; i++) {
        if (i % 2 == 1) {
            let price = 40 + i*80
            var weaponLootbox = document.createElement("div")
            weaponLootbox.className = "item " + (i == 1 ? "common" : i == 3 ? "uncommon" : i == 5 ? "rare" : "")
            weaponLootbox.title = `Weapon Lootbox +${i} (${price} gold)`
            weaponLootbox.id = `weapon${i}`
            var item = document.createElement("i")
            item.className = "ra ra-perspective-dice-random ra-2x"

            weaponLootbox.addEventListener("click", () => {
                console.log(`buying weapon ${i} for ${price} gold`)
                if (player.inventory.slotsLeft > 0) {
                    if (player.inventory.gold >= price) {
                        player.inventory.gold -= price
                        let box = new Item(`Weapon Lootbox +${i}`, "weaponlootbox", Math.floor(i/2), i)
                        player.inventory.addToInventory(box)
                        saveData()
                        window.location.reload()
                    }
                    else {
                        console.log(`not enough gold! Weapon Lootbox +${i} requires ${price} gold!`)
                    }
                }
                else {
                    console.log("No space in your inventory left to purchase.")
                }
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