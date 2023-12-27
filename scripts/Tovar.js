function LoadTov(i){
    let imActiv = 0;
    let database = JSON.parse(data);
    if(localStorage.getItem("data")){
        database = JSON.parse(localStorage.getItem("data"));
    }
    localStorage.setItem("data",JSON.stringify(database));

    document.getElementsByClassName('name_tov_tov').item(0).textContent = database[i].name;
    document.getElementsByClassName('op_tov').item(0).textContent = database[i].opisanie;
    document.getElementsByClassName('zena_tov').item(0).textContent = database[i].zena.toString()+"₽";
    document.getElementsByClassName('kolich').item(0).textContent = database[i].kol;
    document.getElementsByClassName('im_tov_tov').item(0).src = database[i].images[imActiv];
    if(!database[i].inkorz){
        document.getElementsByClassName('btn_buy_tov').item(0).textContent = "Добавить в корзину";
        document.getElementsByClassName('kol_tov').item(0).style = "display:block"
        document.getElementsByClassName('zena_tov').item(0).style = "grid-column-start: 2"
    }
    else{
        document.getElementsByClassName('btn_buy_tov').item(0).textContent = "Перейти в корзину";
        document.getElementsByClassName('kol_tov').item(0).style = "display:none";
        document.getElementsByClassName('zena_tov').item(0).style = "grid-column-start: 1"
    }
    document.getElementsByClassName('btn_buy_tov').item(0).onclick = function (){
        if(!database[i].inkorz){
            database[i].inkorz = true;
            document.getElementsByClassName('btn_buy_tov').item(0).textContent = "Перейти в корзину";
            document.getElementsByClassName('kol_tov').item(0).style = "display:none"
            document.getElementsByClassName('zena_tov').item(0).style = "grid-column-start: 1"
            localStorage.setItem("data",JSON.stringify(database));
        }
        else{
            location.href='../html/Korzina.html';
        }
    };
    document.getElementsByClassName('btn_pl').item(0).onclick = function (){
        database[i].kol = database[i].kol + 1;
        document.getElementsByClassName('kolich').item(0).textContent = database[i].kol;
        localStorage.setItem("data",JSON.stringify(database));
    };
    document.getElementsByClassName('btn_mn').item(0).onclick = function (){
        if(database[i].kol !== 1){
            database[i].kol = database[i].kol - 1;
        }
        document.getElementsByClassName('kolich').item(0).textContent = database[i].kol;
        localStorage.setItem("data",JSON.stringify(database));
    };
    document.getElementsByClassName('next_slide').item(0).onclick = function (){
        if(imActiv === database[i].images.length-1) {
            imActiv = 0;
        }
        else{
            imActiv = imActiv + 1;
        }
        document.getElementsByClassName('im_tov_tov').item(0).src = database[i].images[imActiv];
    };
    document.getElementsByClassName('back_slide').item(0).onclick = function (){
        if(imActiv === 0) {
            imActiv = database[i].images.length-1;
        }
        else{
            imActiv = imActiv - 1;
        }
        document.getElementsByClassName('im_tov_tov').item(0).src = database[i].images[imActiv];
    };
}