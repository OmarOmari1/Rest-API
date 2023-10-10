import express from 'express'
import { delPokemon, addPokemon, getPokemon, getPokemons, updatePokemon } from './database.js'

const app = express()

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Pokedex');
});

app.get('/pokemon', async (req, res) => {
    const pokemons = await getPokemons()
    res.send(pokemons)
});

app.get('/pokemon/:id', async (req, res) => {
    const id = req.params.id
    const pokemons = await getPokemon(id)
    res.send(pokemons)
});

app.post('/pokemon', async (req, res) => {
    const {name, level, type} = req.body
    
    try {
        const pokemon = await addPokemon(name, level, type) 
        res.status(200).json(pokemon)
    } catch (error) {
        res.send(500).send('Error while trying to add.')
    }    
});

app.delete('/pokemon/:id', async (req, res) => {
    const id = req.params.id
    try {
        await delPokemon(id)
        res.status(200).send('Success. Pokemon deleted.')
    } catch (error) {
        res.status(500).send('Error while trying to delete')
    }
});

app.put('/pokemon/:id', async (req, res) => {
    const id = req.params.id
    const { name, level, type } = req.body;

    try {
        await updatePokemon(id, name, level, type)
        res.status(200).send('Success. Pokemon updated.')
    } catch (error) {
        res.status(500).send('Error while trying to update')
    }
});

app.use((req, res, next) => {
    res.status(404).send('Not found')
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong')
});

app.listen(5500, () => 
    console.log('Listieing on port 5500'),
);