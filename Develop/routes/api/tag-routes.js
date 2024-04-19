const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {  
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!oneTag) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(201).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Tag not found.' });
    }
    res.status(200).json({ message: 'Tag updated successfully.' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete one tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted successfully.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
