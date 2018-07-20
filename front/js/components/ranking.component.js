function Ranking(selector) {
  Component.call(this, selector);
  this.numbers = [];
}

Ranking.prototype = Object.create(Component.prototype);
Ranking.constructor = Ranking;

function Obserwer(){
  var observerList =  [];
  var add = function(obj){
    obj.obsId = observerList.length;
    return observerList.push(obj);
  };
  var remove =  function(obj){
    delete obj.obsId
    observerList.splice(obj.obsId,1);
  };
  return {
    addObserver: function(observer){
      add(observer);
    },
    removeObserver: function(observer){
      remove(observer);
    },
    notify: function(randomNum){
      let countRepeat = {};
      observerList[0].map((number) => {
        countRepeat[number] = (countRepeat[number] || 0) + 1;
      });
      console.log("obserwe list ", observerList[0]);
      console.log("powtorzenia w notify: ", Object.entries(countRepeat).sort((a,b) => b[1]-a[1])); 
      //render();
    }
  }
}

Ranking.prototype.init = function() {

  const self = this;

  axios.get('http://localhost:3000/numbers')
    .then(function(response) {
      self.numbers = response.data.data.map(function(number) {
        return {
          id: number
        }
      });

      self.render();
    })
    .catch(function(error) {
      console.error(error);
    });
};

Ranking.prototype.render = function() {
  const container = this.getDOMElement();
  this.numbers.forEach(function(number) {
      const listElement = document.createElement('li');
      listElement.classList.add('list-group-item');
      listElement.innerHTML = number.id + ' repeat: ';
      container.appendChild(listElement);
  });

};