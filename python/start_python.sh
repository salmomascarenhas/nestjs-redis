#!/bin/sh
# start_python.sh

until redis-cli ping | grep "PONG"; do
  >&2 echo "Redis is unavailable - sleeping"
  sleep 1
done

>&2 echo "Redis is up - starting server"

python main.py