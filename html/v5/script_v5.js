
  var body = document.getElementsByTagName("body")[0];
    var tbl = document.getElementsByTagName("table")[0];
    var tblHead = document.createElement("thead");
    var tblBody = document.createElement("tbody");
    var btnSuivant = document.getElementById("Suivant");
    var btnPrecedant = document.getElementById("Precedant");
    var texte = document.getElementById("Page");
    var pop_up_charged = document.getElementById("charged");
    var pop_up_fast = document.getElementById("fast");
    var tri = document.getElementsByTagName("thead")[0];
    var click_id=0;
    var click_nom=0;
    var click_gen=0;
    var click_1=0;
    var click_end=0;
    var click_att=0;
    var click_def=0;
    var select1= document.getElementById("gen-select");
    var filtreGen="basic";
    var filtreType="basic";
    var filtreTexte="";
    var page=1;
    var max=25;
//filtres
//generation
select1.addEventListener("change",function(){
    filtreGen=this.value
    filtre(filtreGen,filtreType,filtreTexte)
});

//type
var select2= document.getElementById("type-select");
select2.addEventListener("change",function(){
    filtreType=this.value;
    filtre(filtreGen,filtreType,filtreTexte)
});

//recherche textuelle
var textarea= document.getElementById("nom");
textarea.addEventListener("input",function(){
    filtreTexte=this.value;
    filtre(filtreGen,filtreType,filtreTexte);
})
var optionsgen=[];
var optionType=[];
for(var i=0; i<Pokemon.all_pokemons.length; i++){
    var gen=true;
    for(var j=0; j<optionsgen.length; j++){
        if(Pokemon.all_pokemons[i].generation ==optionsgen[j]){
            gen=false;
        }
    }
    if(gen){
        optionsgen.push(Pokemon.all_pokemons[i].generation)
    }
    var type=true;
    for(var j=0; j<optionType.length; j++){
        if(Pokemon.all_pokemons[i].type[0].type ==optionType[j]){
            type=false;
            }
        }
    if(type){
        optionType.push(Pokemon.all_pokemons[i].type[0].type);
    }
}

for(var i=0; i<optionsgen.length;i++) {
    var option=document.createElement("option")
    option.text=optionsgen[i]
    option.value=optionsgen[i]
    select1.add(option);
}
for(var i=0; i<optionType.length;i++) {
    var option=document.createElement("option")
    option.text=optionType[i]
    option.value=optionType[i]
    select2.add(option);
}

var filtri =[];

for(var i=0; i<Pokemon.all_pokemons.length; i++){
    filtri.push(Pokemon.all_pokemons[i]);
}

