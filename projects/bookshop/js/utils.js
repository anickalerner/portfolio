'use strict';

function zeroLead3(id){
    var idStr = id.toString();
    return (idStr.length >= 3) ? idStr : zeroLead3('0'+idStr);
}