/**
 * Mongoose model CrudSnippets.
 *
 * @author Elida Arrechea
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  value: {
    type: String,
    required: '`{PATH}` is required!',
    max: [42, '`{PATH}` ({VALUE}) exceeds the limit ({MAX}).'],
    min: [1, '`{PATH}` ({VALUE}) is beneath the limit ({MIN}).']
  }
}, {
  timestamps: true,
  versionKey: false
})

// Create a model using the schema.
export const Snippet = mongoose.model('Snippet', schema)