function tableau(tab){
if(tab.length%25==0){
    var page_max=tab.length/25;
}
else{
    var page_max=((tab.length-(tab.length%25))/25)+1;
}
if(page==1){
    btnPrecedant.disabled=true;
  }
if(page==page_max){
    btnSuivant.disabled=true;
  }
if(page>1 && page<page_max){
    btnPrecedant.disabled=false;
    btnSuivant.disabled=false;
  }
  texte.innerHTML=page+"/"+page_max
while(tblBody.firstChild){
    tblBody.removeChild(tblBody.firstChild);
    }
for(var i=max-25;i<max;i++){
var row = document.createElement("tr");
var cell1 = document.createElement("th");
var cell2 = document.createElement("th");
var cell3 = document.createElement("th");
var cell4= document.createElement("th");
var cell5= document.createElement("th");
var cell6= document.createElement("th");
var cell7= document.createElement("th");
var cell8= document.createElement("th");
console.log(tab[i])
if(tab[i].id<10){
    var img = document.createElement('img');
        img.src =
'../webp/thumbnails/00'+tab[i].id.toString()+".webp";
}
else if(tab[i].id<100){
    var img = document.createElement('img');
        img.src =
'../webp/thumbnails/0'+tab[i].id.toString()+".webp";
}
else{
    var img = document.createElement('img');
        img.src =
'../webp/thumbnails/'+tab[i].id.toString()+".webp";
}
cell1.appendChild(img);

    row.appendChild(cell1);
    var cellId = document.createTextNode(tab[i].id.toString());
    cell2.appendChild(cellId);
    row.appendChild(cell2);
    var cellNom = document.createTextNode(tab[i].nom.toString());
    cell3.appendChild(cellNom);
    row.appendChild(cell3);
    var cellGeneration = document.createTextNode(tab[i].generation.toString());
    cell4.appendChild(cellGeneration);
    row.appendChild(cell4);
    if(tab[i].type.length > 1){
        var cellType = document.createTextNode(tab[i].type[0].type.toString()+" , "+tab[i].type[1].type.toString());
        cell5.appendChild(cellType);
        row.appendChild(cell5);
    }
    else{
        var cellType = document.createTextNode(tab[i].type[0].type.toString());
        cell5.appendChild(cellType);
        row.appendChild(cell5);
    }
    var cellEndurance = document.createTextNode(tab[i].endurance.toString());
    cell6.appendChild(cellEndurance);
    row.appendChild(cell6);
    var cellAttaque = document.createTextNode(tab[i].attaque.toString());
    cell7.appendChild(cellAttaque);
    row.appendChild(cell7);
    var cellDefense = document.createTextNode(tab[i].defense.toString());
    cell8.appendChild(cellDefense);
    row.appendChild(cell8);
    row.setAttribute('id',i+1)


tblBody.appendChild(row);
}

tbl.appendChild(tblBody);

}

//sert à fermer la pop up quand on clique sur la croix et aussi à vider son contenu
document.getElementById('modal-close').addEventListener('click', function(e) {
document.getElementById('modal').style.display = 'none'
pop_up_charged.innerHTML = "";
pop_up_fast.innerHTML = "";
})

function pokemonById(filtri, id){for(var i=0;i<filtri.length;i++){
    if(filtri[i].id==id){return filtri[i];}}
};

function v3(){
  const ligne = document.querySelectorAll('tbody tr');
  const pokemon_img = document.querySelectorAll('table img');

  for (const f of ligne) {
    //evenement pour l'affichage des infos des attaques
    f.addEventListener('click', function() {
        document.getElementById('modal').style.display = 'block'
        for (var y=0;y<pokemonById(filtri,this.getAttribute('id')).move.length;y++){
            if(pokemonById(filtri,this.getAttribute('id')).move[y].genre_move == "charged_moves"){
                var ligne_pop_charged = document.createElement("li");
                var pop = document.createTextNode(pokemonById(filtri,this.getAttribute('id')).move[y].att_name + " / " + pokemonById(filtri,this.getAttribute('id')).move[y].type_move.type + " / " + pokemonById(filtri,this.getAttribute('id')).move[y]._power);
                ligne_pop_charged.appendChild(pop);
                pop_up_charged.appendChild(ligne_pop_charged);
            }
            else{
                var ligne_pop_fast = document.createElement("li");
                var pop = document.createTextNode(pokemonById(filtri,this.getAttribute('id')).move[y].att_name + " / " + pokemonById(filtri,this.getAttribute('id')).move[y].type_move.type + " / " + pokemonById(filtri,this.getAttribute('id')).move[y]._power);
                ligne_pop_fast.appendChild(pop);
                pop_up_fast.appendChild(ligne_pop_fast);
            }
        }   
    });
  }
    for(const p of pokemon_img) {
        //evenement pour l'affichage de la pop up de l'image pokemon
        p.addEventListener("mouseenter", function(){
            document.getElementById('modal2').style.display = 'block'
            var image_grande = document.createElement("img");
            image_grande.src= '../webp/images/' + p.src.substr(-8,8);
            const imageContainer = document.querySelector('.modal-container2');
            imageContainer.appendChild(image_grande);
        })
        p.addEventListener("mouseout", function(){
            document.getElementById('modal2').style.display = 'none' 
            const imageContainer = document.getElementById('modal2').querySelector('.modal-container2');
            imageContainer.innerHTML = "";   
        })
        
    }

  tbl.setAttribute("border", "2");
  
}

