let coinData;

document.querySelector('.introBtn').addEventListener('click', function () {
  // Hide introImage with transition
  const introImage = document.querySelector('.introImage');
  introImage.classList.add('hidden');

  // transition effect
  setTimeout(() => {
    introImage.style.opacity = 0;
  }, 500);

  setTimeout(() => {
    introImage.style.display = 'none';
  }, 750);

  // Display "Select a metal"
  const metalOptionsTitle = document.getElementById('metalOptionsTitle');
  metalOptionsTitle.style.opacity = 90;
  metalOptionsTitle.style.display = 'block'; 

  // Transition Metal Dropdowns
  const metals = document.getElementById('metalOptions');
  setTimeout(() => {
    metals.style.display = 'flex';
  }, 1000);

  // Hide Intro Button
  const introButton = document.querySelector('.introBtn');
  introButton.classList.add('hidden');
  setTimeout(() => {
    introButton.style.display = 'none';
  }, 750);
});


function metalOptions(jsonFile) {
  // Fetch data from the JSON file
  fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
      
      // Get the container element
      const container = document.getElementById('metalOptions');
      

      data.forEach((d) => {
        const metalButton = document.createElement('button');
        metalButton.style.backgroundImage = `url(${d.primaryImage})`;

        metalButton.imgSrc = d.primaryImage;
        // Button names match that of metals
        const label = document.createElement('label');
        label.textContent = d.name;
        const metalText = d.metalText;

        metalButton.addEventListener('click', () => {
          const imgSrc = metalButton.imgSrc;
          
          // Create an image element
          const imgElement = document.createElement('img');
          imgElement.src = imgSrc;
          
          // Clear the content of the .metalImage element before appending the new image
          const metalImageContainer = document.querySelector('.metalImage');
          metalImageContainer.innerHTML = '';
          
          // Append the image to the .metalImage container
          metalImageContainer.appendChild(imgElement);

          // Metal Caption
          const metalCaption = document.querySelector('.metalImage-caption');
          metalCaption.textContent = metalText;
          
          

          //
          const coinOptionsTitle = document.getElementById('coinOptionsTitle');
          setTimeout(() => {
            coinOptionsTitle.textContent = `Select a ${d.name} coin`;
            coinOptionsTitle.style.display = 'block';
          }, 750);

          // Display Coin Dropdowns attached
          setTimeout(() => {
            coinType(d.coinOptions);
          }, 1500);
        });

        

        container.appendChild(metalButton);
        container.appendChild(document.createElement('br'));
        container.appendChild(label);
      });
    });
}

async function dataLoad() {
  try {
    const response = await fetch('js/coinDetails.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    coinData = Array.from(await response.json());
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

dataLoad();


// Creating a varying coin dropdown.
function coinType(coinOptions) {
  // Get the container element
  const acontainer = document.getElementById('coinOptions');
  acontainer.innerHTML = '';

  // Get image container element
  const bcontainer = document.querySelector('.coinImage');

  // Get the HTML element where you want to display the coinText
  const coinTextElement = document.getElementById('coinText');

  coinOptions.forEach((coinName) => {
    const coinButton = document.createElement('button');
    coinButton.textContent = coinName;
    coinButton.name = 'coinNames';
    coinButton.value = coinName;

    // console.log(coinData);
    const coinImage = document.createElement('img');

    // console.log(coinImage);

    coinButton.addEventListener('click', (e) => {
      var coinStackBarElement = document.getElementById('coinStackBar');
      console.log(e.target.value);
      const newlySelectedCoin = e.target.value;
      const coinObject = coinData.find(
        (coin) => coin.coinName === newlySelectedCoin
      );


      const metalName = coinObject.mainMetal;
      console.log(metalName);

      console.log(newlySelectedCoin);
      const coinNumber = coinObject.coinProduced;

      document.querySelector('#value').innerText = coinNumber;
      document.querySelector('#medium').innerText = newlySelectedCoin;
      document.querySelector('#selectedMetal').innerText = metalName;
      let activator = document.querySelector('.transformationBtn');

      const coinStackActivator = document.getElementById('coinStackActivator');
      coinStackActivator.append(activator);
      activator.style.display = 'flex';

      bcontainer.innerHTML = '';
      bcontainer.appendChild(coinImage);

      // Extract the coinText from the coin object
      const coinText = coinObject.coinText;
      coinTextElement.textContent = coinText;
      coinTextElement.style.color = 'blue';

      activator.addEventListener('click', function (e) {
        coinLabel.style.display = 'flex';
        var element = document.getElementById('CoinStackBar');
        element.innerHTML = '';

        window.requestAnimFrame = (function (callback) {
          return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
              window.setTimeout(callback, 1000 / 60);
            }
          );
        })();

        function setup() {
          if (!document.createElement('svg').getAttributeNS) {
            var coinimg = ['uk_penny.png']; // eastAfrican_cent.jpg 'uk_penny.jpg']['bitcoin.png','bitcoin-silver.png','bitcoin-copper.png'];//'bitcoin.png';//['bitcoin.png','bitcoin-silver.png','bitcoin-copper.png'];
          } else {
            coinimg = ['uk_penny.svg']; //'eastAfrican_cent.svg'[ 'uk_penny.svg''bitcoin.svg', 'bitcoin-silver.svg', 'bitcoin-copper.svg'];//'bitcoin.svg';//['bitcoin.svg', 'bitcoin-silver.svg', 'bitcoin-copper.svg'];
          }

          cs = new CoinStackBar({
            container: document.getElementById('CoinStackBar'),
            coinimgsrc: coinimg,
            coinimgwidth: 1500,
            coinimgheight: 1000,
            coinheight: 30,
            xoffset: 250,
            yoffset: 250,

            startvalue: 0,
            maxstackheight: 500,
            maxstackwidth: 500,
            // containerwidth: 150,
            containerheight: 550,
            showshadow:false,
          });

          requestAnimFrame(test);
        }
        test = function () {
          document
            .getElementById('CoinStackBar')
            .CoinStackBar.setValue(coinNumber);
          console.log(coinNumber);

        };
        setup();
      });

      // Extract CoinImage
      coinImage.src = coinObject.coinIcon;
      coinImage.alt = coinText;
    });
    acontainer.appendChild(coinButton);
    acontainer.appendChild(document.createElement('br'));
  });
}

metalOptions('js/material.json');