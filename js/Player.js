class Player {
    constructor(name, job = "none") {
        this.name = name
        this.health = 100
        this.mana = 100
        this.job = job
        this.strength = 0
        this.dexterity = 0
        this.luck = 0
        this.level = 1
        this.statPoints = 0
    }

    get playerName() { return this.name }
    set playerName(name) { this.name = name }

    get jobName() { return this.job }
    set jobName(jobname) { this.job = jobname }

    get playerStrength() { return this.strength }
    set playerStrength(strength) { this.strength = strength }

    get playerDexterity() { return this.dexterity }
    set playerDexterity(dexerity) { this.dexterity = dexterity }

    get playerLuck() { return this.luck }
    set playerLuck(luck) { this.luck = luck }

    levelUp = () => {
        if (this.level < 20) {
            this.level++
            this.statPoints += 2
        }
        
    }

    generateStats = () => {
        this.strength = (Math.floor(Math.random() * 11) + 1)
        this.dexterity = (Math.floor(Math.random() * 11) + 1)
        this.luck = (Math.floor(Math.random() * 11) + 1)

        switch (this.job) {
            case "Phantom":
                this.strength = this.strength * 5
                this.dexterity = this.dexterity * 5
                this.luck = this.luck * 5
                break
            case "Blaster":
                this.strength = -1
                break
            case "Warrior":
                this.strength += (this.strength - 1)
                break
            case "Mage":
                this.luck += (this.luck + 8)
                break
            case "Assassin":
                this.dexterity += (this.dexterity + 7)
                break
            default:
                break
        }

        this.health += this.strength*2
        this.mana += (this.dexterity+this.luck)/2

    }
}