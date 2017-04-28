//官方文档 CRUD：
//http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
import * as mongodb from 'mongodb';
import * as assert from 'assert'; //如果找不到模块需要安装一下 F:\HW\typescript\mongodb>npm install assert --save

var client = mongodb.MongoClient;
var url = 'mongodb://172.18.140.39:27017/test'

function MongoDBHelper(){

}

//保存 coll：集合名；data:文档;callback保存之后的回调
//当传入的data包含_id的时候，才可能会更新(存在_id)
MongoDBHelper.prototype.Save = function(coll,data,callback){
    client.connect(url,function(err,db){
        var t = db.collection(coll);
        t.save(data,function(err,r){
            db.close();
            callback(err,r);
        });
    });
}

//插入单个文档
MongoDBHelper.prototype.InsertOne = function(coll,data,callback){
    client.connect(url,function(err,db){
        var t = db.collection(coll);
        t.insertOne(data,function(err,r){
            assert.equal(null,err);

            db.close();
            callback(err,r);
        });
    });
}

//插入多个文档
MongoDBHelper.prototype.InsertMany = function(coll,data,callback){
    client.connect(url,function(err,db){
        var t = db.collection(coll);
        t.insertMany(data,function(err,r){
            assert.equal(null,err);
            
            db.close();
            callback(err,r);
        });
    });
}

//更新单个文档
MongoDBHelper.prototype.UpdateOne = function(coll,condition,data,callback){
    client.connect(url,function(err,db){
        var t = db.collection(coll);
        t.updateOne(condition,data,function(err,r){
            assert.equal(null,err);

            db.close();
            callback(err,r);
        });
    });
}

//更新多个文档
MongoDBHelper.prototype.UpdateMany = function(coll,condition,data,callback){
    client.connect(url,function(err,db){
        var t = db.collection(coll);
        t.updateMany(condition,data,function(err,r){
            assert.equal(null,err);
            
            db.close();
            callback(err,r);
        });
    });
}

//删除单个
MongoDBHelper.prototype.DeleteOne = function(coll,data,callback){
    client.connect(url,function(err,db){
        var t = db.collection(coll);
        t.deleteOne(data,function(err,r){
            db.close();
            callback(err,r);
        });
    });
}

//删除多个，如果data文档为{}，则删除全部
MongoDBHelper.prototype.DeleteMany = function(coll,data,callback){
    client.connect(url,function(err,db){
        var t = db.collection(coll);
        t.deleteMany(data,function(err,r){
            db.close();
            callback(err,r);
        });
    });
}

/**
 * 查找并更改
 * findOneAndUpdate，findOneAndDelete和findOneAndReplace的三个方法是允许用户更新或提升文档并返回修改或现有文档的特殊命令。 当使用这些方法时，操作会在操作期间采取写入锁定，以确保修改是原子的。
 */

/**
 * returnOriginal	(Boolean, default:true)	Set to false if you want to return the modified object rather than the original. Ignored for remove.
 * 首先查找与第一个参数匹配的记录，在用第二个参数更新之，如果找不到与第一个参数匹配的的记录，就插入一条（upsert 的名字也很有趣是个混合体：update+insert）
 */
MongoDBHelper.prototype.FindOneAndUpdate = function(coll,condition,data,callback){
    client.connect(url,function(err,db){
        var t = db.collection(coll);
        t.findOneAndUpdate(condition,data, {
            returnOriginal: false
            , upsert: true
            },function(err,r){
                db.close();
                callback(err,r);
        });
    });
}

MongoDBHelper.prototype.FindOneAndDelete = function(coll,data,callback){
    client.connect(url,function(err,db){
        var t = db.collection(coll);
        t.findOneAndDelete(data,function(err,r){
            assert.equal(null, err);
            db.close();
            callback(err,r);
        });
    });
}


/**
 * 查找
 */
MongoDBHelper.prototype.Find = function(coll,data,callback){
    client.connect(url,function(err,db){
        var t = db.collection(coll);
        t.find(data).toArray(function(err,docs){
            assert.equal(null, err);
            db.close();
            callback(err,docs);
        });
    });
}



//测试
var dbHelper = new MongoDBHelper();
/*dbHelper.InsertOne('user',{username:"june",country:"Amarican"},function(err,r){
    console.log(r.insertedCount);
});*/

/*dbHelper.UpdateMany('user',{username:'june'},{$set:{age:18}},function(err,r){
    console.log(r.modifiedCount);
});*/

/*dbHelper.DeleteMany('user',{country:"Amarican"},function(err,r){
    console.log(r.deletedCount);
});*/

dbHelper.Find('user',{},function(err,docs){
    console.log(docs.length);
    for(let i=0;i<docs.length;i++){
        console.log(docs[i]);
    }
});