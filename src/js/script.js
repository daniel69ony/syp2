let burgerBtn
let navBar
let navBtns
let navBtnBars
let allSections
let footerYear
let callBtn
let navBtn
let body
let modal
let modalShadow
let sendBtn
let closeModalBtn
let nameInput
let phoneInput
let mailInput
let textArea
let errorMsgPhone
let errorMsgName
let errorMsgMail
let errorMsgTextArea
let contactForm
let contactSection
let errorCount = 0

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
	handleCurrentYear()
	checkUrlParameters()
}

const prepareDOMElements = () => {
	burgerBtn = document.querySelector('.burger-btn')
	navBar = document.querySelector('nav')
	navBtns = document.querySelectorAll('.nav__item')
	navBtnBars = document.querySelector('.burger-btn__bars')
	allSections = document.querySelectorAll('.section')
	footerYear = document.querySelector('.footer__year')
	callBtn = document.querySelector('.contact__details-item--call')
	navBtn = document.querySelector('.contact__details-item--navigate')
	body = document.querySelector('body')
	modal = document.querySelector('.contact__modal')
	sendBtn = document.querySelector('.contact__form-btn')
	closeModalBtn = document.querySelector('.contact__modal-closeBtn')
	nameInput = document.getElementById('name')
	phoneInput = document.getElementById('number')
	mailInput = document.getElementById('email')
	textArea = document.querySelector('.contact__form-textarea')
	errorMsgName = document.querySelector('.contact__form-errorMsg--name')
	errorMsgPhone = document.querySelector('.contact__form-errorMsg--phone')
	errorMsgMail = document.querySelector('.contact__form-errorMsg--mail')
	errorMsgTextArea = document.querySelector('.contact__form-errorMsg--textArea')
	modalShadow = document.querySelector('.contact__modal-shadow')
	contactForm = document.querySelector('.contact__form')
	contactSection = document.querySelector('.contact')
}

const prepareDOMEvents = () => {
	burgerBtn.addEventListener('click', active)
	window.addEventListener('scroll', handleObserver)
	callBtn.addEventListener('click', handleCallButton)
	navBtn.addEventListener('click', handleNavButton)
	sendBtn.addEventListener('click', countErrors)
	closeModalBtn.addEventListener('click', closeModal)
}

const closeModal = () => {
	modal.classList.remove('contact__modal--active')
	modalShadow.classList.remove('contact__modal-shadow--active')
	body.classList.remove('overflowHidden')
}

const clearInputs = () => {
	nameInput.value = ''
	phoneInput.value = ''
	mailInput.value = ''
	textArea.value = ''
}

const validateName = () => {
	if (nameInput.value === '') {
		errorMsgName.classList.add('contact__form-errorMsg--active')
		errorCount++
	} else {
		errorMsgName.classList.remove('contact__form-errorMsg--active')
	}
}

const validatePhoneNumber = () => {
	const re = /^[0-9\s]*$/

	if (re.test(phoneInput.value) && phoneInput.value !== '') {
		errorMsgPhone.classList.remove('contact__form-errorMsg--active')
	} else {
		errorMsgPhone.classList.add('contact__form-errorMsg--active')
		errorCount++
	}
}

const validateMail = () => {
	const reg =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,4})$/i

	if (reg.test(mailInput.value)) {
		errorMsgMail.classList.remove('contact__form-errorMsg--active')
	} else {
		errorMsgMail.classList.add('contact__form-errorMsg--active')
		errorCount++
	}
}

const validateTextArea = () => {
	if (textArea.value === '') {
		errorMsgTextArea.classList.add('contact__form-errorMsg--active')
		errorCount++
	} else {
		errorMsgTextArea.classList.remove('contact__form-errorMsg--active')
	}
}

const countErrors = e => {
	e.preventDefault()

	validateName()
	validatePhoneNumber()
	validateMail()
	validateTextArea()

	if (errorCount !== 0) {
		errorCount = 0
	} else if (errorCount === 0) {
		contactForm.submit()
		clearInputs()
		errorCount = 0
	}
}

const checkUrlParameters = () => {
	if (document.location.search === '?mail_status=sent') {
		modal.classList.add('contact__modal--active')
		modalShadow.classList.add('contact__modal-shadow--active')
		body.classList.add('overflowHidden')
	} else if (document.location.search === '?mail_status=error') {
		alert('Błąd wysyłania wiadomości')
		console.log('Błąd')
	}

	setTimeout(() => {
		const newUrl = window.location.pathname + window.location.search.replace('?mail_status=sent', '');
		window.history.replaceState({}, document.title, newUrl);
	}, 3000)
}

function active() {
	navBar.classList.toggle('nav--active')

	navBtnBars.classList.remove('black-bars-color')
	navBtnBars.classList.remove('grey-bars-color')

	body.classList.toggle('overflowHidden')

	navBtns.forEach(item => {
		item.addEventListener('click', () => {
			navBar.classList.remove('nav--active')
			body.classList.remove('overflowHidden')
			handleNavItemsAnimation()
		})
	})

	handleNavItemsAnimation()
}

const handleCallButton = () => {
	const phoneNumber = '570 681 958'
	window.open(`tel:${phoneNumber}`)
}

const handleNavButton = () => {
	window.open(
		`https://www.google.com/maps/dir//Pan+ekspres+-+serwis+i+naprawa+ekspres%C3%B3w,+Prudnicka+25,+48-300+Nysa/@50.4685725,17.336327,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x4711c56051469b15:0x6bb22e8ddac37a1f!2m2!1d17.3389019!2d50.4685691!3e0?entry=ttu`,
		`_blank`
	)
}

const handleNavItemsAnimation = () => {
	let delayTime = 0

	navBtns.forEach(item => {
		item.classList.toggle('nav-items-animation')
		item.style.animationDelay = '.' + delayTime + 's'
		delayTime++
	})
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

const handleObserver = () => {
	const currentSection = window.scrollY

	allSections.forEach(section => {
		if (innerWidth <= 576 && section.classList.contains('contact') && section.offsetTop <= currentSection - 450) {
			navBtnBars.classList.add('grey-bars-color')
		} else if (section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navBtnBars.classList.add('black-bars-color')
		} else if (!section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navBtnBars.classList.remove('black-bars-color')
			navBtnBars.classList.remove('grey-bars-color')
		}
	})
}

document.addEventListener('DOMContentLoaded', main)
