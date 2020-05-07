module.exports = function (router, model, options = null) {

    //read
    router.post('', function (req, res, next) {
        const payload = req.body;

        return model.findAll({
            where: payload,
            ...options
        }).then((results) => {
            return res.status(200).send(results);
        }).catch((reason) => {
            next(reason);
        });
    });

    //.create
    router.put('', function (req, res, next) {
        const payload = req.body;
        
        return model.create(payload).then((results) => {
            return res.status(200).send(results);
        }).catch((reason) => {
            next(reason);
        });
    });

    //upsert
    router.patch('', function (req, res, next) {
        const payload = req.body;
        
        return model.upsert(payload).then((results) => {
            return res.status(200).send(results);
        }).catch((reason) => {
            next(reason);
        });
    });

    //delete
    router.delete('', function (req, res, next) {
        const payload = req.body;

        return model.destroy({
            where: payload
        }).then((results) => {
            return res.status(200).send(results);
        }).catch((reason) => {
            next(reason);
        });
    });

    return router;
};