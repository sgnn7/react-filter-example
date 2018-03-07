#!/bin/bash -ex

CURRENT_DIR=$(dirname $0)

# XXX: Booleans are not parsed properly - ideally we would manually specify
#      full field descriptor but you can't use both --field and --headerline
# --fields "isActive.boolean() isSupercollective.boolean()" \
mongoimport --db react-filter-test \
            --collection collectives \
            --drop \
            --mode upsert \
            --ignoreBlanks \
            --type csv \
            --headerline \
            --file $CURRENT_DIR/collectives.csv

