#!/bin/sh
# Start both Next.js and Voice Relay in the same container
# Voice Relay runs on port 8081, Next.js on port 3000

echo "🚀 Starting Voice Relay Server on port 8081..."
node voice-relay.js &

echo "🚀 Starting Next.js Server on port 3000..."
node server.js &

# Wait for any process to exit, then exit all
wait -n
exit $?
