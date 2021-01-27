/**
 * Module for the CrudSnippetsController.
 *
 * @author Elida Arrechea
 * @version 1.0.0
 */

import moment from 'moment'
import { CrudSnippets } from '../models/crud-snippets.js'

/**
 * Encapsulates a controller.
 */
export class CrudSnippetsController {
  /**
   * Displays a list of snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async indexPost (req, res, next) {
    try {
      const viewData = (await CrudSnippets.find({}))
      res.render('snippets/index', { viewData })
    } catch (error) {
      next(error)
    }
  }
}
