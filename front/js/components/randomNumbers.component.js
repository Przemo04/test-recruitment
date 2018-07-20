
function RandomNumbers(selector) {
  Component.call(this, selector);
  this.RandomNumbers = [];
}

RandomNumbers.prototype = Object.create(Component.prototype);
RandomNumbers.constructor = RandomNumbers;

const randomNum = [];
const subj = Obserwer(); 
var data = [];

RandomNumbers.prototype.init = function () {
  const self = this;

  getNumbers = function(){
      axios.get('http://localhost:3000/random-numbers')
          .then(function (response) {
              data = response.data.data;
              self.RandomNumbers = response.data.data.map(function (number) {
                  return {
                      id: number
                  }
              });
              
              self.render();
          })
          .catch(function (error) {
              console.error(error);
          });
  };

  getNumbers();

  setInterval(()=> {
      getNumbers();
  }, 10000);
  
  subj.addObserver(randomNum);
};

RandomNumbers.prototype.render = function () {
  const container = this.getDOMElement();
  this.RandomNumbers.forEach(function (number) {
      randomNum.push(number.id);
      const listElement = document.createElement('li');
      listElement.classList.add('list-group-item');
      listElement.innerHTML = number.id;
      container.appendChild(listElement);
  });
  
  subj.notify('notify');
};

function returnRandomNumbers() {
  console.log(data);
  return data;
}