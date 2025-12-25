import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Marquee from 'react-fast-marquee'
import CountUp from 'react-countup'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track scroll progress for progress bar
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(180deg, #071225 0%, #0B1B3A 100%)' }}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(to right, #ffffff 0%, #9ca3af 100%)',
        }}
      />

      <Header scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero />
      <LogoCarousel />
      <About />
      <Stats />
      <Theme />
      <Why />
      <Expect />
      <Showdown />
      <Partner />
      <Register />
      <Footer />
    </div>
  )
}

function Header({ scrolled, mobileMenuOpen, setMobileMenuOpen }) {
  const [activeSection, setActiveSection] = useState('about')
  const [sectionProgress, setSectionProgress] = useState(0)

  const navLinks = [
    { label: 'About event', href: '#about', id: 'about' },
    { label: 'Theme', href: '#theme', id: 'theme' },
    { label: 'Why Attend', href: '#why', id: 'why' },
    { label: 'What to expect', href: '#expect', id: 'expect' },
    { label: 'AI Diagnosis Showdown', href: '#showdown', id: 'showdown' },
  ]

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  // Track active section and scroll progress within section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // Find which section we're in and calculate progress
      for (let i = 0; i < navLinks.length; i++) {
        const section = document.getElementById(navLinks[i].id)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navLinks[i].id)

            // Calculate progress through this section (0 to 1)
            const progress = (scrollPosition - sectionTop) / (sectionBottom - sectionTop)
            setSectionProgress(Math.min(Math.max(progress, 0), 1))
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'py-3 border-b border-white/90'
            : 'py-4'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          backdropFilter: scrolled ? 'blur(5px)' : 'blur(3px)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Left: Logos */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex gap-2 items-center">
              <span className="text-[12px] md:text-[15px] capitalize tracking-widest" style={{ color: 'var(--muted)' }}>
                Powered by
              </span>
              <img src="/logos/biospectrumasia.webp" alt="BioSpectrum" className="h-10 md:h-13 w-32 md:w-40" />
            </div>
          </div>

          {/* Center: Nav Links - Desktop */}
          <nav className="hidden xl:flex items-center gap-8 relative">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.id

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-md font-medium transition-colors nav py-2"
                  style={{ color: isActive ? 'var(--text)' : 'var(--muted)' }}
                >
                  {link.label}

                  {/* Progress bar beneath active link */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px]"
                      style={{
                        background: 'var(--accent)',
                        transformOrigin: 'left'
                      }}
                      animate={{
                        width: `${sectionProgress * 100}%`
                      }}
                      transition={{ duration: 0.1, ease: 'linear' }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right: CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="#partner"
              className="hidden md:block glass px-3 md:px-5 py-3 md:py-4 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 jakarta"
              style={{ color: 'var(--text)' }}
            >
              Be our partner!
            </a>
            <a
              href="#register"
              className="hidden md:block btn-primary px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-bold text-white rounded-lg"
            >
              Register now
            </a>

            {/* Hamburger Menu - Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 relative"
              aria-label="Menu"
            >
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-6 h-0.5 bg-white block"
              />
              <motion.span
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-white block"
              />
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-6 h-0.5 bg-white block"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Bubble */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: mobileMenuOpen ? 1 : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        className="fixed top-20 right-4 z-40 xl:hidden"
        style={{
          transformOrigin: 'top right',
        }}
      >
        <div className="glass-strong rounded-3xl p-8 min-w-[280px] shadow-2xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: mobileMenuOpen ? 1 : 0,
                  x: mobileMenuOpen ? 0 : 20,
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="relative text-lg font-medium transition-colors group jakarta py-2"
                style={{ color: 'var(--text)' }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full"
                  style={{ background: 'var(--accent)' }}
                />
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: mobileMenuOpen ? 1 : 0,
                y: mobileMenuOpen ? 0 : 10,
              }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/20"
            >
              <a
                href="#partner"
                onClick={handleLinkClick}
                className="glass px-5 py-4 text-center text-sm font-medium rounded-lg transition-all duration-300 jakarta"
                style={{ color: 'var(--text)' }}
              >
                Be our partner!
              </a>
              <a
                href="#register"
                onClick={handleLinkClick}
                className="btn-primary px-6 py-4 text-center text-sm font-bold text-white rounded-lg"
              >
                Register now
              </a>
            </motion.div>
          </nav>
        </div>
      </motion.div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 xl:hidden"
        />
      )}
    </>
  )
}

