import Container from '@/components/ui/Container'

const values = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Client-side processing means instant results. No server delays.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description: "Your data never leaves your browser. We don't store anything.",
  },
  {
    icon: '🆓',
    title: 'Forever Free',
    description: 'No premium tiers, no paywalls. All 70 tools, completely free.',
  },
  {
    icon: '🎯',
    title: 'Zero Bloat',
    description: 'Just tools. No trackers, no ads, no annoying popups.',
  },
  {
    icon: '🌙',
    title: 'Dark Mode Native',
    description: 'Built for developers who work at night. Easy on the eyes.',
  },
  {
    icon: '🚀',
    title: 'No Barriers',
    description: 'No signup required. Paste, convert, done. That\'s it.',
  },
]

export default function ValuesSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-4">
            WHY CODEBOX?
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center border border-border-secondary p-8 hover:border-accent-primary/30 transition-colors"
            >
              {/* Icon */}
              <div className="text-5xl mb-6">{value.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-mono font-bold text-accent-primary mb-3">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
