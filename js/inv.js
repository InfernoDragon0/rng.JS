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
    })
}

saveData = () => {
    if (player)
        saveCharacterData(player.entityName, player, "w")
}

showCharacterDetails = () => {
    document.getElementById("playerSlots").innerHTML = `Slots: ${player.inventory.slots}`
    document.getElementById("playerItems").innerHTML = `Items: ${player.inventory.items.length}`
    document.getElementById("playerPotions").innerHTML = `Potions: ${player.inventory.potions.length}`

    var weaponsDiv = document.getElementById("potions")
    player.inventory.potions.map((potion) => {
        var weaponDiv = document.createElement("div")
        weaponDiv.className = "item " + (potion.rarity == 0 ? "common" : 
                                potion.rarity == 1 ? "uncommon" : 
                                potion.rarity == 2 ? "rare" : 
                                potion.rarity == 3 ? "epic" : 
                                potion.rarity == 4 ? "mythic" : "")
        var item = document.createElement("i")
        item.className = "ra ra-corked-tube ra-2x"

        weaponDiv.appendChild(item)
        weaponsDiv.appendChild(weaponDiv)
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
        var item = document.createElement("i")
        item.className = "ra ra-sword ra-2x"

        weaponDiv.appendChild(item)
        weaponsDiv.appendChild(weaponDiv)

        weaponDiv.addEventListener("click", () => {
            console.log("weapon index" + index)
            equipWeapon(index)
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
    item.className = "ra ra-sword ra-2x"

    weaponDiv.appendChild(item)
    equippedDiv.appendChild(weaponDiv)

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