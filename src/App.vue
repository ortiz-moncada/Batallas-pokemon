<template>
  <div class="ContenedorPincipal">
    <div class="inicio">
      <img src="https://images.wikidexcdn.net/mwuploads/wikidex/8/81/latest/20130115162833/Novena_temporada.png" class="title">
    </div>

    <div class="BarraInfo">
      <div><h2>{{ NombreUsuario }}</h2></div>
      <div><h2>V/S</h2></div>
      <div><h2>Bot 2</h2></div>
    </div>

    <div class="BarraInfo2">
      <div>
        <q-btn color="white" @click="Batallar" text-color="black" label="Buscar pokémons" class="BTN1" />
        <div class="q-pa-md"></div>
      </div>

      <div class="BarraDP"> 
        <div class="q-pa-md">
          <q-btn-dropdown color="primary" label="Seleccionar por" v-model="select" class="ElSelec" :disable="!pokemonsBuscados">
            <q-list>
              <q-item clickable v-close-popup @click="handleItemClick('Ataque')">
                <q-item-section>
                  <q-item-label>Ataque</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="handleItemClick('Defensa')">
                <q-item-section>
                  <q-item-label>Defensa</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="handleItemClick('Velocidad')">
                <q-item-section>
                  <q-item-label>Velocidad</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="handleItemClick('HP')">
                <q-item-section>
                  <q-item-label>HP</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="handleItemClick('Promedio')">
                <q-item-section>
                  <q-item-label>Promedio</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>

      <div>
        <q-btn color="black" label="Batallar" class="BTN2" @click="BotonBatalla" :disable="!pokemonsBuscados2" />
      </div>
    </div>

    <div class="BarraInfo3">
      <div><h2>{{ nombre }}</h2></div>
      <div>
        <div class="ContadorBatallas">
          <div>{{ ResultadoPartida }}</div>
          <div></div>
          <div>{{ ResultadoPartida2 }}</div>
        </div>
      </div>
      <div><h2>{{ nombre2 }}</h2></div>
    </div>
    
    <div class="desenlace">
      <div><h3>{{ EscojerEstadistica1 }}</h3></div>
      <div></div>
      <div><h3>{{ EscojerEstadistica2 }}</h3></div>
    </div>

    <div class="nudo">
      <div class="ContenedorBatalla">
        <div class="BarraLateral"></div>

        <div class="Carta1">
          <div class="poke1">
            <img :src="Imagen" class="img1">
            <h5></h5>
          </div>
        </div>

        <div>
          <img :src="LaIMG" class="imgI">
        </div>

        <div class="Carta2">
          <div class="poke2">
            <img :src="Imagen2" class="img2">
            <h5></h5>
          </div>
        </div>
      </div>
    </div>

    <div class="resultado">
      <div><h2>{{ resultado }}</h2></div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

let pokemonsBuscados = ref(false);  
let nombre = ref("");
let Imagen = ref("");
let Ataque = ref(0);
let Defensa = ref(0);
let Velocidad = ref(0);
let HP = ref(0);
let EscojerEstadistica1 = ref(0);
let ResultadoPartida = ref(0);

let pokemonsBuscados2 = ref(false); 
let nombre2 = ref("");
let Imagen2 = ref("");
let Ataque2 = ref(0);
let Defensa2 = ref(0);
let Velocidad2 = ref(0);
let HP2 = ref(0);
let EscojerEstadistica2 = ref(0);
let ResultadoPartida2 = ref(0);

let select = ref("");
let resultado = ref("");
let NombreUsuario = ref("");
let NumeroDeRondas = ref(3); 

let LaIMG = ref("");
let ImgA = ref("https://cdn-icons-png.flaticon.com/128/1183/1183803.png");
let ImgD = ref("https://cdn-icons-png.flaticon.com/128/4046/4046176.png");
let ImgV = ref("https://cdn-icons-png.flaticon.com/128/252/252590.png");
let ImgH = ref("https://cdn-icons-png.flaticon.com/128/185/185954.png");
let ImgP = ref("https://cdn-icons-png.flaticon.com/128/1306/1306123.png");

function JuegoIconos() {
  if (select.value === 'Ataque') {
    LaIMG.value = ImgA.value;  
  } else if (select.value === 'Defensa') {
    LaIMG.value = ImgD.value;
  } else if (select.value === 'Velocidad') {
    LaIMG.value = ImgV.value;
  } else if (select.value === 'HP') {
    LaIMG.value = ImgH.value;
  } else if (select.value === 'Promedio') {
    LaIMG.value = ImgP.value;
  }
}

