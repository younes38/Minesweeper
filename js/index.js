const   MAX = 100 ,
        line = 10 ,
        NB_BOMB = 10 ,
        COLOR_ENABLE = "#00539C" ,
        TEXT_ENABLE = "white",
        COLOR_DISABLE = "#dddddd",
        COLOR_BOMB = "red",
        COLOR_LOSE = "red",
        COLOR_WIN = "green",
        COLOR_NORMAL = "white";

let buttons = Array(MAX) ,
    game = Array(line) ;

let discovered = 0 ,
    game_played = 0 ;
for (let j =0 ; j< line ; j++) {
    let d = Array(line) ;
    for (let i =0 ; i< line ; i++) {
        d[i] = 0 ;
    }
    game[j]=d ;
}

function new_game() {
    arr =  random_nbs(MAX , NB_BOMB) ;
    for (let i of arr ) {
            game[Math.floor(i/line)][i%line] = -1 ;
    }
    for (let i=0 ;i<line ; i++) {
        for (let j = 0 ; j < line ;j++) {
            if (game[i][j] == -1) {
                for (let l = i-1 ; l <= i+1 ; l++) {
                    for (let c = j-1 ; c <= j+1 ; c++) {
                        if (c>=0 && c<line && l>=0 && c<line) {
                            if (game[l][c] != -1)  
                                game[l][c]++ ;
                        }
                    }
                }

            }
        }
    }
}

window.onload =  function() {
    //Create and get buttons
    for (let i =0 ; i<MAX ;i++ ) {
        let btn= document.createElement("button") ;
        btn.className = "btn" ;
        btn.innerHTML = "." ;
        buttons[i] = btn ;
        document.querySelector(".game").appendChild(btn) ;
    }   
    
    for (let i = 0 ; i< buttons.length ; i++) {
        buttons[i].addEventListener("click" , () => {
            if ( game [Math.floor(i/line)][i%line] ==-1 ) 
            {
                document.body.style.background = COLOR_LOSE ; 
                block_all() ;
                game_played++ ;
                alert('you lost !!') ;
                let p = document.createElement("p")  ;
                p.textContent = "Partie " +  game_played + "= " + discovered;
                document.getElementById("lastGames").appendChild(p) ;

            } else {
                if (game [Math.floor(i/line)][i%line] == 0 ){
                    buttons[i].style.color = COLOR_ENABLE ;
                }else {
                    buttons[i].style.color = TEXT_ENABLE ;          
                }
                buttons[i].style.background = COLOR_ENABLE ;
                buttons[i].textContent = game [Math.floor(i/line)][i%line] ;
            }
            buttons[i].disabled = true ;
            discovered++ ;
            if (win()) {
                document.body.style.background = COLOR_WIN ;
                block_all() ;
                alert("Congratulations, You won !!") ;
            }
        }) ;
    }
    new_game() ;
}


function random_nbs(maax , nb_des_nbs) {
    let cpt = 0 ;
    let arr = Array() ;
    while (cpt < nb_des_nbs) {
        let random =  Math.floor( Math.random() * maax) ;
        if (! (arr.includes(random))) {
            arr.push(random) ;
            cpt++ ;
        }
    }
    return arr ;
}

function block_all () {
    for (let i =0 ; i< buttons.length ; i++ ) {
        buttons[i].disabled = true ;
        buttons[i].style.background = COLOR_ENABLE ;
        buttons[i].textContent = game [Math.floor(i/line)][i%line] ;
        if (game [Math.floor(i/line)][i%line] == 0 ){
            buttons[i].style.color = COLOR_ENABLE ; 
        }
        if (game [Math.floor(i/line)][i%line] == -1) {
            buttons[i].style.background = COLOR_BOMB ;
            buttons[i].textContent = "*" ;
        }
    }
}

function reset_all () {
    discovered = 0 ;
    document.body.style.background = COLOR_NORMAL ;
    for (let button of buttons) {
        button.textContent = "." ;
        button.disabled = false ;
        button.style.background = COLOR_DISABLE ;
        button.style.color = COLOR_DISABLE ;

    }
    reset_tab() ;
    new_game() ;
}

function reset_tab() {
    for (let i =0 ; i< game.length ; i++) {
        
        for (let j =0 ; j< game[i].length ; j++) {
            game[i][j] =0 ;
        }   
    }  
}

function win() {
    return discovered + NB_BOMB == MAX ;
}
