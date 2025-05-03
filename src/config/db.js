const { PrismaClient } = require('@prisma/client');

let prisma;

function getPrismaInstance() {
  if (!prisma) {
    prisma = new PrismaClient();
    // Warm up the connection
    prisma.$connect()
      .then(() => console.log('Database connected successfully'))
      .catch(err => console.error('Database connection error:', err));
  }
  return prisma;
}

module.exports = getPrismaInstance();