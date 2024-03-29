/**
 * The routes.
 *
 * @author Elida Arrechea
 * @version 1.0.0
 */

import express from 'express'
import { router as snippetsRouter } from './snippets-router.js'

export const router = express.Router()

router.use('/', snippetsRouter)

router.use('*', (req, res, next) => {
  const error = new Error()
  error.status = 404
  error.message = 'Not Found'
  next(error)
})
