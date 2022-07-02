class Weapon extends Item {
    constructor(name = "Placeholder", weaponType = "Weapon", attackMin = 0, attackMax = 1, modifier = "", rarity = 0) {
        super(name, "Weapon", rarity)
        this.weaponType = weaponType
        this.attackMin = attackMin
        this.attackMax = attackMax
        this.modifier = modifier
    }

    get itemNameClean() { return super.itemName }

    get itemName() {
        return `${super.itemName} (${this.modifier}) [${this.attackMin} - ${this.attackMax}]`
    }

    static fromJSON(data) {
        return Object.assign(new Weapon(), data)
    }

    static generateRandomItem = (rarity = -1, level = 0) => {
        var weaponTypes = ["Sword", "Wand", "Dagger", "Carts"]
        var modifiers = ["Igniting", "Venomous", "Double", "Shocking", "Focused", "Balanced"]

        var rarity = rarity >= 0 ? rarity : Item.randomRarity()
        var weaponType = weaponTypes[Math.floor(Math.random() * (weaponTypes.length))]
        var modifier = modifiers[Math.floor(Math.random() * (modifiers.length))]
        var min = Math.floor(Math.random() * 10) + (rarity * 5) + (Math.floor(Math.random() * 3 * level))
        var max = min + Math.floor(Math.random() * 10) + (rarity * 5)

        var wname = `${weaponType}`

        return new Weapon(wname, weaponType, min, max, modifier, rarity)
    }

    rollModifier = () => {
        var modifiers = ["Igniting", "Venomous", "Double", "Shocking", "Focused", "Balanced"]
        if (modifiers.indexOf(this.modifier) != -1)
            modifiers.splice(modifiers.indexOf(this.modifier),1)
        
            var modifier = modifiers[Math.floor(Math.random() * (modifiers.length))]
        this.modifier = modifier
    }

    rollAttack = (target) => {
        var baseRoll = Math.floor(Math.random() * (this.attackMax - this.attackMin + 1)) + this.attackMin
        switch (this.modifier) {
            case "Igniting": //low direct damage, ignites the next turn for double damage
                target.applyDebuff("damage", 2, baseRoll * 2)
                baseRoll *= 0.2
                break
            case "Venomous": //moderate direct damage, stackable poisonous damage
                target.applyDebuff("damage", 8, baseRoll / 4)
                baseRoll *= 0.6
                break
            case "Double": //rolls twice
                baseRoll += Math.floor(Math.random() * (this.attackMax - this.attackMin + 1)) + this.attackMin
                break
            case "Shocking": 
                if (target instanceof Enemy) {//the target you attack is stunned
                    let shockChance = Math.floor(Math.random() * 100) + (this.rarity * 20)
                    if (shockChance > 60) {
                        target.applyDebuff("stun", 2, 0)
                    }
                    baseRoll *= 0.8
                }
                else { //players cannot be stunned
                    baseRoll *= 1.2
                }
                break
            case "Focused": //raw damage, then additionally 10% more damage as normal damage
                target.modifyHealth(baseRoll)
                baseRoll *= 0.1
                break

        }

        return baseRoll
    }
}