function sortByName(click){
    var liste_noms= []
    var liste_noms2= []
    if(click%2==0){
       for(var i=0;i<filtri.length;i++){
        liste_noms.push(filtri[i].nom)
        }
        liste_noms = liste_noms.sort();
        for(var y=0;y<liste_noms.length;y++){
            for(var u=0;u<filtri.length;u++){
                if(liste_noms[y] == filtri[u].nom){
                    liste_noms2.push(filtri[u]);
                }
            }
        }     
    }
    else{
        for(var i=0;i<filtri.length;i++){
            liste_noms.push(filtri[i].nom)
            }
            liste_noms = liste_noms.sort();
            liste_noms = liste_noms.reverse();
            for(var y=0;y<liste_noms.length;y++){
                for(var u=0;u<filtri.length;u++){
                    if(liste_noms[y] == filtri[u].nom){
                        liste_noms2.push(filtri[u]);
                    }
                }
            }     
    }
    
    return liste_noms2
}

//fonction unique pour les tri avec des nombres
function sortPokemonByNumbers(click,attribut){
    var sorted=filtri;
    if(click%2==0){
        for(var i=0; i<sorted.length; i++){
            var pokemonCourant=i;
            for(var j=i; j<sorted.length; j++){
                if(attribut=="endurance"){
                    var val1 = filtri[pokemonCourant].endurance;
                    var val2 = filtri[j].endurance;
                }
                if(attribut=="id"){
                    var val1 = filtri[pokemonCourant].id;
                    var val2 = filtri[j].id;
                }
                if(attribut=="generation"){
                    var val1 = filtri[pokemonCourant].generation;
                    var val2 = filtri[j].generation;
                }
                if(attribut=="attaque"){
                    var val1 = filtri[pokemonCourant].attaque;
                    var val2 = filtri[j].attaque;
                }
                if(attribut=="defense"){
                    var val1 = filtri[pokemonCourant].defense;
                    var val2 = filtri[j].defense;
                }
                
                if(val1<val2){
                    pokemonCourant=j;
                }
            }
            if(pokemonCourant!=i){
                var temp=sorted[pokemonCourant];
                sorted[pokemonCourant] =sorted[i];
                sorted[i]=temp;
            }
        }  
    }
    else{
        for(var i=0; i<sorted.length; i++){
            var pokemonCourant=i;
            for(var j=i; j<sorted.length; j++){
                if(attribut=="endurance"){
                    var val1 = filtri[pokemonCourant].endurance;
                    var val2 = filtri[j].endurance;
                }
                if(attribut=="id"){
                    var val1 = filtri[pokemonCourant].id;
                    var val2 = filtri[j].id;
                }
                if(attribut=="generation"){
                    var val1 = filtri[pokemonCourant].generation;
                    var val2 = filtri[j].generation;
                }
                if(attribut=="attaque"){
                    var val1 = filtri[pokemonCourant].attaque;
                    var val2 = filtri[j].attaque;
                }
                if(attribut=="defense"){
                    var val1 = filtri[pokemonCourant].defense;
                    var val2 = filtri[j].defense;
                }
                if(val1>val2){
                    pokemonCourant=j;
                }
            }
            if(pokemonCourant!=i){
                var temp=sorted[pokemonCourant];
                sorted[pokemonCourant] =sorted[i];
                sorted[i]=temp;
            }
        }
    }
    return sorted;
};

