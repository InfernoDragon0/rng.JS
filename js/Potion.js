class Potion extends Item {

    constructor(name = "Placeholder", quantity = 1, size = "", potionType = "") {
        super(name, "Potion", quantity)
        this.size = size
        this.potionType = potionType
    }

    static generateRandomItem = () => {
        var potionTypes = ["Healing", "Damaging", "Burning", "Freezing", "Acid", "Poison"]
        var sizes = ["Large", "Medium", "Small", "Sample"]

        var potionType = potionTypes[Math.random() * (potionTypes.length - 1)]
        var size = sizes[Math.random() * (sizes.length - 1)]

        wname = `${size} Potion of ${potionType}`

        return new Potion(wname, 1, size, potionType)
    }

    drinkPotion = () => {
        quantity -= 1
        //apply effect
    }
}