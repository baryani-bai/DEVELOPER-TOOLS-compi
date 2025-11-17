import Container from '@/components/ui/Container'
import { categories } from '@/lib/constants/tools'
import Link from 'next/link'

export default function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-bg-secondary">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-4">
            🗂️ BROWSE BY CATEGORY
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/tools/${category.id}`}
              className="bg-bg-primary border border-border-primary p-8 transition-all duration-200 hover:border-accent-primary hover:shadow-glow hover:bg-bg-secondary group"
            >
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{category.icon}</span>
                <h3 className="text-2xl font-mono font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                  {category.name}
                </h3>
              </div>

              {/* Tool Count */}
              <p className="text-text-tertiary mb-4">{category.toolCount} tools</p>

              {/* Description */}
              <p className="text-sm text-text-secondary mb-6">{category.description}</p>

              {/* CTA Link */}
              <span className="font-mono text-accent-primary group-hover:underline">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