function sortByType(click){
    var liste_noms= []
    var liste_noms2= []
    if(click%2==0){
        liste_noms = ['Bug','Dark','Dragon','Electric','Fairy','Fighting','Fire','Flying','Ghost','Grass','Ground','Ice','Normal','Poison','Psychic','Rock','Steel','Water'];
        liste_noms = liste_noms.sort();
        for(var y=0;y<liste_noms.length;y++){
            for(var u=0;u<filtri.length;u++){
                if(liste_noms[y] == filtri[u].type[0].type){
                    liste_noms2.push(filtri[u]);
                }
            }
        }     
    }
    else{
        liste_noms = ['Bug','Dark','Dragon','Electric','Fairy','Fighting','Fire','Flying','Ghost','Grass','Ground','Ice','Normal','Poison','Psychic','Rock','Steel','Water'];
        liste_noms = liste_noms.sort();
        liste_noms = liste_noms.reverse();
       for(var y=0;y<liste_noms.length;y++){
            for(var u=0;u<filtri.length;u++){
                if(liste_noms[y] == filtri[u].type[0].type){
                    liste_noms2.push(filtri[u]);
                }
            }
        }     
    }
    
    return liste_noms2
}

function tri_id(){
    const entete = document.getElementById('id');
    entete.addEventListener('click', function(){
            filtri = sortPokemonByNumbers(click_id,"id");
            tableau(filtri);
            click_id++;
            v3();
            
            
                
        });

};

function tri_att(){
    const entete = document.getElementById('att');
    entete.addEventListener('click', function(){
            filtri = sortPokemonByNumbers(click_att,"attaque");
            tableau(filtri);
            click_att++;
            v3();
            
            
                
        });

};

function tri_def(){
    const entete = document.getElementById('def');
    entete.addEventListener('click', function(){
            filtri = sortPokemonByNumbers(click_def,"defense");
            tableau(filtri);
            click_def++;
            v3();
            
                
        });

};

function tri_gen(){
    const entete = document.getElementById('gen');
    entete.addEventListener('click', function(){
            filtri = sortPokemonByNumbers(click_gen,"generation");
            tableau(filtri);
            click_gen++;
            v3();
    });

};

function tri_type(){
    const entete = document.getElementById('1');
    entete.addEventListener('click', function(){
            filtri = sortByType(click_1);
            tableau(filtri);
            click_1++;
            v3();
            
            
                
        });

};

function tri_nom(){
    const entete = document.getElementById('nom2');
    entete.addEventListener('click', function(){
            filtri = sortByName(click_nom);
            tableau(filtri);
            click_nom++;
            v3();
            
            
                
        });

};

//tri endurance
function tri_endu(){
    const entete = document.getElementById('end');
    entete.addEventListener('click', function(){
        filtri = sortPokemonByNumbers(click_end,"endurance");
        tableau(filtri);
        click_end++;
        v3();    
        });

};


function filtre(gen,type,text){
    filtri=[]
    for(const objet of Pokemon.all_pokemons){
        var garder =true;
        if(gen!="basic"){
            if(gen!=objet.generation){
                garder = false;
            }
        }
        if(type!="basic"){
            if(objet.type.length>1){
                if(type!=objet.type[0].type && type!=objet.type[1].type){
                    garder=false;
                }
            }
            else{
                if(type!=objet.type[0].type){
                    garder=false;
                }
            }
        }
        if(text!=""){
            if(!(objet.nom.includes(text))){
                garder=false;
            }
        }
        if(garder){
            filtri.push(objet);
        }
    }
    max=25
    page=1
    tableau(filtri);
    v3();
}

tableau(filtri);
v3();

tri_nom();
tri_endu();
tri_id()
tri_gen();
tri_att();
tri_def();
tri_type();


//actualisation du tableau en fonction du bouton pressé
function suivant(){

    page=page+1;
    max=max+25;
    tableau(filtri);
    v3();
    tri_nom();
    tri_endu();
}

function precedant(){
    page=page-1;
    max=max-25;
    tableau(filtri);
    v3();
    tri_nom();
    tri_endu();
}
