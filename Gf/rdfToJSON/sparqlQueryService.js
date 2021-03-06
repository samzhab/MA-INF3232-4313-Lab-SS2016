angular.module('Enterprise2MapApp').
service('sparqlQueryService',function(){

  this.getCompanyQuery = function(){
    return '     PREFIX vivo: <http://vivoweb.org/ontology/core#>\
                 PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#> \
                 PREFIX eis:     <http://example.com/owl/eis/>\
                 SELECT * \
                 WHERE {\
                   ?subject a vivo:Company;\
                   rdfs:label ?companyName.\
                   OPTIONAL{\
                     ?subject	eis:hasCEO       	   ?companyCEO.\
                   }\
                   OPTIONAL{\
                     ?subject	eis:headquarters  ?companyHQ.\
                   }\
                   OPTIONAL{\
                      ?subject	eis:hasPlant         ?companyPlant.\
                    }\
                  }'
  }

  this.getPlantQuery = function(plantObject){
    return 'PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#>\
             PREFIX eis:     <http://example.com/owl/eis/>\
             SELECT * \
             WHERE {\
               <'+plantObject+'> a eis:Plant;\
               rdfs:label	?plantName.\
               OPTIONAL{  \
                 <'+plantObject+'> eis:plantManager   ?plantManager\
               }            \
               OPTIONAL{  \
                 <'+plantObject+'> eis:numWorker   ?plantWorkers\
               }            \
               OPTIONAL{  \
                 <'+plantObject+'> eis:typeOfPlant   ?plantType\
               }            \
               OPTIONAL{\
                 <'+plantObject+'>    eis:hasFactory    ?plantFactory.\
               }\
             }';
  }//getPlantQuery

  this.getFactoryQuery = function(factoryObject){
    return 'PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#>\
            PREFIX eis:     <http://example.com/owl/eis/>      \
            PREFIX lgdo:  <http://linkedgeodata.org/ontology/>\
            SELECT *              \
            WHERE {               \
	             <'+factoryObject+'>	a	lgdo:Factory;               \
				                rdfs:label	?factoryName.      \
	          OPTIONAL{\
	             <'+factoryObject+'>    eis:wasBuilt    ?buildDate.               \
             }\
             OPTIONAL{ \
               <'+factoryObject+'>  eis:hasBuilding ?factoryBuilding  \
             }\
	            <'+factoryObject+'>    eis:hasPolygon    ?factoryPolygon.               \
            }';
  }//getFactoryQuery

  this.getPolygonQuery = function(polygonObject){
  //  console.log(polygonObject);
    return 'PREFIX eis: <http://example.com/owl/eis> \
            PREFIX ngeo: <http://geovocab.org/geometry#> \
            PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#>\
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>    \
            SELECT ?polygonType ?polygonList ?lat ?long \
            WHERE { \
            <'+polygonObject+'> a ?polygonType. \
  		      <'+polygonObject+'> ngeo:posList/rdf:rest*/rdf:first ?polygonList. \
            ?polygonList geo:lat ?lat. \
  		      ?polygonList geo:long ?long.\
            } group by ?polygonType ?polygonList ?lat ?long  ';
  }



});
