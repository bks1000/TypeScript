"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
//import * as test from 'assert'
var client = mongodb.MongoClient;
var url = 'mongodb://172.18.140.39:27017/test';
//查询全部
/*client.connect(url,function(err,db){
    var t = db.collection('restaurants');
    t.find({}).toArray(function(err,items){
        console.log("items length:%d",items.length);//总行数
        console.log(items[0].name);
        console.log(items[0]);
        db.close();
    });
});*/
//按条件查询
/*client.connect(url,function(err,db){
    var t = db.collection('restaurants');
    //查询address.zipcode为10462 并且 grades.score大于30的
    t.find({ "address.zipcode": "10462","grades.score": { $gt: 30 }}).toArray(function(err,items){
        console.log("items length:%d",items.length);//符合条件的行数
        console.log(items[0]);
        db.close();
    });
});*/
/*client.connect(url,function(err,db){
    var t = db.collection('restaurants');
    //查询address.zipcode为10462 或者 grades.score大于50的
    t.find({$or:[{ "address.zipcode": "10462"},{"grades.score": { $gt: 30 }}]}).toArray(function(err,items){
        console.log("items length:%d",items.length);//符合条件的行数
        console.log(items[0]);
        db.close();
    });
});*/
//排序
/*client.connect(url,function(err,db){
    var t = db.collection('restaurants');
    //查询 grades.score大于40的
    //sort 1 升序，-1降序
    t.find({"grades.score": { $gt: 30 }}).sort({"grades.score":-1}).toArray(function(err,items){
        console.log("items length:%d",items.length);//符合条件的行数
        console.log(items[0]);
        db.close();
    });
});*/
//insert
/*client.connect(url,function(err,db){
    var t = db.collection('restaurants');
    t.insertOne({"address": {"building": "921", "coord": [-73.9691347, 40.6389857], "street": "hebei sjz", "zipcode": "050000"}, "borough": "Brooklyn", "cuisine": "Other", "grades": [], "name": "JUNE", "restaurant_id": "50018888"},function(err,r){
        console.log(r.insertedCount);
        db.close();
    });

});*/
function DBHelper() {
}
DBHelper.prototype.Save = function (data) {
    client.connect(url, function (err, db) {
        var t = db.collection('user');
        t.save(data, function (err, r) {
            db.close();
        });
    });
};
var helper = new DBHelper();
helper.Save({ username: "june", country: "China" });
//update
//http://mongodb.github.io/node-mongodb-native/2.2/api/ 
