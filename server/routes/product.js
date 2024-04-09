const { Router } = require('express')
const router = new Router()

router.get('/', (req, res) => {
	res.json({ msg: 'all set' })
})

module.exports = router
