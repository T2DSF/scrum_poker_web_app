#!/bin/bash

echo "Uploading client to scrumpoker.t2dsf.com"

rsync -avvz --progress ./source/client/. root@205.186.163.173:/var/www/scrumpoker.t2dsf.com/html
