function parseHL7(raw, target) {
	var hl7 = raw
	var separators = ['MSH', 'DG1', 'DRG', 'FT1', 'OBR', 'EVN', 'PID', 'PV1', 'GT1', 'IN1', 'IN2', 'OBX', 'PR1', 'TXA', 'ORC'];
	var master = [];
	
	// This will turn the hl7 into an array seperated by our categories, however in order to keep the categories they stay in their own element
	var tokens = hl7.split(new RegExp('('+separators.join('\\||')+'\\|)'));

	// Remove first element which is empty
	tokens.shift()

	// Here we combine the category name pairs with their values
	$.each(tokens, function(index, value){
		master.push(value + tokens[index+1])
		tokens.splice(index, 1);  
	});
	// Remove empty values
	master = master.filter(Boolean);
	// Now that master is populated, we can iterate over it and form the table
	var inHTML = "";
	$.each(master, function(index, value){
		var fields = value.split('|');
		var subdetail = '';
		var segmentName = fields[0]
		fields.shift()
		// Creating the sub rows
		$.each(fields, function(subindex, subvalue){
			try {
				subdetail += "<tr><td class='nowrapDetail'>"+ segmentName + "-" + (subindex+1) + ": " + dictionary[segmentName][subindex + 1] + "</td>" +
				"<td>"+ subvalue + "</td>" +
				"</tr>"
			}
			catch(e) {}
		});
		// Header row
		var newItem = '<tr class="header"><td colspan="2">'+segmentName+'</td></tr>'
	    newItem += subdetail
	    inHTML += newItem;
	});
	
	$("table" + target).html(inHTML);
}

