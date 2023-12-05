// select the big svg container
// const svg = d3.select("#svg")

let coinData;

document.querySelector('.introBtn').addEventListener('click',function(){
    document.getElementById('metalOptions').style.display='flex'
})

function metalOptions(jsonFile){
      // Fetch data from the JSON file
      fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
          // Get the container element
          const container = document.getElementById('metalOptions');
          container.innerHTML=''

          data.forEach(d => {
            const metalButton = document.createElement('input');
            metalButton.type = 'radio';
            metalButton.name = 'metalNames';
            metalButton.value = d.name;
            metalButton.imgSrc = d.primaryImage;
            
            // Button names match that of metals
            const label = document.createElement('label');
            label.textContent = d.name;
            label.position = 'relative';
            label.style.color = 'red';
            

            metalButton.addEventListener('click', () => {
                coinType(d.coinOptions);
                console.log(metalButton.imgSrc)
              
                const imgSrc = metalButton.imgSrc; // Replace this with your actual image source
    
                // Create an image element
                const imgElement = document.createElement('img');
                imgElement.src = imgSrc;
            
                // Clear the content of the .metalImage element before appending the new image
                const metalImageContainer = document.querySelector('.metalImage');
                metalImageContainer.innerHTML = '';
            
                // Append the image to the .metalImage container
                metalImageContainer.appendChild(imgElement);
    
            });

            container.appendChild(metalButton);
            container.appendChild(label);
            container.appendChild(document.createElement('br'))
          })

})
}


async function dataLoad() {
  
    try {
        const response = await fetch("js/coinDetails.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        coinData = Array.from(await response.json());
        console.log(coinData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    
dataLoad();

const bcointainer = document.getElementById('coinText');


// Creating a varying coin dropdown.
function coinType(coinOptions){
    // Get the container element
    const acontainer = document.getElementById('coinOptions');
    acontainer.innerHTML=''
    
  // Get the HTML element where you want to display the coinText
  const coinTextElement = document.getElementById('coinText');


    coinOptions.forEach(coinName => {
        const coinButton = document.createElement('input');
        coinButton.type = 'radio';
        coinButton.name = 'coinNames';
        coinButton.value = coinName;
   
        const coinLabel = document.createElement('label');
        coinLabel.textContent = coinName;
    
        coinButton.addEventListener('click', (e) => {
            const selectedCoin = e.target.value;
             // Find the corresponding coin object from the JSON data
            const coinObject = coinData.find((coin) => coin.coinName === selectedCoin);
          
      // Extract the coinText from the coin object
            const coinText = coinObject.coinText;
            coinTextElement.textContent = coinText;
            coinTextElement.style.color = 'blue';
        });

        acontainer.appendChild(coinButton);
        acontainer.appendChild(coinLabel);
        acontainer.appendChild(document.createElement('br'));

        
    });
}


// function coinDetail(selectedCoinName, coinDetails){
//     const bcointainer = document.getElementById('coinText');
//     const radioCoin =  coinDetails.find(coin => coin.coinName === selectedCoinName )

//     if (radioCoin) {
//         bcointainer.textContent = radioCoin.coinText;
//     } else {
//         console.error(`No details found for coin: ${selectedCoinName}`);
//         bcointainer.textContent = ''; // Clear the content if no details are found
//     }
// }

metalOptions('js/material.json');





// D




















// const coinWeights = {
//     'cent': 2.5,
//     'nickel': 5,
//     'dime': 2.268,
//     'quarters': 5.67,
//     'half_dollar': 11.34,
//     'dollar': 8.1 
// };

// Getting Material data - Working!
// d3.json('js/material.json').then(function (materialData) {
//     console.log(materialData)

//     createButtons(materialData)
//     activeButton("selected")
// });

// // Create Buttons based on data
// function createButtons(data){
//     //Derive names & Buttons
//     const metal = data.map(d => d.Name)

//      // make all these buttons
//      const buttons = d3.select("#buttons")
//      .selectAll("input")

//      // the input data are names
//      .data(metal)
//      .join("input")
//      .attr("type", "button")

//      // give them a className
//      .attr("class", "nonSelected")

//      // the value is the text on the data
//      .attr("value", d => d)

//      // what happens when you click on the button?
//      .on("click", function (e, d) {

//         // the active button turns into nonselected
//         activeButton("nonSelected");

//         // what's the index of the button that is being clicked?
//         index = buttons.nodes()
//         .indexOf(this);

//         // turn the new active button into selected!
//         activeButton("selected")
//      })

// }

// // a helper function for changing the state of our button
// function activeButton(className) {
//     d3.select(`input:nth-child(${index+1})`).attr("class", className);
// }





// let totalAmountCents = 38631544;

// const coinCounts = {};

// for (const weight in coinWeights) {
//     const coinValue = coinWeights[weight];
//     const count = Math.floor(totalAmountCents / coinValue);
//     coinCounts[weight] = count;
//     totalAmountCents = count * coinValue;
// }

// const coinVisualization = document.getElementById("coinVisualization");

// for (const weight in coinCounts) {
//     const count = coinCounts[weight];
//     if (count > 0) {
//         const coinDiv = document.createElement("div");
//         coinDiv.textContent = `${weight}: ${count}`;
//         coinVisualization.appendChild(coinDiv);
//     }
// }


// function createCoinStack(numCoins) {
//     const svg = document.getElementById('coinStack');
//     const coinRadius = 10; // Radius of each coin
//     const spacing = 1; // Spacing between coins

//     for (let i = 0; i < numCoins; i++) {
//       const coin = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
//       coin.setAttribute('cx', 250); // X-coordinate (centered in the SVG)
//       coin.setAttribute('cy', 500 - coinRadius - i * (2 * coinRadius + spacing)); // Y-coordinate
//       coin.setAttribute('r', coinRadius); // Radius
//       coin.setAttribute('fill', 'gold'); // Coin color
//       svg.appendChild(coin);
//     }
//   }

//   // Call the function to create a stack of 1000 coins
//   createCoinStack(10);

