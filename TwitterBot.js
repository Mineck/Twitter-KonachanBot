console.log("The bot is starting");

//Initialisation des variables

var cheerio = require('cheerio');
var request = require('request');
var Twit = require("twit");
var T = new Twit(require("./config.js"));
var fs = require("fs");
var fse = require("fs-extra");
var weekday = "";
var ok = 0;
var stream = T.stream("user");

//Initialisation des fonctions

//Callback après un tweet
function tweeted(err, data, response) {
   if (err) {
        console.log("Something went wrong !");
        //console.log(data);
      } else {
        console.log("It worked");
      }
    };
//Poste une image correspondant à la demande de l'utilisateur
function KonachanTagEvent(eventMsg){

  //var json = JSON.stringify(eventMsg,null,2);
  //fs.writeFileSync("tweet.json", json);

  //On obtient les infos du tweet
  console.log("Obtention info tweet");
  var Myname = eventMsg.in_reply_to_screen_name;
  var UserID = eventMsg.user.id;
  var reponse = eventMsg.id;
  var Hashtag = eventMsg.entities.hashtags[0] && eventMsg.entities.hashtags[0].text ;
  var Isname = eventMsg.user.screen_name;
  var Info = {
    citation: Myname,
    Envoyeur: Isname,
    Sonhashtag: Hashtag ,
    Idtweet: reponse
  };
    console.log(Info);

    //On le trie pour l'envoyer vers la bonne partie du code à éxectuter
    console.log("Aiguillage");
    if(Myname == 'Name of your bot'  && (Hashtag == 'A hashtag' || Hashtag == 'A hashtag')){
      console.log("correct Hashtag");

      //Création des variables nécessaire au scraping
      var ntag =  eventMsg.entities.hashtags[0] && eventMsg.entities.hashtags[1].text;
      var url2 =  "https://konachan.com/post?page=1&tags="+ntag;

      //Vérification du tag
      console.log("Vérification tag");
      request(url2, function(error, response, body){
        if(!error && response.statusCode == 200){
        var $ = cheerio.load(body);
        var Findtag = $("p").last().text();
        var $Findtag = Findtag;
        var pin = {
          Findtag: $Findtag,
          Userdemand: Isname,
          url: url2
        }
        console.log("scrapped:", pin);
        }
        if ($Findtag == 'Nobody here but us chickens!'){
          console.log("Ce tag n'existe pas ")
          T.post("statuses/update", {status:'@'+ Isname + '  #'+ ntag+ " doesn't exist please try again with another tag", in_reply_to_status_id: reponse }, tweeted);
        }
        else {
          function timer(){
           var TEST_DIR3 = Isname+'.txt';
           console.log("Fichier spam supprimer")
            fse.remove(TEST_DIR3, function(err) {
                  if (err) {
                    return console.error(err);
                  }
                });
          }
          function timerON(){ setTimeout(timer, 10*60*60*30)};
          function timerOFF() { clearTimeout(timerON)};
          // check fichier spam
          console.log("check fichier spam ");
          var Zeus = fs.existsSync(Isname+'.txt');
                if(Zeus == true){
                  var warning = fs.readFileSync(Isname+'.txt', 'utf8');
                  console.log("fichier trouvé");
                }
                console.log(warning);
                warningbis = Number (warning);
                if (warningbis >=5 ){
                  console.log("Plusieurs tentative de la part de l'utilisateur");
                  switch (warningbis) {
                      case 5:
                      fs.writeFileSync(Isname+'.txt', '6');
                      timerOFF();
                      timerON();
                      break;
                      case 6:
                      fs.writeFileSync(Isname+'.txt', '7');
                      timerOFF();
                      timerON();
                      case 7:
                      fs.writeFileSync(Isname+'.txt', '8');
                      timerOFF();
                      timerON();
                      break;
                      case 8:
                      fs.writeFileSync(Isname+'.txt', '9');
                      timerOFF();
                      timerON();
                      break;
                      case 9:
                      fs.writeFileSync(Isname+'.txt', '10');
                      T.post("blocks/create", {'user_id': UserID});
                      console.log("utilisateur bloquer "+Isname);
                      T.post("direct_messages/new",{screen_name: Your name, text: 'Nouvel utilisateur bloquer: '+Isname });
                      timer();
                      break;
                  }}
                  else {
                      //Création adresse de téléchargement
          console.log("Création adresse de téléchargement");
          request(url2, function(error, response, body){
            if(!error && response.statusCode == 200){
            var $ = cheerio.load(body);
            var pmax = $("a[class = 'next_page']").get();
            var $pmax = $(pmax).prev('a').text();
            if ($pmax == ''){
              $pmax = 1;
            }
            var npage = Math.floor((Math.random() * $pmax) + 1);
            var url2 = 'https://konachan.com/post?page='+npage+'&tags='+ntag;
            var pin = {
              Pagemax: $pmax,
              numberchoicepage: npage,
              Userdemand: Isname,
              url: url2
            }
            console.log("scrapped:", pin);
          }
          //récupération du nom de l'image
          console.log("Récupération nom image");
          request(url2, function(error, response, body){
            do{
            var ImgRand =  Math.floor((Math.random() * 20)+ 0);
            console.log('NumberPics ' +ImgRand);
            if(!error && response.statusCode == 200){
            var $ = cheerio.load(body);
            var name2 = $("li[style = 'width: 170px;']").get(ImgRand);
            var $name2 = $(name2).attr('id');
            var pin = {
              name: $name2,
              Userdemand: Isname,
              url: url2
            }
            console.log("scrapped:", pin);
          }}while($name2 == undefined);
            var destination2 = fs.createWriteStream('./Picskonachan/'+$name2+'.jpg');
            //Téléchargement de l'image
            console.log("Téléchargement image");
            request(url2, function(error, response, body){
              if(!error && response.statusCode == 200){
              var $ = cheerio.load(body);
              var img2 = $("span[class = 'directlink-info']").get(ImgRand);
              var $img2 = $(img2).parents('a').attr('href');
              var final2 = 'https:' + $img2;
              var pin = {
                img:final2,
                Userdemand: Isname,
                url: url2
              }
              console.log("scrapped:", pin);
            }
            request(final2).pipe(destination2)
            //fonction pour poster l'image
            function PostKonachan(txt){
              var tweet3 = {status:txt};
              var filename3 =  './Picskonachan/'+$name2+'.jpg';
              console.log(filename3);
              var params3 = {encoding:'base64'}
              var b643 = fs.readFileSync(filename3, params3);
              T.post("media/upload", {media_data: b643 }, uploaded3);
              console.log("upload media")

              function uploaded3(err, data, response) {
                var id3 = data.media_id_string;
                var tweet3 = {status:'@' +Isname+ " #"+ntag, media_ids: [id3] };
                console.log(id3);
                T.post("statuses/update", tweet3, tweeted);
              };
              TEST_DIR2 = './Picskonachan/'+$name2+'.jpg';
              fse.remove(TEST_DIR2, function(err) {
                    if (err) {
                      return console.error(err);
                    }
                  });
            }
            setTimeout(PostKonachan, 10*60*20);
            //protection anti spam
            console.log("Check Spam final");
            var Whereitis = fs.existsSync(Isname+'.txt');
            console.log(Whereitis);
                  if(Whereitis== true){
                    var antispam2 = fs.readFileSync(Isname+'.txt', 'utf8');
                    todo = Number(antispam2);
                    switch (todo) {
                      case 1:
                      fs.writeFileSync(Isname+'.txt', '2');
                      console.log("Deuxième demande");
                      timerOFF();
                      timerON();
                        break;
                      case 2:
                      fs.writeFileSync(Isname+'.txt', '3');
                      console.log("Troisième demande");
                      timerOFF();
                      timerON();
                      break;
                      case 3:
                      fs.writeFileSync(Isname+'.txt', '4');
                      console.log("Quatrième demande");
                      timerOFF();
                      timerON();
                      break;
                      case 4:
                      fs.writeFileSync(Isname+'.txt', '5');
                      console.log("Cinquième demande");
                      T.post("direct_messages/new",{screen_name: Isname, text: 'Please stop spaming, you will be allowed to tweeted whithin 30 minutes'});
                      timerOFF();
                      timerON();
                      break;
                      default:
                      console.log("Ya un soucis dans le systeme");
                      break;
                    }
                  } else {
                    fs.appendFileSync(Isname+'.txt', '1');
                    console.log("create file spam");
                    timerON();
                  }
                })
            })
          })
        }
        }
      })
    }
};
//Envoie un message en réponse à un follow
function followedbis(eventMsg) {
  console.log("Follow event");
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  T.post("statuses/update", {status:"@" + screenName + " a text"}, tweeted)};
//Poste chaque nouvelle image de konachan
function Runkonachan(){
  //récupération nom image
  var url = "http://konachan.com/post?page=1"
  console.log("Récupération nom image")
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
    var $ = cheerio.load(body);
    var name = $("li[style = 'width: 170px;']").get(0);
    var $name = $(name).attr('id');
    var pin = {
      name: $name,
      url: url
    }
    console.log("scrapped:", pin);
    }
    var read = fs.readFileSync('./Picskonachan/Verif.txt', 'utf8');
    //Verifcation déjà télécharger ou pas
        if ($name <= read){
          var retry = 0;
        } else{
          retry = 1
        }
        switch (retry) {
          case 0:
          //Recommencer
          TEST_DIR2 = './Picskonachan/'+$name+'.jpg';
          fse.remove(TEST_DIR2, function(err) {
                if (err) {
                  return console.error(err);
                }
              });
          console.log("Même Image !!")
            break;
          case 1:
          //Téléchargement image
          var destination = fs.createWriteStream('./Picskonachan/'+$name+'.jpg');
          console.log("Téléchargement image");
              request(url, function(error, response, body){
                if(!error && response.statusCode == 200){
                var $ = cheerio.load(body);
                var img = $("span[class = 'directlink-info']").get(0);
                var $img = $(img).parents('a').attr('href');
                var final = 'https:' + $img;
                var pin = {
                  img:final,
                  url: url
                }
                console.log("scrapped:", pin);
              }
              request(final).pipe(destination)
              })
          fs.writeFileSync('./Picskonachan/Verif.txt', $name);

        function PostKonachan(txt){
          var tweet3 = {status:txt};
          var filename3 =  './Picskonachan/'+$name+'.jpg';
          console.log(filename3);
          var params3 = {encoding:'base64'}
          var b643 = fs.readFileSync(filename3, params3);
          T.post("media/upload", {media_data: b643 }, uploaded3);
          console.log("upload media")

          function uploaded3(err, data, response) {
            var id3 = data.media_id_string;
            var tweet3 = {status:"#Konachan  " , media_ids: [id3] };
            console.log(id3);
            T.post("statuses/update", tweet3, tweeted);
          };
          TEST_DIR2 = './Picskonachan/'+$name+'.jpg';
          fse.remove(TEST_DIR2, function(err) {
                if (err) {
                  return console.error(err);
                }
              });
        }
        setTimeout(PostKonachan, 10*60*60*30);
      //Fin du else
      console.log("Envoie image en cours");
      break;
    }
    console.log("Fin de processus");
  });
 }
