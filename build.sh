#!/bin/bash

# echo -e "\n\nUPDATE packages"
# sudo apt update
# sudo apt upgrade

# echo -e "\n\nINSTALL dpkg"
# sudo apt-get install dpkg -y
# echo -e "\n\nINSTALL dialog and apt-utils"
# sudo apt-get install dialog apt-utils -y

echo -e "\n\nBUILD deb package"
sudo dpkg -b ./neutrino
sudo cp ./neutrino.deb ./sandbox/neutrino.deb
sudo cp ./neutrino.deb ./builds/neutrino-server.deb

# echo -e "\n\nINSTALL neutrino"
# sudo apt-get install ./citus-master.deb
