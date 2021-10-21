# Boolean simplification

The original function. This is fine. It does the

```javascript
function sleep_in(weekday, vacation) {
  if (weekday == true && vacation == true){
    return true;
  }
  if (weekday == true && vacation == false){
    return false;
  }
  if (weekday == false && vacation == true){
    return true;
  }
  if (weekday == false && vacation == false){
    return true;
  }
}
```

```javascript
function sleep_in(weekday, vacation) {
  if (weekday && vacation){
    return true;
  }
  if (weekday && vacation == false){
    return false;
  }
  if (weekday == false && vacation){
    return true;
  }
  if (weekday == false && vacation == false){
    return true;
  }
}
``````javascript


function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  }
  if (weekday && !vacation){
    return false;
  }
  if (!weekday && vacation){
    return true;
  }
  if (!weekday && !vacation){
    return true;
  }```
}


function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  }
  if (!weekday && vacation){
    return true;
  }
  if (!weekday && !vacation){
    return true;
  }
  if (weekday && !vacation){
    return false;
  }
}




function sleep_in(weekday, vacation) {
  if (weekday && vacation) {
    return true;
  } else if (!weekday && vacation){
    return true;
  } else if (!weekday && !vacation){
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}


function sleep_in(weekday, vacation) {
  if ((weekday && vacation) || (!weekday && vacation) || (!weekday && !vacation)) {
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}


function sleep_in(weekday, vacation) {
  if (vacation || (!weekday && !vacation)) {
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}


function sleep_in(weekday, vacation) {
  if (vacation || (!weekday && !false)) {
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}


function sleep_in(weekday, vacation) {
  if (vacation || (!weekday && true)) {
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}

function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (weekday && !vacation){
    return false;
  }
}


function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (weekday && !false){
    return false;
  }
}

function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (weekday && true){
    return false;
  }
}

function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (true && true){
    return false;
  }
}

function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else if (true){
    return false;
  }
}

function sleep_in(weekday, vacation) {
  if (vacation || !weekday) {
    return true;
  } else {
    return false;
  }
}


function sleep_in(weekday, vacation) {
  return vacation || !weekday;
}
