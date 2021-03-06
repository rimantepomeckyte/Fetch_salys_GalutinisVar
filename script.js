const byRegion = document.getElementById("byRegion");
const byCountry = document.getElementById("byCountry");
const searchBtnRegion = document.getElementById("searchButton1");
const searchBtnCountry = document.getElementById("searchButton2");
const allCountries = document.getElementById("allCountries");
const ciaDedam = document.getElementById("ciaDedam");
const suggestionsList = document.getElementById("suggestionsList")
//"https://restcountries.eu/rest/v2/all"

const visosSalys = async () => {
    try {
        console.log("labas")
        const response = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await response.json();
        //console.log(data)

        ciaDedam.innerHTML = "";
        data.forEach(salis => {
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
    } catch (error) {
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
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/region/${regionasPasirinktas}`);
        const data = await response.json();
        //console.log(data);
        ciaDedam.innerHTML = "";
        data.forEach(regionas => {
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
            byRegion.value ="";
        })
    } catch (error) {
        console.log("Su regionais negerai!");
        console.log(error);
    }
}
searchBtnRegion.addEventListener("click", pagalRegiona);

//----------suggestions listas----------
const suggestions = async () => {
    const reiksme = byCountry.value;
    console.log(reiksme)
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${reiksme}`);
        const data = await response.json();
        console.log(data);
        while (suggestionsList.firstChild){
            suggestionsList.removeChild(suggestionsList.firstChild);
        }
        for (let i = 0; i < data.length; i++) {
            const option = document.createElement("option");
            suggestionsList.appendChild(option);
            option.innerHTML = data[i].name;
        }
    } catch (error) {
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

    try {
        if(reiksme == ''){
            alert("Please enter country name")
        }else{
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${reiksme}`);
        const data = await response.json();
        console.log(data);
        ciaDedam.innerHTML = "";
        data.forEach(salis => {
            const divas = document.createElement("div");
            divas.setAttribute("class", "mr-2");
            divas.style.width = "18rem"
            const image = document.createElement("img");
            image.src = salis.flag;
            const salisName = document.createElement("h4");
            salisName.setAttribute("class", "text-center text-light")
            salisName.innerHTML = salis.name;
            const salisCapital = document.createElement("p");
            salisCapital.setAttribute("class", "text-center");
            salisCapital.style.fontSize = "14px";
            salisCapital.innerHTML = salis.capital;
            const valiutList = document.createElement("ul");
            valiutList.style.listStyleType = "none";
            valiutList.style.fontSize = "14px";
            valiutList.setAttribute("class", "text-light");
            valiutList.innerHTML = "Currencies: ";
            const kalbuList = document.createElement("ul");
            kalbuList.setAttribute("class", "text-light");
            kalbuList.style.listStyleType = "none";
            kalbuList.style.fontSize = "14px";
            kalbuList.innerHTML = "Languages: "
            ciaDedam.appendChild(divas);
            divas.appendChild(image);
            divas.appendChild(salisName);
            divas.appendChild(salisCapital);
            divas.appendChild(valiutList);
            divas.appendChild(kalbuList);

            for (let valiuta in salis.currencies) {
                console.log(salis.currencies[valiuta].name);
                const valiutItems = document.createElement("li");
                valiutItems.setAttribute("class", "text-dark")
                valiutItems.innerHTML = salis.currencies[valiuta].name;
                valiutList.appendChild(valiutItems);
            }
            for (let kalba in salis.languages) {
                console.log(salis.languages[kalba].name);
                const kalbuItems = document.createElement("li");
                kalbuItems.setAttribute("class", "text-dark")
                kalbuItems.innerHTML = salis.languages[kalba].name;
                kalbuList.appendChild(kalbuItems);
            }
            byCountry.value= "";
            /*for (let valiuta in salis.currencies) {
                for (let kalba in salis.languages) {
                    console.log(salis.languages[kalba].name)
                    console.log(salis.currencies[valiuta].name)

                    divas.innerHTML = `<div class="" style="width: 20rem;">
  <img src="${salis.flag}" class="">
    <h5 class="text-center text-light">${salis.name}</h5>
    <p class="text-center">${salis.capital}</p>
    <p class="">Currency name: ${salis.currencies[valiuta].name}</p>
    <p class="">Official Language: ${salis.languages[kalba].name}</p>
</div>`
                }
            }*/

        })}
    } catch (error) {
        console.log("Su by country negerai!");
        console.log(error);
    }
}

searchBtnCountry.addEventListener("click", pagalSali);
