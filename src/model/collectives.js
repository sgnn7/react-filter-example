'use strict';

import mongoose from 'mongoose';

const { Model, Schema } = mongoose

const schema = new Schema({
    id: Number,
    name: String,
    description: String,
    currency: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    isActive: String,
    longDescription: String,
    image: String,
    slug: String,
    website: String,
    twitterHandle: String,
    mission: String,
    backgroundImage: String,
    tags: String,
    isSupercollective: String,
    type: String,
    data: String,
});

class CollectivesSchema extends Model {}

export default mongoose.model(CollectivesSchema, schema, 'collectives');
