let navItem = document.querySelectorAll(".nav-item"),
    category = "mmorpg",
    nav = document.querySelector("nav"),
    navLocation = nav.scrollHeight 


  
    for(let i = 0;i<navItem.length;i++) {
        navItem[i].addEventListener("click", function(){
          document.querySelector("#loader").classList.replace("d-none" , "d-flex")
          setTimeout(function(){
          document.querySelector("#loader").classList.replace("d-flex" , "d-none")
        },1000)
            category = navItem[i].innerText.toLowerCase();
            getData();
        })
    }

    
    async function getData(){
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c78cc4f613msh861e33d7cd8a0dap1c8c06jsn31fdd9c702d0',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
}
	const response = await fetch(url, options);
	const result = await response.json();
    displayData(result)
    addDetails(result)
    }

    function displayData(result){
        let cartona = ""
        for(let i =0 ; i< result.length;i++){
            cartona += `
            <div data-code=${result[i].id} class="col p-3 game ">
            <div data-code=${result[i].id} class="card bg-transparent text-white px-0 h-100  ">
            <div data-code=${result[i].id} class="card-body px-4 ">
              <img data-code=${result[i].id} src="${result[i].thumbnail}" class="w-100" alt="">
              <div data-code=${result[i].id} class="card-text position-relative ">
                <p data-code=${result[i].id} class="mt-4 ">
                ${result[i].title}
                </p>
                <p data-code=${result[i].id} class="text-secondary fw-bolder">
                  ${result[i].short_description}
                </p>
                <div data-code=${result[i].id} class="badge position-absolute end-0 top-0 text-bg-primary py-2 fs-6 ">Free</div>
              </div>
            </div>
  
            <div data-code=${result[i].id} class="card-footer d-flex justify-content-between px-3">
              <div data-code=${result[i].id} class="badge rounded-pill text-bg-secondary ">${result[i].genre}</div>
              <div data-code=${result[i].id} class="badge rounded-pill text-bg-secondary ">${result[i].platform}</div>  
            </div>
  
          </div>
            </div>
          
          `
        }
        document.getElementById("games").innerHTML = cartona
    }
    
    function addDetails(result){



        let games = document.querySelectorAll(".card"),
            theGame = ""
            

    for(let i = 0;i<games.length;i++) {
          games[i].addEventListener("click", function(e){
            document.querySelector("#loader").classList.replace("d-none" , "d-flex")
                  setTimeout(function(){
                  document.querySelector("#loader").classList.replace("d-flex" , "d-none")
                },1000)
            for(let i =0;i<result.length;i++) {
              if(result[i].id == this.getAttribute("data-code") ){
                theGame = result[i];
              }
            }
          document.getElementById("details").classList.remove("d-none")
          document.getElementById("main").classList.add("d-none")
          document.getElementById("details").innerHTML = `<div class="container pt-4 fw-bolder fs-5">
          <heading class="d-flex justify-content-between align-content-center">
            <h3 class=" text-capitalize">game details</h3>
            <div id="x" class="close">
              <i  class="fa-solid fa-close fa-2xl fs-3"></i>
            </div>
          </heading>
          <div class="body">
            <div id="game-details" class="row ">
              <div class="col-lg-4 my-4">
                <img src="${theGame.thumbnail}" class="w-100" alt="">
              </div>
              <div class="col-lg-8 text-capitalize ">
                <h2>Title: ${theGame.title} </h2>
                <p>category: <span class="badge text-bg-primary">${theGame.genre}</span></p>
                <p>Platform: <span class="badge text-bg-primary">${theGame.platform}</span></p>
                <p>Status: <span class="badge text-bg-primary">Live</span></p>
                <p>${theGame.short_description}</p>
                <a href="${theGame.game_url}" target="_blank" class="btn btn-outline-info">Show game</a>
              </div>
    
            </div>
          </div>
          </div>`;

          document.querySelector("#x").addEventListener("click",function(){
            document.getElementById("details").classList.add("d-none")
            document.getElementById("main").classList.remove("d-none")
            })

          })

          


        }
        
      }
      
      
      
      

function fixNav(){
  if(nav.getBoundingClientRect().y <= 0){
    document.querySelector("header").children[0].classList.add("fixed-top")
    document.querySelector("header").children[0].classList.remove("h-100")
    nav.classList.add("top-0")
  ;
  }
  if (document.scrollingElement.getBoundingClientRect().y >= -200)
  {
    document.querySelector("header").children[0].classList.remove("fixed-top")
    nav.classList.remove("top-0")
    document.querySelector("header").children[0].classList.add("h-100")

  }

  
}

document.addEventListener("scroll", function(){
  fixNav()
})

setTimeout(
getData(),500)
setTimeout(function(){
  document.querySelector("#main").classList.remove("d-none")
  document.querySelector("#loader").classList.replace("d-flex" , "d-none")

},1000)


// onload(){


    
