// This function prints every ability for each Pokemon{}
function printPokemonAndAbilities(pokemonArr) {

    // return a new Array[] with each pokemon{} and their abilities only
    return pokemonArr.map(mon => {
        const currentMon = { name: mon.name }

        for (let i = 0; i < mon.abilities.length; i++) {
            // abilities[]
            let abilityName = `ability_${i}`
            currentMon[abilityName] = mon.abilities[i].ability.name
        }
        return currentMon
    })
}

// This function prints each move, and how many Pokemon has ability => {moveName: numOfPokemon}
function countAbilities(pokemonArr) {
    const abilityCount = {}

    for (const pokemon of pokemonArr) {
        for (const item of pokemon.abilities) {
            if (!abilityCount.hasOwnProperty(item.ability.name)) abilityCount[item.ability.name] = 1
            else abilityCount[item.ability.name]++
        }
    }
    return abilityCount
}




/*
Every first 151 Pokemon's ability

adaptability
aftermath
analytic
anger-point
anticipation
arena-trap
battle-armor
big-pecks
blaze
chlorophyll
clear-body
cloud-nine
competitive
compound-eyes
cursed-body
cute-charm
damp
defiant
download
drought
dry-skin
early-bird
effect-spore
filter
flame-body
flash-fire
forewarn
friend-guard
frisk
gluttony
guts
harvest
healer
hustle
hydration
hyper-cutter
ice-body
illuminate
immunity
imposter
infiltrator
inner-focus
insomnia
intimidate
iron-fist
justified
keen-eye
leaf-guard
levitate
lightning-rod
limber
liquid-ooze
magic-guard
magnet-pull
marvel-scale
mold-breaker
moxie
multiscale
natural-cure
neutralizing-gas
no-guard
oblivious
overcoat
overgrow
own-tempo
pickup
poison-point
poison-touch
pressure
quick-feet
rain-dish
rattled
reckless
regenerator
rivalry
rock-head
run-away
sand-force
sand-rush
sand-veil
scrappy
serene-grace
shed-skin
sheer-force
shell-armor
shield-dust
skill-link
sniper
snow-cloak
solar-power
soundproof
static
steadfast
stench
sticky-hold
sturdy
swarm
swift-swim
synchronize
tangled-feet
technician
thick-fat
tinted-lens
torrent
trace
unaware
unburden
unnerve
vital-spirit
volt-absorb
water-absorb
water-veil
weak-armor
wonder-skin
*/

