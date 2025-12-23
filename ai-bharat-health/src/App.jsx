import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      <Header scrolled={scrolled} />
      <Hero />
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
          ? 'glass-strong py-3 border-b border-white/10'
          : 'bg-transparent backdrop-blur-sm py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left: Logos */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 uppercase tracking-wide">Powered by</span>
            <img src="/logos/biospectrum.svg" alt="BioSpectrum" className="h-8" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 uppercase tracking-wide">Co-Partner</span>
            <img src="/logos/aispectrum.svg" alt="AI Spectrum" className="h-8" />
          </div>
        </div>

        {/* Center: Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-purple transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: CTAs */}
        <div className="flex items-center gap-4">
          <a
            href="#partner"
            className="px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Be our partner!
          </a>
          <a
            href="#register"
            className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-accent-purple to-accent-blue rounded-full hover:shadow-lg hover:shadow-accent-purple/50 transition-all duration-300"
          >
            Register now
          </a>
        </div>
      </div>
    </motion.header>
  )
}

function Hero() {
  return (
    <section className="relative h-screen flex items-end pb-20 overflow-hidden">
      {/* Wistia Video Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://fast.wistia.net/embed/iframe/xo8q6fk8iq?autoPlay=1&muted=1&controlsVisibleOnLoad=0&playbar=0&volume=0&endVideoBehavior=loop"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '120vw',
            height: '120vh',
            border: 'none',
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/50 to-dark-bg" />
      </div>

      {/* Animated AI SVG Background */}
      <motion.div
        className="absolute right-[10%] top-1/2 -translate-y-1/2 z-10 pointer-events-none select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.1, 0.15, 0.1],
          scale: [1, 1.05, 1],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          width="500"
          height="500"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="140"
            fontWeight="900"
            fill="url(#aiGrad)"
            opacity="0.15"
          >
            AI
          </text>
          <defs>
            <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6' }} />
              <stop offset="100%" style={{ stopColor: '#3b82f6' }} />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            AI Bharat Health
            <br />
            Mission 2026
          </h1>
          <motion.a
            href="#register"
            className="inline-block px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-accent-purple to-accent-blue rounded-full hover:shadow-2xl hover:shadow-accent-purple/50 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register now
          </motion.a>
        </motion.div>
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
        <h2 className="text-5xl md:text-6xl font-black mb-6">About the Event</h2>
        <p className="text-xl text-gray-300 leading-relaxed">
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
    <Section id="theme" className="py-32 bg-gradient-to-b from-transparent to-dark-card/30">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-black mb-6">
          <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
            Theme
          </span>
        </h2>
        <p className="text-2xl text-gray-200 font-light leading-relaxed mb-8">
          "AI-Powered Healthcare for Bharat"
        </p>
        <p className="text-lg text-gray-300 leading-relaxed">
          Exploring how artificial intelligence can democratize healthcare access, improve
          diagnostics, and create sustainable health solutions for over a billion people.
        </p>
      </motion.div>
    </Section>
  )
}

function Why() {
  const reasons = [
    {
      title: 'Network with Leaders',
      description: 'Connect with top AI researchers, healthcare innovators, and policy makers.',
    },
    {
      title: 'Learn from Experts',
      description: 'Gain insights from keynotes, workshops, and hands-on sessions.',
    },
    {
      title: 'Showcase Innovation',
      description: 'Present your AI healthcare solutions to industry leaders and investors.',
    },
    {
      title: 'Shape the Future',
      description: 'Contribute to the national conversation on AI in healthcare.',
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
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-center">Why Attend</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="glass p-8 rounded-2xl hover:glass-strong transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
                {reason.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{reason.description}</p>
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
    'Startup pitch competition',
    'Hands-on AI workshops',
  ]

  return (
    <Section id="expect" className="py-32 bg-gradient-to-b from-dark-card/30 to-transparent">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-center">What to Expect</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-200">{item}</p>
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
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-strong p-12 rounded-3xl text-center border-2 border-accent-purple/30">
          <motion.div
            className="inline-block mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-6xl">🏆</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
              AI Diagnosis Showdown
            </span>
          </h2>
          <p className="text-xl text-gray-200 leading-relaxed mb-8">
            Watch leading AI diagnostic systems compete in real-time challenges. See cutting-edge
            technology solve complex medical cases and push the boundaries of what's possible in
            AI-powered healthcare.
          </p>
          <a
            href="#register"
            className="inline-block px-8 py-3 font-bold text-white bg-gradient-to-r from-accent-purple to-accent-blue rounded-full hover:shadow-xl hover:shadow-accent-purple/50 transition-all duration-300"
          >
            Witness the Future
          </a>
        </div>
      </motion.div>
    </Section>
  )
}

function Partner() {
  return (
    <Section id="partner" className="py-32 bg-gradient-to-b from-transparent to-dark-card/30">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl font-black mb-6">Partnerships</h2>
        <p className="text-xl text-gray-300 leading-relaxed mb-10">
          Join us as a partner and be part of India's largest AI healthcare initiative. Connect
          with innovators, showcase your brand, and contribute to transforming healthcare.
        </p>
        <motion.a
          href="mailto:partnerships@aibharathealth.org"
          className="inline-block px-10 py-4 text-lg font-bold text-white border-2 border-accent-purple rounded-full hover:bg-accent-purple transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Become a Partner
        </motion.a>
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
    alert('Registration submitted! (This is a demo - no backend connected)')
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
        <h2 className="text-5xl md:text-6xl font-black mb-6 text-center">Register Now</h2>
        <p className="text-center text-gray-300 mb-12">
          Secure your spot at AI Bharat Health Mission 2026
        </p>

        <form onSubmit={handleSubmit} className="glass-strong p-8 rounded-2xl space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple text-white placeholder-gray-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple text-white placeholder-gray-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-200 mb-2">
              Company / Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple text-white placeholder-gray-500"
              placeholder="Your Company"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-200 mb-2">
              Role / Title
            </label>
            <input
              type="text"
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple text-white placeholder-gray-500"
              placeholder="CEO, Developer, Researcher, etc."
            />
          </div>

          <motion.button
            type="submit"
            className="w-full px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-accent-purple to-accent-blue rounded-full hover:shadow-xl hover:shadow-accent-purple/50 transition-all duration-300"
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
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
        <p className="text-sm">
          © 2026 AI Bharat Health Mission. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Powered by BioSpectrum • Co-Partner: AI Spectrum
        </p>
      </div>
    </footer>
  )
}

function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`relative ${className}`}>
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  )
}

export default App
