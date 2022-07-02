# rng.JS
Simple Electron JS RNG Game

run with ```npm start```

## Features
### Classes
- Phantom (High Luck)
- Warrior (High Strength)
- Assassin (High Dexterity)
- Mage (Balanced Luck & Dexterity)

### Stats
- Leveling grants 2 stat points
- Strength: More HP, more Damage
- Luck: More Evasion, More Loot
- Dexterity: Higher chance to start first

### Levels
- Experience rewards randomly from enemies
- Up to level 20

### Enemies
- Randomly Generated
- Around your level
- Elite enemies start to appear after level 10 with enhanced stat distribution
- Elites guarantee Epic Buff & Epic Weapon reward
- Random Loot generated
- Enemies drop their weapons at a chance, higher if they are of higher levels

### Shop
- Sells Inventory Slots
- Sells Weapon Enhancement
- Sells Weapon Modifier Rerolls
- Sells Buffs & Weapons Lootbox up till Rare

### Inventory
- Holds up to 200 Items
- Upgrade inventory slots in the shop
- Sell your items by right clicking to select

### Saves & Character Creation
- Unlimited character creation
- Choose from 4 classes
- Reroll as many times as you want

### Arena
- Attack by clicking on the enemy tag
- Able to Flee from the arena
- Use Buffs & Debuffs against enemies
- Randomly Selected up to 5 enemies
- Regain 5 mana per turn taken by anyone

### Weapons
- Shocking: 80% on hit damage, Chance to stun attacked enemy for 1 turn
- Igniting: 20% on hit damage, but deals an additional 200% damage at the start of enemy turn
- Balanced: Base weapon damage
- Focused: 100% of the damage Cannot be evaded, additional 10% on hit damage
- Venomous: 60% on hit damage, Applies a long lasting, stackable 25% poison damage over time on the target
- Double: Deals two rolled damage instances to the target

### Buffs & Debuffs
- Healing: Heals target for an amount
- Freezing: Stuns target for a few turns
- Weakening: Stackable debuff on target, takes additional damage on hit
- Ignition: Extreme damage on the target's next turn
- Acid: High instant damage that cannot be evaded
- Uses 10 mana per cast
