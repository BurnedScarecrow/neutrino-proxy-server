#!/bin/bash

sudo cp neutrino.deb sandbox/neutrino.deb

CONTAINER_IDS=$(docker ps -a | grep "neutrino-server" | awk '{print $1}')

if [ -n "$CONTAINER_IDS" ]; then
    echo "$CONTAINER_IDS" | xargs docker rm
    echo "Контейнеры успешно удалены."
else
    echo "Контейнеры с именем 'neutrino-server' не найдены."
fi

docker run -it --name neutrino-server -p 4000:4000 -p 8081:8080  -p 80:80  -p 443:443 -v ./sandbox:/home/sandbox neutrino

