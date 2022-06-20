//TODO build Entity.js from the similarities of Enemy and Player

class Enemy {
    constructor(name, job = "none", level = 1) {
        this.name = name
        this.health = 25
        this.mana = 25
        this.job = job
        this.strength = 0
        this.dexterity = 0
        this.luck = 0
        this.level = level

        this.equippedWeapon = Weapon.generateRandomItem()
        this.inventory = null
    }

    get enemyName() { return this.name }
    set enemyName(name) { this.name = name }

    get jobName() { return this.job }
    set jobName(jobname) { this.job = jobname }

    get enemyStrength() { return this.strength }
    set enemyStrength(strength) { this.strength = strength }

    get enemyDexterity() { return this.dexterity }
    set enemyDexterity(dexerity) { this.dexterity = dexterity }

    get enemyLuck() { return this.luck }
    set enemyLuck(luck) { this.luck = luck }

    get equippedWeapon() { return this.equippedWeapon }
    set equippedWeapon(weapon) { this.equippedWeapon = weapon }

    modifyHealth(modification) { 
        if (this.health - modification < 0) {
            this.health = 0
        }
        else if (this.health - modification > this.maxHealth) {
            this.health = this.maxHealth 
        }
        else {
            this.health -= modification
        }
    }

    performAttack() {
        //enemy performs attack of 5% to 100% of its weapon based on level, max at lvl 20
        var weaponAttack = this.equippedWeapon.rollAttack() * this.level/20
        var potions = null
    }

    takeDamage = (damage) => { 
        var evade = Math.floor(Math.random() * 100)

        if (evade < this.luck) { 
            console.log("Damage Evaded")
        }
        else { 
            console.log(`${damage} Damage taken`)
            this.modifyHealth(damage)

            if (this.health == 0) {
                console.log(`${this.name} has Died`)
            }
        }
    }

    generateLoot = () => {
        this.inventory = new Inventory()
        
        //generate gold
        this.inventory.gold = Math.floor(Math.random() * 10 * this.level)

        //generate potions, up to 5 per mob
        var totalPotions = Math.min(Math.floor(Math.random() * 2 * this.level), 5)

        for (var i = 0; i < totalPotions; i++) {
            var potion = Potion.generateRandomItem()
            this.inventory.addToInventory(potion)
        }

        //chance from 5 to 100 based on level (100% chance at lvl 20)
        var dropsWeapon = Math.floor(Math.random() * 100)

        //drops the enemy's equipped weapon
        if (dropsWeapon < 5 * this.level) {
            this.inventory.addToInventory(this.equippedWeapon)
        }
    }

    generateStats = () => {
        this.strength = (Math.floor(Math.random() * this.level) + 5)
        this.dexterity = (Math.floor(Math.random() * this.level) + 5)
        this.luck = (Math.floor(Math.random() * this.level) + 5)

        switch (this.job) {
            case "Phantom":
                this.strength = this.strength * 5 + (this.level * 2)
                this.dexterity = this.dexterity * 5 + (this.level * 2)
                this.luck = this.luck * 5 + (this.level * 2)
                break
            case "Blaster":
                this.strength = -1 + (this.level * 2)
                break
            case "Warrior":
                this.strength += (this.strength - 1) + (this.level * 2)
                break
            case "Mage":
                this.luck += (this.luck + 8) + (this.level * 2)
                break
            case "Assassin":
                this.dexterity += (this.dexterity + 7) + (this.level * 2)
                break
            default:
                break
        }

        this.health += this.strength * 2
        this.mana += (this.dexterity + this.luck) / 2

    }
}