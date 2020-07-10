#!/bin/bash
echo "I am in validateService" >> 'home/ec2-user/mmmll.txt'
echo "Service HTTP is -> $(service httpd status)"