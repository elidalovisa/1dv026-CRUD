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
router.get('/', controller.index)

router.get('/new', controller.new)
router.post('/create', controller.create)
//delete?