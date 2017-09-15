// 本地数据库操作
export const db = {
  connect(){ // 是否能连接上,也就是浏览器是否支持数据库
    return new Promise((resolve,reject)=>{
      if(window.indexedDB){
        resolve(true)
      }
      else{
        reject(false)
      }
    })
  },
  open(dbName,version){
    var result = window.indexedDB.open(dbName,version);
    return Promise.resolve(result);
  },
  create(){

  },
  delete(dbName){

  }
}
