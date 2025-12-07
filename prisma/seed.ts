import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'conference' },
      update: {},
      create: {
        name: 'Conferencia',
        slug: 'conference',
        description: 'Conferencias y charlas profesionales',
        color: '#3B82F6',
        icon: 'presentation',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'workshop' },
      update: {},
      create: {
        name: 'Taller',
        slug: 'workshop',
        description: 'Talleres prácticos y workshops',
        color: '#8B5CF6',
        icon: 'wrench',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'meetup' },
      update: {},
      create: {
        name: 'Meetup',
        slug: 'meetup',
        description: 'Encuentros comunitarios',
        color: '#10B981',
        icon: 'users',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'concert' },
      update: {},
      create: {
        name: 'Concierto',
        slug: 'concert',
        description: 'Eventos musicales y conciertos',
        color: '#F59E0B',
        icon: 'music',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sports' },
      update: {},
      create: {
        name: 'Deportes',
        slug: 'sports',
        description: 'Eventos deportivos',
        color: '#EF4444',
        icon: 'trophy',
      },
    }),
  ])

  console.log(`✅ Created ${categories.length} categories`)

  // Create demo users
  const hashedPassword = await hash('password123', 10)

  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@example.com' },
    update: {},
    create: {
      email: 'organizer@example.com',
      name: 'Juan Organizador',
      password: hashedPassword,
      role: 'ORGANIZER',
    },
  })

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'María Usuario',
      password: hashedPassword,
      role: 'USER',
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin Sistema',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Created demo users')

  // Create demo events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Next.js Conf 2025',
        slug: 'nextjs-conf-2025',
        description: 'La conferencia anual de Next.js con las últimas novedades del framework. Aprende sobre Server Components, App Router, y más.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        startDate: new Date('2025-12-15T09:00:00'),
        endDate: new Date('2025-12-15T18:00:00'),
        location: 'Centro de Convenciones',
        address: 'Av. Libertador 1234',
        city: 'Buenos Aires',
        country: 'Argentina',
        capacity: 500,
        price: 50.00,
        status: 'PUBLISHED',
        published: true,
        featured: true,
        tags: ['nextjs', 'react', 'javascript', 'web development'],
        organizerId: organizer.id,
        categoryId: categories[0].id, // Conference
      },
    }),
    prisma.event.create({
      data: {
        title: 'Workshop de TypeScript Avanzado',
        slug: 'typescript-workshop-2025',
        description: 'Taller práctico de TypeScript avanzado. Aprende tipos genéricos, utilidades, y patrones de diseño.',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
        startDate: new Date('2025-12-20T14:00:00'),
        endDate: new Date('2025-12-20T18:00:00'),
        location: 'Tech Hub',
        address: 'Av. Córdoba 5678',
        city: 'Buenos Aires',
        country: 'Argentina',
        capacity: 30,
        price: 25.00,
        status: 'PUBLISHED',
        published: true,
        tags: ['typescript', 'javascript', 'programming'],
        organizerId: organizer.id,
        categoryId: categories[1].id, // Workshop
      },
    }),
    prisma.event.create({
      data: {
        title: 'Buenos Aires JavaScript Meetup',
        slug: 'ba-js-meetup-december',
        description: 'Meetup mensual de la comunidad JavaScript de Buenos Aires. Networking y charlas técnicas.',
        startDate: new Date('2025-12-10T19:00:00'),
        location: 'Cafetería Tech Space',
        address: 'Santa Fe 910',
        city: 'Buenos Aires',
        country: 'Argentina',
        capacity: 50,
        status: 'PUBLISHED',
        published: true,
        tags: ['javascript', 'meetup', 'community', 'networking'],
        organizerId: organizer.id,
        categoryId: categories[2].id, // Meetup
      },
    }),
  ])

  console.log(`✅ Created ${events.length} demo events`)

  // Create some demo tickets
  const ticket = await prisma.ticket.create({
    data: {
      eventId: events[0].id,
      userId: user.id,
      qrCode: `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'CONFIRMED',
      price: events[0].price,
    },
  })

  console.log('✅ Created demo ticket')

  console.log('\n🎉 Seeding completed successfully!')
  console.log('\n📧 Demo Users:')
  console.log('   Organizer: organizer@example.com / password123')
  console.log('   User: user@example.com / password123')
  console.log('   Admin: admin@example.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
