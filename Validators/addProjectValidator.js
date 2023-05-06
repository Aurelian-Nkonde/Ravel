const { z } = require("zod")

function ValidateAddProject(req, res, next) {
    const schema = z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        launch: z.string({
            required_error: "Launch is required"
        }),
        collaborators: z.string({
            required_error: "collaborators is required",
        }),
        genre: z.string({
            required_error: "genre is required"
        })
    })

    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400)
            .send(error);
    }

}

module.exports = ValidateAddProject;