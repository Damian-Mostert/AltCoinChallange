import Knex from "knex"

const dbName = process.env.DB_NAME

const knex = Knex({
	client: "mysql2",
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		multipleStatements: true,
	},
	pool: { min: 0, max: 5 },
})

async function setupDatabase() {
	try {
		await knex.raw(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`)

		const knexDb = Knex({
			client: "mysql2",
			connection: {
				host: process.env.DB_HOST,
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: dbName,
			},
			pool: { min: 0, max: 5 },
		});

		const existsCurrencies = await knexDb.schema.hasTable("currencies");
		if (!existsCurrencies) {
			await knexDb.schema.createTable("currencies", (table) => {
				table.increments("id").primary();
				table.integer("real_id").unique();
				table.integer("rank");
				table.string("name", 100).notNullable()
				table.string("slug", 100).notNullable()
				table.string("symbol", 20).notNullable()
				table.integer("is_active")
				table.string("first_historical_data", 100).notNullable()
				table.string("last_historical_data", 100).notNullable()
				table.timestamp("created_at").defaultTo(knexDb.fn.now())
				table.integer("platform_id").nullable()
			});
		}

		console.log("Database and tables created successfully!")
		await knexDb.destroy()
		await knex.destroy()
	} catch (error) {
		console.error("Setup error:", error)
	}
}

setupDatabase()
	.then(() => {
		console.log("Setup complete")
		process.exit(0)
	})
	.catch((err) => {
		console.error("Setup failed:", err)
		process.exit(1)
	})

export default {}
