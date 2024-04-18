module.exports = function(res, message = 'Something went wrong.', err){
    console.log(err);
    res.status(500).json({message })
}