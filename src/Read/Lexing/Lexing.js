const axios = require('axios')
const http = require('http')
const child_process = require('child_process')
const fs = require('fs');


// axios.get('http://localhost:8000/')


async function countImport(dataformated) {

    let countImportFile = 0

    let posImport = []

    for (let index = 0; index < dataformated.length; index++) {
        const element = dataformated[index];


        // console.log(element)

        if (element === 'import') {
            countImportFile += 1
            posImport.push(index)
        }


    }

    let objResul = {
        count: countImportFile,
        posImport: posImport
    }


    //    ;; console.log(objResul)


    return objResul

}


async function ReadlocationStyle(dataformated, posImportObj) {

    let path = dataformated.path

    let posImport = posImportObj.posImport

    let countImport = posImportObj.count

    let fileMain = dataformated.mainFile

    let dataInArray = dataformated.data.split(/[\s,]+/)


    let pathStyle = ''

    if (countImport >= 1) {
        // ;console.log(countImport)

        for (let index = 0; index < countImport; index++) {
            const element = posImport[index] + 1;

            let saveNameImport = dataInArray[element].replace("'", '')
            let saveNameImportFormated = saveNameImport.replace("'", '')
            console.log(fileMain)

            let formatedPathForStyle = path.replace(fileMain, saveNameImportFormated)

            pathStyle = formatedPathForStyle


            // console.log(pathStyle)
        }
    }

    fs.readFile(pathStyle, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // console.log(data)

    })
}

async function separateTokens(dataformated) {

    console.log(dataformated)


}

async function SendParsing() {

}

process.on('message', async(dataWorked) => {


    let dataformated = dataWorked.data.split(/[\s,]+/)


    // console.log(dataWorked.path)



    let importCount = await countImport(dataformated)

    // console.log(importCount.count)

    if (importCount.count > 0) {
        console.log('kas')

        await ReadlocationStyle(dataWorked, importCount)
        await separateTokens(dataformated)
    } else {
        console.log('sem import')
    }
    // ReadlocationStyle(dataWorked)
})