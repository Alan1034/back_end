var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

const resData = {
  "errCode": 0,
  "errMsg": "success",
  "errName": "",
  "success": true,
}
/* GET users listing. */
router.get('/data', function (req, routerRes, next) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) {
      throw err
    }
    const dbase = db.db("code_race")
    dbase.collection('personnel').find({}).toArray((err, res) => {//返回集合中所有数据
      if (err) {
        throw err
      }
      // console.log(res)
      routerRes.send(JSON.stringify({
        ...resData,
        data: res
      }));
      db.close()
    })
  })
 
});
router.get('/data/population', async function (req, routerRes, next) {
  routerRes.header('Access-Control-Allow-Origin', '*');
  let conn = null;
  try {
    conn = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const dbase = conn.db("code_race").collection('personnel')
    var res = await dbase.find({}).toArray();
    const getdata = (key) => {
      const someObj={}
      res.forEach(item => {
        const thisKey = item[key]
        if (someObj[`${thisKey}`]) {
          someObj[`${thisKey}`] = someObj[`${thisKey}`] + 1
        } else {
          someObj[`${thisKey}`] = 1
        }
      })
      return someObj
    }
    const payRank={}
    res.forEach(item=>{
      const { payRankType, payRankLevel } = item
      if (payRank[`${payRankType}${payRankLevel}`]) {
        payRank[`${payRankType}${payRankLevel}`] = payRank[`${payRankType}${payRankLevel}`]+1
      }else{
        payRank[`${payRankType}${payRankLevel}`]=1
      }
    })
    routerRes.send(JSON.stringify({
      ...resData,
      data: {
        population: res.length,
        male: res.filter(item => (item.gender==="M")).length,
        female: res.filter(item => (item.gender==="F")).length,
        payRank,
        employ: getdata("employType"),
        age: getdata("age"),
        divisionAge: getdata("divisionAge"),
      }
    }));
  } catch (error) {
    console.log("错误：" + error.message);
  } finally {
    if (conn != null) conn.close();
  }
});

router.get('/data/site', async function (req, routerRes, next) {
  routerRes.header('Access-Control-Allow-Origin', '*');
  let conn = null;
  try {
    conn = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const dbase = conn.db("code_race").collection('personnel')
    var res = await dbase.find({}).toArray();
    routerRes.send(JSON.stringify({
      ...resData,
      data: res.map(item=>{
        const { staffName, accountSite, siteLng, siteLat } = item 
      return{
        staffName,
        accountSite,
        siteLng,
        siteLat,
      }})
    }));
  } catch (error) {
    console.log("错误：" + error.message);
  } finally {
    if (conn != null) conn.close();
  }
});

module.exports = router;
