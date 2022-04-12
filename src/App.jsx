import { useState, useEffect ,useRef} from 'react'
import logo from './logo.svg'
import './App.css'
import {Gather} from "./maindata.js"
import {Time, FixBorder} from "./maindata.js"
import {CloseButton, BuildingsButton, SaveButton, LoadButton, ClearSaveButton, GatherButton} from "./Buttons.jsx"
import * as Buttons from "./Buttons.jsx"
import useKeypress from './hooks/useKeypress'
import ResourceTable from "./ResourceTable"
import {GatherFood} from "./buttons/GatherFood.jsx"
import { useSetState } from '@mantine/hooks'

window.addEventListener('load', (event) => {
  FixBorder();

});

const LOCAL_STORAGE_KEY="IncrementalGame.game"

export function App() {
 var [count, setCount] = useState(0);
 var [foodcount, setfoodCount] = useState(0);

 var [gameData, setGameData] = useState(0);


 const food = localStorage.getItem(gameData["foodAmount"]);
 const prevCountRef = useRef();

 useEffect(() => {
	const storedGameData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
	if (storedGameData) setGameData(storedGameData)
	setGameData((gameData) = ({
		GameVersion: "v0.0.6",
		foodAmount: 0,
		foodPerClick: 25,
		foodPerClickCost: 25,
		foodPerClickUpgradeNum: 0,
		wood: 0,
		woodPerClick: 25,
		woodPerClickCost: 25,
		copper: 0,
		copperPerClick: 1,
		copperPerClickCost: 25,
		copperPerClickUpgradeNum: 0,
		bronze: 0,
		bronzePerClick: 1,
		bronzePerClickUpgradeNum: 0,
		TotalTime: 0,
		TotalTimeString: 0
	}))

}, [])

	useEffect(() => {   setTimeout(() => {

		if (gameData.foodAmount <= 100){
			var prevfoodamount = gameData.foodAmount;
			setGameData({ ...gameData, foodAmount:  prevfoodamount + 1 });
		}

		if (gameData.foodAmount >= 100){
		setCount((count) => 0);
		}

   }, 1000)
	}, [gameData])


    


    useKeypress('Escape', () => {
    	Buttons.CloseButton();
    });

	
	
	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameData))
	}, [gameData])


/*
  const useMyFirstCustomHook = () => {
    const [foodCount, setfoodCount] = useState(0);
    // do some stuff
    //return { foodCount, setFoodCount };
    setFoodCount(prevFoodCount => prevFoodCount +1);
  };
*/


  return (
<>
    <div className="App">
    <div id="TopOfPageContainer">
    	<div id="header">
    		<p className="Version"> </p>
    		<p id="gameVersion"> Game Version: {gameData.GameVersion} </p>
    		<div id="TimeStateButtonContainer">

    		<button className="TimeStateButton" id="start"> Play </button>
    		<button className="TimeStateButton" id="pause"> Pause </button>
    		<button id="MenuIcon" className="fa-solid fa-bars"></button>
    		</div>
    	</div>

    	<div className="tabHolder">
    		<div className="tab">
    			<button className="tablinks" onClick={GatherButton} id="GatherButton">Gather</button>
    			<button className="tablinks" onClick={BuildingsButton} id="BuildingsButton">Buildings</button>
    			<button className="tablinks Hidden" id="PeopleButton" >People</button>
    			<button className="tablinks Hidden" id="ResearchButton">Research</button>
    			<button className="tablinks Hidden" id="ReligionButton">Religion</button>
    			<div id="TestButtonContainer"></div>
    		</div>
    	</div>

    </div>

      <header className="App-header">
  	<div id="MainInteract" className="MainInteract Hidden">

      <div id="BuildingsContainer" className="Hidden">
      	<div onClick={BuildingsButton} id="Buildings" className="tabcontent MainInteractTitle Hidden inline-flex">
          <div id="GatherHeaderContainer">
            <h3 className="tabTitle">Gather</h3>
            <span className = "close inline-flex">[x]</span>
            <span onClick={CloseButton} className="tabTitle close">[x]</span>
          </div>


      		<h3 id="Test">Buildings</h3>
      </div>
      		<br></br><br></br>

      		<button id="HutButton">Hut</button>
      		<div id="HutTooltip" role="tooltip">Cost: 100 food, 50 wood, 25 copper
      			<div id="arrow" data-popper-arrow="true"></div>
      		</div>






      	</div>

      	<div id="People" className="tabcontent MainInteractTitle Hidden">
      		<span className="close">[x]</span>
      		<h3>People</h3>
      		<p>Placeholder for the people.</p>
      	</div>

      	<div id="Research" className="tabcontent MainInteractTitle Hidden">
      		<span className="close">[x]</span>
      		<h3>Research</h3>
      		<p>Placeholder for Research.</p>
      	</div>



      	<div id="Religion" className="tabcontent MainInteractTitle Hidden">
      		<span className="close">[x]</span>
      		<h3>Religion</h3>
      		<p>Placeholder for Religion.</p>
      	</div>



  	  <div id = "Gather" className="tabcontent Hidden">

      <div id="GatherHeaderContainer">
        <h3 className="tabTitle">Gather</h3>
        <span onClick={CloseButton} className="tabTitle close">[x]</span>
      </div>
        		<div className="GatherResource-container">
      			<div className="resource-container">
      				<button className="ResourceButtons flex-parent" id="gatherFoodButton" onClick={GatherFood}>Gather Food</button>
      				<button id="foodPerClickUpgrade Hidden">Upgrade Hatchet (Currently Level 1) Cost: 25 wood</button>
      			</div>

      			<div className="resource-container">
      				<button className="ResourceButtons" id="cutWoodButton">Cut Wood</button>
      				<button id="woodPerClickUpgrade Hidden">Upgrade Hatchet (Currently Level 1) Cost: 10 wood</button>
      			</div>

      			<div className="resource-container">
      				<button id="mineCopperButton">Mine Copper</button>
      				<button id="copperperClickUpgrade Hidden">Upgrade Copper Pickaxe (Currently Level 1) Cost: 10 copper</button>
      			</div>

      			<div className="resource-container Hidden">
      				<button className="Hidden" id="minebronzebutton Hidden">Mine Bronze</button>
      				<button className ="Hidden" id="bronzeperClickUpgrade Hidden">Upgrade Bronze Pickaxe (Currently Level 1) Cost: 10 Bronze</button>
      			 </div>

      		</div>
        </div>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome To My First Game</p>

          <button id="Button" type="button" onClick={() => setCount((count) => count + 1)}>
            Forced Resource Refresh: {count}
          </button>




      </header>

      <div id="footer">

      <div className="FooterContainer">
          <div className="QuickOptionButtons">
            <button onClick={SaveButton} id ="SaveButton" className="OptionsQuick">Save</button>
            <button onClick={LoadButton} id ="LoadButton" className="OptionsQuick">Load</button>
            <button onClick={ClearSaveButton} id ="ClearSaveButton" className="OptionsQuick">Clear Save</button>
            <span className="GameStats" id="Time">Current Playtime: {gameData.TotalTimeString} seconds</span> <br></br>
    				<span className="GameStats" id="TimeElapsedTotal"> Total Elapsed Time: </span>
          </div>
          <div id="Development">
          <p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            {' | '}
            <a
              className="App-link"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vite Docs
            </a>
          </p>
          </div>
        </div>
        </div>
      </div>


	<ResourceTable gameData={gameData}/>
	<Buttons.GatherFoodButton newGameData={gameData} />
	<GatherFood/>
</>
  )

}
