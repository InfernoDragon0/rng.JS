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
    document.getElementById("playerSlots").innerHTML = `Slots: ${player.inventory.slotsLeft}/${player.inventory.slots}`
    document.getElementById("playerGold").innerHTML = `Gold: ${player.inventory.gold}`

}

addShopItems = () => {
    var shopItemDiv = document.getElementById("items")
    //inventory add 1, 3, 5 slots, max slots is 200 slots

    //lootbox for common / uncommon / rare weapon

    //lootbox for common / uncommon / rare potion
}

document.getElementById("lobby").addEventListener("click", () => {
    window.location.href = "./gameLobby.html"
})

document.getElementById("inventory").addEventListener("click", () => {
    window.location.href = "./gameInventory.html"
})