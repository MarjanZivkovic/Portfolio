//change language function
const engItems = document.querySelectorAll('.eng-item')
const srbItems = document.querySelectorAll('.srb-item')
const selectLanguageButton = document.querySelector('.language-select')

engItems.forEach( item => { item.setAttribute('lang' , 'en')}) //setting english lang attribute

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
        selectLanguageButton.children[1].selected = true
        quoteText.textContent = quoteEn
    } else {
        showSerbian()
        localStorage.setItem( 'lang', selectLanguageButton.value )
        selectLanguageButton.children[0].selected = true
        quoteText.textContent = quoteSr
    }
})

    //geting language from LStorage
let chosenLang = localStorage.getItem('lang')
if ( chosenLang === 'eng' ){
    showEnglish()
    selectLanguageButton.children[1].selected = true
} else {
    showSerbian()
    selectLanguageButton.children[0].selected = true
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
    if ( chosenLang === 'eng' ){
        quoteText.textContent = quoteEn.slice(0, indexOfText)
        indexOfText++
        
        if( indexOfText > quoteEn.length ){
            return;
        }
    } else {
        quoteText.textContent = quoteSr.slice(0, indexOfText)
        indexOfText++
        
        if( indexOfText > quoteSr.length ){
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

window.addEventListener('scroll', changeActiveNavLinks) //change active nav links

// GSAP animations, slogan + seal
const sloganScreen = document.querySelector('.slogan')
const sealScreen = document.querySelector('.seal-container')
const halfScreen = window.innerHeight / 2
let animationSloganOver = false
let animationSealOver = false

function animatedSlogan(){
    const sloganTop = sloganScreen.getBoundingClientRect().top + 20

    if ( sloganTop < halfScreen ){
        let tl = gsap.timeline()

        tl.to( '.short-slogan div h2 span', 2, { y: "0", stagger: 0.5 } )
        .to( '.short-slogan', 1, { y: "-100%"})
        .to( '.slider', 0.5, { y: "100%" } )
        .to( '.sales-copy', 4, { y: "0" , ease: "bounce.out"} )
        .to( '.sales-copy p', 2, { y: "0" , ease: "bounce.out"}, "-=2")
        .to( '.sales-copy p span', 2, { y: "0"}, "-=1" ) 
        .to( '.sales-copy p a', 2, { y: "0", ease: "bounce.out"}, "-=1" )

        animationSloganOver = true
    } 
}

function animatedSeal(){
    const sealTop = sealScreen.getBoundingClientRect().top

    if ( sealTop < halfScreen ){
        let tl = gsap.timeline()
        
        tl.fromTo( '.seal', 0.25, { y: "-200vh", x: "100vw", opacity:"0"}, {y: "0", x: "0", opacity: "1"} )
        .fromTo( '.seal-container', 0.05, { rotation: -10}, {rotation: 0, repeat: 4, yoyo: true} )
        .to ( '.seal-text', 2, { opacity: "1", delay: 1})

        animationSealOver = true
    }
}

window.addEventListener('scroll', () =>{
    if (!animationSloganOver){
        animatedSlogan()
    }

    if(!animationSealOver){
        animatedSeal()
    }
})

//modal portfolio windows handler
const cards = document.querySelectorAll('.portfolio-cards')
const closeModal = document.querySelectorAll('.close-btn')

cards.forEach((card) =>{
    card.addEventListener('click', () =>{
        card.previousElementSibling.classList.add('open-modal')
        document.body.style.overflow = 'hidden'
    })
}) //open modal

closeModal.forEach((btn) =>{
    btn.addEventListener('click', () =>{
        btn.parentElement.parentElement.classList.remove('open-modal')
        document.body.style.overflow = 'auto'

    })
}) //close modal

window.addEventListener('click', (e) => {
    if( e.target.classList.contains('portfolio-modal-container')){
        e.target.classList.remove('open-modal')
        document.body.style.overflow = 'auto'
    }
}) //closing modals on click outside

// packages active
const packages = document.querySelectorAll('.package')

function removeChosenPackage(){
    packages.forEach( pack => { pack.parentNode.classList.remove('chosen-package') } )
}

packages.forEach( pack => {
    pack.addEventListener('click', () =>{
        removeChosenPackage()
        pack.parentNode.classList.add('chosen-package')
    })
} )


//3d-animation contact
const container = document.querySelector('.btn-3d-container')
const holder = document.querySelector('.btn-3d-holder')
const img = document.querySelector('.btn-3d-holder img')
const threeD = document.querySelector('.btn-3d')

container.addEventListener('mousemove', (e) =>{
    let xAxis = ( window.innerWidth / 2 - e.offsetX ) / 30
    let yAxis = ( window.innerHeight / 2 - e.offsetY ) / 30
    container.style.transform = `rotateY(${-yAxis - 15}deg) rotateX(${-xAxis + 15}deg)`
})

container.addEventListener('mouseenter', () =>{
    holder.style.transition = `none`
    holder.style.transform = 'translateZ(100px) rotateZ(5deg)'
    threeD.style.transform = 'translateZ(150px) rotateZ(-10deg)'
    img.style.objectFit = 'cover'
})

container.addEventListener('mouseleave', () =>{
    container.style.transform = `rotateY(0deg) rotateX(0deg)`
    holder.style.transition = `all 0.75s ease-out`
    holder.style.transform = `translateZ(0px) rotateZ(0deg)`
    threeD.style.transform = 'translateZ(0px) rotateZ(0deg)'
    img.style.objectFit = 'contain'
})

//current year footer
const currentYear = document.querySelector('.current-year')
const date = new Date()
const year = date.getFullYear()

currentYear.textContent = year

//go to top
const toTop = document.querySelector('.to-top')
toTop.addEventListener('click', () =>{ window.scrollTo(0, 0) })