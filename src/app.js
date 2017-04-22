const css = require('./app.scss');
$(document).ready(function() {
	var box1 = document.querySelector('.box1');
	var box2 = document.querySelector('.box2');
	var head1 = document.querySelector('.head1');
	var head2 = document.querySelector('.head2');
	$('#fullpage').fullpage({
		verticalCentered: false,

		onLeave: function(index, nextIndex, direction){
		var leavingSection = $(this);
		if(index == 1){
			TweenMax.to(box1,0.5,{alpha:0,width:0,delay:0.7});
			TweenMax.to(box2,0.5,{alpha:0,width:0,delay:0.7});
		}
		//after leaving section 2
		// if(index == 2 && direction =='down'){
		// 	TweenMax.to(box,1,{width:200});
		// }
		else if(index == 2 && direction == 'up'){
			TweenMax.to(box1,1,{alpha:1,width:'100%',delay:0.5});
			TweenMax.from(head1,1,{alpha:0,x:'-200',delay:1});
			TweenMax.to(box2,1,{alpha:1,right:0,width:'100%',delay:0.5});
			TweenMax.from(head2,1,{alpha:0,x:'+200',delay:1});
		}
	}
	});
});

