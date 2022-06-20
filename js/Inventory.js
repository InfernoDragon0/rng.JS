class Inventory {
    constructor() {
        this.slots = 10
        this.gold = 0
        this.potions = []
        this.weapons = []
        this.items = []
    }

    addToInventory = (item) => {
        var itemType = item.itemType

        switch (itemType) {
            case "Weapon":
                this.weapons.push(item)
                break

            case "Potion":
                this.potions.push(item)
                break

            default:
                this.items.push(item)
                break
        }
    }

    removeFromInventory = (item) => {
        var itemType = item.itemType

        switch (itemType) {
            case "Weapon":
                this.weapons.pop(item)
                break

            case "Potion":
                this.potions.pop(item)
                break

            default:
                this.items.pop(item)
                break
        }
    }

    contains = (item) => {
        var itemType = item.itemType
    }

    getItemIndex = (item) => {
        var itemType = item.itemType


    }

    useItem = (item, itemIndex, amount) => {
        var itemType = item.itemType

        switch (itemType) {
            case "Weapon":
                this.weapons.splice(itemIndex, 1)
                break

            case "Potion":
                this.potions.pop(item)
                break

            default:
                this.items.pop(item)
                break
        }
    }
}