var readCharacter = window.testAPI.readCharacter
var player = new Player()

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
    document.getElementById("playerSlots").innerHTML = `Slots: ${player.inventory.slots}`
    document.getElementById("playerItems").innerHTML = `Items: ${player.inventory.items} (loop this)`
    document.getElementById("playerPotions").innerHTML = `Potions: ${player.inventory.potions} (loop this, selectable to drink)`

    document.getElementById("playerWeapons").innerHTML = `Weapons: ${player.inventory.weapons} (loop this, selectable to equip)`
    document.getElementById("playerGold").innerHTML = `Gold: ${player.inventory.gold}`
    document.getElementById("equippedWeapon").innerHTML = `Equipped Weapon: ${player.equippedWeapon.itemName}`
}


document.getElementById("lobby").addEventListener("click", () => {
    window.location.href = "./gameLobby.html"
})

document.getElementById("shop").addEventListener("click", () => {
    window.location.href = "./gameShop.html"
})