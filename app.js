const {testdata,wmenberinfo,delAllInfo,upTimeFromNum} = require('./dbhandle.js')

console.log(testdata())
let infos = ['HW179020','bilibili','139000000']
!!(async function(){
    // wmenberinfo(infos)
    // delAllInfo()
    upTimeFromNum(new Date,'HW179020','139000000')
    
    let a = await testdata()
    console.log('数据',a)
})()
console.log('app2 finish')



setInterval(()=>{
    console.log('拖延时间')
},100000000)