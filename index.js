const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Already loaded the database (It's now a direct array)
const allArticles = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

app.get('/search', (req, res) => {
  let {name,limit,page} = req.query;
  if(name==undefined || name.trim().length===0){
    return res.status(400).json({ "error": "Search name parameter is required." })
  }
  if (limit==undefined){
    limit = 5
  }
  if (page==undefined){
    page=1
  }

  const filtered = allArticles.filter((val)=>{
    return val["title"].toLowerCase().includes(name.toLowerCase());
  })

  res.status(200).json({
  "currentPage": page,
  "totalPages": Math.ceil(filtered.length/limit),
  "totalResults": filtered.length,
  "articles": filtered
})
 


});


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  module.exports = {app}
