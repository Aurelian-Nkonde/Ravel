const musicModel = require("../Models/music.Model")
const projectModel = require("../Models/project.Model");


exports.tracks = async function (req, res, next) {
    try {
        const allTracks = await musicModel.findAll();
        res.status(200).json(allTracks);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.track = async function (req, res, next) {
    try {
        const id = req.params.id;
        const track = await musicModel.findByPk(id);
        res.status(200).json(track);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.add = async function (req, res, next) {
    if (req.body != null) {
        const newTrack = {
            "title": req.body.title,
            "cover": req.body.cover,
            "artist": req.body.artist,
            "year": req.body.year,
            "producer": req.body.producer,
            "genre": req.body.genre,
        }
        try {
            await musicModel.create(newTrack);
            res.status(201).json(newTrack);
        } catch (error) {
            console.error("cant add the new track")
            next(error);
        }
    } else {
        console.error("Body cant be null")
        next();
    }
}

exports.update = async function (req, res, next) {
    if (req.params.id) {
        try {
            const id = req.params.id;
            const track = await musicModel.findByPk(id)
            try {
                track.title = req.body.title,
                    track.cover = req.body.cover,
                    track.artist = req.body.artist,
                    track.year = req.body.year,
                    track.producer = req.body.producer,
                    track.genre = req.body.genre,
                    track.save();
                res.status(200).json({
                    message: "track is updated",
                    track: track
                })
            } catch (error) {
                console.error("cant update a track");
                next(error);
            }
        } catch (error) {
            console.error("track not found")
            next(error);
        }
    } else {
        console.error("Bad request");
        next();
    }
}

exports.delete = async function (req, res, next) {
    if (req.params.id !== 0) {
        try {
            const id = req.params.id;
            const track = await musicModel.findByPk(id);
            try {
                track.destroy();
                res.status(200).send({
                    message: `Track with id: ${track.id} was deleted`
                })
            } catch (error) {
                console.error("Cant delete the track");
                next(error);
            }
        } catch (error) {
            console.error("Track to delete not found")
            next(error);
        }
    } else {
        console.error("Bad request");
        next();
    }
}

exports.projects = async function (req, res, next) {
    try {
        const projects = await projectModel.findAll();
        res.status(200).json(projects);
    } catch (error) {
        console.error("Cant find projects");
        next(error);
    }
}

exports.project = async function (req, res, next) {
    if (req.params.id !== 0) {
        try {
            const id = req.params.id;
            const project = await projectModel.findByPk(id);
            res.status(200).json(project);
        } catch (error) {
            console.error("project cant be found");
            next(error);
        }
    } else {
        console.error("Bad request");
        next();
    }
}

exports.addProject = async function (req, res, next) {
    if (req.body != null) {
        try {
            const newProject = {
                title: req.body.title,
                launch: req.body.launch,
                collaborators: req.body.collaborators,
                genre: req.body.genre
            };
            await projectModel.create(newProject);
            res.status(200).json({
                message: "project is created",
                newProject: newProject,
            })
        } catch (error) {
            console.error("cant add new project");
            next(error);
        }
    } else {
        console.error("Body cant be null")
        next();
    }
}

exports.updateProject = async function (req, res, next) {
    if (req.params.id != 0) {
        try {
            const id = req.params.id;
            const project = await projectModel.findByPk(id);
            if (project) {

                project.title = req.body.title,
                    project.launch = req.body.launch,
                    project.collaborators = req.body.collaborators,
                    project.genre = req.body.genre;
                project.save();
                res.status(200).json({
                    message: "project is updated",
                    project: project
                })
            } else {
                console.error("project null");
                next();
            }
        } catch (error) {
            console.log("Error updating project");
            next(error);
        }
    } else {
        console.error("Bad Request");
        next();
    }
}

exports.deleteProject = async function (req, res, next) {
    if (req.params.id != 0) {
        try {
            const id = req.params.id;
            const project = await projectModel.findByPk(id);
            if (project) {
                await project.destroy();
                res.status(200).json({
                    message: "project deleted"
                })
            } else {
                console.error("Project to delete not found");
                next();
            }
        } catch (error) {
            console.error("Error deleting project");
            next(error);
        }
    } else {
        console.error("Bad request");
        next();
    }
}
