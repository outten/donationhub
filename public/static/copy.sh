#!/bin/sh -f

scp -r index.html ubuntu@thedonationhub.com:/home/ubuntu/apps/giving_tree/current/public/beta/.
scp css/* ubuntu@thedonationhub.com:/home/ubuntu/apps/giving_tree/current/public/css/.
scp js/* ubuntu@thedonationhub.com:/home/ubuntu/apps/giving_tree/current/public/js/.
scp i/* ubuntu@thedonationhub.com:/home/ubuntu/apps/giving_tree/current/public/i/.
