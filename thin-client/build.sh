#!/bin/bash
npx esbuild src/index.js \
	--bundle \
        --minify \
        --format=iife \
        --target=es2018 \
        --outfile=dist/thin-client.min.js