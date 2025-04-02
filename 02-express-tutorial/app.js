const express = require('express');
const cookieParser = require('cookie-parser');
const { products, people } = require('./data');
const peopleRouter = require('./routes/people');

const app = express();

app.use(express.static('./public'));

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

const auth = (req, res, next) => {
  if (req.cookies.name) {
    req.user = req.cookies.name;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.post('/logon', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Please provide a name' });
  }

  res.cookie('name', name, { httpOnly: true });
  res.status(201).json({ message: `Hello, ${name}` });
});

app.delete('/logoff', (req, res) => {
  res.clearCookie('name');
  res.status(200).json({ message: 'User logged off' });
});

app.get('/test', auth, (req, res) => {
  res.json({ message: `Welcome, ${req.user}` });
});

app.use('/api/v1/people', peopleRouter);

app.get('/api/v1/test', (req, res) => {
  res.json({ message: 'It worked!' });
});

app.get('/api/v1/products', (req, res) => {
  res.json(products);
});

app.get('/api/v1/products/:productID', (req, res) => {
  const idToFind = parseInt(req.params.productID);

  if (isNaN(idToFind)) {
    return res.status(400).json({ message: 'Invalid product ID format' });
  }

  const product = products.find(p => p.id === idToFind);

  if (!product) {
    return res.status(404).json({ message: 'That product was not found' });
  }

  res.json(product);
});

app.get('/api/v1/query', (req, res) => {
  const { search, limit, maxPrice, sort } = req.query;
  let filteredProducts = [...products];

  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  if (maxPrice) {
    const maxPriceNum = parseFloat(maxPrice);
    if (!isNaN(maxPriceNum)) {
      filteredProducts = filteredProducts.filter(
        product => product.price <= maxPriceNum
      );
    }
  }

  if (sort === 'price') {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (limit) {
    const limitNum = parseInt(limit);
    if (!isNaN(limitNum)) {
      filteredProducts = filteredProducts.slice(0, limitNum);
    }
  }

  if (filteredProducts.length === 0) {
    return res.status(200).json({ success: true, data: [] });
  }

  res.status(200).json(filteredProducts);
});

app.all('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
