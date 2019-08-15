const cityContainer = document.getElementById('city-container')
const newCityContainer = document.getElementById('new-city-container')
const cityUrl = "http://localhost:3000/cities"

const fetchCities = () => {
  fetch(cityUrl)
  .then(resp => resp.json())
  .then(cities => renderCities(cities))
  .catch(error => document.body.innerHTML = error.message)
}


const renderCities = (cities) => {
  console.log(cities);
  
  cities.forEach(city => {makeCity(city)})
}

const makeCity = (city) => {
  let cityDiv = document.createElement('div')
  cityDiv.id = 'city' + city.id

  let h3 = document.createElement('h3')
  h3.innerText = city.name

  let cityImg = document.createElement('img')
  cityImg.src = city.image
  cityImg.className = ('city-image')

  let cityDescription = document.createElement('p')
  cityDescription.innerText = city.description

  let likeButton = document.createElement('button')
  likeButton.innerText = "Like"

  let deleteButton = document.createElement('button')
  deleteButton.innerText = "Delete"
  deleteButton.className = "delete-btn"
  deleteButton.addEventListener('click', () => { deleteCity(city.id) })

  let likeDisplay = document.createElement('h5')
  likeDisplay.innerText = `${city.likes} likes`


  let hr = document.createElement('hr')

  cityDiv.append(h3, cityImg, cityDescription, likeButton, deleteButton, likeDisplay, hr)
  cityDiv.className = "city-div"
  cityContainer.append(cityDiv)
  
  likeButton.addEventListener('click', (event) => {
    fetch(`${cityUrl}/${city.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: ++city.likes
      })
    })
    .then(resp => resp.json())
    .then(city => {
      likeDisplay.innerText = city.likes == 1 ? city.likes + ' like' : city.likes + ' likes'
    })
  })
}


const addCity = (city) => {
  let newDiv = document.getElementById('new-city-container')
  newDiv.innerHTML = `
    <form id="add-form">
      <h3>Add a new city:</h3>
      <input type="text" id="name-input" class="new-form" placeholder="City Name"><br>
      <input type="url" id="image-input" class="new-form" placeholder="Image URL"><br>
      <input type="textarea" id="description-input" class="new-form" placeholder="Description">
      <button id="submit-button" >Submit</button>
    </form>
  `

  let nameInput = document.getElementById('name-input')
  let imageInput = document.getElementById('image-input')
  let descriptionInput = document.getElementById('description-input')
  // let submitButton = document.getElementById('submit-button')
  let addForm = document.getElementById('add-form')

  addForm.addEventListener('submit', (city) => {
    event.preventDefault()
    fetch(cityUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: nameInput.value,
        image: imageInput.value,
        description: descriptionInput.value,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then(city => {
      makeCity(city)
      name.value = ""
      image.value = ""
      description.value = ""
    })
    .catch(error => document.body.innerHTML = error.message)
  })
}

const deleteCity = (id) => {
  // event.preventDefault()
  fetch(`http://localhost:3000/cities/${id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(city => document.getElementById('city' + id).remove())
  .catch(err => alert(err))
}

fetchCities()
addCity()