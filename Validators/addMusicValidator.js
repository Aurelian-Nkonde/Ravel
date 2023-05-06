const { z } = require("zod");

function ValidateAddMusic(req, res, next) {
    const schema = z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        cover: z.string({
            required_error: "Cover is required"
        }),
        artist: z.string({
            required_error: "Artist is required",
        }),
        year: z.string({
            required_error: "Year is required"
        }).length(4, {
            message: "Year must be 4 characters long"
        }),
        producer: z.string({
            required_error: "Producer is required",
        }),
        genre: z.string({
            required_error: "Genre is required"
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

module.exports = ValidateAddMusic;