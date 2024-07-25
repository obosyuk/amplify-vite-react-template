.PHONY: generate-schema run-dev

generate-schema:
	npx ampx generate schema-from-database --connection-uri-secret SQL_CONNECTION_STRING --out amplify/data/schema.sql.ts

run:
	npm run dev

sandbox:
	npx ampx sandbox

rm-sandbox:
	npx ampx sandbox delete

generate-forms:
	npx ampx generate forms