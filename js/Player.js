class Player extends Entity {
    constructor(name = "player", job = "none", inventory = null) {
        super(name, job, inventory)
        this.maxHealth = 100
        this.health = 100
        this.maxMana = 100
        this.mana = 100
    }

    static fromJSON(data) {
        return Object.assign(new Player(), data)
    }

    modifyHealth(modification) { 
        super.modifyHealth(modification)
        document.getElementById("playerHealth").innerHTML = `Current Health: ${this.health}/${this.maxHealth}`
    }

    performAttack = (target) => {
        var weaponAttack = this.equippedWeapon.rollAttack()
        var potions = 0
        var stats = 0

        switch (this.job) {
            case "Phantom":
                stats += this.dexterity * 2
                break
            case "Warrior":
                stats += this.strength * 2
                break
            case "Mage":
                stats += this.luck + this.dexterity
                break
            case "Assassin":
                stats += this.luck * 2
                break

        }
        target.takeDamage(weaponAttack + potions + stats)
    }

    levelUp = () => {
        if (this.level < 20) {
            this.level++
            this.statPoints += 2
        }
        
    }

    generateStats = () => {
        var totalStatDistribution = 15

        switch (this.job) {
            case "Phantom": //luck bias
                this.luck = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.luck
                
                this.dexterity = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.dexterity

                this.strength = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.strength

                this.luck += totalStatDistribution + 3
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

                this.strength += totalStatDistribution + 5
                break
            case "Mage": //luck + dex bias, highest max stat for dex/luck but can have negative str
                this.dexterity = (Math.floor(Math.random() * totalStatDistribution))
                this.luck = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= (this.dexterity + this.luck)

                this.strength = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.strength

                this.dexterity += totalStatDistribution + 2
                this.luck += totalStatDistribution + 2
                break
            case "Assassin": //dex bias
                this.dexterity = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.dexterity
            
                this.strength = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.strength

                this.luck = (Math.floor(Math.random() * totalStatDistribution))
                totalStatDistribution -= this.luck

                this.dexterity += totalStatDistribution + 5
                break
            default:
                break
        }

        this.health += this.strength*2
        this.maxHealth = this.health
        this.mana += (this.dexterity+this.luck)/2
        this.maxMana = mana

    }
}