import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default categories
  const categories = [
    {
      name: 'Nut-Free',
      slug: 'no-nuts',
      description: 'Safe for nut allergies',
      icon: '🥜'
    },
    {
      name: 'Dairy-Free',
      slug: 'dairy-free',
      description: 'No dairy products',
      icon: '🥛'
    },
    {
      name: 'Gluten-Free',
      slug: 'gluten-free',
      description: 'No gluten ingredients',
      icon: '🌾'
    },
    {
      name: 'No-Bake',
      slug: 'no-bake',
      description: 'No oven required',
      icon: '🔥'
    },
    {
      name: 'Easy-Bake',
      slug: 'easy-bake',
      description: 'Quick and simple',
      icon: '⚡'
    },
    {
      name: 'Vegan',
      slug: 'vegan',
      description: 'Plant-based only',
      icon: '🌱'
    }
  ];

  console.log('📂 Creating categories...');

  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    });
    console.log(`✅ Created category: ${created.name}`);
  }

  console.log('');
  console.log('✨ Seeding complete!');
  console.log('');
  console.log('Available categories:');
  categories.forEach(cat => {
    console.log(`  ${cat.icon} ${cat.name} - ${cat.description}`);
  });
  console.log('');
  console.log('🚀 You can now start the app with: npm run dev');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
