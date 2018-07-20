PORT ?= 8000
NODE_PATH ?= src

all: help

help:
	@echo ""
	@echo "dev      - Run webpack dev server on PORT ${PORT}"
	@echo "build    - Run webpack"
	@echo ""

.PHONY: dev
dev:
	@NODE_PATH=${NODE_PATH} \
		./node_modules/webpack-dev-server/bin/webpack-dev-server.js \
		--client-log-level none \
		--hot \
		--color \
		--overlay \
		--port ${PORT}


.PHONY: build
build:
	@rm -rf ./build
	@NODE_ENV=production NODE_PATH=${NODE_PATH} \
		./node_modules/webpack/bin/webpack.js
