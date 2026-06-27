// Seed: popula os produtos iniciais e cria a conta admin.
// Rode com:  npm run db:seed
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const produtos = [
  // ── Masculino ──
  {
    slug: "camisa-linho-larvotto",
    nome: "Camisa de Linho Larvotto",
    descricao:
      "Linho lavado de gramatura média, caimento solto e botões em madrepérola.",
    preco: 690,
    imagem: "/products/camisa-linho-larvotto.svg",
    cores: "Off-white,Areia",
    tamanhos: "P,M,G,GG",
    genero: "masculino",
    categoria: "Camisa",
  },
  {
    slug: "calca-alfaiataria-casino",
    nome: "Calça de Alfaiataria Casino",
    descricao: "Alfaiataria em lã fria com pences e barra reta.",
    preco: 890,
    imagem: "/products/calca-alfaiataria-casino.svg",
    cores: "Grafite,Bege",
    tamanhos: "38,40,42,44,46",
    genero: "masculino",
    categoria: "Calça",
  },
  {
    slug: "sueter-cashmere-riviera",
    nome: "Suéter de Cashmere Riviera",
    descricao: "Cashmere puro de tramas finas, gola careca e toque aveludado.",
    preco: 1480,
    imagem: "/products/sueter-cashmere-riviera.svg",
    cores: "Camel,Marinho",
    tamanhos: "P,M,G,GG",
    genero: "masculino",
    categoria: "Tricô",
  },
  {
    slug: "tenis-couro-boulevard",
    nome: "Tênis de Couro Boulevard",
    descricao: "Couro italiano premium em solado de borracha leve.",
    preco: 1190,
    imagem: "/products/tenis-couro-boulevard.svg",
    cores: "Branco,Preto",
    tamanhos: "38,39,40,41,42,43",
    genero: "masculino",
    categoria: "Sapato",
  },
  {
    slug: "jaqueta-couro-grand-prix",
    nome: "Jaqueta de Couro Grand Prix",
    descricao: "Couro de cordeiro com forro acetinado e zíperes italianos.",
    preco: 3290,
    imagem: "/products/jaqueta-couro-grand-prix.svg",
    cores: "Preto",
    tamanhos: "P,M,G,GG",
    genero: "masculino",
    categoria: "Jaqueta",
  },
  // ── Feminino ──
  {
    slug: "vestido-seda-riviera",
    nome: "Vestido de Seda Riviera",
    descricao: "Seda pura de caimento fluido, decote discreto e comprimento midi.",
    preco: 1390,
    imagem: "/products/vestido-seda-riviera.svg",
    cores: "Preto,Vinho",
    tamanhos: "P,M,G,GG",
    genero: "feminino",
    categoria: "Vestido",
  },
  {
    slug: "blazer-alfaiataria-cote",
    nome: "Blazer de Alfaiataria Côte",
    descricao: "Alfaiataria feminina em lã fria, ombro estruturado e botão único.",
    preco: 980,
    imagem: "/products/blazer-alfaiataria-cote.svg",
    cores: "Preto,Areia",
    tamanhos: "P,M,G,GG",
    genero: "feminino",
    categoria: "Blazer",
  },
  {
    slug: "blusa-linho-larvotto",
    nome: "Blusa de Linho Larvotto",
    descricao: "Linho leve de toque seco, modelagem solta e acabamento artesanal.",
    preco: 520,
    precoAntigo: 690, // exemplo de promoção
    imagem: "/products/blusa-linho-larvotto.svg",
    cores: "Branco,Verde-água",
    tamanhos: "P,M,G,GG",
    genero: "feminino",
    categoria: "Blusa",
  },
  {
    slug: "scarpin-couro-boulevard",
    nome: "Scarpin de Couro Boulevard",
    descricao: "Couro italiano premium, bico fino e salto médio confortável.",
    preco: 1090,
    imagem: "/products/scarpin-couro-boulevard.svg",
    cores: "Preto,Nude",
    tamanhos: "34,35,36,37,38,39",
    genero: "feminino",
    categoria: "Sapato",
  },
  {
    slug: "saia-midi-casino",
    nome: "Saia Midi Casino",
    descricao: "Saia midi em sarja encorpada, cintura alta e fenda discreta.",
    preco: 760,
    imagem: "/products/saia-midi-casino.svg",
    cores: "Preto,Caramelo",
    tamanhos: "36,38,40,42,44",
    genero: "feminino",
    categoria: "Saia",
  },
];

async function main() {
  for (const p of produtos) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  const adminEmail = "admin@monacoclub.com";
  const passwordHash = await bcrypt.hash("monacoadmin", 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "admin" },
    create: {
      nome: "Admin",
      email: adminEmail,
      passwordHash,
      role: "admin",
      aceitouTermosEm: new Date(),
    },
  });

  const total = await prisma.product.count();
  console.log(`Seed OK. ${total} produtos. Admin: ${adminEmail} / senha: monacoadmin`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
