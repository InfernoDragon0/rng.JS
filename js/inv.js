var readCharacter = window.testAPI.readCharacter
var saveCharacterData = window.testAPI.saveCharacterData
var menu = window.testAPI.menu
var player = new Player()
var potionSell = []
var weaponSell = []

window.onload = () => {
    readCharacter().then((data) => {
        var weapon = Weapon.fromJSON(data.equippedWeapon)
        var inventory = Inventory.fromJSON(data.inventory)
        var weapons = []
        var potions = []
        var items = []

        player = Player.fromJSON(data)
        player.inventory = inventory
        player.entityWeapon = weapon
        
        player.inventory.items.map((itemz) => {
            var tempItem = Item.fromJSON(itemz)
            items.push(tempItem)
        })
        player.inventory.items = items

        player.inventory.weapons.map((weaponz) => {
            var tempWeapon = Weapon.fromJSON(weaponz)
            weapons.push(tempWeapon)
        })
        player.inventory.weapons = weapons

        player.inventory.potions.map((potionz) => {
            var tempPotion = Potion.fromJSON(potionz)
            potions.push(tempPotion)
        })
        player.inventory.potions = potions

        showCharacterDetails()
    })
}

saveData = () => {
    if (player)
        saveCharacterData(player.entityName, player, "w")
}

showCharacterDetails = () => {
    document.getElementById("playerSlots").innerHTML = `Slots: ${player.inventory.slotsLeft}/${player.inventory.slots}`
    document.getElementById("playerItems").innerHTML = `Items: ${player.inventory.items.length}`

    var itemsDiv = document.getElementById("items")
    player.inventory.items.map((itemz, index) => {
        var itemDiv = document.createElement("div")
        itemDiv.className = "item " + (itemz.rarity == 0 ? "common" : 
                                        itemz.rarity == 1 ? "uncommon" : 
                                        itemz.rarity == 2 ? "rare" : 
                                        itemz.rarity == 3 ? "epic" : 
                                        itemz.rarity == 4 ? "mythic" : "")
        itemDiv.id = `item${index}`
        itemDiv.title = itemz.itemName
        var item = document.createElement("i")
        item.className = "ra ra-2x " + (itemz.itemType == "weaponlootbox" ? "ra-perspective-dice-random" :
                                        itemz.itemType == "potionlootbox" ? "ra-crystals" : "")

        itemDiv.appendChild(item)
        itemDiv.addEventListener("click", (e) => {

            if (itemz.itemType == "weaponlootbox") {
                if (player.inventory.items.indexOf(itemz) != -1) {
                    console.log("open box weapon rarity " + itemz.rarity)
                    let newLoot = Weapon.generateRandomItem(itemz.rarity, itemz.rarity * 2 + 1)
                    player.inventory.items.splice(player.inventory.items.indexOf(itemz), 1)
                    player.inventory.addToInventory(newLoot)
                    saveData()
                    window.location.reload()
                }
                
            }
            else if (itemz.itemType == "potionlootbox") {
                if (player.inventory.items.indexOf(itemz) != -1) {
                    console.log("open box potion " + itemz.rarity)
                    let newLoot = Potion.generateRandomItem(itemz.rarity, itemz.rarity * 2 + 1)
                    player.inventory.items.splice(player.inventory.items.indexOf(itemz), 1)
                    player.inventory.addToInventory(newLoot)
                    saveData()
                    window.location.reload()
                }
            }
        })
        itemsDiv.appendChild(itemDiv)
    })

    document.getElementById("playerPotions").innerHTML = `Buffs & Debuffs: ${player.inventory.potions.length}`

    var potionsDiv = document.getElementById("potions")
    player.inventory.potions.map((potion, index) => {
        var potionDiv = document.createElement("div")
        potionDiv.className = "item " + (potion.rarity == 0 ? "common" : 
                                potion.rarity == 1 ? "uncommon" : 
                                potion.rarity == 2 ? "rare" : 
                                potion.rarity == 3 ? "epic" : 
                                potion.rarity == 4 ? "mythic" : "")
        potionDiv.id = `potion${index}`
        potionDiv.title = potion.itemName
        var item = document.createElement("i")
        console.log(potion.potionType)
        item.className = "ra ra-2x " + (potion.potionType == "Healing" ? "ra-health-increase" :
                                        potion.potionType == "Damaging" ? "ra-spinning-sword" :
                                        potion.potionType == "Burning" ? "ra-fire-symbol" :
                                        potion.potionType == "Freezing" ? "ra-snowflake" :
                                        potion.potionType == "Acid" ? "ra-biohazard" :
                                        potion.potionType == "Poison" ? "ra-doubled" : "")

        potionDiv.appendChild(item)
        potionDiv.addEventListener("contextmenu", (e) => {
            e.preventDefault()
            //select the item
            toggleSelect("potion", index)

        })
        potionsDiv.appendChild(potionDiv)
    })

    document.getElementById("playerWeapons").innerHTML = `Weapons: ${player.inventory.weapons.length}`

    var weaponsDiv = document.getElementById("weapons")
    player.inventory.weapons.map((weapon, index) => {
        var weaponDiv = document.createElement("div")
        weaponDiv.className = "item " + (weapon.rarity == 0 ? "common" : 
                                weapon.rarity == 1 ? "uncommon" : 
                                weapon.rarity == 2 ? "rare" : 
                                weapon.rarity == 3 ? "epic" : 
                                weapon.rarity == 4 ? "mythic" : "")
        weaponDiv.title = weapon.itemName
        weaponDiv.id = `weapon${index}`
        var item = document.createElement("i")
        item.className = "ra ra-2x " + (weapon.weaponType == "Sword" ? "ra-sword" :
                                        weapon.weaponType == "Wand" ? "ra-crystal-wand" :
                                        weapon.weaponType == "Carts" ? "ra-spades-card" :
                                        weapon.weaponType == "Dagger" ? "ra-daggers": "")

        weaponDiv.appendChild(item)
        weaponsDiv.appendChild(weaponDiv)

        weaponDiv.addEventListener("click", () => {
            console.log("weapon index" + index)
            equipWeapon(index)
        })
        weaponDiv.addEventListener("contextmenu", (e) => {
            e.preventDefault()
            //select the item
            toggleSelect("weapon", index)

        })
    })


    document.getElementById("playerGold").innerHTML = `Gold: ${player.inventory.gold}`
    document.getElementById("equippedWeapon").innerHTML = `Equipped Weapon: ${player.equippedWeapon.itemName}`

    var equippedDiv = document.getElementById("equipped")
    var weaponDiv = document.createElement("div")
    weaponDiv.className = "item " + (player.entityWeapon.rarity == 0 ? "common" : 
                                    player.entityWeapon.rarity == 1 ? "uncommon" : 
                                    player.entityWeapon.rarity == 2 ? "rare" : 
                                    player.entityWeapon.rarity == 3 ? "epic" : 
                                    player.entityWeapon.rarity == 4 ? "mythic" : "")
    weaponDiv.title = player.entityWeapon.itemName
    var item = document.createElement("i")
    item.className = "ra ra-2x " + (player.entityWeapon.weaponType == "Sword" ? "ra-sword" :
                                        player.entityWeapon.weaponType == "Wand" ? "ra-crystal-wand" :
                                        player.entityWeapon.weaponType == "Carts" ? "ra-spades-card" :
                                        player.entityWeapon.weaponType == "Dagger" ? "ra-daggers": "")

    weaponDiv.appendChild(item)
    equippedDiv.appendChild(weaponDiv)

}

