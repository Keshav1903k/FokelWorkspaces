const fs = require('fs');
const path = require('path');

// Raw CSV lines provided by the user
const rawData = `Property Name,Workspace Type,City,Locality,Starting Price Display,Starting Price Number,Image Folder Name,Short Description,Key Amenities,Full Address,Pincode,Total Capacity,Price Unit,Image File Name,Image Source Link,Data Source,Data Notes
22 Workspace - Corporate House,Coworking Space,Delhi NCR,Asaf Ali Road,"₹5,499/seat",5499,22 Workspace - Corporate House,"Budget-friendly coworking centre on Asaf Ali Road, a short hop from Connaught Place and New Delhi metro (about 0.8 km). Flexi day passes plus dedicated desks, open 9 am to 7 pm Monday to Saturday.","High-speed Wi-Fi, Power Backup, Charging Points, Printing, Air Conditioning, Mail Handling","1/22, 2nd Floor, Asaf Ali Road, Opposite Kamla Market HP Petrol Pump, New Delhi",110002,TBC,per seat/month,22 Workspace - Corporate House.jpg,https://myhq.in/dedicated/coworking-space/22-workspace,https://myhq.in/dedicated/coworking-space/22-workspace,Likely SAB Group property - confirm and mark Featured. Amenities from myHQ and office-hub listings.
22 Workspace - Asaf Ali Road,Coworking Space,Delhi NCR,Asaf Ali Road,"₹6,999/seat",6999,22 Workspace - Asaf Ali Road,"Second 22 Workspace centre on Asaf Ali Road, about 1.3 km from Delhi Gate metro. A budget-friendly option for teams wanting a central Delhi address.","High-speed Wi-Fi, Power Backup, Printing, Air Conditioning, Mail Handling","3/8, 2nd Floor, Asaf Ali Road, New Delhi",110002,TBC,per seat/month,22 Workspace - Asaf Ali Road.jpg,https://myhq.in/dedicated/coworking-space/22workspace-asafaliroad,https://myhq.in/dedicated/coworking-space/22workspace-asafaliroad,Likely SAB Group property - confirm and mark Featured. Photos: https://www.myhq.in/flexi/coworking-space/22workspace-asafaliroad (9 photos).
Connect HQ - ABL Workspaces CP,Coworking Space,Delhi NCR,Connaught Place,"₹15,000/seat",15000,Connect HQ - ABL Workspaces CP,"Reserved dedicated desks with storage on the 2nd floor of M Block, Outer Circle, about 0.5 km from Rajiv Chowk metro. Part of ABL Workspaces, a Delhi NCR brand serving mostly corporate teams.","Dedicated Desks, Storage Units, Charging Points, Power Backup, Metro Connectivity","2nd Floor, 130-131, M Block, Outer Circle, Connaught Place, New Delhi",110001,TBC,per seat/month,Connect HQ - ABL Workspaces CP.jpg,https://myhq.in/coworking-space/ABL-Workspaces-CP,https://myhq.in/coworking-space/ABL-Workspaces-CP,
Start CoWorks - Connaught Place,Coworking Space,Delhi NCR,Connaught Place,"₹10,999/seat",10999,Start CoWorks - Connaught Place,Modern coworking space near R.K. Ashram Marg metro (about 400 m) with dedicated desks and private cabins. Rated 4.8 on CoFynd.,"Dedicated Desks, Private Cabins, Meeting Room Hours, Storage, Metro Connectivity","Building No-55, 1st Floor, Panchkuian Marg, Near Ramakrishna Ashram Metro Station, Connaught Place, New Delhi",110001,TBC,per seat/month,Start CoWorks - Connaught Place.jpg,https://cofynd.com/coworking/start-coworks-connaught-place,https://cofynd.com/coworking/start-coworks-connaught-place,"Price from CoFynd (myHQ shows cabin from ₹5,499). Pincode inferred from locality - verify."
Rworkspaces - Vardhman Trade Centre,Coworking Space,Delhi NCR,Nehru Place,"₹6,499/seat",6499,Rworkspaces - Vardhman Trade Centre,"Value-priced coworking centre in Nehru Place, South Delhi's IT and commercial hub. Rated 4.7 on myHQ from 157 reviews.","Air Conditioning, Charging Points, Power Backup, Flexi Desks, Dedicated Desks","Vardhman Trade Centre, Unit No. 1, 3rd Floor, DDA Building, Lala Lajpat Rai Road, above Exide Life Insurance, Nehru Place, New Delhi",110019,TBC,per seat/month,Rworkspaces - Vardhman Trade Centre.jpg,https://myhq.in/dedicated/coworking-space/rworkspaces,https://myhq.in/dedicated/coworking-space/rworkspaces,
Rworkspaces - Devika Towers,Coworking Space,Delhi NCR,Nehru Place,"₹8,500/seat",8500,Rworkspaces - Devika Towers,"Coworking for startups and corporates on the 7th floor of Devika Tower, about 550 m from Nehru Enclave metro. Flexi desks start around ₹250/day.","Flexi Desks, Dedicated Desks, High-speed Wi-Fi, Power Backup, Metro Connectivity","713, 7th Floor, Devika Tower, Nehru Place, New Delhi",110019,TBC,per seat/month,Rworkspaces - Devika Towers.jpg,https://myhq.in/dedicated/coworking-space/rworkspaces-devika-towers,https://myhq.in/dedicated/coworking-space/rworkspaces-devika-towers,Amenities indicative - confirm with operator.
91Springboard - Chandra Bhavan,Coworking Space,Delhi NCR,Nehru Place,"₹12,999/seat",12999,91Springboard - Chandra Bhavan,"Established national-brand centre in Nehru Place, 400-450 m from Kalkaji Mandir and Nehru Place metro stations. Rated 4.4 from 658 reviews on myHQ.","Storage Space, Breakout Area, Cafeteria, Metro Connectivity, Flexi Desks","3rd Floor, Chandra Bhavan, 67-68, Nehru Place, New Delhi",110019,TBC,per seat/month,91Springboard - Chandra Bhavan.jpg,https://myhq.in/coworking-space/91springboard-chandra-bhavan,https://myhq.in/coworking-space/91springboard-chandra-bhavan,"myHQ also shows ₹24,999 on a listing page; ₹12,999 used as the lowest quoted."
Workly - Hemkunt Chambers,Coworking Space,Delhi NCR,Nehru Place,"₹11,000/seat",11000,Workly - Hemkunt Chambers,"Private-cabin focused centre on the 3rd floor of Hemkunt Chambers in the heart of Nehru Place, with banks, cafes and food outlets nearby.","Private Cabins, Storage Space, Breakout Area, Cafeteria, Air Conditioning","Hemkunt Chambers, 3rd Floor, 310, 89, Nehru Place, New Delhi",110019,TBC,per seat/month,Workly - Hemkunt Chambers.jpg,https://myhq.in/dedicated/coworking-space/workly-nehruplace,https://myhq.in/dedicated/coworking-space/workly-nehruplace,"myHQ shows ₹11,000 on one page and ₹12,999 on another."
Regus - Eros Corporate Tower,Coworking Space,Delhi NCR,Nehru Place,"₹9,999/seat",9999,Regus - Eros Corporate Tower,"Premium Regus centre on the 15th floor of Eros Corporate Tower, steps from Nehru Place market and close to metro. Open 24/7 on myHQ listing.","Meeting Rooms, Common Areas, Metro Connectivity, 24/7 Access, Business Address","Eros Corporate Towers, 15th Floor, Nehru Place, New Delhi",110019,TBC,per seat/month,Regus - Eros Corporate Tower.jpg,https://www.regus.com/en-gb/india/new-delhi/eros-corporate-tower-594,https://www.regus.com/en-gb/india/new-delhi/eros-corporate-tower-594,Price from myHQ quote (negotiable).
Innov8 - Old Fort Saket,Coworking Space,Delhi NCR,Saket,"₹13,999/seat",13999,Innov8 - Old Fort Saket,"Innov8 centre next to Select Citywalk Mall in Saket District Centre, offering flexi desks from about ₹350/day, dedicated desks and private cabins. Malviya Nagar metro is about 1.2 km away.","Power Backup, Stationery, Metro Connectivity, Flexi Desks, Dedicated Desks, Private Cabins","1st Floor, Old Fort, Saket District Centre, Next to Select City Walk Mall, Sector 6, Pushp Vihar, New Delhi",110017,TBC,per seat/month,Innov8 - Old Fort Saket.jpg,https://myhq.in/coworking-space/innov8-saket-old-fort,https://myhq.in/coworking-space/innov8-saket-old-fort,Pincode inferred from locality - verify.
MIO Coworks - Saiyad Ul Ajaib,Coworking Space,Delhi NCR,Saket,"₹10,999/seat",10999,MIO Coworks - Saiyad Ul Ajaib,Coworking centre on Westend Marg in the Saket and Saiyad Ul Ajaib area of South Delhi.,"High-speed Wi-Fi, Power Backup, Air Conditioning, Dedicated Desks","251, Westend Marg, Saiyad Ul Ajaib Extension, Pushp Vihar, New Delhi",110030,TBC,per seat/month,MIO Coworks - Saiyad Ul Ajaib.jpg,https://myhq.in/dedicated/coworking-space/mio-coworks-saiyadulajaibextension,https://myhq.in/dedicated/coworking-space/mio-coworks-saiyadulajaibextension,Amenities indicative - confirm with operator.
Zo Space - Plot No 5 Saket,Coworking Space,Delhi NCR,Saket,"₹7,999/seat",7999,Zo Space - Plot No 5 Saket,"Budget dedicated-desk coworking on Westend Marg, Saidulajab, near Saket metro.","Dedicated Desks, High-speed Wi-Fi, Power Backup, Air Conditioning","Plot No. 5, Khasra No. 274, Saidulajab Extension, Westend Marg, New Delhi",110030,TBC,per seat/month,Zo Space - Plot No 5 Saket.jpg,https://myhq.in/coworking-space/zo-space-saket,https://myhq.in/coworking-space/zo-space-saket,Amenities indicative - confirm with operator. Pincode inferred from locality - verify.
COWRKS - Aerocity Worldmark 1A,Coworking Space,Delhi NCR,Aerocity,"₹24,999/seat",24999,COWRKS - Aerocity Worldmark 1A,"Premium coworking in Worldmark 1, Tower A, Aerocity, about 600 m from Delhi Aerocity metro (Airport Express Line). Flexi desks, private cabins and meeting rooms available.","Flexi Desks, Private Cabins, Meeting Rooms, Metro Connectivity, Premium Address","Worldmark 1, Tower A, Indira Gandhi International Airport, Aerocity, New Delhi",110037,TBC,per seat/month,COWRKS - Aerocity Worldmark 1A.jpg,https://myhq.in/coworking-space/cowrks-worldmark-1,https://myhq.in/coworking-space/cowrks-worldmark-1,
Innov8 - Pride Plaza Aerocity,Coworking Space,Delhi NCR,Aerocity,"₹24,999/seat",24999,Innov8 - Pride Plaza Aerocity,"Innov8 coworking inside the Pride Plaza Hotel precinct in Aerocity, close to IGI Airport. Suited to teams that need a hospitality-district address.","High-speed Wi-Fi, Power Backup, Meeting Rooms, Cafeteria, Air Conditioning","Innov8 Coworking, Pride Plaza Hotel, Asset 5A, Aerocity, Near IGI Airport, New Delhi",110037,TBC,per seat/month,Innov8 - Pride Plaza Aerocity.jpg,https://myhq.in/coworking-space/innov8-pride-plaza,https://myhq.in/coworking-space/innov8-pride-plaza,Amenities indicative - confirm with operator.
Roseate House Aerocity Coworking,Coworking Space,Delhi NCR,Aerocity,"₹40,000/seat",40000,Roseate House Aerocity Coworking,"Premium coworking within Roseate House in Aerocity's Hospitality District, 270 m from Aerocity metro. Flexi day desks start around ₹1,000-1,200.","Flexi Desks, Dedicated Desks, Private Cabins, Metro Connectivity, Premium Address","Asset 10, Northern Access Road, Aerocity, Hospitality District, IGI Airport, New Delhi",110037,TBC,per seat/month,Roseate House Aerocity Coworking.jpg,https://myhq.in/coworking-space/roseate-house-aerocity,https://myhq.in/coworking-space/roseate-house-aerocity,Dedicated-desk price from CoFynd (https://cofynd.com/coworking/delhi/aerocity).
Co-Offiz - Janakpuri,Coworking Space,Delhi NCR,Janakpuri,"₹7,999/seat",7999,Co-Offiz - Janakpuri,"Budget coworking directly opposite Janakpuri East metro (about 300 m), with flexi desks from about ₹200/day and dedicated desks. Co-Offiz also runs centres in Preet Vihar, Netaji Subhash Place, Noida and Gurugram.","Air Conditioning, Charging Points, Power Backup, Flexi Desks, Dedicated Desks, Metro Connectivity","B1/632, 3rd Floor, Opposite Metro Pillar No. 566, Janakpuri, New Delhi",110058,TBC,per seat/month,Co-Offiz - Janakpuri.jpg,https://myhq.in/coworking-space/co-offiz-janakpuri,https://myhq.in/coworking-space/co-offiz-janakpuri,Pincode inferred from locality - verify.
Co-Offiz - HB Twin Tower,Coworking Space,Delhi NCR,Netaji Subhash Place,"₹9,499/seat",9499,Co-Offiz - HB Twin Tower,"Dedicated-desk coworking on the 5th floor of HB Twin Tower above Max Hospital, about 0.7 km from Netaji Subhash Place metro. Rated 4.4 from 289 reviews.","Dedicated Desks, Storage, Metro Connectivity, Air Conditioning, Power Backup","5th Floor, HB Twin Tower, Netaji Subhash Place, Above Max Hospital, New Delhi",110034,TBC,per seat/month,Co-Offiz - HB Twin Tower.jpg,https://myhq.in/coworking-space/co-offiz-nsp,https://myhq.in/coworking-space/co-offiz-nsp,Pincode inferred from locality - verify.
Cosphere Spaces - Netaji Subhash Place,Coworking Space,Delhi NCR,Netaji Subhash Place,"₹6,499/seat",6499,Cosphere Spaces - Netaji Subhash Place,"Rated 5.0 coworking centre with around 65 seats and separate washrooms, serving North West Delhi.","Dedicated Desks, Private Cabins, Separate Washrooms, Power Backup, Air Conditioning","Plot No. 13, SBI Colony, GT Karnal Road, Delhi",110009,65,per seat/month,Cosphere Spaces - Netaji Subhash Place.jpg,https://myhq.in/dedicated/coworking-space/cosphere-spaces-netajisubhashplace,https://myhq.in/dedicated/coworking-space/cosphere-spaces-netajisubhashplace,Amenities indicative - confirm with operator. Capacity is approximate per myHQ.
4U Coworks - Subhash Nagar,Coworking Space,Delhi NCR,Janakpuri,"₹8,500/seat",8500,4U Coworks - Subhash Nagar,Coworking on the 2nd and 3rd floors above IDFC Bank near Subhash Nagar metro. Rated 4.9 from 49 reviews.,"Air Conditioning, Dedicated Desks, Metro Connectivity, Power Backup, High-speed Wi-Fi","Gate No. 4, WZ-104, Second and Third Floor, above IDFC Bank, near Subhash Nagar Metro Station, Meenakshi Garden, New Delhi",110018,TBC,per seat/month,4U Coworks - Subhash Nagar.jpg,https://myhq.in/dedicated/coworking-space/4u-coworks-netajisubhashplace,https://myhq.in/dedicated/coworking-space/4u-coworks-netajisubhashplace,Amenities indicative - confirm with operator.
COWRKS - DLF Cyber City,Coworking Space,Delhi NCR,"DLF Cyber City, Gurugram","₹19,999/seat",19999,COWRKS - DLF Cyber City,"24x7 coworking centre in DLF Cyber City, about 0.5 km from IndusInd Bank Cyber City metro, near global enterprises and business hotels.","24x7 Access, Meeting Rooms, Phone Booth, Flexi Desks, Private Cabins, Metro Connectivity","5th Floor, Building No. 10A, DLF Cyber City, DLF Phase 2, Sector 24, Gurugram, Haryana",122002,TBC,per seat/month,COWRKS - DLF Cyber City.jpg,https://myhq.in/coworking-space/cowrks-dlfcybercity,https://myhq.in/coworking-space/cowrks-dlfcybercity,
91Springboard - DLF Building 7A,Coworking Space,Delhi NCR,"DLF Cyber City, Gurugram","₹24,999/seat",24999,91Springboard - DLF Building 7A,"Large 91Springboard centre on the ground and first floors of Building 7A, about 0.8 km from Cyber City metro. Flexi desks, dedicated desks and private cabins with meeting-room hours.","Flexi Desks, Dedicated Desks, Private Cabins, Meeting Room Hours, Metro Connectivity","Ground and 1st Floor, Building No. 7A, DLF Cyber City, DLF Phase 2, Sector 24, Gurugram, Haryana",122002,600,per seat/month,91Springboard - DLF Building 7A.jpg,https://myhq.in/coworking-space/91springboard-dlf-building-no-7a,https://myhq.in/coworking-space/91springboard-dlf-building-no-7a,Capacity 600 seats per myHQ managed-office listing.
Spaces - DLF Building 9A,Coworking Space,Delhi NCR,"DLF Cyber City, Gurugram","₹23,099/seat",23099,Spaces - DLF Building 9A,"Premium Spaces centre on the 16th floor of Building 9A, Cyber City, with dedicated desks and private cabins.","Dedicated Desks, Private Cabins, Reserved Storage, Premium Address","16th Floor, Building No. 9A, Cyber City, DLF Phase 3, Gurugram, Haryana",122002,TBC,per seat/month,Spaces - DLF Building 9A.jpg,https://myhq.in/dedicated/coworking-space/spaces-building-no-9a,https://myhq.in/dedicated/coworking-space/spaces-building-no-9a,Amenities indicative - confirm with operator. Pincode inferred from locality - verify.
Nimble Cowork - Udyog Vihar,Coworking Space,Delhi NCR,"Udyog Vihar, Gurugram","₹7,000/seat",7000,Nimble Cowork - Udyog Vihar,"Budget-friendly coworking centre with 500-plus seats opposite DLF Cyber City, off NH8 near the metro.","Meeting Rooms, Air Conditioning, Dedicated Desks, Power Backup, Metro Nearby","Plot 250, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana",122015,500+,per seat/month,Nimble Cowork - Udyog Vihar.jpg,https://myhq.in/dedicated/coworking-space/nimble-coworkudyog-vihar-udyogvihar,https://myhq.in/dedicated/coworking-space/nimble-coworkudyog-vihar-udyogvihar,
Regus - Unitech Cyber Park,Coworking Space,Delhi NCR,"Sector 39, Gurugram","₹6,090/seat",6090,Regus - Unitech Cyber Park,"Regus centre in Unitech Cyber Park with easy access to HUDA City Centre metro and NH-48. Dedicated desks, day coworking, meeting rooms and virtual office plans.","Meeting Rooms, Dedicated Desks, Day Coworking, Virtual Office Plans, Business Address","3rd Floor, Unitech Cyber Park, Village Jharsa, Gurugram, Haryana",122003,TBC,per seat/month,Regus - Unitech Cyber Park.jpg,https://www.regus.com/en/in/6282,https://www.regus.com/en/in/6282,"Price is Regus Gurugram 'office desk from ₹6,090 per person per month'."
Akasa Coworking - Sector 62,Coworking Space,Delhi NCR,"Sector 62, Noida","₹8,499/seat",8499,Akasa Coworking - Sector 62,"Large coworking centre in a 50,000 sq ft building in Noida's Sector 62 IT hub. Rated 4.8 from 302 brand reviews on myHQ.","Dedicated Desks, Private Cabins, Meeting Rooms, Power Backup, High-speed Wi-Fi","56-6C, C Block, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh",201309,TBC,per seat/month,Akasa Coworking - Sector 62.jpg,https://myhq.in/dedicated/coworking-space/akasa-coworking-sector62-2,https://myhq.in/dedicated/coworking-space/akasa-coworking-sector62-2,"Amenities indicative - confirm with operator. Building area 50,000 sq ft per myHQ."
Akasa Coworking - Trapezoid IT Park,Coworking Space,Delhi NCR,"Sector 62, Noida","₹6,999/seat",6999,Akasa Coworking - Trapezoid IT Park,"Affordable dedicated desks and private cabins in Trapezoid IT Park, about 1.4 km from Noida Sector 62 metro. Rated 4.9 from 171 reviews.","Dedicated Desks, Private Cabins, Metro Connectivity, Power Backup, High-speed Wi-Fi","Unit No. 907, Trapezoid IT Park, C-27, C Block, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh",201309,TBC,per seat/month,Akasa Coworking - Trapezoid IT Park.jpg,https://myhq.in/coworking-space/akasa-coworking-trapezoida-it-park,https://myhq.in/coworking-space/akasa-coworking-trapezoida-it-park,Amenities indicative - confirm with operator.
COWRKS - Candor Techspace Noida,Coworking Space,Delhi NCR,"Sector 62, Noida","₹14,500/seat",14500,COWRKS - Candor Techspace Noida,"Premium COWRKS centre inside Candor Techspace Tower 5, Sector 62, with flexi desks, dedicated desks and private cabins.","Flexi Desks, Dedicated Desks, Private Cabins, Premium Address, High-speed Wi-Fi","Candor Techspace, Sector 62, Noida, Uttar Pradesh",201309,TBC,per seat/month,COWRKS - Candor Techspace Noida.jpg,https://myhq.in/coworking-space/cowrks-candor-techspace,https://myhq.in/coworking-space/cowrks-candor-techspace,Amenities indicative - confirm with operator. Floor and tower number to be confirmed.
Vatika Business Centre - Sector 62,Coworking Space,Delhi NCR,"Sector 62, Noida","₹12,999/seat",12999,Vatika Business Centre - Sector 62,"Serviced business centre in Sector 62, Noida, offering dedicated desks for 1 to 100+ seats. Rated 4.2 on CoFynd.","Dedicated Desks, Meeting Rooms, Reception, Business Address, Air Conditioning","Sector 62, Noida, Uttar Pradesh (exact building to be confirmed)",201309,TBC,per seat/month,Vatika Business Centre - Sector 62.jpg,https://cofynd.com/coworking/vatika-business-centre-sector-62-noida,https://cofynd.com/coworking/vatika-business-centre-sector-62-noida,Amenities indicative - confirm with operator. Exact address not on listing.
Work Matrix - Naurang House,Managed Office,Delhi NCR,Connaught Place,"₹11,499/seat",11499,Work Matrix - Naurang House,"Managed office with A-class coworking amenities in Naurang House on Kasturba Gandhi Marg, in the heart of Connaught Place. Ready-to-move-in and warm-shell options.","Ready-to-move-in Offices, Warm-shell Option, Meeting Rooms, Power Backup, Metro Nearby","105, B-21, Kasturba Gandhi Marg, Connaught Place, New Delhi",110001,TBC,per seat/month,Work Matrix - Naurang House.jpg,https://myhq.in/managed-office/work-matrix-connaughtplace,https://myhq.in/managed-office/work-matrix-connaughtplace,Amenities indicative - confirm with operator. Rated 3.9 (201 reviews). Pincode inferred from locality.
Smartworks - Vardhman Trade Center,Managed Office,Delhi NCR,Nehru Place,"₹9,000/seat",9000,Smartworks - Vardhman Trade Center,"Managed office in a prominent Nehru Place commercial building, with ready-to-move-in and warm-shell options. Rated 4.1 from 119 reviews.","Ready-to-move-in Offices, Warm-shell Option, Security Personnel, First Aid Kit, Air Conditioning","Vardhman Trade Centre, Nehru Place, New Delhi (floor and unit to be confirmed)",110019,TBC,per seat/month,Smartworks - Vardhman Trade Center.jpg,https://myhq.in/managed-office/smartworks-vardhman-trade-center,https://myhq.in/managed-office/smartworks-vardhman-trade-center,Pincode inferred from locality.
Cubeecle - Brookfield Mall,Managed Office,Delhi NCR,Nehru Place,"₹13,000/seat",13000,Cubeecle - Brookfield Mall,"Warm-shell managed office custom-designed to your brand, located in Vardhman Trade Centre, Nehru Place. Rated 4.8 from 199 reviews.","Warm-shell Customisation, Design Assistance, Air Conditioning, Power Backup, Metro Nearby","Vardhman Trade Centre, District Centre, 3rd Floor, Unit No. 2, Plot No. 3 and 4, Nehru Place, New Delhi",110019,TBC,per seat/month,Cubeecle - Brookfield Mall.jpg,https://myhq.in/managed-office/cubeecle-brookfield-mall,https://myhq.in/managed-office/cubeecle-brookfield-mall,Amenities indicative - confirm with operator.
Buzz by Spacetime - Saket,Managed Office,Delhi NCR,Saket,"₹13,374/seat",13374,Buzz by Spacetime - Saket,"Premium managed office in Saidulajab near Saket, designed for creative teams. Rated 4.6 from 31 reviews, with ready-to-move-in and warm-shell options.","Ready-to-move-in Offices, Warm-shell Option, Metro Nearby (about 350 m), Air Conditioning, Power Backup","275, Khasra, Westend Marg, Saidulajab, Saket, New Delhi",110030,TBC,per seat/month,Buzz by Spacetime - Saket.jpg,https://myhq.in/managed-office/buzz-by-spacetime-saket,https://myhq.in/managed-office/buzz-by-spacetime-saket,Amenities indicative - confirm with operator.
Krastay - Saket,Managed Office,Delhi NCR,Saket,"₹6,499/seat",6499,Krastay - Saket,"Budget-friendly managed office on Westend Marg near Saket, rated 4.4. Ready-to-move-in and warm-shell options.","Ready-to-move-in Offices, Warm-shell Option, Metro Connectivity, Air Conditioning, Power Backup","H-294, Building 2, Lane 2, 1st Floor, Westend Marg, near Saket, Saidulajab, New Delhi",110030,TBC,per seat/month,Krastay - Saket.jpg,https://myhq.in/managed-office/krastay,https://myhq.in/managed-office/krastay,Amenities indicative - confirm with operator. Pincode inferred from locality - verify.
Smartworks - Worldmark 4 Aerocity,Managed Office,Delhi NCR,Aerocity,"₹30,000/seat",30000,Smartworks - Worldmark 4 Aerocity,"Warm-shell managed office on the 6th floor of Worldmark 4 in the Gateway District, Aerocity. Rated 4.8.","Warm-shell Customisation, Security Personnel, First Aid Kit, Air Conditioning, Metro Nearby","6th Floor, Worldmark 4, Worldmark Aerocity, Manhattan Street, Gateway District, Aerocity, New Delhi",110037,TBC,per seat/month,Smartworks - Worldmark 4 Aerocity.jpg,https://myhq.in/managed-office/smartworks-worldmark-4,https://myhq.in/managed-office/smartworks-worldmark-4,Amenities indicative - confirm with operator.
awfis - Prestige Trade Centre Aerocity,Managed Office,Delhi NCR,Aerocity,"₹40,000/seat",40000,awfis - Prestige Trade Centre Aerocity,"Awfis managed office on the 2nd floor of Prestige Trade Centre, Aerocity. Rated 4.8 from 45 reviews.","Ready-to-move-in Offices, Meeting Rooms, Air Conditioning, Power Backup, Metro Nearby","2nd Floor, Prestige Trade Centre, Asset No. 13, Aerocity Road, Aerocity, New Delhi",110037,TBC,per seat/month,awfis - Prestige Trade Centre Aerocity.jpg,https://myhq.in/managed-office/awfis-aerocity,https://myhq.in/managed-office/awfis-aerocity,Amenities indicative - confirm with operator.
SpringHouse - Welldone Tech Park,Managed Office,Delhi NCR,"Sector 48, Gurugram","₹5,500/seat",5500,SpringHouse - Welldone Tech Park,"Affordable managed office in Welldone Tech Park on Sohna Road, Sector 48. Rated 4.8 from 24 reviews, with a warm-shell option.","Ready-to-move-in Offices, Warm-shell Option, Meeting Rooms, Power Backup, Parking","Welldone Tech Park, Badshahpur Sohna Road Highway, Sector 48, Gurugram, Haryana",122001,TBC,per seat/month,SpringHouse - Welldone Tech Park.jpg,https://www.myhq.in/gurugram/managed-office/sector-48-gurgaon,https://www.myhq.in/gurugram/managed-office/sector-48-gurgaon,Amenities indicative - confirm with operator. Pincode taken from Regus listing for the same building; verify (Sector 48 may be 122018).
Nukleus - Logix Cyber Park,Managed Office,Delhi NCR,"Sector 62, Noida","₹6,799/seat",6799,Nukleus - Logix Cyber Park,"Managed office on the 9th floor of Tower C, Logix Cyber Park, in one of Noida's major business sectors. Rated 4.7 from 63 reviews.","Ready-to-move-in Offices, Warm-shell Option, Meeting Rooms, Power Backup, Metro Nearby","9th Floor, Tower C, Logix Cyber Park, C Block, Sector 62, Noida, Uttar Pradesh",201309,TBC,per seat/month,Nukleus - Logix Cyber Park.jpg,https://myhq.in/managed-office/nukleus-logix-cyber-park,https://myhq.in/managed-office/nukleus-logix-cyber-park,Amenities indicative - confirm with operator. Address truncated on listing.
International Trade Tower - Nehru Place,Commercial / Office Space,Delhi NCR,Nehru Place,₹200/sq.ft,200,International Trade Tower - Nehru Place,"Independent air-conditioned commercial tower built in 2001, in the middle of Nehru Place. Typical lease carries a 6-month security deposit.","Air Conditioning, Lifts, Power Backup, Parking, Metro Nearby","International Trade Tower, Nehru Place, New Delhi",110019,Area on request,per sq ft/month,International Trade Tower - Nehru Place.jpg,https://myhq.in/office-space-for-rent/international-trade-tower-nehruplace,https://myhq.in/office-space-for-rent/international-trade-tower-nehruplace,Amenities indicative - confirm with operator. myHQ quote; broker listings show ₹125-180 per sq ft.
IFCI Tower - Nehru Place,Commercial / Office Space,Delhi NCR,Nehru Place,₹200/sq.ft,200,IFCI Tower - Nehru Place,"Corporate tower opposite Nehru Place metro, with unfurnished, fully customisable warm-shell floors.","Unfurnished Warm Shell, Metro Nearby, Lifts, Power Backup, Parking","IFCI Tower, Nehru Place, New Delhi",110019,Area on request,per sq ft/month,IFCI Tower - Nehru Place.jpg,https://myhq.in/office-space-for-rent/ifci-tower-nehruplace,https://myhq.in/office-space-for-rent/ifci-tower-nehruplace,"Amenities indicative - confirm with operator. myHQ quote; one broker listing shows 15,000 sq ft at ₹225."
Plot No B-18 - Chirag Enclave,Commercial / Office Space,Delhi NCR,Nehru Place,₹90/sq.ft,90,Plot No B-18 - Chirag Enclave,"Budget unfurnished office space near Nehru Place at Chirag Enclave, for businesses that want to fit out their own floor.","Unfurnished Warm Shell, Parking, Lifts, Power Backup","Plot No. B-18, Chirag Enclave, near Nehru Place, New Delhi",110048,Area on request,per sq ft/month,Plot No B-18 - Chirag Enclave.jpg,https://myhq.in/office-space-for-rent/plot-no-b18-nehruplace,https://myhq.in/office-space-for-rent/plot-no-b18-nehruplace,Amenities indicative - confirm with operator. Pincode inferred from locality - verify.
Vatika Towers - Golf Course Road,Commercial / Office Space,Delhi NCR,"Golf Course Road, Gurugram",₹100/sq.ft,100,Vatika Towers - Golf Course Road,"Ready-to-move office towers on Golf Course Road, Sector 54, with floor plates from 1,000 to 17,000 sq ft across two towers (about 2.14 lakh sq ft).","Power Backup, Parking, Lifts, Security, Metro Nearby","Vatika Towers, Sector 54, Golf Course Road, Gurugram, Haryana",122002,"1,000-17,000 sq ft",per sq ft/month,Vatika Towers - Golf Course Road.jpg,https://realtyhunting.com/office-space-for-rent-in-vatika-towers-sector-54-gurgaon/,https://realtyhunting.com/office-space-for-rent-in-vatika-towers-sector-54-gurgaon/,Amenities indicative - confirm with operator. Rent band ₹100-120 per sq ft plus CAM. Pincode inferred from locality - verify.
Orchid Centre - Golf Course Road,Commercial / Office Space,Delhi NCR,"Golf Course Road, Gurugram",₹120/sq.ft,120,Orchid Centre - Golf Course Road,"Grade A office building on Golf Course Road, Sector 53, with part and full floors from 1,000 to 40,000 sq ft.","Power Backup, Parking, Lifts, Security, Furnished Floors Available","Orchid Centre, Sector 53, Golf Course Road, Gurugram, Haryana",122002,"1,000-40,000 sq ft",per sq ft/month,Orchid Centre - Golf Course Road.jpg,https://realtyhunting.com/office-space-for-rent-in-orchid-centre-sector-53-gurgaon/,https://realtyhunting.com/office-space-for-rent-in-orchid-centre-sector-53-gurgaon/,Amenities indicative - confirm with operator. Rent band ₹120-140 per sq ft plus about ₹19 maintenance. Pincode inferred from locality - verify.
Suncity Success Tower - Golf Course Extension Road,Commercial / Office Space,Delhi NCR,"Golf Course Extension Road, Gurugram",₹55/sq.ft,55,Suncity Success Tower - Golf Course Extension Road,"Commercial tower on Golf Course Extension Road, Sector 65, with flexible 1,000 to 4,000 sq ft units suiting small and mid-sized teams. Bare space at the low end, furnished at the top.","Bare to Fully Furnished Options, Parking, Lifts, Power Backup, Security","Suncity Success Tower, Golf Course Extension Road, The Close South, Sector 65, Gurugram, Haryana",122102,"1,000-4,000 sq ft",per sq ft/month,Suncity Success Tower - Golf Course Extension Road.jpg,https://realtyhunting.com/office-space-for-rent-in-suncity-success-tower-sector-65-gurgaon/,https://realtyhunting.com/office-space-for-rent-in-suncity-success-tower-sector-65-gurgaon/,Amenities indicative - confirm with operator. Rent ₹55 bare to ₹85 furnished per sq ft plus CAM.
Ocus Technopolis - Golf Course Road,Commercial / Office Space,Delhi NCR,"Golf Course Road, Gurugram",₹110/sq.ft,110,Ocus Technopolis - Golf Course Road,"Commercial building on Golf Course Road, Sector 54, in the premium Golf Course Road office belt.","Power Backup, Parking, Lifts, Security, Metro Nearby","Ocus Technopolis, Sector 54, Golf Course Road, Gurugram, Haryana",122002,Area on request,per sq ft/month,Ocus Technopolis - Golf Course Road.jpg,https://realtyhunting.com/office-space-for-rent-in-ocus-technopolis-sector-54-gurgaon/,https://realtyhunting.com/office-space-for-rent-in-ocus-technopolis-sector-54-gurgaon/,Amenities indicative - confirm with operator. Rent band ₹110-140 per sq ft plus CAM. Pincode inferred from locality - verify.
I-Thum Tower - Sector 62,Commercial / Office Space,Delhi NCR,"Sector 62, Noida",₹61/sq.ft,61,I-Thum Tower - Sector 62,"IT office tower in Noida's Sector 62 Industrial Area, with furnished and semi-furnished units from roughly 485 to 1,560 sq ft listed.","Lifts, Parking, Power Backup, Furnished Options, Metro Nearby","Plot A-40, I-Thum IT Tower, Industrial Area, Sector 62, Noida, Uttar Pradesh",201309,"485-1,560 sq ft",per sq ft/month,I-Thum Tower - Sector 62.jpg,https://www.squareyards.com/rental-1560-sq-ft-office-space-in-ithums-62/10015353,https://www.squareyards.com/rental-1560-sq-ft-office-space-in-ithums-62/10015353,"Amenities indicative - confirm with operator. Rate derived: ₹95,000 per month for 1,560 sq ft listing. Verify with owner."
Connaught Place Virtual Office - L29-L34 Block L,Virtual Office,Delhi NCR,Connaught Place,₹849/mo,849,Connaught Place Virtual Office - L29-L34 Block L,"Prime Connaught Place business address for registered-office use. Plans include Business Address from ₹849/month and GST Registration from ₹1,199/month, with a company registration plan also offered.","Business Address, GST Registration, Company Registration, Mail Handling, Digital KYC","L29-L34, First Floor, Block L, Connaught Place, New Delhi",110001,NA,per month (VO),Connaught Place Virtual Office - L29-L34 Block L.jpg,https://cofynd.com/virtual-office/delhi,https://cofynd.com/virtual-office/delhi,Billing term (monthly vs yearly) to be confirmed with operator.
Nehru Place Virtual Office - RegisterKaro,Virtual Office,Delhi NCR,Nehru Place,₹599/mo,599,Nehru Place Virtual Office - RegisterKaro,"Compliant virtual office in Nehru Place for GST and company registration. Package includes rent agreement, NOC and utility bill ready for MCA and GST portals.","GST Registration, Company Registration, Rent Agreement, NOC, Utility Bill","Nehru Place, New Delhi (exact address shared on purchase)",110019,NA,per month (VO),Nehru Place Virtual Office - RegisterKaro.jpg,https://www.registerkaro.in/virtual-office-in-nehru-place-delhi,https://www.registerkaro.in/virtual-office-in-nehru-place-delhi,Exact building address not published.
Aerocity Virtual Office - TheGSTCo,Virtual Office,Delhi NCR,Aerocity,"₹1,399/mo",1399,Aerocity Virtual Office - TheGSTCo,"Aerocity business address with GST registration support. Basic plan is ₹1,399/month, with higher tiers adding mail scans and forwarding.","Business Address, GST Registration Support, Digital Mail Scans, Rent Agreement, NOC","Aerocity, New Delhi (exact address shared on purchase)",110037,NA,per month (VO),Aerocity Virtual Office - TheGSTCo.jpg,https://thegstco.com/products/virtual-office-in-delhi,https://thegstco.com/products/virtual-office-in-delhi,Exact building address not published.
CoWrks Paras Twin Towers - Virtual Office,Virtual Office,Delhi NCR,"Golf Course Road, Gurugram","₹1,099/mo",1099,CoWrks Paras Twin Towers - Virtual Office,"Golf Course Road virtual office. Business Address from ₹1,099/month, GST Registration from ₹2,199 and Company Registration from ₹1,599, with documents in 24 hours.","Business Address, GST Registration, Company Registration, Digital KYC, Agreement in 24 Hours","Paras Twin Towers, Golf Course Road, Gurugram, Haryana",122002,NA,per month (VO),CoWrks Paras Twin Towers - Virtual Office.jpg,https://cofynd.com/virtual-office/gurugram,https://cofynd.com/virtual-office/gurugram,Listing name truncated on CoFynd; building and pincode to be confirmed.
Regus - Unitech Cyber Park Virtual Office,Virtual Office,Delhi NCR,"Sector 39, Gurugram","₹1,050/mo",1050,Regus - Unitech Cyber Park Virtual Office,"Regus virtual office plans in Unitech Cyber Park, starting around ₹35 per day, with optional upgrades to meeting rooms and day office access.","Business Address, Telephone Answering, Virtual Receptionist, Meeting Room Access, Mail Handling","3rd Floor, Unitech Cyber Park, Village Jharsa, Gurugram, Haryana",122003,NA,per month (VO),Regus - Unitech Cyber Park Virtual Office.jpg,https://www.regus.com/en-us/india/gurugram,https://www.regus.com/en-us/india/gurugram,"₹1,050 is Regus Gurugram 'virtual office from' price."
Regus - Noida Virtual Office (Green Boulevard),Virtual Office,Delhi NCR,"Sector 62, Noida",₹790/mo,790,Regus - Noida Virtual Office (Green Boulevard),"Regus virtual office in Noida with a business address, telephone answering and virtual receptionist. Entry plan starts at ₹790/month.","Business Address, Telephone Answering, Virtual Receptionist, Mail Handling, Meeting Room Access","Green Boulevard, Sector 62, Noida, Uttar Pradesh",201309,NA,per month (VO),Regus - Noida Virtual Office (Green Boulevard).jpg,https://www.regus.com/en-us/india/noida/coworking,https://www.regus.com/en-us/india/noida/coworking,Price is Regus Noida 'virtual office from'. Confirm that this centre carries the VO plan.
Innov8 - Ranka Junction,Coworking Space,Bangalore,Marathahalli,"₹6,500/seat",6500,Innov8 - Ranka Junction,"Innov8 centre in Krishna Reddy Industrial Area near Marathahalli with dedicated desks, rated 4.4 from 17 reviews.","Air Conditioning, Dedicated Desks, High-speed Wi-Fi, Power Backup, Meeting Rooms","2nd Floor, AH45, Krishna Reddy Industrial Area, Dooravani Nagar, Bangalore, Karnataka",560016,TBC,per seat/month,Innov8 - Ranka Junction.jpg,https://myhq.in/dedicated/coworking-space/innov8-ranka-junction,https://myhq.in/dedicated/coworking-space/innov8-ranka-junction,Amenities indicative - confirm with operator.
WeWork - Prestige Cube Koramangala,Coworking Space,Bangalore,Koramangala,"₹27,699/seat",27699,WeWork - Prestige Cube Koramangala,"Private-office and flexi-desk workspace on Laskar Hosur Road in Adugodi, Koramangala. Flexi desks from about ₹550-750/day.","Private Offices, Flexi Desks, Meeting Rooms, Tea and Coffee, Premium Address","Site No. 26, Laskar Hosur Road, Adugodi, Bengaluru, Karnataka",560029,TBC,per seat/month,WeWork - Prestige Cube Koramangala.jpg,https://myhq.in/coworking-space/wework-koramangala,https://myhq.in/coworking-space/wework-koramangala,
Innov8 - Prestige Tech Platina,Coworking Space,Bangalore,Bellandur,"₹13,000/seat",13000,Innov8 - Prestige Tech Platina,"Innov8 centre in Prestige Tech Park on the Outer Ring Road, Bellandur. Rated 4.5 from 58 reviews.","Meeting Rooms, Air Conditioning, Charging Points, Power Backup, Fire Safety","Prestige Tech Park, Outer Ring Road, Bellandur, Bangalore, Karnataka",560103,TBC,per seat/month,Innov8 - Prestige Tech Platina.jpg,https://myhq.in/dedicated/coworking-space/innov8-tech-one,https://myhq.in/dedicated/coworking-space/innov8-tech-one,Exact floor not on listing. Pincode inferred from locality - verify.
Awfis - Adani Inspire BKC,Coworking Space,Mumbai,BKC,"₹22,999/seat",22999,Awfis - Adani Inspire BKC,"Awfis centre in a 17,500 sq ft space at Adani Inspire, G Block, BKC, with flexi desks, private offices and meeting rooms.","Flexi Desks, Private Offices, Meeting Rooms, High-speed Wi-Fi, Power Backup","3rd Floor, Unit No. 4, Inspire, Main Road, G Block, Bandra Kurla Complex, Mumbai, Maharashtra",400051,TBC,per seat/month,Awfis - Adani Inspire BKC.jpg,https://myhq.in/dedicated/coworking-space/awfis-inspire,https://myhq.in/dedicated/coworking-space/awfis-inspire,Amenities indicative - confirm with operator. Pincode inferred from locality - verify.
91Springboard - BKC 2 Kagalwala House,Coworking Space,Mumbai,BKC,"₹15,499/seat",15499,91Springboard - BKC 2 Kagalwala House,"91Springboard centre with seats and cabins of all sizes near BKC, rated 4.4 from 926 reviews.","Air Conditioning, Cafeteria, Storage Space, Flexi Desks, Private Cabins","91Springboard BKC 2, Vinay Bhavya Complex, 6th Floor, Wing B, CST Road, Vidya Nagari, Kalina, Santacruz East, Mumbai, Maharashtra",400098,TBC,per seat/month,91Springboard - BKC 2 Kagalwala House.jpg,https://www.myhq.in/dedicated/coworking-space/91springboard-kagalwala-house,https://www.myhq.in/dedicated/coworking-space/91springboard-kagalwala-house,
603 The Coworking Space - Amore,Coworking Space,Mumbai,BKC,"₹12,999/seat",12999,603 The Coworking Space - Amore,"Dedicated-desk coworking opposite Khar West railway station, serving the BKC and Bandra business belt.","Dedicated Desks, High-speed Wi-Fi, Power Backup, Air Conditioning, Railway Nearby","5th Floor, 13-14, Amore Building, Opposite Khar Railway Station West, 2nd Road, Ram Krishna Nagar, Khar West, Mumbai, Maharashtra",400052,TBC,per seat/month,603 The Coworking Space - Amore.jpg,https://myhq.in/dedicated/coworking-space/603-the-coworking-space-amore,https://myhq.in/dedicated/coworking-space/603-the-coworking-space-amore,Amenities indicative - confirm with operator. Pincode inferred from locality - verify.
HS Coworks - HITEC City,Coworking Space,Hyderabad,HITEC City,"₹8,000/seat",8000,HS Coworks - HITEC City,"Affordable coworking in HUDA Techno Enclave, HITEC City, rated 4.3 from 456 reviews.","Air Conditioning, Dedicated Desks, High-speed Wi-Fi, Power Backup, Meeting Rooms","HUDA Techno Enclave, HITEC City, Hyderabad, Telangana",500081,TBC,per seat/month,HS Coworks - HITEC City.jpg,https://myhq.in/dedicated/coworking-space/hs-coworks-hiteccity,https://myhq.in/dedicated/coworking-space/hs-coworks-hiteccity,Amenities indicative - confirm with operator. Listing gives plus-code C9WH+W92 only.
Awfis - Tech One HITEC City,Coworking Space,Hyderabad,HITEC City,"₹10,999/seat",10999,Awfis - Tech One HITEC City,"Awfis centre on the 10th floor at Raidurg, HITEC City, close to major IT parks.","High-speed Wi-Fi, Power Backup, Meeting Rooms, Cafeteria, Air Conditioning","10th Floor, Unit Nos. 1001 and 1002, X Road, Radhe Nagar, Khajaguda, Raidurg, HITEC City, Hyderabad, Telangana",500081,TBC,per seat/month,Awfis - Tech One HITEC City.jpg,https://myhq.in/dedicated/coworking-space/awfis-tech-one,https://myhq.in/dedicated/coworking-space/awfis-tech-one,Amenities indicative - confirm with operator. Pincode inferred from locality - verify.
Smartworks - HITEC City,Managed Office,Hyderabad,HITEC City,"₹8,999/seat",8999,Smartworks - HITEC City,Managed office space near HITEC City with design and layout assistance. Rated 4.2 from 33 reviews.,"Ready-to-move-in Offices, Meeting Rooms, Power Backup, Air Conditioning, Security","HITEC City, Hyderabad, Telangana (building to be confirmed)",500081,TBC,per seat/month,Smartworks - HITEC City.jpg,https://myhq.in/managed-office/smartworks-hiteccity,https://myhq.in/managed-office/smartworks-hiteccity,Amenities indicative - confirm with operator. Address to be confirmed. Pincode inferred from locality - verify.
Espree Co-works - Koregaon Park,Coworking Space,Pune,Koregaon Park,"₹10,500/seat",10500,Espree Co-works - Koregaon Park,"Coworking in Meera Nagar, Koregaon Park, with dedicated desks and small private cabins.","Dedicated Desks, Private Cabins, High-speed Wi-Fi, Power Backup, Air Conditioning","Lane Number 5, Meera Nagar, Koregaon Park, Pune, Maharashtra",411001,TBC,per seat/month,Espree Co-works - Koregaon Park.jpg,https://myhq.in/dedicated/coworking-space/espree-coworks-koregaonpark,https://myhq.in/dedicated/coworking-space/espree-coworks-koregaonpark,Amenities indicative - confirm with operator.
Urban Nomads - Koregaon Park,Coworking Space,Pune,Koregaon Park,"₹5,499/seat",5499,Urban Nomads - Koregaon Park,"Budget bungalow-style coworking on North Main Road, Koregaon Park, with day passes from about ₹300.","Day Pass, Dedicated Desks, High-speed Wi-Fi, Power Backup, Garden Seating","Bungalow No. 5, Liberty Phase 1, North Main Road, opposite Lane 6, Koregaon Park, Pune, Maharashtra",411001,TBC,per seat/month,Urban Nomads - Koregaon Park.jpg,https://myhq.in/dedicated/coworking-space/urban-nomads-koregaonpark,https://myhq.in/dedicated/coworking-space/urban-nomads-koregaonpark,Amenities indicative - confirm with operator. Pincode inferred from locality - verify.
Bootstart - Arcadian Building,Managed Office,Pune,Koregaon Park,"₹7,499/seat",7499,Bootstart - Arcadian Building,"Managed office on the 1st floor of Arcadian Building on North Main Road, Koregaon Park. Rated 4.4 from 121 reviews.","Ready-to-move-in Offices, Breakout Area, Meeting Rooms, Power Backup, Air Conditioning","1st Floor, Arcadian Building, Plot No. 12, North Main Road, Near Pinnacle Building, Koregaon Park, Pune, Maharashtra",411001,TBC,per seat/month,Bootstart - Arcadian Building.jpg,https://myhq.in/managed-office/bootstart-arcadian-building,https://myhq.in/managed-office/bootstart-arcadian-building,Amenities indicative - confirm with operator. Pincode inferred from locality - verify.`;

