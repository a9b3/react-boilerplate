PORT ?= 8000
NODE_PATH ?= src

all: help

help:
	@echo ""
	@echo "dev      - Run webpack dev server on PORT ?= ${PORT}"
	@echo "build    - Run webpack"
	@echo "story    - Runs storybook server     PORT ?= $(PORT)"
	@echo ""

deps:
	@yarn

.PHONY: dev
dev: deps
	@NODE_PATH=${NODE_PATH} \
		./node_modules/webpack-dev-server/bin/webpack-dev-server.js \
		--client-log-level none \
		--color \
		--history-api-fallback \
		--hot \
		--overlay \
		--port ${PORT}


.PHONY: build
build:
	@rm -rf ./build
	@NODE_ENV=production NODE_PATH=${NODE_PATH} \
		./node_modules/webpack/bin/webpack.js

story: deps
	@NODE_PATH=${NODE_PATH} ./node_modules/@storybook/react/bin/index.js \
		-p $(PORT) \
		-c storybook
