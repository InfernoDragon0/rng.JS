class Item {
    constructor(name = "Placeholder", type = "Item", rarity = 0, level = 0) {
        this.name = name
        this.type = type
        this.rarity = rarity
        this.level = level

        this.raritys = ["Common", "Uncommon", "Rare", "Epic", "Mythic"]
    }

    get itemName() { 
        return `${this.raritys[this.rarity]} ${this.name}`
    }
    set itemName(name) { this.name = name }

    get itemType() { return this.type }

    static fromJSON(data) {
        return Object.assign(new Item(), data)
    }

    static generateRandomItem = () => {
        console.log("plain item cannot be generated")
    }

    static randomRarity = () => {
        var weight = Math.floor(Math.random() * 100)
        
        if (weight < 60) {
            return 0
        }
        else if (weight < 77) {
            return 1
        }
        else if (weight < 87) {
            return 2
        }
        else if (weight < 95) {
            return 3
        }
        else if (weight < 100) {
            return 4
        }
        else {
            return 0
        }
    }
}