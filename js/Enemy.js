class Enemy extends Entity {
    constructor(name, job = "none", level = 1) {
        this.name = name
        this.health = 25
        this.mana = 25
        this.job = job
        this.level = level

        this.equippedWeapon = Weapon.generateRandomItem()
    }

    performAttack = (target) => {
        //enemy performs attack of 5% to 100% of its weapon based on level, max at lvl 20
        var modifier = 1
        if(this.level < 20) modifier = this.level / 20 // just in case level can exceed lvl 20
        var weaponAttack = this.equippedWeapon.rollAttack() * modifier
        var potions = null // future implementation?

        target.takeDamage(weaponAttack + potions)
    }

    generateLoot = () => {
        this.inventory = new Inventory()
        
        //generate gold
        this.inventory.gold = Math.floor(Math.random() * 10 * this.level)

        //generate potions, up to 5 per mob
        var totalPotions = Math.min(Math.floor(Math.random() * 2 * this.level), 5)

        for (var i = 0; i < totalPotions; i++) {
            var potion = Potion.generateRandomItem()
            this.inventory.addToInventory(potion)
        }

        //chance from 5 to 100 based on level (100% chance at lvl 20)
        var dropsWeapon = Math.floor(Math.random() * 100)

        //drops the enemy's equipped weapon
        if (dropsWeapon < 5 * this.level) {
            this.inventory.addToInventory(this.equippedWeapon)
        }
    }

    generateStats = () => {
        this.strength = (Math.floor(Math.random() * this.level) + 5)
        this.dexterity = (Math.floor(Math.random() * this.level) + 5)
        this.luck = (Math.floor(Math.random() * this.level) + 5)

        switch (this.job) {
            case "Phantom":
                this.strength = this.strength * 5 + (this.level * 2)
                this.dexterity = this.dexterity * 5 + (this.level * 2)
                this.luck = this.luck * 5 + (this.level * 2)
                break
            case "Warrior":
                this.strength += (this.strength - 1) + (this.level * 2)
                break
            case "Mage":
                this.luck += (this.luck + 8) + (this.level * 2)
                break
            case "Assassin":
                this.dexterity += (this.dexterity + 7) + (this.level * 2)
                break
            default:
                break
        }

        this.health += this.strength * 2
        this.mana += (this.dexterity + this.luck) / 2

    }
}