//Gére l'upload de fichier
//Poste une image à un moment précis
function PostIt() {
   date = new Date;
   day = date.getUTCDay();
   Hour = date.getUTCHours();
   Min = date.getUTCMinutes();
   Sec = date.getUTCSeconds();
  WEEKDAY();
  //console.log(day, " J ", Hour, " H ", Min, " M ", Sec, " S ");
  if (Min == 0 && Sec == 0 && ok == 1) {
    console.log("it's time to post " + ok +" "+ weekday);
    tweetIt();
  }
  //console.log(ok + ' '+weekday);
}
//Poste les images sur twitter et avertie si jamais plus d'images
function tweetIt(txt) {
  var very = 0;
  var tweet = {status:txt};
  TEST_DIR = "./Pics/";
  items = [];
  fse.walk(TEST_DIR).on("readable", function() {
    for (var a;a = this.read();) {
      items.push(a.path);
    }
  }).on("end", function() {
    items.shift();
    console.log(items);
    if (items.length > 0) {
      var uploaded = function(err, data, response) {
        var id = data.media_id_string;
        var tweet = {status:"#ecchiforthelife " + weekday, media_ids:[id]};
        console.log(tweet);
        T.post("statuses/update", tweet, tweeted);
      };
      var filename = items[Math.floor(Math.random() * items.length)];
      console.log(filename);
      var params = {encoding:"base64"};
      var b64 = fs.readFileSync(filename, params);
      T.post("media/upload", {media_data:b64}, uploaded);
      fse.remove(filename, function(err) {
        if (err) {
          return console.error(err);
        }
        console.log("success!");
        if (items.length == 10) {
          T.post("statuses/update", {status:"Your text"}, function(err, data, response) {
          });
        } else {
          console.log("Number of pics " + items.length);
        }
      });
    } else {
      if (very == 0) {
        console.log("No pics");
        T.post("statuses/update", {status:"Your text"}, tweeted);
        T.post("statuses/update", {status:"Your text"}, tweeted);
      } else {
        console.log("I think the bot have no pics");
      }
      very = +1;
    }
  });
}
//Récuppère le jour de la semaine, l'heure et le message à poster
function WEEKDAY() {
  var lunch = "A pic before lunch";
  var evening = "Ecchi evening";
  var sleep = "Last before sleep";
  switch(day) {
    case 0:
      console.log("C'est dimanche");
      switch(Hour) {
        case 6:
          ok = 1;
          weekday = "";
          break;
        case 8:
          ok = 1;
          weekday = "";
          break;
        case 10:
          ok = 1;
          weekday = lunch;
          break;
        case 12:
          ok = 1;
          weekday = "";
          break;
        case 14:
          ok = 1;
          weekday = "";
          break;
        case 16:
          ok = 1;
          weekday = "";
          break;
        case 18:
          ok = 1;
          weekday = evening;
          break;
        case 20:
          ok = 1;
          weekday = evening;
          break;
        case 22:
          ok = 1;
        case 23:
          ok = 1;
          weekeday = sleep;
        default:
          ok = 0;
          break;
      }
      break;
    case 1:
      console.log("C'est lundi");
      switch(Hour) {
        case 23:
          ok = 1;
          weekday = "To take courage before school";
          break;
        case 6:
          ok = 1;
          weekday = "";
          break;
        case 8:
          ok = 1;
          weekday = "";
          break;
        case 10:
          ok = 1;
          weekday = lunch;
          break;
        case 12:
          ok = 1;
          weekday = "";
          break;
        case 14:
          ok = 1;
          weekday = "";
          break;
        case 16:
          ok = 1;
          weekday = "";
        case 18:
          ok = 1;
          weekday = evening;
          break;
        case 20:
          ok = 1;
          weekday = evening;
          break;
        case 22:
          ok = 1;
          weekday = evening;
          break;
        default:
          ok = 0;
          break;
      }
      break;
    case 2:
      console.log("c'est mardi");
      switch(Hour) {
        case 23:
          ok = 1;
          weekday = sleep;
          break;
        case 6:
          ok = 1;
          weekday = "";
          break;
        case 8:
          ok = 1;
          weekday = "";
          break;
        case 10:
          ok = 1;
          weekday = lunch;
          break;
        case 12:
          ok = 1;
          weekday = "";
          break;
        case 14:
          ok = 1;
          weekday = "";
          break;
        case 16:
          ok = 1;
          weekday = "";
          break;
        case 18:
          ok = 1;
          weekday = evening;
          break;
        case 20:
          ok = 1;
          weekday = evening;
          break;
        case 22:
          ok = 1;
          weekday = evening;
          break;
        default:
          ok = 0;
          break;
      }
      break;
    case 3:
      console.log("c'est mercredi");
      switch(Hour) {
        case 23:
          ok = 1;
          weekday = sleep;
          break;
        case 6:
          ok = 1;
          weekday = "";
          break;
        case 8:
          ok = 1;
          weekday = "";
          break;
        case 10:
          ok = 1;
          weekday = lunch;
          break;
        case 12:
          ok = 1;
          weekday = "";
          break;
        case 14:
          ok = 1;
          weekday = "";
          break;
        case 16:
          ok = 1;
          weekday = "";
          break;
        case 18:
          ok = 1;
          weekday = evening;
          break;
        case 20:
          ok = 1;
          weekday = evening;
          break;
        case 22:
          ok = 1;
          weekday = evening;
          break;
        default:
          ok = 0;
          break;
      }
      break;
    case 4:
      console.log("c'est jeudi");
      switch(Hour) {
        case 23:
          ok = 1;
          weekday = sleep;
          break;
        case 6:
          ok = 1;
          weekday = "";
          break;
        case 8:
          ok = 1;
          weekday = "";
          break;
        case 10:
          ok = 1;
          weekday = lunch;
          break;
        case 12:
          ok = 1;
          weekday = "";
          break;
        case 14:
          ok = 1;
          weekday = "";
          break;
        case 16:
          ok = 1;
          weekday = "";
          break;
        case 18:
          ok = 1;
          weekday = evening;
          break;
        case 20:
          ok = 1;
          weekday = evening;
          break;
        case 22:
          ok = 1;
          weekday = evening;
          break;
        default:
          ok = 0;
          break;
      }
      break;
    case 5:
      console.log("c'est vendredi");
      switch(Hour) {
        case 23:
          ok = 1;
          weekday = sleep;
          break;
        case 6:
          ok = 1;
          weekday = "";
          break;
        case 8:
          ok = 1;
          weekday = "";
          break;
        case 10:
          ok = 1;
          weekday = lunch;
          break;
        case 12:
          ok = 1;
          weekday = "";
          break;
        case 14:
          ok = 1;
          weekday = "";
          break;
        case 16:
          ok = 1;
          weekday = "For start the weekend";
          break;
        case 18:
          ok = 1;
          weekday = evening;
          break;
        case 20:
          ok = 1;
          weekday = evening;
          break;
        case 22:
          ok = 1;
          weekday = evening;
          break;
        default:
          ok = 0;
          break;
      }
      break;
    case 6:
      console.log("c'est samedi");
      switch(Hour) {
        case 23:
          ok = 1;
          weekday = sleep;
          break;
        case 6:
          ok = 1;
          weekday = "";
          break;
        case 8:
          ok = 1;
          weekday = "";
          break;
        case 10:
          ok = 1;
          weekday = lunch;
          break;
        case 12:
          ok = 1;
          weekday = "";
          break;
        case 14:
          ok = 1;
          weekday = "";
          break;
        case 16:
          ok = 1;
          weekday = "";
          break;
        case 18:
          ok = 1;
          weekday = evening;
          break;
        case 20:
          ok = 1;
          weekday = evening;
          break;
        case 22:
          ok = 1;
          weekday = evening;
          break;
        default:
          ok = 0;
          break;
      }
    ;
	break;
  }
};

//Exécution du programme
stream.on('tweet', KonachanTagEvent);
stream.on("follow", followedbis);
setInterval(PostIt, 1E3);
setInterval(Runkonachan, 10*60*30)
