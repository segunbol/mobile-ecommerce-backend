import express from 'express';
import Product from '../models/product.js'
import Category from '../models/category.js';
import mongoose from 'mongoose';
import multer from 'multer'

const productsRoutes = express.Router();

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'publicfiles/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }, 
});

const uploadOptions = multer({ storage: storage });

// productsRoutes.get(`/`, async (req, res) =>{
//     localhost:3000/api/v1/products?categories=2342342,234234
//     let filter = {};
//     if(req.query.categories)
//     {
//          filter = {category: req.query.categories.split(',')}
//     }

//     const productList = await Product.find(filter).populate('category');

//     if(!productList) {
//         res.status(500).json({success: false})
//     } 
//     res.send(productList);
// })


productsRoutes.get(`/`, async (req, res) =>{
    const productList = await Product.find();

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

productsRoutes.get(`/:id`, async (req, res) =>{
    const product = await Product.findById(req.params.id);

    if(!product) {
        res.status(500).json({success: false})
    } 
    res.send(product); 
})


productsRoutes.post(`/`,uploadOptions.single('image'), async (req, res) =>{
    // const category = await Category.findById(req.body.category);
    // if(!category) return res.status(400).send('Invalid Category')

    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');
    const fileName = file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    const newProduct = new Product(
        {  
            name: req.body.name,
            slug: req.body.slug,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232",
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        }
    ) 
    const product = await newProduct.save()
    if(!product) {
        return res.status(500).send('The product cannot be created')
    }
    
    res.send(product);
})

// productsRoutes.put('/:id', uploadOptions.single('image'), async (req, res) => {
//     if (!mongoose.isValidObjectId(req.params.id)) {
//         return res.status(400).send('Invalid Product Id');
//     }
//     // const category = await Category.findById(req.body.category);
//     // if (!category) return res.status(400).send('Invalid Category');

//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(400).send('Invalid Product!');

//     const file = req.file;
//     let imagepath;

//     if (file) {
//         const fileName = file.filename;
//         const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
//         imagepath = `${basePath}${fileName}`;
//     } else {
//         imagepath = product.image;
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//             name: req.body.name,
//             description: req.body.description,
//             richDescription: req.body.richDescription,
//             image: imagepath,
//             brand: req.body.brand,
//             price: req.body.price,
//             category: req.body.category,
//             countInStock: req.body.countInStock,
//             rating: req.body.rating,
//             numReviews: req.body.numReviews,
//             isFeatured: req.body.isFeatured,
//         },
//         { new: true }
//     );

//     if (!updatedProduct)
//         return res.status(500).send('the product cannot be updated!');

//     res.send(updatedProduct);
// });


productsRoutes.put('/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }
    // const category = await Category.findById(req.body.category);
    // if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true}
    )

    if(!product)
    return res.status(500).send('the product cannot be updated!')

    res.send(product);
})

productsRoutes.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

productsRoutes.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})

productsRoutes.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})

productsRoutes.put(
    '/gallery-images/:id',
    uploadOptions.array('images', 10),
    async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id');
        }
        const files = req.files;
        let imagesPaths = [];
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        if (files) {
            files.map((file) => {
                imagesPaths.push(`${basePath}${file.filename}`);
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths,
            },
            { new: true }
        );

        if (!product)
            return res.status(500).send('the gallery cannot be updated!');

        res.send(product);
    }
);


export default productsRoutes