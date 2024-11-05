#!/bin/bash

# Check DB is started
DB_STATUS=$(fly status -a how-about-db | grep -o 'started\|stopped')

if [ "$DB_STATUS" == "stopped" ]; then
    echo "Starting Fly DB Machine"
    fly machine start 918592da465de8 -a how-about-db
    sleep 10
fi

echo "Proxying into Fly DB Machine"
# Ensure we proxy into the fly db
fly proxy 5432 -a how-about-db &

# Store the process ID of the Fly proxy
PROXY_PID=$!

# Wait for the proxy to start
sleep 5

# Check proxy is running
if ps -p $PROXY_PID > /dev/null; then
    echo "Fly proxy is running, starting NestJS..."
else
    echo "Failed to start Fly proxy."
    exit 1
fi

# Run dev server
nest start --watch

wait