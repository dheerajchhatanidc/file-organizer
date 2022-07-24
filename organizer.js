#!/usr/bin/env node

let a=process.argv.slice(2);
let cmd=a[0];
let path=require("path");
let fs=require("fs");

let types ={
    media:["mp4"],
    archives:["zip","rar"],
    documents:["docx","ppt","pdf","word","txt"],
    app:["exe","dmg","pkg"],
    photo:["JPEG","png","JPG"]
    
    };
switch(cmd){

case "tree":
    treefn(a[1]);
    break;

case "organize":
    let dir=a[1];
    organize(dir);
    break;

case "help":
    help1();
    break;
    default:console.log("🙏 Input right command");


}

function treefn(dir){
    if(dir==undefined){
      treefnH(process.cwd(),"");
        return
    }
if(fs.existsSync(dir)==false){
    console.log("Enter a valid path");
    return;
}
else{
    treefnH(dir,"");
}

}
function organize(dir){
    let OPath;
    if(dir==undefined){
       OPath=process.cwd();
        return;
    }
    if(fs.existsSync(dir)==false){
        console.log("Please enter valid Path");
        return;
    }

 OPath=path.join(dir,"organized_files");
     if(fs.existsSync(OPath)==false){
     
     fs.mkdirSync(OPath);
     }
    
     let content=fs.readdirSync(dir);
     for(let i=0;i<content.length;i++){
         let childAdd=path.join(dir,content[i]);
         if(fs.lstatSync(childAdd).isFile()){
           
         let type=getType(childAdd);
        addFile(childAdd,type,OPath);




         }
     }








}

function help1(){
console.log(`
The list of commands are:
tree
organize
help

`


);
}
function getType(dir){
let name=path.basename(dir);
let ext=path.extname(name);
ext=ext.slice(1);
for(let type in types ){
    let ta=types[type];
    for(let i=0;i<ta.length;i++){
        if(ext==ta[i]){
            return type;
        }
    }
}
return "others";



}
function addFile(oadd,type,destadd){

let p=path.join(destadd,type);
if(fs.existsSync(p)==false){
fs.mkdirSync(p);
}
let bn=path.basename(oadd);
let pc=path.join(p,bn);
fs.copyFileSync(oadd,pc);

}

function treefnH(dir,psf){
   
    let isFile=fs.lstatSync(dir).isFile();
if(isFile==true){
    let fn=path.basename(dir);
console.log(psf+" * "+fn);

}
else{

    let fn=path.basename(dir);
console.log(psf+" -> "+fn);
let x=fs.readdirSync(dir);
for(let i=0;i<x.length;i++){
    let cp=path.join(dir,x[i]);
treefnH(cp,psf+"\t");
}


}

}



