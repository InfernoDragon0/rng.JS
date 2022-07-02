var readCharacter = window.testAPI.readCharacter
var saveCharacterData = window.testAPI.saveCharacterData

var player
var enemies = []
var initiative = {}
var currentTurn = 0
var maxInitiative = 0
var playerTurn = 0
var gameEnded = false
var collectedLoot = []
var chosenLoot = []
var experience = 0
var gold = 0
var toggleLoot = false
var selectedPotion = -1

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
        newEnemy.level = Math.floor((Math.random() * 3) + player.entityLevel) // more level = more levels
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

document.getElementById("playerCard").addEventListener("click", () => {
    if(currentTurn != playerTurn){
        console.log("not your turn")
        return
    }

    if (selectedPotion != -1 && player.health > 0) {
        player.inventory.useItem(player.inventory.potions[selectedPotion],selectedPotion, player)
        selectedPotion = -1
        updateUI()
        return
    }
})

attackButton = (i) => {
    if (currentTurn != playerTurn) {
        console.log("not your turn")
        return
    }

    if (selectedPotion != -1 && i.health > 0) {
        player.inventory.useItem(player.inventory.potions[selectedPotion],selectedPotion, i)
        selectedPotion = -1
        updateUI()
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

usePotion = (index) => {
    if (currentTurn != playerTurn) {
        console.log("not your turn")
        return
    }

    if (selectedPotion == index) { // unselect
        selectedPotion = -1
        document.getElementById(`item${index}`).className = document.getElementById(`item${index}`).className.replace(" selected", "")
    }
    else if (selectedPotion == -1) { // not selected
        selectedPotion = index // select the potion
        document.getElementById(`item${index}`).className += " selected"
    }
    else { // change selection
        document.getElementById(`item${selectedPotion}`).className = document.getElementById(`item${selectedPotion}`).className.replace(" selected", "")
        selectedPotion = index // select the potion
        document.getElementById(`item${index}`).className += " selected"
    }
}

updateUI = () => {
    //console.log("Update UI")
    var enemyCount = Object.keys(initiative).length - 1

    document.getElementById("potions").innerHTML = ""

    var potionsDiv = document.getElementById("potions")
    potionsDiv.className = "items"
    potionsDiv.id = "potions"

    player.inventory.potions.forEach((itemz, index) => {
        var itemDiv = document.createElement("div")
        itemDiv.className = "item " + (itemz.rarity == 0 ? "common" :
            itemz.rarity == 1 ? "uncommon" :
                itemz.rarity == 2 ? "rare" :
                    itemz.rarity == 3 ? "epic" :
                        itemz.rarity == 4 ? "mythic" : "")
        itemDiv.id = `item${index}`
        itemDiv.title = itemz.itemName
        var item = document.createElement("i")
        item.className = "ra ra-2x " + (itemz.potionType == "Healing" ? "ra-health-increase" :
            itemz.potionType == "Damaging" ? "ra-spinning-sword" :
                itemz.potionType == "Burning" ? "ra-fire-symbol" :
                    itemz.potionType == "Freezing" ? "ra-snowflake" :
                        itemz.potionType == "Acid" ? "ra-biohazard" :
                            itemz.potionType == "Poison" ? "ra-doubled" : "")

        itemDiv.appendChild(item)
        itemDiv.addEventListener("click", () => {
            usePotion(index)
        })
        potionsDiv.appendChild(itemDiv)

    })

    if (selectedPotion != -1) {
        document.getElementById(`potion${selectedPotion}`).className += " selected"
    }

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
                document.getElementById(`playerCard`).className = "turnCard playerCard card"
            }
            else {
                document.getElementById(`playerCard`).className = "playerCard card"
            }
            //rigged stuff

            document.getElementById(`playerHealth`).innerHTML = `Health: ${player.health.toFixed(2)}`
            document.getElementById(`playerMana`).innerHTML = `Mana: ${player.mana}`
        }
    })

    if (enemyCount == 0 && !gameEnded) {
        endGame()
    }
    if (player.health <= 0 && !gameEnded) {
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
    let i = maxInitiative
    if (currentTurn == maxInitiative) {
        currentTurn = 0
    }
    currentTurn = Object.keys(initiative).find(key => parseInt(key) > currentTurn)

    // Object.keys(initiative).forEach((key) => {
    //     console.log("key before: " + key + " and currentTurn " + currentTurn + " and i " + i)
    //     console.log("1st Condition " + (key > currentTurn))
    //     console.log("2nd Condition " + (key < i))
    //     console.log("both Condition " + (key > currentTurn && key < i))
    //     // console.log("both Conditionz " + ((key > currentTurn) && (key < i)))
    //     if (key > currentTurn && key < i) i = key
    //     console.log("key set to " + i)
    // })

    // currentTurn = i
    // console.log("currentTurn set to " + currentTurn)

    turnTaker = initiative[currentTurn]
    turnTaker.tickDebuffs()
    if (turnTaker instanceof Enemy) {
        if (turnTaker.health <= 0 || turnTaker.isStunned) {
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

document.getElementById("collect").addEventListener("click", () => {

    if (!gameEnded) {
        console.log("Game has not ended yet! no loot for you")
        return
    }
    //generate new cards
    var lootInventory = new Inventory()
    lootInventory.slots = 999

    console.log("map items to inventory")

    document.getElementById("itemSlot").innerText = `Item Slots Available: ${player.inventory.slotsLeft}/${player.inventory.slots}`

    Object.keys(initiative).forEach((key) => {
        if (initiative[key] instanceof Enemy) {
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
            gold += loot.gold
            experience += initiative[key].experience
        }

    })

    console.log(lootInventory)

    var itemCard = document.getElementById("lootCards")

    lootInventory.inventoryItems.map((item, index) => {
        var lootCard = document.createElement("div")
        lootCard.className = "enemyCard card"
        lootCard.id = `itemCard${index}`

        lootCard.addEventListener("click", () => {
            lootItem(index)
        })

        if (item instanceof Weapon) {
            console.log("item is weapon")
            console.log(item)
            var lootImage = document.createElement("div")
            lootImage.className = "ra ra-sword ra-2x"

            var lootHeader = document.createElement("p")
            lootHeader.className = "characterHeader characterDetails"
            lootHeader.innerHTML = item.itemNameClean

            var lootLeftCard = document.createElement("div")
            lootLeftCard.className = "enemyCharacterLeft"

            var lootMinAtt = document.createElement("p")
            lootMinAtt.className = "characterDetails"
            lootMinAtt.innerHTML = `Minimum Att: ${item.attackMin}`

            lootLeftCard.appendChild(lootMinAtt)

            var lootRightCard = document.createElement("div")
            lootRightCard.className = "enemyCharacterRight"

            var lootMaxAtt = document.createElement("p")
            lootMaxAtt.className = "characterDetails"
            lootMaxAtt.innerHTML = `Maximum Att: ${item.attackMax}`

            lootRightCard.appendChild(lootMaxAtt)

            lootCard.appendChild(lootImage)
            lootCard.appendChild(lootHeader)
            lootCard.appendChild(lootLeftCard)
            lootCard.appendChild(lootRightCard)
        }
        else { // other item or pot
            console.log("item is pot")
            console.log(item)
            var lootImage = document.createElement("div")
            lootImage.className = "ra ra-sword ra-2x"

            var lootHeader = document.createElement("p")
            lootHeader.className = "characterHeader, characterDetails"
            lootHeader.innerHTML = item.itemName

            lootCard.appendChild(lootImage)
            lootCard.appendChild(lootHeader)
        }
        console.log(lootCard)

        itemCard.appendChild(lootCard)
        collectedLoot.push(item)
        chosenLoot.push(false)
        console.log("item appended to modal")
    })

    document.getElementById("lootGold").innerHTML = `Gold: ${gold}`
    document.getElementById("lootExp").innerHTML = `Exp: ${experience}`

    document.getElementById("lootModal").style.display = "block"
})

document.getElementById("selectAll").addEventListener("click", () => {
    toggleLoot = !toggleLoot
    chosenLoot.map((item, index) => {
        chosenLoot[index] = toggleLoot
        document.getElementById(`itemCard${index}`).className = `enemyCard card` + (toggleLoot ? " chosenLootCard" : "")
    })
    document.getElementById("selectAll").innerHTML = toggleLoot ? "Deselect All" : "Select All"
})

lootItem = (item) => {
    chosenLoot[item] = !chosenLoot[item] //inverter
    if (chosenLoot[item]) document.getElementById(`itemCard${item}`).className = `chosenLootCard enemyCard card`
    else document.getElementById(`itemCard${item}`).className = `enemyCard card`

    // document.getElementById(`itemCard${index}`).className = `${chosenLoot[item] ? "selectedLootCard " : ""}enemyCard card`
}

document.getElementById("confirmLoot").addEventListener("click", () => {
    var lootCount = 0
    chosenLoot.map((item) => {
        if (item) { lootCount += 1 }
    })

    if (lootCount > player.inventory.slotsLeft) {
        console.log(`Too many items, inventory: ${player.inventory.itemCount}/${player.inventory.slots}`)
        return
    }

    collectedLoot.map((item, index) => {
        if (chosenLoot[index]) {
            console.log(`adding item to inventory ${chosenLoot[index]}`)
            console.log(item)
            player.inventory.addToInventory(item)
        }
    })

    player.inventory.gold += Math.floor(gold)
    player.gainExperience(experience)

    saveData()
    window.location.href = "./gameLobby.html"
})