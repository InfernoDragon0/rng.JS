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
        showCharacterDetails()
    })
}

showCharacterDetails = () => {
    document.getElementById("playerName").innerHTML = `${player.entityName} (${player.jobName})`
    document.getElementById("playerHealth").innerHTML = `Health: ${player.health}/${player.maxHealth}`
    document.getElementById("playerMana").innerHTML = `Mana: ${player.mana}/${player.maxMana}`
    document.getElementById("playerStrength").innerHTML = `Str: ${player.entityStrength}`
    document.getElementById("playerDexterity").innerHTML = `Dex: ${player.entityDexterity}`
    document.getElementById("playerLuck").innerHTML = `Luk: ${player.entityLuck}`
    document.getElementById("equippedWeapon").innerHTML = `Weapon: ${player.equippedWeapon.itemName}`
}

document.getElementById("start").addEventListener("click", () => {
    var enemyCount = Math.floor((Math.random() * 4) + 1) // max 5
    var enemyLevel = Math.floor((Math.random() * player.entityLevel) + 1) // more level = more levels

    var playerInitiative = Math.floor(Math.random() * (100 - player.entityDexterity))
    if (playerInitiative > maxInitiative) {
        maxInitiative = playerInitiative
    }

    initiative[playerInitiative] = player

    var enemyCards = document.getElementById("enemyCards")
    for (var i = 0; i < enemyCount; i++) {
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

        var eCard = document.createElement("div")
        eCard.className = "enemyCard card"
        eCard.id = `enemyCard${i}`
        
        eCard.onclick = ((i) => {return () => {attackButton(enemies[i])}})(i)

        var enemyNameCard = document.createElement("p")
        enemyNameCard.innerText = `${newEnemy.entityName} (${newEnemy.jobName}) [Level ${newEnemy.entityLevel}]`
        enemyNameCard.className = "characterHeader characterDetails"

        var eLeftCard = document.createElement("div")
        eLeftCard.className = "enemyCharacterLeft"

        var enemyHealthCard = document.createElement("p")
        enemyHealthCard.className = "characterDetails"
        enemyHealthCard.innerText = `Health: ${newEnemy.health}`
        enemyHealthCard.id = `enemy${i}Health`

        var enemyManaCard = document.createElement("p")
        enemyManaCard.className = "characterDetails"
        enemyManaCard.innerText = `Mana: ${newEnemy.mana}`
        enemyManaCard.id = `enemy${i}Mana`

        var enemyEquipCard = document.createElement("p")
        enemyEquipCard.className = "characterDetails"
        enemyEquipCard.innerText = `Weapon: ${newEnemy.equippedWeapon.itemName}`

        var eRightCard = document.createElement("div")
        eRightCard.className = "enemyCharacterRight"

        eLeftCard.appendChild(enemyHealthCard)
        eRightCard.appendChild(enemyManaCard)
        // eLeftCard.appendChild(enemyStrCard)
        // eRightCard.appendChild(enemyDexCard)
        // eRightCard.appendChild(enemyLuckCard)

        eCard.appendChild(enemyNameCard)
        eCard.appendChild(eLeftCard)
        eCard.appendChild(eRightCard)
        eCard.appendChild(enemyEquipCard)

        enemyCards.appendChild(eCard)
        console.log(i)
    }

    console.log(`the highest initiative rolled is ${maxInitiative}, the rolls are`)
    console.log(initiative)

    //sort initiative
})

document.getElementById("testAttack").addEventListener("click", () => {startTurn()})

attackButton = (i) => {
    
    console.log("you have attacked the " + i.entityWeapon.itemName)
}

startTurn = () => {
    initiative[0].health = 1
    document.getElementById("enemyCard0").innerHTML = `Health: ${enemies[0].health}`
}