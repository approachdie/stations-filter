const api = `https://gist.githubusercontent.com/VasilyMur
/43ef6df83bba694f871f11a16ed7556d/raw/
b6edff674e35452d6c57ec64177a558f7adb432e/moscowSubway.json`;

const stations = [];

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    data.forEach((line) => {
      stations.push(...line.stations);
    });
  });

const searchInput = document.querySelector('.search');
const searchOptions = document.querySelector('.options');

const getStations = (word, stations) => {
  return stations.filter((station) => {
    const regex = new RegExp(word, 'gi');
    return station.name.match(regex);
  });
};

function displayStations() {
  console.log(this.value);
  const options = getStations(this.value, stations);

  const html = options

    .map((station) => {
      const regex = new RegExp(this.value, 'gi');
      const name = station.name.replace(regex, `<span class="hl">${this.value}</span>`);

      return `<li><span>${name}</span></li>`;
    })
    .slice(0, 7)
    .join('');

  searchOptions.innerHTML = this.value ? html : null;
}

searchInput.addEventListener('change', displayStations);
searchInput.addEventListener('keyup', displayStations);
