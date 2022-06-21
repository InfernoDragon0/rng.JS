class Entity {
    constructor(name, job = "none", inventory) {
        this.name = name
        this.maxHealth = 0
        this.health = 0
        this.maxMana = 0
        this.mana = 0
        this.job = job
        this.strength = 0 //Strength increases attack power and health
        this.dexterity = 0 //Dexterity increases your initiative and chances of additional turns
        this.luck = 0 //Luck increases your evade chance and loot rarity
        this.level = 1
        this.experience = 0
        this.statPoints = 0

        this.equippedWeapon = null
        this.inventory = inventory ? inventory : new Inventory()
    }

    get entityName() { return this.name }
    set entityName(name) { this.name = name }

    get jobName() { return this.job }
    set jobName(jobname) { this.job = jobname }

    get entityStrength() { return this.strength }
    set entityStrength(strength) { this.strength = strength }

    get entityDexterity() { return this.dexterity }
    set entityDexterity(dexterity) { this.dexterity = dexterity }

    get entityLuck() { return this.luck }
    set entityLuck(luck) { this.luck = luck }

    get entityWeapon() { return this.equippedWeapon }
    set entityWeapon(weapon) { this.equippedWeapon = weapon }

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
}