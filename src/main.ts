import './style.css'

const navOpen = document.querySelector('#nav-open')!
const navClose = document.querySelector('#nav-close')!
const header = document.querySelector<HTMLDivElement>('#navbar')!

navOpen.addEventListener('click', () => {
	header.setAttribute('open', '')
	header.classList.add('animate')
})

navClose.addEventListener('click', () => {
	header.removeAttribute('open')
	header.addEventListener(
		'transitionend',
		() => {
			header.classList.remove('animate')
		},
		{ once: true }
	)
})
