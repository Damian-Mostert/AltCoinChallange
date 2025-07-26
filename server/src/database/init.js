import Knex from "knex";
import { attachPaginate } from "knex-paginate";

const knexDb = Knex({
	client: "mysql2",
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	},
})

attachPaginate()

export default knexDb
