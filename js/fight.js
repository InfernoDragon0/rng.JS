var readCharacter = window.testAPI.readCharacter
var saveCharacterData = window.testAPI.saveCharacterData

var player
var enemies = []
var initiative = {}
var currentTurn = 0
var maxInitiative = 0
var playerTurn = 0
var gameEnded = false


window.onload = () => {
    readCharacter().then((data) => {
        var weapon = Weapon.fromJSON(data.equippedWeapon)
        var inventory = Inventory.fromJSON(data.inventory)
        player = Player.fromJSON(data)
        player.inventory = inventory
        player.entityWeapon = weapon
        showCharacterDetails()
        loadEnemy()
        startTurn()
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

loadEnemy = () => {
    var enemyCount = Math.floor((Math.random() * 4) + 1) // max 5
    

    playerTurn = Math.floor(Math.random() * (100 - player.entityDexterity))
    if (playerTurn == 0)
        playerTurn += 1
    if (playerTurn > maxInitiative) maxInitiative = playerTurn


    initiative[playerTurn] = player

    var enemyCards = document.getElementById("enemyCards")
    for (var i = 0; i < enemyCount; i++) {
        var newEnemy = new Enemy()
        newEnemy.level = Math.floor((Math.random() * player.entityLevel) + 1) // more level = more levels
        newEnemy.generateStats()
        var enemyInitiative = Math.floor(Math.random() * (100 - newEnemy.entityDexterity))

        if (enemyInitiative == 0) enemyInitiative += 1
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
        eCard.id = `enemyCard${enemyInitiative}`

        eCard.onclick = ((enemyInitiative) => { return () => { attackButton(initiative[enemyInitiative]) } })(enemyInitiative)

        var enemyNameCard = document.createElement("p")
        enemyNameCard.innerText = `${newEnemy.entityName} [Initiative: ${enemyInitiative}]`
        enemyNameCard.className = "characterHeader characterDetails"

        var eLeftCard = document.createElement("div")
        eLeftCard.className = "enemyCharacterLeft"

        var enemyHealthCard = document.createElement("p")
        enemyHealthCard.className = "characterDetails"
        enemyHealthCard.innerText = `Health: ${newEnemy.health}`
        enemyHealthCard.id = `enemyHealth${enemyInitiative}`

        var enemyManaCard = document.createElement("p")
        enemyManaCard.className = "characterDetails"
        enemyManaCard.innerText = `Mana: ${newEnemy.mana}`
        enemyManaCard.id = `enemyMana${enemyInitiative}`

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
    }

    console.log(initiative)
}

document.getElementById("collect").addEventListener("click", () => {

})

document.getElementById("runaway").addEventListener("click", () => {
    if (gameEnded && player.health != 0) {
        console.log("cannot run when game ended")
    }
    else {
        var chance = Math.floor(Math.random() * 100)

        if (player.health <= 0 || player.entityLuck > chance) {
            console.log("successfully ran away")
            window.location.href = "./gameLobby.html"
        }
        else {
            //lose the turn
            console.log("leg broke, cant run away")
            startTurn()
        }
    }
})

attackButton = (i) => {
    if (currentTurn != playerTurn) {
        console.log("not your turn")
        return
    }

    if (i.health <= 0 || gameEnded) {
        console.log("cannot stab dead enemy")
    }
    else {
        player.performAttack(i)
        updateUI()
        startTurn()
    }
    
    
}

updateUI = () => {
    //console.log("Update UI")
    var enemyCount = Object.keys(initiative).length -1
    Object.keys(initiative).forEach((key) => {
        
        if (initiative[key] instanceof Enemy) {
            document.getElementById(`enemyHealth${key}`).innerHTML = `Health: ${initiative[key].health}`
            document.getElementById(`enemyMana${key}`).innerHTML = `Mana: ${initiative[key].mana}`

            if (key == currentTurn) {
                document.getElementById(`enemyCard${key}`).className = "turnCard enemyCard card"
            }
            else {
                document.getElementById(`enemyCard${key}`).className = "enemyCard card"
            }

            if (initiative[key].health <= 0) {
                //enemy turns into loot
                enemyCount--
                document.getElementById(`enemyHealth${key}`).innerHTML = `Enemy Dead`
                document.getElementById(`enemyMana${key}`).innerHTML = `pls no attack me`
                document.getElementById(`enemyCard${key}`).className = "deadCard enemyCard card"
            }
        }
        else {
            if (key == currentTurn) {
                document.getElementById(`playerCard`).className = "turnCard card"
            }
            else {
                document.getElementById(`playerCard`).className = "card"
            }
            //rigged stuff

            document.getElementById(`playerHealth`).innerHTML = `Health: ${player.health.toFixed(2)}`
            document.getElementById(`playerMana`).innerHTML = `Mana: ${player.mana}`
        }
    })

    if (enemyCount == 0) {
        endGame()
    }
}

endGame = () => {
    console.log("game has ended")
    gameEnded = true

    if (player.health <= 0) {
        console.log("player has lost the game, press run away to leave the map")
    }
    else {
        Object.keys(initiative).forEach((key) => {
            if (initiative[key] instanceof Enemy) {
                initiative[key].generateLoot()
                console.log(initiative[key].inventory)
            }
        })
    }

    //save the current character data back to json and also into the server side variable
    saveData()
}

saveData = () => {
    saveCharacterData(player.entityName, player, "w")
}


delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

startTurn = async () => {
    //on each turn,
    updateUI()
    var turnTaker
    //find next turn
    var i = maxInitiative
    if (currentTurn == maxInitiative) currentTurn = 0
    Object.keys(initiative).forEach((key) => {
        if (key > currentTurn && key < i) i = key
    })

    //console.log(`initiate ${i}`)
    currentTurn = i

    // if (!initiative.hasOwnProperty[currentTurn]) {
    //     currentTurn = 0
    // }

    turnTaker = initiative[currentTurn]

    if (turnTaker instanceof Enemy) {
        if (turnTaker.health <= 0) {
            startTurn()
            return
        }
        console.log("Enemy turn now, enemy is " + turnTaker.entityName)

        //enemy attacks the player > find a way to sleep
        turnTaker.performAttack(player)


        //then update the UI
        updateUI()

        //enemies can take a 1 second sleep for each action
        await delay(500)

        //then start next turn
        startTurn()
    }
    else {
        //enable buttons for player if it is his turn
        console.log("player's turn now")
        updateUI()
    }
}

document.getElementById("testModal").addEventListener("click", () => {
    //generate new cards
    var lootInventory = new Inventory()
    var experience = 0

    Object.keys(initiative).forEach((key) => {
        if(initiative[key] instanceof Enemy) {
            var loot = initiative[key].inventory
            loot.items.forEach((item) => {
                lootInventory.addToInventory(item)
            })
            loot.potions.forEach((item) => {
                lootInventory.addToInventory(item)
            })
            loot.weapons.forEach((item) => {
                lootInventory.addToInventory(item)
            })
            lootInventory.gold += loot.gold
            experience += initiative[key].experience
        }
        
    })

    console.log(lootInventory)
    



    //document.getElementById("lootModal").style.display = "block"


    
    // if (!gameEnded) {
    //     console.log("Game has not ended yet! no loot for you")
    //     return
    // }
})