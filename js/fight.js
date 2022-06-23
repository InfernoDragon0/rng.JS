var readCharacter = window.testAPI.readCharacter

var player
var enemies = []
var initiative = {}
var currentTurn = 0
var maxInitiative = 0

window.onload = () => {
    readCharacter().then((data) => {
        var weapon = Weapon.fromJSON(data.equippedWeapon)
        var inventory = Inventory.fromJSON(data.inventory)
        player = Player.fromJSON(data)
        player.inventory = inventory
        player.entityWeapon = weapon
        //showCharacterDetails()
    })
}

document.getElementById("start").addEventListener("click", () => {
    var enemyCount = Math.floor((Math.random() * 4) + 1) // max 5
    var enemyLevel = Math.floor((Math.random() * player.entityLevel) + 1) // more level = more levels

    var playerInitiative = Math.floor(Math.random() * (100 - player.entityDexterity))
    if (playerInitiative > maxInitiative) {
        maxInitiative = playerInitiative
    }

    initiative[playerInitiative] = player
    for (var index = 0; index < enemyCount; index++) {
        var newEnemy = new Enemy()
        newEnemy.level = enemyLevel
        newEnemy.generateStats()
        var enemyInitiative = Math.floor(Math.random() * (100 - newEnemy.entityDexterity))
        
        while (initiative.hasOwnProperty(enemyInitiative)) { //reroll until no dupes
            console.log(initiative[enemyInitiative])
            enemyInitiative += 1
        }

        if (enemyInitiative > maxInitiative) {
            maxInitiative = enemyInitiative
        }
        initiative[enemyInitiative] = newEnemy
        enemies.push(newEnemy)
    }

    console.log(`the highest initiative rolled is ${maxInitiative}, the rolls are`)
    console.log(initiative)

    //sort initiative
})