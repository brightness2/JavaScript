async function asyncFun(){
    const rs1 = await new Promise(res=>{
        setTimeout(()=>{
            let data = 'ddfdd';
            res(data);
        })
    })

    console.log(rs1);
}

asyncFun()