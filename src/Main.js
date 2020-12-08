import React, { Component } from 'react';
import Form from './components/Form';
import Slider from './components/Slider';
import VideoLogo from './components/VideoLogo';

import './Main.css';

let bninit1 = 0
let bnatq1 = 0
let bndmg1 = 0
let bninit2 = 0
let bnatq2 = 0
let bndmg2 = 0
let tp = 0
let velo = 50
let idop = 0
let atq = 0
let id = ''
let dmg = 0

const icons = [
  {name: 'caveira', url: 'https://i.imgur.com/MhZEUCr.png'}
]

export default class Main extends Component {

  mudaVelo = (e) => {
    velo = (e.target.value - 1000) * (-1)
  }

  criaAvanc = (e) => {
    //const adv = e.target
    createAdv('my', 'afterbegin')
    createAdv('enemy', 'beforeend')
  }

  retiraAvanc = (e) => {
    removeAdv()
  }

  lutar = (e) => {
    e.preventDefault();
    stopTimes()
    controlSword('play')
    createSelect();

    let hpMy, caMy, weapomMy, hpEnemy, caEnemy, weapomEnemy = 0

    hpMy = Number(document.getElementById('myhp').value);
    caMy = Number(document.getElementById('myca').value);
    weapomMy = document.getElementById('myweapon').value;
    hpEnemy = Number(document.getElementById('enemyhp').value);
    caEnemy = Number(document.getElementById('enemyca').value);
    weapomEnemy = document.getElementById('enemyweapon').value;
    if(document.getElementById('myAdv') !== null) {
      bninit1 = Number(document.querySelector('#bninitmy').value)
      bnatq1 = Number(document.querySelector('#bnatqmy').value)
      bndmg1 = Number(document.querySelector('#bndmgmy').value)
      bninit2 = Number(document.querySelector('#bninitenemy').value)
      bnatq2 = Number(document.querySelector('#bnatqenemy').value)
      bndmg2 = Number(document.querySelector('#bndmgenemy').value)
    }

    function createSelect() {
        if (document.getElementById('selResul') !== null) {
            document.getElementById('selResul').remove()
        }
        const destino = document.getElementById('res')
        const newselect = document.createElement('select')
        newselect.id = `selResul`
        newselect.size = 10
        destino.appendChild(newselect)
    }

    const select = document.getElementById('selResul')
    let idini = document.createElement('option')
    idini.id = 'op0'
    select.appendChild(idini)
    idini = document.querySelector(`#op0`)

    // INICIATIVA
    let ini1 = dice(20) + bninit1
    let ini2 = dice(20) + bninit2

    const iniciativa = (x, y) => x > y ?
        idini.innerHTML = `Você começa atacando! ${x} x ${y}`
        :
        idini.innerHTML = `Seu inimigo começa atacando! ${y} x ${x}`

    iniciativa(ini1, ini2)

    // ATAQUE
    if(ini1 >= ini2){
      tp = 0
      while(hpMy > 0 && hpEnemy > 0){
          atq = (dice(20))
          if(atq === 20){
              dmg = dice(pegaDano(weapomMy)) * 2
              const dmgtemp = dmg //+ (bndmg1*2)
              if(hpMy <= 0 || hpEnemy <= 0){
                  break
              }
              setTimeout(() => {
                const id = createOption()
                  id.selected = true
                  id.innerHTML = `CRITICO! Você causou ${dmgtemp} de dano.`
              }, (tp = tp + velo))
              hpEnemy = hpEnemy - dmg
          } else if ((atq+bnatq1) >= caEnemy) {
              dmg = dice(pegaDano(weapomMy))
              const dmgtemp = dmg + bndmg1
              if (hpMy <= 0 || hpEnemy <= 0) {
                  break
              }
              setTimeout(() => {
                  const id = createOption()
                  id.selected = true
                  id.innerHTML = `Você causou ${dmgtemp} de dano.`
              }, (tp = tp + velo))
              hpEnemy = hpEnemy - dmg
          } else{
              if(hpMy <= 0 || hpEnemy <= 0){
                  break
              }
              setTimeout(() => {
                const id = createOption()
                  id.selected = true
                  id.innerHTML = `Você errou o ataque!`
              }, (tp = tp + velo))
          }
          //ataque inimigo
          atq = (dice(20))
          if(atq === 20){
              dmg = dice(pegaDano(weapomEnemy)) * 2
              const dmgtemp = dmg + (bndmg2*2)
              if(hpMy <= 0 || hpEnemy <= 0){
                  break
              }
              setTimeout(() => {
                const id = createOption()
                  id.selected = true
                  id.innerHTML = `CRITICO! Seu inimigo causou ${dmgtemp} de dano.`
              }, (tp = tp + velo))
              hpMy = hpMy - dmg
              atq = atq + bnatq2
          }else if (atq+bnatq2 >= caMy) {
              dmg = dice(pegaDano(weapomEnemy))
              const dmgtemp = dmg + bndmg2
              if (hpMy <= 0 || hpEnemy <= 0) {
                  break
              }
              setTimeout(() => {
                const id = createOption()
                  id.selected = true
                  id.innerHTML = `Seu inimigo causou ${dmgtemp} de dano.`
              }, (tp = tp + velo))
              hpMy = hpMy - dmg
          } else{
              if(hpMy <= 0 || hpEnemy <= 0){
                  break
              }
              setTimeout(() => {
                const id = createOption()
                  id.selected = true
                  id.innerHTML = `Seu inimigo errou o ataque!`
              }, (tp = tp + velo))
          }
      }
  } else{
      tp = 0
      while(hpMy > 0 && hpEnemy > 0){
          atq = (dice(20))
          if(atq === 20){
              dmg = dice(pegaDano(weapomEnemy)) * 2
              const dmgtemp = dmg + (bndmg2 *2)
              if(hpMy <= 0 || hpEnemy <= 0){
                  break
              }
              setTimeout(() => {
                const id = createOption()
                  id.selected = true
                  id.innerHTML = `CRITICO! Seu inimigo causou ${dmgtemp} de dano.`
              }, (tp = tp + velo))
              hpMy = hpMy - dmg
              atq = atq + bnatq2
          } else if(atq+bnatq2 >= caMy){
              dmg = dice(pegaDano(weapomEnemy))
              const dmgtemp = dmg + bndmg2
              if(hpMy <= 0 || hpEnemy <= 0){
                  break
              }
              setTimeout(() => {
                const id = createOption()
                  id.selected = true
                  id.innerHTML = `Seu inimigo causou ${dmgtemp} de dano.`
              }, (tp = tp + velo));
              hpMy = hpMy - dmg
          } else{
              if(hpMy <= 0 || hpEnemy <= 0){
                  break
              }
              setTimeout(() => {
                const id = createOption()
                  id.selected = true
                  id.innerHTML = `Seu inimigo errou o ataque!`
              }, (tp = tp + velo))
          }
          atq = (dice(20))
          if(atq === 20){
              dmg = dice(pegaDano(weapomMy)) * 2
              const dmgtemp = dmg + (bndmg1*2)
              if(hpMy <= 0 || hpEnemy <= 0){
                  break
              }
              setTimeout(() => {
                const id = createOption()
                  id.selected = true
                  id.innerHTML = `CRITICO! Você causou ${dmgtemp} de dano.`
              }, (tp = tp + velo))
              hpEnemy = hpEnemy - dmg
              atq = atq + bnatq1
          }else if(atq+bnatq1 >= caEnemy){
              dmg = dice(pegaDano(weapomMy))
              const dmgtemp = dmg + bndmg1
              if(hpMy <= 0 || hpEnemy <= 0){
                  break
              }
              setTimeout(() => {
                const id = createOption()
                  id.selected = true
                  id.innerHTML = `Você causou ${dmgtemp} de dano.`
              }, (tp = tp + velo))
              hpEnemy = hpEnemy - dmg
          } else{
              if(hpMy <= 0 || hpEnemy <= 0){
                  break
              }
              setTimeout(() => {
                const id = createOption()
                  id.selected = true
                  id.innerHTML = `Você errou o ataque!`
              }, (tp = tp + velo))
          }
      }
  }
  checkDead(hpMy, hpEnemy, velo)
  }
// FIM DO LUTAR

