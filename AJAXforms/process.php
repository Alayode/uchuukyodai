//process.php
// $scope.errorfamilyMemberName = data.errors.familyMemberName;
// $scope.errorSuperhero = data.errors.superheroAlias;
<?php

$errors  = array();   //array to hold validation errors
$data    = array();   //array to pass back data



// validate the variables ====================================================================================
    if (empty($_POST['name']))
        $errors['name'] = 'Name is required.';
    
    if (empty($_POST['familyMemberName']))
    	$errors['familyMemberName'] = 'family Member Name is required.';
    		
 
 // return a response =======================================================================================
 if (! empty($errors)) {
 	

 		// if there are items in our error
		$data['success'] = false;
		$data['errors']  = $errors;
}  else {
	
		// if there is items in our errors array, return those errors
		$data ['success'] = false;
		$data ['message'] = Success!;

} 		


// return all our data to an AJAX call
echo json_encode($data);




?>
