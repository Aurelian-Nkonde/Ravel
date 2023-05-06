const sequalize =  require("../Db")
const musicModel = require("../Models/music.Model");
const projectModel = require("../Models/project.Model");



exports.tracks = async function(req, res, next){
    try {
        const alltracks = await musicModel.findAll()
        console.log(alltracks)
        res.status(200).json(alltracks);
    }catch(error) {
        console.error('tracks are not found');
        next(error);
    }
    
}

exports.track = async function(req, res, next){
    if(req.params.id !== "0"){
        try{
            const id = req.params.id;
            const tracks = await  musicModel.findByPk(id);
            res.status(200).json(tracks); 
        }catch (error){
            console.error("track is not found")
        }
    }else {
        console.error("Bad Request")
        next();
    }
}

exports.projects = async function(req, res, next){
    try {
        const allProjects = await projectModel.findAll();
        res.status(200).json(allProjects);
    } catch(error){
        console.error('Projects not found')
        next(error);
    }
}

exports.project = async function(req, res, next){
    if(req.params.id !== 0){
        try {
            const singleProject = await projectModel.findByPk(req.params.id);
            res.status(200).json(singleProject);
        }catch(error) {
            console.error('error ', eror)
            next(error)
        }
    }else {
        console.error("Bad request")
        throw new Error('Bad Request')
    }
}

exports.contact = async function(req, res, next){
    res.send("contact")
}

exports.search = async function(req, res, next){
    res.send("search page");
}