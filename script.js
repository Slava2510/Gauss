function allocMas(size) {
  var mas = [] ;
  var a1,a2 ;
  for (var i=0 ; i<size ; i+=2) {
    a1 = Math.random() ;
    a2 = Math.random() ;
    mas.push(Math.sqrt((-2) * Math.log(a1))*Math.cos(2 * Math.PI * a2)) ;
    mas.push(Math.sqrt((-2) * Math.log(a1))*Math.sin(2 * Math.PI * a2)) ;
  }
  return mas ;
}

function allocMasSum(size , n) {
  var mas = [] ;
  var sum = 0 ;
  for (var j=0 ; j<size ; j++) {
    for(var i=0 ; i<n ; i++) {
      sum+=Math.random()-0.5 ;
    }
    mas.push(Math.sqrt(12/n)*sum) ;
    sum = 0 ;
  }
  return mas ;
}

function contAllocMas(size , t) {
  var mas = [] ;
  var M=131 ;
  var mas1 = [] ;
  var mas2 = [] ;
  var sum = 0 ;
  for(var i=0 ; i<size ; i++) {
    mas1 = allocMas(M) ;
    mas2 = allocMasSum(M,12) ;
    for(var j=0 ; j<M ; j++) {
      sum+=Math.cos(j*Math.PI*t)*mas1[j]+Math.sin(j*Math.PI*t)*mas2[j] ;
    }
    mas.push(sum) ;
    sum = 0 ;
  }
  return mas ;
}

function getMax(array) {
  var max = array[0] ;
  for (var i = 0; i < array.length; i++) {
    if(array[i]>max) max = array[i] ;
  }
  alert(max) ;
  return max ;
}
function getMin(array) {
  var min = array[0] ;
  for (var i = 0; i < array.length; i++) {
    if(array[i]<min) min = array[i] ;
  }
  return min ;
}

function getEverageMas(masOfMas) {
  var mas = [] ;
  var n = masOfMas.length ;
  var sum ;
  for (var i = 0; i < masOfMas[0].length; i++) {
    sum = 0 ;
    for (var j = 0; j < masOfMas.length; j++) {
      sum+=masOfMas[j][i] ;
    }
    mas.push(sum/masOfMas.length) ;
    sum = 0 ;
  }
  return mas ;
}

function main() {

  document.getElementById("bt").addEventListener("click", function() {
    var N = document.getElementById("N").value ;
    var size = document.getElementById("number").value ;
    var t0 = document.getElementById("t0").value-0;
    var t1 = document.getElementById("t1").value-0;
    var delta , masOfMas ,paintingMas , canvasMas ;
     delta = (t1-t0)/N ;
     masOfMas = [] ;
     paintingMas ;
     canvasMas = document.getElementsByTagName("canvas") ;
    for (var i = 0; i < N; i++) {
      paintingMas = contAllocMas(size , t0+i*delta) ;
      if(i<=10) {
        paint(canvasMas[i] , paintingMas) ;
      }
      masOfMas.push(paintingMas) ;
    }
    paint(canvasMas[10],getEverageMas(masOfMas),true) ;
  });
}
main() ;
