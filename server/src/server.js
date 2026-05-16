const { app, connectDb } = require("./app");

const PORT = process.env.PORT || 4000;

async function maybeSeed() {
  if (process.env.SEED_IF_EMPTY === "false") return;
  const { Product } = require("./models");
  const count = await Product.count();
  if (count > 0) return;
  const { seed } = require("./seed/seed");
  console.log("База пустая — заполняем демо-данными...");
  await seed({ sync: false });
  console.log("Seed complete");
}

connectDb()
  .then(() => maybeSeed())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.error("DB connection failed", e);
    process.exit(1);
  });
