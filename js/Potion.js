class Potion extends Item {

    constructor(name = "Placeholder", size = "", potionType = "", rarity = 0, min = 0, max = 0) {
        super(name, "Potion", rarity)
        this.size = size
        this.potionType = potionType
        this.attackMin = min
        this.attackMax = max

    }

    static fromJSON(data) {
        return Object.assign(new Potion(), data)
    }

    get itemName() {
        return `${super.itemName} [${this.attackMin} - ${this.attackMax}]`
    }

    static generateRandomItem = (rarity = -1, level = 0) => {
        var potionTypes = ["Healing", "Weakening", "Ignition", "Freezing", "Acid", "Lifelink"]
        var sizes = ["Large", "Medium", "Small", "Sample"]

        var potionType = potionTypes[Math.floor(Math.random() * (potionTypes.length))]
        var size = sizes[Math.floor(Math.random() * (sizes.length))]
        var rarity = rarity >= 0 ? rarity : Item.randomRarity()

        var wname = `${size} Potion of ${potionType}`
        var min = Math.floor(Math.random() * 10) + (rarity * 5) + (Math.floor(Math.random() * 3 * level))
        var max = min + Math.floor(Math.random() * 10) + (rarity * 5)

        return new Potion(wname, size, potionType, rarity, min, max)
    }

    useOn = (target) => {
        var baseRoll = Math.floor(Math.random() * (this.attackMax - this.attackMin + 1)) + this.attackMin
        //apply effect
        switch (this.potionType) {
            case "Healing":
                var baseHeal = this.size == "Large" ? -40 :
                    this.size == "Medium" ? -25 :
                        this.size == "Small" ? -15 :
                            this.size == "Sample" ? -5 :
                                0
                target.modifyHealth(baseHeal - baseRoll)
                break
            case "Ignition":
                //apply extra heavy damage for x turns
                var burnDuration = this.size == "Large" ? 3 :
                    this.size == "Medium" ? 3 :
                        this.size == "Small" ? 2 :
                            this.size == "Sample" ? 2 :
                                0

                target.takeDamage(baseRoll*0.2)
                target.applyDebuff("damage", burnDuration, baseRoll*burnDuration)
                break
            case "Freezing":
                //stun for x turns, take one time damage halved from roll
                var stunDuration = this.size == "Large" ? 5 :
                    this.size == "Medium" ? 4 :
                        this.size == "Small" ? 3 :
                            this.size == "Sample" ? 2 :
                                0

                target.takeDamage(baseRoll / 2)
                target.applyDebuff("stun", stunDuration, 0)
                break
            case "Acid": //does bypass evasion, instant damage
                var baseDamage = this.size == "Large" ? 85 :
                    this.size == "Medium" ? 40 :
                        this.size == "Small" ? 25 :
                            this.size == "Sample" ? 10 :
                                0
                target.modifyHealth(baseDamage + baseRoll)
                break
            case "Lifelink": //applies lifelink debuff
                var burnDuration = this.size == "Large" ? 5 :
                    this.size == "Medium" ? 4 :
                        this.size == "Small" ? 3 :
                            this.size == "Sample" ? 2 :
                                0

                target.applyDebuff("lifelink", burnDuration, baseRoll / 2)
                break
            case "Weakening": //Damaging makes target take more damage
                var burnDuration = this.size == "Large" ? 5 :
                    this.size == "Medium" ? 4 :
                        this.size == "Small" ? 3 :
                            this.size == "Sample" ? 2 :
                                0

                target.applyDebuff("weaken", burnDuration, baseRoll)
                break

        }
    }
}