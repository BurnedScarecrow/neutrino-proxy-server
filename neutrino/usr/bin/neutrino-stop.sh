#!/bin/bash

sudo systemctl stop shadowsocks-libev

sudo kill -9 $(sudo lsof -t -i:4000)
sudo kill -9 $(sudo lsof -t -i:4000)
