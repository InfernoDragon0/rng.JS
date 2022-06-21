class Weapon extends Item {
    constructor(name = "Placeholder", weaponType = "Weapon", attackMin = 0, attackMax = 1, modifier = "", rarity = 0) {
        super(name, "Weapon", 1, rarity)
        this.weaponType = weaponType
        this.attackMin = attackMin
        this.attackMax = attackMax
        this.modifier = modifier
    }

    get itemName() {
        return `${super.itemName} [${this.attackMin} - ${this.attackMax}]`
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
        return Math.floor(Math.random() * (this.attackMax - this.attackMin + 1)) + this.attackMin
    }
}