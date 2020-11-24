const byRegion = document.getElementById("byRegion");
const byCountry = document.getElementById("byCountry");
const byCountryReiksme = byCountry.value;
const searchBtnRegion = document.getElementById("searchButton1");
const searchBtnCountry = document.getElementById("searchButton2");
const allCountries = document.getElementById("allCountries");
const ciaDedam = document.getElementById("ciaDedam");
const suggestionsList = document.getElementById("suggestionsList")
//"https://restcountries.eu/rest/v2/all"

const visosSalys = async () => {
try{
  console.log("labas")
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  const data = await response.json();
  //console.log(data)
  
  ciaDedam.innerHTML="";
  data.forEach(salis =>{
    //console.log(salis);
const cardDiv = document.createElement("div");
cardDiv.style.width = "16rem";
cardDiv.setAttribute("class", "text-center mr-2")
const flagImage = document.createElement("img");
flagImage.src = salis.flag;
const countryName = document.createElement("h4");
countryName.setAttribute("class", "text-light")
countryName.innerHTML = salis.name;
ciaDedam.appendChild(cardDiv);
cardDiv.appendChild(flagImage);
cardDiv.appendChild(countryName);
  })
}catch(error){
  console.log("Nepaejo!");
  console.log(error);
}
}

visosSalys();
allCountries.addEventListener("click", visosSalys);

//--------pagal regiona-------
const pagalRegiona = async () => {
  console.log("Regionu f-ja");
  //console.log(byRegion.value);
  const regionasPasirinktas = byRegion.value;
  try{
    const response = await fetch(`https://restcountries.eu/rest/v2/region/${regionasPasirinktas}`);
    const data = await response.json();
    //console.log(data);
    ciaDedam.innerHTML="";
     data.forEach(regionas =>{
const cardDiv = document.createElement("div");
cardDiv.style.width = "16rem";
cardDiv.setAttribute("class", "text-center mr-2")
const flagImage = document.createElement("img");
flagImage.src = regionas.flag;
const countryName = document.createElement("h4");
countryName.setAttribute("class", "text-light")
countryName.innerHTML = regionas.name;
ciaDedam.appendChild(cardDiv);
cardDiv.appendChild(flagImage);
cardDiv.appendChild(countryName);
  })
  }catch(error){
    console.log("Su regionais negerai!");
    console.log(error);
  }
}
searchBtnRegion.addEventListener("click", pagalRegiona);

//----------suggestions listas----------
const suggestions = async () => {
  try{
const response = await fetch("https://restcountries.eu/rest/v2/all");
const data = await response.json();
data.map(suggestion => {
  //console.log(suggestion.name)
  const option = document.createElement("option");
  option.innerHTML = suggestion.name;
  suggestionsList.appendChild(option);
})
  }catch(error){
    console.log("Su by country negerai!");
    console.log(error);
  }
}
byCountry.addEventListener("keyup", suggestions);

//----------pagal sali-------
const pagalSali = async () => {
  console.log("pagal sali f-ja");
  const reiksme = byCountry.value;
  console.log(reiksme);
  try{
    const response = await fetch(`https://restcountries.eu/rest/v2/name/${reiksme}`);
    const data = await response.json();
    console.log(data);
    ciaDedam.innerHTML="";
  data.forEach(salis => {
for(let valiuta in salis.currencies){
  for(let kalba in salis.languages){
    console.log(salis.languages[kalba].name)
  console.log(salis.currencies[valiuta].name)

ciaDedam.innerHTML = `<div class="" style="width: 23rem;">
  <img src="${salis.flag}" class="">
    <h5 class="text-center text-light">${salis.name}</h5>
    <p class="text-center">${salis.capital}</p>
    <p class="">Currency name: ${salis.currencies[valiuta].name}</p>
    <p class="">Native Language: ${salis.languages[kalba].name}</p>
</div>`}}
  })
  }catch(error){
    console.log("Su by country negerai!");
    console.log(error);
  }
}

searchBtnCountry.addEventListener("click", pagalSali);
