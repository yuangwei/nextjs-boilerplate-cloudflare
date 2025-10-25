import { getPostgres } from "./driver/pg";
import { getSqlite } from "./driver/sqlite";
export * from "./schema";

export const getDB = (client: "pg" | "sqlite") => {
	if (client === "pg") {
		return getPostgres();
	}
	return getSqlite();
};
