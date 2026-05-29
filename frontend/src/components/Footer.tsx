import { useState, useEffect, useRef } from 'react'
import styles from './Footer.module.css'

const NAV_LINKS: Record<string, string[]> = {
  Navegação: ['Início', 'Sobre mim', 'Projetos', 'Experiência'],
  Trabalho: ['Contato','Currículo', 'Blog'],
  Legal: ['Privacidade', 'Termos de uso', 'Cookies', 'LGPD'],  
}

type SocialLink = {
  label: string
  href: string
  icon: React.FC
}
const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: '#', icon: GitHubIcon },
  { label: 'Twitter / X', href: '#', icon: XIcon },
  { label: 'LinkedIn', href: '#', icon: LinkedInIcon },
  { label: 'Discord', href: '#', icon: DiscordIcon },
]

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
const footerRef = useRef<HTMLElement>(null)
  const year = new Date().getFullYear()

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const handler = (e:MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    el.addEventListener('mousemove', handler)
    return () => el.removeEventListener('mousemove', handler)
  }, [])

  return (
    <footer className={styles.footer} ref={footerRef}>
     
      <div
        className={styles.cursorLight}
        style={{ '--cx': `${mousePos.x}px`, '--cy': `${mousePos.y}px` }as React.CSSProperties}
      />
    
      <div className={styles.topLine} />

      <div className={styles.inner}>
        {/* Brand Column */}
        <div className={styles.brand}>
          <div className={styles.logoMark}>
            <LogoIcon />
          </div>
          <p className={styles.tagline}>
            Construído com{' '}
            <span className={styles.italic}>precisão</span>{' '}
            para quem não aceita menos que o extraordinário.
          </p>
          <div className={styles.socials}>
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={styles.socialBtn}
              >
                <Icon />
              </a>
            ))}
          </div>
          <div className={styles.badge}>
            <span className={styles.dot} />
            Todos os sistemas operacionais
          </div>
        </div>

        {/* Nav Columns */}
        {Object.entries(NAV_LINKS).map(([category, links]) => (
          <div key={category} className={styles.column}>
            <h4 className={styles.columnTitle}>{category}</h4>
            <ul className={styles.linkList}>
              {links.map((link) => {
                const key = `${category}-${link}`
                return (
                  <li key={link}>
                    <a
                      href="#"
                      className={`${styles.link} ${hoveredLink === key ? styles.linkHovered : ''}`}
                      onMouseEnter={() => setHoveredLink(key)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span className={styles.linkArrow}>→</span>
                      {link}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomLine} />
        <div className={styles.bottomContent}>
          <span className={styles.copyright}>
            <span className={styles.copyrightSymbol}>©</span>
            {year} Alan Campos. Todos os direitos reservados.
          </span>          
          <span className={styles.madeWith}>
            Desenvolvedor Web <ProgrammingIcon /> 
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ── Inline SVG Icons ─────────────────────────────── */

function LogoIcon() {
  return (
    <svg width="130" height="70" viewBox="0 0 130 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Janela terminal */}
      <rect x="1" y="1" width="128" height="68" rx="8"
        fill="#0d0d12" stroke="#c8ff00" strokeWidth="1.2"/>

      {/* Traffic lights */}
      <circle cx="16" cy="14" r="4" fill="#ff5f57"/>
      <circle cx="28" cy="14" r="4" fill="#febc2e"/>
      <circle cx="40" cy="14" r="4" fill="#28c840"/>

      {/* Linha separadora do título */}
      <line x1="1" y1="24" x2="129" y2="24" stroke="#c8ff00" strokeWidth="0.5" strokeOpacity="0.3"/>

      {/* Prompt */}
      <text x="12" y="43"
        fontFamily="'Fira Code', monospace"
        fontSize="14"
        fontWeight="600"
        fill="#c8ff00">
        $ alan
      </text>
      <text x="12" y="59"
        fontFamily="'Fira Code', monospace"
        fontSize="11"
        fill="#555">
        _campos.dev
      </text>

      {/* Cursor piscando */}
      <rect x="12" y="62" width="7" height="2" fill="#c8ff00">
        <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/>
      </rect>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function ProgrammingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L10.8 12l3.8-3.8L16 6l6 6-6 6-1.4-1.4z" />
    </svg>
  )
}