function Hero() {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(springY, [-300, 300], [5, -5])
  const rotateY = useTransform(springX, [-300, 300], [-5, 5])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="relative min-h-screen flex items-center overflow-visible pt-24">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-visible">
        <iframe
          src="https://fast.wistia.net/embed/iframe/xo8q6fk8iq?autoPlay=1&muted=true"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30 brightness-125}}"
          style={{
            width: '142.5vw',
            height: '170vh',
            border: 'none',
          }}
        />
      </div>

      {/* Geometric Lattice Overlay (right side) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none z-10 overflow-hidden opacity-70">
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full opacity-[0.08]"
          viewBox="0 0 400 600"
          fill="none"
          preserveAspectRatio="xMaxYMid slice"
        >
          <defs>
            <pattern id="lattice" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 0L40 40M40 0L0 40" stroke="white" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="400" height="600" fill="url(#lattice)" transform="rotate(15 200 300)" />
        </svg>
      </div>

      <div className="relative z-20 max-w-[1440px] mx-auto px-4 md:px-8 w-full grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-8xl leading-[1.1] mb-4 md:mb-6 mt-4 md:mt-8 ml-0 md:ml-12">
            <span className="font-serif italic font-normal" style={{ color: 'var(--muted)' }}>
              Where
            </span>
            <span className="font-bold" style={{ color: 'var(--text)' }}>
              {' '}health leaders{' '}
              and AI{' '}
            </span>
            <span className="font-serif italic font-normal text-gradient-green">
              converge
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-xl tit ml-0 md:ml-12" style={{ color: 'var(--muted)' }}>
            The global platform for deal-making, ROI impact and visibility in healthcare AI.
          </p>
          <motion.a
            href="#register"
            className="btn-primary inline-block px-8 md:px-10 py-3 md:py-4 text-base md:text-lg font-bold text-white rounded-md ml-0 md:ml-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register now
          </motion.a>
          <div className="mb-4 mt-6 md:mt-8 ml-0 md:ml-12">
            <h2 className="text-xl md:text-2xl lg:text-5xl font-semibold inter" style={{ color: '#fff' }}>
              Trusted by <span className="italic gradient font-serif">industry experts</span>
            </h2>
          </div>
        </motion.div>

        {/* Right: Floating Glass Card */}
        <motion.div
          ref={cardRef}
          className="hidden lg:flex justify-end"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="glass-strong rounded-2xl md:rounded-3xl p-6 md:p-8 w-full max-w-md"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="flex flex-col items-baseline gap-3 md:gap-4 mb-20 md:mb-28">
              <div className="text-3xl md:text-5xl font-medium jakarta" style={{ color: '#eee' }}>
                17 April 2026,
              </div>
              <div className="text-2xl md:text-3xl font-medium jakarta">Taj, MG Road, Bengaluru</div>
            </div>

            <div className="space-y-3">
              <motion.a
                href="#register"
                className="btn-primary block w-full text-center px-6 py-4 text-lg font-bold text-white rounded-md"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                Register now
              </motion.a>
              <motion.a
                href="#partner"
                className="glass block w-full text-center px-6 py-4 text-lg font-semibold rounded-md hover:border-white transition-all group jakarta"
                style={{ color: 'var(--text)' }}
                whileHover={{ scale: 1.00 }}
                whileTap={{ scale: 0.98 }}
              >
                Be our partner <span className="inline-block transition-transform group-hover:translate-x-1">↗</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function LogoCarousel() {
  const logos = [
    { id: 1, name: 'Partner 1', src: 'logos/eppendorf.png' },
    { id: 2, name: 'Partner 2', src: 'logos/abdos.png' },
    { id: 3, name: 'Partner 3', src: 'logos/sun-pharma.png' },
    { id: 4, name: 'Partner 4', src: 'logos/poonawala.png' },
    { id: 5, name: 'Partner 5', src: 'logos/biomeriex.png' },
    { id: 6, name: 'Partner 6', src: 'logos/himedia.png' },
    { id: 7, name: 'Partner 7', src: 'logos/deeptek.png' },
    { id: 8, name: 'Partner 8', src: 'logos/moleculeai.png' },
    { id: 9, name: 'Partner 9', src: 'logos/miltenyi.png' },
    { id: 10, name: 'Partner 10', src: 'logos/lonza.png' },
  ]

  return (
    <section className="relative py-5 overflow-hidden border-b z-10">
      {/* Smooth Infinite Marquee */}
      <Marquee speed={50} gradient={false}>
        {logos.map((logo, index) => (
          <div
            key={index}
            className="glass-card flex-shrink-0 rounded-xl px-8 py-4 flex items-center justify-center min-w-[180px] mx-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(2px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="h-12 object-contain emitka scale-130 hover:scale-150 duration-700 transition"
            />
          </div>
        ))}
      </Marquee>
    </section>
  )
}

