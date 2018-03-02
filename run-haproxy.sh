docker run -it --rm --name my-running-haproxy \
	--network=host \
	-v $(pwd):/usr/local/etc/haproxy:ro \
	-v $(pwd)/xip.io:/etc/ssl/xip.io \
	haproxy