bash:
	docker run --rm \
	-v ${PWD}:/app \
	-w /app \
	-p 4321:4321 \
	-it node:20 bash