const express = require('express');
const router = express.Router();
const User = require('./models/userModel.js');
const Product = require('./models/productModel.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var userData;
router.post('/signup', async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;
        console.log(req.body)
        // Check if the username or email is already in use
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return  res.redirect('/?message=user-exists');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const newUser = new User({
            fullname: fullname,
            username: username,
            email: email,
            password: hashedPassword 
        });
        
        // Save the user to the database
        await newUser.save();

        res.redirect('/?message=signup-success');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Username not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        
        userData = await User.findOne({ username });
        res.redirect('/home'); 

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/home/isadmin',(req,res) => {
    res.json(userData);
});

router.get('/home/product/all', async (req, res) => {
    try {
      // Retrieve all products from the database
      const products = await Product.find({ status: 'active' });
      res.status(200).json(products);

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

router.post('/home/product/add', async (req, res) => {
    try {
        // Retrieve product details from the request body
        const { productName, image, cost, rating} = req.body;

        const newProduct = new Product({
            productName : productName,
            image : image,
            cost : cost,
            rating : rating,
        });

        await newProduct.save();

        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.send({ message: 'Server error' });
    }
});

router.post('/home/product/delete', async (req, res) => {
    try {
        const { productName } = req.body;
        const product = await Product.findOne({ productName:productName, status:"active" });

        if (!product) {
            return res.json({ message: 'Product not found' });
        }

        product.status = 'inactive';
        await product.save();

        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.json({ message: 'Server error' });az
    }
});
module.exports = router;