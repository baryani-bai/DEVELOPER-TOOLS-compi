import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { popularTools } from '@/lib/constants/tools'
import Link from 'next/link'

export default function PopularToolsSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-4">
            <span className="text-accent-primary">⚡</span> MOST USED TOOLS
          </h2>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {popularTools.map((tool) => (
            <Card
              key={tool.id}
              title={tool.name}
              description={tool.description}
              icon={tool.icon}
              href={`/tools/${tool.id}`}
            >
              <Link href={`/tools/${tool.id}`}>
                <Button variant="secondary" className="w-full text-sm">
                  Use →
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/tools">
            <Button variant="secondary">View All Tools →</Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
