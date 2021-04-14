(function(){


    window.onload = function generateTable(json) {
        let currentId = "";
        let zero = "grey";
        let one = "purple";
        let two = "white";

        // This is a a hashmap for the different cell states!!!
        let correctStates = new Map([
            ["grey",0],
            ["purple",1],
            ["white",2]
        ]);
    //    fetch('https://threeinarowpuzzle.herokuapp.com/random') 
        fetch('https://threeinarowpuzzle.herokuapp.com/sample')
            .then(function(response){
                return response.json();
            })
            .then(function(json){
    
                let tableSize = json.rows;
                // let squareStatus = json.rows.currentState;
    
                console.log(json);            
          
    
            // I need to "createElements" based on the JSON data, and append that data to those children nodes  
            console.log("This is the tableSize variable !!!")
            console.log(tableSize);
    
    
                var theTable = document.querySelector('#theGame');
    
                console.log("\nThis is the result of a 'for each' loop~!!!!")
                Array.from(tableSize).forEach(row => {
                    console.log(row);
                })
    
                Array.from(tableSize)
                console.log("What the heck is this?   ")
    
    
                for(let i=0; i<tableSize.length; i++) {
    
                    var newRow = document.createElement('tr');
    
                    for(let j=0; j<tableSize.length; j++) {
                        var newCell = document.createElement('td');
                        newCell.style.width = "60px";
                        newCell.style.height = "60px";
                        newCell.style.border = "1px solid black";
                        newRow.style.border = "1px solid black";
                        if(tableSize[i][j].currentState == 0)
                        {
                            newCell.style.backgroundColor = "grey";
                        }
                        else if (tableSize[i][j].currentState == 1)
                        {
                            newCell.style.backgroundColor = "purple";
                        }
                        else
                        {
                            newCell.style.backgroundColor = "white";
                        }
    
                        
                        newCell.id = `${i} - ${j}`;
                        // newCell.innerText = `${i} - ${j}`;
           
                        newCell.onclick = function(event)
                        { 
                            currentId = event.target.id;
                            modifier();               
                        }
                        newRow.appendChild(newCell)
                     }
                    theTable.appendChild(newRow);
                }


                // console.log(tableSize)
                function modifier ()
                {
                    console.log(currentId);
                    let element = document.getElementById(currentId);
                    let id = currentId.split("-");
                    for(let i = 0; i < tableSize.length; i++)
                    {
                        for(let j = 0; j < tableSize.length; j++)
                        {
                            if(id[0] == i && id[1] == j)
                            {
                                if(tableSize[i][j].canToggle)
                                {
                                    if(element.style.backgroundColor == zero) // gray
                                    {
                                        element.style.backgroundColor = one;
                                    }
                                    else if( element.style.backgroundColor == one) // purple
                                    {
                                        element.style.backgroundColor = two; // white
                                    }
                                    else //if(element.style.backgroundColor == "white")
                                    {
                                        element.style.backgroundColor = zero;
                                    }
                                   
                                    //element.style.backgroundColor = "black";   
                                    console.log("can change!");
                                }
                                else
                                {
                                    console.log("can't change!");
                                }  // associating correct state(JSON) TO hashmap "correctStates"
                                if(tableSize[i][j].correctState == correctStates.get(element.style.backgroundColor))  
                                {
                                    console.log("CORRECT");
                                }
                                else
                                {
                                    console.log("INCORRECT");
                                }
                            }
                        }
                    }
                   
                   //element.style.backgroundColor = "black";
                }
                // Event buttons for added functionality
                document.querySelector('#checkPuzzleBtn').onclick = function(event) {
                    let winner = true;
                    
                    for(let i = 0; i < tableSize.length; i++)
                    {
                        for(let j = 0; j < tableSize.length; j++)
                        {
                            let id = `${i} - ${j}`;
                            let currentElement = document.getElementById(id);
                            if(tableSize[i][j].correctState != correctStates.get(currentElement.style.backgroundColor))
                            {
                                winner = false;
                                //console.log("INCORRECT YOU LOSE! >:o");
                            }
    
                        }
                    }
                    if(winner)
                    {
                        // !document.body.lastElementChild.tagName === "P"   Long-form 
                        const para = document.querySelector(".porkChop")
                        document.body.contains(para)
                        

                        if(!document.querySelector(".porkChop")) {
                             console.log("A winner you are!!!");
                        const paragraph = document.createElement("p"); 
                        paragraph.setAttribute("class", "porkChop");
              
                        // if there isn't a porkchop class paragraph create and append element!~
                        paragraph.style.backgroundColor = "green"
                        const winner = document.createTextNode("A winner you are!!!");
                        paragraph.appendChild(winner);
                        document.body.append(paragraph);  // the magic right hizear!
                        }
                       

                    }
                }
    
                //  Will need to see if the element is checked or unchecked -   if it is currently checked
                document.querySelector('#dangCheckBox').onclick = function(event) { 
                    
                    console.log(event.target.checked);
                    for(let i = 0; i < tableSize.length; i++)
                    {
                        for(let j = 0; j < tableSize.length; j++)
                        {
                            let id = `${i} - ${j}`;
                            let currentElement = document.getElementById(id);
                            if(event.target.checked == true)
                            {
                                if(tableSize[i][j].correctState != correctStates.get(currentElement.style.backgroundColor))
                                {
                                    currentElement.style.borderColor = "yellow";
                                    //console.log("INCORRECT YOU LOSE! >:o");
                                }
                                else 
                                {
                                    currentElement.style.borderColor = "black";
                                }
                            }
                            else if(event.target.checked == false)
                            {
                                currentElement.style.borderColor = "black";
                            }
    
    
                        }
                    }
                }
            }
        )};
    
    })()