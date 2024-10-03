<template>
  <div class="ContenedorPincipal">
    <div class="inicio">
      <h1>Batallas Pokémon</h1>
    </div>

    <div class="BarraInfo">
      <div><h2>jugador 1</h2></div>
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

      <div>
        <q-btn color="black" label="Batallar" class="BTN2" @click="BotonBatalla" />
      </div>
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
      <div><h3>{{ EscojerEstadistica1 }}</h3></div>
      <div></div>
      <div><h3>{{ EscojerEstadistica2 }}</h3></div>
    </div>

    <div class="resultado">
      <h2>{{ resultado }}</h2>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

let select = ref("");
let nombre = ref("");
let Imagen = ref("");
let Ataque = ref(0);
let Defensa = ref(0);
let Velocidad = ref(0);
let HP = ref(0);
let EscojerEstadistica1 = ref(0);

let nombre2 = ref("");
let Imagen2 = ref("");
let Ataque2 = ref(0);
let Defensa2 = ref(0);
let Velocidad2 = ref(0);
let HP2 = ref(0);
let EscojerEstadistica2 = ref(0);

let resultado = ref("");


onMounted(() => {
  Swal.fire({
    title: 'Colocar nombre de usuario',
    input: 'text',
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false,
    preConfirm: (nombreUsuario) => {
      if (!nombreUsuario || nombreUsuario.trim() === "") {
        Swal.showValidationMessage('Por favor, ingrese su nombre de usuario');
        return false;
      }
      return nombreUsuario; 
    }
  }).then((result) => {
    if (result.isConfirmed) {
      nombre.value = result.value; 
      Swal.fire({
        title: 'Seleccionar número de rondas',
        input: 'select',
        inputOptions: {
          3: 'Partida a 3 rondas',
          5: 'Partida a 5 rondas',
          7: 'Partida a 7 rondas'
        },
        inputPlaceholder: 'Selecciona el número de rondas',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        preConfirm: (rondas) => {
          if (!rondas) {
            Swal.showValidationMessage('Por favor, seleccione el número de rondas');
            return false;
          }
          return rondas;
        }
      }).then((roundResult) => {
        if (roundResult.isConfirmed) {
          console.log('Número de rondas seleccionadas:', roundResult.value); // Aquí puedes usar el número de rondas
        }
      });
    }
  });
});


function onItemClick(estadistica) {
  if (estadistica === 'Ataque') {
    EscojerEstadistica1.value = Ataque.value;
    EscojerEstadistica2.value = Ataque2.value;
  } else if (estadistica === 'Defensa') {
    EscojerEstadistica1.value = Defensa.value;
    EscojerEstadistica2.value = Defensa2.value;
  } else if (estadistica === 'Velocidad') {
    EscojerEstadistica1.value = Velocidad.value;
    EscojerEstadistica2.value = Velocidad2.value;
  } else if (estadistica === 'HP') {
    EscojerEstadistica1.value = HP.value;
    EscojerEstadistica2.value = HP2.value;
  } else if (estadistica === 'Promedio') {
    EscojerEstadistica1.value = (Ataque.value + Defensa.value + Velocidad.value + HP.value) / 4;
    EscojerEstadistica2.value = (Ataque2.value + Defensa2.value + Velocidad2.value + HP2.value) / 4;
  }
}

function obtenerPokemonAleatorio() {
  return Math.floor(Math.random() * 898) + 1;
}

async function AlaBatalla(pokemonId) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  try {
    let { data } = await axios.get(url);
    Imagen.value = data.sprites.back_default;
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

function BotonBatalla() {
  if (EscojerEstadistica1.value > EscojerEstadistica2.value) {
    resultado.value = "Jugador 1 ganó";
  } else if (EscojerEstadistica1.value < EscojerEstadistica2.value) {
    resultado.value = "Jugador 2 ganó";
  } else {
    resultado.value = "Es un empate";
  }
}
</script>


<style>
* {
  margin: 0;
  padding: 0;
}
.swal2-container {
  z-index: 9999 !important;
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
  height: 400px;
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
  width: 115%;
  height: auto;
  margin-left: -40%;
}
.img2{
  width: 70%;
  height: auto;
  margin-top: 25%;
}
.BarraInfo3 {
  display: grid;
  grid-template-columns: 33% 34% 33%;
}
.desenlace{
  display: grid;
  grid-template-columns: 33% 34% 33%;
  text-align: center;
}

</style>
