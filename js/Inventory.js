class Inventory {
    constructor(slots = 30, gold = 0) {
        this.slots = slots
        this.gold = gold
        this.potions = []
        this.weapons = []
        this.items = []
    }

    get inventoryItems() {return this.items.concat(this.weapons, this.potions)}
    set inventoryItems(items) { this.items = items}

    get itemCount() {return this.items.length + this.weapons.length + this.potions.length}
    get slotsLeft() { return this.slots - this.itemCount}

    static fromJSON(data) {
        return Object.assign(new Inventory(), data)
    }

    addToInventory = (item, bypass = false) => {
        if(!bypass && this.slots == this.itemCount){
            return `No slot left. Inventory slots: ${this.slotsLeft}`
        }

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

    contains = (item) => {
        var itemType = item.itemType

        switch (itemType) {
            case "Weapon":
                return this.weapons.includes(item)

            case "Potion":
                return this.potions.includes(item)

            default:
                return this.items.includes(item)
        }
    }

    getItemIndex = (item, arr) => {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == item) return i
        }
        return -1 //return -1 if nothing found
    }

    useItem = (item, itemIndex) => {
        var itemType = item.itemType

        if (this.contains(item) == -1) {
            return //item doesn't exist lmao
        }

        switch (itemType) {
            case "Weapon":
                if (!itemIndex)
                    itemIndex = getItemIndex(item, this.weapons)
                return this.weapons.splice(itemIndex, 1)

            case "Potion":
                if (!itemIndex)
                    itemIndex = getItemIndex(item, this.potions)
                return this.potions.splice(item)

            default:
                if (!itemIndex)
                    itemIndex = getItemIndex(item, this.items)
                return this.items.splice(item)
        }
    }
}