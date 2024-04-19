# Express API for Product, Category, and Tag Management

[![Static Badge](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/license/mit)
  
## Description
This application provides an Express API for managing products, categories, and tags. It allows users to perform CRUD operations on products, categories, and tags through a set of defined endpoints. The API handles requests to create, read, update, and delete products, categories, and tags, providing a flexible and efficient solution for managing inventory and product data.

### Links
* Link to GitHub [repository](https://github.com/BryanPeens/e-commerce-back-end)

## Table of Contents
1. [Installation Instructions](#installation-instructions)
2. [Usage Information](#usage-information)
3. [Endpoints](#endpoints)
4. [Contribution Guidelines](#contribution-guidelines)
5. [Test Instructions](#test-instructions)
6. [Questions](#questions)
7. [License](#license)
  
## Installation Instructions

To install and run the application, follow these steps:

1. Clone or download the project repository from GitHub.
2. Navigate to the project directory using your command line interface.
3. Install dependencies by running the following command:

```bash
    $ npm install
```
To setup the database follow these steps: 

4. Sign into postgres ( psql -U postgres ).
5. \i db/schema.sql
6. node seeds/index.js or npm run seeds

7. Ensure you have Node.js installed on your system.
8. Configure the database connection in the config/connection.js file.
9. Run the following command to start the server:

```bash
    $ npm start
```
## Usage Information
Once the server is running, you can make HTTP requests to the defined endpoints to manage products, categories, and tags. The API supports the following endpoints:

### Endpoints
    * GET /api/categories: Retrieve all categories.
    * GET /api/categories/:id: Retrieve a single category by ID.
    * POST /api/categories: Create a new category.
    * PUT /api/categories/:id: Update an existing category.
    * DELETE /api/categories/:id: Delete a category by ID.
    * GET /api/products: Retrieve all products.
    * GET /api/products/:id: Retrieve a single product by ID.
    * POST /api/products: Create a new product.
    * PUT /api/products/:id: Update an existing product.
    * DELETE /api/products/:id: Delete a product by ID.
    * GET /api/tags: Retrieve all tags.
    * GET /api/tags/:id: Retrieve a single tag by ID.
    * POST /api/tags: Create a new tag.
    * PUT /api/tags/:id: Update an existing tag.
    * DELETE /api/tags/:id: Delete a tag by ID.

Make sure to include appropriate request bodies and parameters as required by each endpoint.

## Contribution Guidelines
If you would like to contribute to the project, please follow these guidelines:

1. Fork the project repository to your GitHub account.
2. Create a new branch for your feature or bug fix.
3. Make your changes in the new branch.
4. Test your changes thoroughly.
5. Commit your changes with clear and descriptive messages.
6. Push your changes to your forked repository.
7. Submit a pull request, explaining the changes you've made.

## Test Instructions
Testing instructions are not yet available for this project.

## Questions
For any questions or concerns regarding the application, feel free to contact the project maintainer:

* Find me on: [GitHub](https://github.com/BryanPeens)
* Email: peensbryan75@gmail.com