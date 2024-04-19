const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one category
router.get('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!oneCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(201).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update category
router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (updatedRows === 0) {
      res.status(404).json({ message: 'Category not found.' });
      return;
    }
    res.status(200).json({ message: 'Category updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// delete category
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