function handleItemClick(estadistica) {
  select.value = estadistica;
  JuegoIconos(); 

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
  pokemonsBuscados2.value = true;
}

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
    Swal.fire({
      title: '¡Ganador!',
      text: `${nombre.value} ha ganado la batalla`, 
      confirmButtonText: 'Aceptar'
      
    })
    reiniciarJuego();;
  } else if (ResultadoPartida2.value == NumeroDeRondas.value) {
    Swal.fire({
      title: '¡Ganador!',
      text: `${nombre2.value} ha ganado la batalla`, 
      confirmButtonText: 'Aceptar'
    })
    reiniciarJuego();;
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
  
  pokemonsBuscados.value = true; 
  
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
 

  if (select.value) {
    JuegoIconos();
  }
  pokemonsBuscados.value = false; 
  pokemonsBuscados2.value = false; 
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
          NumeroDeRondas.value = roundResult.value;
          console.log('Número de rondas seleccionadas:', NumeroDeRondas.value);
        }
      });
    }
  });
});

function reiniciarJuego() {
  // Restablecer todas las variables a su estado inicial
  NombreUsuario.value = "";
  NumeroDeRondas.value = 3; // O el valor que necesites
  ResultadoPartida.value = 0;
  ResultadoPartida2.value = 0;
  EscojerEstadistica1.value = 0;
  EscojerEstadistica2.value = 0;
  pokemonsBuscados.value = false;
  pokemonsBuscados2.value = false;
  resultado.value = "";
  select.value = "";
  Imagen.value = "";
  Imagen2.value = "";
  Ataque.value = 0;
  Defensa.value = 0;
  Velocidad.value = 0;
  HP.value = 0;
  Ataque2.value = 0;
  Defensa2.value = 0;
  Velocidad2.value = 0;
  HP2.value = 0;
  LaIMG.value = "";
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
  max-width: 100%;
}
.h2{
  color: #333;
}

.ContenedorPincipal {
  background-size: cover;
  text-align: center;
  padding: 20px;
  background-image: url(https://i.pinimg.com/736x/b6/40/c5/b640c58cfb5968c64b87c0334565a9fa.jpg);
  background-size: cover;
}


h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.4rem;
}

.BarraInfo {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 90px;
  margin-top: 20px;
  padding: 10px 0;
  background: rgb(140,104,19);
  background: linear-gradient(0deg, rgba(140,104,19,1) 33%, rgba(255,252,14,1) 71%);
  border: 5px solid rgb(0, 0, 0);
  border-radius: 5px;
}



.BarraInfo2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 90px;
  margin-top: 20px;
}


.block{
  font-size: medium;
}


.BTN1, .BTN2 {
  width: 200px;
  height: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 25px;
  margin: 10px 0;
}


.BarraInfo3 {
  display: grid;
  grid-template-columns: 40% 20% 40%;
  width: 58%;
  margin-top: 3%;
  margin-left: 20%;
  position: absolute;
  color: #f0f4f8;
  border-radius:10px;
  padding: 1%;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(62,54,54,0.5355392156862745) 0%);

}

.nudo {
  margin-top: 40px;
}

.ContenedorBatalla {
  height: 400px;
  display: grid;
  grid-template-columns: 20% 25% 10% 25% 20%;
  background-image: url(https://i.pinimg.com/564x/0d/0f/0c/0d0f0c384be14928fd4dcb6ca7f0e6b5.jpg);
  background-size: 100% 100%;
  width: 90%;
  margin-left: 5%;
  border: 5px solid black;
  border-radius: 15px;
  padding: 10px;
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




.imgI{
  width: 100px;
  height: 100px;
  margin-top:130% ;


  border: none;
  outline: none;
}

.img1 {
  width: 290px;
  height: 290px;
  margin-top: 20%;
  margin-left: -30%;

  border: none;
  outline: none;
}

.img2 {
  width: 200px;
  height: 200px;
  margin-top: 25%;
}

.desenlace {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  height: 5px;

}

.resultado {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -4.5%;
  color:#ffffff;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(62,54,54,0.5355392156862745) 0%);
  width: 20%;
  margin-left:40%;
  border-radius: 10px;

}


.ContadorBatallas {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  color: #f0f4f8;
 
}

.ContadorBatallas div {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
}



h2.resultado {
  color: #dc3545;
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


@media (max-width:426px){
 
.BarraInfo2 {
  display: grid;
  grid-template-columns: 100%;
}

.img1 {
  width: 200px;
  height: 200px;
  margin-top: 250%;
}

.img2 {
  width: 150px;
  height: 150px;
  margin-top: 120%;
}


 
}







</style>
