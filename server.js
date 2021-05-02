const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const fetch = require('node-fetch');
app = express()

app.use(bodyparser.json())
app.use(cors())


app.get("/", (req,res) => {
  res.send("app is working")
})

app.post("/data", async (req,res) => {
  let params = {
    api_key: "gBVxdic66dh8BJmcU9hZKBanpfqCdBeIoJm3x6Xi",
    dataType: ["Survey (FNDDS)"],
    pagesize: 1,
    query: req.body.search
  }
  let api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}&query=${encodeURIComponent(params.query)}`
  var data = await fetch(api_url)
  var data2 = await data.json()
  res.json([data2.foods[0].fdcId, data2.foods[0].description, data2.foods[0].foodNutrients])
  // .foods[0].fdcId, data2.foods[0].description, data2.foods[0].foodNutrients
})
app.post("/data", async (req,res) => {
  let params = {
    api_key: "gBVxdic66dh8BJmcU9hZKBanpfqCdBeIoJm3x6Xi",
    dataType: ["Survey (FNDDS)"],
    pagesize: 1,
    query: req.body.search
  }
  let api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}&query=${encodeURIComponent(params.query)}`
  var data = await fetch(api_url)
  var data2 = await data.json()
  res.json([data2.foods[0].fdcId, data2.foods[0].description, data2.foods[0].foodNutrients])
})


app.post("/list", async (req,res) => {
  let params = {
    api_key: "gBVxdic66dh8BJmcU9hZKBanpfqCdBeIoJm3x6Xi",
    dataType: ["Survey (FNDDS)"],
    pagesize: 500,
    query: req.body.search
  }
  let api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}&query=${encodeURIComponent(params.query)}`
  // &pageSize=${encodeURIComponent(params.pagesize)}
  var data = await fetch(api_url)

  var data2 = await data.json()
  list = []
  for(let i=0;i<data2.foods.length;i++){
    list.push([data2.foods[i].fdcId,data2.foods[i].description, data2.foods[i].foodNutrients])
  }
  res.json(list)
})

app.listen(process.env.PORT, () => {
  console.log("app is running on port 3001")
})
