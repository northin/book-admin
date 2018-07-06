const fs = require("fs")
const  areaData = require("china-area-data")

const data = []
for (const key in areaData[86]) {
    if (areaData[86].hasOwnProperty(key)) {
        const element = areaData[86][key];
        let currentP = areaData[key]
        let childrenP = []
        for (const keys in currentP) {
            if (currentP.hasOwnProperty(keys)) {
                const elementP = currentP[keys];
                let currentS = areaData[keys]
                let childrenS = []
                for (const keyD in currentS) {
                    if (currentS.hasOwnProperty(keyD)) {
                        const elementS = currentS[keyD];
                        childrenS.push({value:keyD,label:elementS})
                    }
                }
                childrenP.push({value:keys,label:elementP,children:childrenS})
            }
        }
        data.push({value:key,label:element,children:childrenP})
    }
}
// console.log(data)
fs.open('data.js', 'w+', (err, fd) => {
    if(err){
        if(err.code = 'ENOENT'){
            console.error(" myfile does not exist ")
            return;
        }
    }
    fs.write(fd, "export const areaData = [", 'utf-8', (err, written, string) => {
        if(err) throw err;
        console.log('succ')
    })
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        fs.write(fd, "{\nlabel:'"+data[i].label+"',\nvalue:"+data[i].value+",\nchildren:[", 'utf-8', (err, written, string) => {
            if(err) throw err;
            console.log('succ')
        })
        for (let i = 0; i < element.children.length; i++) {
            const elementS = element.children[i];
            fs.write(fd, "{\n  label:'"+elementS.label+"',\n  value:"+elementS.value+",\n  children:[", 'utf-8', (err, written, string) => {
                if(err) throw err;
                console.log('succ')
            })
            for (let i = 0; i < elementS.children.length; i++) {
                const elementD = elementS.children[i];
                fs.write(fd, "{\n    label:'"+elementD.label+"',\n    value:"+elementD.value+"\n  },", 'utf-8', (err, written, string) => {
                    if(err) throw err;
                    console.log('succ')
                }) 
            }
            fs.write(fd, "]\n},", 'utf-8', (err, written, string) => {
                if(err) throw err;
                console.log('succ')
            })

        }
        fs.write(fd, "]\n},", 'utf-8', (err, written, string) => {
            if(err) throw err;
            console.log('succ')
        })
    }
    fs.write(fd, "]", 'utf-8', (err, written, string) => {
        if(err) throw err;
        console.log('succ')
    })

})