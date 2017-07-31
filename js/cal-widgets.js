	$(document).ready(function () {
		
		searchResultData = [
			{
				"ID":"",
				"ARC_City":"",
				"ARC_State":"",
				"ARC_ZIP":""
			}
		];
		var searchResultSource =
		{
			dataType: "json",
			localData: searchResultData
		};			
		var dataAdapter = new $.jqx.dataAdapter(searchResultSource);
		
		var initSearchResultsData = function () {			
			$("#searchResults").jqxDataTable(
			{
				height: "90%",
				pageable: true,
				pagerButtonsCount: 3,
				altRows: true,
				sortable: true,				
				source: searchResultSource,
				rowDetails: true,
				initRowDetails: initRowDetails,
				columns: [
				  { text: 'ID', dataField: 'ID', width: 60 },
				  { text: 'City', dataField: 'ARC_City', width: 110 },
				  { text: 'State', dataField: 'ARC_State', width: 60 },
				  { text: 'Zip Code', dataField: 'ARC_ZIP', width: 60 }
			  ]
			});
		}
		
		// Create the search dialog Drop Downs and Combo Box
		function initSearchDialog(){
			$("#program").jqxDropDownList({ width: 300, height: 25 });
			$("#searchGeography").jqxDropDownList({ width: 250, height: 25 });
			$("#searchValue").jqxComboBox({ width: 250, height: 25, displayMember: 'label', valueMember: 'value'});
		}
		
		// init widgets.
		var initWidgets = function (tab) {
			switch (tab) {
				case 0:
					initSearchDialog();
					break;
				case 1:
					initSearchResultsData();
					break;
			}
		}
		$('#jqxTabs').jqxTabs({ width: '100%', height: '100%',  selectedItem: 0, initTabContent: initWidgets });		

		var initRowDetails = function (id, row, element, rowinfo) {
			var tabsdiv = null;
			var information = null;
			var notes = null;
			rowinfo.detailsHeight = 300;
			element.append($("<div style='margin: 10px;'><ul style='margin-left: 30px;'><li class='title'>Title</li><li>Preferences</li></ul><div class='information'></div><div class='notes'></div></div>"));
			tabsdiv = $(element.children()[0]);
			if (tabsdiv != null) {
			  information = tabsdiv.find('.information');
			  notes = tabsdiv.find('.notes');
			  var title = tabsdiv.find('.title');
			  title.text("Information");
			  var container = $('<div style="margin: 5px;"></div>');
			  container.appendTo($(information));
				content = "<table border='1'>";
				content += "<tr><td bgcolor='#c0c0c0'colspan='2'>Provider Information</td></tr>";	
				content += "<tr><td width='40%'>Provider ID:</td><td>" + row.PROVIDER_I + "</td></tr>";
				content += "<tr><td>County:</td><td>" + row.ARC_COUNTY + "</td></tr>";
				content += "<tr><td>Street Name:</td><td>" + row.STREEET_NA + "</td></tr>";
				content += "<tr><td>Unit Type :</td><td>" + row.UNIT_TYPE + "</td></tr>";
				content += "<tr><td>City, State, Zip:</td><td>" + row.ARC_City + ", " + row.ARC_State + " " + row.ARC_ZIP + "</td></tr>";
				content += "</table>";
				container.append(content);

				var notescontainer = $('<div style="white-space: normal; margin: 5px;"></div>');
				
				content = "<table>";
				
				//If no provider ID, this is a removal
				if(row.PROVIDER_I !== 'N/A'){
					content += "<tr><td bgcolor='#c0c0c0'colspan='2'>Approved Number of Beds</td></tr>";	
					content += "<tr width='40%'><td></td><td>" + row.APPROVED_N + "</td></tr>";
					content += "<tr><td bgcolor='#c0c0c0'colspan='2'>Parenting Arrangement</td></tr>";	
					content += "<tr><td></td><td>" + row.PARENTING_ + "</td></tr>";

					disability = "";
					content += "<tr><td bgcolor='#c0c0c0'colspan='2'>Disability Willing to Accept</td></tr>";
					if(row.MENTAL_RET=="Y")
					disability += "<tr><td></td><td>Mental Retardation</td></tr>";
					if(row.VISUALLY_I=="Y")
					disability += "<tr><td></td><td>Visually Impaired</td></tr>";
					if(row.HEARING_IM=="Y")
					disability += "<tr><td></td><td>Hearing Impaired</td></tr>";
					if(row.PHYSICALLY=="Y")
					disability += "<tr><td></td><td>Physically Handicapped</td></tr>";
					if(row.EMOTIONALL=="Y")
					disability += "<tr><td></td><td>Emotionally Handicapped</td></tr>";
					if(row.LEARNING_D=="Y")
					disability += "<tr><td></td><td>Learning Diability</td></tr>";
					if(row.DEV_DELAY=="Y")
					disability += "<tr><td></td><td>Developmentally Delayed</td></tr>";
					if(row.BEHAVIORAL=="Y")
					disability += "<tr><td></td><td>Behavioral Disability</td></tr>";
					if(row.MEDICAL_CO=="Y")
					disability += "<tr><td></td><td>Medical Condition</td></tr>";
					if(row.HIV_AIDS=="Y")
					disability += "<tr><td></td><td>HIV / AIDS</td></tr>";
					if(row.OTHER=="Y")
					disability += "<tr><td></td><td>Other</td></tr>";
					if(row.NONE=="Y")
					disability += "<tr><td></td><td>None</td></tr>";
					if(row.ANY=="Y")
					disability += "<tr><td></td><td>Any</td></tr>";
					if( disability=="") disability = "<tr><td></td><td>No Answer</td></tr>";
					content +=disability;
					
					sibling="";
					content += "<tr><td colspan='2' bgcolor='#c0c0c0'>Preferred Sibling Group</td></tr>";
					if(row.F2_SIBLING =="Y")
					sibling += "<tr><td></td><td>2 Siblings</td></tr>";
					if(row.F3_SIBLING =="Y")
					sibling += "<tr><td></td><td>3 Siblings</td></tr>";
					if(row.F4_SIBLING =="Y")
					sibling += "<tr><td></td><td>4 Siblings</td></tr>";
					if(row.F5_SIBLING =="Y")
					sibling += "<tr><td></td><td>5 Siblings</td></tr>";
					if(row.F6_SIBLING =="Y")
					sibling += "<tr><td></td><td>6 or More Siblings</td></tr>";		
					if(row.NO_PREFERE=="Y")
					sibling += "<tr><td></td><td>No Preference</td></tr>";											
					if( sibling=="") sibling = "<tr><td></td><td>No Answer</td></tr>";
					
					content +=sibling;
					
					number_kids="";
					content += "<tr><td colspan='2' bgcolor='#c0c0c0'>Preferred Number of Children</td></tr>";
					if(row.F1 =="Y")
					number_kids += "<tr><td></td><td>1 Child</td></tr>";
					if(row.F2 =="Y")
					number_kids += "<tr><td></td><td>2 Children</td></tr>";
					if(row.F3 =="Y")
					number_kids += "<tr><td></td><td>3 Children</td></tr>";	
					if(row.NO_PREF_1=="Y")
					number_kids += "<tr><td></td><td>No Preference</td></tr>";											
					if( number_kids=="") number_kids = "<tr><td></td><td>No Answer</td></tr>";
					
					content +=number_kids;
					content += "<tr><td colspan='2' bgcolor='#c0c0c0'>Ethnicity</td></tr>";
					content += "<tr><td></td><td>" + row.ETHNICITY + "</td></tr>";	
					
					content += "<tr><td colspan='2' bgcolor='#c0c0c0'>Preferred Race</td></tr>";
				}else{
					content += "<tr><td colspan='2' bgcolor='#c0c0c0'>Race</td></tr>";
				}
													
				race="";
				if(row.AMERICAN_I=="Y")
				race += "<tr><td></td><td>American Indian</td></tr>";
				if(row.ASIAN=="Y")
				race += "<tr><td></td><td>Asian</td></tr>";
				if(row.BLACK=="Y")
				race += "<tr><td></td><td>Black</td></tr>";
				if(row.WHITE=="Y")
				race += "<tr><td></td><td>White</td></tr>";		
				if(row.NATIVE_HAW=="Y")
				race += "<tr><td></td><td>NATIVE_HAW</td></tr>";		
				if(row.NO_PREFE_1=="Y")
				race += "<tr><td></td><td>No Preference</td></tr>";											
				if( race=="") race = "<tr><td></td><td>No Answer</td></tr>";
				
				content +=race;
				
				content += "</table>";
			  
			  notescontainer.appendTo($(notes));
			  $(notescontainer).append(content);
			  $(tabsdiv).jqxTabs({
				  width: 300,
				  height: 270
			  });
			}
		}
		
/*		// Create jqxDocking
		$("#docking").jqxDocking({ width: 345, theme: 'classic'});
		$('#docking').jqxDocking('hideAllCloseButtons');
		$('#docking').jqxDocking('showAllCollapseButtons');
		$('#docking').jqxDocking('disableWindowResize', 'layerWindow');
		$('#docking').jqxDocking('disableWindowResize', 'toolWindow');
		$('#searchWindow').hide();
		$('#layerWindow').hide();
		//end docking
*/		
		//help docs
		 $("#resetbtn").jqxTooltip({ content: '<b>Reset</b><br/><i>Clear the map.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#searchbtn").jqxTooltip({ content: '<b>Search</b><br/><i>Search your data layers by a geography.</i><br/><i>Ex. Counties, Zip Codes, School District, Cities etc.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#layerbtn").jqxTooltip({ content: '<b>Layers</b><br/><i>Show or hide the geographic layers of the map.</i><br/><i>Ex. Counties, Zip Codes, School District, Cities etc.', position: 'mouse', autoHide: false, disabled:true});
		 $("#logoffbtn").jqxTooltip({ content: '<b>Log Off</b><br/><i>Log out of this application.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#helpbtn").jqxTooltip({ content: '<b>Help</b><br/><i>Toggle these help messages on or off.</i>', position: 'mouse', autoHide: true, disabled:true});		
		 $("#openApprovedFFH").jqxTooltip({ content: '<b>Open Approved FFH</b><br/><i>Show / Hide</i><br/><i>Open Approved Foster Family Homes.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#openRemoval").jqxTooltip({ content: '<b>Open Removals</b><br/><i>Show / Hide</i><br/><i>Open Removal Homes.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#counties").jqxTooltip({ content: '<b>Counties</b><br/><i>Show / Hide</i><br/><i>County Boundaries.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#cities").jqxTooltip({ content: '<b>Cities</b><br/><i>Show / Hide</i><br/><i>City Boundaries.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#zipcodes").jqxTooltip({ content: '<b>Zip Codes</b><br/><i>Show / Hide</i><br/><i>Zip Code Boundaries.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#school").jqxTooltip({ content: '<b>School Districts</b><br/><i>Show / Hide</i><br/><i>School District Boundaries.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#pubschools").jqxTooltip({ content: '<b>Public Schools</b><br/><i>Show / Hide</i><br/><i>Public Schools.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#roads").jqxTooltip({ content: '<b>Roads</b><br/><i>Show / Hide</i><br/><i>Roads.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#churches").jqxTooltip({ content: '<b>Churches</b><br/><i>Show / Hide</i><br/><i>Churches.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#senate").jqxTooltip({ content: '<b>State Senate Districts</b><br/><i>Show / Hide</i><br/><i>State Senate Boundaries.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#house").jqxTooltip({ content: '<b>State House Districts</b><br/><i>Show / Hide</i><br/><i>State House Boundaries.</i>', position: 'mouse', autoHide: false, disabled:true});		
		 $("#congress").jqxTooltip({ content: '<b>US Congressional Districts</b><br/><i>Show / Hide</i><br/><i>US Congressional District Boundaries.</i>', position: 'mouse', autoHide: false, disabled:true});		
	$("#searchHeader").jqxTooltip({ content: '<b>Search Criteria</b><br/><i>Set the parameters and perform your search</i><table width=\'250px\'><TR align=\'left\'><TD><li>Select Data Set - Select the data set to query against.</li><br/><li>Select the type of Geography you wish to search within.</li><br/><li>Select the distinct search value from your chosen geography</li><br/><li>When you have selected all three (3) search criteria, the [Search] button will become enabled.</li><br/><li>Click the [Search] button to perform your search.</li></td></tr></table>', position: 'mouse', autoHide: false, disabled:true});		
	$("#resultsHeader").jqxTooltip({ content: '<b>Search Results</b><br/><i>View your Search Results</i><table width=\'250px\'><TR align=\'left\'><TD><li>A layer control will appear , allowing you to toggle your search results on / off.</li><br/><li>Next to your layer control is confirmation of your query.</li><br/><li>Below this will be a listing of values from the results of your query in a pageable table.</li><br/><li>Clicking on a table row will highlight the corresponding property icon.</li><br/><li>Clciking on the map icons will highlight the corresponding results table row.</li></td></tr></table>', position: 'mouse', autoHide: false, disabled:true});		
	 
		$("#helpbtn").on('click', function(){
			if(helpVar){
				$(".toolbarButton").each(function(){
					$(this).jqxTooltip({disabled: true});
					$(this).find(':first-child').removeClass('help');
				});
				$("#searchHeader").jqxTooltip({disabled: true});
				$("#searchHeader").find(':first-child').removeClass('help');
				$("#resultsHeader").jqxTooltip({disabled: true});
				$("#resultsHeader").find(':first-child').removeClass('help');
				//$(".helpImage").css({'visibility':'hidden'});
				//$("span").removeClass('help');
				helpVar=false;
			}else{
				$(".toolbarButton").each(function(){
					$(this).jqxTooltip({disabled: false});
					$(this).find(':first-child').addClass('help');
				});				
				$("#searchHeader").jqxTooltip({disabled: false});
				$("#searchHeader").find(':first-child').addClass('help');
				$("#resultsHeader").jqxTooltip({disabled: false});
				$("#resultsHeader").find(':first-child').addClass('help');
				//$("span").addClass('help');
				//$(".helpImage").css({'visibility':'visible'});
				helpVar=true;
			}
		});
		//End Help Docs
});