<template>
  <div class="ContenedorPincipal">
    <div class="inicio">
      <h1>Batallas Pokémon</h1>
    </div>

    <div class="BarraInfo">
      <div><h2>Jugador 1</h2></div>
      <div></div>
      <div><h2>Jugador 2</h2></div>
    </div>
    <div class="BarraInfo2">
      <div>
        <q-btn color="white" @click="Batallar" text-color="black" label="Buscar pokémons" class="BTN1"/>
        <div class="q-pa-md"></div>
      </div>

      <div class="BarraDP"> 
        <div class="q-pa-md">
          <q-btn-dropdown color="primary" label="Seleccionar por" v-model="select">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick('Ataque')">
                <q-item-section>
                  <q-item-label>Ataque</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick('Defensa')">
                <q-item-section>
                  <q-item-label>Defensa</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick('Velocidad')">
                <q-item-section>
                  <q-item-label>Velocidad</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick('HP')">
                <q-item-section>
                  <q-item-label>HP</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick('Promedio')">
                <q-item-section>
                  <q-item-label>Promedio</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>

      <div><q-btn color="black" label="Batallar" class="BTN2" @click="PelearPokemons" /></div>
    </div>
    <div class="BarraInfo3">
      <div> <h2>{{ nombre }}</h2></div>
      <div></div>
      <div> <h2>{{ nombre2 }}</h2></div>
    </div>
    <div class="nudo">
      <div class="ContenedorBatalla">
        <div class="BarraLateral"></div>
        <div class="Carta1">
          <div class="poke1">
            <img :src="Imagen" alt="" class="img1">
            <h5></h5>
          </div>
        </div>

    <div></div>

        <div class="Carta2">
          <div class="poke2">
            <img :src="Imagen2" alt="" class="img2">
            <h5></h5>
          </div>
        </div>
      </div>
    </div>

    <div class="desenlace">
      <h1>{{ resultadoBatalla }}</h1>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

let nombre = ref("");
let Imagen = ref("");
let Peso = ref("");
let Altura = ref("");
let Ataque = ref(0);
let Defensa = ref(0);
let Velocidad = ref(0);
let HP = ref(0);

let nombre2 = ref("");
let Imagen2 = ref("");
let Peso2 = ref("");
let Altura2 = ref("");
let Ataque2 = ref(0);
let Defensa2 = ref(0);
let Velocidad2 = ref(0);
let HP2 = ref(0);

let estadisticaJugador1 = ref("");
let estadisticaJugador2 = ref("");



let select = ref("");
let resultadoBatalla = ref("");

function obtenerPokemonAleatorio() {
  return Math.floor(Math.random() * 898) + 1;
}

async function AlaBatalla(pokemonId) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  try {
    let { data } = await axios.get(url);
    Imagen.value = data.sprites.back_default;
    Peso.value = data.weight / 10;
    Altura.value = data.height / 10;
    Ataque.value = data.stats[1].base_stat;
    Defensa.value = data.stats[2].base_stat;
    Velocidad.value = data.stats[5].base_stat;
    HP.value = data.stats[0].base_stat;
    nombre.value = data.name;
  } catch (error) {
    console.error(error);
  }
}

async function AlaBatalla2(pokemonId) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  try {
    let { data } = await axios.get(url);
    Imagen2.value = data.sprites.front_default;
    Peso2.value = data.weight / 10;
    Altura2.value = data.height / 10;
    Ataque2.value = data.stats[1].base_stat;
    Defensa2.value = data.stats[2].base_stat;
    Velocidad2.value = data.stats[5].base_stat;
    HP2.value = data.stats[0].base_stat;
    nombre2.value = data.name;
  } catch (error) {
    console.error(error);
  }
}

async function Batallar() {
  let pokemonId1 = obtenerPokemonAleatorio();
  let pokemonId2 = obtenerPokemonAleatorio();

  await AlaBatalla(pokemonId1);
  await AlaBatalla2(pokemonId2);
}

function onItemClick(opcion) {
  select.value = opcion; // 
}

function mostrarEstadistica(jugador) {
  let estadistica;
  if (select.value === 'Ataque') {
    estadistica = jugador === 1 ? Ataque.value : Ataque2.value;
  } else if (select.value === 'Defensa') {
    estadistica = jugador === 1 ? Defensa.value : Defensa2.value;
  } else if (select.value === 'Velocidad') {
    estadistica = jugador === 1 ? Velocidad.value : Velocidad2.value;
  } else if (select.value === 'HP') {
    estadistica = jugador === 1 ? HP.value : HP2.value;
  } else if (select.value === 'Promedio') {
    let promedio1 = (Ataque.value + Defensa.value + Velocidad.value + HP.value) / 4;
    let promedio2 = (Ataque2.value + Defensa2.value + Velocidad2.value + HP2.value) / 4;
    estadistica = jugador === 1 ? promedio1 : promedio2;
  }

  if (jugador === 1) {
    estadisticaJugador1.value = estadistica;
  } else {
    estadisticaJugador2.value = estadistica;
  }

  return estadistica;
}


function PelearPokemons() {
  let resultado = '';
  
  if (select.value === 'Ataque') 
  {
    resultado = Ataque.value > Ataque2.value ? 'Jugador 1 gana por Ataque' : 'Jugador 2 gana por Ataque';
  } else if (select.value === 'Defensa') 
  {
    resultado = Defensa.value > Defensa2.value ? 'Jugador 1 gana por Defensa' : 'Jugador 2 gana por Defensa';
  } else if (select.value === 'Velocidad') 
  {
    resultado = Velocidad.value > Velocidad2.value ? 'Jugador 1 gana por Velocidad' : 'Jugador 2 gana por Velocidad';
  } else if (select.value === 'HP') 
  {
    resultado = HP.value > HP2.value ? 'Jugador 1 gana por HP' : 'Jugador 2 gana por HP';
  } else if (select.value === 'Promedio') 
  {
    let promedio1 = (Ataque.value + Defensa.value + Velocidad.value + HP.value) / 4;
    let promedio2 = (Ataque2.value + Defensa2.value + Velocidad2.value + HP2.value) / 4;
    resultado = promedio1 > promedio2 ? 'Jugador 1 gana por Promedio' : 'Jugador 2 gana por Promedio';
  }

  resultadoBatalla.value = resultado;
}



</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.ContenedorPincipal {
  background-size: cover;
  text-align: center;
}
.BarraInfo {
  display: grid;
  grid-template-columns: 33% 34% 33%;
}
.ContenedorBatalla {
  height: 350px;
  display: grid;
  grid-template-columns: 20% 25% 10% 25% 20%;
  background-image: url(https://i.pinimg.com/736x/db/5b/60/db5b60edc072e5671fde8d7a55b39f62.jpg);
  background-size: 100% 100%;
  width: 90%;
  margin-left: 5%;
  border: 5px solid black;
  border-radius:10px ;
}
.BarraInfo2 {
  display: grid;
  grid-template-columns: 33% 34% 33%;
  
}
.BarraInfo {
 
  text-align: center;
}
.BarraInfo3 {
text-align: center;
}
.BTN1, .BTN2, .BarraDP {
  margin-left: 30%;
  margin-top: 5%;
}
.img1{
  width: 100%;
  height: auto;
  margin-left: -50%;
}
.img2{
  width: 50%;
  height: auto;
  margin-left: 50%;
  margin-top: 15%;
}
.BarraInfo3 {
  display: grid;
  grid-template-columns: 33% 34% 33%;
}

</style>
