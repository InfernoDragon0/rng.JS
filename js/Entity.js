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
        this.debuffs = []

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

    get entityLevel() { return this.level }
    set entityLevel(level) { this.level = level }

    get entityWeapon() { return this.equippedWeapon }
    set entityWeapon(weapon) { this.equippedWeapon = weapon }

    get isStunned() { 
        for (let debuff of this.debuffs) {
            if (debuff["debuff"] == "stun") {
                return true
            }
        }
        return false
    }

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
            this.modifyHealth(damage)

            if (this.health <= 0) {
                console.log(`${this.name} has Died`)
            }
        }
    }

    applyDebuff = (debuff, duration, power) => {
        if (duration == 0) { //apply once

        }
        else { //if duration is -1, forever, same debuffs are stackable
            this.debuffs.push({"duration": duration, "power": power, "debuff": debuff})
        }
    }

    tickDebuffs = () => {
        let clearables = []
        //loop thru the debuffs, -1 duration and takedamage power etc
        this.debuffs.map((debuff, i) => {
            if (debuff.duration > 0 || debuff.duration == -1) {
                switch (debuff["debuff"]) {
                    case "damage":
                        this.takeDamage(debuff.power)
                        console.log(this.name + " taken " + debuff.power + " damage from debuff")
                        break
                }
                if (debuff.duration > 0)
                    debuff.duration--
                
                if (debuff.duration == 0) {
                    clearables.push(debuff)
                }
            }
        })
        for (let clearable of clearables) {
            if (this.debuffs.indexOf(clearable) != -1) {
                this.debuffs.splice(this.debuffs.indexOf(clearable), 1)
                console.log(this.name + " removed " + clearable.debuff + " debuff")
            }
        }
        
        
    }
}