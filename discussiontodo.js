const subject = document.getElementById("subject");
const question = document.getElementById("question");
const submit = document.getElementById("submit");
const list = document.getElementById("list");

get("todo", function (error, data) {
    if (error) {
        alert(error);
    }
    else {
        let dataa = Array.from(data);
        dataa.forEach(function (d) {
            create(d.subject, d.question, d.id,d.flag,d.date);
        })
    }
});

submit.addEventListener("click", function () {
    var value1 = subject.value;
    var value2 = question.value;
    subject.value = "";
    question.value = "";
    var id = Math.random();
    create(value1, value2, id,0,Date.now());
    save(value1, value2, id,0,Date.now());
});

list.addEventListener("click", function (e) {
    document.getElementById("right1").style.display = "none";
    document.getElementById("right2").style.display = "block";
    if (e.target.classList.contains("hh") || e.target.classList.contains("pp")) {
        var inner = e.target.parentNode.innerHTML;
        var id = e.target.parentNode.getAttribute("id"); 
    }
    else if(e.target.classList.contains("material-symbols-rounded")){
        var inner = e.target.parentNode.parentNode.innerHTML;
        var id = e.target.parentNode.getAttribute("id");
        document.getElementById("right2").style.display = "none";
        document.getElementById("right1").style.display = "block";

        if(e.target.classList.contains("none")){
            e.target.classList.remove("none");
            e.target.classList.add("yellow");
            updateflag(1,e.target.parentNode.parentNode.getAttribute("id"));
            e.target.parentNode.parentNode.parentNode.innerHTML="";
            get("todo", function (error, data) {
                if (error) {
                    alert(error);
                }
                else {
                    let dataa = Array.from(data);
                    dataa.forEach(function (d) {
                        create(d.subject, d.question, d.id,d.flag,d.date);
                    })
                }
            });
        }
        else{
            e.target.classList.remove("yellow");
            e.target.classList.add("none");
            updateflag(0,e.target.parentNode.parentNode.getAttribute("id"));
            e.target.parentNode.parentNode.parentNode.innerHTML="";
            get("todo", function (error, data) {
                if (error) {
                    alert(error);
                }
                else {
                    let dataa = Array.from(data);
                    dataa.forEach(function (d) {
                        create(d.subject, d.question, d.id,d.flag,d.date);
                    })
                }
            });
            
        }
    }
    else {
        var inner = e.target.innerHTML;
        var id = e.target.getAttribute("id");
    }
    const para = document.querySelectorAll("#right-top");
    para[0].childNodes[3].setAttribute("id", id);
    para[0].childNodes[3].innerHTML = inner;
    para[0].childNodes[3].childNodes[4].style.display="none";


    get("todo", function (error, data) {
        if (error) {
            alert(error);
        }
        else {
            let dataa = Array.from(data);
            createresponses(dataa,id);
        }
    });
});

const newform = document.getElementById("new-form");
newform.addEventListener("click", function () {
    document.getElementById("right2").style.display = "none";
    document.getElementById("right1").style.display = "block";
});

const namee = document.getElementById("name");
const response = document.getElementById("response");
const submitres = document.getElementById("submit-res");
const namelist = document.getElementById("namelist");

submitres.addEventListener("click", function (e) {
    var value1 = namee.value;
    var value2 = response.value;
    var obj = { name: value1, response: value2 , thumbup:0,thumbdown:0};
    namee.value = "";
    response.value = "";
    const sublist = document.createElement("li");
    var inner = `<h3 class="hh1">${value1}</h3>
    <p class="pp1">${value2}</p>
    <span class="material-symbols-rounded thumbup" style="margin-top:-25px; margin-right:60px; float :right;">thumb_up</span>
    <span style="margin-top:-25px; margin-right:50px; float :right;">0</span>
    <span class="material-symbols-rounded thumbdown" style="margin-top:-25px; margin-right:15px; float :right;">thumb_down</span>
    <span style="margin-top:-25px; margin-right:5px; float :right;">0</span><hr>`
    sublist.innerHTML = inner;
    sublist.setAttribute("class", "sublist1");
    var idd=Math.random();
    obj.idd=idd;
    obj.diff=0;
    sublist.setAttribute("id", idd);

    namelist.appendChild(sublist);

    const para = document.querySelectorAll("#right-top");
    const id = para[0].childNodes[3].getAttribute("id");
    saveresponse(id, obj);
});

