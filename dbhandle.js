const fs = require('fs')
const db = require('sqlite');

async function initDb(){
     let exists = fs.existsSync('./task.sqlite')
     if(!exists){
         console.log('create db')
         db.open('./task.sqlite')
         .then(()=>{
            db.run('create table task(taskid,date,startTime,endTime)')
            db.run('create table infos(taskid,name,phone,inTime,outTime)')
            console.log('create finish')
         })
     }else{
         console.log('exists task')
     }
 }
 initDb();

 
 module.exports = {
    name:'lalala'
};
(async function(){
    async function pushinfo(db,infos){
         db.run('insert into infos(taskid,name,phoneNum) values(?,?,?)',infos)
         .then(()=>{
             console.log('succes write')
         })
     }
   let task = await db.open('task.sqlite')
   let data = await task.all('select * from sqlite_master')

    //测试数据
    let infos = ['HW170930','LALALA','232323232']
    async function testdata(db){
       let a = await db.all('select * from infos')
       console.log('data',a)
    }
    // pushinfo(task,infos)
    // testdata(task)
   console.log(data)
   console.log('finish')


})


let sqltest = 'select * from infos'

let wsqlMenberInfo = 'insert into infos(taskid,name,phoneNum) values(?,?,?)'

let dsqlAll = 'delete from infos'

let upInFromNum = 'update infos set inTime=? where taskid = ? and phoneNum = ?'
let upOutFromNum = 'update infos set outTime=? where taskid = ? and phoneNum = ?'

async function testdata(){
    let a = await db.open('./task.sqlite')
    let b = a.all('select * from infos')
    return b
}
async function wmenberinfo(infos){ // 仅填入id,name,phoneNum|报名用接口
    let a = await db.open('./task.sqlite')
    a.run(wsqlMenberInfo,infos).then(()=>{
        console.log('success insert')
    })
}
async function delAllInfo(){ // 删除信息表中所有数据
    let a = await db.open('./task.sqlite')
    a.run(dsqlAll).then(()=>{
        console.log('deleteed all infos')
    })
}
async function upTimeFromNum(time,taskid,phoneNum){  //更新指定任务的指定电话的时间信息
    let a = await db.open('./task.sqlite')
    let flag = await a.get('select phoneNum,inTime from infos where taskid = ? and phoneNum = ?',taskid,phoneNum)
    if(flag.inTime){ //如果没有Intime 则填入intime
        a.run(upOutFromNum,time,taskid,phoneNum)
        .then((a,b)=>{
            console.log('updateOuttime'+'-'+taskid+'-'+phoneNum)
        })
    }else{
        a.run(upInFromNum,time,taskid,phoneNum)
        .then((a)=>{
            console.log('updateIntime'+'-'+taskid+'-'+phoneNum)
        })
    }
}

// 报名 录入名字 电话和任务id. 
// 签到  更新数据。如果
module.exports = {
    _db:db,
    testdata:testdata,
    wmenberinfo:wmenberinfo,
    delAllInfo:delAllInfo,
    upTimeFromNum:upTimeFromNum,
}