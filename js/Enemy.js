class Enemy extends Entity {
    constructor(name = "Enemy", job = "none", inventory = null, level = 1) {
        super(name, job, inventory)
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

        //experience as loot
        this.experience = Math.floor(Math.random() * 20 * this.level)
    }

    generateStats = () => {
        if(this.job == "none"){
            var jobList = ["Phantom", "Warrior", "Mage", "Assassin"]
            this.job = jobList[Math.floor(Math.random() * jobList.length)]
        }

        var totalStatDistribution = 10
        this.name = `Level ${this.level} Enemy ${this.job}`

        switch (this.job) {
            case "Phantom": //luck bias
                this.luck = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.luck
                
                this.dexterity = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.dexterity

                this.strength = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.strength

                this.luck += totalStatDistribution + 1
                this.dexterity += 1
                this.strength += 1
                break
            case "Warrior": //strength bias
                this.strength = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.strength

                this.dexterity = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.dexterity

                this.luck = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.luck

                this.strength += totalStatDistribution + 3
                break
            case "Mage": //luck + dex bias, highest max stat for dex/luck but can have negative str
                this.dexterity = (Math.floor(Math.random() * totalStatDistribution))
                this.luck = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= (this.dexterity + this.luck)

                this.strength = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.strength

                this.dexterity += totalStatDistribution + 1
                this.luck += totalStatDistribution + 1
                break
            case "Assassin": //dex bias
                this.dexterity = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.dexterity
            
                this.strength = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.strength

                this.luck = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.luck

                this.dexterity += totalStatDistribution + 3
                break
            default:
                break
        }

        this.health += this.strength
        this.maxHealth = this.health
        this.mana += (this.dexterity+this.luck)/4
        this.maxMana = this.mana

    }
}