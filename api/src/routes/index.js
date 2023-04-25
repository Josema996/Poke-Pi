const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios')
const {Type, Pokemon} = require('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//TRAIGO LOS DATOS DE LA API, HACIENDO OTRO LLAMADO A LA URL DEL POKEMON PARA QUE ME TRAIGA LOS DATOS NECESARIOS EN LA RUTA PRINCIPAL (NOMBRE, IMAGEN, TIPO).
const getApiInfo = async () => {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/';
        let pokemones = [];
        do {
            let info = await axios.get(url);
            let pokemonesApi = info.data;
            let auxPokemones = pokemonesApi.results.map(e => {
                return {
                    name: e.name,
                    url: e.url,
                }
            })
            pokemones.push(...auxPokemones);
            url = pokemonesApi.next;
        } while (url != null && pokemones.length < 60); //ACA PUEDO LIMITARLOS A LOS QUE QUIERA TRAER
        let pokesWithData = await Promise.all(pokemones.map(async e => {
            let pokemon = await axios.get(e.url);
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                img: pokemon.data.sprites.other.home.front_default,
                types: pokemon.data.types.map(e => {
                    return ({
                        name: e.type.name,
                        img: `https://typedex.app/images/ui/types/dark/${e.type.name}.svg`,
                    })
                }),
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
            }
        }));
        return pokesWithData;
    } catch (e) {
        console.log(e);
    };
};

//TRAIGO TODOS LOS POKEMONES CREADOS DESDE LA BASE DE DATOS EN LA TABLA POKEMON, Y QUE INCLUYA LA TABLA TYPE CON SU ATRIBUTO NAME.
const getDbInfo = async () => {
    return await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

//TRAIGO TODOS LOS POKEMONES, TANTO DE LA API COMO DE LA DB.
const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}


//PROCEDEMOS A GENERAR LAS RUTAS


//PRIMERA RUTA TRAE TODOS LSOS POKEMONES
router.get('/pokemons', async (req, res) => {
    try {

        return res.status(200).send(await getAllPokemons());

    } catch (error) {
        console.log('entro error');
        return res.status(404).send('Pokemons not found');
    }
});

//RUTA PARA LLAMAR LOS TIPOS DE POKEMONES
router.get('/types', async (req, res) => {
    try {
        const apiType = await axios.get('https://pokeapi.co/api/v2/type');
        const apiTypeInfo = apiType.data;
        const types = apiTypeInfo.results.map(e => e.name);
        types.forEach(type => {
            Type.findOrCreate({
                where: {
                    name: type,
                }
            });
        });
        const allTypes = await Type.findAll();
        return res.status(200).send(allTypes);
    } catch (e) {
        console.log(e);
    };
});

//RUTA PARA CREAR UN POKEMON
router.post('/pokemons', async (req, res) => {
    try {
      //EXTRAEMOS LOS DATOS DEL VODY DEL REQUEST
      const { name, img, hp, attack, defense, speed, height, weight, types } = req.body;
  
      //CREAMOS EL POKEMON EN LA BASE DE DATOS
      const newPokemon = await Pokemon.create({
        name,
        img,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
      });
      for(let tipo of types){
        let asignarTipo = await Type.findOne({where: { name: tipo}})
        await newPokemon.addType(asignarTipo)
        console.log(asignarTipo, "hola")
      }
      res.status(200).send('Pokemon creado');
    } catch(error){
      res.status(500).json(error.message);
    }
  });

//RUTA PARA BUSCAR UN POKEMON POR ID
router.get('/pokemons/:id', async (req, res) => {
    const { id } = req.params;
    const allPokemons = await getAllPokemons();
    try {
        if (id) {
            const pokemonId = await allPokemons.filter(e => e.id == id);
            pokemonId.length ?
                res.status(200).json(pokemonId) :
                res.status(404).send('Pokemon no encontrado por id')
        }
    } catch (error) {
        console.log(error);
    }
})

//RUTA PARA LLAMAR POKEMONS POR EL NOMBRE
router.get('/:name', async (req, res) => {
    const { name } = req.params;
    const allPokemons = await getAllPokemons();
    try {
        if (name) {
            const pokemonName = await allPokemons.filter(e => e.name == name);
            pokemonName.length ?
                res.status(200).json(pokemonName) :
                res.status(404).send('Pokemon no encontrado')
        }
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Pokemon.destroy({ where: { id: id } });
    res.status(200).send("Pokemon Borrado");
  });
  

module.exports = router;
