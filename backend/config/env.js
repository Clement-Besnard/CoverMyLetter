const path = require('path');

// Le .env est unique et vit à la racine du projet, pas dans backend/
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