namelist.addEventListener("click",function(e){
    if(e.target.classList.contains("thumbup")){
        updatediff(1,e.target.parentNode.getAttribute("id"));
    }else if(e.target.classList.contains("thumbdown")){
        updatediff(2,e.target.parentNode.getAttribute("id"));
    }
})

const searchquestion = document.getElementById("search-question");
// var temp=0;
searchquestion.addEventListener("keyup", function (e) {

    const tofind = searchquestion.value;
    const list = document.getElementById("list");
    const li = list.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        var value = li[i].childNodes[0].innerText;
        console.log(tofind);
        if (value.search(tofind) === -1) {
            li[i].style.display = "none";
            // temp++;
            // list.remove("h1");
        }
        else {
            li[i].style.display = "block";
        //     temp=0;
        //     list.remove("h1");
         }
    }
    // if(temp!=0){
    //     alert("not found");
    //     const notfound = document.createElement("h1");

    //     notfound.textContent=`No subject found with ${tofind}`;
    //     list.append(notfound);
    // }

    if (tofind === "") {
        for (var i = 0; i < li.length; i++) {
            li[i].style.display = "block";
            temp=0;
        }
    }
})

const resolve = document.getElementById("resolve");
resolve.addEventListener("click", function () {
    const id = resolve.previousElementSibling.getAttribute("id");
    const list = document.getElementById("list");
    const li = list.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        if (li[i].getAttribute("id") == id) {
            li[i].remove();
            resolve.previousElementSibling.innerHTML = "";
        }
    }
    deletee(id);
    document.getElementById("right2").style.display = "none";
    document.getElementById("right1").style.display = "block";
})

function create(value1, value2, id,flag,date) {
    const sublist = document.createElement("li");
    if(flag){
        var inner = `<h2 class="hh">${value1}</h2>
        <p class="pp">${value2}<span class="material-symbols-rounded yellow" >grade</span></p>
        <p class="t" style="font-weight:bold"></p><hr>`
        sublist.innerHTML = inner;
    }else{
        var inner = `<h2 class="hh">${value1}</h2>
        <p class="pp">${value2}<span class="material-symbols-rounded none" >grade</span></p>
        <p class="t" style="font-weight:bold"></p><hr>`
        sublist.innerHTML = inner;
    }

    setInterval(()=>{
        var temp= time(date);
        var p=sublist.querySelector(".t");
        p.textContent=temp;
    },1000);

    sublist.setAttribute("class", "sublist");
    sublist.setAttribute("id", id);
    list.appendChild(sublist);
}

function save(value1, value2, id,flag,date) {
    var obj = { subject: value1, question: value2, id: id,flag: flag ,date : date};
    get("todo", function (err, data) {
        if (err) {
            alert(err);
        }
        else {
            data.push(obj);
            localStorage.setItem("todo", JSON.stringify(data));
        }
    });
}

function get(todo, callback) {
    var todostring = localStorage.getItem("todo") || "";
    if (todostring.length === 0) {
        todostring = "[]";
    }
    try {
        todostring = JSON.parse(todostring);
        callback(null, todostring);
    }
    catch (error) {
        callback(error, []);
    }
}

function deletee(id) {
    get("todo", function (error, data) {
        if (error) {
            alert(error);
        }
        else {
            let dataa = Array.from(data);
            const filteredTodos = dataa.filter(function (dataaItem) {
                return dataaItem.id !== Number(id);
            });
            localStorage.setItem("todo", JSON.stringify(filteredTodos));
        }
    })
}

