#!/bin/sh -f

scp index.html ubuntu@thedonationhub.com:/home/ubuntu/apps/giving_tree/current/public/static/.
scp css/* ubuntu@thedonationhub.com:/home/ubuntu/apps/giving_tree/current/public/static/css/.
scp js/* ubuntu@thedonationhub.com:/home/ubuntu/apps/giving_tree/current/public/static/js/.
scp i/* ubuntu@thedonationhub.com:/home/ubuntu/apps/giving_tree/current/public/static/i/.
#scp -r * ubuntu@thedonationhub.com:/home/ubuntu/apps/giving_tree/current/public/static/.
