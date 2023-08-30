import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_KEY = '76e8e2171fe6ee82a9d68dc23d918877';
   
 
const FootballDataComponent = () => {
        const [chosenSeasonBtn, setChosenSeasonBtn] = useState(2023);
        const [chosenLeagueBtn, setChosenLeagueBtn] = useState(106);
        const [contentVisible, setContentVisible] = useState(true);

        const handleLeagueButtonClick = (leagueId) => {
            setContentVisible(false)
            setChosenLeagueBtn(leagueId);
            setSelectedLeague(leagueId);
        };
      
        const handleSeasonButtonClick = (season) => {
          setContentVisible(false) 
          setChosenSeasonBtn(season);
          setSelectedSeason(season)
        };
      

        const [data, setData] = useState(null);
        const [selectedSeason, setSelectedSeason] = useState(2023);
        const [selectedLeague, setSelectedLeague] = useState(106);
       
        useEffect(() => {
          async function fetchData() {
            try {
              const response = await axios.get(`https://v3.football.api-sports.io/standings?league=${selectedLeague}&season=${selectedSeason}`, {
                "headers": {
                  "x-rapidapi-host": "v3.football.api-sports.io",
                  "x-rapidapi-key": API_KEY
                }
              });
              setData(response.data.response[0].league);
              console.log(response.data.response[0].league);

              setContentVisible(true);
            } catch (err) {
              console.error(err);
              alert('Sorry, the request limit has been reached.')
            }
          }
        
          fetchData();
        }, [selectedSeason, selectedLeague]);
        
    
        


  return (
    <div>
        <header>
        <div className='asideCountries'>
            <p className='countriesLabel'>COUNTRIES</p>
                <div className='countries'>
                    <div className='countriesUp'>
                        
                        <button className= {chosenLeagueBtn === 39 ? 'chosen countriesUp-firstBtn' : 'countriesUp-firstBtn'} 
                                onClick={()=>{
                                               handleLeagueButtonClick(39) 
                                              }}
                        >ENGLAND</button>
                        <button className= {chosenLeagueBtn === 61 ? 'chosen' : ''}
                                onClick={()=>{
                                               handleLeagueButtonClick(61)
                                              }}>
                        FRANCE</button>
                        <button className= {chosenLeagueBtn === 78 ? 'chosen' : ''} 
                                onClick={()=>{
                                              handleLeagueButtonClick(78)
                                            }}
                        >GERMANY</button>
                        
                        <button className= {chosenLeagueBtn === 197 ? 'chosen' : ''}
                                onClick={()=> {
                                               handleLeagueButtonClick(197)                                                              
                                              }}
                        >GREECE</button>
                        <button className= {chosenLeagueBtn === 135 ? 'chosen' : ''}
                                onClick={()=>{
                                              handleLeagueButtonClick(135) 
                                              }}
                        >ITALY</button>
                    </div>
                    <div> 
                        <button className= {chosenLeagueBtn === 106 ? 'chosen' : ''}
                                onClick={()=> {
                                               handleLeagueButtonClick(106)
                                              }}
                        >POLAND</button>
                        <button className= {chosenLeagueBtn === 94 ? 'chosen' : ''}
                                onClick={()=> {
                                               handleLeagueButtonClick(94)
                                              }}  
                        >PORTUGAL</button>
                        <button className= {chosenLeagueBtn === 179 ? 'chosen' : ''}
                                onClick={()=> {
                                               handleLeagueButtonClick(179)
                                              }}
                        >SCOTLAND</button> 
                        <button className= {chosenLeagueBtn === 140 ? 'chosen' : ''}
                                onClick={()=>{
                                              handleLeagueButtonClick(140)
                                            }}
                        >SPAIN</button>
                        <button className= {chosenLeagueBtn === 203 ? 'chosen' : ''}
                                onClick={()=>{
                                              handleLeagueButtonClick(203)
                                             }}
                        >TURKEY</button>
                    </div>
                </div>
            </div>
        <div className='asideSeason'>
          
          <p className='seasonLabel'>SEASONS</p>  
               <div className='seasons'>
                  <div className='seasonsUp'> 
                    <button   className= {chosenSeasonBtn === 2020 ? 'chosen seasonUp-firstBtn' : 'seasonUp-firstBtn'}
                              onClick={()=> {
                                            handleSeasonButtonClick(2020)
                                            }}
                    >2020/2021</button>
                    <button   className= {chosenSeasonBtn === 2021 ? 'chosen' : ''}
                              onClick={()=> {
                                             handleSeasonButtonClick(2021)
                                            }}
                    >2021/2022</button>
                    <button   className= {chosenSeasonBtn === 2022 ? 'chosen' : ''}
                              onClick={()=> {
                                             handleSeasonButtonClick(2022)
                                            }}
                    >2022/2023</button>
                   <button  className= {chosenSeasonBtn === 2023 ? 'chosen ' : ''} 
                            onClick={()=> {
                                           handleSeasonButtonClick(2023)
                                          }}
                    >2023/2024</button>
                  </div>
               </div>
        </div>
        </header>
      <main>
      {data && (
      <div className='mainStand'>  
        
            <div className='leagueBoard'>
                    <div className='leagueCountry'>
                      <p className={contentVisible ? 'fade-in' : 'fade-out'}>{data.country}</p>
                    </div> 
                    <div className='leagueLogo'>
                      <img id='leagueLogo' src={data.logo} alt="League Logo"  className={contentVisible ? 'fade-in' : 'fade-out'}/>
                    </div>    
                    <div className='leagueName'>  
                      <p className={contentVisible ? 'fade-in' : 'fade-out'}>{data.name}</p>
                    </div>
                    <div className='leagueSeason'>  
                      <p className={contentVisible ? 'fade-in' : 'fade-out'}>{data.season}/{data.season+1}</p>
                    </div>       
            </div>
            <div className='teamsBoard'>
                  {data.standings[0].map((teamData) => (
                      <div className='teamBoard' key={teamData.team.id}>

                        <div className='rank'>
                          <p className={contentVisible ? 'fade-in' : 'fade-out'}>{teamData.rank}</p>
                        </div>
                        <div className='logoName'>
                          <img className={contentVisible ? 'fade-in' : 'fade-out'} src={teamData.team.logo} alt={`${teamData.team.name} Logo`} />
                          <p className={contentVisible ? 'fade-in' : 'fade-out'}>{teamData.team.name.toUpperCase()}</p>
                        </div>
                        <div className='points pointsBoard'>
                          <p className={contentVisible ? 'fade-in' : 'fade-out'}>{teamData.points}</p>
                        </div>
                        <div className='points wins'>
                          <p className={contentVisible ? 'fade-in' : 'fade-out'}>{teamData.all.win}</p>
                        </div>
                        <div className='points draws'>
                           <p className={contentVisible ? 'fade-in' : 'fade-out'}>{teamData.all.draw}</p>
                        </div>
                        <div className='points loses'>
                          <p className={`${contentVisible ? 'fade-in' : 'fade-out'}`}>{teamData.all.lose}</p>
                        </div>
                        <div className='points goals'>
                            <p className={`${contentVisible ? 'fade-in' : 'fade-out'}`}>{`${teamData.all.goals.for}-${teamData.all.goals.against}`}</p>
                        </div>
                      </div>
                  ))}
          </div>
        </div>
      )}
      </main>
    </div>
  );
};

export default FootballDataComponent;