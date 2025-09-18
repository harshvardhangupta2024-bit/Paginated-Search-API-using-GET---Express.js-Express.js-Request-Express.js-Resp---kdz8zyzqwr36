const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
// Already loaded the database (It's now a direct array)
const allArticles = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
app.get('/search', (req, res) => {
 // TODO: Implement the search and pagination logic here
  let {name, limit , page } = req.query;
  if(!limit){
    limit = 5;
  }

  
  if(!page){
    page = 1;
  }
  console.log(name)
  page = Number(page);
  limit = Number(limit);
  if(!name){
    res.status(400).json({ "error": "Search name parameter is required." })
  }
  data = allArticles.filter((elem) => elem.title.toLowerCase().includes(name.toLowerCase()));
  let totalresult = data.length;
  let totalpage = Math.ceil(totalresult / limit);
  let pageddata = []
  start = (page-1)*limit;
  end = start+limit;
  while(start < totalresult && start < end){
    pageddata.push(data[start]);
    start++;
  }
  let ress = {
          currentPage: page,
          totalPages: totalpage,
          totalResults: totalresult,
          articles: pageddata
        }
  res.status(200).json(ress);
  // totalpages = Math.ceil(data.length / limit);
});
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  module.exports = {app}
