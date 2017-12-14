


// PROFILE OBJECT ________________________________________________________________________________
    // -- arguments: options is an individual employee meta data from the employee API.

    // - private properties
    // -- _.state (int): (0 or 1) 
    // -- _.metadata (ARRAY): array of each employee data from the API

    // - public methods

    // -- get(name, child) : 
    // -- arguments:
    // -- -- name: argument is the key value to get the private property 
    // -- -- child: if there is a child key value for to grab from the returned array in the employee API

    // -- returns:
    // -- -- The value from _.meta property.


    // -- getName() : 
    // -- returns the employee name from the _.meta property

    // -- getHash() : 
    // -- returns a hash value of the employee name for bookmarking the URL

    // -- getBirthday() : 
    // -- returns the birthday value formated to the design spec

    // -- getAddress() : 
    // -- returns the address formated to the design spec




    // - private methods

    // -- _.capitalizeFirstLetter(string) : 
    // -- arguments:
    // -- -- name: argument is the key value to get the private property 


  function Profile(options) {

    console.groupCollapsed('Profile Object');

    let _ = {}

    _.state = 0;
    _.metadata = {};

    $.extend( _.metadata, options );

    _.capitalizeFirstLetter = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    this.get = function(name, child) {
      child = child || false;

      if(!child) {
        return  _.metadata[name];
      } else {
        return  _.metadata[name][child];
      }

    }

    this.getName = function() {
      return  _.capitalizeFirstLetter(_.metadata['name']['first']) + ' ' + _.capitalizeFirstLetter(_.metadata['name']['last']);
    }

    this.getHash = function() {
      return  '#'+_.metadata['name']['first'].toLowerCase() + '-' + _.metadata['name']['last'].toLowerCase();
    }

    this.getBirthday = function() {
      let birthday = new Date(_.metadata['dob']);
      return ('0' + birthday.getDate()).slice(-2) + '/' + ('0' + (birthday.getMonth()+1)).slice(-2) + '/' + birthday.getFullYear();
    }

    this.getAddress = function() {
      return _.metadata['location']['street'] + ', ' + _.metadata['location']['city'] + ', ' + _.metadata['location']['postcode'];
    }

    console.log(this);
    console.log(_.metadata);

    console.groupEnd();

  }



// PROFILE COLLECTIONS OBJECT ________________________________________________________________________________

    // - public properties
    // -- name (string): "x" or "o"

    // - private properties
    // -- _.state (int): (0 or 1) for future use to detect if data loaded
    // -- _.metadata (OBJECT): object of each employee data from the API


    // - public methods

    // -- get(name, child) : 
    // -- arguments:
    // -- -- name: argument is the key value to get the private property 
    // -- -- child: if there is a child key value for to grab from the returned array in the employee API

    // -- returns
    // -- -- a object 

    // -- getName() : 
    // -- -- gets the employee name from the API array.

    // -- returns
    // -- -- a object 

    // -- getHash() : 
    // -- -- gets a hash value of the employee name for bookmarking the URL

    // -- getBirthday() : 
    // -- -- gets the birthday value formated to the design spec

    // -- getAddress() : 
    // -- -- gets the address formated to the design spec


    // - private methods

    // -- _.capitalizeFirstLetter(string) : 
    // -- arguments:
    // -- -- name: argument is the key value to get the private property 



/**
 * Profiles Collection Object
 */

  function Profiles(total) {

    console.groupCollapsed('Profiles Object');
    this.total = total;

    var _ = {}
    _.url = "https://randomuser.me/api/?results=" + this.total;
    _.dataType = "json";

    _.cards = new Array();

    this.getProfiles = function() {
      $.ajax({
        url: _.url,
        dataType: _.dataType,
        success: function(data) {

          console.groupCollapsed('Profiles: Get Cards Success');

          for (var i=0,  l=data.results.length; i < l; i++) {
            _.cards.push( new Profile(data.results[i]) );
          }
          
          console.log( _.cards );
          this.total = data.length;

          console.groupEnd();

        }
        
      });
    }

    this.getProfile = function(i) {
      return _.cards[i];
    }

    this.getProfiles(); 

    console.groupEnd();

  }




