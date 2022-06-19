class Player {
    constructor(name, job = "none") {
        this.name = name
        this.maxHealth = 100
        this.health = 100
        this.maxMana = 100
        this.mana = 100
        this.job = job
        this.strength = 0
        this.dexterity = 0
        this.luck = 0
        this.level = 1
        this.statPoints = 0

        this.equippedWeapon = null
        this.inventory = null
    }

    get playerName() { return this.name }
    set playerName(name) { this.name = name }

    get jobName() { return this.job }
    set jobName(jobname) { this.job = jobname }

    get playerStrength() { return this.strength }
    set playerStrength(strength) { this.strength = strength }

    get playerDexterity() { return this.dexterity }
    set playerDexterity(dexterity) { this.dexterity = dexterity }

    get playerLuck() { return this.luck }
    set playerLuck(luck) { this.luck = luck }

    get playerWeapon() { return this.equippedWeapon }
    set playerWeapon(weapon) { this.equippedWeapon = weapon }

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
        
        document.getElementById("playerHealth").innerHTML = `Current Health: ${this.health}/${this.maxHealth}`
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

    performAttack = (target) => {
        var weaponAttack = this.playerWeapon.rollAttack()
        var potions = 0
        var stats = 0

        switch (this.job) {
            case "Phantom":
                stats += this.dexterity * 2
                break
            case "Warrior":
                stats += this.strength * 2
                break
            case "Mage":
                stats += this.luck + this.dexterity
                break
            case "Assassin":
                stats += this.luck * 2
                break

        }

        target.takeDamage(weaponAttack + potions + stats)
        
    }

    levelUp = () => {
        if (this.level < 20) {
            this.level++
            this.statPoints += 2
        }
        
    }

    generateStats = () => {
        this.strength = (Math.floor(Math.random() * 11) + 1)
        this.dexterity = (Math.floor(Math.random() * 11) + 1)
        this.luck = (Math.floor(Math.random() * 11) + 1)

        switch (this.job) {
            case "Phantom":
                this.strength = this.strength * .5
                this.dexterity = this.dexterity * .5
                this.luck = this.luck * .5
                break
            case "Blaster":
                this.strength = -1
                break
            case "Warrior":
                this.strength += (this.strength - 1)
                break
            case "Mage":
                this.luck += (this.luck + 8)
                break
            case "Assassin":
                this.dexterity += (this.dexterity + 7)
                break
            default:
                break
        }

        this.health += this.strength*2
        this.maxHealth += this.strength*2
        this.mana += (this.dexterity+this.luck)/2
        this.maxMana += (this.dexterity+this.luck)/2

    }
}