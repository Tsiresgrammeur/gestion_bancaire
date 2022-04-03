const express = require('express');
const router =require('./src/routes');
const cors=require('cors')
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json())
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
