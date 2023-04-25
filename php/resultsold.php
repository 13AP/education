
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="author" content="Brent Presley">
	<meta name="description" content="No description yet">
	<meta name="keywords" content="list, your, keywords">
	
	<title>Weight Calculator Results</title>
	<style type='text/css'>
		#header {text-align:center;}
		#main	{clear:both}	
		#footer { }
	</style>
</head>

<body>
	<div id="header">
		<img src='images/scale.png' width='146' height='168' alt='Scale image' style='float:left'>
		<img src='images/scale.png' width='146' height='168' alt='Scale image' style='float:right'>
		<h1>Weight Calculation Results</h1>
		
	</div>
    
	<!--p>Hello, <?!php
		$name = 'Brent';
		echo "$name.", 'All\'s well';
	?>
	</p-->
	
    
    
	<!--pre style="clear:both"><!?php print_r($_REQUEST); ?></pre-->
	<?php extract($_REQUEST); ?>
	<form method="post" action="nextPage.php">
		<input type="hidden" name="sampleDate" value="<?php echo $sampleDate; ?>">
		<!-- put a button here -->
	</form>
	
	<div id="main">
		<p>Item name: <strong><?php echo $_REQUEST['itemName']; ?></strong></p>
		<p>Weight(lb): <strong><?php echo $itemWeightLb;  ?></strong></p>
		<p>Weight(oz): <strong><?php echo $itemWeightOz;  ?></strong></p>
		<p>Quantity: <strong><?php echo $numberOfItems;  ?></strong></p>
		<p>Date: <strong><?php echo $sampleDate;  ?></strong></p>
		<?php
			//Calculate the outputs
			
			$totalOzIn = $itemWeightLb * 16 + $itemWeightOz;
			$totalOz = $totalOzIn * $numberOfItems;
			
			$endPounds = (int)($totalOz / 16);
			$endOz = $totalOz % 16;
			
			$deliveryDate = new DateTime($sampleDate);
			echo "Order Date = " . $deliveryDate->format("r") . "<br>";
			$deliveryDate->modify("+1 week");
		?>
		<p>
			End pounds is <?php echo $endPounds; ?><br>
			End ounces is <?php echo $endOz; ?><br>
			Ordered on <?php echo $sampleDate; ?><br>
			Delivered on <?php echo $deliveryDate->format('Y-m-d'); ?>
		</p>
				
				<?php  
				
				$now = new DateTime();
						
				?>

	</div>
	<div id="footer">
	</div>
</body>
</html>

