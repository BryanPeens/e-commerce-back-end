// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category);

// Categories have many Products
Category.hasMany(Product);

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id', // Use 'product_id' as foreign key
  otherKey: 'tag_id' // Specify the other key for the relationship
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id', // Use 'tag_id' as foreign key
  otherKey: 'product_id' // Specify the other key for the relationship
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
