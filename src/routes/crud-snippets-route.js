/**
 * Crud snippets routes.
 *
 * @author Elida Arrechea
 * @version 1.0.0
 */

import express from 'express'
import CrudSnippetsController } from '../controllers/pure-numbers-controller.js'

export const router = express.Router()

const controller = new CrudSnippetsController()

// Map HTTP verbs and route paths to controller actions.
router.get('/', controller.index)  // Display list of snippets.
router.get('/new', controller.new) // Return HTML form to create a new snippet.
router.post('/create', controller.create) // Create a new snippet.
router.get('/:id', controller.show) // Display specific snippet.
router.get('/:id/edit', controller.edit) // Return a HTML form for editing a snippet.
router.post('/:id/update', controller.update) // Update a specific snippet.
router.get('/:id/remove', controller.remove) // Return a HTML form for removing a snippet.
router.post('/:id/delete', controller.delete) // Delete a specifik snippet.