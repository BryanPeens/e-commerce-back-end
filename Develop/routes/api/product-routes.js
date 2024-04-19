const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: [
        { model: Category, attributes: ['id', 'category_name'] }, // Include Category
        { model: Tag, attributes: ['id', 'tag_name'] } // Include Tag
      ],
      attributes: { exclude: ['category_id'] } // Exclude category_id from Product attributes
    });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const oneProduct = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['id', 'category_name'] }, // Include Category
        { model: Tag, attributes: ['id', 'tag_name'] } // Include Tag
      ],
    });
    if (!oneProduct) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    res.status(200).json(oneProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, {
      where: { id: req.params.id },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    const updatedProduct = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'] }
      ],
    });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete product
router.delete('/:id', async (req, res) => {
  try {
    const deleteProduct = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!deleteProduct) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