  render() {
    return (
      <>
        <h1>Ad Bellum</h1>
        <div className="main">
          <div className="container">
            <div id="modelo">
              <input type="radio" name="modelo" id="simple" defaultChecked onClick={this.retiraAvanc}/>
              <label>Simplificado</label>
              <input type="radio" name="modelo" id="advanced" onClick={this.criaAvanc} />
              <label>Avançado</label>
            </div>
            <form className="entradas" id="entradas" >
              <Form id="my" />
              <Form id="enemy"/>
            </form>
            <div id="slidervelo" className="slidercontainer">
              <div id="minMax">
                <p>min.</p>
                <p>máx.</p>
              </div>
              <Slider onMouseUp={this.mudaVelo} />
              <p>Velocidade da Simulação</p>
              <VideoLogo />
             </div>
            <button onClick={this.lutar} type="submit">Fight</button>
            <div id="res">

            </div>
          </div>
        </div>
        <footer>Ver. 1.00</footer>
      </>
    );
  }
}

function dice (d) {
  d = d + 1;
  const r = Math.random() * (1 - d) + d;
  return Math.floor(r);
}

function pegaDano(weapon) {
  let w
  if(weapon.length > 1){
    w = weapon.slice(2)
  } else{
    w = weapon
  }
  return Number(w)
}

