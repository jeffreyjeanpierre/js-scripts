reverseString = (str) => {
  result = [];
  predicates = [',','.','!', '?'];
  console.log(str.split(' '));
  str.split(' ').forEach((substr, pos)=>{ 
    substring = substr;
    
    predicates.forEach((pred, pos)=>{
    	if (substr.includes(pred)){
  	    substring = substr.split(pred);
        substring[1] = pred;
      }
    });
    if (!substring[1]) {
    	substring = [substr];
    }
    if (typeof substring == 'string') { result.push(substring); }
    if (typeof substring == 'object') { substring.forEach((item) => result.push(item)); }
  })
  result = result.reverse();
  predicates.forEach((pred, pos) => {
    if (result.includes(pred)) {
      result.splice(result.indexOf(pred), 2, result[result.indexOf(pred)] + result[result.indexOf(pred) + 1]);
    }
  });
  result = result.join(' ');
  return result;
}