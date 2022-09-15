//change language function
const engItems = document.querySelectorAll('.eng-item')
const srbItems = document.querySelectorAll('.srb-item')
const selectLanguageButton = document.querySelector('.language-select')

srbItems.forEach( item => { item.setAttribute('lang' , 'sr')}) //setting serbian lang attribute

function showEnglish(){
    srbItems.forEach( item => { item.classList.add('none')})
    engItems.forEach( item => {item.classList.remove('none')
    })
}
function showSerbian(){
    engItems.forEach( item => {item.classList.add('none')
    srbItems.forEach( item => { item.classList.remove('none')})
    })
}
    //change language on select element and saving to LStorage
selectLanguageButton.addEventListener('change', () => {
    if ( selectLanguageButton.value === 'eng' ){
        showEnglish()
        localStorage.setItem( 'lang', selectLanguageButton.value )
        selectLanguageButton.children[0].selected = true
        quoteText.textContent = quoteEn
    } else {
        showSerbian()
        localStorage.setItem( 'lang', selectLanguageButton.value )
        quoteText.textContent = quoteSr
    }
})

    //geting language from LStorage
let chosenLang = localStorage.getItem('lang')
if ( chosenLang === 'srb' ){
    showSerbian()
    selectLanguageButton.children[1].selected = true
} else {
    showEnglish()
}


//open menu on small screens function - hamburger menu
const menuBtn = document.querySelector('.menu-btn')
const navigationMenu = document.querySelector('nav ul')
const hiddenCursor = document.getElementById('hidden-cursor')

menuBtn.addEventListener('click', () =>{
    navigationMenu.classList.toggle('opened')
    menuBtn.classList.toggle('opened')
    hiddenCursor.classList.toggle('opened')
})

//quote text write function 
const quoteText = document.querySelector('.quote-text')
let indexOfText = 1

const quoteEn = '"Truth can only be found in one place: the code"  '
const quoteSr = '"Istina se može naći na samo jednom mestu: u kodu"  '


function writeQuote(){
    if ( chosenLang === 'srb' ){
        quoteText.textContent = quoteSr.slice(0, indexOfText)
        indexOfText++
        
        if( indexOfText > quoteSr.length ){
            return;
        }
    } else {
        quoteText.textContent = quoteEn.slice(0, indexOfText)
        indexOfText++
        
        if( indexOfText > quoteEn.length ){
            return;
        }
    }
            
    setTimeout ( writeQuote, 80)
}

setTimeout(writeQuote, 2000)

//animate transformed elements function
const transformedEls = document.querySelectorAll('.transformed')

function transformBack(){
    transformedEls.forEach((el) =>{
        const halfScreen = window.innerHeight / 2 + 100
        const elTop = el.getBoundingClientRect().top
        if ( elTop < halfScreen ){
            el.style.animation = 'translateBack 2s ease forwards'
        } 
    })
}

window.addEventListener('scroll', transformBack)

// active navigaton links function
const activeNavLinks = document.querySelectorAll('.main-nav li a')
const activeSections = document.querySelectorAll('.nav-active')

function changeActiveNavLinks(){
    activeSections.forEach((section) =>{
        const halfScreen = window.innerHeight / 2 - 50
        const sectionTop = section.getBoundingClientRect().top
        if ( halfScreen > sectionTop ){
            removeActiveLinks()
            const activeSectionID = section.id
            activeNavLinks.forEach((link) =>{
                const href = `#${activeSectionID}`
                const activeLink = link.getAttribute('href')
                if( activeLink === href ){
                    link.classList.add('active-link')
                }
            })
        } 
    })
}

function removeActiveLinks(){
    activeNavLinks.forEach(link => link.classList.remove('active-link'))
}

window.addEventListener('scroll', changeActiveNavLinks)

//modal portfolio windows handler
const cards = document.querySelectorAll('.portfolio-cards')
const closeModal = document.querySelectorAll('.close-btn')

cards.forEach((card) =>{
    card.addEventListener('click', () =>{
        card.previousElementSibling.classList.add('open-modal')
    })
}) //open modal

closeModal.forEach((btn) =>{
    btn.addEventListener('click', () =>{
        btn.parentElement.parentElement.classList.remove('open-modal')
    })
}) //close modal

window.addEventListener('click', (e) => {
    if( e.target.classList.contains('portfolio-modal-container')){
        e.target.classList.remove('open-modal')
    }
}) //closing modals on click outside


//form validation
const form = document.querySelector('form')
const validationMessage = document.querySelector('.validation-message')

function validateForm(){
    form.hidden = true
    validationMessage.hidden = false
}

form.addEventListener('submit', validateForm)

//current year footer
const currentYear = document.querySelector('.current-year')
const date = new Date()
const year = date.getFullYear()

currentYear.textContent = year