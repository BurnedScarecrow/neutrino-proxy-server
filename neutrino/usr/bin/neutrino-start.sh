#!/bin/bash

sudo systemctl start nginx
sudo systemctl start shadowsocks-libev

cd /usr/share/neutrino-server/back
sudo npm run start

