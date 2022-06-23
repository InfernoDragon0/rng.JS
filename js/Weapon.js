class Weapon extends Item {
    constructor(name = "Placeholder", weaponType = "Weapon", attackMin = 0, attackMax = 1, modifier = "", rarity = 0) {
        super(name, "Weapon", rarity)
        this.weaponType = weaponType
        this.attackMin = attackMin
        this.attackMax = attackMax
        this.modifier = modifier
    }

    get itemName() {
        return `${super.itemName} [${this.attackMin} - ${this.attackMax}]`
    }

    static fromJSON(data) {
        return Object.assign(new Weapon(), data)
    }

    static generateRandomItem = (rarity = -1) => {
        var weaponTypes = ["Sword", "Wand", "Dagger", "Carts"]
        var modifiers = ["Heavy", "Light", "Double", "Balanced"]

        var rarity = rarity >= 0 ? rarity : Item.randomRarity()
        var weaponType = weaponTypes[Math.floor(Math.random() * (weaponTypes.length))]
        var modifier = modifiers[Math.floor(Math.random() * (modifiers.length))]
        var min = Math.floor(Math.random() * 10) + (rarity * 5)
        var max = min + Math.floor(Math.random() * 10) + (rarity * 5)

        var wname = `${modifier} ${weaponType}`

        return new Weapon(wname, weaponType, min, max, modifier, rarity)
    }

    rollAttack = () => {
        var baseRoll = Math.floor(Math.random() * (this.attackMax - this.attackMin + 1)) + this.attackMin
        switch (this.modifier) {
            case "Heavy":
                baseRoll *= 1.5
                break
            case "Light":
                baseRoll *= 0.8
                break
            case "Double":
                baseRoll += Math.floor(Math.random() * (this.attackMax - this.attackMin + 1)) + this.attackMin
                break
            case "Balanced":
                break

        }

        return baseRoll
    }
}