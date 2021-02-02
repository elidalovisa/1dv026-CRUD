/**
 * Module for the CrudSnippetsController.
 *
 * @author Elida Arrechea
 * @version 1.0.0
 */

import { Snippet, User } from '../models/crud-snippets.js'

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
  async index (req, res, next) {
    try {
      const viewData = {
        snippets: (await Snippet.find({})) // Get all objects and filter out id and value.
          .map(snippet => ({
            id: snippet._id,
            value: snippet.value
          }))
      }
      res.render('snippets/index', { viewData }) // Present the data in HTML.
    } catch (error) {
      next(error)
    }
  }

  /**
  * Displays a snippet.
  *
  * @param {object} req - Express request object.
  * @param {object} res - Express response object.
  * @param {Function} next - Express next middleware function.
  */
  async show (req, res, next) {
    // Get the first product that's id equals the parameter id's value.
    const snippet = new Snippet()
      .filter(snippet => snippet.id === Number(req.params.id))
      .shift()

    // If no product is found send a 404 (resource not found).
    if (!snippet) {
      const error = new Error('Not Found')
      error.status = 404

      // IMPORTANT! Never throw an exception in an async action handler,
      // always call next!
      next(error)
      return
    }
    // Send response with the wanted product.
    const viewData = { snippet }
    res.render('products/show', { viewData })
  }

  /**
   * Returns a HTML form for creating a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async new (req, res) {
    const viewData = {
      value: ''
    }
    res.render('snippets/new', { viewData })
  }

  /**
   * Creates a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async create (req, res) {
    try {
      const snippet = new Snippet({
        value: req.body.value
      })

      await snippet.save() // Save object in mongodb.

      req.session.flash = { type: 'success', text: 'The snippet was created successfully.' }
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./new')
    }
  }

  /**
   * Returns a HTML form for editing a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async edit (req, res) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })
      const viewData = {
        id: snippet._id,
        value: snippet.value
      }
      res.render('./snippets/edit', { viewData })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Updates a specific snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async update(req, res) {
    try {
      const result = await Snippet.updateOne({ _id: req.body.id }, {
        value: req.body.value
      })

      if (result.nModified === 1) {
        req.session.flash = { type: 'success', text: 'The snippet was updated successfully.' }
      } else {
        req.session.flash = {
          type: 'danger',
          text: 'The task you attempted to update was removed by another user after you got the original values.'
        }
      }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./edit')
    }
  }

  /**
   * Returns a HTML form for removing a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async remove (req, res) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })
      const viewData = {
        id: snippet._id,
        value: snippet.value
      }
      res.render('./snippets/remove', { viewData })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Deletes the specified snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async delete (req, res) {
    try {
      await Snippet.deleteOne({ _id: req.body.id }) // Specify id for snippet that is going to be deleted.

      req.session.flash = { type: 'success', text: 'The snippet was deleted successfully.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./remove')
    }
  }

  /**
   * Returns a HTML form to register new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async register (req, res) {
    const viewData = {
      value: undefined
    }
    res.render('snippets/register', { viewData })
  }

  /**
   * Register a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async registerUser (req, res) {
    try {
      // Check if password match.

      // Save user in database.
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })
      await user.save() // Save object in mongodb.

      req.session.flash = { type: 'success', text: 'Registration successful.' }
      res.redirect('..') // where to redirect
    } catch (error) {
      // If auth fails redirect to the login page and show an error message or show status code 401.
      req.session.flash = { type: 'danger', text: error.message } // CHANGE USERNAME ERROR MSG?
      res.redirect('./register') // where to redirect
    }
  }

  /**
   * Returns a HTML form to login.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async login (req, res) {
    const viewData = {
      value: undefined
    }
    res.render('snippets/login', { viewData })
  }

  /**
   * Login user and regenerate a session cookie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async loginUser (req, res) {
    try {
      await User.authenticate(req.body.username, req.body.password)
      req.session.regenerate(() => {
        // ..  regenerate a session cookie, store user data in session store and redirect,
      })
      req.session.flash = { type: 'success', text: 'Login successful.' }
      res.redirect('/') // where to redirect
    } catch (error) {
      // If auth fails redirect to the login page and show an error message or show status code 401.
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./login') // where to redirect
    }
  }

  /**
   * Authorize user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  /*
    async authurize (req, res) {
      if(  auhuraztion code here, vad behöver undersökas för att användaren ska kunan få tillgång till resurs? Inloggad, vem äger snippet osv Titta i databasen. Beroende på vilken resurs som efterfrågas kan det vara olika typer av authorizering.) {
     const error = new Error('Forbidden')
     error.statusCode = 403
     return next(error)
    }
    next()
  }
  */
}
