let psl = require("psl");

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  hostname = url.indexOf("//") > -1 ? url.split("/")[2] : url.split("/")[0];

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
}

// function extractRootDomain(url) {
//     var domain = extractHostname(url),
//         splitArr = domain.split('.'),
//         arrLen = splitArr.length;

//     //extracting the root domain here
//     //if there is a subdomain
//     if (arrLen > 2) {
//         domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
//         //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
//         if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
//             //this is using a ccTLD
//             domain = splitArr[arrLen - 3] + '.' + domain;
//         }
//     }
//     return domain;
// }
urllist = [""];
for (var i = 0; i < urllist.length; i++) {
  var url = urllist[i];
  console.log(url);
  console.log(similarity("discord.com", psl.get(extractHostname(url))));
  console.log(similarity("discord.gift", psl.get(extractHostname(url))));
}
//console.log(similarity('discord.com',psl.get(extractHostname(url))));
