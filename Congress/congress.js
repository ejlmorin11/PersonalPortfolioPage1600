import { senators } from '../Data/senators.js'
import { representatives } from '../Data/representatives.js'

const members = [...senators, ...representatives] // modern combining arrays

const senatorDiv = document.querySelector('.senators')
const seniorityHeading = document.querySelector('.seniority')
const weaselOrderedList = document.querySelector('.weaselList')

function simplifiedMembers(chamberFilter) {
    const filteredArray = members.filter(member => chamberFilter ? 
    member.short_title === chamberFilter : member)

    return senators.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
            senator: senator.gender,
            seniority: +senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,

        }
    })
} 

populateSenatorDiv(simplifiedMembers('Rep.'))

function populateSenatorDiv(simpleSenators) {
    simpleSenators.forEach(senator => {
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figImg.src = senator.imgURL

        figCaption.textContent = senator.name
        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
    })
}

const filterSenators = (prop, value) => simplifiedMembers(senators).filter(senator => 
senator[prop] === value)



const republicans = filterSenators('party', 'R')
const femaleSenators = filterSenators('gender', 'F')

seniorityHeading.textContent = `The most senior member of Congress is ${mostSeniorMember.name}
who has taken our tax dollars as salary for more than ${mostSeniorMember.seniority} years!`

const mostSeniorMember = simplifiedMembers().reduce((acc, senator) => {
    return acc.seniority > senator.seniority ? acc : senator
})

console.log(mostSeniorMember)

const mostLoyal = simplifiedSen().reduce((acc, senator) => {
    if(senator.loyaltyPct === 100) {
        acc.push(senator)
    }
    return acc
}, [])

const biggestWeasel = simplifiedMembers().reduce((acc, senator) =>
(acc.missedVotesPct || 0 > senator.missedVotesPct ? acc : senator, {}))

const biggestWeasels = simplifiedMembers().filter(senator => 
    senator.missedVotesPct >= 50)

biggestWeasels.forEach(weasel => {
    let listItem = document.createElement('li')
    listItem.textcontent = weasel.name
    mostLoyal.appendChild(listItem)
})