function saveresponse(id, obj) {
    get("todo", function (error, data) {
        if (error) {
            alert(error);
        }
        else {
            //console.log(data);
            for (d of data) {
                if ((Number)(d.id) == (Number)(id)) {
                    if (d.responses)
                        d.responses.push(obj);
                    else {
                        d.responses = [];
                        d.responses.push(obj);
                    }
                }
            }
            localStorage.setItem("todo", JSON.stringify(data));
        }
    });
}

function createresponses(data,id) {
    const namelist = document.getElementById("namelist");

    namelist.innerHTML="";
    for (var d of data) {
        if(Number(d.id)===Number(id) && d.responses ){
        for(var i=0;i<d.responses.length;i++){
        const sublist = document.createElement("li");
        var inner = `<h3 class="hh1">${d.responses[i].name}</h3>
        <p class="pp1">${d.responses[i].response}</p>
        <span class="material-symbols-rounded thumbup" style="margin-top:-25px; margin-right:60px; float :right;">thumb_up</span>
        <span style="margin-top:-25px; margin-right:50px; float :right;">${d.responses[i].thumbup}</span>
        <span class="material-symbols-rounded thumbdown" style="margin-top:-25px; margin-right:15px; float :right;">thumb_down</span>
        <span style="margin-top:-25px; margin-right:5px; float :right;">${d.responses[i].thumbdown}</span><hr>`
        sublist.innerHTML = inner;
        sublist.setAttribute("class", "sublist1");
        sublist.setAttribute("id", d.responses[i].idd);
        namelist.appendChild(sublist);
        }
    }
    }
}
function updateflag(track,id){
    get("todo",function(error,data){
        if (error) {
            alert(error);
        }
        else {
            let dataa = Array.from(data);
            const filteredTodos = dataa.filter(function (dataaItem) {
                if (dataaItem.id !== Number(id)){
                    return true;
                }
                else{
                    if(dataaItem.flag){
                        dataaItem.flag=0;
                        return true;
                    }
                    else{
                        dataaItem.flag= 1 ;
                        return true;
                    }
                }
            });
            dataa=filteredTodos;
            myFunction();
            function myFunction() {
                dataa.sort(function(a, b){
                  let x = a.flag;
                  let y = b.flag;
                  if (x < y) {return 1;}
                  if (x > y) {return -1;}
                  return 0;
                });
              }
            localStorage.setItem("todo", JSON.stringify(dataa));
        }
    });
}

function updatediff(val,id){
    get("todo", function (error, data) {
        if (error) {
            alert(error);
        }
        else {
            let dataa = Array.from(data);
            for(var d of dataa){
                if(d.responses){
                for(var i=0;i<d.responses.length;i++){
                    if(Number(d.responses[i].idd)===Number(id)){
                        var tempid=d.id;
                        if(val==1){
                            d.responses[i].thumbup++;
                            d.responses[i].diff= d.responses[i].thumbup-d.responses[i].thumbdown;
                        }else if(val==2){
                            d.responses[i].thumbdown++;
                            d.responses[i].diff= d.responses[i].thumbup-d.responses[i].thumbdown;
                        }
                    }
                }
                myFunction();
                    function myFunction() {
                        d.responses.sort(function(a, b){
                          let x = a.diff;
                          let y = b.diff;
                          if (x < y) {return 1;}
                          if (x > y) {return -1;}
                          return 0;
                        });
                      }
                    }
            }
            createresponses(dataa,tempid);
            localStorage.setItem("todo", JSON.stringify(dataa));
            console.log(dataa);
        }
    });
}
function time(d)
        {
            let current_date=new Date();
            d=new Date(d);
            let timeDifference=current_date-d;
            console.log(timeDifference);
            const seconds = Math.floor(timeDifference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if(days>0){
                return `${days} day ago `;
            }
            else if(hours>0){
                return `${hours} hour ago `;
            }
            else if(minutes>0){
                return `${minutes} minute ago `;
               
            }
            else{
                if(seconds<10){
                    return "Just Now";
                }
                else{
                     return `${seconds} seconds ago`;
                    }
                } 
        }