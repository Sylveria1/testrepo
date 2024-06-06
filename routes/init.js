const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const Role = require('../models/Role');
const Membership = require('../models/Membership');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Product = require('../models/Product');
const axios = require('axios');

router.post('/', async (req, res) => {
    try {
        const usersCount = await User.count();
        if (usersCount > 0) {
            return res.status(400).json({ message: 'Initialization has already been done' });
        }

        // Populate roles table
        await Role.bulkCreate([
            { id: 1, name: 'Admin' },
            { id: 2, name: 'User' }
        ]);

        // Create initial Admin user
        const hashedPassword = await bcrypt.hash('P@ssword2023', 10);
        await User.create({
            username: 'admin',
            password: hashedPassword,
            email: 'admin@noroff.no',
            firstname: 'Admin',
            lastname: 'Support',
            address: 'Online',
            telephonenumber: '911',
            role_id: 1, // Link to Admin role
            membership_status: 'Bronze',
            created_at: new Date(),
            updated_at: new Date()
        });

        // Populate membership table
        await Membership.bulkCreate([
            { name: 'Bronze', discount: 0 },
            { name: 'Silver', discount: 15, min_purchases: 15, max_purchases: 30 },
            { name: 'Gold', discount: 30, min_purchases: 30 }
        ]);

        // Populate categories and brands
        await Category.bulkCreate([
            { name: 'Category 1' },
            { name: 'Category 2' }
        ]);

        await Brand.bulkCreate([
            { name: 'Brand 1' },
            { name: 'Brand 2' }
        ]);

        // Fetch initial data from Noroff API and populate the products table
        const response = await axios.get('http://backend.restapi.co.za/items/products');
        const products = response.data;

        if (Array.isArray(products)) {
            for (const product of products) {
                await Product.create({
                    name: product.name,
                    description: product.description,
                    unitprice: product.unitprice,
                    discount: product.discount,
                    date_added: product.date_added,
                    imgurl: product.imgurl,
                    quantity: product.quantity,
                    isdeleted: product.isdeleted,
                    brandId: product.brandId,
                    categoryId: product.categoryId
                });
            }
        } else {
            console.error('Expected products to be an array');
        }

        res.status(200).json({ message: 'Initialization completed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
