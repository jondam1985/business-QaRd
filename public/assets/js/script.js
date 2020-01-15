// jquery code goes here

$( document ).ready(function() {
	
	//*************************** POST REQUEST *********************************//
	
	let $userSubmitBtn = $("#userSubmit");
	
	// 3. User data sent to server to be dealt with by mysql database using AJAX
	let saveUser = function(userInfo) {
		return $.ajax({
			url: "/api/updateUser",
			data: userInfo,
			method: "POST"
		});	
	};
  
	// 2. Send user info to ajax function in form of an object for the server to use with mysql to create user profile and generate business QaRd
	let handleUserInfoDelivery = function() {

		//Set Variables for form submission to server
		// Errors to check form values 
		let errors = false;
		let userFirstName = document.querySelector("#regForm #first_name").value;
		let userLastName = document.querySelector("#regForm #last_name").value;
		let userEmail = document.querySelector("#regForm #e_mail").value;
		let userPhone = document.querySelector("#regForm #phone").value;
		let userCompany = document.querySelector("#regForm #company").value;
		let userRole = document.querySelector("#regForm #role").value;
		let userPortfolio = document.querySelector("#regForm #portfolio").value;
		let userLinkedIn = document.querySelector("#regForm #linked_in").value;
		let userInstagram = document.querySelector("#regForm #instagram").value;
		let userStyle;

		if (document.querySelector("#regForm #style1").checked){
			userStyle = document.querySelector("#regForm #style1").value;
		}else if (document.querySelector("#regForm #style2").checked){
			userStyle = document.querySelector("#regForm #style2").value;
		}else if (document.querySelector("#regForm #style3").checked){
			userStyle = document.querySelector("#regForm #style3").value;
		}else if (document.querySelector("#regForm #style4").checked){
			userStyle = document.querySelector("#regForm #style4").value;
		}

		let userInfo = {
			userFirstName: userFirstName,
			userLastName: userLastName,
			userEmail: userEmail,
			userPhone: userPhone,
			userCompany: userCompany,
			userRole: userRole,
			userPortfolio: userPortfolio,
			userLinkedIn: userLinkedIn,
			userInstagram: userInstagram,
			userStyle: userStyle
		};

		if (userFirstName === ""){ 
			document.querySelector("#regForm #first_name_error").classList.add( "inError" ); errors = true;
		}else{
			document.querySelector("#regForm #first_name_error").classList.remove( "inError" );
		}

		if (userLastName === ""){ 
			document.querySelector("#regForm #last_name_error").classList.add( "inError" ); errors = true;
		}else{
			document.querySelector("#regForm #last_name_error").classList.remove( "inError" );
		}

		if (userEmail === ""){ 
			document.querySelector("#regForm #e_mail_error").classList.add( "inError" ); errors = true;
		}else{
			document.querySelector("#regForm #e_mail_error").classList.remove( "inError" );
		}

		if (userPhone === ""){ 
			document.querySelector("#regForm #phone_error").classList.add( "inError" ); errors = true;
		}else{
			document.querySelector("#regForm #phone_error").classList.remove( "inError" );
		}

		if (userCompany === ""){ 
			document.querySelector("#regForm #company_error").classList.add( "inError" ); errors = true;
		}else{
			document.querySelector("#regForm #company_error").classList.remove( "inError" );
		}

		if (userRole === ""){ 
			document.querySelector("#regForm #role_error").classList.add( "inError" ); errors = true;
		}else{
			document.querySelector("#regForm #role_error").classList.remove( "inError" );
		}


		if (errors === false){
			saveUser(userInfo).then(function() {
			// Checks if code ran
				console.log("Success");
			});
		}
	};
  
		
	// 1. Makes call to handleUserInfoDelivery
	$userSubmitBtn.on("click",  () => {
		handleUserInfoDelivery();
	});
});