/**
 * Modal Dialog Object
 */

  function Modal(options) {

    var _ = {}

    _.state = 0;
    _.valid = 0;

    _.wrapper = 'modal-profile';
    _.close = 'modal-button-close';
    _.img = 'modal-img';
    _.name = 'modal-employee-name';
    _.email = 'modal-employee-email';
    _.city = 'modal-employee-city';
    _.phone = 'modal-employee-phone';
    _.address = 'modal-employee-address';
    _.birthdayDate = 'modal-employee-birth-date';

    _.background = 'modal-backdrop';

    _.html = '';

    _.closeModal = function (){

      $('#'+_.background).removeClass('in');
      $('#'+_.wrapper).removeClass('show');

      setTimeout(function() {
        $('#'+_.wrapper).remove();
        $('#'+_.background).remove();
      }, 600);

    }

    this.closeModal = function (){
      _.closeModal();
    }

    this.openModal = function (profile){
      
      _.html =  '<div id="'+_.wrapper+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel">'+
                  '<div class="modal-dialog" role="document">'+
                    '<div class="modal-content">'+
                      '<div class="modal-header">'+
                        '&nbsp;'+
                        '<button id="'+_.close+'" type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                          '<span aria-hidden="true">×</span>'+
                        '</button>'+
                      '</div>'+
                      '<div class="modal-body">'+
                        '<img id="'+ _.img +'" class="employee-thumbnail rounded-circle img-thumbnail" border="0" src="'+profile.get('picture', 'large')+'" />'+
                        '<div class="employee-information " >'+
                          '<h2 id="'+ _.name +'" class="employee-name" >'+ profile.getName() +'</h2>'+
                          '<p  id="'+ _.email +'" class="employee-email" ><a href="mailto:'+profile.get('email')+'">'+ profile.get('email') +'</a></p>'+
                          '<p  id="'+ _.city +'" class="employee-city" >'+ profile.get('location','city') +'</p>'+
                          '<hr />'+
                          '<p id="'+ _.phone +'" class="phone">'+ profile.get('phone') +'</p>'+
                          '<p id="'+ _.address +'" class="address">'+ profile.getAddress() +'</p>'+
                          '<p class="birthday">Birthday: <span id="'+_.birthdayDate+'" class="birthday-date">'+profile.getBirthday()+'</span></p>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                  '<div id="'+ _.background +'" class="modal-backdrop fade"></div>'+
                '</div>';
                

        $('body').append(_.html);

        $('#'+_.background).addClass('in');
        
        setTimeout(function() {
          $('#'+_.wrapper).addClass('show');
          
          $('#'+_.close).click(function(event) {
            event.preventDefault();
            _.closeModal();
          });
  
          $('#'+_.background).click(function(event) {
            event.preventDefault();
            _.closeModal();
          });
          
        }, 100 );
        

      return _.html;
      
    }

  }



/**
 * Feed Object
 */

  function FeedProfiles( total ) {
    
    console.groupCollapsed('FeedProfiles Object');

    let _ = {}
    this.total = total;

    _.profiles = new Profiles(total);
    _.feedwrapper = $('#feed');

    _.modalBackground = $('<div>').addClass('modal-backdrop fade in');
    _.modalBackground.click(function() {
      this.remove();
    });

    _.modal = new Modal();

    _.getCardId = function (classname){
      let regex = /-(?:)?\d+/;  //reg ex for finding "-1234"
      let found = classname.match(regex);
      return found[0].substr(1); //return number
    }

    this.getCard = function(options) {

      /*
      <div class="col-sm-12 col-md-4 employee-column">
        <a class="row employee-row" href="#haleigh-macciarella">
          <div class="col-sm-12 col-md-4 employee-thumbnail">
            <img class="employee-thumbnail rounded-circle img-thumbnail" src="http://1.bp.blogspot.com/-HnKwckAUqWY/UZ9l9D-RjMI/AAAAAAAAAUQ/spBOysn6Now/s1600/noprofileimage.gif" border="0" />
          </div>
          <div class="col-sm-12 col-md-8 employee-information " >
            <h2 class="employee-name" >Haleigh Macciarella</h2>
            <p  class="employee-email" >dtucker@yakitri.edu</p>
            <p  class="employee-city" >Chicago</p>
          </div>
        </a>
      </div>
      */

      let card    = $('<div>').addClass('col-sm-12 col-md-4 employee-column');
      let cardRow = $('<a>').addClass('row employee-row id-'+ options.id).attr('href', options.hash);

      cardRow.click(function(event) {
        event.preventDefault();
        let id = _.getCardId($(this).attr('class'));
        let profile = _.profiles.getProfile(id); 
        _.modal.openModal(profile);
      });

      let cardColumnImg = $('<div>').addClass('col-sm-12 col-md-4 employee-thumbnail');
      let cardImg = $('<img>').addClass('employee-thumbnail rounded-circle img-thumbnail').attr("src", options.src);

      let cardColumnInfo = $('<div>').addClass('col-sm-12 col-md-8 employee-information');

      let cardInfoName = $('<h2>').addClass('employee-name').html(options.name);
      let cardInfoEmail = $('<p>').addClass('employee-email').html(options.email);
      let cardInfoCity = $('<p>').addClass('employee-city').html(options.city);

      cardColumnImg.append(cardImg);
      cardColumnInfo.append(cardInfoName);
      cardColumnInfo.append(cardInfoEmail);
      cardColumnInfo.append(cardInfoCity);

      cardRow.append(cardColumnImg);
      cardRow.append(cardColumnInfo);

      card.append(cardRow);

      console.log(card)

      return card;

    }


    this.renderFeed = function() {

      console.groupCollapsed('renderFeed() Method');

      let profile;
      let cardOptions;
      let row;
      let rowCount = 0;

      for (i = 0; i < this.total; i++) {

        if (rowCount === 0) {
          row = $('<div>').addClass('row employees row-eq-height');
        }

        profile = _.profiles.getProfile(i);
        console.log( profile );

        cardOptions = {
          'name': profile.getName(),
          'email': profile.get('email'),
          'city': profile.get('location', 'city'),
          'src': profile.get('picture', 'large'),
          'hash': profile.getHash(),
          'id': i
        }

        row.append( this.getCard( cardOptions ) );

        rowCount ++;
        
        if (rowCount === 3) {
          $( _.feedwrapper ).append( row );
          rowCount = 0;
        }

      }

      console.groupEnd();

    }

  }




  //let card = new Profiles();
  let test = new FeedProfiles(12);

  $( document ).ajaxComplete(function() {
    test.renderFeed();
  });

  $(function() {

    
  });