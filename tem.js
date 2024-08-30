// [1] Get Data From Server
// [1] Fetch Data From DataBase
let canTestMe = new XMLHttpRequest();
let questionWaiter = {}
let quesetiones = []
canTestMe.onreadystatechange = function getData() {
    return new Promise((res ,rej)=>{
        if(canTestMe.readyState === 4 && this.status === 200){
            res(JSON.parse(this.responseText))
        }else{
            rej(Error('You Dont connect'))
        }
    })
}
canTestMe.open("get","http://myjson.dit.upm.es/api/bins/30cw")
canTestMe.send()
console.log(getData())
//  [2] Handle data Which come From Server
async function handler(questionServer){
    await questionServer;
    for(let i of Object.values(questionServer))
        quesetiones.push(i)
}