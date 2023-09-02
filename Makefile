init-admin-env:
	@if [ ! -f apps/admin/.env ]; then \
        cp apps/admin/.env.example apps/admin/.env; \
	fi
init-web:
	@if [ ! -f apps/web/.env.local ]; then \
		cp apps/web/.env.example apps/web/.env.local; \
	fi
init-root:
	npm install
	npm run gen:graphql

init: init-admin-env init-web init-root