const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');
const Product = require('../models/Product');
const router = express.Router();

// Validation middleware
const validateCategory = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be max 500 characters'),
  body('parentId').optional().isMongoId().withMessage('Invalid parent category ID'),
];

// GET /api/categories - Get all categories with tree structure
router.get('/', async (req, res) => {
  try {
    const { flat } = req.query;

    if (flat === 'true') {
      // Return flat list of categories
      const categories = await Category.find({ isActive: true })
        .populate('productCount')
        .sort({ sortOrder: 1, name: 1 })
        .lean();

      res.json(categories);
    } else {
      // Return hierarchical tree structure
      const categoryTree = await Category.getCategoryTree();
      res.json(categoryTree);
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/categories/:slug - Get single category by slug
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    })
    .populate('children')
    .populate('productCount')
    .lean();

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Get products in this category
    const products = await Product.find({ 
      category: category._id, 
      isActive: true 
    })
    .select('name slug price images rating reviewCount')
    .limit(12)
    .lean();

    res.json({
      ...category,
      products
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/categories/:slug/products - Get products in category with pagination
router.get('/:slug/products', async (req, res) => {
  try {
    const { page = 1, limit = 20, sortBy = 'name' } = req.query;

    const category = await Category.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Get all child category IDs if this category has children
    const childCategories = await Category.find({ 
      parentId: category._id, 
      isActive: true 
    }).select('_id');

    const categoryIds = [category._id, ...childCategories.map(cat => cat._id)];

    let sortOption = {};
    switch (sortBy) {
      case 'price-low':
        sortOption = { price: 1 };
        break;
      case 'price-high':
        sortOption = { price: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { name: 1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find({ 
      category: { $in: categoryIds }, 
      isActive: true 
    })
    .populate('category', 'name slug')
    .sort(sortOption)
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

    const total = await Product.countDocuments({ 
      category: { $in: categoryIds }, 
      isActive: true 
    });

    res.json({
      products,
      category,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching category products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/categories - Create new category (admin only)
router.post('/', validateCategory, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if parent category exists (if parentId provided)
    if (req.body.parentId) {
      const parentCategory = await Category.findById(req.body.parentId);
      if (!parentCategory) {
        return res.status(400).json({ message: 'Parent category not found' });
      }
    }

    const category = new Category(req.body);
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Category slug already exists' 
      });
    }
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/categories/:id - Update category (admin only)
router.put('/:id', validateCategory, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Prevent setting parent to self or creating circular reference
    if (req.body.parentId === req.params.id) {
      return res.status(400).json({ 
        message: 'Category cannot be its own parent' 
      });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/categories/:id - Delete category (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if category has products
    const productCount = await Product.countDocuments({ 
      category: req.params.id, 
      isActive: true 
    });

    if (productCount > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete category with products. Move products first.' 
      });
    }

    // Check if category has child categories
    const childCount = await Category.countDocuments({ 
      parentId: req.params.id, 
      isActive: true 
    });

    if (childCount > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete category with subcategories. Delete subcategories first.' 
      });
    }

    // Soft delete
    await Category.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;