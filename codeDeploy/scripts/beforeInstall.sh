#!/bin/bash
echo "Installing appache in beforeinstall.sh" >> 'home/ec2-user/mmmll.txt'
sudo yum -y update
sudo yum -y install httpd

cd /var/www/html
sudo rm -rf *

sudo mkdir testHostFile  
sudo chmod -R o+r testHostFile
cd testHostFile
echo "<html><h1>HTTPD is running </h1></html>" > testHello.html