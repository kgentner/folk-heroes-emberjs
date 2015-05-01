//Citation: This work is a modification of the Ember.js tutorial by Tom Dale
//at http://youtu.be/1QHrlFlaXdI.

//Create Ember.js application
App = Ember.Application.create({});

//Define URL mappings
App.Router.map(function() {
  this.resource('hero', { path: ':hero_id' }); //urls for each folk hero id
  this.resource('newhero', { path: '/newhero' });
});

//Access 'heroes' and define events for adding and deleting
App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return heroes;
  },
  events: {
    addHero: function() {
      var first = $("#first").val();
      var last = $("#last").val();
      var mail = $("#mail").val();
      var hero =
            {id: counter + 1,
              firstName:first,
              lastName:last,
              email:mail };
      //Check for required first name
      if (first.length > 0){
        //Regex expression for validating email
        if (mail.length > 0){
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
            //Add user and go back to main page
            heroes.pushObject(hero);
            counter++;
            this.transitionTo('index');
          } else {
            alert("Email address is invalid.");
          }
        } else {
          heroes.pushObject(hero);
          counter++;
          this.transitionTo('index');
        }
      } else {
        alert('Please Enter a First Name.');
      }
    },

      deleteHero: function() {
        var i;
        var heroNum = $("#heroNumber").text();
        for (i = 0; i < heroes.length; i++) {
          if (heroes[i].id == heroNum) {
            break;
          }
        };
        //Remove hero and go back to main page
        heroes.removeObject(heroes[i]);
        this.transitionTo('index');
      }
  }
});

App.HeroRoute = Ember.Route.extend({
  model: function(params) {
    return heroes[params.hero_id];
  }
});

//Sorts 'heroes' based on lastName property
App.ApplicationController = Ember.ArrayController.extend({
    sortAscending: true,
    sortProperties: ['lastName']
});

//Defines logic and actions for existing hero edit window
App.HeroController = Ember.ObjectController.extend({
  isEditing: false,
  actions: {
    edit: function() {
      this.set('isEditing', true);
    },
    doneEditing: function() {
      var first = $("#fname").val();
      var mail = $("#email").val();
      //Check for required first name
      if (first.length > 0){
        this.set('isEditing', false);
        //Regex expression for validating email
        if (mail.length > 0){
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
          } else {
            this.set('isEditing', true);
            alert("Email address is invalid.");
          }
        }
      } else {
        alert('Please Enter a First Name.');
      }

    }
  }
});

var counter = 5;// for assigning future IDs
var heroes = [
{
  id: '0',
  firstName: 'Johnny',
  lastName: 'Appleseed',
  email: 'snappleseed@apple.com'
  }, {
  id: '1',
  firstName: 'Annie',
  lastName: 'Oakley',
  email: 'oakley.doakley@niceshot.com'
 }, {
  id: '2',
  firstName: 'Pecos',
  lastName: 'Bill',
  email: 'quickdraw@pecospit.com'
  }, {
  id: '3',
  firstName: 'Paul',
  lastName: 'Bunyan',
  email: 'babe@theblueox.com'
 }, {
  id: '4',
  firstName: 'John',
  lastName: 'Henry',
  email: 'steeldriver@bnsf.com'
  }, {
  id: '5',
  firstName: 'Casey',
  lastName: 'Jones',
  email: 'cjones@trainsrus.com'
}];
