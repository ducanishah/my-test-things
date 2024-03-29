import { addableActorsList } from "../index.js";
import { WorldMap } from "../worldMap.js";

//VERY IMPORTANT: if any rows are longer than any row above them, it will mess up


export function checkFileReaderSupported() {
    if (window.File && window.FileReader && window.FileList) {
        //Yay it's supported!
        return true;
    } else {
        return false;
    }
}
//this function returns a promise that resolves as the map constructed from the file
export function handleFileInput(e) {
    return new Promise(resolve => {
        let output;
        let fileReader = new FileReader();
        let inputFile = e.target.files[0];
        if (!inputFile) {
            console.log("There's no file here!")
        }
        //set what happens when fileReader finishes reading
        fileReader.onload = function (event) {
            output = fileOutputToMap(event.target.result);
            resolve(output);
        }
        //set the fileReader to reading
        fileReader.readAsText(inputFile);
        
    })

}

function fileOutputToMap(fileOutput) {
    let map = [];
    let rows = fileOutput.split(/\r?\n/);
    for (let i = 0; i < rows.length; i++) {
        rows[i] = rows[i].split(",")
    }

    for (let i = 0; i < rows.length; i++) {

        for (let j = 0; j < rows[i].length; j++) {
            if (i === 0) {
                map.push(new Array());
            }
            let content = rows[i][j] || "";
            map[j].push(content);
        }
    }
    map=createWorldMapFromInputMap(map);
    return map;
}


function createWorldMapFromInputMap(map){
    let worldMap=new WorldMap(map.length);
    for(let i=0; i<map.length;i++){
        for(let j=0; j<map[i].length;j++){
            if(map[i][j]){
                let myObject=addableActorsList[map[i][j]];
                if(!myObject){
                    alert("There is text in this map that is not a valid object!: "+map[i][j])
                }
                new myObject(worldMap,i,j);
            }
            
        }
    }
    return worldMap;
}