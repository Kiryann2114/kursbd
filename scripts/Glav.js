window.addEventListener('load', e =>{
    localStorage.clear();
    let database_chat = JSON.parse(data_chat);
    let database = JSON.parse(data);
    if(localStorage.getItem("data")){
        database = JSON.parse(localStorage.getItem("data"));
    }
    localStorage.setItem("data",JSON.stringify(database));

    for(let i=0; i<database.length; i=i+1){
        document.getElementsByClassName('name_tov').item(i).textContent = database[i].name;
        document.getElementsByClassName('name_tov').item(i).onclick = function (){
            location.href=database[i].SRC;
        }
        document.getElementsByClassName('zena').item(i).textContent = database[i].zena.toString()+"₽";
        document.getElementsByClassName('kolich').item(i).textContent = database[i].kol;
        document.getElementsByClassName('im_tov').item(i).src = database[i].images[0];
        if(!database[i].inkorz){
            document.getElementsByClassName('btn_buy').item(i).textContent = "Добавить в корзину";
            document.getElementsByClassName('kol').item(i).style = "display:block"
        }
        else{
            document.getElementsByClassName('btn_buy').item(i).textContent = "Перейти в корзину";
            document.getElementsByClassName('kol').item(i).style = "display:none"
        }
        document.getElementsByClassName('btn_buy').item(i).onclick = function (){
            if(!database[i].inkorz){
                database[i].inkorz = true;
                document.getElementsByClassName('btn_buy').item(i).textContent = "Перейти в корзину";
                document.getElementsByClassName('kol').item(i).style = "display:none"
                localStorage.setItem("data",JSON.stringify(database));
            }
            else{
                location.href='html/Korzina.html';
            }
        };
        document.getElementsByClassName('btn_pl').item(i).onclick = function (){
            database[i].kol = database[i].kol + 1;
            document.getElementsByClassName('kolich').item(i).textContent = database[i].kol;
            localStorage.setItem("data",JSON.stringify(database));
        };
        document.getElementsByClassName('btn_mn').item(i).onclick = function (){
            if(database[i].kol !== 1){
                database[i].kol = database[i].kol - 1;
            }
            document.getElementsByClassName('kolich').item(i).textContent = database[i].kol;
            localStorage.setItem("data",JSON.stringify(database));
        };
    }
    document.getElementsByClassName('send').item(0).onclick = function (){
        if(document.getElementsByClassName('inp').item(0).value !== ""){
            document.getElementsByClassName('vopros').item(0).textContent = document.getElementsByClassName('inp').item(0).value;
            document.getElementsByClassName('vopros').item(0).style = "display:block";
            for(let i=0;i<database_chat.length;i=i+1){
                if(document.getElementsByClassName('vopros').item(0).textContent.toLowerCase().replace(/[\s.,%?!]/g, '') === database_chat[i].vopros){
                    document.getElementsByClassName('otvet').item(0).textContent = database_chat[i].otvet;
                    document.getElementsByClassName('otvet').item(0).style = "display:block";
                    break;
                }
                else {
                    document.getElementsByClassName('otvet').item(0).textContent = "Извините, но в моей базе данных нет ответа на данный вопрос";
                    document.getElementsByClassName('otvet').item(0).style = "display:block";
                }
            }
        }
    };

});