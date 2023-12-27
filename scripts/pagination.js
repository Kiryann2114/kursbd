let database = JSON.parse(data);
if(localStorage.getItem("data")){
    database = JSON.parse(localStorage.getItem("data"));
}
localStorage.setItem("data",JSON.stringify(database));
let html = "";
for (let j = 1; j <= database.length; j++) {
    html += '<div data-num='+ j +' class="num">\n' +
        '                <div class="tov_item">\n' +
        '                    <img src="" alt="" height="335px" class="im_tov">\n' +
        '                    <div class="name_tov"></div>\n' +
        '                    <div class="use_el">\n' +
        '                        <div class="kol">\n' +
        '                            <div>Кол-во:</div>\n' +
        '                            <div class="cont_kol">\n' +
        '                                <div class="btn_mn">-</div>\n' +
        '                                <div class="kolich">1</div>\n' +
        '                                <div class="btn_pl">+</div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="zena"></div>\n' +
        '                        <div class="btn_buy"></div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>';
}
document.getElementById("page").innerHTML += html;

let count = database.length; //всего записей
let cnt = 5; //сколько отображаем сначала
let cnt_page = Math.ceil(count / cnt); //кол-во страниц

//выводим список страниц
let paginator = document.querySelector(".paginator");
let page = "";
for (let i = 0; i < cnt_page; i++) {
    page += "<span data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
}
paginator.innerHTML = page;

//выводим первые записи {cnt}
let div_num = document.querySelectorAll(".num");
for (let i = 0; i < div_num.length; i++) {
    if (i < cnt) {
        div_num[i].style.display = "block";
    }
}

let main_page = document.getElementById("page1");
main_page.classList.add("paginator_active");

//листаем
function pagination(event) {
    let e = event || window.event;
    let target = e.target;
    let id = target.id;

    if (target.tagName.toLowerCase() != "span") return;

    let num_ = id.substr(4);
    let data_page = +target.dataset.page;
    main_page.classList.remove("paginator_active");
    main_page = document.getElementById(id);
    main_page.classList.add("paginator_active");

    let j = 0;
    for (let i = 0; i < div_num.length; i++) {
        let data_num = div_num[i].dataset.num;
        if (data_num <= data_page || data_num >= data_page)
            div_num[i].style.display = "none";

    }
    for (let i = data_page; i < div_num.length; i++) {
        if (j >= cnt) break;
        div_num[i].style.display = "block";
        j++;
    }
}