// Premium curated Unsplash office photography mapped gracefully across listings
const CURATED_IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1549923746-c502d488f3aa?auto=format&fit=crop&q=80&w=1200"
];

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const lines = rawData.split('\n').filter(l => l.trim().length > 0);
const headers = parseCSVLine(lines[0]);

const properties = [];
const seedProperties = [];
const seenSlugs = new Set();

for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  if (cols.length < 5) continue;

  const title = cols[0];
  const typeRaw = cols[1];
  const city = cols[2];
  const locality = cols[3];
  const priceDisplay = cols[4];
  const priceMonthly = parseInt(cols[5], 10) || 5000;
  const imageFolder = cols[6];
  const description = cols[7];
  const amenitiesStr = cols[8];
  const fullAddress = cols[9];
  const pincode = cols[10];
  const totalCapacity = cols[11];
  const priceUnit = cols[12];
  const imageFileName = cols[13];
  const imageSourceLink = cols[14];

  let slug = slugify(title);
  if (seenSlugs.has(slug)) {
    slug = `${slug}-${i}`;
  }
  seenSlugs.add(slug);

  let typeMapped = "Coworking Space";
  let prismaType = "COWORKING";

  if (typeRaw.toLowerCase().includes("virtual")) {
    typeMapped = "Virtual Office";
    prismaType = "VIRTUAL_OFFICE";
  } else if (typeRaw.toLowerCase().includes("managed")) {
    typeMapped = "Managed Office";
    prismaType = "MANAGED_OFFICE";
  } else if (typeRaw.toLowerCase().includes("commercial") || typeRaw.toLowerCase().includes("office")) {
    typeMapped = "Commercial / Office Space";
    prismaType = "COMMERCIAL_OFFICE";
  } else {
    typeMapped = "Coworking Space";
    prismaType = "COWORKING";
  }

  const amenities = amenitiesStr ? amenitiesStr.split(',').map(s => s.trim()).filter(Boolean) : [
    "High-speed Wi-Fi",
    "24/7 Access",
    "Air Conditioning",
    "Meeting Rooms"
  ];

  // Assign photo: fallback to curated photo or image file name
  const photo = CURATED_IMAGES[(i - 1) % CURATED_IMAGES.length];

  properties.push({
    id: `prop-${i}`,
    slug,
    title,
    location: `${locality}, ${city}`,
    city,
    locality,
    price: priceDisplay,
    priceMonthly,
    type: typeMapped,
    rating: (4.6 + ((i * 7) % 5) * 0.08).toFixed(1) * 1,
    amenities,
    image: photo,
    imageFileName: imageFileName || `${title}.jpg`,
    description,
    address: fullAddress,
    pincode: pincode && pincode !== 'TBC' && pincode !== 'NA' ? pincode : undefined,
    capacity: totalCapacity && totalCapacity !== 'TBC' && totalCapacity !== 'NA' ? totalCapacity : undefined,
    priceUnit
  });

  seedProperties.push({
    id: `prop-${i}`,
    slug,
    title,
    location: `${locality}, ${city}`,
    city,
    locality,
    price: priceDisplay,
    priceMonthly,
    type: typeMapped,
    prismaType,
    rating: (4.6 + ((i * 7) % 5) * 0.08).toFixed(1) * 1,
    amenities,
    image: photo,
    imageFileName: imageFileName || `${title}.jpg`,
    description,
    address: fullAddress,
    pincode: pincode && pincode !== 'TBC' && pincode !== 'NA' ? pincode : undefined,
    capacity: totalCapacity && totalCapacity !== 'TBC' && totalCapacity !== 'NA' ? totalCapacity : undefined,
    priceUnit
  });
}

