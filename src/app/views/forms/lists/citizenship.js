const citizenship = [
  { label: 'Afghanistan', value: '252' },
  { label: 'Albania', value: '081' },
  { label: 'Algeria', value: '131' },
  { label: 'Andorra', value: '082' },
  { label: 'Angola', value: '151' },
  { label: 'Antigua And Barbuda', value: '621' },
  { label: 'Argentina', value: '703' },
  { label: 'Armenia', value: '049' },
  { label: 'Australia', value: '305' },
  { label: 'Austria', value: '011' },
  { label: 'Azerbaijan', value: '050' },
  { label: 'Bahamas', value: '622' },
  { label: 'Bahrain', value: '253' },
  { label: 'Bangladesh', value: '212' },
  { label: 'Barbados', value: '610' },
  { label: 'Belarus', value: '051' },
  { label: 'Belgium', value: '012' },
  { label: 'Belize', value: '541' },
  { label: 'Benin', value: '160' },
  { label: 'Bhutan', value: '254' },
  { label: 'Bolivia', value: '751' },
  { label: 'Bosnia', value: '048' },
  { label: 'Botswana', value: '153' },
  { label: 'Brazil', value: '709' },
  { label: 'Brunei Darussalam', value: '255' },
  { label: 'Bulgaria', value: '083' },
  { label: 'Burkina Faso', value: '188' },
  { label: 'Burma (Myanmar)', value: '241' },
  { label: 'Burundi', value: '154' },
  { label: 'Cabo Verde', value: '911' },
  { label: 'Cambodia', value: '256' },
  { label: 'Cameroon', value: '155' },
  { label: 'Canada', value: '511' },
  { label: 'Central African Republic', value: '157' },
  { label: 'Chad', value: '156' },
  { label: 'Chile', value: '721' },
  { label: 'China', value: '202' },
  { label: 'China (Hong Kong SAR)', value: '200' },
  { label: 'China (Macao SAR)', value: '198' },
  { label: 'Colombia', value: '722' },
  { label: 'Comoros', value: '905' },
  { label: 'Costa Rica', value: '542' },
  { label: 'Croatia', value: '043' },
  { label: 'Cuba', value: '650' },
  { label: 'Cyrpus', value: '221' },
  { label: 'Czech Republic', value: '015' },
  { label: 'Democratic Rep. of Congo', value: '158' },
  { label: 'Denmark', value: '017' },
  { label: 'Djibouti', value: '183' },
  { label: 'Dominica', value: '625' },
  { label: 'Dominican Republic', value: '651' },
  { label: 'East Timor', value: '916' },
  { label: 'Ecuador', value: '753' },
  { label: 'Egypt', value: '101' },
  { label: 'El Salvador', value: '543' },
  { label: 'Equatorial Guinea', value: '178' },
  { label: 'Eritrea', value: '162' },
  { label: 'Estonia', value: '018' },
  { label: 'Ethiopia', value: '161' },
  { label: 'Federated States of Micronesia', value: '835' },
  { label: 'Fiji', value: '801' },
  { label: 'Finland', value: '021' },
  { label: 'France', value: '022' },
  { label: 'Gabon', value: '163' },
  { label: 'Gambia', value: '164' },
  { label: 'Georgia', value: '052' },
  { label: 'Germany, Federal Republic Of', value: '024' },
  { label: 'Ghana', value: '165' },
  { label: 'Greece', value: '025' },
  { label: 'Grenada', value: '626' },
  { label: 'Guatemala', value: '544' },
  { label: 'Guinea', value: '166' },
  { label: 'Guinea-Bissau', value: '167' },
  { label: 'Haiti', value: '654' },
  { label: 'Honduras', value: '545' },
  { label: 'Hungary', value: '026' },
  { label: 'Iceland', value: '085' },
  { label: 'India', value: '205' },
  { label: 'Indonesia', value: '222' },
  { label: 'Iran', value: '223' },
  { label: 'Iraq', value: '224' },
  { label: 'Ireland', value: '027' },
  { label: 'Israel', value: '206' },
  { label: 'Italy', value: '028' },
  { label: 'Ivory Coast', value: '169' },
  { label: 'Jamaica', value: '602' },
  { label: 'Japan', value: '207' },
  { label: 'Jordan', value: '225' },
  { label: 'Kazakhstan', value: '053' },
  { label: 'Kenya', value: '132' },
  { label: 'Kiribati', value: '831' },
  { label: 'Korea, North (DPRK)', value: '257' },
  { label: 'Korea, South', value: '258' },
  { label: 'Kosovo', value: '064' },
  { label: 'Kuwait', value: '226' },
  { label: 'Kyrgyzstan', value: '054' },
  { label: 'Laos', value: '260' },
  { label: 'Latvia', value: '019' },
  { label: 'Lebanon', value: '208' },
  { label: 'Lesotho', value: '152' },
  { label: 'Libera', value: '170' },
  { label: 'Libya', value: '171' },
  { label: 'Liechtenstein', value: '086' },
  { label: 'Lithuania', value: '020' },
  { label: 'Luxembourg', value: '013' },
  { label: 'Macedonia', value: '070' },
  { label: 'Madagascar', value: '172' },
  { label: 'Malawi', value: '111' },
  { label: 'Malaysia', value: '242' },
  { label: 'Maldives', value: '901' },
  { label: 'Mali', value: '173' },
  { label: 'Malta', value: '030' },
  { label: 'Marshall Islands', value: '834' },
  { label: 'Mauritania', value: '174' },
  { label: 'Mauritius', value: '902' },
  { label: 'Mexico', value: '501' },
  { label: 'Moldova', value: '055' },
  { label: 'Monaco', value: '087' },
  { label: 'Mongolia', value: '262' },
  { label: 'Montenegro', value: '063' },
  { label: 'Morocco', value: '133' },
  { label: 'Mozambique', value: '175' },
  { label: 'Namibia', value: '122' },
  { label: 'Nauru', value: '341' },
  { label: 'Nepal', value: '264' },
  { label: 'Netherlands, The', value: '031' },
  { label: 'New Caledonia', value: '822' },
  { label: 'New Zealand', value: '339' },
  { label: 'Nicaragua', value: '546' },
  { label: 'Niger', value: '176' },
  { label: 'Nigeria', value: '177' },
  { label: 'Northern Mariana Islands', value: '830' },
  { label: 'Norway', value: '032' },
  { label: 'Oman', value: '263' },
  { label: 'Pakistan', value: '209' },
  { label: 'Palestinian Authority', value: '213' },
  { label: 'Panama', value: '547' },
  { label: 'Papua New Guinea', value: '342' },
  { label: 'Paraguay', value: '755' },
  { label: 'Peru', value: '723' },
  { label: 'Philippines', value: '227' },
  { label: 'Poland', value: '033' },
  { label: 'Portugal', value: '034' },
  { label: 'Qatar', value: '265' },
  { label: 'Republic of Congo', value: '159' },
  { label: 'Republic of Palau', value: '836' },
  { label: 'Romania', value: '088' },
  { label: 'Russia', value: '056' },
  { label: 'Rwanda', value: '179' },
  { label: 'Saint Kitts and Nevis', value: '629' },
  { label: 'Saint Lucia', value: '630' },
  { label: 'San Marino', value: '089' },
  { label: 'Samoa', value: '844' },
  { label: 'Sao Tome and Principe', value: '914' },
  { label: 'Senegal', value: '180' },
  { label: 'Serbia, Republic Of', value: '062' },
  { label: 'Seychelles', value: '904' },
  { label: 'Sierra Leone', value: '181' },
  { label: 'Singapore', value: '246' },
  { label: 'Slovakia', value: '016' },
  { label: 'Slovenia', value: '824' },
  { label: 'Solomon Islands', value: '182' },
  { label: 'Somalia', value: '231' },
  { label: 'South Africa, Republic Of', value: '121' },
  { label: 'South Sudan', value: '189' },
  { label: 'Spain', value: '037' },
  { label: 'Sri Lanka', value: '201' },
  { label: 'St. Vincent and the Grenadines', value: '631' },
  { label: 'Stateless', value: '' },
  { label: 'Sudan', value: '185' },
  { label: 'Suriname', value: '752' },
  { label: 'Swaziland', value: '186' },
  { label: 'Sweden', value: '040' },
  { label: 'Switzerland', value: '041' },
  { label: 'Syria', value: '210' },
  { label: 'Taiwan', value: '203' },
  { label: 'Tajikistan', value: '057' },
  { label: 'Tanzania', value: '130' },
  { label: 'Thailand', value: '267' },
  { label: 'Togo', value: '187' },
  { label: 'Tongo', value: '846' },
  { label: 'Trinidad and Tobago', value: '605' },
  { label: 'Tunisia', value: '135' },
  { label: 'Turkey', value: '045' },
  { label: 'Turkmenistan', value: '058' },
  { label: 'Tuvalu', value: '826' },
  { label: 'Uganda', value: '136' },
  { label: 'UK - Brit. Ntl. Overseas', value: '010' },
  { label: 'UK - Brit. overseas citizen', value: '004' },
  { label: 'UK - Brit. overseas terr.', value: '005' },
  { label: 'UK - British citizen', value: '003' },
  { label: 'Ukraine', value: '059' },
  { label: 'United Arab Emirates', value: '280' },
  { label: 'United States of America', value: '461' },
  { label: 'Unknown', value: '000' },
  { label: 'Uruguay', value: '724' },
  { label: 'Uzbekistan', value: '060' },
  { label: 'Vanuatu', value: '823' },
  { label: 'Vatican City State', value: '090' },
  { label: 'Venezuela', value: '725' },
  { label: 'Vietnam', value: '270' },
  { label: 'Western Sahara', value: '184' },
  { label: 'Yemen', value: '273' },
  { label: 'Zambia', value: '112' },
  { label: 'Zimbabwe', value: '113' },
];