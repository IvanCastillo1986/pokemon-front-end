import React, { useState } from 'react'



export default function Script() {

    const [script, setScript] = useState()

    // Script might recieve a certain number of arguments to determine how long it'll be active for.
    // If each setTimeout is 2 seconds, it means we either: 
        // pass in the amount of setTimeouts in an array to execute
        // create functions in Table and pass here to tell Script what it's doing. These should then set menu back to main.

    function combat (clickedMove) {

        let firstPkm, secondPkm, firstPkmMove, secondPkmMove

        setMenuType('script')

        // assign who attacks first, assign moves to each pkm
        const enemyMove = setEnemyMove()

        if (enemyAttacksFirst(myPokemon.speed, enemyPokemon.speed)) {
            firstPkm = enemyPokemon; secondPkm = myPokemon;
            firstPkmMove = enemyMove
            secondPkmMove = clickedMove
            
            setScript('Enemy attacks first')
        } else {
            firstPkm = myPokemon; secondPkm = enemyPokemon;
            firstPkmMove = clickedMove
            secondPkmMove = enemyMove

            setScript('You attack first')
        }


        // uppercase pokemonNames and moveNames for script
        const firstPkmName = formatName(firstPkm.name)
        const secondPkmName = formatName(secondPkm.name)
        firstPkmMove = formatName(firstPkmMove)
        secondPkmMove = formatName(secondPkmMove)

        // apply the typeMultiplier in case a Pokemon's attack type is strong or weak
        let firstEffect = typeMultiplier(firstPkm.type1, secondPkm.type1)
        let secondEffect = typeMultiplier(secondPkm.type1, firstPkm.type1)

        // calculate damage
        let firstDmg = statFluctuation( Math.round((3 * firstPkm.atk * 5) / secondPkm.def * firstEffect), .8, 1.2 )
        let secondDmg = statFluctuation( Math.round((3 * secondPkm.atk * 5) / firstPkm.def * secondEffect), .8, 1.2 )

        let time = 2000

        // Defining setTimeout ids so we can access them to cancel future timeouts from running if a Pokemon dies
        let secondMoveTimeout
        let superEffectiveTimeout
        let notEffectiveTimeout
        let executeDamageTimeout
        let mainMenuTimeout
        let damageScriptTimeout

        function clearFutureTimeouts() {
            clearTimeout(secondMoveTimeout)
            clearTimeout(superEffectiveTimeout)
            clearTimeout(notEffectiveTimeout)
            clearTimeout(executeDamageTimeout)
            clearTimeout(damageScriptTimeout)
        }

        setTimeout(() => setScript(`${firstPkmName} used ${firstPkmMove}!`), time)
        time += 2000
        if (firstEffect > 1) {
            setTimeout(() => setScript(`${firstPkmMove} is super effective!`), time)
            time += 2000
        } else if (firstEffect < 1) {
            setTimeout(() => setScript(`${firstPkmMove} is not very effective!`), time)
            time += 2000
        }

        
        setTimeout(() => {
            setScript(`${firstPkmName} does ${firstDmg} damage!`)
            // subtract damage from remaining hp
            if (firstPkm === myPokemon) {
                // if a Pokemon dies
                if (enemyPokemon.remaining_hp - firstDmg <= 0) {
                    clearFutureTimeouts()
                    clearTimeout(mainMenuTimeout)

                    setDiscardPile(prevDiscardPile => {
                        return {...prevDiscardPile, player2Discard: prevDiscardPile.player2Discard.concat(enemyPokemon)}
                    })
                    setEnemyPokemon({...enemyPokemon, remaining_hp: 0})
                    setWinner({player: 1, pokemon: myPokemon})
                } else {
                    setEnemyPokemon({...enemyPokemon, remaining_hp: enemyPokemon.remaining_hp - firstDmg})
                }
            } else {
                if (myPokemon.remaining_hp - firstDmg <= 0){
                    clearFutureTimeouts()
                    clearTimeout(mainMenuTimeout)

                    setDiscardPile(prevDiscardPile => {
                        return {...prevDiscardPile, player1Discard: prevDiscardPile.player1Discard.concat(myPokemon)}
                    })
                    setMyPokemon({...myPokemon, remaining_hp: 0})
                    setWinner({player: 2, pokemon: enemyPokemon})
                } else {
                    setMyPokemon({...myPokemon, remaining_hp: myPokemon.remaining_hp - firstDmg})
                }
            }
        }, time) 
        time += 2000
        
        secondMoveTimeout = setTimeout(() => setScript(`${secondPkmName} used ${secondPkmMove}!`), time)
        time += 2000

        if (secondEffect > 1) {
            superEffectiveTimeout = setTimeout(() => setScript(`${secondPkmMove} is super effective!`), time)
            time += 2000
        } else if (secondEffect < 1) {
            notEffectiveTimeout = setTimeout(() => setScript(`${secondPkmMove} is not very effective!`), time)
            time += 2000
        }

        
        executeDamageTimeout = setTimeout(() => {
            setScript(`${secondPkmName} does ${secondDmg} damage!`)
            
            if (secondPkm === myPokemon) {
                if (enemyPokemon.remaining_hp - secondDmg <= 0) {
                    clearTimeout(mainMenuTimeout)
                    
                    setDiscardPile(prevDiscardPile => {
                        return {...prevDiscardPile, player2Discard: prevDiscardPile.player2Discard.concat(enemyPokemon)}
                    })
                    setEnemyPokemon({...enemyPokemon, remaining_hp: 0}) 
                    setWinner({player: 1, pokemon: myPokemon})
                } else {
                    setEnemyPokemon({...enemyPokemon, remaining_hp: enemyPokemon.remaining_hp - secondDmg})
                }
            } else {
                if (myPokemon.remaining_hp - secondDmg <= 0) {
                    clearTimeout(mainMenuTimeout)
                    
                    setDiscardPile(prevDiscardPile => {
                        return {...prevDiscardPile, player1Discard: prevDiscardPile.player1Discard.concat(myPokemon)}
                    })
                    setMyPokemon({...myPokemon, remaining_hp: 0})
                    setWinner({player: 2, pokemon: enemyPokemon})
                } else {
                    setMyPokemon({...myPokemon, remaining_hp: myPokemon.remaining_hp - secondDmg})
                }
            }
        }, time)
        
        time += 2000

        
        mainMenuTimeout = setTimeout(() => {
            setMenuType('main')
            setScript('')
        }, time)

    }



    return (
        <div className='script'>
            Script
            
        </div>
    )
}
