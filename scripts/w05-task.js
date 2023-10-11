/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
let templeList = [];

/* async displayTemples Function */
function displayTemples (templeList) {
    templeList.forEach( (element) => {
    let templeName = document.createElement("h3");
    let newImage = document.createElement("img");
    newImage.setAttribute("src", element.imageUrl);
    newImage.setAttribute("alt", element.location );
    newImage.setAttribute("style", "max-width:400px;");
    let article = document.createElement("article");
    article.append(templeName, newImage);
    templesElement.appendChild(article);
});
}
/* async getTemples Function using fetch()*/
const getTemples = async () => {
    try {
        const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        templeList = data; // Set the global templeList to the fetched data
        displayTemples(templeList); // Call displayTemples function
        console.log(templeList);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

/* reset Function */
function reset() {
    document.getElementById("temples").innerHTML = "";
  }

/* sortBy Function */
function sortBy (temples) {
    reset (); //Call the reset function to clear the output
    const filter = document.querySelector("#sortBy").value;
    switch (filter) {
        case "utah":
            // Filter for temples where the location contains "Utah" as a string
            const utahTemples = temples.filter(temp => temp.location.includes("Utah"));
            displayTemples(utahTemples);
            break;
        
        case "notutah":
            // Filter for temples where the location does not contain "Utah" as a string
            const notUtahTemples = temples.filter (temp => !temp.location.includes("Utah"));
            displayTemples(notUtahTemples);
            break;
        
        case "older":
            // Filter for temples where the dedicated date is before 1950
            const olderTemples = temples.filter(temp => new Date(temp.dedicated) < new Date(1950, 0, 1));
            displayTemples(olderTemples);
            break;

        case "all":
            // No filter, just use 'temples' as the argument
            displayTemples(temples);
            break;
    }
}
/* Event Listener */
document.querySelector("#sortBy").addEventListener("change", () => {sortBy(
    templeList);
});

getTemples();