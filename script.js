document.getElementById('year').textContent = new Date().getFullYear()

const toggle = document.getElementById('nav-toggle')
const nav = document.getElementById('site-nav')

if (toggle && nav) {
  toggle.addEventListener('click', e => {
    e.preventDefault()
    nav.classList.toggle('active')

    toggle.textContent = nav.classList.contains('active') ? '✕' : '☰'

    toggle.style.transform = 'scale(0.9)'
    setTimeout(() => {
      toggle.style.transform = 'scale(1)'
    }, 150)
  })

  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('active')
      toggle.textContent = '☰'
    }
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      nav.classList.remove('active')
      toggle.textContent = '☰'
      nav.style.display = 'flex'
    }
  })
}

const header = document.getElementById('header')
let lastScrollTop = 0

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 50) {
    header.classList.add('scrolled')
  } else {
    header.classList.remove('scrolled')
  }

  lastScrollTop = scrollTop
})

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))

    if (target) {
      const headerHeight = header.offsetHeight
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })

      nav.classList.remove('active')
      toggle.textContent = '☰'
    }
  })
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, observerOptions)

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el)
})

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector('.hero')

  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

document.querySelectorAll('.card, .post').forEach(element => {
  element.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-8px)'
  })

  element.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)'
  })
})

const logo = document.getElementById('logo')
if (logo) {
  logo.addEventListener('click', e => {
    e.preventDefault()

    logo.style.animation = 'none'
    setTimeout(() => {
      logo.style.animation = 'bounce 0.6s ease-in-out'
    }, 10)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    setTimeout(() => {
      logo.style.animation = 'none'
    }, 600)
  })
}

const bounceKeyframes = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0) }
    50% { transform: translateY(-10px) }
  }
`

const styleSheet = document.createElement('style')
styleSheet.textContent = bounceKeyframes
document.head.appendChild(styleSheet)