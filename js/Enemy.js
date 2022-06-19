class Enemy {
    constructor(name, job = "none", level = 1) {
        this.name = name
        this.health = 100
        this.mana = 100
        this.job = job
        this.strength = 0
        this.dexterity = 0
        this.luck = 0
        this.level = level
        this.statPoints = 0

        this.equippedWeapon = null
        this.inventory = null
    }

    get enemyName() { return this.name }
    set enemyName(name) { this.name = name }

    get jobName() { return this.job }
    set jobName(jobname) { this.job = jobname }

    get enemyStrength() { return this.strength }
    set enemyStrength(strength) { this.strength = strength }

    get enemyDexterity() { return this.dexterity }
    set enemyDexterity(dexerity) { this.dexterity = dexterity }

    get enemyLuck() { return this.luck }
    set enemyLuck(luck) { this.luck = luck }

    get equippedWeapon() { return this.equippedWeapon }
    set equippedWeapon(weapon) { this.equippedWeapon = weapon }

    performAttack() {
        var weaponAttack = this.equippedWeapon.rollAttack()
        var potions = null


    }

    generateStats = () => {
        this.strength = (Math.floor(Math.random() * 11) + 1)
        this.dexterity = (Math.floor(Math.random() * 11) + 1)
        this.luck = (Math.floor(Math.random() * 11) + 1)

        switch (this.job) {
            case "Phantom":
                this.strength = this.strength * 5 + (this.level * 2)
                this.dexterity = this.dexterity * 5 + (this.level * 2)
                this.luck = this.luck * 5 + (this.level * 2)
                break
            case "Blaster":
                this.strength = -1 + (this.level * 2)
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