function createOption(){
  const select = document.getElementById('selResul')
  let opres = document.createElement('option')
  idop++
  opres.id = `op${idop}`
  select.appendChild(opres)
  opres.selected = true
  select.selectedIndex = idop
  let id = document.querySelector(`#op${idop}`)
  return id
}

function checkDead(hp1, hp2, velo) {
  if (hp1 > hp2 && hp2 <= 0) {
      setTimeout(() => {
          id = createOption()
          id.style.background = `url(${icons[0].url}) no-repeat center`
          id = createOption()
          id.innerHTML = `Você MATOU seu inimigo!`
          controlSword('stop')
      }, (tp = tp + velo))
  } else if (hp2 > hp1 && hp1 <= 0) {
      setTimeout(() => {
          id = createOption()
          id.style.background = `url(${icons[0].url}) no-repeat center`
          id = createOption()
          id.innerHTML = `Você MORREU para o seu inimigo!`
          controlSword('stop')
      }, (tp = tp + velo))
  }
}

function controlSword(action) {
  const play = document.querySelector('#tapSword')
  if(action === 'play'){
      play.play()
  } else if(action === 'stop'){
      play.pause()
      play.currentTime = 0
  }
}

function stopTimes(){
  var id = window.setTimeout(function() {}, 0)
  while (id--) {
          window.clearTimeout(id)
      }
}

function createAdv(i, local) {
  const entradas = document.getElementById('entradas')
  entradas.style.margin = '0 20px'
  if(entradas.childElementCount < 4){
      // TRANSFORMAR EM FOR!!!
      const divAdv = document.createElement(`div`)
      divAdv.id = `${i}Adv`
      entradas.insertAdjacentElement(`${local}`, divAdv)

      const inpIni = document.createElement('input')
      const labIni = document.createElement('label')
      labIni.innerText = "Bônus Iniciativa"
      inpIni.id = `bninit${i}`
      divAdv.appendChild(labIni)
      divAdv.appendChild(inpIni)

      const inpAtq = document.createElement('input')
      const labAtq = document.createElement('label')
      labAtq.innerText = "Bônus Ataque"
      inpAtq.id = `bnatq${i}`
      divAdv.appendChild(labAtq)
      divAdv.appendChild(inpAtq)

      const inpDmg = document.createElement('input')
      const labDmg = document.createElement('label')
      labDmg.innerText = "Bônus Dano"
      inpDmg.id = `bndmg${i}`
      divAdv.appendChild(labDmg)
      divAdv.appendChild(inpDmg)
  }
}

function removeAdv(){
  const entradas = document.getElementById('entradas')
  const myAdv = document.getElementById('myAdv')
  const enemyAdv = document.getElementById('enemyAdv')
  entradas.style.margin = '0 140px'
  if(entradas.childElementCount === 4){
    myAdv.remove()
    enemyAdv.remove()
    bninit1 = 0
    bnatq1 = 0
    bndmg1 = 0
    bninit2 = 0
    bnatq2 = 0
    bndmg2 = 0
  }
}
