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

function easeOutSine(x: number): number {
	return Math.sin((x * Math.PI) / 2)
}

function animateNumbers(element: HTMLDivElement, duration: number) {
	const target = parseInt(element.getAttribute('target')!)
	const start = performance.now()

	function updateCount() {
		let t = (performance.now() - start) / duration
		if (t < 1) {
			t = Math.min(1, t)
			element.textContent = Math.floor(target * easeOutSine(t)).toString()
			requestAnimationFrame(updateCount)
		} else {
			element.textContent = Math.floor(target).toString()
		}
	}

	updateCount()
}

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				animateNumbers(entry.target as HTMLDivElement, 1000)
				observer.unobserve(entry.target)
			}
		})
	},
	{ threshold: 1 }
)

document.querySelectorAll('[animate-number]').forEach((el) => {
	observer.observe(el)
})

document.addEventListener('scroll', function () {
	const scrollPosition = scrollY
	const screenRatio = innerWidth / innerHeight
	document.body.style.backgroundPositionY = -scrollPosition * 0.2 * screenRatio + 'px'
})
