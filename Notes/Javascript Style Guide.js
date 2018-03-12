Javascript style guide

"1. All code should be indented appropriately using a single tab."
function example(){
	code goes here
}

"2. All variables must be lowercase and all functions must use camelcase."
var examplevar = 123;
function exampleFunc()

"3. All blocks of code should be commented with explainations above the code."
//This function does nothing.
function uselessFunction(){

}

"4. JQuery selectors should always be used where possible"
$('#usethis');

"5. All code should be wrapped in an IFFE"
(function () {
	'code goes here'
})();