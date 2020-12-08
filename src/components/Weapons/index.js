import React from "react";
import url from "../../Services/services";

let weps = [];
let i = 0
export default class Weapons extends React.Component {

  state = {
    Weapons: [],
    Weps: [],
  }

  componentDidMount() {
    this.loadDnd();
  }

  loadDnd = async () => {
    const response = await url.get(`/weapons/`);

    this.setState({
      Weapons: response.data.results,
    })

    this.state.Weapons.map(wep => {
      const arma = `${wep.name} ${wep.damage_dice}`
      const dano = geraDano(wep.damage_dice)
      i++
      const soma = [arma, dano, i]
      weps.push(soma)
      return weps
    })
    this.setState({Weps: weps,})
    weps = []
  }

  render() {
    return (
      <div>
        <select id={this.props.iden} >
          <COptions />
        </select>
      </div>
    );
  }

}

function COptions() {
  return(
    <>
        {weps.map(wep => (
          <option key={wep[2]} id={wep[2]} value={wep[1]}>{wep[0]}</option>
          )
        )}
    </>
  )
}

function geraDano(dmg){
  const dano = dmg.split('d')
  return dano
}
