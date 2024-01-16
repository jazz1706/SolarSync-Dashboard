// Define a mapping of house names to arrays of column numbers
const houseColumnMap = {
    "Zsolarpowerwall2": [0, 2, 3, 4], // Example mapping for Zsolarpowerwall2 having columns 2, 3, and 4
    "Xider": [0, 5, 6, 7], // Example mapping for Xider having columns 5, 6, and 7
    "SR Solaredge": [0,8,9,10], // Column numbers for SR Solaredge
    "Shygar-A": [0,11,12,13], // Column numbers for Shygar-A
    "Shanon Ranch Valia": [0,14,15,16], // Column numbers for Shanon Ranch Valia
    "SDN-Eagle200": [0,17,18,19], // Column numbers for SDN-Eagle200
    "Rust Ohlone": [0,20,21,22], // Column numbers for Rust Ohlone
    "Portola Springs - Irvine CA": [0,23,24,25], // Column numbers for Portola Springs - Irvine CA
    "ParkCrest_A": [0,26,27,28], // Column numbers for ParkCrest_A
    "nedriv PV": [0,29,30,31], // Column numbers for nedriv PV
    "Barry's Grid": [0,32,33,34], // Column numbers for Barry's Grid
    "Chateau Rando": [0,35,36,37], // Column numbers for Chateau Rando
    "Chula Vista, CA by the Lakes": [0,38,39,40], // Column numbers for Chula Vista, CA by the Lakes
    "Chez Bier-Lem": [0,41,42,43], // Column numbers for Chez Bier-Lem
    "cwsm": [0,44,45,46], // Column numbers for cwsm
    "dublin-hills": [0,47,48,49], // Column numbers for dublin-hills
    "Hacienda de Gomez": [0,50,51,52], // Column numbers for Hacienda de Gomez
    "Mt. Tiburon CA": [0,53,54,55], // Column numbers for Mt. Tiburon CA
    "Hadleigh of South Hills": [0,56,57,58], // Column numbers for Hadleigh of South Hills
    "Heitman House": [0,59,60,61], // Column numbers for Heitman House
    "Modesto (Village One)": [0,62,63,64], // Column numbers for Modesto (Village One)
    "Los Angeles Home": [0,65,66,67], // Column numbers for Los Angeles Home
    "LN Home": [0,68,69,70], // Column numbers for LN Home
    "HHG-Plano": [0,71,72,73], // Column numbers for HHG-Plano
    "Little Orchard Solar": [0,74,75,76], // Column numbers for Little Orchard Solar
    "JakePV": [0,77,78,79], // Column numbers for JakePV
    "Koko wa Greenwood": [0,80,81,82], // Column numbers for Koko wa Greenwood
    "Rendezvous Ridge": [0,83,84,85], // Column numbers for Rendezvous Ridge
    "Rendezvous Totals": [0,86,87,88], // Column numbers for Rendezvous Totals
    "San_Diego_RP": [0,89,90,91], // Column numbers for San_Diego_RP
    "Schaffer": [0,92,93,94], // Column numbers for Schaffer
    "SolarEdge24": [0,95,96,97], // Column numbers for SolarEdge24
    "Smiser Residence": [0,98,99,100] // Column numbers for Smiser Residence
  };

  function readCSV() {
    const houseSelect = document.getElementById('houseSelect');
    const selectedHouse = houseSelect.value;
  
    if (!selectedHouse) {
      alert('Please select a house');
      return;
    }
  
    // Reload the page with a query parameter containing the selected house
    window.location.href = `?house=${selectedHouse}`;
  }
  
  // Function to extract house from URL query parameters
  function getHouseFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('house');
  }
  
  // Check if a house is selected in the URL and display its data
  document.addEventListener('DOMContentLoaded', () => {
    const houseFromQuery = getHouseFromQuery();
    if (houseFromQuery) {
      const houseSelect = document.getElementById('houseSelect');
      houseSelect.value = houseFromQuery;
  
      // Fetch data and display
      fetchAndDisplayData(houseFromQuery);
    }
  });
  
  // Fetch data and display graph and table
  function fetchAndDisplayData(selectedHouse) {
    const filePath = 'database.csv';
  
    fetch(filePath)
      .then(response => response.text())
      .then(contents => {
        displayGraph(selectedHouse, contents);
        displayTable(selectedHouse, contents);
      })
      .catch(error => {
        console.error('Error fetching the CSV file:', error);
      });
  }

  function displayGraph(selectedHouse, contents) {
    const columnsToShow = houseColumnMap[selectedHouse];
  
    if (!columnsToShow) {
      alert('House not found or columns not set');
      return;
    }
  
    const dataRows = contents.split('\n').map(row => row.split(','));
    const xValues = dataRows.map(row => row[columnsToShow[0]]);
    const yValues = columnsToShow.slice(1).map((column, index) => {
      let label;
      if (index === 0) {
        label = 'Generation';
      } else if (index === 1) {
        label = 'Consumption';
      } else if (index === 2) {
        label = 'Surplus';
      } else {
        label = `Column ${column}`;
      }
      return {
        label,
        data: dataRows.map(row => row[column]),
        borderColor: '#' + ((Math.random() * 0xffffff) << 0).toString(16), // Random color
        fill: false,
      };
    });
  
    const ctx = document.getElementById('graphCanvas').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: yValues,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // Add other Chart.js options here as needed
      },
    });
  }
  

function displayTable(selectedHouse, contents) {
  const columnsToShow = houseColumnMap[selectedHouse];

  if (!columnsToShow) {
    alert('House not found or columns not set');
    return;
  }

  const table = document.getElementById('csvTable');
  table.innerHTML = ''; // Clear previous content

  const dataRows = contents.split('\n').map(row => row.split(','));

  dataRows.forEach(rowData => {
    const row = document.createElement('tr');
    columnsToShow.forEach(columnIndex => {
      const cell = document.createElement('td');
      cell.textContent = rowData[columnIndex];
      row.appendChild(cell);
    });
    table.appendChild(row);
  });
}