module.exports = function(res, message = 'Something went wrong.'){
    res.status(500).json({message })
}