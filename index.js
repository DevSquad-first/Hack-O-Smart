
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { collection, getDoc, getDocs,setDoc,addDoc ,doc} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"


const firebaseConfig = {
  apiKey: "AIzaSyD4h4thmJz-S1OkkWZ701z9OeiYLcoEI0U",
  authDomain: "devsquad-1ed0c.firebaseapp.com",
  projectId: "devsquad-1ed0c",
  storageBucket: "devsquad-1ed0c.appspot.com",
  messagingSenderId: "567112454322",
  appId: "1:567112454322:web:3e52a2d970d606eb3af9ab"
};
const app = initializeApp(firebaseConfig);


const database=getFirestore(app)

// await setDoc(doc(database, "bus-stops","id"), 
// {
//     name:"Batwadi"
// });


var allbusdoc=await getDocs(collection(database,"bus-stops"))


// let container = document.getElementById("container");


var allbusdoc=await getDocs(collection(database,"bus-stops"))

// allbusdoc.forEach(element => {

//     console.log(element.data())
//     console.log(element.data().name)
//     console.log(element.data().dist)    

// });

allbusdoc.forEach(element => {



    // const stopwisediv=document.createElement("div")
    // stopwisediv.setAttribute("id",element.data().id)
    // // var docid=element.data().id



    const createDiv=document.createElement("div")
    createDiv.setAttribute("class","bus-stop")
    createDiv.setAttribute("id",element.data().id)
    createDiv.innerHTML=element.data().name
    //  document.getElementById(element.data().id).appendChild(createDiv)

    const createDiv1=document.createElement("div")
    createDiv1.setAttribute("class","bus-stop-dist")
    createDiv1.setAttribute("id",element.data().dist)
    createDiv1.innerHTML=element.data().dist
    // document.getElementById(element.data().id).appendChild(createDiv1)


    // document.getElementById("bus-stops-list").appendChild(stopwisediv)
    document.getElementById("bus-stops-list").appendChild(createDiv)
    document.getElementById("bus-stops-list").appendChild(createDiv1)
    
    
    console.log(element.data())
    console.log(element.data().name)
    console.log(element.data().dist)
});
drawChart();

        
async function drawChart() {   
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lati = position.coords.latitude;
    const lngi = position.coords.longitude;

    const response = await axios.post('http://localhost:5555/bus', {
        method: 'POST',
      data: {
        lat: ""+lati,
        lng: ""+lngi
      }
    });

    const dat = response.data;
    console.log(dat);

    var data = google.visualization.arrayToDataTable(dat);
    var options = {showTip: true};
    var chart = new google.visualization.Map(document.getElementById('bus-stop-map'));
    chart.draw(data, options);
  } catch (error) {
    console.log(error);
  }

  // google.charts.setOnLoadCallback(drawChart);

}