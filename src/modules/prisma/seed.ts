import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const services = [
    {
      id: randomUUID(),
      name: 'Corte Masculino',
      created_at: now,
      updated_at: now,
    },
    {
      id: randomUUID(),
      name: 'Barba',
      created_at: now,
      updated_at: now,
    },
    {
      id: randomUUID(),
      name: 'Corte Feminino',
      created_at: now,
      updated_at: now,
    },
  ];

  for (const service of services) {
    await prisma.services.upsert({
      where: { id: service.id },
      update: {},
      create: service,
    });
  }

  console.log('Seed de services criada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
