<template>
  <div class="ContenedorPincipal">
    <div class="inicio">
      <h1>Batallas Pokémon</h1>
    </div>

    <div class="BarraInfo">
      <div><h2>{{ NombreUsuario }}</h2></div>
      <div></div>
      <div><h2>Bot 2</h2></div>
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
      <div><h2>{{ resultado }}</h2></div>
      <div class="ContadorBatallas">
        <div>{{ ResultadoPartida }}</div>
        <div></div>
        <div>{{ ResultadoPartida2 }}</div>
      </div>
    </div>
    <div><h2>{{ Ganador }}</h2></div>

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
let ResultadoPartida = ref(0);

let nombre2 = ref("");
let Imagen2 = ref("");
let Ataque2 = ref(0);
let Defensa2 = ref(0);
let Velocidad2 = ref(0);
let HP2 = ref(0);
let EscojerEstadistica2 = ref(0);
let ResultadoPartida2 = ref(0);

let resultado = ref("");
let Ganador = ref("");
let NombreUsuario = ref("");
let NumeroDeRondas = ref(3); 

function LlevarCuentasBatallas() {
  if (resultado.value === "Jugador 1 ganó") {
    ResultadoPartida.value += 1;
  } else if (resultado.value === "Jugador 2 ganó") {
    ResultadoPartida2.value += 1;
  } else if (resultado.value === "Es un empate") {
    ResultadoPartida.value += 1;
    ResultadoPartida2.value += 1;
  }
}

function DefiniGanador() {
  if (ResultadoPartida.value == NumeroDeRondas.value) {
    Ganador.value = `${nombre.value} ha ganado la batalla`; 
  } else if (ResultadoPartida2.value == NumeroDeRondas.value) {
    Ganador.value = `${nombre2.value} ha ganado la batalla`; 
  }
}

onMounted(() => {
  Swal.fire({
    title: 'Colocar nombre de usuario',
    input: 'text',
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false,
    preConfirm: (userName) => {
      if (!userName || userName.trim() === "") {
        Swal.showValidationMessage('Por favor, ingrese su nombre de usuario');
        return false;
      }
      return userName;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      NombreUsuario.value = result.value;
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
          NumeroDeRondas.value = roundResult.value; // Aquí almacenamos el número de rondas
          console.log('Número de rondas seleccionadas:', NumeroDeRondas.value);
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
  await Promise.all([AlaBatalla(pokemonId1), AlaBatalla2(pokemonId2)]);
}

function BotonBatalla() {
  if (EscojerEstadistica1.value > EscojerEstadistica2.value) {
    resultado.value = "Jugador 1 ganó";
  } else if (EscojerEstadistica1.value < EscojerEstadistica2.value) {
    resultado.value = "Jugador 2 ganó";
  } else {
    resultado.value = "Es un empate";
  }
  LlevarCuentasBatallas();
  DefiniGanador();
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background-color: #f0f4f8;
  color: #333;
}

.ContenedorPincipal {
  background-size: cover;
  text-align: center;
  padding: 20px;
}

h1, h2, h3 {
  color: #333;
  margin-bottom: 10px;
}

h1 {
  font-size: 2.5rem;
  color: #007bff;
}

h2 {
  font-size: 1.8rem;
}

h3 {
  font-size: 1.4rem;
}

.BarraInfo {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;
  padding: 10px 0;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.BarraInfo div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.BarraInfo2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;
  gap: 10px;
}

.BarraInfo2 div {
  display: flex;
  justify-content: center;
}

.BarraDP {
  text-align: center;
}

.BTN1, .BTN2 {
  width: 200px;
  height: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 25px;
  margin: 10px 0;
}

.BTN1 {
  background-color: #007bff;
  color: #fff;
}

.BTN2 {
  background-color: #28a745;
  color: #fff;
}

.BarraInfo3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;
}

.nudo {
  margin-top: 40px;
}

.ContenedorBatalla {
  height: 400px;
  display: grid;
  grid-template-columns: 20% 25% 10% 25% 20%;
  background-image: url(https://i.pinimg.com/564x/0d/0f/0c/0d0f0c384be14928fd4dcb6ca7f0e6b5.jpg);
  background-size: cover;
  width: 90%;
  margin-left: 5%;
  border: 5px solid black;
  border-radius: 15px;
  padding: 10px;
  position: relative;
}

.poke1, .poke2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.poke1 h5, .poke2 h5 {
  margin-top: 10px;
  font-size: 1.1rem;
  color: #555;
}


.img1 {
  width: 200px;
  height: 200px;
  margin-top: 38%;
}

.img2 {
  max-width: 200px;
  margin-top: 38%;
}

.desenlace {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  margin-top: 30px;
}

.resultado {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-white text-black q-btn--actionable q-focusable q-hoverable BTN1{

}

.ContadorBatallas {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  margin-top: 20px;
}

.ContadorBatallas div {
  font-size: 1.5rem;
  font-weight: bold;
}

.BarraLateral {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

h2, h3 {
  color: #007bff;
}

h2.resultado {
  color: #dc3545;
}

h3 {
  color: #28a745;
}

.swal2-container {
  z-index: 9999 !important;
}


.q-btn {
  border-radius: 26px !important;
  height: 70px;

}

.q-btn-dropdown {
  width: 200px;
  font-size: 1.1rem;
}



</style>