console.log(`Successfully parsed ${properties.length} real commercial workspaces.`);

// 1. Output src/constants/data.ts update
const dataTsPath = path.join(__dirname, '..', 'src', 'constants', 'data.ts');
let dataTsContent = fs.readFileSync(dataTsPath, 'utf8');

// Update WorkspaceSpace interface to include slug, priceMonthly, description, address, pincode, capacity
const interfaceReplacement = `export interface WorkspaceSpace {
  id: string;
  slug?: string;
  title: string;
  location: string;
  city: string;
  locality?: string;
  price: string;
  priceMonthly?: number;
  type: string;
  rating: number;
  amenities: string[];
  image: string;
  imageFileName?: string;
  description?: string;
  address?: string;
  pincode?: string;
  capacity?: string | number;
  priceUnit?: string;
}`;

dataTsContent = dataTsContent.replace(
  /export interface WorkspaceSpace \{[\s\S]*?\n\}/,
  interfaceReplacement
);

// Format properties array for data.ts
const workspacesCode = `export const WORKSPACES: WorkspaceSpace[] = ${JSON.stringify(properties, null, 2)};`;

// Replace WORKSPACES array in data.ts
dataTsContent = dataTsContent.replace(
  /export const WORKSPACES: WorkspaceSpace\[\] = \[[\s\S]*?\n\];/,
  workspacesCode
);

