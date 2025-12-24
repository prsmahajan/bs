import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(180deg, #071225 0%, #0B1B3A 100%)' }}>
      <Header scrolled={scrolled} />
      <Hero />
      <LogoCarousel />
      <About />
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

function Header({ scrolled }) {
  const navLinks = [
    { label: 'About event', href: '#about' },
    { label: 'Theme', href: '#theme' },
    { label: 'Why Attend', href: '#why' },
    { label: 'What to expect', href: '#expect' },
    { label: 'AI Diagnosis Showdown', href: '#showdown' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 border-b border-white/90'
          : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        backdropFilter: scrolled ? 'blur(5px)' : 'blur(8px)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 flex items-center justify-between">
        {/* Left: Logos */}
        <div className="flex items-center gap-8 -ml-6">
          <div className="flex gap-2">
            <span className="text-[15px] capitalize tracking-widest" style={{ color: 'var(--muted)' }}>
              Powered by
            </span>
            <img src="/logos/biospectrumasia.webp" alt="BioSpectrum" className="h-13 w-40" />
          </div>
        </div>

        {/* Center: Nav Links */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-md font-medium transition-colors group nav"
              style={{ color: 'var(--muted)' }}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full"
                style={{ background: 'var(--accent)' }}
              />
            </a>
          ))}
        </nav>

        {/* Right: CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="#partner"
            className="glass px-5 py-4 text-sm font-medium rounded-lg transition-all duration-300 jakarta"
            style={{ color: 'var(--text)' }}
          >
            Be our partner!
          </a>
          <a
            href="#register"
            className="btn-primary px-6 py-4 text-sm font-bold text-white rounded-lg"
          >
            Register now
          </a>
        </div>
      </div>
    </motion.header>
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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          src="https://fast.wistia.net/embed/iframe/xo8q6fk8iq?autoPlay=1&muted=true"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 brightness-125"
          style={{
            width: '120vw',
            height: '120vh',
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
              <path d="M0 0L40 40M40 0L0 40" stroke="white" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="400" height="600" fill="url(#lattice)" transform="rotate(15 200 300)" />
        </svg>
      </div>

      {/* Giant AI Watermark */}
      {/* <motion.div
        className="absolute right-[5%] top-1/2 -translate-y-1/2 z-10 pointer-events-none select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.08, 0.12, 0.08],
          scale: [1, 1.02, 1],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          width="600"
          height="600"
          viewBox="0 0 200 200"
          fill="none"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="140"
            fontWeight="900"
            fill="url(#aiGrad)"
            style={{ filter: 'drop-shadow(0 0 40px rgba(0,166,81,0.3))' }}
          >
            AI
          </text>
          <defs>
            <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00A651' }} />
              <stop offset="100%" style={{ stopColor: '#2BD576' }} />
            </linearGradient>
          </defs>
        </svg>
      </motion.div> */}

      <div className="relative z-20 max-w-[1440px] mx-auto px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6">
            <span className="font-serif italic font-normal" style={{ color: 'var(--muted)' }}>
              Where{' '}
            </span>
            <span className="font-bold" style={{ color: 'var(--text)' }}>
              health leaders
              <br />
              and AI{' '}
            </span>
            <span className="font-serif italic font-normal text-gradient-green">
              converge
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl tit" style={{ color: 'var(--muted)' }}>
            The global platform for deal-making, ROI impact and visibility in healthcare AI.
          </p>
          <motion.a
            href="#register"
            className="btn-primary inline-block px-10 py-4 text-lg font-bold text-white rounded-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register now
          </motion.a>
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
            className="glass-strong rounded-3xl p-8 w-full max-w-md"
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
            <div className="flex flex-col items-baseline gap-4 mb-28">
              <div className="text-5xl font-medium jakarta" style={{ color: '#eee' }}>
               17 April 2026,
              </div>
              <div className="text-3xl font-medium jakarta">Taj, MG Road, Bengaluru</div>
            </div>

            <div className="space-y-3">
              <motion.a
                href="#register"
                className="btn-primary block w-full text-center px-6 py-4 text-base font-bold text-white rounded-md"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                Register now
              </motion.a>
              <motion.a
                href="#partner"
                className="glass block w-full text-center px-6 py-4 text-base font-semibold rounded-md hover:border-white transition-all group jakarta"
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
    { id: 1, name: 'Partner 1', src: '' },
    { id: 2, name: 'Partner 2', src: '' },
    { id: 3, name: 'Partner 3', src: '' },
    { id: 4, name: 'Partner 4', src: '' },
    { id: 5, name: 'Partner 5', src: '' },
    { id: 6, name: 'Partner 6', src: '' },
    { id: 7, name: 'Partner 7', src: '' },
    { id: 8, name: 'Partner 8', src: '' },
    { id: 9, name: 'Partner 9', src: '' },
    { id: 10, name: 'Partner 10', src: '' },
  ]

  return (
    <section className="relative py-16 overflow-hidden border-t border-b" style={{ borderColor: 'var(--stroke)' }}>
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#071225] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#071225] to-transparent z-10 pointer-events-none" />

        {/* Infinite scrolling container */}
        <div className="flex animate-scroll">
          {/* First set of logos */}
          <div className="flex gap-6 px-3">
            {logos.map((logo) => (
              <div
                key={`first-${logo.id}`}
                className="glass flex-shrink-0 rounded-full px-8 py-4 flex items-center justify-center min-w-[180px]"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex gap-6 px-3">
            {logos.map((logo) => (
              <div
                key={`second-${logo.id}`}
                className="glass flex-shrink-0 rounded-full px-8 py-4 flex items-center justify-center min-w-[180px]"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" className="py-32">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-black mb-8" style={{ color: 'var(--text)' }}>
          About the Event
        </h2>
        <p className="text-xl leading-relaxed" style={{ color: 'var(--muted)' }}>
          Join us for the premier AI healthcare event of 2026. Bringing together visionaries,
          researchers, and industry leaders to shape the future of healthcare in India through
          artificial intelligence and cutting-edge technology.
        </p>
      </motion.div>
    </Section>
  )
}

function Theme() {
  return (
    <Section id="theme" className="py-32">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-strong rounded-3xl p-12 md:p-16 text-center">
          <div className="inline-block mb-6 px-6 py-2 glass rounded-full">
            <span className="text-sm font-semibold uppercase tracking-wider text-gradient-green">
              2026 Theme
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gradient-green">
            AI-Powered Healthcare for Bharat
          </h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
            Exploring how artificial intelligence can democratize healthcare access, improve
            diagnostics, and create sustainable health solutions for over a billion people.
          </p>
        </div>
      </motion.div>
    </Section>
  )
}

function Why() {
  const reasons = [
    {
      title: 'Network with Leaders',
      description: 'Connect with top AI researchers, healthcare innovators, and policy makers shaping the future of health tech.',
    },
    {
      title: 'Learn from Experts',
      description: 'Gain insights from keynotes, workshops, and hands-on sessions led by industry pioneers.',
    },
    {
      title: 'Showcase Innovation',
      description: 'Present your AI healthcare solutions to industry leaders, investors, and potential partners.',
    },
    {
      title: 'Shape the Future',
      description: 'Contribute to the national conversation on AI in healthcare and influence policy direction.',
    },
  ]

  return (
    <Section id="why" className="py-32">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-center" style={{ color: 'var(--text)' }}>
          Why Attend
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-8 hover:glass-strong transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-1 bg-gradient-to-r from-accent to-accent2 rounded-full mb-6" />
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                {reason.title}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
                {reason.description}
              </p>
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
