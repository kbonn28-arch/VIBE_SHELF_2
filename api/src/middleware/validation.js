import Joi from 'joi';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message,
        })),
      });
    }
    
    next();
  };
};

export const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    
    if (error) {
      return res.status(400).json({
        error: 'Query validation error',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message,
        })),
      });
    }
    
    next();
  };
};

// Common validation schemas
export const schemas = {
  userBook: Joi.object({
    book_id: Joi.string().uuid().required(),
    status: Joi.string().valid('want_to_read', 'reading', 'read', 'abandoned').required(),
    rating: Joi.number().min(1).max(5).optional(),
    review: Joi.string().max(1000).optional(),
    progress: Joi.number().min(0).max(100).optional(),
  }),
  
  userBookUpdate: Joi.object({
    status: Joi.string().valid('want_to_read', 'reading', 'read', 'abandoned').optional(),
    rating: Joi.number().min(1).max(5).optional(),
    review: Joi.string().max(1000).optional(),
    progress: Joi.number().min(0).max(100).optional(),
  }),
  
  bookQuery: Joi.object({
    search: Joi.string().max(100).optional(),
    genre: Joi.string().max(50).optional(),
    author: Joi.string().max(100).optional(),
    minRating: Joi.number().min(1).max(5).optional(),
    limit: Joi.number().integer().min(1).max(100).default(20),
    offset: Joi.number().integer().min(0).default(0),
  }),
  
  recommendation: Joi.object({
    mood_id: Joi.string().uuid().required(),
  }),
};
