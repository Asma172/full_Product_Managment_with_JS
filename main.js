let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let temp; 


function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value ) - 
        +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }
}

//create priduct
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(title.value !== '' && price.value !== '' && newPro.count < 200){
        if(mood === "create"){
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[temp] = newPro;
            mood = 'create';
            submit.innerHTML = "create";
            count.style.display = "block";
        }
        clearData()
    }
    
    localStorage.setItem('product',   JSON.stringify(dataPro))
    console.log(dataPro);
    showData()
} 




//clear inputs

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


//Read

function showData(){
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
        <td>${[i+1]}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`
    }
    getTotal()
    document.getElementById("tbody").innerHTML = table;
    let btnDA = document.getElementById("deleteAll");

    if(dataPro.length > 0){
        btnDA.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
    }else{
        btnDA.innerHTML = '';
    }
}

showData()

//Delete

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

//Delete All

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

//count


//Update

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display="none";
    category.value = dataPro[i].category;
    submit.innerHTML = "Update"

    mood = "Update"
    temp = i;

    scroll({
        top: 0,
        behavior: "smooth",
    })
}

//Search

let searchMood = "title";
function getSearch(id){
    if(id == "searchTitle"){
        searchMood = 'title';

    }else{
        searchMood = "category"
    }
    search.placeholder = "Search By "+ searchMood;
    search.focus()
    search.value = '';
    showData()
}

function searchData(value){
    let table = '';
    if(searchMood === 'title'){
        for(let i=0; i< dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
        <tr>
        <td>${[i]}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`
            }
        }
    }else{
        for(let i=0; i< dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
        <tr>
        <td>${[i]}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;
}


//Clean Data












