window.addEventListener('load', e =>{
    let database = JSON.parse(localStorage.getItem("data"));
    document.getElementById('clear').onclick = function (){
        Clear(database);
    };
    Update(database);
});

function Clear(database){
    for(let i=0; i<document.getElementsByClassName('korz_item').length; i=i+1){
        if(database[i].inkorz){
            database[i].inkorz = false;
            database[i].kol = 1;
            localStorage.setItem("data",JSON.stringify(database));
        }
    }
    Update(database);
}

function Update(database){
    let IDs = new Map();
    let vsego = 0;
    for(let i=0; i<document.getElementsByClassName('korz_item').length; i=i+1){
        if(!database[i].inkorz){
            document.getElementsByClassName('korz_item').item(i).style = "display:none"
        }
        else{
            vsego = vsego + database[i].zena * database[i].kol;
            document.getElementsByClassName('korz_item').item(i).style = "display:grid"
            document.getElementsByClassName('kol_korz').item(i).style = "display:block"
            IDs.set(database[i].id,database[i].kol);
        }
        document.getElementsByClassName('name_tov').item(i).textContent = database[i].name;
        document.getElementsByClassName('name_tov').item(i).onclick = function (){
            location.href="../"+database[i].SRC;
        }
        document.getElementsByClassName('im_tov').item(i).src = database[i].images[0];
        document.getElementsByClassName('zena_korz').item(i).textContent = database[i].zena.toString()+"₽";
        document.getElementsByClassName('kolich').item(i).textContent = database[i].kol;
        document.getElementsByClassName('btn_pl').item(i).onclick = function (){
            if(database[i].inkorz){
                database[i].kol = database[i].kol + 1;
                localStorage.setItem("data",JSON.stringify(database));
                Update(database);
            }
        };
        document.getElementsByClassName('btn_mn').item(i).onclick = function (){
            if(database[i].inkorz){
                if(database[i].kol === 1){
                    database[i].inkorz = false;
                }
                else{
                    database[i].kol = database[i].kol - 1;
                }
                localStorage.setItem("data",JSON.stringify(database));
                Update(database);
            }
        };
    }
    document.getElementsByClassName("Vsego").item(0).textContent = "Всего: "+ String(vsego) +"₽";

    var socket = io.connect('http://localhost:8080');
    let zapros = '';
    for (let pair of IDs.entries()) {
        zapros = zapros + 'select ID,НАименование,Цена*' + pair[1] + ',' + pair[1] + ' from Товары where ID = ' + pair[0] + '\n';
    }
    socket.emit('genChek', zapros);

    var button = document.getElementById('buy');
    button.addEventListener('click',() =>{
        let zapros = '';
        for (let pair of IDs.entries()) {
            zapros = zapros + 'Update Товары SET Количество = Количество - ' + pair[1] + 'where ID = ' + pair[0];
        }
        socket.emit('updatedata', zapros);
        Clear(database);
    })
}