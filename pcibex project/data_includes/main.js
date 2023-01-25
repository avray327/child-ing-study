PennController.ResetPrefix(null) // Keep this here


// zip of images and sounds?


function SepWithN(sep, main, n) {
	this.args = [sep,main];

	this.run = function(arrays) {
		assert(arrays.length == 2, "Wrong number of arguments (or bad argument) to SepWithN");
		assert(parseInt(n) > 0, "N must be a positive number");
		let sep = arrays[0];
		let main = arrays[1];

		if (main.length <= 1)
			return main
		else {
			let newArray = [];
			while (main.length){
				for (let i = 0; i < n && main.length>0; i++)
					newArray.push(main.pop());
				for (let j = 0; j < sep.length && main.length > 0; ++j)
					newArray.push(sep[j]);
			}
			return newArray;
		}
	}
}
function sepWithN(sep, main, n) { return new SepWithN(sep, main, n); }


newTrial("intro",
    newText("these are the instructions")
        .center()
        .print()
    ,
    newImage("https://raw.githubusercontent.com/pennchildlanglab/lookit-stimuli-template/master/img/Sarah_happy.jpg")
        .center()
        .print(),
    newButton("Go to the first trial")
        .center()
        .print()
        .wait()
)

////add practice trials
    //go until get them correct and are fast
// run practice first then randomize experiment trials
////randomize group and randomize order within group
Sequence("intro")
// run 10 random trials then have a break
////,sepWithN('break',randomize("experiment"),10),"end")


newTrial('break',
	newText('You may now take a short break. ' +
			'Please don\'t take too long, so you don\'t ....? ' +
			'Click below when you are ready to return to the experiment.')
		.print()
	,
	
	newButton('click', 'Click here to return to the experiment!')
		.center()
		.print()
		.wait()
)

// Only run 24 first trials defined in the table (it's a long experiment....)
Template( "child stims.csv" , row =>
    // in cvs have prime, target columns then in the trial do like in unmasked prime to call them 
    //////randomize order, randomize left right-good
    // create 3 groups to make the three lists 
    ///// one trial is actaully two trials because prime and target
    /////every 9 there is a break - stamp gets filled in on progress bar
    ///// randomize isi
    newTrial("experiment",

        newTimer(200).start().wait()
        ,
        defaultImage.size("20vh", "20vh")
        ,
        newCanvas("correct", "40vw", "40vh")
            .hidden()
            .add( "center at 50%" , "middle at 50%" , newImage(row.Prime_pic_correct) )
            .print( "center at 25vw" , "middle at 50vh" )
        ,
        newCanvas("distractor", "40vw", "40vh")
            .hidden()
            .add( "center at 50%" , "middle at 50%" , newImage(row.Prime_pic_distract) )
            .print( "center at 75vw" , "middle at 50vh" )
        ,
        newSelector("print_images")
            .add(
                getCanvas("correct"),
                getCanvas("distractor"),
            )
            .shuffle()
        ,
        getCanvas("correct").visible()
        ,
        getCanvas("distractor").visible()
        ,
        newTimer(200).start().wait()
        ,
        
        newAudio("test", row.prime_soundfile)
            .log()
            .play()
        ,
        // ////wait for click but after 2500 move on
        newSelector("answer")
            .add(
                getCanvas("correct"),
                getCanvas("distractor"),
            )
            .once()
            .log()
            .wait(2500)
        ,
          newTimer(200).start().wait()
        ,
        defaultImage.size("20vh", "20vh")
        ,
        newCanvas("correct", "40vw", "40vh")
            .hidden()
            .add( "center at 50%" , "middle at 50%" , newImage(row.Target_pic_correct) )
            .print( "center at 25vw" , "middle at 50vh" )
        ,
        newCanvas("distractor", "40vw", "40vh")
            .hidden()
            .add( "center at 50%" , "middle at 50%" , newImage(row.Target_pic_distract) )
            .print( "center at 75vw" , "middle at 50vh" )
        ,
        newSelector("print_images")
            .add(
                getCanvas("correct"),
                getCanvas("distractor"),
            )
            .shuffle()
        ,
        getCanvas("correct").visible()
        ,
        getCanvas("distractor").visible()
        ,
        newTimer(200).start().wait()
        ,
        
        newAudio("test", row.target_soundfile)
            .log()
            .play()
        ,
        // ////wait for click but after 2500 move on
        newSelector("answer")
            .add(
                getCanvas("correct"),
                getCanvas("distractor"),
            )
            .once()
            .log()
            .wait(2500)   
    
    )
    .log("group", row.Group)
    .log("item", row.item)
    .log("condition", row.trial_type)
    .log("prime", row.Prime_word)
    .log("target", row.Target_word)
)

SendResults()

newTrial("end",
    exitFullscreen()
    ,
    newText("The is the end of the experiment, you can now close this window. Thank you!")
        .center()
        .print()
    ,
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
.setOption("countsForProgressBar",false)