String.prototype.replace = function(newString, index){
  let result;
  if (index == 0){
    result = newString + this.substring(1, this.length);
  }
  if (index == this.length){
    return;
  }
  if (index == this.length -1){
    result = this.substring(0, index) + newString;
  }
  else{
    result = this.substring(0, index) + newString + this.substring(index + 1, this.length);
  }
  return result;
}


String.prototype.insert = function(newString, index){
  let result;
  if (index == 0){
    result = newString + this;
  }
  else{
    result = this.substring(0, index) + newString + this.substring(index, this.length);
  }
  return result;
}

function assert(condition, message) {
  if (!condition) {
    message = message || "Assertion failed";
    if (typeof Error !== "undefined") {
        throw new Error(message);
    }
    throw message;
  }
}