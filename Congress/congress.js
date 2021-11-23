import { senators } from '../Data/senators.js'
import { representatives } from '../Data/representatives.js'
import { removeChildren } from '../utils/index.js'

const members = [...senators, ...representatives] // modern combining arrays

const main = document.querySelector("#main")

const mainHeader = document.createElement('header')
mainHeader.id = "buttonHeader"
document.body.insertBefore(mainHeader, main)

const senButton = document.createElement('button')
senButton.textContent = 'Senators'
senButton.addEventListener('click', () => populateSenatorDiv(simplifiedMembers('Sen.')))
mainHeader.appendChild(senButton) 

const repButton = document.createElement('button')
repButton.textContent = 'Representatives'
repButton.addEventListener('click', () => populateSenatorDiv(simplifiedMembers('Rep.')))
mainHeader.appendChild(repButton)

const senatorDiv = document.querySelector('.senators')
const seniorityHeading = document.querySelector('.seniority')
const weaselOrderedList = document.querySelector('.weaselList')


function simplifiedMembers(chamberFilter) {
    const filteredArray = members.filter(member => chamberFilter ? 
    member.short_title === chamberFilter : member)

    return filteredArray.map(senator => {
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



function populateSenatorDiv(simpleSenators) {
    removeChildren(senatorDiv)
    simpleSenators.forEach(senator => {
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figImg.src = senator.imgURL

        figCaption.textContent = senator.name + `-${senator.party}`
        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
    })
}

//const filterSenators = (prop, value) => simplifiedSenators().filter(senator => senator[prop] === value)
  
//const republicans = filterSenators('party', 'R')
//const femaleSenators = filterSenators('gender', 'F')

//console.log(republicans, femaleSenators)

const mostSeniorMember = simplifiedMembers().reduce((acc, senator) => {
    return acc.seniority > senator.seniority ? acc : senator 
  })


  seniorityHeading.textContent = `The laziest members of congress are...`
  seniorityHeading.id = "seniorityHeading"
  const mostLoyal = simplifiedMembers().reduce((acc, senator) => {
    if(senator.loyaltyPct === 100) {
      acc.push(senator)
    }
    return acc
  }, [])
  
  const biggestWeasel = simplifiedMembers().reduce((acc, senator) => 
  (acc.missedVotesPct || 0) > senator.missedVotesPct ? acc : senator, {})
  const biggestWeasels = simplifiedMembers().filter(senator => senator.missedVotesPct >= 50)
  
  biggestWeasels.forEach(weasel => {
    let listItem = document.createElement('li')
    listItem.textContent = weasel.name
    weaselOrderedList.appendChild(listItem)

  })