// Component for scroll-revealed text that reveals LINE BY LINE sequentially
function ScrollRevealText({ children, className = "", as = "div" }) {
  const [lines, setLines] = useState([])
  const containerRef = useRef(null)
  const Component = as

  useEffect(() => {
    if (!containerRef.current) return

    const text = typeof children === 'string' ? children : children.toString()
    const words = text.split(/\s+/).filter(word => word.trim())

    // Create temporary spans for each word to measure positions
    const tempContainer = document.createElement('div')
    tempContainer.style.cssText = window.getComputedStyle(containerRef.current).cssText
    tempContainer.style.position = 'absolute'
    tempContainer.style.visibility = 'hidden'
    tempContainer.style.width = `${containerRef.current.offsetWidth}px`
    document.body.appendChild(tempContainer)

    const wordElements = words.map(word => {
      const span = document.createElement('span')
      span.textContent = word + ' '
      span.style.whiteSpace = 'nowrap'
      tempContainer.appendChild(span)
      return { word, element: span }
    })

    // Group words by their Y position (actual rendered lines)
    const lineGroups = []
    let currentLine = []
    let lastTop = -1

    wordElements.forEach(({ word, element }) => {
      const top = element.offsetTop
      if (top !== lastTop && currentLine.length > 0) {
        lineGroups.push(currentLine.join(' '))
        currentLine = []
      }
      currentLine.push(word)
      lastTop = top
    })

    if (currentLine.length > 0) {
      lineGroups.push(currentLine.join(' '))
    }

    document.body.removeChild(tempContainer)
    setLines(lineGroups)

    // Recalculate on resize
    const handleResize = () => {
      setTimeout(() => {
        if (!containerRef.current) return

        const tempContainer2 = document.createElement('div')
        tempContainer2.style.cssText = window.getComputedStyle(containerRef.current).cssText
        tempContainer2.style.position = 'absolute'
        tempContainer2.style.visibility = 'hidden'
        tempContainer2.style.width = `${containerRef.current.offsetWidth}px`
        document.body.appendChild(tempContainer2)

        const wordElements2 = words.map(word => {
          const span = document.createElement('span')
          span.textContent = word + ' '
          span.style.whiteSpace = 'nowrap'
          tempContainer2.appendChild(span)
          return { word, element: span }
        })

        const lineGroups2 = []
        let currentLine2 = []
        let lastTop2 = -1

        wordElements2.forEach(({ word, element }) => {
          const top = element.offsetTop
          if (top !== lastTop2 && currentLine2.length > 0) {
            lineGroups2.push(currentLine2.join(' '))
            currentLine2 = []
          }
          currentLine2.push(word)
          lastTop2 = top
        })

        if (currentLine2.length > 0) {
          lineGroups2.push(currentLine2.join(' '))
        }

        document.body.removeChild(tempContainer2)
        setLines(lineGroups2)
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [children])

  return (
    <Component ref={containerRef} className={className}>
      {lines.length > 0 ? (
        lines.map((line, index) => (
          <ScrollRevealLine key={index}>
            {line}{' '}
          </ScrollRevealLine>
        ))
      ) : (
        <span style={{ opacity: 0 }}>{children}</span>
      )}
    </Component>
  )
}

// Individual line component - each line has its own independent scroll trigger
function ScrollRevealLine({ children }) {
  const lineRef = useRef(null)

  // Each line tracks its OWN scroll position independently
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.75", "start 0.45"]  // Tight range: starts when line is at 75% viewport, completes at 45%
  })

  // Map scroll progress to fill percentage
  const lineFillProgress = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  )

  return (
    <motion.span
      ref={lineRef}
      className="inline-block"
      style={{
        // background: `linear-gradient(to right, #6b7280 0%, #fff var(--fill, 0%), #6b7280 100%)`,
        background: `linear-gradient(to right, #ffffff var(--fill, 0%), #6b7280 var(--fill, 0%), #6b7280 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        '--fill': lineFillProgress
      }}
    >
      {children}
    </motion.span>
  )
}

function About() {
  const pills = ['Policy Makers', 'Hospital Leaders', 'AI Startups']

  return (
    <Section id="about" className="py-8 md:py-16 lg:py-6 bai text-center">
      <div className="flex gap-8 md:gap-12 items-center text-center px-4 md:px-12 lg:px-48">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Title with scroll reveal */}
          <ScrollRevealText as="h2" className="text-[40px] md:text-[60px] font-bold mb-6 md:mb-8">
            ABOUT THE EVENT
          </ScrollRevealText>

          {/* Subtitle with scroll reveal - automatically detects rendered lines! */}
          <div className="text-[15px] md:text-[25px] lg:text-[35px] leading-tight mb-8 md:mb-12 text-justify">
            AI Bharat Health Mission 2026 is India's premier healthcare AI gathering, bringing together policymakers, hospital leaders, researchers, startups, and global technology providers to shape the future of AI-led healthcare delivery.
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {pills.map((pill, index) => (
              <motion.div
                key={index}
                className="glass px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base bai"
                style={{ color: 'var(--accent)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {pill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function Stats() {
  const [isInView, setIsInView] = useState(false)
  const statsRef = useRef(null)

  const stats = [
    { number: 350, suffix: '+', label: 'Healthcare leaders attending in-person' },
    { number: 25, suffix: '+', label: 'Legendary tech speakers' },
    { number: 6, suffix: '+', label: 'Deep-dive sessions on tech' },
  ]

  useEffect(() => {
    const currentRef = statsRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger count-up animation when section scrolls into view
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
        }
      },
      {
        threshold: 0.5,  // Trigger when 50% of section is visible
        rootMargin: '0px'
      }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [isInView])

  return (
    <Section id="stats" className="py-12">
      <motion.div
        ref={statsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-0"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="relative p-8 md:p-12"
            style={{
              background: index === 0
                ? 'linear-gradient(135deg, #333 0%, #aaa 100%)'
                : index === 1
                ? 'linear-gradient(135deg, #5176ff 0%, #00000040 100%)'
                : 'linear-gradient(135deg, #aaa 0%, #333 100%)',
              borderRight: index < 2 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              backdropFilter: 'blur(50px)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 }
            }}
          >
            {/* Gradient glow on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-500 text-[#5176ff]"
              style={{
                background: 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10">
              <motion.h3
                className="text-5xl md:text-7xl font-black mb-3 md:mb-4 jakarta"
                style={{ color: '#ffffff' }}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
              >
                {isInView ? (
                  <>
                    <CountUp
                      start={0}
                      end={stat.number}
                      duration={2.5}
                      delay={index * 0.2}
                      useEasing={true}
                      separator=","
                    />
                    {stat.suffix}
                  </>
                ) : (
                  `0${stat.suffix}`
                )}
              </motion.h3>
              <p className="text-sm md:text-base lg:text-lg jakarta" style={{ color: '#d1d5db' }}>
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

// Copy the rest of the functions from the original file
function Theme() {
  const pillars = [
    {
      title: 'From Pilots to Production',
      description: 'Move AI from experiments to scalable, deployable hospital systems.',
      keywords: 'Validation · Deployment · ROI',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Responsible & Trusted AI',
      description: 'Build safe, compliant AI that clinicians and patients can trust.',
      keywords: 'Governance · Privacy · Safety',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Clinical Decision Intelligence',
      description: 'Augment clinicians with human-in-the-loop workflows and diagnostics.',
      keywords: 'Diagnostics · Workflow · Assistive AI',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'India-Scale Healthcare AI',
      description: 'Solve for affordability, access, and interoperability across India.',
      keywords: 'Public Health · Scale · Interoperability',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  return (
    <Section id="theme" className="py-16 relative overflow-hidden bai bg-gradient-the">
      {/* Subtle mesh overlay - right side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none z-0 opacity-[0.06]">
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full"
          viewBox="0 0 400 600"
          fill="none"
          preserveAspectRatio="xMaxYMid slice"
        >
          <defs>
            <pattern id="theme-mesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 0L40 40M40 0L0 40" stroke="white" strokeWidth="0.5" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="400" height="600" fill="url(#theme-mesh)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Top intro - centered */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <ScrollRevealText className="text-4xl md:text-5xl lg:text-6xl font-black mb-6" style={{ color: 'var(--text)' }}>
            The Theme
          </ScrollRevealText>
          <ScrollRevealText className="text-lg md:text-2xl max-w-[760px] mx-auto" style={{ color: 'var(--muted)' }}>
            From experimentation to real-world impact in AI-led healthcare.
          </ScrollRevealText>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="group relative rounded-3xl p-6 md:p-8 transition-all duration-300 cursor-default"
              style={{
                background: '#fffff80',
                border: '1px solid #fff',
                backdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.2,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{
                y: -4,
                borderColor: '#ddd',
                boxShadow: '0 0 10px #fff',
                transition: { duration: 0.1 }
              }}
            >

              {/* Inner highlight gradient */}
              <div
                className="absolute inset-x-0 top-0 h-20 rounded-t-3xl opacity-30 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)' }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="mb-6 transition-colors duration-300 group-hover:text-accent"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  {pillar.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                  {pillar.description}
                </p>

                {/* Keywords */}
                <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  {pillar.keywords}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Why() {
  const videos = [
    {
      src: '/networking.mp4',
      title: 'Network with Leaders',
      description: 'Connect with healthcare innovators and policy makers',
    },
    {
      src: '/aihealth.mp4',
      title: 'AI-Powered Healthcare',
      description: 'Experience cutting-edge health technology',
    },
    {
      src: '/close.mp4',
      title: 'Close Collaboration',
      description: 'Build partnerships that transform healthcare',
    },
  ]

  const handleVideoHover = (e, play) => {
    if (play) {
      e.currentTarget.play()
    } else {
      e.currentTarget.pause()
    }
  }

  return (
    <Section id="why" className="py-12 bg-gradient-why bai">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <ScrollRevealText className="text-5xl md:text-6xl font-black mb-16 text-center" style={{ color: 'var(--text)' }}>
          Why Attend
        </ScrollRevealText>

        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              className="group relative rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative aspect-[9/16] bg-black/20">
                <video
                  ref={(el) => {
                    if (el) {
                      el.muted = true
                      el.playsInline = true
                      el.loop = true
                    }
                  }}
                  onMouseEnter={(e) => handleVideoHover(e, true)}
                  onMouseLeave={(e) => handleVideoHover(e, false)}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  loop
                >
                  <source src={video.src} type="video/mp4" />
                </video>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                  <ScrollRevealText className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                    {video.title}
                  </ScrollRevealText>
                  <ScrollRevealText className="text-sm" style={{ color: 'var(--muted)' }}>
                    {video.description}
                  </ScrollRevealText>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

function Expect() {
  const highlights = [
    'Keynote speeches from AI and healthcare pioneers',
    'Live demonstrations of AI diagnostic tools',
    'Panel discussions on policy and ethics',
    'Networking sessions with industry leaders',
    'Startup pitch competition with investor panels',
    'Hands-on AI workshops and masterclasses',
    'Exhibition hall featuring latest health tech',
    'One-on-one mentorship opportunities',
  ]

  return (
    <Section id="expect" className="py-32">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-center" style={{ color: 'var(--text)' }}>
          What to Expect
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-6 hover:border-accent/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--accent)' }} />
                <p style={{ color: 'var(--text)' }}>{item}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

function Showdown() {
  return (
    <Section id="showdown" className="py-32">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-strong rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Glow effect */}
          <div
            className="absolute inset-0 opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <motion.div
              className="inline-block mb-8 text-7xl"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              🏆
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              <span className="text-gradient-green">AI Diagnosis Showdown</span>
            </h2>
            <p className="text-xl leading-relaxed mb-10 max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
              Watch leading AI diagnostic systems compete in real-time challenges. See cutting-edge
              technology solve complex medical cases and push the boundaries of what's possible in
              AI-powered healthcare.
            </p>
            <motion.a
              href="#register"
              className="btn-primary inline-block px-10 py-4 text-lg font-bold text-white rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Witness the Future
            </motion.a>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

function Partner() {
  return (
    <Section id="partner" className="py-32">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-strong rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8" style={{ color: 'var(--text)' }}>
            Partnerships
          </h2>
          <p className="text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Join us as a partner and be part of India's largest AI healthcare initiative. Connect
            with innovators, showcase your brand, and contribute to transforming healthcare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#"
              className="btn-primary inline-block px-10 py-4 text-lg font-bold text-white rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Brochure
            </motion.a>
            <motion.a
              href="mailto:partnerships@aibharathealth.org"
              className="glass inline-block px-10 py-4 text-lg font-bold rounded-full hover:border-accent/40 transition-all"
              style={{ color: 'var(--text)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Registration submitted! (Demo - no backend connected)')
    console.log('Form data:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Section id="register" className="py-32">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-6" style={{ color: 'var(--text)' }}>
            Register Now
          </h2>
          <p className="text-xl" style={{ color: 'var(--muted)' }}>
            Secure your spot at AI Bharat Health Mission 2026
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-strong p-8 md:p-10 rounded-3xl space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-4 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder-gray-500 transition-all"
              placeholder="John Doe"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-4 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder-gray-500 transition-all"
              placeholder="john@example.com"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
              Company / Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-4 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder-gray-500 transition-all"
              placeholder="Your Company"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
              Role / Title
            </label>
            <input
              type="text"
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-4 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder-gray-500 transition-all"
              placeholder="CEO, Developer, Researcher, etc."
              style={{ background: 'rgba(255,255,255,0.04)' }}
            />
          </div>

          <motion.button
            type="submit"
            className="btn-primary w-full px-8 py-5 text-lg font-bold text-white rounded-2xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Complete Registration
          </motion.button>
        </form>
      </motion.div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="py-16 border-t" style={{ borderColor: 'var(--stroke)' }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <img src="/logos/biospectrum.svg" alt="BioSpectrum" className="h-8 opacity-70" />
            <img src="/logos/aispectrum.svg" alt="AI Spectrum" className="h-8 opacity-70" />
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              © 2026 AI Bharat Health Mission. All rights reserved.
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)', opacity: 0.6 }}>
              Powered by BioSpectrum • Co-Partner: AI Spectrum
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`relative ${className}`}>
      <div className="max-w-[1440px] mx-auto px-8">{children}</div>
    </section>
  )
}

export default App