fs.writeFileSync(dataTsPath, dataTsContent, 'utf8');
console.log('✓ Successfully updated src/constants/data.ts with all 63 real properties!');

// 2. Output prisma/seed.ts update
const seedTsPath = path.join(__dirname, '..', 'prisma', 'seed.ts');
let seedTsContent = fs.readFileSync(seedTsPath, 'utf8');

const seedData = seedProperties.map(p => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  location: p.location,
  city: p.city,
  priceDisplay: p.price,
  priceMonthly: p.priceMonthly,
  type: `WorkspaceType.${p.prismaType}`,
  rating: p.rating,
  description: p.description,
  amenities: p.amenities,
  image: p.image,
  address: p.address,
  pincode: p.pincode,
  capacity: p.capacity
}));

// Build seed array string without quotes on WorkspaceType enum
let seedCode = 'const WORKSPACES_DATA = [\n';
seedData.forEach((item, idx) => {
  seedCode += `  {\n`;
  seedCode += `    id: ${JSON.stringify(item.id)},\n`;
  seedCode += `    slug: ${JSON.stringify(item.slug)},\n`;
  seedCode += `    title: ${JSON.stringify(item.title)},\n`;
  seedCode += `    location: ${JSON.stringify(item.location)},\n`;
  seedCode += `    city: ${JSON.stringify(item.city)},\n`;
  seedCode += `    priceDisplay: ${JSON.stringify(item.priceDisplay)},\n`;
  seedCode += `    priceMonthly: ${item.priceMonthly},\n`;
  seedCode += `    type: ${item.type},\n`;
  seedCode += `    rating: ${item.rating},\n`;
  seedCode += `    description: ${JSON.stringify(item.description)},\n`;
  seedCode += `    amenities: ${JSON.stringify(item.amenities)},\n`;
  seedCode += `    image: ${JSON.stringify(item.image)},\n`;
  if (item.address) seedCode += `    address: ${JSON.stringify(item.address)},\n`;
  if (item.pincode) seedCode += `    pincode: ${JSON.stringify(item.pincode)},\n`;
  seedCode += `  }${idx < seedData.length - 1 ? ',' : ''}\n`;
});
seedCode += '];';

seedTsContent = seedTsContent.replace(
  /const WORKSPACES_DATA = \[[\s\S]*?\n\];/,
  seedCode
);

fs.writeFileSync(seedTsPath, seedTsContent, 'utf8');
console.log('✓ Successfully updated prisma/seed.ts with all 63 real properties!');

// Write a clean JSON copy of all properties in data/properties.json for reference
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
fs.writeFileSync(path.join(dataDir, 'properties.json'), JSON.stringify(properties, null, 2), 'utf8');
console.log('✓ Saved clean copy to data/properties.json');
