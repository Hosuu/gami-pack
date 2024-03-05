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

function initImgHoverMovement(): void {
	document.querySelectorAll<HTMLDivElement>('.img-decoration-container').forEach((container) => {
		const boundingRect = container.getBoundingClientRect()
		container.addEventListener('mousemove', (e) => {
			const MOVE_FACTOR = 0.1
			const SCALE_FACTOR = 0.5
			const x = Math.max(e.x - boundingRect.x, 0) / boundingRect.width
			const y = Math.max(e.y - boundingRect.y, 0) / boundingRect.height
			const originX = -0.5 * (1 + (x - 0.5) * MOVE_FACTOR) * 100
			const originY = -0.5 * (1 + (y - 0.5) * MOVE_FACTOR) * 100
			const originScaleX = 0.5 * (1 + (x - 0.5) * SCALE_FACTOR) * 100
			const originScaleY = 0.5 * (1 + (y - 0.5) * SCALE_FACTOR) * 100
			container.style.setProperty('--origin', `${originX}% ${originY}%`)
			container.style.setProperty('--origin-scale', `${originScaleX}% ${originScaleY}%`)
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
