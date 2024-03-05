import { createIcons, Menu, X } from 'lucide'
import './styles/main.css'

initNavbar()
initMobileNavbar()
initFooter()
markActiveLinks()
initBgParalax()
initAnimatedNumbers()
initImgHoverMovement()

createIcons({
	attrs: {
		display: 'block',
		width: '1em',
		height: '1em',
	},
	icons: {
		Menu,
		X,
	},
})

const animateInObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.setAttribute('animating', '')
				entry.target.addEventListener('animationend', () => {
					entry.target.removeAttribute('animate-in')
					entry.target.removeAttribute('animating')
				})
				animateInObserver.unobserve(entry.target)
			}
		})
	},
	{ threshold: 0.5 }
)

document.querySelectorAll('[animate-in]').forEach((el) => animateInObserver.observe(el))

function clamp(min: number, value: number, max: number): number {
	if (value < min) return min
	if (value > max) return max
	return value
}

function initImgHoverMovement(): void {
	addEventListener('mousemove', (e) => {
		const mouseX = (e.x / innerWidth) * 2 - 1
		const mouseY = (e.y / innerHeight) * 2 - 1
		document.body.style.setProperty('--mouseX', clamp(-1, mouseX, 1).toString())
		document.body.style.setProperty('--mouseY', clamp(-1, mouseY, 1).toString())
	})

	document.querySelectorAll<HTMLDivElement>('.img-decoration-container').forEach((container) => {
		const { x, y, width, height } = container.getBoundingClientRect()
		container.addEventListener('mousemove', (e) => {
			const mouseX = ((e.x - x) / width) * 2 - 1
			const mouseY = ((e.y - y) / height) * 2 - 1
			container.style.setProperty('--localMouseX', clamp(-1, mouseX, 1).toString())
			container.style.setProperty('--localMouseY', clamp(-1, mouseY, 1).toString())
		})
	})
}

function initBgParalax(): void {
	document.addEventListener('scroll', function () {
		const scrollPosition = scrollY
		const screenRatio = innerWidth / innerHeight
		document.body.style.backgroundPositionY = -scrollPosition * 0.2 * screenRatio + 'px'
	})
}

function initAnimatedNumbers(): void {
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
}

function initFooter(): void {
	const footerCode = `<div class="flex container">
	<div class="image-container">
		<img src="logo_full.png" alt="" />
	</div>

	<div class="flex even" style="width: 100%">
		<nav class="flex column no-gap no-align even" style="align-self: stretch">
			<p class="fs-2">Menu</p>
			<a href="/">Strona główna</a>
			<a href="offer">Oferta</a>
			<a href="about-us">O nas</a>
			<a href="contact">Kontakt</a>
		</nav>
		<div class="flex column" style="gap: 0.5rem; align-items: flex-start">
			<p class="fs-2">Adres</p>
			<p>
				ul. Poniatowskiego 2,<br />
				41-253 Czeladź
			</p>
			<p class="fs-2">Kontakt</p>
			<a href="mailto:biuro@gami-pack.pl">biuro@gami-pack.pl</a>
			<a href="tel:+48666053734">Tel. 666 053 734</a>
		</div>
	</div>
	</div>`

	document.querySelector('footer')!.innerHTML = footerCode
}

function initNavbar(): void {
	const navbarCode = `<div id="nav-open" class="container-bg"><i data-lucide="menu"></i></div>
<nav class="flex even container navbar">
	<a href="/">Strona główna</a>
	<a href="offer">Oferta</a>
	<a href="about-us">O nas</a>
	<a href="contact">Kontakt</a>
	<div id="nav-close" class="button"><i data-lucide="x"></i></div>
</nav>`

	document.querySelector<HTMLDivElement>('#navbar')!.innerHTML = navbarCode
}

function markActiveLinks(): void {
	document.querySelectorAll('a').forEach((element) => {
		if (element.href == location.href) element.classList.add('active')
	})
}

function initMobileNavbar() {
	const navOpen = document.querySelector('#nav-open')!
	const navClose = document.querySelector('#nav-close')!
	const header = document.querySelector<HTMLDivElement>('#navbar')!

	function openMobileNav(): void {
		header.setAttribute('open', '')
		header.classList.add('animate')
	}

	function closeMobileNav(): void {
		header.removeAttribute('open')
		header.addEventListener(
			'transitionend',
			() => {
				header.classList.remove('animate')
			},
			{ once: true }
		)
	}

	navOpen.addEventListener('click', openMobileNav)
	navClose.addEventListener('click', closeMobileNav)
}
