'use strict';

import mongoose from 'mongoose';

const { Model, Schema } = mongoose

const schema = new Schema({
    id: {type: [Number], index: true},
    name: {type:  [String], index: true},
    description: String,
    currency: String,
    createdAt: {type: [Date], index: true},
    updatedAt: Date,
    deletedAt: Date,
    isActive: {type: [String], index: true},
    longDescription: String,
    image: String,
    slug: String,
    website: String,
    twitterHandle: String,
    mission: String,
    backgroundImage: String,
    tags: {type: [String], index: true},
    isSupercollective: String,
    type: {type: [String], index: true},
    data: String,
});

class CollectivesSchema extends Model {}

export default mongoose.model(CollectivesSchema, schema, 'collectives');
