#!/bin/bash
echo "Hi, I'm sleeping for 25 seconds..."
sleep 25  
echo "all Done."
# HOST_IP="$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mysqlDB)"
# export HOST_IP
npm start