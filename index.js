function init()
{
    updateFeeds();
}

// Function gets the selected region and then sends info to getImages()
function updateFeeds()
{
    camera_count = 0;
    rows = 0;
    removeCurrentFeeds();
    // Get the selection menu
    var selection = document.getElementById("segment_selection");
    var selected_area = document.getElementById("selected_area");
    // Get the selected value
    var region = selection.options[selection.selectedIndex].value;
    selected_area.innerHTML = selection.options[selection.selectedIndex].innerHTML;
    // Send value to getImages
    getImages(region);
}

/* Function that gets the correct image link, creates a dict of them and sends
   dict to setImageS() */
function getImages(region)
{
    var all_regions = ["AG", "AT", "SLO", "PB", "PR", "SM"];
    // See the getFeeds() function for what this var is
    var allfeeds = getFeeds();
    var regional_feeds = null;

    // Get current time to append to our images
    var current_time = Date.now();

    // get an Array containing dicts of the selected region (if it's not "ALL")
    if (region != "ALL")
    {
        regional_feeds = allfeeds[region];

        // Now we are going to append to the IMG links with our current time in milliseconds
        // Iterate through each Camera dictionary in the array
        for (var i = 0, len = regional_feeds.length; i < len; i++)
        {
            regional_feeds[i].img += ("?" + current_time);
        }

        // Now go set the image feeds
        var row = null;
        row = setImages(regional_feeds, row);
        var camera_div = document.getElementById("camera_table");
        camera_div.appendChild(row);
    }
    else
    {
        regional_feeds = allfeeds;
        var row = null;
        for (var n = 0, l = all_regions.length; n < l; n ++)
        {
            for (var i = 0, len = regional_feeds[all_regions[n]].length; i < len; i++)
            {
                regional_feeds[all_regions[n]][i].img += ("?" + current_time);
            }
            // Now go set the image feeds
            row = setImages(regional_feeds[all_regions[n]], row);
        }

        var camera_div = document.getElementById("camera_table");
        camera_div.appendChild(row);
    }
}

/* Function that sets the provided images and titles of the feeds onto the html
    in table rows of 5 */
var rows = 0;
var camera_count = 0;
function setImages(cameras, row)
{
    var feed_row;
    // check if it's the first row to be added
    if (row == null)
    {
        feed_row = document.createElement('div');
        feed_row.id = "camera_row_" + rows;
        feed_row.style = "display:table-row";
    }
    else
    {
        feed_row = row;
    }
    // Get the Camera table
    var camera_div = document.getElementById("camera_table");


    for (var i = 0, len = cameras.length; i < len; i++, camera_count++)
    {
        var img = document.createElement("img");
        var lbl = document.createElement("h4");
        var div = document.createElement('div');

        // We've maxed the row, time to make a new row
        if (camera_count != 0 && camera_count%5 == 0)
        {
            camera_div.appendChild(feed_row);
            rows++;
            feed_row = document.createElement('div');
            feed_row.id = "camera_row_" + rows;
            feed_row.style = "display:table-row";
        }

        div.style = "display:table-cell";
        img.src = cameras[i].img;
        lbl.innerHTML = cameras[i].name;

        div.appendChild(lbl);
        div.appendChild(img);
        feed_row.appendChild(div);
    }
    return feed_row;
}

function removeCurrentFeeds()
{
    var camera_div = document.getElementById("camera_table");
    while (camera_div.hasChildNodes())
    {
        console.log("Removed a child");
        camera_div.removeChild(camera_div.lastChild);
    }
}

/* Function populates a dictionary of arrays of dictionarys (complicated, I know)
 Heres the nested mess:
  OUTER DICTIONARY:
      1st KEY - REGION ("PR", "AT", etc.)
      1st VALUE - ARRAY OF DICTIONARIES
          ARRAY INDEXES - Point to a DICTIONARY
              INNER DICTIONARIES:
                  1st KEY - NAME
                  1st VALUE - the name of the camera, i.e. 'Paso Robles : SR-46 East'
                  2nd KEY - IMG
                  2nd VALUE - URL of the image of the feed snapshot
 The good news is by using this we can simply filter what region we want by doing this:
      var pismo_beach_feeds = all_feeds["PB"];
 This will give us an array that points to the individual dictionaries containing  names/images of all
 pismo beach traffic cameras */
function getFeeds()
{
    var feeds = {
    "PR" : [
        {"name":'Paso Robles : SR-46 East',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101sr46east/us101sr46east.jpg'}
    ],
    "AT" : [
        {"name":'Atascadero : Traffic Way',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101trafficway/us101trafficway.jpg'},
        {"name":'Atascadero : Hwy 41 West in Atascadero',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101sr41west/us101sr41west.jpg'},
        {"name":'Atascadero : Curbaril',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101curbaril/us101curbaril.jpg'},
        {"name":'Atascadero :Santa Rosa Rd',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101santarosard/us101santarosard.jpg'},
        {"name":'Atascadero : Santa Barbara Rd',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101santabarbarard/us101santabarbarard.jpg'},
        {"name":'Atascadero : SR-58',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101sr58/us101sr58.jpg'}
    ],
    "SLO" : [{"name":'San Luis Obispo : Fox Hollow',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101foxhollow/us101foxhollow.jpg'},
        {"name":'San Luis Obispo : Broad Street',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101broadstreet/us101broadstreet.jpg'},
        {"name":'San Luis Obispo : Marsh Street',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101marshstreet/us101marshstreet.jpg'},
        {"name":'San Luis Obispo : Monterey Street',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101montereystreet/us101montereystreet.jpg'},
        {"name":'San Luis Obispo : Madonna Road',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101madonnaroad/us101madonnaroad.jpg'},
        {"name":'San Luis Obispo : Los Osos Valley Road',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101losososvalleyroad/us101losososvalleyroad.jpg'},
        {"name":'San Luis Obispo : South Higuera Street',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101southhiguerastreet/us101southhiguerastreet.jpg'},
        {"name":'San Luis Obispo : San Luis Bay Drive',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101sanluisbaydrive/us101sanluisbaydrive.jpg'}
    ],
    "PB" : [{"name":'Pismo Beach : Avila Beach Drive',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101avilabeachdrive/us101avilabeachdrive.jpg'},
        {"name":'Pismo Beach : Spyglass',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101spyglassdr/us101spyglassdr.jpg'},
        {"name":'Pismo Beach : Mattie Road',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101mattieroad/us101mattieroad.jpg'},
        {"name":'Pismo Beach : 101 at Bello and Route 1',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101sr1andbellost/us101sr1andbellost.jpg'},
        {"name":'Pismo Beach : 4th Street',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us1014thstreet/us1014thstreet.jpg'}
    ],
    "AG" : [{"name":'Arroyo Grande : Camino Mercado',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101caminomercado/us101caminomercado.jpg'},
        {"name":'Arroyo Grande : Grand Avenue',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101grandavenue/us101grandavenue.jpg'}
    ],
    "SM" : [{"name":'Santa Maria : SR-135 Broadway',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101sr135broadway/us101sr135broadway.jpg'},
        {"name":'Santa Maria : Union Valley Parkway in Santa Maria',
        "img":'http://cwwp2.dot.ca.gov/data/d5/cctv/image/us101unionvalleyparkway/us101unionvalleyparkway.jpg'}
    ]};
    return feeds;
}
