class Potion extends Item {

    constructor(name = "Placeholder", size = "", potionType = "", rarity = 0) {
        super(name, "Potion", rarity)
        this.size = size
        this.potionType = potionType
    }

    static fromJSON(data) {
        return Object.assign(new Potion(), data)
    }

    static generateRandomItem = () => {
        var potionTypes = ["Healing", "Damaging", "Burning", "Freezing", "Acid", "Poison"]
        var sizes = ["Large", "Medium", "Small", "Sample"]

        var potionType = potionTypes[Math.floor(Math.random() * (potionTypes.length))]
        var size = sizes[Math.floor(Math.random() * (sizes.length))]
        var rarity = Item.randomRarity()

        var wname = `${size} Potion of ${potionType}`

        return new Potion(wname, size, potionType, rarity)
    }

    useOn = (target) => {
        quantity -= 1
        //apply effect
        switch (this.potionType) {
            case "Healing":
                var baseHeal = this.size == "Large" ? -50 : 
                                this.size == "Medium" ? -30 :
                                this.size == "Small" ? -15 :
                                this.size == "Sample" ? -5 :
                                0
                target.modifyHealth(baseHeal * (1+this.rarity))
                break

        }
    }
}