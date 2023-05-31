
const nameOrLastnamePattern = /^[A-Za-z]+$/;
const emailPattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/ //pattern semplicificato (non è così in realtà)
const cvvPattern = /^\d{3}$/;

const nameErrorMessage = "Un nome valido deve contenere solo lettere";
const lastnameErrorMessage = "Un cognome valido deve contenere solo lettere";
const emailErrorMessage = "Una email valida deve essere nella forma username@domain.ext";
const mismatchPSWD = "Password e conferma password non corrispondono";
const ageNotValidMessage = "Devi essere maggiorenne per registrarti su EliteSneakers";
const cardErrorMessage = "Numero di carta non valido!";
const cardExpiryMessage = "Non puoi utilizzare una carta scaduta"
const cardCvvMessage = "Il cvv non è corretto"


function validateFormElem(formElem, pattern, span, message) {
	if (formElem.value.match(pattern)) {
		formElem.classList.remove("error");
		span.style.color = "black";
		span.innerHTML = "";
		return true;
	}
	formElem.classList.add("error");
	span.innerHTML = message;
	span.style.color = "red";
	return false;
}

function validateNome() {
	let valid = true;
	let form = document.getElementById("regForm");

	let spanName = document.getElementById("errorName");
	if (!validateFormElem(form.nome, nameOrLastnamePattern, spanName, nameErrorMessage))
		valid = false;


	return valid;
}

function validateCognome() {
	let valid = true;
	let form = document.getElementById("regForm");

	let spanName = document.getElementById("errorLastname");
	if (!validateFormElem(form.cognome, nameOrLastnamePattern, spanName, lastnameErrorMessage))
		valid = false;


	return valid;
}


function validateEmail() {
	let valid = true;
	let form = document.getElementById("regForm");

	let spanEmail = document.getElementById("errorEmail");
	if (!validateFormElem(form.email, emailPattern, spanEmail, emailErrorMessage))
		valid = false;

	return valid;
}


function pswMatching() {

	let form = document.getElementById("regForm");

	let spanPswd = document.getElementById("matchError");

	let psw1 = form.password.value;
	let psw2 = form.conferma_password.value;


	if (psw1 != psw2) {
		spanPswd.classList.add("error");
		spanPswd.innerHTML = mismatchPSWD;
		spanPswd.style.color = "red";
		return false;
	}

	spanPswd.classList.remove("error");
	spanPswd.style.color = "black";
	spanPswd.innerHTML = "";
	return true;

}


function ageValidate() {

	let form = document.getElementById("regForm");

	let spanAge = document.getElementById("ageError");

	let dataNascita = form.dataNascita.value;

	const oggi = new Date(); // Data corrente
	const dataNascitaObj = new Date(dataNascita); // Converti la stringa della data di nascita in un oggetto Data

	const diffAnni = oggi.getFullYear() - dataNascitaObj.getFullYear(); // Differenza di anni

	// Verifica se la differenza di anni è maggiore o uguale a 18
	if (diffAnni > 18 || (diffAnni === 18 && oggi.getMonth() > dataNascitaObj.getMonth()) || (diffAnni === 18 && oggi.getMonth() === dataNascitaObj.getMonth() && oggi.getDate() >= dataNascitaObj.getDate())) {
		spanAge.classList.remove("error");
		spanAge.style.color = "black";
		spanAge.innerHTML = "";
		return true; // L'utente è maggiorenne
	} else {
		spanAge.classList.add("error");
		spanAge.innerHTML = ageNotValidMessage;
		spanAge.style.color = "red";
		return false; // L'utente non è maggiorenne
	}
}
	
function checkSignup(obj) {
	var check = true;
	if (validateNome() == false) check = false;
	if (validateCognome() == false) check = false;
	if (validateEmail() == false) check = false;
	if (pswMatching() == false) check = false;
	if (ageValidate()== false) check = false;
	
	if (check) obj.submit();
}



function validateNumCarta(){
	
	let form = document.getElementById("checkoutForm");

	let span = document.getElementById("cardNumberError");
	
	let cardNumber = form.cardNumber.value;
	
	if(cardNumber.match(cardNumberPattern)){
		
		span.classList.remove("error");
		span.style.color = "black";
		span.innerHTML = "";
		return true;
	}
	
	else{
		span.classList.add("error");
		span.innerHTML = cardErrorMessage;
		span.style.color = "red";
		return false;
	}	
}


function validateScadenzaCarta(){
	
	let form = document.getElementById("checkoutForm");

	let span = document.getElementById("expiryError");

	let data = form.expirationDate.value;

	const oggi = new Date(); // Data corrente
	const dataObj = new Date(data);
	
	if(dataObj  < oggi){
		span.classList.add("error");
		span.innerHTML = cardExpiryMessage;
		span.style.color = "red";
		return false;
	}
	else{
		
		span.classList.remove("error");
		span.style.color = "black";
		span.innerHTML = "";
		return true;
	}
}


function validateCVV(){
	
	let form = document.getElementById("checkoutForm");

	let span = document.getElementById("CVVError");
	
	let cvv = form.cvv.value;
	
	if(cvv.match(cvvPattern)){
		span.classList.remove("error");
		span.style.color = "black";
		span.innerHTML = "";
		return true;
	}
	else{
		span.classList.add("error");
		span.innerHTML = cardCvvMessage;
		span.style.color = "red";
		return false;	
	}

}


function checkCheckout(obj) {
	var check = true;
	if (validateNumCarta() == false) check = false;
	if (validateScadenzaCarta()== false) check = false;
	if (validateCVV() == false) check = false;
	
	if (check) obj.submit();
}





















