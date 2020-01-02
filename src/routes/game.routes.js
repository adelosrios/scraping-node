const express = require('express')
const router = express.Router();

const Game = require('../models/game');

router.get('/', async (req, res) => {
    const games = await Game.find();
    res.json(games);        
})

router.get('/:id', async (req, res) => {
    const game = await Game.findById(req.params.id);
    res.json(game);
})

router.post('/', async (req, res) => {
    const { title } = req.body;
    const game = new Game({ title })
    await game.save();
    res.json({ status: 'Juego guardado' });
})

router.put('/:id', async (req, res) => {
    const { title } = req.body;
    const newGame = { title }
    await Game.findByIdAndUpdate(req.params.id, newGame);
    res.json({ status: 'Juego actualizado' });
})

router.delete('/:id', async (req, res) => {
    await Game.findByIdAndRemove(req.params.id);
    res.json({ status: 'Juego eliminado' });
})



module.exports = router;