var dictionary = 
{ 	"DG1": {
		1: 'Set ID',
		2: 'Diagnosis Coding Method',
		3: 'Diagnosis Code',
		4: 'Diagnosis Description',
		5: 'Diagnosis Date/Time',
		6: 'Diagnosis Type',
		7: 'Major Diagnostic Category',
		8: 'Diagnostic Related Group',
		9: 'DRG Approval Indicator',
		10: 'DRG Grouper Review Code',
		11: 'Outlier Type',
		12: 'Outlier Days',
		13: 'Outlier Cost',
		14: 'Grouper Version And Type',
		15: 'Diagnosis Priority',
		16: 'Diagnosing Clinician',
		17: 'Diagnosis Classification',
		18: 'Confidential Indicator',
		19: 'Attestation Date/Time',
		20: 'Diagnosis Identifier',
		21: 'Diagnosis Action Code',
		22: 'Parent Diagnosis',
		23: 'DRG CCL Value Code',
		24: 'DRG Grouping Usage',
		25: 'DRG Diagnosis Determination Status',
		26: 'Present On Admission'
		},
	"OBR": {
		1: 'Set ID ? OBR                             ',
		2: 'Placer Order Number                      ',
		3: 'Filler Order Number                      ',
		4: 'Universal Service ID                     ',
		5: 'Priority                                 ',
		6: 'Requested Date/time                      ',
		7: 'Observation Date/Time                    ',
		8: 'Observation End Date/Time                ',
		9: 'Collection Volume                        ',
		10: 'Collector Identifier                    ',
		11: 'Specimen Action Code                    ',
		12: 'Danger Code                             ',
		13: 'Relevant Clinical Info.                 ',
		14: 'Specimen Received Date/Time             ',
		15: 'Specimen Source                         ',
		16: 'Ordering Provider                       ',
		17: 'Order Callback Phone Number             ',
		18: 'Placer field 1                          ',
		19: 'Placer field 2                          ',
		20: 'Filler Field 1                          ',
		21: 'Filler Field 2                          ',
		22: 'Results Rpt/Status Chng ? Date/Time     ',
		23: 'Charge to Practice                      ',
		24: 'Diagnostic Serv Sect ID                 ',
		25: 'Result Status                           ',
		26: 'Parent Result                           ',
		27: 'Quantity/Timing                         ',
		28: 'Result Copies To                        ',
		29: 'Parent                                  ',
		30: 'Transportation Mode                     ',
		31: 'Reason for Study                        ',
		32: 'Principal Result Interpreter            ',
		33: 'Assistant Result Interpreter            ',
		34: 'Technician                              ',
		35: 'Transcriptionist                        ',
		36: 'Scheduled Date/Time                     ',
		37: 'Number of Sample Containers             ',
		38: 'Transport Logistics of Collected Sample ',
		39: 'Collector?s Comment                     ',
		40: 'Transport Arrangement Responsibility    ',
		41: 'Transport Arranged                      ',
		42: 'Escort Required                         ',
		43: 'Planned Patient Transport Comment       ',
	},
	"EVN": {
		1: 'Event Type Code',
		2: 'Recorded Date/Time',
		3: 'Date/Time Planned Event',
		4: 'Event Reason Code',
		5: 'Operator ID',
		6: 'Event Occurred',
		7: 'Event Facility'
		},
	"FT1": {
		1: 'Set ID',
		2: 'Transaction ID',
		3: 'Transaction Batch ID',
		4: 'Transaction Date',
		5: 'Transaction Posting Date',
		6: 'Transaction Type',
		7: 'Transaction Code',
		8: 'Transaction Description',
		9: 'Transaction Description',
		10: 'Transaction Quantity',
		11: 'Transaction Amount',
		12: 'Transaction Amount',
		13: 'Department Code',
		14: 'Insurance Plan ID',
		15: 'Insurance Amount',
		16: 'Assigned Patient Location',
		17: 'Fee Schedule',
		18: 'Patient Type',
		19: 'Diagnosis Code',
		20: 'Performed By Code',
		21: 'Ordered By Code',
		22: 'Unit Cost',
		23: 'Filler Order Number',
		24: 'Entered By Code',
		25: 'Procedure Code',
		26: 'Procedure Code Modifier',
		27: 'Advanced Beneficiary Notice Code',
		28: 'Medically Necessary Duplicate Procedure Reason.',
		29: 'NDC Code',
		30: 'Payment Reference ID',
		31: 'Transaction Reference Key'
		},
	"MSH": {
		1: 'Field Separator',
		2: 'Encoding Characters',
		3: 'Sending Application',
		4: 'Sending Facility',
		5: 'Receiving Application',
		6: 'Receiving Facility',
		7: 'Date/Time of Message',
		8: 'Security',
		9: 'Message Type',
		10: 'Message Control ID',
		11: 'Processing ID',
		12: 'Version ID',
		13: 'Sequence Number',
		14: 'Continuation Pointer',
		15: 'Accept Acknowledgment Type',
		16: 'Application Acknowledgment Type',
		17: 'Country Code',
		18: 'Character Set',
		19: 'Principal Language Of Message',
		20: 'Alternate Character Set Handling Scheme',
		21: 'Message Profile Identifier',
		22: 'Sending Responsible Organization',
		23: 'Receiving Responsible Organization',
		24: 'Sending Network Address',
		25: 'Receiving Network Address'
		} ,
	"NTE": {
		1: 'Set ID',
		2: 'Source of Comment',
		3: 'Comment',
		4: 'Comment Type'
		},
	"OBR": {
		1: 'Set ID',
		2: 'Placer Order Number',
		3: 'Filler Order Number',
		4: 'Universal Service Identifier',
		5: 'Priority',
		6: 'Requested Date/Time',
		7: 'Observation Date/Time #',
		8: 'Observation End Date/Time #',
		9: 'Collection Volume *',
		10: 'Collector Identifier *',
		11: 'Specimen Action Code *',
		12: 'Danger Code',
		13: 'Relevant Clinical Information',
		14: 'Specimen Received Date/Time',
		15: 'Specimen Source',
		16: 'Ordering Provider',
		17: 'Order Callback Phone Number',
		18: 'Placer Field 1',
		19: 'Placer Field 2',
		20: 'Filler Field 1 +',
		21: 'Filler Field 2 +',
		22: 'Results Rpt/Status Chng',
		23: 'Charge to Practice +',
		24: 'Diagnostic Serv Sect ID',
		25: 'Result Status +',
		26: 'Parent Result +',
		27: 'Quantity/Timing',
		28: 'Result Copies To',
		29: 'Parent',
		30: 'Transportation Mode',
		31: 'Reason for Study',
		32: 'Principal Result Interpreter +',
		33: 'Assistant Result Interpreter +',
		34: 'Technician +',
		35: 'Transcriptionist +',
		36: 'Scheduled Date/Time +',
		37: 'Number of Sample Containers *',
		38: 'Transport Logistics of Collected Sample *',
		39: 'Collector\'s Comment *',
		40: 'Transport Arrangement Responsibility',
		41: 'Transport Arranged',
		42: 'Escort Required',
		43: 'Planned Patient Transport Comment',
		44: 'Procedure Code',
		45: 'Procedure Code Modifier',
		46: 'Placer Supplemental Service Information',
		47: 'Filler Supplemental Service Information',
		48: 'Medically Necessary Duplicate Procedure Reason',
		49: 'Result Handling',
		50: 'Parent Universal Service Identifier'
		} ,
	"OBX": {
		1: 'Set ID',
		2: 'Value Type',
		3: 'Observation Identifier',
		4: 'Observation Sub',
		5: 'Observation Value',
		6: 'Units',
		7: 'References Range',
		8: 'Abnormal Flags',
		9: 'Probability',
		10: 'Nature of Abnormal Test',
		11: 'Observation Result Status',
		12: 'Effective Date of Reference Range',
		13: 'User Defined Access Checks',
		14: 'Date/Time of the Observation',
		15: 'Producer\'s ID',
		16: 'Responsible Observer',
		17: 'Observation Method',
		18: 'Equipment Instance Identifier',
		19: 'Date/Time of the Analysis',
		20: 'Observation Site',
		21: 'Observation Instance Identifier',
		22: 'Mood Code',
		23: 'Performing Organization Name',
		24: 'Performing Organization Address',
		25: 'Performing Organization Medical Director'
		},
	"ORC": {
		1: 'Order Control',
		2: 'Placer Order Number',
		3: 'Filler Order Number',
		4: 'Placer Group Number',
		5: 'Order Status',
		6: 'Response Flag',
		7: 'Quantity/Timing',
		8: 'Parent Order',
		9: 'Date/Time of Transaction',
		10: 'Entered By',
		11: 'Verified By',
		12: 'Ordering Provider',
		13: 'Enterer\'s Location',
		14: 'Call Back Phone Number',
		15: 'Order Effective Date/Time',
		16: 'Order Control Code Reason',
		17: 'Entering Organization',
		18: 'Entering Device',
		19: 'Action By',
		20: 'Advanced Beneficiary Notice Code',
		21: 'Ordering Facility Name',
		22: 'Ordering Facility Address',
		23: 'Ordering Facility Phone Number',
		24: 'Ordering Provider Address',
		25: 'Order Status Modifier',
		26: 'Advanced Beneficiary Notice Override Reason',
		27: 'Filler\'s Expected Availability Date/Time',
		28: 'Confidentiality Code',
		29: 'Order Type',
		30: 'Enterer Authorization Mode'
		},
	"PID": {
		1: 'Set ID',
		2: 'Patient ID',
		3: 'Patient Identifier List',
		4: 'Alternate Patient ID',
		5: 'Patient Name',
		6: 'Mother\'s Maiden Name',
		7: 'Date/Time of Birth',
		8: 'Administrative Sex',
		9: 'Patient Alias',
		10: 'Race',
		11: 'Patient Address',
		12: 'County Code',
		13: 'Phone Number',
		14: 'Phone Number',
		15: 'Primary Language',
		16: 'Marital Status',
		17: 'Religion',
		18: 'Patient Account Number',
		19: 'SSN Number',
		20: 'Driver\'s License Number',
		21: 'Mother\'s Identifier',
		22: 'Ethnic Group',
		23: 'Birth Place',
		24: 'Multiple Birth Indicator',
		25: 'Birth Order',
		26: 'Citizenship',
		27: 'Veterans Military Status',
		28: 'Nationality',
		29: 'Patient Death Date and Time',
		30: 'Patient Death Indicator',
		31: 'Identity Unknown Indicator',
		32: 'Identity Reliability Code',
		33: 'Last Update Date/Time',
		34: 'Last Update Facility',
		35: 'Species Code',
		36: 'Breed Code',
		37: 'Strain',
		38: 'Production Class Code',
		39: 'Tribal Citizenship'
		} ,
	"GT1": {
		1: 'SetID',
		2: 'Guarantor Number',
		3: 'Guarantor Name',
		4: 'Guarantor Spouse Name',
		5: 'Guarantor Address',
		6: 'Guarantor Phone Home',
		7: 'Guarantor Phone Business',
		8: 'Guarantor BirthDate',
		9: 'Guarantor Sex',
		10: 'Guarantor Type',
		11: 'Guarantor Relationship',
		12: 'Guarantor SSN',
		13: 'Guarantor Date - Begin',
		14: 'Guarantor Date - End',
		15: 'Guarantor Priority',
		16: 'Guarantor Employer Name',
		17: 'Guarantor Employer Address',
		18: 'Guarantor Employer Phone Number',
		19: 'Guarantor Employee ID Number',
		20: 'Guarantor Employment Status',
		21: 'Guarantor Organization Name',
		22: 'Guarantor Billing Hold Flag',
		23: 'Guarantor Credit Rating Code',
		24: 'Guarantor Death Date Time',
		25: 'Guarantor Death Flag',
		26: 'Guarantor Charge Adjustment Code',
		27: 'Guarantor Household Annual Income',
		28: 'Guarantor Household Size',
		29: 'Guarantor Employer ID Number',
		30: 'Guarantor Marital Status Code',
		31: 'Guarantor Hire Effective Date',
		32: 'Employment Stop Date',
		33: 'Living Dependency',
		34: 'Ambulatory Status',
		35: 'Citizenship',
		36: 'Primary Language',
		37: 'Living Arrangement',
		38: 'Publicity Code',
		39: 'Protection Indicator',
		40: 'Student Indicator',
		41: 'Religion',
		42: 'Mother?s Maiden Name',
		43: 'Nationality',
		44: 'Ethnic Group',
		45: 'Contact Person?s Name',
		46: 'Contact Person?s Telephone Number',
		47: 'Contact Reason',
		48: 'Contact Relationship',
		49: 'Job Title',
		50: 'Job Code/Class',
		51: 'Guarantor Employer?s Organization Name',
		52: 'Handicap',
		53: 'Job Status',
		54: 'Guarantor Financial Class',
		55: 'Guarantor Race'
	},
	"IN1": {
		1: 'SetID                             ',
		2: 'Insurance Plan ID                 ',
		3: 'Insurance Company ID              ',
		4: 'Insurance Company Name            ',
		5: 'Insurance Company Address         ',
		6: 'Insurance Co Contact Person       ',
		7: 'Insurance Co Phone Number         ',
		8: 'Group Number                      ',
		9: 'Group Name                        ',
		10: 'Insured?s Group Emp ID            ',
		11: 'Insured?s Group Emp Name          ',
		12: 'Plan Effective Date               ',
		13: 'Plan Expiration Date              ',
		14: 'Authorization Information         ',
		15: 'Plan Type                         ',
		16: 'Name Of Insured                   ',
		17: 'Insured?s Relationship To Patient ',
		18: 'Insured?s Date Of Birth           ',
		19: 'Insured?s Address                 ',
		20: 'Assignment Of Benefits            ',
		21: 'Coordination Of Benefits          ',
		22: 'Coord Of Ben. Priority            ',
		23: 'Notice Of Admission Flag          ',
		24: 'Notice Of Admission Date          ',
		25: 'Report Of Eligibility Flag        ',
		26: 'Report Of Eligibility Date        ',
		27: 'Release Information Code          ',
		28: 'Pre-Admit Cert                    ',
		29: 'Verification Date/Time            ',
		30: 'Verification By                   ',
		31: 'Type Of Agreement Code            ',
		32: 'Billing Status                    ',
		33: 'Lifetime Reserve Days             ',
		34: 'Delay Before L.R. Day             ',
		35: 'Company Plan Code                 ',
		36: 'Policy Number                     ',
		37: 'Policy Deductible                 ',
		38: 'Policy Limit - Amount             ',
		39: 'Policy Limit - Days               ',
		40: 'Room Rate - Semi-Private          ',
		41: 'Room Rate - Private               ',
		42: 'Insured?s Employment Status       ',
		43: 'Insured?s Sex                     ',
		44: 'Insured?s Employer?s Address      ',
		45: 'Verification Status               ',
		46: 'Prior Insurance Plan ID           ',
		47: 'Coverage Type                     ',
		48: 'Handicap                          ',
		49: 'Insured?s ID Number               ',
	},
	"PV1": {
		1: 'Set ID',
		2: 'Patient Class',
		3: 'Assigned Patient Location',
		4: 'Admission Type',
		5: 'Preadmit Number',
		6: 'Prior Patient Location',
		7: 'Attending Doctor',
		8: 'Referring Doctor',
		9: 'Consulting Doctor',
		10: 'Hospital Service',
		11: 'Temporary Location',
		12: 'Preadmit Test Indicator',
		13: 'Re',
		14: 'Admit Source',
		15: 'Ambulatory Status',
		16: 'VIP Indicator',
		17: 'Admitting Doctor',
		18: 'Patient Type',
		19: 'Visit Number',
		20: 'Financial Class',
		21: 'Charge Price Indicator',
		22: 'Courtesy Code',
		23: 'Credit Rating',
		24: 'Contract Code',
		25: 'Contract Effective Date',
		26: 'Contract Amount',
		27: 'Contract Period',
		28: 'Interest Code',
		29: 'Transfer to Bad Debt Code',
		30: 'Transfer to Bad Debt Date',
		31: 'Bad Debt Agency Code',
		32: 'Bad Debt Transfer Amount',
		33: 'Bad Debt Recovery Amount',
		34: 'Delete Account Indicator',
		35: 'Delete Account Date',
		36: 'Discharge Disposition',
		37: 'Discharged to Location',
		38: 'Diet Type',
		39: 'Servicing Facility',
		40: 'Bed Status',
		41: 'Account Status',
		42: 'Pending Location',
		43: 'Prior Temporary Location',
		44: 'Admit Date/Time',
		45: 'Discharge Date/Time',
		46: 'Current Patient Balance',
		47: 'Total Charges',
		48: 'Total Adjustments',
		49: 'Total Payments',
		50: 'Alternate Visit ID',
		51: 'Visit Indicator',
		52: 'Other Healthcare Provider'
		},
	"TXA": {
		1: 'Set ID',
		2: 'Document Type',
		3: 'Document Content Presentation',
		4: 'Activity Date/Time',
		5: 'Primary Activity Provider Code/Name',
		6: 'Origination Date/Time',
		7: 'Transcription Date/Time',
		8: 'Edit Date/Time',
		9: 'Originator Code/Name',
		10:'Assigned Document Authenticator',
		11: 'Transcriptionist Code/Name',
		12: 'Unique Document Number',
		13: 'Parent Document Number',
		14: 'Placer Order Number',
		15: 'Filler Order Number',
		16: 'Unique Document File Name',
		17: 'Document Completion Status',
		18: 'Document Confidentiality Status',
		19: 'Document Availability Status',
		20: 'Document Storage Status',
		21: 'Document Change Reason',
		22: 'Authentication Person, Time Stamp',
		23: 'Distributed Copies'
	}
};