toggleSelect = (itemType, index) => {
    var selectedItem = itemType == "potion" ? player.inventory.potions[index] :  
                        itemType == "weapon" ? player.inventory.weapons[index] : player.inventory.items[index]
    console.log(selectedItem)
    if (itemType == "weapon") {
        if (weaponSell.indexOf(selectedItem) == -1) {
            weaponSell.push(selectedItem)
            document.getElementById(`weapon${index}`).className += " selected"
        }
        else {
            weaponSell.splice(weaponSell.indexOf(selectedItem), 1)
            document.getElementById(`weapon${index}`).className = document.getElementById(`weapon${index}`).className.replace(" selected", "")
        }
    }
    else if (itemType == "potion") {
        if (potionSell.indexOf(selectedItem) == -1) {
            potionSell.push(selectedItem)
            document.getElementById(`potion${index}`).className += " selected"
        }
        else {
            potionSell.splice(potionSell.indexOf(selectedItem), 1)
            document.getElementById(`potion${index}`).className = document.getElementById(`potion${index}`).className.replace(" selected", "")
        }
    }
}

equipWeapon = (index) => { 
    var nextWeapon = player.inventory.weapons[index]
    player.inventory.weapons.splice(index, 1)
    player.inventory.addToInventory(player.equippedWeapon)
    player.equippedWeapon = nextWeapon
    console.log(player.inventory.weapons)
    saveData()
    window.location.reload()
}



document.getElementById("lobby").addEventListener("click", () => {
    window.location.href = "./gameLobby.html"
})

document.getElementById("shop").addEventListener("click", () => {
    window.location.href = "./gameShop.html"
})

document.getElementById("sell").addEventListener("click", () => {
    console.log("selling the selected items")
    console.log(potionSell)
    for (let potion of potionSell) {
        var gold = 3 + potion.rarity * 3
        if (player.inventory.potions.indexOf(potion) != -1) {
            player.inventory.potions.splice(player.inventory.potions.indexOf(potion), 1)
        }
        player.inventory.gold += gold
    }
    console.log(weaponSell)
    for (let weapon of weaponSell) {
        var gold = 5 + weapon.rarity * 5
        if (player.inventory.weapons.indexOf(weapon) != -1) {
            player.inventory.weapons.splice(player.inventory.weapons.indexOf(weapon), 1)
        }
        player.inventory.gold += gold
    }

    saveData()
    window.location.reload()

})